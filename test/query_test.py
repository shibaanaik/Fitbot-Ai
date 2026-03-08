from sentence_transformers import SentenceTransformer
from pinecone import Pinecone
import os
from dotenv import load_dotenv

load_dotenv()

# Load embedding model
model = SentenceTransformer("BAAI/bge-base-en-v1.5")

# Connect to Pinecone
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index = pc.Index("fitness-rag")   # your index name

query = "How much protein should I eat daily?"

# Convert question to vector
vector = model.encode(query).tolist()

# Search Pinecone
results = index.query(
    vector=vector,
    top_k=5,
    include_metadata=True
)

print("\nTop Results:\n")

for match in results["matches"]:
    print(match["metadata"]["text"])
    print("------")