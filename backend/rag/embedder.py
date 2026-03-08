from sentence_transformers import SentenceTransformer
from typing import List

# Load embedding model once at startup
model = SentenceTransformer("BAAI/bge-base-en-v1.5")


def embed_query(query: str) -> List[float]:
    """
    Embed a single user query for Pinecone retrieval.
    """
    embedding = model.encode(
        query,
        normalize_embeddings=True
    )
    return embedding.tolist()


def embed_documents(texts: List[str]) -> List[List[float]]:
    """
    Embed a list of document chunks for ingestion into Pinecone.
    """
    embeddings = model.encode(
        texts,
        normalize_embeddings=True,
        show_progress_bar=True
    )
    return embeddings.tolist()