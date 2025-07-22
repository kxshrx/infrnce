"""
FastAPI Backend for Hybrid Intelligent Log Classification System

This module provides REST API endpoints for log classification and synthetic log generation.
Uses a 3-stage pipeline: Regex -> BERT -> LLM with confidence-based routing.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from contextlib import asynccontextmanager
import time
import logging
from typing import Dict, Any, List

from classifier import LogClassifier

# Configure logging - minimal and clean
logging.basicConfig(level=logging.WARNING, format="%(levelname)s: %(message)s")
logger = logging.getLogger(__name__)

# Global classifier instance
classifier = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager for loading models at startup"""
    global classifier
    try:
        classifier = LogClassifier()
        await classifier.initialize()
    except Exception as e:
        logger.error(f"Failed to initialize classifier: {e}")
        raise

    yield

    # Cleanup on shutdown
    pass


# Initialize FastAPI app with lifespan manager
app = FastAPI(
    title="Hybrid Intelligent Log Classification API",
    description="Production-ready API for OpenStack log classification and synthetic log generation",
    version="1.0.0",
    lifespan=lifespan,
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


# Request/Response Models
class LogClassificationRequest(BaseModel):
    log_message: str


class JourneyStep(BaseModel):
    stage: str
    status: str
    details: str


class LogClassificationResponse(BaseModel):
    log_analyzed: str
    final_category: str
    pipeline_stage: str
    final_confidence: float
    processing_time_ms: int
    journey: List[JourneyStep]


class LogGenerationResponse(BaseModel):
    synthetic_log: str


# API Endpoints
@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "Hybrid Intelligent Log Classification API",
        "status": "active",
        "version": "1.0.0",
    }


@app.get("/health")
async def health_check():
    """Detailed health check with classifier status"""
    global classifier
    return {
        "status": (
            "healthy" if classifier and classifier.is_initialized else "unhealthy"
        ),
        "classifier_ready": classifier.is_initialized if classifier else False,
        "models_loaded": {
            "regex_patterns": classifier.regex_loaded if classifier else False,
            "bert_model": classifier.bert_loaded if classifier else False,
            "llm_client": classifier.llm_loaded if classifier else False,
        },
    }


@app.post("/api/classify", response_model=LogClassificationResponse)
async def classify_log(request: LogClassificationRequest):
    """
    Classify a log message using the hybrid 3-stage pipeline

    Args:
        request: LogClassificationRequest containing the log message

    Returns:
        LogClassificationResponse with classification results and journey details
    """
    global classifier

    if not classifier or not classifier.is_initialized:
        raise HTTPException(
            status_code=503,
            detail="Classifier not initialized. Please check server logs.",
        )

    if not request.log_message.strip():
        raise HTTPException(status_code=400, detail="Log message cannot be empty")

    try:
        start_time = time.time()

        # Perform classification
        result = await classifier.classify_log(request.log_message)

        processing_time_ms = int((time.time() - start_time) * 1000)

        # Build response
        response = LogClassificationResponse(
            log_analyzed=request.log_message,
            final_category=result["category"],
            pipeline_stage=result["stage"],
            final_confidence=result["confidence"],
            processing_time_ms=processing_time_ms,
            journey=result["journey"],
        )

        return response

    except Exception as e:
        logger.error(f"Classification error: {e}")
        raise HTTPException(status_code=500, detail=f"Classification failed: {str(e)}")


@app.post("/api/generate", response_model=LogGenerationResponse)
async def generate_synthetic_log():
    """
    Generate a synthetic OpenStack log using automatic topic selection

    Returns:
        LogGenerationResponse with the generated synthetic log
    """
    global classifier

    if not classifier or not classifier.is_initialized:
        raise HTTPException(
            status_code=503,
            detail="Classifier not initialized. Please check server logs.",
        )

    try:
        # Generate synthetic log (no user input required)
        synthetic_log = await classifier.generate_log()

        return LogGenerationResponse(synthetic_log=synthetic_log)

    except Exception as e:
        logger.error(f"Log generation error: {e}")
        raise HTTPException(status_code=500, detail=f"Log generation failed: {str(e)}")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, log_level="warning")
