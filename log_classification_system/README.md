# Log Classification System (Core Research & Models)

This directory contains the original data science research, notebooks, and models that form the foundation of the **Infrnce** engine. This work represents the core investigation into log classification that preceded the development of the full-stack application.

## Overview

The primary goal of this research was to develop a hybrid, multi-stage pipeline for efficiently classifying OpenStack infrastructure logs. The pipeline intelligently routes logs to different processing stages (Regex, BERT, LLM) based on their complexity to optimize for both accuracy and cost.

## Table of Contents
- [Project Structure](#project-structure)
- [Key Findings](#key-findings)
- [Pipeline Stages](#pipeline-stages)
- [Data Sources](#data-sources)
- [Model Details](#model-details)
- [Research Notebooks](#research-notebooks)

## Project Structure

```
log_classification_system/
├── data/                          # Raw and processed datasets
│   ├── openstack-nova-*.log       # Original OpenStack log files
│   ├── dataset_sampling.csv       # Processed and sampled data
│   └── *.csv                      # Various processing stage outputs
├── models/                        # Saved model files
│   ├── controlled_bert_model.pth  # Fine-tuned DistilBERT model
│   └── model.txt                  # Model metadata
├── notebooks/                     # Research and development notebooks
│   ├── dataset_*.ipynb            # Data preparation and cleaning
│   ├── bert*.ipynb                # BERT model development
│   ├── llm_*.ipynb                # LLM implementation
│   ├── regex.ipynb                # Regex pattern development
│   └── integration.ipynb          # Full pipeline integration
├── results/                       # Analysis outputs and reports
│   ├── pipeline_final_report.txt  # Comprehensive results
│   ├── *.csv                      # Classification results
│   └── pipeline_performance.png   # Performance visualizations
└── docs/                          # Technical documentation
    ├── documentation.md            # Detailed technical specs
    └── project_details.txt         # Project requirements
```

## Key Findings

The research demonstrated the viability of a hybrid approach, achieving:

- **Overall Classification Coverage:** 92.7%
- **Classification Accuracy:** 94.3%
- **Processing Throughput:** ~260 logs/second
- **Cost Efficiency:** 89% reduction in expensive LLM API calls through intelligent routing

### Performance by Stage
- **Regex Engine:** Handles 42% of logs with 100% precision
- **BERT Model:** Processes 26% of logs with 94.3% accuracy
- **LLM Fallback:** Manages 21% of complex logs with 89% accuracy

## Pipeline Stages

### Stage 1: Data Preparation
- **Purpose:** Clean and structure raw OpenStack logs
- **Input:** 137,540 raw log entries from multiple OpenStack components
- **Output:** Standardized CSV format with extracted features
- **Key Operations:** Timestamp normalization, noise removal, strategic sampling

### Stage 2: Data Clustering  
- **Purpose:** Group similar logs for targeted processing
- **Method:** TF-IDF vectorization with K-means clustering
- **Result:** Identification of common log patterns and rare edge cases

### Stage 3: Regex Classification
- **Purpose:** Fast classification of common, structured log patterns
- **Implementation:** Hand-crafted patterns for error types, service calls, and routine operations
- **Coverage:** 42% of logs classified with deterministic accuracy

### Stage 4: BERT Classification
- **Purpose:** Semantic classification of logs with sufficient training examples
- **Model:** Fine-tuned DistilBERT on OpenStack log corpus
- **Training:** 80/20 train/test split with confidence threshold filtering
- **Performance:** 94.3% accuracy on test set

### Stage 5: LLM Classification
- **Purpose:** Handle rare, complex, or novel log patterns
- **Implementation:** Groq API with LLaMA 3.1 70B model
- **Approach:** Few-shot learning with structured prompting
- **Cost Optimization:** Used only for logs that escape earlier stages

## Data Sources

The research utilized authentic OpenStack infrastructure logs:

- **Primary Dataset:** OpenStack Nova component logs from LogHub repository
- **Volume:** 100,000+ normal operation logs + error condition samples
- **Diversity:** VM creation, networking, storage, and service communication logs
- **Format:** Unstructured text with timestamps, component names, and variable message content

## Model Details

### BERT Model (`controlled_bert_model.pth`)
- **Base Model:** DistilBERT (distilbert-base-uncased)
- **Fine-tuning:** 11 OpenStack-specific log categories
- **Training Data:** 15,000 manually labeled log samples
- **Validation:** Cross-validation with confidence threshold tuning
- **Inference:** PyTorch with GPU acceleration support

### LLM Integration
- **Provider:** Groq API for fast inference
- **Model:** LLaMA 3.1 70B parameter model
- **Prompt Engineering:** Structured few-shot examples with category definitions
- **Rate Limiting:** Implemented to manage API costs and quotas

## Research Notebooks

### Data Processing (`dataset_*.ipynb`)
- **dataset_sampling.ipynb:** Strategic sampling for balanced training sets
- **dataset_manage.ipynb:** Data quality assessment and cleaning
- **dataset_refine.ipynb:** Feature extraction and preprocessing
- **dataset_cluster.ipynb:** Clustering analysis and pattern identification

### Model Development
- **bert.ipynb:** Initial BERT model experiments
- **bert-v2.ipynb:** Optimized BERT implementation with hyperparameter tuning
- **llm_v1.ipynb:** Initial LLM integration and prompt development
- **llm_v2.ipynb:** Enhanced LLM implementation with error handling

### Integration & Analysis
- **regex.ipynb:** Regex pattern development and testing
- **integration.ipynb:** Full pipeline assembly and validation
- **unified_results.ipynb:** Comprehensive performance analysis

## Research Outcomes

This foundational work demonstrated that:

1. **Hybrid approaches significantly outperform single-method classification**
2. **Intelligent routing reduces computational costs while maintaining accuracy**
3. **Domain-specific fine-tuning improves BERT performance on infrastructure logs**
4. **LLM fallback ensures high coverage for edge cases**

The research was subsequently productized into the Infrnce Engine, providing a production-ready API and user interface for the classification pipeline.
