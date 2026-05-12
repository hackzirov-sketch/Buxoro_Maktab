import { motion } from "framer-motion";
import { BookOpen, Utensils, Award, Users } from "lucide-react";
const logoImg = "/logo.png";

const stats = [
  { icon: BookOpen, label: "Sinflarimiz", href: "#maktab-hayoti" },
  { icon: Utensils, label: "Oshxonamiz", href: "#oshxona" },
  { icon: Award, label: "Natijalarimiz", href: "#natijalar" },
  { icon: Users, label: "O'qituvchilar", href: "#oqituvchilar" },
];

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.08 },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease: EASE_OUT_EXPO },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-16 md:pt-20">

      <div className="w-full px-4 sm:px-6 md:px-8 relative z-10 flex-1 flex flex-col justify-center pb-6">

        {/* Logo — mobile only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.05, ease: EASE_OUT_EXPO, delay: 0.05 }}
          className="flex justify-center items-center mb-8 lg:hidden"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-12 bg-primary/20 blur-[70px] rounded-full animate-pulse-slow" />
            <img
              src={logoImg}
              alt="Buxoro Maktabi Logo"
              className="w-32 h-32 sm:w-40 sm:h-40 object-cover relative z-10 animate-float drop-shadow-[0_0_28px_rgba(74,222,128,0.5)] rounded-full"
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto w-full">

          {/* Text */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">

            <motion.div
              variants={lineVariants}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-5 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
              <span className="text-xs font-medium text-white/80 uppercase tracking-widest">Qabul 2026-2027 ochiq</span>
            </motion.div>

            <motion.h1
              variants={lineVariants}
              className="font-bold text-white leading-[1.08] tracking-tight font-poppins mb-5"
              style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)" }}
            >
              Farzandingiz uchun{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-200 drop-shadow-[0_0_15px_rgba(74,222,128,0.4)]">
                zamonaviy
              </span>{" "}
              va sifatli ta'lim markazi
            </motion.h1>

            <motion.p
              variants={lineVariants}
              className="text-sm sm:text-base md:text-lg text-white/80 max-w-xl font-normal leading-[1.85]"
            >
              Buxorodagi eng ilg'or va ishonchli ta'lim muhitini yaratayotgan maktab. Kelajak yetakchilarini bugun tarbiyalaymiz.
            </motion.p>
          </motion.div>

          {/* Logo — desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.72, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.18 }}
            className="hidden lg:flex justify-center items-center relative"
          >
            <div className="relative w-72 xl:w-80 h-72 xl:h-80 flex items-center justify-center">
              <div className="absolute -inset-16 bg-primary/22 blur-[80px] rounded-full animate-pulse-slow" />
              <img
                src={logoImg}
                alt="Buxoro Maktabi"
                className="w-56 xl:w-64 h-56 xl:h-64 object-cover relative z-10 animate-float drop-shadow-[0_0_30px_rgba(74,222,128,0.5)] rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="w-full pb-8 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
            }}
          >
            {stats.map((stat) => (
              <motion.a
                key={stat.label}
                href={stat.href}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.94 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
                }}
                whileHover={{ scale: 1.04, transition: { type: "spring", stiffness: 350, damping: 22 } }}
                whileTap={{ scale: 0.96 }}
                className="flex flex-col items-center justify-center gap-2.5 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(74,222,128,0.10)] transition-colors duration-300 group min-h-[88px]"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_14px_rgba(74,222,128,0.35)] transition-all duration-300 shrink-0">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-white/60 group-hover:text-white/90 transition-colors text-center tracking-wide uppercase leading-tight">{stat.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}
