# Frontend - Hybrid Intelligent Log Classification System

## Overview

This is the interactive demo UI for the Hybrid Intelligent Log Classification System. It showcases the three-stage pipeline (Regex → BERT → LLM) with a stunning, professional interface built with Next.js and shadcn/ui.

## Features

- **Performance Dashboard**: Live metrics showing 92.7% Coverage, 94.3% Accuracy, and ~260 logs/sec processing speed
- **Interactive Classification Hub**: Multiple ways to input logs for classification
- **Guided Tour**: Pre-built examples that demonstrate each stage of the pipeline
- **Pipeline Journey Visualizer**: Real-time visualization of which stage processed the log
- **Responsive Design**: Beautiful UI that works on desktop and mobile

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript (JSX)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+
- Backend API running on `http://localhost:8000`

## Getting Started

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Start Development Server**:

   ```bash
   npm run dev
   ```

3. **Open in Browser**:
   ```
   http://localhost:3000
   ```

## Backend Integration

The frontend connects to the backend API for:

- `POST /api/classify` - Classify a log message
- `POST /api/generate` - Generate synthetic logs

Make sure your backend is running on `http://localhost:8000` before using the live classification features.

## Usage

### Guided Tour

Click one of the three guided tour buttons to see examples designed for each stage:

- **Simple Log (Regex)**: Demonstrates pattern matching
- **Common Error (BERT)**: Shows deep learning classification
- **Complex Failure (LLM)**: Exhibits AI semantic understanding

### Random & Synthetic

- **Get Random Existing Log**: Loads a sample from the dataset
- **Generate New Log with AI**: Creates a new synthetic log using the backend

### Manual Input

Type any OpenStack log message and click "Classify Log!" to see the full pipeline in action.

## Key Components

- `src/app/page.js` - Main application page
- `src/components/PipelineJourney.jsx` - Pipeline visualization component
- `src/components/ui/` - shadcn/ui components

## Build for Production

```bash
npm run build
npm start
```

## Features Showcase

1. **Header Dashboard**: Key performance metrics prominently displayed
2. **Interactive Hub**: Three input methods with beautiful UI
3. **Results Visualization**: Pipeline journey with tooltips and status indicators
4. **Educational Content**: Accordion explaining how each stage works
5. **Responsive Design**: Optimized for all screen sizes

The UI successfully demonstrates the project's value proposition as an intelligent, hybrid approach to log classification that combines speed, accuracy, and comprehensive coverage.
