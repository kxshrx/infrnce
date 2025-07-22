# backend/quantize_model.py

import torch
from transformers import AutoModelForSequenceClassification
import os

# --- Configuration ---
# This section defines the constants and file paths for the operation.

# The number of classification labels your model was trained on.
# Based on your project's README, this is 6.
NUM_LABELS = 6

# Define the input and output paths to avoid typos.
INPUT_MODEL_PATH = "./models/controlled_bert_model.pth"
QUANTIZED_MODEL_PATH = "./models/model_quantized.pth"

def quantize_model():
    """
    Loads a fine-tuned PyTorch model, applies dynamic quantization,
    and saves the smaller model to a new file.
    """
    print("--- Starting Safe Model Quantization ---")

    # 1. Verify that the input model file exists before proceeding.
    if not os.path.exists(INPUT_MODEL_PATH):
        print(f"❌ ERROR: Input model file not found at '{INPUT_MODEL_PATH}'")
        print("Please ensure your fine-tuned model is in the correct directory.")
        return

    print(f"✅ Found original model at '{INPUT_MODEL_PATH}'")

    # 2. Load the original model architecture.
    # This creates the "shell" of the model.
    print("Loading the base DistilBERT model architecture...")
    model_shell = AutoModelForSequenceClassification.from_pretrained(
        "distilbert-base-uncased",
        num_labels=NUM_LABELS
    )

    # 3. Load your fine-tuned weights into the model shell.
    # We explicitly load the model onto the CPU for this process.
    print("Loading your fine-tuned weights...")
    model_shell.load_state_dict(
        torch.load(INPUT_MODEL_PATH, map_location=torch.device('cpu'))
    )
    model_shell.eval() # Set the model to evaluation mode.

    # 4. Apply dynamic quantization.
    # This is the core step that shrinks the model's size and memory footprint.
    print("Applying dynamic quantization... (This may take a moment)")
    
    try:
        # Try the standard dynamic quantization first
        quantized_model = torch.quantization.quantize_dynamic(
            model_shell, {torch.nn.Linear}, dtype=torch.qint8
        )
        print("✅ Model successfully quantized using standard method.")
    except RuntimeError as e:
        print(f"Standard quantization failed: {e}")
        print("Attempting alternative quantization approach...")
        
        # Alternative approach: manually convert to half precision
        # This provides significant memory savings while being more compatible
        print("Converting model to half precision (float16)...")
        quantized_model = model_shell.half()  # Convert to float16
        print("✅ Model successfully converted to half precision.")

    # 5. Save the new, smaller quantized model to the specified output path.
    print(f"Saving new quantized model to '{QUANTIZED_MODEL_PATH}'...")
    torch.save(quantized_model.state_dict(), QUANTIZED_MODEL_PATH)

    # --- Verification ---
    original_size = os.path.getsize(INPUT_MODEL_PATH) / (1024 * 1024)
    quantized_size = os.path.getsize(QUANTIZED_MODEL_PATH) / (1024 * 1024)

    print("\n--- Verification Complete ---")
    print(f"Original model size: {original_size:.2f} MB")
    print(f"New quantized model size: {quantized_size:.2f} MB")
    print("✅ Process complete. You can now update your backend to use the new, smaller model for deployment.")

if __name__ == "__main__":
    quantize_model()
