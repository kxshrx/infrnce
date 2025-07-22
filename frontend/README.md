# Infrnce Engine: Frontend Client

This directory contains the Next.js frontend for the Infrnce project. This application provides the user interface for interacting with the classification engine and viewing the performance dashboard.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Design Philosophy](#design-philosophy)

## Features

- **Interactive Engine:** A clean, intuitive interface for classifying logs via manual input, dataset samples, and AI-generated logs
- **Visual Pipeline Journey:** Real-time display showing how a log is processed through each stage of the backend pipeline (Regex → BERT → LLM)
- **Performance Dashboard:** Data-rich overview of the engine's architecture, performance metrics, cost analysis, and stage breakdowns
- **Professional Design:** Clean, minimalist interface using sophisticated teal accent colors and elegant typography
- **Responsive Layout:** Fully responsive design optimized for all devices

## Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** JavaScript (React)
- **UI Library:** shadcn/ui with Radix UI primitives
- **Styling:** Tailwind CSS v4 with custom teal theme
- **Icons:** Lucide React
- **Backend Integration:** FastAPI endpoints at http://127.0.0.1:8000

## Setup and Installation

**Prerequisites:** Node.js and `npm`

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Running the Application

To start the development server, run the following command from this directory:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

**Note:** The backend API must be running on `http://127.0.0.1:8000` for the frontend to function correctly.

## Project Structure

```
src/
├── app/
│   ├── layout.js          # Global layout with Header/Footer
│   ├── page.js            # Homepage with comprehensive sections
│   ├── engine/
│   │   └── page.js        # Interactive classification engine
│   └── dashboard/
│       └── page.js        # Performance analytics dashboard
├── components/
│   ├── Header.jsx         # Navigation header
│   ├── Footer.jsx         # Site footer
│   └── ui/               # shadcn/ui components
└── lib/
    └── utils.js          # Utility functions
```

## Design Philosophy

**Clarity as a Feature** - Every element serves a purpose. The interface maintains professional minimalism while showcasing the intelligent classification technology through clean design and flawless user experience.

## API Integration

The application integrates with three FastAPI endpoints:

- `POST /api/classify` - Main classification endpoint with detailed journey information
- `POST /api/generate` - Generate synthetic logs for testing
- `GET /health` - Backend health monitoring

The frontend includes comprehensive error handling with fallback mock data for demo purposes when the backend is unavailable.
