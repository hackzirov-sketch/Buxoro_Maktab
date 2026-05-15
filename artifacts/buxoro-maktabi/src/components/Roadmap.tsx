import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Users, Award, Sparkles, Star } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    year: "0-sinf",
    title: "Maktabga tayyorlov",
    desc: "Bolalarni maktab hayotiga tayyorlash. Alifbo, raqamlar va ijtimoiy ko'nikmalar bilan tanishtirish.",
    icon: Star, gradient: "from-pink-400/20 to-rose-400/10", color: "#e11d48",
  },
  {
    year: "1–4-sinflar",
    title: "Boshlang'ich ta'lim",
    desc: "O'qish, yozish va hisoblash asoslari. Ijodiy fikrlash va mustaqil o'rganish ko'nikmalari shakllantiriladi.",
    icon: BookOpen, gradient: "from-emerald-400/20 to-teal-400/10", color: "#059669",
  },
  {
    year: "5–9-sinflar",
    title: "Asosiy o'rta ta'lim",
    desc: "Fanlar bo'yicha chuqur bilim beriladi. Xorijiy tillar, aniq fanlar va texnologiyalarga alohida e'tibor.",
    icon: Users, gradient: "from-sky-400/20 to-blue-400/10", color: "#0284c7",
  },
  {
    year: "10–11-sinflar",
    title: "Yuqori bosqich",
    desc: "Oliy ta'lim muassasalariga tayyorgarlik. Ixtisoslashtirilgan fanlar va ilmiy loyihalar bilan shug'ullanish.",
    icon: GraduationCap, gradient: "from-purple-400/20 to-violet-400/10", color: "#7c3aed",
  },
  {
    year: "Bitiruv",
    title: "Muvaffaqiyatli kelajak",
    desc: "Bitiruvchilarimiz O'zbekiston va xorijning nufuzli oliy ta'lim muassasalarida o'qishni davom ettiradilar.",
    icon: Award, gradient: "from-amber-400/20 to-orange-400/10", color: "#d97706",
  },
];

export default function Roadmap() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-b from-white via-white/80 to-white dark:from-emerald-900/30 dark:via-emerald-900/20 dark:to-emerald-900/30">
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob" style={{ width: "500px", height: "500px", top: "-15%", right: "-10%", background: "radial-gradient(circle, rgba(5,150,105,0.03) 0%, transparent 70%)", animation: "drift 22s ease-in-out infinite" }} />
        <div className="blob" style={{ width: "350px", height: "350px", bottom: "-8%", left: "-8%", background: "radial-gradient(circle, rgba(5,150,105,0.02) 0%, transparent 70%)", animation: "drift 18s ease-in-out infinite reverse" }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-btn text-sm md:text-base font-semibold text-primary uppercase tracking-[0.15em] mb-5"
          >
            <Sparkles className="w-4 h-4" /> Ta'lim yo'nalishi
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tight">
            Maktab <span className="text-primary">ta'lim bosqichlari</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/50 mt-4 max-w-lg mx-auto leading-relaxed font-['Playfair_Display'] italic">
            Har bir bosqichda o'quvchilarning yosh va psixologik xususiyatlariga mos ta'lim dasturlari
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ scaleY: 0, transformOrigin: "top" }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            className="absolute left-7 md:left-1/2 top-0 w-[2px] h-full bg-gradient-to-b from-primary/40 via-primary/20 to-transparent -translate-x-1/2 origin-top"
          />

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isLeft = idx % 2 === 0;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-10 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${isLeft ? "md:text-right md:pr-14" : "md:text-left md:pl-14"}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className={`glass-card p-6 md:p-8 inline-block max-w-lg ${isLeft ? "md:ml-auto" : ""}`}
                    >
                      <motion.span
                        initial={{ opacity: 0, x: isLeft ? 10 : -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
                        className="inline-block text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-3"
                        style={{ color: step.color }}
                      >
                        {step.year}
                      </motion.span>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                      <p className="text-base md:text-lg text-foreground/50 leading-relaxed">{step.desc}</p>
                    </motion.div>
                  </div>

                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 360 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg border border-white/30`}
                      style={{ boxShadow: `0 0 35px ${step.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: step.color }} />
                    </motion.div>
                    <motion.div
                      className="absolute -inset-3 rounded-2xl opacity-0 -z-10"
                      style={{ background: step.color + "15", filter: "blur(16px)" }}
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                    />
                  </div>

                  <div className="flex-1 hidden md:flex items-center">
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
                      className={`flex items-center gap-2 ${isLeft ? "pl-14" : "pr-14 flex-row-reverse"}`}
                    >
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/20 whitespace-nowrap">{step.year}</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
