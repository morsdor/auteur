import os
from modal import App
from src.common.images import get_audio_image
from src.common.volumes import model_volume, MODEL_DIR
from src.config import hf_secret

app = App("auteur-model-downloader")

# Add local source "src" to the image so it can be imported remotely
audio_image = get_audio_image().add_local_python_source("src")

@app.function(
    image=audio_image,
    volumes={MODEL_DIR: model_volume},
    secrets=[hf_secret],
    timeout=3600  # Allow 1 hour for downloads
)
def download_models():
    print(f"Checking models in {MODEL_DIR}...")
    
    # 1. Download Whisper Large v3
    try:
        import whisper
        print("Downloading Whisper large-v3...")
        whisper.load_model("large-v3", download_root=os.path.join(MODEL_DIR, "whisper"))
        print("Whisper large-v3 downloaded.")
    except Exception as e:
        print(f"Error downloading Whisper: {e}")

    # 2. Download Pyannote (requires HF_TOKEN)
    # 2. Download Pyannote (Skipped due to dependency issues)
    # try:
    #     from pyannote.audio import Pipeline
    #     from huggingface_hub import login
    #     print("Downloading Pyannote Segmentation 3.0...")
    #     os.environ["HF_HOME"] = os.path.join(MODEL_DIR, "huggingface")
    #     login(token=os.environ["HF_TOKEN"])
    #     Pipeline.from_pretrained("pyannote/speaker-diarization-3.1")
    #     print("Pyannote models downloaded.")
    # except Exception as e:
    #     print(f"Error downloading Pyannote: {e}")

    # 3. Download F5-TTS
    try:
        from huggingface_hub import snapshot_download
        print("Downloading F5-TTS details...")
        # Explicitly set cache_dir to ensure it goes to the volume
        cache_path = os.path.join(MODEL_DIR, "huggingface") 
        snapshot_download(
            repo_id="SWivid/F5-TTS", 
            allow_patterns=["*.pt", "*.safetensors", "*.generated_files"], # Extended patterns
            token=os.environ["HF_TOKEN"],
            cache_dir=cache_path
        )
        print(f"F5-TTS models downloaded to {cache_path}")
    except Exception as e:
        print(f"Error downloading F5-TTS: {e}")

if __name__ == "__main__":
    import modal
    with modal.enable_output():
        with app.run():
            download_models.remote()
