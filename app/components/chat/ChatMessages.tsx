"use client";

import React, { useEffect, useRef } from "react";
import { ChatMessage } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";
import { WelcomeScreen } from "./WelcomeScreen";
import { TypingIndicator } from "./TypingIndicator";
import { SuggestionChips } from "./SuggestionChips";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isStreaming: boolean;
  onSelectSuggestion: (prompt: string) => void;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isStreaming,
  onSelectSuggestion,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-thin scrollbar-thumb-zinc-800">
        <WelcomeScreen onSelectSuggestion={onSelectSuggestion} />
      </div>
    );
  }

  // Check if last message is streaming empty text
  const lastMessage = messages[messages.length - 1];
  const isWaitingForFirstChunk =
    isStreaming && lastMessage?.role === "assistant" && !lastMessage.content;

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 scrollbar-thin scrollbar-thumb-zinc-800">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {isWaitingForFirstChunk && (
        <div className="my-2">
          <TypingIndicator />
        </div>
      )}

      {/* Suggested prompts bar after conversation starts */}
      {!isStreaming && messages.length > 0 && (
        <div className="pt-2 border-t border-zinc-900/60 mt-4">
          <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">
            Suggested Follow-ups:
          </p>
          <SuggestionChips
            onSelectSuggestion={onSelectSuggestion}
            compact={true}
          />
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};
