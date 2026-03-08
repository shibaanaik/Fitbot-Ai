import sys
import os

# Add project root to Python path
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(ROOT_DIR)

from backend.rag.generator import generate_answer


question = "How often should beginners workout in a week?"

context = """
Beginners should start with 3 to 4 workout sessions per week.
Each session should focus on compound exercises like squats,
push-ups, rows, and lunges. Rest days are important for
muscle recovery and injury prevention.
"""

response = generate_answer(question, context)

print("\nAI Response:\n")
print(response)