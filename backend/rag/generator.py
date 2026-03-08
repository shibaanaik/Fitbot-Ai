from groq import Groq
from config import GROQ_API_KEY, GROQ_MODEL
from typing import List

client = Groq(api_key=GROQ_API_KEY)

SYSTEM_PROMPT = """You are a certified professional fitness coach and nutrition expert.

Your job is to answer the user's question using ONLY the provided context from fitness documents.

RULES:
1. Use ONLY the provided context to answer the question.
2. If the context does not contain the answer, say: "I don't have enough information from the fitness documents to answer that."
3. Never invent workouts, diets, or medical advice not in the context.
4. Give clear, practical and safe fitness advice.
5. Structure the answer clearly with bullet points when helpful.
6. Keep answers concise but helpful.
7. Be warm and motivating — you are a personal coach."""


def generate_answer(question: str, context: str, chat_history: List[dict] = []) -> str:
    """
    Generate an answer using Grok LLM with RAG context and chat memory.
    """

    # Build messages list starting with system prompt
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    # Inject recent chat history for memory context (last 6 turns max)
    for entry in chat_history[-6:]:
        role = entry.get("role", "user")
        content = entry.get("message", "")
        if role in ("user", "assistant") and content:
            messages.append({"role": role, "content": content})

    # Add current user question with retrieved context
    user_prompt = f"""Use the following fitness document context to answer my question.

---CONTEXT---
{context}

---MY QUESTION---
{question}
"""
    messages.append({"role": "user", "content": user_prompt})

    response = client.chat.completions.create(
        model=GROQ_MODEL,
        temperature=0.2,
        max_tokens=600,
        messages=messages
    )

    return response.choices[0].message.content