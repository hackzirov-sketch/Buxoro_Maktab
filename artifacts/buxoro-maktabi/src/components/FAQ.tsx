import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, Sparkles } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const faqs = [
  {
    q: "Maktabga qabul qanday amalga oshiriladi?",
    a: "Qabul jarayoni yil davomida ochiq. Siz 'Ariza topshirish' bo'limi orqali onlayn ariza qoldirishingiz yoki maktabga shaxsan tashrif buyurishingiz mumkin. Ariza qabul qilingandan so'ng, siz bilan bog'lanib suhbat va ekskursiya vaqtini belgilaymiz.",
  },
  {
    q: "Maktabda ovqatlanish qanday tashkil etilgan?",
    a: "Maktab oshxonamizda malakali oshpazlar tomonidan har kuni yangi va sog'lom taomlar tayyorlanadi. Menyu bolalarning yosh xususiyatlariga mos ravishda tuzilgan bo'lib, haftalik menyuni oshxona bo'limida ko'rishingiz mumkin.",
  },
  {
    q: "Darsdan tashqari qanday to'garaklar mavjud?",
    a: "Maktabimizda sport (futbol, basketbol, voleybol), san'at (rasm, musiqa, raqs), texnik (robototexnika, IT) va til to'garaklari faoliyat yuritadi. To'garaklarga qatnashish ixtiyoriy va bepul.",
  },
  {
    q: "Maktabga qabul uchun qanday hujjatlar kerak?",
    a: "Qabul uchun bolaning tug'ilganlik haqidagi guvohnomasi, ota-onaning pasporti, 3x4 o'lchamdagi 2 ta rasm va tibbiy ma'lumotnoma talab qilinadi. Batafsil ma'lumotni Ariza bo'limida olishingiz mumkin.",
  },
  {
    q: "Maktabda xavfsizlik qanday ta'minlanadi?",
    a: "Maktab hududi 24/7 videokuzatuv ostida. Kirish joyida avtomatlashtirilgan o'tkazish tizimi mavjud. Har bir o'quvchi va xodim maxsus plastik karta orqali o'tadi. Maktabda doimiy ravishda sog'liqni saqlash punkti faoliyat yuritadi.",
  },
  {
    q: "O'quvchilarning individual xususiyatlari qanday hisobga olinadi?",
    a: "Har bir o'quvchiga individual yondashish asosiy tamoyillarimizdan. Kichik sinflardagi guruhlar (15-20 o'quvchi) o'qituvchiga har bir bola bilan alohida shug'ullanish imkonini beradi. Psixologik xizmat ham doimiy faoliyat yuritadi.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE, delay: i * 0.08 },
  }),
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section className="relative py-28 md:py-36 overflow-hidden dark:bg-emerald-900/15">
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob" style={{ width: "500px", height: "500px", top: "-10%", right: "-5%", background: "radial-gradient(circle, rgba(5,150,105,0.04) 0%, transparent 70%)", animation: "drift 25s ease-in-out infinite" }} />
        <div className="blob" style={{ width: "350px", height: "350px", bottom: "-5%", left: "-5%", background: "radial-gradient(circle, rgba(5,150,105,0.03) 0%, transparent 70%)", animation: "drift 20s ease-in-out infinite reverse" }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-14 md:mb-18"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-btn text-sm md:text-base font-semibold text-primary uppercase tracking-[0.15em] mb-5"
          >
            <MessageCircle className="w-4 h-4" /> Biz tushunamiz
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tight">
            Sizni <span className="text-primary">o'ylantiradigan savollar</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 mt-5 max-w-3xl mx-auto leading-relaxed font-['Playfair_Display'] italic">
            "Har bir ota-ona tashvishlanadi. Biz bu tashvishlarni yuzlab marta eshitdik — va maktabimizni ularni hal qilish uchun qurdik."
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={itemVariants}
            >
              <motion.button
                onClick={() => toggle(idx)}
                className={`w-full text-left glass-card p-5 md:p-6 transition-all duration-300 ${openIndex === idx ? "shadow-md" : ""}`}
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors duration-300 ${openIndex === idx ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base md:text-lg font-semibold text-foreground">{faq.q}</span>
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === idx ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-primary/60" />
                  </motion.div>
                </div>
                <AnimatePresence initial={false}>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-base md:text-lg text-foreground/60 leading-relaxed pl-11">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
