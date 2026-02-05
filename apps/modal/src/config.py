from modal import Secret

# Secret for Hugging Face Token (required for Pyannote)
hf_secret = Secret.from_name("auteur-secrets")
