# Infrnce: An Intelligent Classification Engine for Infrastructure Logs

Infrnce is a full-stack application designed to demonstrate a professional, high-performance log classification engine. It automates the analysis of infrastructure logs by intelligently routing them through a hybrid pipeline, optimizing for speed, accuracy, and cost.

This repository contains the complete project, including the backend API, the frontend client, and the foundational data science research.

## Table of Contents

- [Project Overview](#project-overview)
- [Core Components](#core-components)
- [How It Works: The Hybrid Pipeline](#how-it-works-the-hybrid-pipeline)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Performance Metrics](#performance-metrics)
- [Documentation](#documentation)

## Project Overview

The Infrnce engine solves a common problem in infrastructure management: the overwhelming volume of log data. By automatically classifying logs, it helps engineering teams accelerate incident response, reduce manual triage time, and gain clear insights into system behavior.

This project is presented as a professional-grade software product, complete with:

- An interactive **Engine** for real-time classification with visual pipeline journey
- A **Dashboard** showcasing performance metrics, cost analysis, and architectural details
- A **REST API** providing programmatic access to classification capabilities

## Core Components

The project is structured into three main directories:

1. **`backend/`**: A FastAPI service that exposes the classification pipeline via a REST API  
   [**→ Backend Documentation**](./backend/README.md)

2. **`frontend/`**: A Next.js application that provides a clean, professional user interface for interacting with the engine  
   [**→ Frontend Documentation**](./frontend/README.md)

3. **`log_classification_system/`**: The original data science notebooks, models, and data that form the foundation of the engine's logic  
   [**→ Research Documentation**](./log_classification_system/README.md)

## How It Works: The Hybrid Pipeline

The engine's core is a multi-stage pipeline designed for efficiency:

1. **Regex Engine**: Instantly handles high-volume, simple logs with pattern matching (42% coverage)
2. **BERT Model**: A fine-tuned transformer model provides accurate semantic analysis for common but complex logs (26% coverage)
3. **LLM Fallback**: A powerful Large Language Model handles rare, novel, or low-confidence logs, ensuring high coverage (21% coverage)

This intelligent routing minimizes reliance on expensive LLM calls, making the system both powerful and cost-effective.

### Pipeline Benefits

- **High Coverage**: 92.7% of logs successfully classified
- **Fast Processing**: ~260 logs/second average throughput
- **Cost Efficient**: 89% reduction in expensive API calls through smart routing
- **Accurate Results**: 94.3% overall classification accuracy

## Technology Stack

### Backend

- **Python:** FastAPI, PyTorch, Transformers, LangChain
- **Models:** Fine-tuned DistilBERT, LLaMA 3.1 via Groq API
- **Data Processing:** Pandas, NumPy, Scikit-learn

### Frontend

- **JavaScript:** Next.js 15, React, shadcn/ui
- **Styling:** Tailwind CSS with professional teal theme
- **Icons:** Lucide React for consistent iconography

### Infrastructure

- **Development:** Local development with hot reload
- **Deployment:** Vercel (Frontend), Cloud hosting (Backend)
- **API:** RESTful endpoints with comprehensive error handling

## Getting Started

To run the full application locally, you will need to start both the backend and frontend servers.

**Prerequisites:** Python 3.8+, Node.js, `pip`, `npm`

### Quick Start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/infrnce.git
   cd infrnce
   ```

2. **Start the Backend Server:**

   ```bash
   cd backend
   python -m venv ../logenv
   source ../logenv/bin/activate  # macOS/Linux
   pip install -r requirements.txt
   python main.py
   ```

   The API will run on `http://127.0.0.1:8000`

3. **Start the Frontend Server:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The application will run on `http://localhost:3000`

Once both servers are running, you can access the Infrnce application in your browser.

### Detailed Setup

For comprehensive setup instructions, refer to the individual component documentation:

- [Backend Setup Guide](./backend/README.md#setup-and-installation)
- [Frontend Setup Guide](./frontend/README.md#setup-and-installation)

## Performance Metrics

- **Classification Coverage:** 92.7% of logs successfully processed
- **Overall Accuracy:** 94.3% across all pipeline stages
- **Processing Speed:** ~260 logs/second average throughput
- **Cost Efficiency:** 89% reduction in expensive LLM API calls
- **Response Time:** 150ms average per classification

### Stage Performance

- **Regex Engine:** 100% precision, handles 42% of logs
- **BERT Model:** 94.3% accuracy, processes 26% of logs
- **LLM Fallback:** 89% accuracy, manages 21% of complex logs

## Documentation

### Component Documentation

- [**Backend API Documentation**](./backend/README.md) - FastAPI service setup and endpoints
- [**Frontend Application Documentation**](./frontend/README.md) - Next.js client setup and features
- [**Research & Models Documentation**](./log_classification_system/README.md) - Data science foundation

### Quick Reference

- [**Setup Guide**](./README_SETUP.md) - Quick start instructions for development
- **API Endpoints:**
  - `POST /api/classify` - Classify log messages
  - `POST /api/generate` - Generate synthetic logs
  - `GET /health` - System health check

## Project Architecture

```
Infrnce/
├── backend/              # FastAPI service
│   ├── main.py          # API server
│   ├── classifier.py    # Pipeline logic
│   └── requirements.txt
├── frontend/            # Next.js client
│   ├── src/app/         # Application pages
│   ├── src/components/  # UI components
│   └── package.json
├── log_classification_system/  # Research foundation
│   ├── notebooks/       # Jupyter notebooks
│   ├── models/         # Trained models
│   └── data/           # Datasets
└── logenv/             # Python virtual environment
```

This architecture supports both development and production deployment, with clear separation of concerns between the API service, user interface, and research components.
