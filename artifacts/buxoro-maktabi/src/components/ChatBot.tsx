import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle, ArrowLeft } from "lucide-react";

const EASE = [0.32, 0.72, 0, 1] as const;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `Sen Buxoro Maktabining rasmiy AI yordamchisisisan. Faqat quyidagi mavzularda javob berishing kerak:
- Buxoro Maktabi haqida umumiy ma'lumot
- Qabul va ariza topshirish jarayoni
- Ta'lim dasturlari va bosqichlari
- Maktab xizmatlari (sinfxonalar, oshxona, jamoa)
- Bog'lanish va manzil ma'lumotlari

Agar savol maktab bilan bog'liq bo'lmasa, muloyimlik bilan faqat maktab haqidagi savollarga javob berishingni ayt.

=== MAKTAB HAQIDA TO'LIQ MA'LUMOT ===

MAKTAB NOMI: Buxoro Maktabi (Xususiy maktab)
JOYLASHUV: Bekobod shahri, O'zbekiston
TELEFON: +998 94 835 66 66
SAYT: buxoromaktabi.uz

MAQSAD: Zamonaviy va sifatli ta'lim berish. Farzandlarni kelajak yetakchilari sifatida tarbiyalash.

=== TA'LIM BOSQICHLARI ===
1. 0-sinf (Maktabga tayyorlov): Alifbo, raqamlar, ijtimoiy ko'nikmalar
2. 1-4-sinflar (Boshlang'ich ta'lim): O'qish, yozish, hisoblash, ijodiy fikrlash
3. 5-9-sinflar (Asosiy o'rta ta'lim): Chuqur fanlar, xorijiy tillar, texnologiya
4. 10-11-sinflar (Yuqori bosqich): Oliy o'quv yurtlariga tayyorlov, ixtisoslashgan fanlar
5. Bitiruv: O'zbekiston va xorijdagi nufuzli universitetlarga qabul

=== USTUNLIKLAR ===
- Chuqurlashtirilgan ta'lim: Har bir o'quvchining qiziqishi va salohiyatiga mos ravishda yo'naltirilgan ta'lim
- Tizimli nazorat: Davomatni, faollikni va o'zlashtirishni kuzatib boruvchi monitoring tizimi
- Zamonaviy yondashuv: Innovatsion metodlar, ilg'or texnologiyalar, malakali o'qituvchilar
- Yuksak natijalar: Xalqaro olimpiadalar, IELTS, SAT, CEFR, milliy sertifikatlarda yuqori ko'rsatkichlar

=== QABUL VA ARIZA ===
- O'quv yili: 2026-2027 yil uchun qabul OCHIQ
- O'rinlar soni: Cheklangan (tez murojaat qilish tavsiya etiladi)
- Ariza berish: Saytdagi forma orqali yoki telefon orqali
- Ariza sahifasi: /ariza
- Kerakli ma'lumotlar: Ota-ona ismi, telefon, bola ismi, hozirgi maktab, sinf
- Hududlar: Bekobod shahar, Shirin shahar, Juma, Xos, Zafar

=== XIZMATLAR ===
SINFXONALAR: Zamonaviy texnologiyalar bilan jihozlangan, interaktiv doskalar, qulay muhit
OSHXONA: Sog'lom va mazali taomlar, kunlik menyu, gigienik sharoit
JAMOA: Professional o'qituvchilar va rahbarlar, tajribali pedagoglar

=== BOG'LANISH ===
Telefon: +998 94 835 66 66
Manzil: Bekobod shahri
Ish vaqti: Dushanba-Shanba, 8:00-18:00

Har doim o'zbek tilida, qisqa, aniq va do'stona javob ber. Agar biron ma'lumot so'ralsa va yuqorida mavjud bo'lmasa, telefon raqamini taklif qil.`;

interface Message {
  id: number;
  from: "user" | "bot";
  text: string;
}

const INITIAL_MESSAGES: Message[] = [
  { id: 1, from: "bot", text: "Assalomu alaykum! 👋 Buxoro Maktabiga xush kelibsiz. Maktab, qabul yoki ariza haqida savollaringiz bo'lsa, yozing!" },
];

const QUICK_REPLIES = ["Qabul haqida", "Ta'lim dasturi", "Ariza qanday topshiriladi?", "Manzil va telefon"];

async function askGemini(userMessage: string, history: Message[]): Promise<string> {
  const contents = [
    ...history.slice(-10).map((m) => ({
      role: m.from === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    })),
    { role: "user", parts: [{ text: userMessage }] },
  ];

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
      }),
    }
  );

  if (!res.ok) throw new Error("API xatosi");
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Kechirasiz, javob berishda muammo yuz berdi.";
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = { id: Date.now(), from: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const reply = await askGemini(text, [...messages, userMsg]);
      setMessages((prev) => [...prev, { id: Date.now() + 1, from: "bot", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "bot", text: "Kechirasiz, hozir ulanishda muammo bor. Iltimos, +998 94 835 66 66 raqamiga qo'ng'iroq qiling." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const panelVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 16 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
    exit: { opacity: 0, scale: 0.92, y: 16, transition: { duration: 0.25, ease: EASE } },
  };

  const mobilePanelVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.2, ease: EASE } },
  };

  return (
    <>
      {/* Desktop panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-desktop"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="hidden md:flex fixed bottom-24 right-6 z-[999] w-[372px] h-[560px] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#071f13]/95 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6)] flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Buxoro Maktabi AI</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <p className="text-primary text-[11px]">Online · AI yordamchi</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
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
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.from === "user"
                        ? "bg-primary text-black font-medium rounded-br-md"
                        : "bg-white/[0.06] text-white/90 border border-white/[0.06] rounded-bl-md"
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/8 border border-white/8 flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-white/50"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }} />
                      ))}
                    </div>
                  </div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <div className="px-5 pb-2 flex gap-1.5 flex-wrap shrink-0">
              {QUICK_REPLIES.map((q) => (
                <button key={q} onClick={() => sendMessage(q)} disabled={isTyping}
                  className="text-[11px] px-3 py-1.5 rounded-full border border-primary/30 text-primary/80 hover:bg-primary/10 hover:text-primary hover:border-primary/60 transition-all duration-200 disabled:opacity-40">
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 pb-4 pt-2 shrink-0 border-t border-white/[0.04]">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Savol yozing..."
                disabled={isTyping}
                className="flex-1 bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-primary/40 focus:bg-white/[0.08] transition-all duration-200 disabled:opacity-50"
              />
              <motion.button type="submit" disabled={isTyping || !input.trim()}
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(74,222,128,0.3)] disabled:opacity-40">
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
            key="chat-mobile"
            variants={mobilePanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden fixed inset-0 z-[999] bg-[#071f13] flex flex-col"
          >
            {/* Mobile header */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/[0.06] shrink-0">
              <button onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-200 -ml-1">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 flex-1">
                <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Buxoro Maktabi AI</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <p className="text-primary text-[11px]">Online · AI yordamchi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 scrollbar-none">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div key={msg.id}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.from === "user"
                        ? "bg-primary text-black font-medium rounded-br-md"
                        : "bg-white/[0.06] text-white/90 border border-white/[0.06] rounded-bl-md"
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/8 border border-white/8 flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-white/50"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }} />
                      ))}
                    </div>
                  </div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Mobile quick replies */}
            <div className="px-4 pb-2 flex gap-1.5 flex-wrap shrink-0">
              {QUICK_REPLIES.map((q) => (
                <button key={q} onClick={() => sendMessage(q)} disabled={isTyping}
                  className="text-[11px] px-3 py-1.5 rounded-full border border-primary/30 text-primary/80 hover:bg-primary/10 hover:text-primary hover:border-primary/60 transition-all duration-200 disabled:opacity-40">
                  {q}
                </button>
              ))}
            </div>

            {/* Mobile input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 pb-6 pt-2 shrink-0 border-t border-white/[0.04]">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Savol yozing..."
                disabled={isTyping}
                className="flex-1 bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-primary/40 focus:bg-white/[0.08] transition-all duration-200 disabled:opacity-50"
              />
              <motion.button type="submit" disabled={isTyping || !input.trim()}
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(74,222,128,0.3)] disabled:opacity-40">
                <Send className="w-4 h-4 text-black" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB toggle button */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 right-6 z-[998] w-14 h-14 rounded-2xl bg-primary shadow-[0_8px_28px_rgba(74,222,128,0.35),0_0_0_1px_rgba(74,222,128,0.15)] flex items-center justify-center"
        aria-label="Chat"
      >
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
