import os
from pinecone import Pinecone

from ingestion.loader import load_pdfs
from ingestion.chunker import chunk_documents
from rag.embedder import embed_documents
from config import PINECONE_API_KEY, PINECONE_INDEX


def upload_documents():

    # Build absolute path to project root
    BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
    PDF_DIR = os.path.join(BASE_DIR, "data", "pdfs")

    print("Loading PDFs...")

    documents = load_pdfs(PDF_DIR)

    print(f"{len(documents)} pages loaded")

    print("Chunking documents...")

    chunks = chunk_documents(documents)

    print(f"{len(chunks)} chunks created")

    texts = [chunk.page_content for chunk in chunks]

    print("Creating embeddings...")

    embeddings = embed_documents(texts)

    print("Connecting to Pinecone...")

    pc = Pinecone(api_key=PINECONE_API_KEY)
    index = pc.Index(PINECONE_INDEX)

    print("Uploading to Pinecone...")

    vectors = []

    for i, (text, embedding) in enumerate(zip(texts, embeddings)):

        vectors.append({
            "id": f"chunk-{i}",
            "values": embedding,
            "metadata": {
                "text": text
            }
        })

    # Upload in batches (better for large datasets)
    batch_size = 100

    for i in range(0, len(vectors), batch_size):
        batch = vectors[i:i + batch_size]
        index.upsert(vectors=batch)

    print("Upload complete!")