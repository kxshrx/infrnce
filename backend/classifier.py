# backend/classifier.py

"""
Log Classifier Module - Complete Implementation

This module implements the hybrid 3-stage log classification pipeline:
1. Regex Pattern Matching (Stage 3)
2. BERT Model Classification via API (Stage 4) 
3. LLM Fallback Classification (Stage 5)

The BERT stage uses a private Hugging Face Space API that hosts the fine-tuned model.
"""

import os
import re
import json
import asyncio
import random
import logging
from typing import Dict, Any, Optional, Tuple

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
        self.llm_client = None
        self.llm_prompt_template = None

        # Configuration - based on your notebook
        self.bert_confidence_threshold = 0.4
        self.llm_max_tokens = 120
        self.llm_temperature = 0.3

        # BERT Label mapping from your notebook - exact mapping from training
        self.bert_label_mapping = {
            "LABEL_0": "Error_Handling",
            "LABEL_1": "Instance_Management", 
            "LABEL_2": "Network_Operations",
            "LABEL_3": "Resource_Management",
            "LABEL_4": "Scheduler_Operations",
            "LABEL_5": "System_Operations"
        }

        load_dotenv()

    async def initialize(self):
        """Initialize all models and components"""
        try:
            await asyncio.gather(
                self._load_regex_patterns(),
                self._load_bert_api_client(),
                self._load_llm_client(),
            )
            self.is_initialized = True
            logger.info("Classifier initialized successfully.")
        except Exception as e:
            logger.error(f"Failed to initialize classifier: {e}")
            raise

    async def _load_regex_patterns(self):
        """Load regex patterns for Stage 3 classification"""
        try:
            # Based on your notebook's regex patterns
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
            logger.info("Regex patterns loaded successfully.")
        except Exception as e:
            logger.error(f"Failed to load regex patterns: {e}")
            raise

    async def _load_bert_api_client(self):
        """Initialize the BERT Gradio client"""
        try:
            # We'll initialize the client lazily in _classify_with_bert
            # Just check that we have the token
            hf_token = os.getenv("HF_API_TOKEN")
            if not hf_token:
                logger.warning("HF_API_TOKEN not found. BERT classification will be unavailable.")
                self.bert_loaded = False
                return
            
            self.bert_loaded = True
            logger.info("BERT Gradio client ready to initialize.")
            
        except Exception as e:
            logger.error(f"Failed to prepare BERT client: {e}")
            self.bert_loaded = False

    async def _load_llm_client(self):
        """Load LLM client for Stage 5 classification"""
        try:
            api_key = os.getenv("GROQ_API_KEY")
            if not api_key:
                logger.warning("GROQ_API_KEY not found. LLM classification will be unavailable.")
                self.llm_loaded = False
                return

            self.llm_client = ChatGroq(
                groq_api_key=api_key,
                model_name="llama-3.1-8b-instant",
                temperature=self.llm_temperature,
                max_tokens=self.llm_max_tokens,
            )

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
            logger.info("LLM client loaded successfully.")
        except Exception as e:
            logger.error(f"Failed to load LLM client: {e}")
            self.llm_loaded = False

    def _classify_with_regex(self, log_text: str) -> Tuple[Optional[str], Optional[str]]:
        """Stage 3: Classify log using regex patterns"""
        for category, patterns in self.regex_patterns.items():
            for pattern in patterns:
                if re.search(pattern, log_text, re.IGNORECASE):
                    return category, pattern
        return None, None

    async def _classify_with_bert(self, log_text: str) -> Tuple[Optional[str], float]:
        """Stage 4: Classify log using the Gradio client for your Hugging Face Space"""
        if not self.bert_loaded:
            return None, 0.0

        try:
            from gradio_client import Client
            
            # Initialize client if not already done
            if not hasattr(self, 'gradio_client'):
                hf_token = os.getenv("HF_API_TOKEN") 
                self.gradio_client = Client("https://kxshrx-infrnce-private-api.hf.space", hf_token=hf_token)
            
            # Make async call using gradio client
            loop = asyncio.get_event_loop()
            result = await loop.run_in_executor(
                None,
                lambda: self.gradio_client.predict(log_text, api_name="/predict")
            )
            
            logger.info(f"Raw BERT API result: {result}")
            
            # Parse the result based on your actual API response format
            if result and isinstance(result, dict):
                # Get the best prediction from the 'label' field
                best_label = result.get('label', 'LABEL_0')
                
                # Get confidence from the confidences list
                confidences = result.get('confidences', [])
                confidence_score = 0.0
                
                if confidences:
                    # Find the confidence for the best label
                    for conf_item in confidences:
                        if conf_item['label'] == best_label:
                            confidence_score = conf_item['confidence']
                            break
                
                # Map LABEL_X to meaningful category names using your exact mapping
                predicted_category = self.bert_label_mapping.get(best_label, best_label)
                
                logger.warning(f"BERT classification: {predicted_category} (confidence: {confidence_score:.3f})")
                
                # Check confidence threshold
                if confidence_score >= self.bert_confidence_threshold:
                    return predicted_category, confidence_score
                else:
                    return None, confidence_score
            
            return None, 0.0
            
        except Exception as e:
            logger.error(f"BERT classification error: {e}")
            return None, 0.0

    async def _classify_with_llm(self, log_text: str) -> Tuple[str, float, str]:
        """Stage 5: Classify log using LLM"""
        if not self.llm_loaded:
            return "Processing_Error", 0.0, "LLM not available"

        try:
            # Format prompt
            formatted_prompt = self.llm_prompt_template.format(log_message=log_text[:400])
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
                    return "Processing_Error", 0.0, "Failed to parse LLM response"
            else:
                return "Processing_Error", 0.0, "No JSON found in LLM response"

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
            category = category_mapping.get(category, category)
            confidence = result_data.get("confidence", 0.0)
            reasoning = result_data.get("reasoning", "Classified by LLM")

            return category, confidence, reasoning

        except Exception as e:
            logger.error(f"LLM classification error: {e}")
            return "Processing_Error", 0.0, f"Error: {str(e)[:50]}"

    async def classify_log(self, log_text: str) -> Dict[str, Any]:
        """Main classification function implementing the 3-stage pipeline"""
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
                    "BERT API",
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
                        "BERT API",
                        "Low Confidence",
                        f"Confidence was {bert_confidence:.3f}, below the {self.bert_confidence_threshold} threshold.",
                    ).to_dict()
                )
            else:
                journey.append(
                    JourneyStep(
                        "BERT API", "Unavailable", "BERT API client not loaded."
                    ).to_dict()
                )

        # Stage 5: LLM Classification
        llm_category, llm_confidence, llm_reasoning = await self._classify_with_llm(log_text)

        journey.append(
            JourneyStep(
                "LLM Fallback",
                "Classified" if llm_category != "Processing_Error" else "Failed",
                f"Classified into enhanced categories. {llm_reasoning}",
            ).to_dict()
        )

        return {
            "category": llm_category,
            "confidence": llm_confidence,
            "stage": "LLM",
            "journey": journey,
        }

    async def generate_log(self) -> str:
        """Generate synthetic OpenStack log using random topic selection"""
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

            # Clean up the response
            synthetic_log = synthetic_log.replace("```", "")

            return synthetic_log

        except Exception as e:
            logger.error(f"Log generation error: {e}")
            raise Exception(f"Failed to generate log: {str(e)}")
