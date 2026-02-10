from modal import Volume

# Volume to store downloaded model weights (shared across functions)
# This prevents downloading models on every cold boot
model_volume = Volume.from_name("auteur-models", create_if_missing=True)

MODEL_DIR = "/models"
