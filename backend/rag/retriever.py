from pinecone import Pinecone
from config import PINECONE_API_KEY, PINECONE_INDEX
from typing import List

# Initialize Pinecone client
pc = Pinecone(api_key=PINECONE_API_KEY)
index = pc.Index(PINECONE_INDEX)


def retrieve_documents(query_embedding: List[float], top_k: int = 5) -> List[str]:
    """
    Query Pinecone index and return list of matching text chunks.
    """
    results = index.query(
        vector=query_embedding,
        top_k=top_k,
        include_metadata=True
    )

    documents = []
    for match in results.get("matches", []):
        metadata = match.get("metadata", {})
        text = metadata.get("text", "")
        if text:
            documents.append(text)

    return documents