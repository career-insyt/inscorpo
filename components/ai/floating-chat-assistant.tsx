"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { usePathname } from "next/navigation";

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

// Allowed tabs where the AI assistant appears
const ALLOWED_ROUTE_PREFIXES = [
  "/dashboard",
  "/cockpit",
  "/learn",
  "/prepare",
  "/evaluate",
  "/mock-tests",
  "/career-passport",
  "/passport",
  "/jobs",
  "/opportunities",
];

export function FloatingChatAssistant() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "👋 Hello! I'm your INSYT AI Career Copilot. Ask me anything about Excel financial models, Power BI DAX, Python automation, STAR interviews, or corporate recruitment!",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // Check if AI assistant should be shown on this route
  const isVisibleOnRoute = ALLOWED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isVisibleOnRoute) {
    return null;
  }

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

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════════
           MOBILE VIEW: Sticky right-edge tab (sticks out, collapsable & expandable)
           Above every single layer: z-[9999]
         ═══════════════════════════════════════════════════════════════════════ */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="md:hidden fixed right-0 top-1/2 -translate-y-1/2 z-[9999] flex items-center gap-1 pl-3 pr-2 py-3.5 rounded-l-2xl border-l-2 border-t-2 border-b-2 border-[#1e3a8a] bg-[#2563eb] text-white shadow-[-4px_4px_0px_0px_#1e3a8a] active:translate-x-1 cursor-pointer select-none transition-transform"
          title="Open INSYT AI Assistant"
          aria-label="Open AI Assistant"
        >
          <div className="flex flex-col items-center gap-1 font-mono font-black text-[10px]">
            <Sparkles size={14} className="text-amber-300 animate-pulse" />
            <span className="tracking-tight text-white leading-none">A</span>
            <span className="tracking-tight text-white leading-none">I</span>
          </div>
        </button>
      )}

      {/* ── MOBILE MODAL DRAWER (Tucked from right, above everything z-[10000]) ── */}
      <AnimatePresence>
        {isOpen && (
          <div className="md:hidden fixed inset-0 z-[10000] flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Slide-out drawer from right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="relative w-[90vw] max-w-sm h-full bg-white border-l-2 border-blue-600 shadow-2xl flex flex-col overflow-hidden font-sans select-text text-slate-900"
            >
              {/* Header */}
              <div className="p-3.5 border-b-2 border-blue-600 bg-[#2563eb] text-white flex items-center justify-between font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-amber-400 text-amber-950 font-black border border-amber-500 shadow-sm flex-shrink-0">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase text-white leading-tight">
                      INSYT AI Assistant
                    </h3>
                    <p className="text-[10px] text-blue-100 font-bold">
                      Mobile Copilot
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-black border border-white/30 cursor-pointer active:scale-95"
                  title="Collapse Assistant"
                >
                  <span>Collapse</span>
                  <ChevronRight size={15} />
                </button>
              </div>

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 font-mono">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2 ${
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
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

                    <div
                      className={`max-w-[85%] space-y-0.5 ${
                        msg.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
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
                      <span className="text-[10px] font-mono text-slate-500 px-1">{msg.time}</span>
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

              {/* Suggestions */}
              {messages.length <= 2 && (
                <div className="p-2 border-t border-slate-200 bg-slate-50 flex flex-wrap gap-1 font-mono">
                  {starterPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleSend(prompt)}
                      className="px-2 py-1 rounded-md text-[10px] font-bold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-left truncate max-w-full cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
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
                    placeholder="Ask AI Copilot..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl text-xs font-mono outline-none bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#2563eb]"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="w-9 h-9 rounded-xl flex items-center justify-center bg-amber-400 text-amber-950 font-extrabold hover:bg-amber-300 border border-amber-500 shadow-sm disabled:opacity-40 flex-shrink-0 cursor-pointer"
                  >
                    <Send size={14} />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════════
           DESKTOP VIEW: Clean bottom-right floating launcher
         ═══════════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:block">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-22 right-5 z-50 w-[350px] max-w-[88vw] h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border-2 border-[#2563eb] select-text bg-white text-slate-900 font-sans shadow-[6px_6px_0px_0px_#1e3a8a]"
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

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors text-xs border border-white/30 cursor-pointer"
                  title="Close"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 font-mono">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2 ${
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
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

                    <div
                      className={`max-w-[85%] space-y-0.5 ${
                        msg.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
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

              {/* Suggestions */}
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

              {/* Input */}
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
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl text-xs font-mono outline-none bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#2563eb]"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="w-9 h-9 rounded-xl flex items-center justify-center bg-amber-400 text-amber-950 font-extrabold hover:bg-amber-300 border border-amber-500 shadow-sm disabled:opacity-40 flex-shrink-0 cursor-pointer"
                  >
                    <Send size={14} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Round Trigger Button */}
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0.1}
          onDragStart={() => {
            isDraggingRef.current = true;
          }}
          onDragEnd={() => {
            setTimeout(() => {
              isDraggingRef.current = false;
            }, 120);
          }}
          className="fixed bottom-6 right-5 z-40 select-none font-mono group touch-none"
        >
          <button
            type="button"
            onClick={() => {
              if (isDraggingRef.current) return;
              setIsOpen((prev) => !prev);
            }}
            aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
            title={isOpen ? "Close Assistant" : "INSYT AI Assistant"}
            className="w-14 h-14 rounded-full aspect-square border-[3px] border-[#451a03] bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 flex items-center justify-center text-[#451a03] relative overflow-hidden transition-transform hover:scale-105 active:scale-95 cursor-grab active:cursor-grabbing shadow-[4px_4px_0px_0px_#451a03]"
          >
            <div className="relative z-10 flex items-center justify-center">
              {isOpen ? (
                <X size={24} strokeWidth={3} className="text-[#451a03]" />
              ) : (
                <Bot size={26} strokeWidth={2.4} className="text-[#451a03]" />
              )}
            </div>
          </button>
        </motion.div>
      </div>
    </>
  );
}
