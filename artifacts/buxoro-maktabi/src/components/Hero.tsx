import { motion } from "framer-motion";
import { BookOpen, Utensils, Award, Users } from "lucide-react";
const logoImg = "/logo.png";

const stats = [
  { icon: BookOpen, label: "Sinflarimiz", href: "#maktab-hayoti" },
  { icon: Utensils, label: "Oshxonamiz", href: "#oshxona" },
  { icon: Award, label: "Natijalarimiz", href: "#natijalar" },
  { icon: Users, label: "O'qituvchilarimiz", href: "#oqituvchilar" },
];

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE_OUT_EXPO },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-20">

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex-1 flex flex-col justify-center pb-8">

        {/* Logo — mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.05 }}
          className="flex justify-center items-center mb-10 lg:hidden"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-16 bg-primary/25 blur-[80px] rounded-full animate-pulse-slow"></div>
            <img
              src={logoImg}
              alt="Buxoro Maktabi Logo"
              className="w-40 h-40 object-cover relative z-10 animate-float drop-shadow-[0_0_30px_rgba(74,222,128,0.5)] rounded-full"
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text block with stagger */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={lineVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-medium text-white/80 uppercase tracking-widest">Qabul 2026-2027 ochiq</span>
            </motion.div>

            <motion.h1
              variants={lineVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight font-poppins mb-5"
            >
              Farzandingiz uchun{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-200 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]">
                zamonaviy
              </span>{" "}
              va sifatli ta'lim markazi
            </motion.h1>

            <motion.p
              variants={lineVariants}
              className="text-base md:text-lg text-white/85 max-w-xl font-normal leading-[1.8]"
            >
              Buxorodagi eng ilg'or va ishonchli ta'lim muhitini yaratayotgan maktab. Kelajak yetakchilarini bugun tarbiyalaymiz.
            </motion.p>
          </motion.div>

          {/* Logo — desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.2 }}
            className="hidden lg:flex justify-center items-center relative"
          >
            <div className="relative w-80 h-80 flex items-center justify-center">
              <div className="absolute -inset-16 bg-primary/25 blur-[80px] rounded-full animate-pulse-slow"></div>
              <img
                src={logoImg}
                alt="Big Logo"
                className="w-64 h-64 object-cover relative z-10 animate-float drop-shadow-[0_0_30px_rgba(74,222,128,0.5)] rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="w-full pb-10 px-4 md:px-6">
        <div className="container mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.09, delayChildren: 0.55 } },
            }}
          >
            {stats.map((stat) => (
              <motion.a
                key={stat.label}
                href={stat.href}
                variants={{
                  hidden: { opacity: 0, y: 22, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
                }}
                whileHover={{ scale: 1.04, transition: { type: "spring", stiffness: 350, damping: 22 } }}
                whileTap={{ scale: 0.97 }}
                className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(74,222,128,0.12)] transition-colors duration-300 group cursor-pointer"
                data-testid={`link-stat-${stat.label}`}
              >
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_16px_rgba(74,222,128,0.4)] transition-all duration-300">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-semibold text-white/60 group-hover:text-white/90 transition-colors text-center tracking-wide uppercase">{stat.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}
