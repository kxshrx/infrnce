# Log Classification API Backend

Production-ready FastAPI backend for the Hybrid Intelligent Log Classification System.

## Features

- **3-Stage Classification Pipeline**: Regex → BERT → LLM with confidence-based routing
- **Synthetic Log Generation**: Generate realistic OpenStack logs from text prompts
- **Production Ready**: Proper error handling, logging, and health checks
- **CORS Support**: Ready for Next.js frontend integration
- **Fast Performance**: Async processing with model loading optimization

## API Endpoints

### Health Check

- `GET /` - Basic health check
- `GET /health` - Detailed health check with component status

### Log Classification

- `POST /api/classify` - Classify a log message

**Request:**

```json
{
  "log_message": "ERROR nova.compute.manager [req-1234-abcd] [instance: uuid] Service failed"
}
```

**Response:**

```json
{
  "log_analyzed": "ERROR nova.compute.manager [req-1234-abcd] [instance: uuid] Service failed",
  "final_category": "Service_Communication_Errors",
  "pipeline_stage": "LLM",
  "final_confidence": 0.89,
  "processing_time_ms": 150,
  "journey": [
    {
      "stage": "Regex Engine",
      "status": "Skipped",
      "details": "No pattern matched."
    },
    {
      "stage": "BERT Model",
      "status": "Low Confidence",
      "details": "Confidence was 0.65, below the 0.7 threshold."
    },
    {
      "stage": "LLM Fallback",
      "status": "Classified",
      "details": "Classified into 1 of 11 enhanced categories."
    }
  ]
}
```

### Synthetic Log Generation

- `POST /api/generate` - Generate a synthetic log

**Request:**

```json
{
  "prompt": "A network service timed out during VM creation"
}
```

**Response:**

```json
{
  "synthetic_log": "ERROR nova.compute.manager [req-1234-abcd] [instance: uuid-5678] Network service timeout during instance boot"
}
```

## Setup

### Prerequisites

- Python 3.8+
- Virtual environment at `../logenv` (should already exist in your project)
- BERT model file at `../log_classification_system/models/controlled_bert_model.pth`
- Groq API key for LLM features

### Installation

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Configure environment variables:**

   ```bash
   cp .env.example .env
   # Edit .env and add your GROQ_API_KEY
   ```

3. **Start the server:**

   ```bash
   ./start.sh
   ```

   Or manually:

   ```bash
   source ../logenv/bin/activate
   pip install -r requirements.txt
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

4. **Access the API:**
   - Server: http://localhost:8000
   - Documentation: http://localhost:8000/docs
   - Health Check: http://localhost:8000/health

## Architecture

### Classification Pipeline

1. **Regex Engine (Stage 3)**: Fast pattern matching for ~42% of common logs
2. **BERT Model (Stage 4)**: DistilBERT-based classification for ~26% of medium complexity logs
3. **LLM Fallback (Stage 5)**: LLaMA 3.1 via Groq for ~21% of rare/complex logs

### Model Loading

- All models are loaded at application startup using FastAPI's lifespan events
- Graceful degradation: If BERT model or LLM API is unavailable, the pipeline continues with available components
- Health check endpoint reports the status of each component

### Performance

- Async processing for concurrent requests
- Model inference optimization with proper tensor handling
- Confidence-based routing minimizes expensive LLM calls

## Configuration

Environment variables in `.env`:

```bash
# Required for LLM features
GROQ_API_KEY=your_groq_api_key_here

# Optional overrides
BERT_CONFIDENCE_THRESHOLD=0.7
LLM_MAX_TOKENS=120
LLM_TEMPERATURE=0.3
```

## Error Handling

- Comprehensive error handling with appropriate HTTP status codes
- Graceful degradation when models are unavailable
- Detailed error messages and logging
- Health checks for monitoring component status

## Development

### Running in Development Mode

```bash
uvicorn main:app --reload --log-level debug
```

### Testing the API

Use the interactive documentation at http://localhost:8000/docs or test with curl:

```bash
# Test classification
curl -X POST "http://localhost:8000/api/classify" \
     -H "Content-Type: application/json" \
     -d '{"log_message": "ERROR nova.compute.manager timeout"}'

# Test generation
curl -X POST "http://localhost:8000/api/generate" \
     -H "Content-Type: application/json" \
     -d '{"prompt": "network connection failed"}'
```

## Deployment

For production deployment:

1. Set `reload=False` in uvicorn configuration
2. Use proper WSGI server (gunicorn + uvicorn workers)
3. Configure proper logging and monitoring
4. Set up environment-specific configuration
5. Ensure model files are accessible in production environment

## Troubleshooting

### Common Issues

1. **BERT model not found**: Ensure `controlled_bert_model.pth` exists in the models directory
2. **LLM not working**: Check GROQ_API_KEY in .env file
3. **Import errors**: Ensure virtual environment is activated and dependencies are installed
4. **Port conflicts**: Change port in startup command if 8000 is in use

### Logs

Check application logs for detailed error information. The API uses structured logging for better debugging.
