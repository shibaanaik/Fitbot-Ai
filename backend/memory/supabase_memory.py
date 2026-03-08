from supabase import create_client, Client
from config import SUPABASE_URL, SUPABASE_KEY
from typing import List

# Initialize Supabase client once
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


def save_message(session_id: str, role: str, message: str):
    """
    Save a single message to the chat_history table.
    """
    data = {
        "session_id": session_id,
        "role": role,
        "message": message
    }
    response = supabase.table("chat_history").insert(data).execute()
    return response


def get_chat_history(session_id: str, limit: int = 10) -> List[dict]:
    """
    Fetch the most recent messages for a session (ordered oldest → newest).
    """
    response = (
        supabase.table("chat_history")
        .select("role, message, created_at")
        .eq("session_id", session_id)
        .order("created_at", desc=False)
        .limit(limit)
        .execute()
    )
    return response.data


def clear_chat_history(session_id: str):
    """
    Delete all messages for a session.
    """
    response = (
        supabase.table("chat_history")
        .delete()
        .eq("session_id", session_id)
        .execute()
    )
    return response