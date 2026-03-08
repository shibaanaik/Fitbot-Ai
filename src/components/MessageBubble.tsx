"use client";

import { motion } from "framer-motion";
import { Dumbbell, User } from "lucide-react";
import { Message } from "@/types/chat";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`flex mb-5 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div className="mr-3 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/15">
          <Dumbbell className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
        </div>
      )}

      {/* Bubble */}
      <div
        className={`
          max-w-[78%] px-4 py-3 text-sm leading-relaxed
          ${isUser
            ? "rounded-2xl rounded-br-md bg-primary text-primary-foreground font-medium"
            : "rounded-2xl rounded-bl-md border border-border bg-card text-foreground/90 font-light"
          }
        `}
      >
        {message.content}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="ml-3 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-secondary border border-border">
          <User className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={2} />
        </div>
      )}
    </motion.div>
  );
}