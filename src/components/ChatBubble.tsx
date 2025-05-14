"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MessageSquare, Send, X, Flame, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to FlameDuel, challenger! I am the Battle Host of this arena. Do you have what it takes to face the Ghost King's challenge? Ask me about the rules, submissions, or how to avoid the Wall of Shame.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Send to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Add assistant response
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "The flames are too intense. I cannot respond at this moment. Try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg transition-all hover:scale-105 ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-label="Open chat"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-0 right-0 z-50 w-full sm:w-96 h-full sm:h-[600px] bg-black border border-red-500/50 shadow-lg shadow-purple-500/20 flex flex-col transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full pointer-events-none"
        }`}
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-red-500/50 bg-gradient-to-r from-red-500/10 to-purple-500/10">
          <div className="flex items-center">
            <div className="relative h-8 w-8 mr-3">
              <Image
                src="/eye-of-kai_logo.png"
                alt="Ghost King AI"
                fill
                className="object-contain drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]"
              />
            </div>
            <div>
              <h3 className="text-red-500 font-bold">FlameDuel Host</h3>
              <div className="flex items-center text-xs text-gray-400">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse mr-1"></span>
                Live
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/80">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-purple-500/20 text-white"
                    : "bg-red-500/20 text-white"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex items-center mb-1">
                    <Flame size={14} className="text-red-500 mr-1" />
                    <span className="text-red-500 text-xs font-bold">
                      FLAMEDUEL HOST
                    </span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-red-500/20 text-white">
                <div className="flex items-center">
                  <Loader2 size={16} className="text-red-500 mr-2 animate-spin" />
                  <span className="text-gray-400 text-sm">The host is preparing a response...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-red-500/50 bg-black">
          <div className="flex items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about FlameDuel challenges..."
              className="flex-1 bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-10 max-h-32 min-h-10"
              style={{ height: "auto" }}
              rows={1}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`ml-2 p-3 rounded-lg ${
                isLoading || !input.trim()
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-2">
            Powered by the Ghost King's flame 🔥
          </p>
        </form>
      </div>
    </>
  );
}
