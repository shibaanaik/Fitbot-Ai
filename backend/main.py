from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import uuid
from pathlib import Path
from typing import List, Optional

# Load .env from project root
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

from rag.pipeline import run_rag_pipeline
from memory.supabase_memory import save_message, get_chat_history

app = FastAPI(
    title="Fitness RAG Chatbot API",
    description="RAG chatbot backend using Grok, Pinecone, and Supabase memory",
    version="1.0.0"
)

# --- CORS: Allow frontend ports ---
frontend_ports = os.environ.get("FRONTEND_PORTS", "3000,3001,5173").split(",")
origins = []
for port in frontend_ports:
    port = port.strip()
    origins.append(f"http://localhost:{port}")
    origins.append(f"http://127.0.0.1:{port}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Models ---
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    history: Optional[List[ChatMessage]] = None


# --- Chat endpoint ---
@app.post("/api/chat")
async def chat(req: ChatRequest):
    try:
        # Use provided session_id or generate a new one
        session_id = req.session_id or str(uuid.uuid4())
        user_message = req.message

        # 1. Save user message to Supabase
        save_message(session_id=session_id, role="user", message=user_message)

        # 2. Fetch recent chat history for context
        history = get_chat_history(session_id=session_id, limit=10)

        # 3. Run RAG pipeline
        answer = run_rag_pipeline(query=user_message, chat_history=history)

        # 4. Save assistant response to Supabase
        save_message(session_id=session_id, role="assistant", message=answer)

        return {
            "reply": answer,
            "session_id": session_id
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
def health():
    return {"status": "ok", "message": "Fitness RAG Chatbot Backend is running!"}


@app.get("/")
def root():
    return {"message": "Fitness RAG Chatbot Backend is running!"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)