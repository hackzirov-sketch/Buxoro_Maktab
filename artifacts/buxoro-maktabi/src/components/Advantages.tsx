import { motion } from "framer-motion";
import { BookOpen, Shield, Music, Cpu, PlusCircle, Sparkles, ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const advantages = [
  {
    icon: BookOpen, num: "01",
    title: "Sifatli ta'lim",
    desc: "Malakali pedagoglar va zamonaviy metodikalar asosida yuqori darajadagi ta'lim",
    gradient: "from-emerald-400/20 to-teal-400/10", color: "#059669",
    glow: "rgba(5,150,105,0.15)",
  },
  {
    icon: Shield, num: "02",
    title: "Xavfsiz va sog'lom muhit",
    desc: "Doimiy videokuzatuv, xavfsiz hudud va sog'lom ovqatlanish bilan ta'minlangan maktab",
    gradient: "from-sky-400/20 to-blue-400/10", color: "#0284c7",
    glow: "rgba(2,132,199,0.15)",
  },
  {
    icon: Music, num: "03",
    title: "Darsdan tashqari mashg'ulotlar",
    desc: "Sport, san'at, musiqa va texnik to'garaklar orqali o'quvchilarning iqtidorini rivojlantirish",
    gradient: "from-purple-400/20 to-violet-400/10", color: "#7c3aed",
    glow: "rgba(124,58,237,0.15)",
  },
  {
    icon: Cpu, num: "04",
    title: "Zamonaviy va ilg'or texnologiyalar",
    desc: "Smart doskalar, interaktiv laboratoriyalar va raqamli ta'lim platformalari bilan jihozlangan sinflar",
    gradient: "from-amber-400/20 to-orange-400/10", color: "#d97706",
    glow: "rgba(217,119,6,0.15)",
  },
  {
    icon: PlusCircle, num: "05",
    title: "Qo'shimcha darslar",
    desc: "Ingliz tili, IT, robototexnika va boshqa fanlardan qo'shimcha mashg'ulotlar",
    gradient: "from-rose-400/20 to-pink-400/10", color: "#e11d48",
    glow: "rgba(225,29,72,0.15)",
  },
];

export default function Advantages() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-b from-white via-white/80 to-white dark:from-emerald-900/30 dark:via-emerald-900/20 dark:to-emerald-900/30">
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob" style={{ width: "400px", height: "400px", top: "-10%", left: "-5%", background: "radial-gradient(circle, rgba(5,150,105,0.04) 0%, transparent 70%)", animation: "drift 25s ease-in-out infinite" }} />
        <div className="blob" style={{ width: "300px", height: "300px", bottom: "-5%", right: "-5%", background: "radial-gradient(circle, rgba(5,150,105,0.03) 0%, transparent 70%)", animation: "drift 20s ease-in-out infinite reverse" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-btn text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-5"
          >
            <Sparkles className="w-3 h-3" /> Nega aynan biz?
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tight">
            Bizning{" "}
            <span className="relative">
              <span className="text-primary">ustunliklarimiz</span>
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-primary/30 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
              />
            </span>
          </h2>
          <p className="text-base md:text-lg text-foreground/50 mt-4 max-w-lg mx-auto leading-relaxed">
            Farzandingiz kelajagi uchun eng yaxshi tanlov
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 md:gap-6">
          {advantages.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: EASE, delay: idx * 0.12 }}
                className="group relative"
              >
                <motion.div
                  className="absolute -inset-2 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${item.glow}, transparent 70%)`,
                    filter: "blur(20px)",
                  }}
                />

                <div className="glass-card p-7 md:p-8 h-full flex flex-col items-center text-center relative overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                    }}
                  />

                  <span
                    className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-3"
                    style={{ color: item.color + "80" }}
                  >
                    {item.num}
                  </span>

                  <motion.div
                    whileHover={{ scale: 1.15, rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 relative`}
                    style={{ boxShadow: `0 0 30px ${item.color}20` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: item.color }} />
                    <motion.div
                      className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100"
                      style={{ background: item.glow, filter: "blur(12px)" }}
                      animate={{ opacity: [0, 0.4, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>

                  <h3 className="text-base md:text-lg font-bold text-foreground mb-2.5 leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs md:text-sm text-foreground/50 leading-relaxed flex-1">
                    {item.desc}
                  </p>

                  <motion.div
                    className="mt-4 flex items-center gap-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                    style={{ color: item.color }}
                  >
                    Batafsil <ArrowRight className="w-3 h-3" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
