"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, PanelLeft } from "lucide-react";
import ChatMessageBubble from "../../../components/citizen/ai/ChatMessage";
import ChatInput from "../../../components/citizen/ai/ChatInput";
import ConversationSidebar from "../../../components/citizen/ai/ConversationSidebar";
import { mockConversations, mockSuggestedQuestions } from "../../../lib/mockData";
import type { ChatMessage, ChatConversation } from "../../../types/chat";
import { cn } from "../../../utils/auth";

// ── Mock AI response ──────────────────────────────────────────────────────────
const MOCK_RESPONSES: Record<string, string> = {
  default:
    "Thank you for your question! I'm JanMitra AI, your digital governance assistant. I can help you:\n\n• Discover government schemes you're eligible for\n• File and track grievance complaints\n• Navigate application processes\n• Understand your rights and entitlements\n\nWhat would you like to know today?",
  scheme:
    "Based on your profile (Uttar Pradesh, Annual income < ₹3 lakh), here are schemes you may be eligible for:\n\n**1. PM Awas Yojana (PMAY-G)** — ₹1.2 lakh housing assistance\n**2. Ayushman Bharat (PMJAY)** — ₹5 lakh health coverage\n**3. PM Kisan** — ₹6,000/year farmer support\n\nWould you like to apply for any of these?",
  complaint:
    "To file a grievance complaint:\n\n1. Go to **Complaints → New Complaint**\n2. Select the relevant category (e.g., Roads, Water, Electricity)\n3. Describe the issue with location details\n4. Attach photos if available\n5. Submit — you'll get a ticket number\n\nYou can track status in real-time under **My Complaints**.",
};

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("scheme") || lower.includes("eligible") || lower.includes("benefit")) {
    return MOCK_RESPONSES.scheme;
  }
  if (lower.includes("complaint") || lower.includes("grievance") || lower.includes("file")) {
    return MOCK_RESPONSES.complaint;
  }
  return MOCK_RESPONSES.default;
}

let msgIdCounter = 100;
const nextId = () => `msg-${++msgIdCounter}`;

export default function AIAssistantPage() {
  const [conversations, setConversations] = useState<ChatConversation[]>(mockConversations);
  const [activeConvId, setActiveConvId] = useState<string | null>(mockConversations[0]?.id ?? null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      role: "assistant",
      content:
        "Namaste! 🙏 I'm **JanMitra AI**, your personal governance assistant.\n\nI can help you find government schemes, file complaints, track applications, and understand your entitlements.\n\nHow can I help you today?",
      timestamp: new Date().toISOString(),
      status: "sent",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: nextId(),
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
      status: "sent",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI typing delay
    await new Promise((res) => setTimeout(res, 1200 + Math.random() * 800));

    const aiMsg: ChatMessage = {
      id: nextId(),
      role: "assistant",
      content: getAIResponse(text),
      timestamp: new Date().toISOString(),
      status: "sent",
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiMsg]);
  }, [input, isTyping]);

  const handleNewConversation = () => {
    const newConv: ChatConversation = {
      id: `conv-${Date.now()}`,
      title: "New Conversation",
      preview: "Start a new conversation",
      lastMessageAt: new Date().toISOString(),
      messageCount: 0,
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConvId(newConv.id);
    setMessages([
      {
        id: nextId(),
        role: "assistant",
        content: "Hello! How can I assist you with government services today?",
        timestamp: new Date().toISOString(),
        status: "sent",
      },
    ]);
    setSidebarOpen(false);
  };

  const handleSuggestedQuestion = (text: string) => {
    setInput(text);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] max-w-[1400px] overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-950/50 backdrop-blur-xl">
      {/* Conversation sidebar — hidden on mobile unless open */}
      <div className="hidden lg:flex">
        <ConversationSidebar
          conversations={conversations}
          activeId={activeConvId}
          onSelect={(id) => setActiveConvId(id)}
          onNew={handleNewConversation}
          isOpen={true}
          onClose={() => {}}
        />
      </div>

      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <ConversationSidebar
          conversations={conversations}
          activeId={activeConvId}
          onSelect={(id) => { setActiveConvId(id); setSidebarOpen(false); }}
          onNew={handleNewConversation}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Chat area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Chat header */}
        <div className="flex h-14 items-center justify-between border-b border-white/[0.06] px-4">
          <div className="flex items-center gap-3">
            {/* Mobile toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-white/[0.06] hover:text-white transition-colors lg:hidden"
              aria-label="Open conversation history"
            >
              <PanelLeft size={18} />
            </button>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25">
              <Bot size={16} className="text-white" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">JanMitra AI</p>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                <p className="text-[10px] text-slate-500">Online · Powered by Gemini</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-violet-400" aria-hidden />
            <span className="hidden text-xs text-slate-500 sm:inline">AI Assistant</span>
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 py-6 space-y-5"
          role="log"
          aria-label="Chat messages"
          aria-live="polite"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <ChatMessageBubble key={msg.id} message={msg} delay={0} />
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <ChatMessageBubble
                key="typing"
                message={{
                  id: "typing",
                  role: "assistant",
                  content: "",
                  timestamp: new Date().toISOString(),
                  isTyping: true,
                }}
                delay={0}
              />
            )}
          </AnimatePresence>
          <div ref={bottomRef} aria-hidden />
        </div>

        {/* Suggested questions — show only when few messages */}
        {messages.length <= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 pb-3"
          >
            <p className="mb-2 text-xs text-slate-600">Suggested questions</p>
            <div className="flex flex-wrap gap-2">
              {mockSuggestedQuestions.slice(0, 4).map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleSuggestedQuestion(q.text)}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs text-slate-400 hover:border-white/[0.15] hover:text-white transition-all text-left"
                >
                  {q.text}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Input */}
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={sendMessage}
          isLoading={isTyping}
        />
      </div>
    </div>
  );
}
