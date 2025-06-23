# Hybrid Intelligent Log Classification System

A multi-stage pipeline for classifying OpenStack infrastructure logs using pattern matching, deep learning, and large language models.

## Overview

This project implements a hybrid approach to log classification that combines the speed of regex pattern matching, the learning capabilities of transformer models (BERT), and the semantic understanding of large language models. The system is designed to efficiently process large volumes of OpenStack infrastructure logs, categorizing them for easier analysis and troubleshooting.

## Features

- **Three-Stage Classification Pipeline**:
  - Fast regex pattern matching for common log formats
  - BERT-based deep learning for logs with sufficient examples
  - LLM-based fallback for rare or complex log patterns

- **Intelligent Resource Allocation**: Directs computational resources based on log complexity

- **Semantic Understanding**: Provides detailed error categorization beyond simple pattern matching

- **High Throughput**: Processes ~260 logs/second with ~93% classification coverage

## Project Structure

```
log-classification/
├── data/                # Log datasets and processed results
├── models/              # Saved model files
├── notebooks/           # Notebooks for each pipeline stage
│   ├── dataset_*.ipynb  # Data preparation notebooks
│   ├── regex.ipynb      # Regex classification 
│   ├── bert*.ipynb      # BERT model implementation
│   ├── llm_*.ipynb      # LLM classification
│   └── integration.ipynb# Full pipeline integration
├── main.py              # Main execution script
├── requirements.txt     # Project dependencies
└── README.md            # This file
```

## Requirements

- Python 3.8+
- 8GB RAM (16GB recommended)
- Internet connection for LLM API access
- CUDA-compatible GPU (optional, for faster BERT inference)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/log-classification.git
   cd log-classification
   ```

2. **Set up environment**:
   ```bash
   python -m venv logenv
   source logenv/bin/activate  # On macOS/Linux
   # or
   # logenv\Scripts\activate  # On Windows
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure API keys** (for LLM classification):
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

## Usage

### Full Pipeline

Run the complete classification pipeline:

```bash
python main.py --input data/your_logs.log --output data/classified_logs.csv
```

### Individual Components

1. **Preprocess logs**:
   ```bash
   python -m scripts.prepare_data --input data/raw_logs.log --output data/cleaned_logs.csv
   ```

2. **Run regex classification**:
   ```bash
   python -m scripts.regex_classify --input data/cleaned_logs.csv --output data/regex_results.csv
   ```

3. **Run BERT classification**:
   ```bash
   python -m scripts.bert_classify --input data/regex_results.csv --output data/bert_results.csv
   ```

4. **Run LLM classification**:
   ```bash
   python -m scripts.llm_classify --input data/bert_results.csv --output data/final_results.csv
   ```

## Performance

- **Overall Classification Rate**: 92.7%
- **Classification Accuracy**: 94.3%
- **Processing Speed**: ~260 logs/second
- **Memory Usage**: 4.2GB peak

## License

This project is licensed under the MIT License - see the LICENSE file for details.
