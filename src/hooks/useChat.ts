import { useState, useCallback, useRef } from "react";
import { Message } from "@/types/chat";
import { sendChatMessage } from "@/lib/api";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Persist session_id for the lifetime of this browser session
  const sessionIdRef = useRef<string | null>(
    typeof window !== "undefined" ? sessionStorage.getItem("chat_session_id") : null
  );

  const sendMessage = useCallback(async (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await sendChatMessage({
        message: text,
        session_id: sessionIdRef.current ?? undefined,
      });

      // Persist the session_id returned by backend
      if (response.session_id) {
        sessionIdRef.current = response.session_id;
        if (typeof window !== "undefined") {
          sessionStorage.setItem("chat_session_id", response.session_id);
        }
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.reply,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "⚠️ Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    sessionIdRef.current = null;
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("chat_session_id");
    }
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    clearChat,
  };
}