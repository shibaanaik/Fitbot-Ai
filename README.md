# 🏋️ FitBot AI — Fitness RAG Chatbot

A production-ready AI fitness chatbot powered by **Retrieval-Augmented Generation (RAG)**. FitBot answers questions using your own fitness documents — not hallucinated advice — by combining semantic search, vector storage, and a fast LLM.

![FitBot AI](https://img.shields.io/badge/FitBot-AI%20Powered-c8f135?style=for-the-badge&logo=openai&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![Pinecone](https://img.shields.io/badge/Pinecone-Vector%20DB-blue?style=for-the-badge)
![Groq](https://img.shields.io/badge/Groq-LLaMA%203.1-orange?style=for-the-badge)

---

## ✨ Features

- 🤖 **RAG Pipeline** — answers grounded in your fitness documents, not LLM guesswork
- ⚡ **Groq + LLaMA 3.1** — ultra-fast inference (200+ tokens/sec) on the free tier
- 🔍 **Pinecone Vector Search** — semantic similarity search across your fitness knowledge base
- 🧠 **Supabase Chat Memory** — persistent, session-based conversation history
- 🎨 **Minimal Dark UI** — electric lime on charcoal, built with Next.js + Tailwind CSS
- 🔒 **CORS Protected** — only whitelisted frontend origins can hit the API

---

## 🏗️ Architecture

```
User Message (Frontend)
        │
        ▼
   FastAPI Backend  (/api/chat)
        │
        ├──► Save user message ──────────► Supabase
        │
        ├──► Fetch chat history ◄────────── Supabase
        │
        └──► RAG Pipeline
                  │
                  ├── 1. Embed query (BAAI/bge-base-en-v1.5)
                  ├── 2. Search Pinecone → top 5 chunks
                  ├── 3. Build context string
                  └── 4. Generate answer (Groq / LLaMA 3.1)
                              │
                              ▼
                        Save response → Supabase
                              │
                              ▼
                        Return to Frontend
```

---

## 🗂️ Project Structure

```
fitness-rag-chatbot/
│
├── backend/
│   ├── ingestion/
│   │   ├── loader.py            # Load raw documents
│   │   ├── chunker.py           # Split docs into chunks
│   │   └── upload_pinecone.py   # Embed & upload to Pinecone
│   │
│   ├── memory/
│   │   └── supabase_memory.py   # Save & fetch chat history
│   │
│   ├── rag/
│   │   ├── embedder.py          # Embed queries with BGE model
│   │   ├── retriever.py         # Query Pinecone for top-k chunks
│   │   ├── generator.py         # Generate answer via Groq LLM
│   │   └── pipeline.py          # Orchestrates the full RAG flow
│   │
│   ├── scripts/
│   │   └── ingest.py            # Run ingestion pipeline
│   │
│   ├── config.py                # Load environment variables
│   └── main.py                  # FastAPI app & /api/chat endpoint
│
├── frontend/
│   └── src/
│       ├── app/
│       │   ├── layout.tsx       # Root layout
│       │   ├── page.tsx         # Entry point
│       │   └── not-found.tsx    # 404 page
│       ├── components/
│       │   ├── ChatWindow.tsx   # Main chat UI
│       │   ├── MessageBubble.tsx# Message rendering
│       │   └── InputBox.tsx     # Input + send button
│       ├── hooks/
│       │   └── useChat.ts       # State, API calls, session
│       ├── lib/
│       │   └── api.ts           # Fetch wrapper
│       └── types/
│           └── chat.ts          # TypeScript interfaces
│
└── .env                         # Environment variables (never commit)
```

---

## ⚙️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js 14 (App Router) | UI, routing, SSR |
| Backend | FastAPI (Python) | REST API, async, auto docs |
| Vector DB | Pinecone | Semantic similarity search |
| Embeddings | BAAI/bge-base-en-v1.5 | Local, free, 768-dim vectors |
| LLM | Groq + LLaMA 3.1 8B | Fast, free-tier inference |
| Memory | Supabase (PostgreSQL) | Persistent chat history |
| Styling | Tailwind CSS + Framer Motion | UI design + animations |

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- A [Pinecone](https://pinecone.io) account (free)
- A [Supabase](https://supabase.com) account (free)
- A [Groq](https://console.groq.com) API key (free)

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/fitness-rag-chatbot.git
cd fitness-rag-chatbot
```

---

### 2. Set Up Environment Variables

Create a `.env` file at the **project root**:

```env
# Pinecone
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX=your_index_name

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key

# Groq
GROQ_API_KEY=gsk_your_groq_api_key
GROQ_MODEL=llama-3.1-8b-instant
```

Also create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

---

### 3. Set Up Supabase

Run this SQL in your **Supabase Dashboard → SQL Editor**:

```sql
CREATE TABLE IF NOT EXISTS chat_history (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  TEXT NOT NULL,
  role        TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_history_session_id
  ON chat_history (session_id, created_at ASC);
```

---

### 4. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

`requirements.txt` should include:
```
fastapi
uvicorn
python-dotenv
pinecone-client
sentence-transformers
groq
supabase
pydantic
```

---

### 5. Ingest Your Fitness Documents

Place your fitness PDFs or text files in the `data/` folder, then run:

```bash
cd backend
python scripts/ingest.py
```

This will chunk, embed, and upload all documents to your Pinecone index.

---

### 6. Start the Backend

```bash
cd backend
uvicorn main:app --reload --port 8000
```

API will be live at `http://localhost:8000`
Interactive docs at `http://localhost:8000/docs`

---

### 7. Install & Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 🧠 How RAG Works (Simple Explanation)

1. **Ingestion (one-time):** Your fitness documents are split into chunks, each chunk is converted to a vector (768 numbers representing meaning), and stored in Pinecone.

2. **Query (every message):**
   - User question → converted to a vector using the same embedding model
   - Pinecone finds the 5 most semantically similar chunks
   - Those chunks become the "context" handed to the LLM
   - LLM answers using ONLY that context — no hallucination

> Think of it as an open-book exam: the LLM can only use the pages you hand it.

---

## 📡 API Reference

### `POST /api/chat`

Send a message and get a RAG-powered response.

**Request:**
```json
{
  "message": "How do I build muscle fast?",
  "session_id": "optional-uuid-for-memory"
}
```

**Response:**
```json
{
  "reply": "Based on the fitness documents...",
  "session_id": "uuid-for-this-session"
}
```

### `GET /health`

Check if the backend is running.

```json
{ "status": "ok", "message": "Fitness RAG Chatbot Backend is running!" }
```

---

## 🔧 Configuration

| Variable | Description | Default |
|---|---|---|
| `GROQ_MODEL` | LLM model to use | `llama-3.1-8b-instant` |
| `PINECONE_INDEX` | Name of your Pinecone index | required |
| `FRONTEND_PORTS` | Allowed CORS ports | `3000,3001,5173` |

**Alternative Groq models** (change in `.env`):
- `llama-3.1-8b-instant` — fastest, free tier
- `llama-3.3-70b-versatile` — smarter, still free tier
- `mixtral-8x7b-32768` — longer context window

---

## 🛣️ Roadmap

- [ ] User authentication (Supabase Auth)
- [ ] Streaming LLM responses (SSE)
- [ ] Re-ranking retrieved chunks (Cohere Rerank)
- [ ] Source citation in responses
- [ ] Upload documents via UI
- [ ] Response caching (Redis)
- [ ] Docker deployment

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## ⚠️ Disclaimer

FitBot AI is for informational purposes only. Always consult a certified fitness professional or medical doctor before starting any new workout or nutrition program.

---

## 📄 License

MIT License — feel free to use, modify, and distribute.

---

<div align="center">
  Built with ❤️ using FastAPI, Next.js, Pinecone, and Groq
</div>
