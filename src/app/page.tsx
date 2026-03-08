"use client";

import ChatWindow from "@/components/ChatWindow";
import { useChat } from "@/hooks/useChat";

export default function Home() {
  const { messages, isTyping, sendMessage, clearChat } = useChat();

  return (
    <ChatWindow
      messages={messages}
      isTyping={isTyping}
      onSend={sendMessage}
      onReset={clearChat}
    />
  );
}