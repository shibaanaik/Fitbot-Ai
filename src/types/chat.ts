export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  message: string;
  session_id?: string;
  history?: Message[];
}

export interface ChatResponse {
  reply: string;
  session_id: string;
}

export type AppState = {
  messages: Message[];
  isTyping: boolean;
};