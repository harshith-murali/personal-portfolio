"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Bot, User } from "lucide-react";
import { ChatMarkdown } from "./ChatMarkdown";
import { ChatMessage } from "@/types/chat";

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      className={`flex items-start space-x-2.5 my-3 ${
        isUser ? "flex-row-reverse space-x-reverse" : "flex-row"
      }`}
    >
      {/* Avatar Icon */}
      <div
        className={`flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0 mt-0.5 text-xs font-semibold shadow-md ${
          isUser
            ? "bg-gradient-to-tr from-cyan-500 to-blue-600 text-white"
            : "bg-zinc-900 border border-cyan-500/30 text-cyan-400"
        }`}
      >
        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
      </div>

      {/* Bubble Container */}
      <div className={`group relative min-w-0 flex flex-col ${isUser ? "max-w-[85%] sm:max-w-[80%]" : "max-w-[calc(100%-2.375rem)] flex-1"}`}>
        <div
          className={`min-w-0 px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
            isUser
              ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-cyan-900/20"
              : "bg-zinc-900/90 text-zinc-200 border border-zinc-800/90 backdrop-blur-md rounded-tl-none"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <ChatMarkdown content={message.content} />
          )}
        </div>

        {/* Footer info: timestamp & copy button */}
        <div
          className={`flex items-center space-x-2 mt-1 text-[10px] text-zinc-500 px-1 ${
            isUser ? "justify-end" : "justify-start"
          }`}
        >
          <span>{message.timestamp}</span>
          {!isUser && (
            <button
              onClick={handleCopyMessage}
              aria-label="Copy AI response"
              className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-cyan-400 flex items-center gap-0.5"
            >
              {copied ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
