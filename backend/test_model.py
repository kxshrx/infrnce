#!/usr/bin/env python3
"""
Simple test script to verify BERT model loading and functionality
"""

import asyncio
import sys
import os
sys.path.append('/Users/kxshrx/dev/log-classification/backend')

from classifier import LogClassifier

async def test_model():
    print("Testing BERT model loading...")
    
    classifier = LogClassifier()
    await classifier.initialize()
    
    print(f"Classifier initialized: {classifier.is_initialized}")
    print(f"BERT loaded: {classifier.bert_loaded}")
    print(f"LLM loaded: {classifier.llm_loaded}")
    print(f"Regex loaded: {classifier.regex_loaded}")
    
    if classifier.bert_loaded:
        print("\n✅ BERT model loaded successfully!")
        print(f"Model has {len(classifier.bert_label_mapping)} labels")
        print("Label mapping:", classifier.bert_label_mapping)
        
        # Test a simple classification
        test_log = "INFO nova.compute.manager [instance: abc-123] VM created successfully"
        result = await classifier.classify_log(test_log)
        print(f"\nTest classification result:")
        print(f"  Category: {result['category']}")
        print(f"  Confidence: {result['confidence']}")
        print(f"  Stage: {result['stage']}")
    else:
        print("❌ BERT model failed to load")

if __name__ == "__main__":
    asyncio.run(test_model())
