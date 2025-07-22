# Frontend-Backend Connection Setup

## Quick Start

### 1. Start the Backend (FastAPI)

```bash
cd backend
python main.py
```

The backend will run on: `http://127.0.0.1:8000`

### 2. Start the Frontend (Next.js)

```bash
cd frontend
npm run dev
```

The frontend will run on: `http://localhost:3000`

## API Endpoints Used by Frontend

The frontend connects to these backend endpoints:

- **Classification**: `POST http://127.0.0.1:8000/api/classify`

  - Used by: Engine page classification functionality
  - Request body: `{ "log_message": "your log text here" }`

- **Generate Synthetic Log**: `POST http://127.0.0.1:8000/api/generate`

  - Used by: Engine page random log and synthetic log generation
  - Response: `{ "synthetic_log": "generated log text" }`

- **Health Check**: `GET http://127.0.0.1:8000/health`
  - Used by: Frontend to check if backend is running

## Page Structure

- **Home Page** (`/`): Landing page with information about the system
- **Engine Page** (`/engine`): Interactive classification interface
- **Dashboard Page** (`/dashboard`): Performance metrics and analytics

## Connection Status

✅ Frontend properly configured to connect to backend  
✅ API endpoints aligned between frontend and backend  
✅ CORS configured in backend for frontend origin  
✅ Error handling with fallback mock data for demo purposes
