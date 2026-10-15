"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Bot, User, RefreshCw, MessageSquare } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
}

const starterPrompts = [
  "🎬 How do I edit pacing for corporate video?",
  "📊 How do I structure an investor pitch deck?",
  "💼 Give me a STAR technique interview tip",
  "📈 What is an XLOOKUP dynamic array formula?",
];

export function FloatingChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "👋 Hello! I'm your INSYT AI Career Assistant. Ask me anything about Excel modeling, Power BI DAX, AI automation, or STAR interviews!",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, context: "general" }),
      });

      const data = await res.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: data.reply || "I'm here to help with your corporate career journey!",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "I experienced a temporary connection delay. Please try asking again!",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isDismissed) return null;

  return (
    <>
      {/* ── EXPANDED CHAT DRAWER: Fixed absolute position floating cleanly above launcher (Zero glitch on close) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-22 right-5 z-50 w-[335px] max-w-[88vw] h-[480px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border-2 border-[#2563eb] select-text bg-white text-slate-900 font-sans"
            style={{
              boxShadow: "6px 6px 0px 0px #1e3a8a",
            }}
          >
            {/* Header */}
            <div className="p-3 border-b-2 border-slate-900 flex items-center justify-between bg-[#2563eb] text-white font-mono">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-amber-400 text-amber-950 font-black border border-amber-500 shadow-sm flex-shrink-0">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase text-white flex items-center gap-1.5 leading-tight">
                    INSYT AI Assistant
                  </h3>
                  <p className="text-[10px] text-blue-100 font-bold">
                    Career &amp; Technical Copilot
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors text-xs border border-white/30 cursor-pointer"
                  aria-label="Minimize Chat Assistant"
                  title="Close"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 font-mono">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      msg.sender === "user"
                        ? "bg-[#2563eb] text-white"
                        : "bg-amber-400 text-amber-950 border border-amber-500"
                    }`}
                  >
                    {msg.sender === "user" ? <User size={13} /> : <Bot size={13} />}
                  </div>

                  <div className={`max-w-[85%] space-y-0.5 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                    <div
                      className={`p-2.5 rounded-xl text-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-[#2563eb] text-white rounded-tr-none font-sans font-medium"
                          : "bg-slate-100 text-slate-900 border border-slate-200 rounded-tl-none font-sans font-medium"
                      }`}
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 px-1">{msg.time}</span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#2563eb] p-1.5">
                  <RefreshCw size={14} className="animate-spin" />
                  <span>AI Thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Prompt Suggestion Chips */}
            {messages.length <= 2 && (
              <div className="px-2 py-2 border-t border-slate-200 bg-slate-50 flex flex-wrap gap-1 font-mono">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-left truncate max-w-full cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div className="p-2.5 border-t border-slate-200 bg-slate-50 font-mono">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-1.5"
              >
                <input
                  type="text"
                  placeholder="Ask modeling, interview, Excel Qs..."
                  value={input}
                  aria-label="Type message for AI Assistant"
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl text-xs font-mono outline-none bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#2563eb]"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="w-9 h-9 rounded-xl flex items-center justify-center bg-amber-400 text-amber-950 font-extrabold hover:bg-amber-300 border border-amber-500 shadow-sm disabled:opacity-40 flex-shrink-0 cursor-pointer"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BRUTALIST GOLDEN COIN LAUNCHER (PERMANENTLY ANCHORED — ZERO GLITCH ON CLOSE) ── */}
      <div className="fixed bottom-6 right-5 z-40 select-none font-mono">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
          title={isOpen ? "Close Assistant" : "INSYT AI Assistant (Click to chat)"}
          className="w-14 h-14 rounded-full border-[3px] border-[#451a03] bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 flex items-center justify-center text-[#451a03] relative overflow-hidden transition-all hover:scale-108 active:scale-95 active:translate-x-[2px] active:translate-y-[2px] cursor-pointer shadow-[4px_4px_0px_0px_#451a03] active:shadow-[2px_2px_0px_0px_#451a03]"
          style={{
            boxShadow: "4px 4px 0px 0px #451a03",
          }}
        >
          {/* Inner Coin Rim detailing */}
          <div className="absolute inset-1 rounded-full border border-[#451a03]/30 pointer-events-none" />

          {/* Icon state */}
          <div className="relative z-10 flex items-center justify-center">
            {isOpen ? (
              <X size={24} strokeWidth={3} className="text-[#451a03]" />
            ) : (
              <>
                <Bot size={25} strokeWidth={2.4} className="text-[#451a03]" />
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#2563eb] ring-2 ring-amber-300 animate-pulse" />
              </>
            )}
          </div>
        </button>
      </div>
    </>
  );
}
