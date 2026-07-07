// ── Chat / AI Assistant Types ─────────────────────────────────────────────────

export type MessageRole = "user" | "assistant" | "system";
export type MessageStatus = "sending" | "sent" | "error";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  status?: MessageStatus;
  isTyping?: boolean;
}

export interface ChatConversation {
  id: string;
  title: string;
  preview: string;
  lastMessageAt: string;
  messageCount: number;
  isActive?: boolean;
}

export interface SuggestedQuestion {
  id: string;
  text: string;
  category: string;
}
