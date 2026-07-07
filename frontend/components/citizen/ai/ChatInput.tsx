"use client";

import { useRef, useEffect } from "react";
import { Send, Paperclip, Mic } from "lucide-react";
import { cn } from "../../../utils/auth";

interface ChatInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  isLoading?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  isLoading = false,
  placeholder = "Ask anything about government schemes, grievances...",
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && value.trim()) onSend();
    }
  };

  return (
    <div className="border-t border-white/[0.06] bg-slate-950/80 backdrop-blur-xl px-4 py-4">
      <div className="flex items-end gap-3 rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 transition-all focus-within:border-blue-500/40 focus-within:ring-1 focus-within:ring-blue-500/20">
        {/* Attachment (UI only) */}
        <button
          type="button"
          className="mb-0.5 shrink-0 text-slate-600 hover:text-slate-400 transition-colors"
          aria-label="Attach file"
        >
          <Paperclip size={18} />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder={placeholder}
          aria-label="Chat message"
          aria-multiline="true"
          disabled={isLoading}
          className={cn(
            "flex-1 resize-none bg-transparent text-sm text-white placeholder:text-slate-600",
            "outline-none leading-relaxed disabled:opacity-60",
            "max-h-40 overflow-y-auto"
          )}
        />

        {/* Voice (UI only) */}
        <button
          type="button"
          className="mb-0.5 shrink-0 text-slate-600 hover:text-slate-400 transition-colors"
          aria-label="Voice input"
        >
          <Mic size={18} />
        </button>

        {/* Send */}
        <button
          type="button"
          onClick={onSend}
          disabled={isLoading || !value.trim()}
          aria-label="Send message"
          className={cn(
            "mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all",
            value.trim() && !isLoading
              ? "bg-blue-500 text-white hover:bg-blue-400 shadow-lg shadow-blue-500/25"
              : "bg-white/[0.06] text-slate-600 cursor-not-allowed"
          )}
        >
          <Send size={15} />
        </button>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-700">
        Press <kbd className="rounded border border-white/10 px-1 py-0.5 font-mono">Enter</kbd> to send · <kbd className="rounded border border-white/10 px-1 py-0.5 font-mono">Shift+Enter</kbd> for new line
      </p>
    </div>
  );
}
