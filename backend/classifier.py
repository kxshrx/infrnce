"""
Log Classifier Module

This module implements the hybrid 3-stage log classification pipeline:
1. Regex Pattern Matching (Stage 3)
2. BERT Model Classification (Stage 4)
3. LLM Fallback Classification (Stage 5)

Also includes synthetic log generation capabilities.
"""

import re
import json
import time
import os
import asyncio
import random
from typing import Dict, List, Any, Optional, Tuple
from pathlib import Path
import logging

import pandas as pd
import numpy as np
import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
from langchain_groq import ChatGroq
from langchain.schema import HumanMessage
from langchain.prompts import PromptTemplate
from pydantic import BaseModel, Field
from dotenv import load_dotenv
import warnings

warnings.filterwarnings("ignore")
logger = logging.getLogger(__name__)


class JourneyStep:
    """Represents a step in the classification journey"""

    def __init__(self, stage: str, status: str, details: str):
        self.stage = stage
        self.status = status
        self.details = details

    def to_dict(self):
        return {"stage": self.stage, "status": self.status, "details": self.details}


class LogClassification(BaseModel):
    """Pydantic model for LLM log classification"""

    category: str = Field(..., description="Classification category")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Confidence score")
    reasoning: str = Field(..., description="Brief explanation")


class LogClassifier:
    """
    Hybrid Log Classifier implementing the 3-stage pipeline
    """

    def __init__(self):
        self.is_initialized = False
        self.regex_loaded = False
        self.bert_loaded = False
        self.llm_loaded = False

        # Model components
        self.regex_patterns = {}
        self.bert_model = None
        self.bert_tokenizer = None
        self.bert_label_mapping = {}
        self.llm_client = None
        self.llm_prompt_template = None

        # Configuration
        self.bert_confidence_threshold = 0.4  # Lowered from 0.5 to 0.4 to better utilize trained BERT model
        self.bert_max_length = 512
        self.llm_max_tokens = 120
        self.llm_temperature = 0.3

        # Load environment variables
        load_dotenv()

    async def initialize(self):
        """Initialize all models and components"""
        try:
            # Initialize components in parallel where possible
            await asyncio.gather(
                self._load_regex_patterns(),
                self._load_bert_model(),
                self._load_llm_client(),
            )

            self.is_initialized = True

        except Exception as e:
            logger.error(f"Failed to initialize classifier: {e}")
            raise

    async def _load_regex_patterns(self):
        """Load regex patterns for Stage 3 classification"""
        try:
            # Define refined regex patterns based on the notebook analysis
            self.regex_patterns = {
                "System_Operations": [
                    r"INFO nova\.virt\.libvirt\.driver.*?\[instance: [a-f0-9\-]+\].*",
                ],
                "Instance_Management": [
                    r"INFO nova\.compute\.manager.*?\[instance: [a-f0-9\-]+\].*",
                ],
                "Instance_Management_System": [
                    r"INFO nova\.compute\.manager \[None req-.*?\].*?\[instance: [a-f0-9\-]+\].*",
                ],
                # Additional common patterns
                "Network_Operations": [
                    r"INFO.*network.*VIF.*plugged.*",
                    r"INFO.*neutron.*port.*",
                ],
                "Boot_Timeout_Errors": [
                    r"WARNING.*_wait_for_boot.*timeout",
                    r"ERROR.*boot.*timeout",
                ],
                "File_System_Errors": [
                    r"ERROR.*file not found",
                    r"ERROR.*No such file or directory",
                ],
            }

            self.regex_loaded = True

        except Exception as e:
            logger.error(f"Failed to load regex patterns: {e}")
            raise

    async def _load_bert_model(self):
        """Load BERT model and tokenizer for Stage 4 classification"""
        try:
            # Model path - use self-contained path within backend directory
            model_path = Path("./models/controlled_bert_model.pth")

            if not model_path.exists():
                logger.warning(
                    f"BERT model not found. BERT classification will be skipped."
                )
                self.bert_loaded = False
                return

            # Load tokenizer
            self.bert_tokenizer = DistilBertTokenizer.from_pretrained(
                "distilbert-base-uncased"
            )

            # Load model with the correct number of labels (6, from bert-v2.ipynb)
            # Suppress the "not initialized" warning since we'll load trained weights
            import transformers
            transformers.logging.set_verbosity_error()
            
            self.bert_model = DistilBertForSequenceClassification.from_pretrained(
                "distilbert-base-uncased",
                num_labels=6,  # Based on actual training labels from bert-v2.ipynb
            )

            # Load saved weights - this overwrites the random classifier weights
            try:
                model_state = torch.load(model_path, map_location="cpu")
                
                # Verify the state dict has the expected keys
                expected_keys = ['classifier.weight', 'classifier.bias']
                if all(key in model_state for key in expected_keys):
                    self.bert_model.load_state_dict(model_state, strict=True)
                    self.bert_model.eval()
                    
                    # Test that the model gives non-random predictions
                    with torch.no_grad():
                        test_input = self.bert_tokenizer(
                            "INFO nova.compute.manager test log", 
                            return_tensors="pt", 
                            max_length=512, 
                            truncation=True, 
                            padding=True
                        )
                        output = self.bert_model(**test_input)
                        probs = torch.nn.functional.softmax(output.logits, dim=-1)
                        max_prob = torch.max(probs).item()
                        
                        if max_prob > 0.2:  # Should be confident about something if trained properly
                            logger.warning(f"BERT model loaded successfully with trained weights from {model_path}")
                        else:
                            logger.error("BERT model weights may not be properly trained")
                else:
                    logger.error(f"Model state dict missing expected keys. Found keys: {list(model_state.keys())}")
                    self.bert_loaded = False
                    return
                    
            except Exception as e:
                logger.error(f"Failed to load BERT model weights: {e}")
                self.bert_loaded = False
                return
            
            # Reset logging level
            transformers.logging.set_verbosity_warning()

            # Define label mapping (based on actual BERT training from bert-v2.ipynb)
            self.bert_label_mapping = {
                0: "Error_Handling",
                1: "Instance_Management",
                2: "Network_Operations",
                3: "Resource_Management",
                4: "Scheduler_Operations",
                5: "System_Operations",
            }

            self.bert_loaded = True

        except Exception as e:
            logger.error(f"Failed to load BERT model: {e}")
            self.bert_loaded = False

    async def _load_llm_client(self):
        """Load LLM client for Stage 5 classification"""
        try:
            # Check for API key
            api_key = os.getenv("GROQ_API_KEY")
            if not api_key:
                logger.warning(
                    "GROQ_API_KEY not found. LLM classification will be unavailable."
                )
                self.llm_loaded = False
                return

            # Initialize Groq client
            self.llm_client = ChatGroq(
                groq_api_key=api_key,
                model_name="llama-3.1-8b-instant",
                temperature=self.llm_temperature,
                max_tokens=self.llm_max_tokens,
            )

            # Define LLM prompt template
            self.llm_prompt_template = PromptTemplate(
                input_variables=["log_message"],
                template="""Classify OpenStack log:

CATEGORIES:
SysOps, InstMgmt, NetOps, ResMgmt, SchedOps, BootErr, NetErr, FileErr, ConfigErr, ResErr, SvcErr

EXAMPLES:
- "WARNING _wait_for_boot timeout" → BootErr
- "INFO VIF plugged successfully" → NetOps  
- "ERROR file not found" → FileErr

LOG: {log_message}

Respond ONLY with a valid JSON object in the next line. Do NOT include any explanation, markdown, or formatting.
EXAMPLE RESPONSE: {{"category": "FileErr", "confidence": 0.8, "reasoning": "brief"}}
""",
            )

            self.llm_loaded = True

        except Exception as e:
            logger.error(f"Failed to load LLM client: {e}")
            self.llm_loaded = False

    def _classify_with_regex(
        self, log_text: str
    ) -> Tuple[Optional[str], Optional[str]]:
        """
        Stage 3: Classify log using regex patterns

        Returns:
            Tuple of (category, matched_pattern) or (None, None)
        """
        for category, patterns in self.regex_patterns.items():
            for pattern in patterns:
                if re.search(pattern, log_text, re.IGNORECASE):
                    return category, pattern
        return None, None

    async def _classify_with_bert(self, log_text: str) -> Tuple[Optional[str], float]:
        """
        Stage 4: Classify log using BERT model

        Returns:
            Tuple of (category, confidence) or (None, 0.0)
        """
        if not self.bert_loaded:
            return None, 0.0

        try:
            # Tokenize input
            inputs = self.bert_tokenizer(
                log_text,
                return_tensors="pt",
                max_length=self.bert_max_length,
                truncation=True,
                padding=True,
            )

            # Get prediction
            with torch.no_grad():
                outputs = self.bert_model(**inputs)
                logits = outputs.logits
                probabilities = torch.nn.functional.softmax(logits, dim=-1)
                confidence, predicted_label = torch.max(probabilities, 1)

            confidence_score = confidence.item()
            predicted_category = self.bert_label_mapping.get(
                predicted_label.item(), "Unknown"
            )

            # Debug: Always log BERT predictions to see what's happening
            logger.warning(f"BERT classification: {predicted_category} (confidence: {confidence_score:.3f}) - Threshold: {self.bert_confidence_threshold}")

            # Check confidence threshold
            if confidence_score >= self.bert_confidence_threshold:
                return predicted_category, confidence_score
            else:
                return None, confidence_score

        except Exception as e:
            logger.error(f"BERT classification error: {e}")
            return None, 0.0

    async def _classify_with_llm(self, log_text: str) -> Tuple[str, float, str]:
        """
        Stage 5: Classify log using LLM

        Returns:
            Tuple of (category, confidence, reasoning)
        """
        if not self.llm_loaded:
            return "Processing_Error", 0.0, "LLM not available"

        try:
            # Format prompt
            formatted_prompt = self.llm_prompt_template.format(
                log_message=log_text[:400]
            )
            messages = [HumanMessage(content=formatted_prompt)]

            # Get LLM response
            response = await asyncio.to_thread(self.llm_client.invoke, messages)
            response_text = response.content.strip()

            # Parse JSON response
            json_match = re.search(r"\{.*\}", response_text, re.DOTALL)
            if json_match:
                try:
                    result_data = json.loads(json_match.group())
                except:
                    result_data = None
            else:
                result_data = None

            if not result_data:
                # Fallback parsing
                return "Processing_Error", 0.0, "Failed to parse LLM response"

            # Map abbreviated categories to full names
            category_mapping = {
                "SysOps": "System_Operations",
                "InstMgmt": "Instance_Management",
                "NetOps": "Network_Operations",
                "ResMgmt": "Resource_Management",
                "SchedOps": "Scheduler_Operations",
                "BootErr": "Boot_Timeout_Errors",
                "NetErr": "Network_Connection_Errors",
                "FileErr": "File_System_Errors",
                "ConfigErr": "Configuration_Errors",
                "ResErr": "Resource_Allocation_Errors",
                "SvcErr": "Service_Communication_Errors",
            }

            category = result_data.get("category", "Unknown")
            if category in category_mapping:
                category = category_mapping[category]

            confidence = result_data.get("confidence", 0.0)
            reasoning = result_data.get("reasoning", "Classified by LLM")

            return category, confidence, reasoning

        except Exception as e:
            logger.error(f"LLM classification error: {e}")
            return "Processing_Error", 0.0, f"Error: {str(e)[:50]}"

    async def classify_log(self, log_text: str) -> Dict[str, Any]:
        """
        Main classification function implementing the 3-stage pipeline

        Args:
            log_text: Raw log message to classify

        Returns:
            Dictionary with classification results and journey
        """
        journey = []

        # Stage 3: Regex Classification
        regex_category, regex_pattern = self._classify_with_regex(log_text)

        if regex_category:
            journey.append(
                JourneyStep(
                    "Regex Engine",
                    "Classified",
                    f"Matched pattern for {regex_category}",
                ).to_dict()
            )

            return {
                "category": regex_category,
                "confidence": 1.0,  # Regex matches have 100% confidence
                "stage": "Regex",
                "journey": journey,
            }
        else:
            journey.append(
                JourneyStep("Regex Engine", "Skipped", "No pattern matched.").to_dict()
            )

        # Stage 4: BERT Classification
        bert_category, bert_confidence = await self._classify_with_bert(log_text)

        if bert_category:
            journey.append(
                JourneyStep(
                    "BERT Model",
                    "Classified",
                    f"High confidence classification: {bert_confidence:.3f}",
                ).to_dict()
            )

            return {
                "category": bert_category,
                "confidence": bert_confidence,
                "stage": "BERT",
                "journey": journey,
            }
        else:
            if self.bert_loaded:
                journey.append(
                    JourneyStep(
                        "BERT Model",
                        "Low Confidence",
                        f"Confidence was {bert_confidence:.3f}, below the {self.bert_confidence_threshold} threshold.",
                    ).to_dict()
                )
            else:
                journey.append(
                    JourneyStep(
                        "BERT Model", "Unavailable", "BERT model not loaded."
                    ).to_dict()
                )

        # Stage 5: LLM Classification
        llm_category, llm_confidence, llm_reasoning = await self._classify_with_llm(
            log_text
        )

        journey.append(
            JourneyStep(
                "LLM Fallback",
                "Classified" if llm_category != "Processing_Error" else "Failed",
                f"Classified into 1 of 11 enhanced categories. {llm_reasoning}",
            ).to_dict()
        )

        return {
            "category": llm_category,
            "confidence": llm_confidence,
            "stage": "LLM",
            "journey": journey,
        }

    async def generate_log(self) -> str:
        """
        Generate synthetic OpenStack log using random topic selection

        Returns:
            Generated synthetic log message
        """
        if not self.llm_loaded:
            raise Exception("LLM client not available for log generation")

        try:
            # Define predefined log topics/scenarios
            log_topics = [
                "a disk is full on a compute node",
                "a network service timed out",
                "an authentication token has expired",
                "failed to allocate a floating IP",
                "live migration of an instance failed",
                "nova-compute service is down",
                "instance failed to boot due to insufficient resources",
                "neutron port binding failed",
                "cinder volume attachment error",
                "keystone authentication failure",
                "glance image download timeout",
                "hypervisor connection lost",
                "database connection pool exhausted",
                "RabbitMQ message queue full",
                "libvirt domain creation failed",
            ]

            # Randomly select a topic
            selected_topic = random.choice(log_topics)

            # Create generation prompt
            generation_template = """Generate a realistic OpenStack log entry based on this description: {topic}

The log should follow OpenStack format patterns like:
- INFO/WARNING/ERROR nova.compute.manager [req-UUID user-id project-id] [instance: instance-uuid] message
- INFO nova.virt.libvirt.driver [req-UUID] [instance: instance-uuid] message
- WARNING nova.scheduler.manager [req-UUID] message
- ERROR cinder.volume.manager [req-UUID] message
- Include realistic timestamps, UUIDs, and technical details

Generate ONLY the log line, no explanations or formatting.

Description: {topic}

Log:"""

            formatted_prompt = generation_template.format(topic=selected_topic)
            messages = [HumanMessage(content=formatted_prompt)]

            # Get LLM response
            response = await asyncio.to_thread(self.llm_client.invoke, messages)
            synthetic_log = response.content.strip()

            # Clean up the response (remove any extra formatting)
            synthetic_log = synthetic_log.replace("```", "").strip()

            return synthetic_log

        except Exception as e:
            logger.error(f"Log generation error: {e}")
            raise Exception(f"Failed to generate log: {str(e)}")
