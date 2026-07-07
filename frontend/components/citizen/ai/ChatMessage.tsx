"use client";

import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { cn } from "../../../utils/auth";
import type { ChatMessage } from "../../../types/chat";

interface ChatMessageProps {
  message: ChatMessage;
  delay?: number;
}

export default function ChatMessageBubble({
  message,
  delay = 0,
}: ChatMessageProps) {
  const isUser = message.role === "user";
  const time = new Date(message.timestamp).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
      role="article"
      aria-label={`${isUser ? "Your" : "AI"} message`}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser
            ? "bg-gradient-to-br from-blue-500 to-cyan-400"
            : "bg-gradient-to-br from-violet-500 to-purple-600 border border-violet-400/30"
        )}
        aria-hidden
      >
        {isUser ? (
          <User size={14} className="text-white" />
        ) : (
          <Bot size={14} className="text-white" />
        )}
      </div>

      {/* Bubble */}
      <div className={cn("flex flex-col gap-1 max-w-[78%]", isUser && "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "rounded-tr-sm bg-blue-500 text-white"
              : "rounded-tl-sm border border-white/[0.08] bg-white/[0.05] text-slate-200"
          )}
        >
          {message.isTyping ? (
            <div className="flex items-center gap-1" aria-label="AI is typing">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                  className="h-1.5 w-1.5 rounded-full bg-slate-400"
                  aria-hidden
                />
              ))}
            </div>
          ) : (
            /* Simple markdown — line breaks rendered */
            <div className="whitespace-pre-wrap">{message.content}</div>
          )}
        </div>
        <span className="text-[10px] text-slate-600 px-1">{time}</span>
      </div>
    </motion.div>
  );
}
