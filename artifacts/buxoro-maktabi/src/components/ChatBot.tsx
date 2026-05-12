import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle, ArrowLeft } from "lucide-react";

const EASE = [0.32, 0.72, 0, 1] as const;

interface Message {
  id: number;
  from: "user" | "bot";
  text: string;
}

const initialMessages: Message[] = [
  { id: 1, from: "bot", text: "Assalomu alaykum! 👋 Buxoro Maktabiga xush kelibsiz. Savolingiz bo'lsa, yozing!" },
];

const quickReplies = ["Qabul haqida", "Ta'lim dasturi", "Narxlar", "Manzil"];

function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/8 border border-white/8 flex gap-1 items-center">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white/50"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: "user", text }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "bot",
          text: "Rahmat! Operatorlarimiz tez orada siz bilan bog'lanadi. Qo'shimcha savollar uchun quyidagi raqamga murojaat qiling: +998 94 835 66 66",
        },
      ]);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const panelVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 16, x: 20 },
    visible: { opacity: 1, scale: 1, y: 0, x: 0, transition: { duration: 0.4, ease: EASE } },
    exit: { opacity: 0, scale: 0.92, y: 16, x: 20, transition: { duration: 0.3, ease: EASE } },
  };

  const mobilePanelVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.25, ease: EASE } },
  };

  return (
    <>
      {/* Desktop panel — right side floating */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="hidden md:flex fixed bottom-6 right-6 z-[999] w-[372px] h-[560px] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#071f13]/95 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)] flex-col"
          >
            {/* Desktop header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Buxoro Maktabi</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <p className="text-primary text-[11px]">Online</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                aria-label="Yopish"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3 scrollbar-none">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.from === "user"
                          ? "bg-primary text-black font-medium rounded-br-md"
                          : "bg-white/[0.06] text-white/90 border border-white/[0.06] rounded-bl-md"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && <TypingDots />}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <div className="px-5 pb-2 flex gap-1.5 flex-wrap shrink-0">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-[11px] px-3 py-1.5 rounded-full border border-primary/30 text-primary/80 hover:bg-primary/10 hover:text-primary hover:border-primary/60 transition-all duration-200"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 pb-4 pt-2 shrink-0 border-t border-white/[0.04]">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Savol yozing..."
                className="flex-1 bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-primary/40 focus:bg-white/[0.08] transition-all duration-200"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 hover:bg-primary/90 transition-colors duration-200 shadow-[0_0_16px_rgba(74,222,128,0.3)]"
              >
                <Send className="w-4 h-4 text-black" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile full-screen panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-chat"
            variants={mobilePanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden fixed inset-0 z-[999] bg-[#071f13] flex flex-col"
          >
            {/* Mobile header */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/[0.06] shrink-0">
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-200 -ml-1"
                aria-label="Orqaga"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 flex-1">
                <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Buxoro Maktabi</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <p className="text-primary text-[11px]">Online</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 scrollbar-none">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.from === "user"
                          ? "bg-primary text-black font-medium rounded-br-md"
                          : "bg-white/[0.06] text-white/90 border border-white/[0.06] rounded-bl-md"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && <TypingDots />}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <div className="px-4 pb-2 flex gap-1.5 flex-wrap shrink-0">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary/80 hover:bg-primary/10 hover:text-primary hover:border-primary/60 transition-all duration-200"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 pb-6 pt-2 shrink-0 border-t border-white/[0.04]">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Savol yozing..."
                className="flex-1 bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-primary/40 focus:bg-white/[0.08] transition-all duration-200"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shrink-0 hover:bg-primary/90 transition-colors duration-200 shadow-[0_0_16px_rgba(74,222,128,0.3)]"
              >
                <Send className="w-4 h-4 text-black" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle FAB */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 right-6 z-[998] w-14 h-14 rounded-2xl bg-primary shadow-[0_8px_28px_rgba(74,222,128,0.35),0_0_0_1px_rgba(74,222,128,0.15)] flex items-center justify-center border-0 outline-none"
        aria-label="Chat"
      >
        {/* Pulse ring */}
        {!isOpen && (
          <motion.span
            className="absolute inset-0 rounded-2xl border-2 border-primary/40"
            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-5 h-5 text-black" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="w-5 h-5 text-black" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
