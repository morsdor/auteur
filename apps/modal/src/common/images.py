from modal import Image

def get_audio_image():
    return (
        Image.debian_slim(python_version="3.11")
        .apt_install("ffmpeg", "git", "python3-dev", "build-essential")
        .pip_install(
            "numpy<2.0.0",
            "torch==2.3.1",
            "torchaudio==2.3.1",
            "openai-whisper",
            "pyannote.audio",
            "transformers",
            "accelerate",
            "soundfile",
            "huggingface_hub<0.25.0"
        )
        .pip_install("git+https://github.com/SWivid/F5-TTS.git")
    )

def get_vision_image():
    return (
        Image.debian_slim(python_version="3.10")
        .apt_install("ffmpeg", "libgl1", "libglib2.0-0")
        .pip_install(
            "torch==2.1.2",
            "torchvision==0.16.2",
            "opencv-python-headless",
            "mediapipe",
            "gfpgan",
            "numpy"
        )
    )
