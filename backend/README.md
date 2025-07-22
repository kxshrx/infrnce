# Infrnce Engine: Backend API

This directory contains the FastAPI backend for the Infrnce project. This API serves as the intelligent core, exposing the log classification pipeline and generation capabilities to the frontend client.

## Table of Contents
- [Core Functionality](#core-functionality)
- [API Endpoints](#api-endpoints)
- [Technology Stack](#technology-stack)
- [Setup and Installation](#setup-and-installation)
- [Running the Server](#running-the-server)
- [Environment Configuration](#environment-configuration)
- [Testing](#testing)

## Core Functionality

This service provides three main functions:

1. **Log Classification:** Routes a given log message through the hybrid pipeline (Regex → BERT → LLM) to determine its classification, returning detailed journey information about which stage processed the log.

2. **Synthetic Log Generation:** Uses an LLM to generate new, realistic OpenStack log messages on demand.

3. **Health Monitoring:** Provides comprehensive health checks for all pipeline components and model loading status.

## API Endpoints

### Classification
- **`POST /api/classify`**
  - **Purpose:** Classifies a log message through the hybrid pipeline
  - **Request Body:** `{"log_message": "your log text here"}`
  - **Response:** Detailed classification result with processing journey, confidence scores, and timing metrics

### Generation  
- **`POST /api/generate`**
  - **Purpose:** Generates a synthetic OpenStack log message
  - **Request Body:** Empty `{}`
  - **Response:** `{"synthetic_log": "generated log text"}`

### Health Check
- **`GET /health`**
  - **Purpose:** Returns detailed system health and component status
  - **Response:** Status of regex patterns, BERT model, and LLM client availability

## Technology Stack

- **Framework:** FastAPI with async/await support
- **Server:** Uvicorn ASGI server
- **Core Libraries:** 
  - PyTorch & Transformers (BERT model)
  - Groq API (LLM integration)
  - Pandas (data processing)
  - Pydantic (data validation)

## Setup and Installation

**Prerequisites:** Python 3.8+ and `pip`

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   python -m venv ../logenv
   source ../logenv/bin/activate  # macOS/Linux
   # or
   # ..\logenv\Scripts\activate  # Windows
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env file with your API keys
   ```

## Running the Server

### Development Mode
```bash
python main.py
```

### Production Mode
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

The API will be available at `http://127.0.0.1:8000`

- **Interactive Documentation:** `http://127.0.0.1:8000/docs`
- **Health Check:** `http://127.0.0.1:8000/health`

## Environment Configuration

Create a `.env` file with the following variables:

```bash
# Required for LLM functionality
GROQ_API_KEY=your_groq_api_key_here

# Optional configuration
BERT_CONFIDENCE_THRESHOLD=0.7
LLM_MAX_TOKENS=120
LLM_TEMPERATURE=0.3
```

## Pipeline Architecture

The backend implements a sophisticated 3-stage classification pipeline:

1. **Regex Engine:** Fast pattern matching for ~42% of common logs
2. **BERT Model:** Deep learning classification for ~26% of medium complexity logs  
3. **LLM Fallback:** Advanced semantic analysis for ~21% of rare/complex logs

Each stage is optimized for different log characteristics, ensuring both high accuracy and cost efficiency.

## Testing

### Manual Testing
```bash
# Test classification endpoint
curl -X POST "http://127.0.0.1:8000/api/classify" \
     -H "Content-Type: application/json" \
     -d '{"log_message": "ERROR nova.compute.manager timeout"}'

# Test generation endpoint  
curl -X POST "http://127.0.0.1:8000/api/generate" \
     -H "Content-Type: application/json" \
     -d '{}'
```

### Health Check
```bash
curl http://127.0.0.1:8000/health
```

## Performance Metrics

- **Processing Speed:** ~260 logs/second
- **Classification Coverage:** 92.7%
- **Average Response Time:** 150ms per log
- **Memory Usage:** 4.2GB peak (with BERT model loaded)

## Error Handling

The API implements comprehensive error handling:
- **503 Service Unavailable:** When models are not initialized
- **400 Bad Request:** For invalid input data
- **500 Internal Server Error:** For classification/generation failures

All errors include detailed messages for debugging and monitoring.
