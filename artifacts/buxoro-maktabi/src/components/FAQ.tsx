import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, Sparkles } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const faqs = [
  {
    q: "Maktabga qabul qanday amalga oshiriladi?",
    a: "Qabul jarayoni yil davomida ochiq. Siz 'Ariza topshirish' bo'limi orqali onlayn ariza qoldirishingiz yoki maktabga shaxsan tashrif buyurishingiz mumkin. Ariza qabul qilingandan so'ng, siz bilan bog'lanib suhbat va ekskursiya vaqtini belgilaymiz. O'qituvchilarning 80% Buxoro va Toshkent shaharlaridan, 20% viloyat shaharlaridan 3-bosqichli imtihon bilan saralab olinadi.",
  },
  {
    q: "Ta'lim narxlari qanday?",
    a: "1-3-sinflar uchun o'quv to'lovi 1.8 mln so'm, 4-10-sinflar uchun 1.9 mln so'mni tashkil etadi. Narxga 2 mahal ovqat, darsliklar va zamonaviy sinfxonalardan foydalanish kiradi.",
  },
  {
    q: "Maktabda ovqatlanish qanday tashkil etilgan?",
    a: "Maktab oshxonamizda malakali oshpazlar tomonidan har kuni yangi va sog'lom taomlar tayyorlanadi. To'lovga 2 mahal ovqat (tushlik va tushki ovqat) kiritilgan. Menyu bolalarning yosh xususiyatlariga mos ravishda tuzilgan.",
  },
  {
    q: "Qanday ta'lim yo'nalishlari mavjud?",
    a: "O'qitish 3 yo'nalishda olib boriladi: 1-4-sinflar uchun Prezident maktabiga tayyorlov, 5-8-sinflar uchun ixtisoslashtirilgan maktablarga tayyorlov, 9-11-sinflar uchun o'z sohalarida oliy ta'limga tayyorlov.",
  },
  {
    q: "Maktab qachon va qayerda tashkil etilgan?",
    a: "Buxoro maktabi o'z faoliyatini dastavval 2007-yilda Toshkent viloyatining O'rta Chirchiq, Angren va Toshkent shaharlarida boshlagan. 2021-yilda Toshkent viloyatida birinchilardan bo'lib o'z xususiy maktabini ochdi. Hozirda 8 ta filial, o'quv markazi va xususiy bog'cha faoliyat yuritmoqda.",
  },
  {
    q: "O'quvchilarning individual xususiyatlari qanday hisobga olinadi?",
    a: "Har bir o'quvchiga individual yondashish asosiy tamoyillarimizdan. Kichik sinflardagi guruhlar (15-20 o'quvchi) o'qituvchiga har bir bola bilan alohida shug'ullanish imkonini beradi. Maktabda psixologik xizmat va doimiy monitoring tizimi faoliyat yuritadi.",
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
    <section id="faq" className="relative py-20 md:py-36 overflow-hidden dark:bg-emerald-900/15">
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
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-btn text-base md:text-base font-bold text-primary uppercase tracking-wide md:tracking-[0.15em] mb-5"
          >
            <MessageCircle className="w-4 h-4" /> Biz tushunamiz
          </motion.span>
          <h2 className="text-5xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.08] tracking-tight">
            Sizni <span className="text-primary">o'ylantiradigan savollar</span>
          </h2>
          <p className="text-xl md:text-xl text-foreground/80 mt-5 max-w-3xl mx-auto leading-relaxed font-semibold md:font-normal">
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
                    <span className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-colors duration-300 ${openIndex === idx ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg md:text-lg font-bold text-foreground">{faq.q}</span>
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
                      <p className="pt-4 text-lg md:text-lg text-foreground/70 leading-relaxed pl-0 sm:pl-11">
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
