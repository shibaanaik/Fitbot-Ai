from rag.embedder import embed_query
from rag.retriever import retrieve_documents
from rag.generator import generate_answer
from typing import List, Optional


def run_rag_pipeline(query: str, chat_history: Optional[List[dict]] = None) -> str:
    """
    Full RAG pipeline:
    1. Embed the user query
    2. Retrieve relevant docs from Pinecone
    3. Build context string
    4. Generate answer via Grok LLM with chat history
    """

    # Step 1: Embed query
    query_embedding = embed_query(query)

    # Step 2: Retrieve relevant docs from Pinecone
    docs = retrieve_documents(query_embedding)

    # Step 3: Build context from retrieved docs
    if docs:
        context = "\n\n".join(docs)
    else:
        context = "No relevant fitness documents found."

    # Step 4: Generate answer (with memory context)
    answer = generate_answer(
        question=query,
        context=context,
        chat_history=chat_history or []
    )

    return answer