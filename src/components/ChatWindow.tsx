"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Flame, Heart, Zap } from "lucide-react";
import MessageBubble from "@/components/MessageBubble";
import InputBox from "@/components/InputBox";
import { Message } from "@/types/chat";

const SUGGESTION_CHIPS = [
  { label: "Build muscle fast",    icon: Dumbbell },
  { label: "Burn fat workout",     icon: Flame },
  { label: "Heart-healthy cardio", icon: Heart },
  { label: "HIIT routines",        icon: Zap },
];

const TypingIndicator = () => (
  <div className="flex items-center gap-1.5 px-4 py-3.5">
    <div className="h-2 w-2 rounded-full bg-primary animate-typing-dot-1" />
    <div className="h-2 w-2 rounded-full bg-primary animate-typing-dot-2" />
    <div className="h-2 w-2 rounded-full bg-primary animate-typing-dot-3" />
  </div>
);

const WelcomeScreen = ({
  onSuggestionClick,
}: {
  onSuggestionClick: (text: string) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className="flex flex-col items-center justify-center flex-1 px-6 py-16 text-center"
  >
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mb-7 relative"
    >
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 shadow-glow">
        <Dumbbell className="h-8 w-8 text-primary" strokeWidth={1.8} />
      </div>
      <span className="absolute inset-0 rounded-2xl border border-primary/20 animate-ping opacity-30" />
    </motion.div>

    <motion.h1
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.5 }}
      className="font-display text-5xl font-bold tracking-tight mb-3 text-gradient"
    >
      FitBot AI
    </motion.h1>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.35, duration: 0.5 }}
      className="text-muted-foreground text-center max-w-sm mb-12 text-base leading-relaxed font-light"
    >
      Your personal AI fitness coach. Ask me about workouts,
      nutrition, recovery, and more.
    </motion.p>

    <div className="grid grid-cols-2 gap-2.5 w-full max-w-sm">
      {SUGGESTION_CHIPS.map((chip, i) => (
        <motion.button
          key={chip.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 + i * 0.08, duration: 0.4 }}
          onClick={() => onSuggestionClick(chip.label)}
          className="group flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3.5 text-sm font-medium text-foreground/80 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-foreground hover:shadow-glow-sm text-left"
        >
          <chip.icon className="h-3.5 w-3.5 text-primary shrink-0 transition-transform duration-200 group-hover:scale-110" strokeWidth={2} />
          {chip.label}
        </motion.button>
      ))}
    </div>
  </motion.div>
);

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
  onSend: (text: string) => void;
  onReset?: () => void;
}

export default function ChatWindow({
  messages,
  isTyping,
  onSend,
  onReset,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  return (
    <div className="flex h-screen flex-col bg-background relative overflow-hidden">

      {/* Background glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[480px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-primary/4 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between border-b border-border/60 bg-background/80 backdrop-blur-md px-6 py-3.5">

        {/* Clickable logo → resets to welcome screen */}
        <button
          onClick={onReset}
          className="flex items-center gap-3 group transition-opacity hover:opacity-80"
          title="New chat"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/15 transition-all group-hover:border-primary/40 group-hover:shadow-glow-sm">
            <Dumbbell className="h-4 w-4 text-primary" strokeWidth={2} />
          </div>
          <div className="text-left">
            <h2 className="font-display text-sm font-semibold tracking-wide text-foreground leading-tight">
              FitBot AI
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-[11px] text-muted-foreground font-light tracking-wide">
                Online
              </span>
            </div>
          </div>
        </button>

        {/* Model badge */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-border px-3 py-1 bg-card">
          <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
          <span className="text-[11px] text-muted-foreground font-medium tracking-wide">
            RAG · Groq
          </span>
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto scrollbar-thin">
        <div className="mx-auto max-w-2xl px-4 py-8">
          {messages.length === 0 ? (
            <WelcomeScreen onSuggestionClick={onSend} />
          ) : (
            <>
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start mb-4"
                >
                  <div className="mr-3 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/15">
                    <Dumbbell className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                  </div>
                  <div className="rounded-2xl rounded-bl-md border border-border bg-card">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="relative z-10">
        <InputBox onSend={onSend} disabled={isTyping} />
      </div>
    </div>
  );
}