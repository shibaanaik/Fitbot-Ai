import os
from dotenv import load_dotenv

load_dotenv()

print("Grok:", os.getenv("GROK_API_KEY")[:10])
print("Pinecone:", os.getenv("PINECONE_API_KEY")[:10])
print("Supabase URL:", os.getenv("SUPABASE_URL"))