import modal
import os
import urllib.request
from src.common.images import get_audio_image
from src.common.volumes import model_volume, MODEL_DIR

app = modal.App("auteur-whisper-test")

# Use the same image definition
audio_image = get_audio_image().add_local_python_source("src")

@app.function(
    image=audio_image,
    volumes={MODEL_DIR: model_volume},
    timeout=600,
    gpu="any"  # Request a GPU to verify CUDA
)
def test_transcription():
    import torch
    print("--- Environment Check ---")
    print(f"PyTorch version: {torch.__version__}")
    print(f"CUDA available: {torch.cuda.is_available()}")
    if torch.cuda.is_available():
        print(f"GPU Device: {torch.cuda.get_device_name(0)}")
    print("-------------------------")

    print("Loading Whisper model from volume...")
    try:
        import whisper
        # Force device to GPU if available
        device = "cuda" if torch.cuda.is_available() else "cpu"
        
        # Load from the volume path where we downloaded it
        model_path = os.path.join(MODEL_DIR, "whisper")
        
        # Note: whisper.load_model expects just the name if using cache, 
        # or we can pass the path if we structure it right. 
        # But 'download_root' is the key. It checks if model exists there.
        model = whisper.load_model("large-v3", device=device, download_root=model_path)
        print("Model loaded successfully!")
    except Exception as e:
        print(f"❌ Failed to load model: {e}")
        return

    # Download a sample audio file (short extract)
    print("Downloading sample audio for test...")
    sample_url = "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav"
    sample_path = "jfk.wav"
    urllib.request.urlretrieve(sample_url, sample_path)
    
    print("Running transcription...")
    try:
        result = model.transcribe(sample_path)
        print("\n=== Transcription Result (First 100 chars) ===")
        print(result["text"][:100] + "...")
        print("==============================================")
        print("✅ SUCCESS: Whisper is working!")
    except Exception as e:
        print(f"❌ Transcription failed: {e}")

if __name__ == "__main__":
    with app.run():
        test_transcription.remote()
