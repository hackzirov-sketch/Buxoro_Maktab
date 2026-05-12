import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles } from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const sampleMessages = [
  { id: 1, from: "bot", text: "Assalomu alaykum! 👋 Buxoro Maktabiga xush kelibsiz. Savolingiz bo'lsa, yozing!" },
];

const quickReplies = [
  "Qabul haqida",
  "Ta'lim dasturi",
  "Narxlar",
  "Manzil",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(sampleMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), from: "user", text }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "bot",
          text: "Rahmat! Operatorlarimiz tez orada siz bilan bog'lanadi. Qo'shimcha savollar uchun quyidagi raqamga murojaat qiling: +998 90 123 45 45",
        },
      ]);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3">

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.88, y: 20, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="w-[340px] rounded-2xl overflow-hidden border border-white/12 bg-[#071f13]/95 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.05)]"
            style={{ transformOrigin: "bottom right" }}
          >
            {/* Header */}
            <div className="relative flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary/20 to-emerald-600/10 border-b border-white/8">
              <div className="flex items-center gap-3">
                {/* AI lottie icon in header */}
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-primary/10">
                  <iframe
                    src="https://lottie.host/embed/545273cb-254d-4025-8d2d-508d659dd565/r5dkP7e7yg.lottie"
                    className="w-full h-full border-none scale-150"
                    allow="autoplay"
                    title="AI assistant"
                  />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Buxoro Maktabi</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    <p className="text-primary text-xs">Online</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-1">
                {/* Telegram */}
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl overflow-hidden hover:scale-110 transition-transform duration-200"
                  title="Telegram"
                >
                  <iframe
                    src="https://lottie.host/embed/6c1e0fa4-a448-450f-9ed0-5b129837ef22/bFbPTIUp2g.lottie"
                    className="w-full h-full border-none pointer-events-none"
                    allow="autoplay"
                    title="Telegram"
                  />
                </a>
                {/* Instagram */}
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl overflow-hidden hover:scale-110 transition-transform duration-200"
                  title="Instagram"
                >
                  <iframe
                    src="https://lottie.host/embed/bfef023e-00ae-4005-891a-388ad2039097/9E6OjBKbjJ.lottie"
                    className="w-full h-full border-none pointer-events-none"
                    allow="autoplay"
                    title="Instagram"
                  />
                </a>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200 ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto px-4 py-3 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-white/10">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.from === "user"
                          ? "bg-primary text-black font-medium rounded-br-md"
                          : "bg-white/8 text-white/90 border border-white/8 rounded-bl-md"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <div className="px-4 pb-2 flex gap-1.5 flex-wrap">
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
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 pb-3 pt-1">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Savol yozing..."
                className="flex-1 bg-white/6 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-primary/40 focus:bg-white/8 transition-all duration-200"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 hover:bg-primary/90 transition-colors duration-200 shadow-[0_0_16px_rgba(74,222,128,0.35)]"
              >
                <Send className="w-4 h-4 text-black" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button with AI lottie */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(74,222,128,0.35),0_0_0_1px_rgba(74,222,128,0.2)] bg-[#071f13] border border-primary/30"
        aria-label="Chat"
      >
        {/* Pulse ring */}
        {!isOpen && (
          <motion.span
            className="absolute inset-0 rounded-2xl border-2 border-primary/40"
            animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="ai"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <iframe
                src="https://lottie.host/embed/545273cb-254d-4025-8d2d-508d659dd565/r5dkP7e7yg.lottie"
                className="w-full h-full border-none scale-110"
                allow="autoplay"
                title="Chat"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
