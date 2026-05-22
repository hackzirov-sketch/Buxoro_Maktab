import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award, Sparkles, Star, PencilRuler } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    year: "0-sinf",
    title: "Maktabgacha tayyorlov",
    desc: "Maktabga ilk qadam qo'yayotgan bolalar uchun savodxonlik, hisob, nutq, diqqat va ijtimoiy moslashuv ko'nikmalari bosqichma-bosqich shakllantiriladi.",
    icon: PencilRuler, gradient: "from-lime-400 to-emerald-500", color: "#16a34a",
  },
  {
    year: "1–4-sinflar",
    title: "Prezident maktabiga tayyorlov",
    desc: "Boshlang'ich sinf o'quvchilari uchun Prezident maktablariga tayyorgarlik. O'qish, yozish, mantiqiy fikrlash va ijodiy ko'nikmalar shakllantiriladi.",
    icon: Star, gradient: "from-emerald-400 to-teal-500", color: "#059669",
  },
  {
    year: "5–8-sinflar",
    title: "Ixtisoslashtirilgan maktablarga tayyorlov",
    desc: "Ixtisoslashtirilgan maktablarga tayyorgarlik. Aniq fanlar, xorijiy tillar va texnologiyalarga chuqur e'tibor qaratiladi.",
    icon: BookOpen, gradient: "from-sky-400 to-blue-500", color: "#0284c7",
  },
  {
    year: "9–11-sinflar",
    title: "Oliy ta'limga tayyorlov",
    desc: "O'z sohalarida oliy ta'lim muassasalariga tayyorgarlik ko'rish. Ixtisoslashtirilgan fanlar va ilmiy loyihalar bilan shug'ullanish.",
    icon: GraduationCap, gradient: "from-purple-400 to-violet-600", color: "#7c3aed",
  },
  {
    year: "Bitiruv",
    title: "Muvaffaqiyatli kelajak",
    desc: "Bitiruvchilarimiz O'zbekiston va xorijning nufuzli oliy ta'lim muassasalarida o'qishni davom ettiradilar.",
    icon: Award, gradient: "from-amber-400 to-orange-500", color: "#d97706",
  },
];

export default function Roadmap() {
  return (
    <section className="relative py-20 md:py-36 overflow-hidden bg-gradient-to-b from-white via-white/80 to-white dark:from-emerald-900/30 dark:via-emerald-900/20 dark:to-emerald-900/30">
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
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-btn text-base md:text-base font-bold text-primary uppercase tracking-wide md:tracking-[0.15em] mb-5"
          >
            <Sparkles className="w-4 h-4" /> Ta'lim yo'nalishi
          </motion.span>
          <h2 className="text-5xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.08] tracking-tight">
            Maktab <span className="text-primary">ta'lim bosqichlari</span>
          </h2>
          <p className="text-xl md:text-lg text-foreground/70 mt-4 max-w-lg mx-auto leading-relaxed font-semibold md:font-normal">
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
                        className="inline-block text-base md:text-base font-bold uppercase tracking-wide md:tracking-[0.2em] mb-3"
                        style={{ color: step.color }}
                      >
                        {step.year}
                      </motion.span>
                      <h3 className="text-2xl md:text-2xl font-extrabold text-foreground mb-3">{step.title}</h3>
                      <p className="text-lg md:text-lg text-foreground leading-relaxed">{step.desc}</p>
                    </motion.div>
                  </div>

                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 360 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.gradient} flex items-center justify-center border border-white/40`}
                      style={{ boxShadow: `0 0 40px 10px ${step.color}60, 0 0 80px 20px ${step.color}30, inset 0 1px 1px rgba(255,255,255,0.3)` }}
                    >
                      <Icon className="w-10 h-10 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    </motion.div>
                    <motion.div
                      className="absolute -inset-4 rounded-3xl -z-10"
                      style={{ background: step.color + "30", filter: "blur(20px)" }}
                      animate={{ opacity: [0.4, 0.9, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
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
