import sys
import os

# Add project root to Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from ingestion.upload_pinecone import upload_documents


if __name__ == "__main__":
    print("Starting document ingestion...")

    upload_documents()

    print("Ingestion completed successfully.")