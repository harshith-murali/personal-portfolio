"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "@/types/chat";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  isStreaming: boolean;
  onSendMessage: (message: string) => void;
  onSelectSuggestion: (prompt: string) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  onClose,
  messages,
  isStreaming,
  onSendMessage,
  onSelectSuggestion,
}) => {
  const windowRef = useRef<HTMLDivElement>(null);

  // Keyboard trap & ESC handler for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm sm:hidden z-40"
          />

          {/* Main Chat Drawer Container */}
          <motion.div
            ref={windowRef}
            role="dialog"
            aria-label="AI Digital Twin Chat Window"
            aria-modal="true"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-50 flex flex-col bg-zinc-950/95 border border-zinc-800/90 shadow-2xl backdrop-blur-2xl
              w-full h-full inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[420px] sm:h-[650px] sm:max-h-[calc(100vh-120px)] sm:rounded-3xl overflow-hidden font-sans"
          >
            {/* Header */}
            <ChatHeader onClose={onClose} />

            {/* Message Body */}
            <ChatMessages
              messages={messages}
              isStreaming={isStreaming}
              onSelectSuggestion={onSelectSuggestion}
            />

            {/* Input Bar */}
            <ChatInput
              onSendMessage={onSendMessage}
              disabled={isStreaming}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
