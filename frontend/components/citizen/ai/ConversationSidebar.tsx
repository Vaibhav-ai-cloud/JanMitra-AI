"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Plus, ChevronLeft, MessageSquare, Trash2 } from "lucide-react";
import Link from "next/link";
import { cn } from "../../../utils/auth";
import type { ChatConversation } from "../../../types/chat";

interface ConversationSidebarProps {
  conversations: ChatConversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function ConversationSidebar({
  conversations,
  activeId,
  onSelect,
  onNew,
  isOpen,
  onClose,
}: ConversationSidebarProps) {
  const formatTime = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
    if (diffDays === 0) {
      return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    }
    if (diffDays === 1) return "Yesterday";
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-10 bg-black/60 backdrop-blur-sm lg:hidden"
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
        className={cn(
          "flex w-72 flex-col border-r border-white/[0.06] bg-slate-950/90 backdrop-blur-2xl",
          "absolute inset-y-0 left-0 z-20",
          "lg:relative lg:translate-x-0 lg:z-auto"
        )}
        aria-label="Conversation history"
      >
        {/* Header */}
        <div className="flex h-14 items-center justify-between border-b border-white/[0.06] px-4">
          <div className="flex items-center gap-2">
            <Bot size={18} className="text-blue-400" aria-hidden />
            <span className="text-sm font-semibold text-white">AI Chats</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onNew}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-white/[0.06] hover:text-white transition-colors"
              aria-label="Start new conversation"
            >
              <Plus size={16} />
            </button>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-white/[0.06] hover:text-white transition-colors lg:hidden"
              aria-label="Close sidebar"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
        </div>

        {/* List */}
        <nav className="flex-1 overflow-y-auto p-2" aria-label="Conversations">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
              <MessageSquare size={24} className="text-slate-700" aria-hidden />
              <p className="text-xs text-slate-600">No conversations yet</p>
            </div>
          ) : (
            <ul className="space-y-0.5" role="list">
              {conversations.map((conv) => (
                <li key={conv.id}>
                  <button
                    onClick={() => onSelect(conv.id)}
                    aria-current={activeId === conv.id ? "true" : undefined}
                    className={cn(
                      "group w-full rounded-xl px-3 py-3 text-left transition-all duration-150",
                      activeId === conv.id
                        ? "bg-blue-500/15 text-white"
                        : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-xs font-semibold text-white truncate leading-tight">
                        {conv.title}
                      </p>
                      <span className="shrink-0 text-[10px] text-slate-600">
                        {formatTime(conv.lastMessageAt)}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{conv.preview}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="text-[10px] text-slate-700">
                        {conv.messageCount} messages
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/[0.06] p-3">
          <p className="text-center text-[10px] text-slate-700">
            Conversations are stored locally and never shared.
          </p>
        </div>
      </motion.aside>
    </>
  );
}
