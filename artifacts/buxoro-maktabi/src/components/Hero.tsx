import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Users, Building2, Utensils, FileText } from "lucide-react";
import { useRef, useEffect } from "react";
const logoImg = "/logo.png";

const previews = [
  { icon: Users, label: "Jamoa", desc: "Professional o'qituvchilar va rahbarlar jamoasi", href: "/jamoa", gradient: "from-primary to-emerald-400" },
  { icon: Building2, label: "Sinfxonalar", desc: "Zamonaviy texnologiyalar bilan jihozlangan sinflar", href: "/sinflar", gradient: "from-sky-400 to-blue-400" },
  { icon: Utensils, label: "Oshxona", desc: "Sog'lom va mazali taomlar, kunlik menyu", href: "/oshxona", gradient: "from-orange-400 to-rose-400" },
  { icon: FileText, label: "Ariza", desc: "Farzandingizni maktabga ro'yxatdan o'tkazing", href: "/ariza", gradient: "from-primary to-emerald-400" },
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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const play = () => v.play().catch(() => {});
    const canPlayHandler = () => play();
    v.addEventListener("canplay", canPlayHandler, { once: true });
    v.addEventListener("loadedmetadata", () => play(), { once: true });
    v.load();
    return () => {
      v.removeEventListener("canplay", canPlayHandler);
    };
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-16 md:pt-20">

      {/* Background video — laptop only */}
      <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
          <source src="/hero-bg.MOV" type="video/quicktime" />
        </video>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 relative z-10 flex-1 flex flex-col justify-center pb-6">

        {/* Logo — mobile only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.05, ease: EASE_OUT_EXPO, delay: 0.05 }}
          className="flex justify-center items-center mb-8 lg:hidden"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-12 bg-primary/10 blur-[70px] rounded-full animate-pulse-slow" />
            <img
              src={logoImg}
              alt="Buxoro Maktabi Logo"
              className="w-44 h-44 sm:w-48 sm:h-48 object-cover relative z-10 animate-float drop-shadow-[0_0_28px_rgba(34,197,94,0.3)] rounded-full"
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto w-full">

          {/* Text */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">

            <motion.div
              variants={lineVariants}
              className="glass-button text-[#065f46] mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
              <span className="text-xs font-medium text-foreground/80 uppercase tracking-widest">Qabul 2026-2027 ochiq</span>
            </motion.div>

            <motion.h1
              variants={lineVariants}
              className="font-bold text-foreground leading-[1.08] tracking-tight font-poppins mb-5"
              style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)" }}
            >
              Farzandingiz uchun{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-200 drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                zamonaviy
              </span>{" "}
              va sifatli ta'lim markazi
            </motion.h1>

            <motion.p
              variants={lineVariants}
              className="text-sm sm:text-base md:text-lg text-foreground/70 max-w-xl font-normal leading-[1.85]"
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
              <div className="absolute -inset-16 bg-primary/10 blur-[80px] rounded-full animate-pulse-slow" />
              <img
                src={logoImg}
                alt="Buxoro Maktabi"
                className="w-56 xl:w-64 h-56 xl:h-64 object-cover relative z-10 animate-float drop-shadow-[0_0_30px_rgba(34,197,94,0.3)] rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section Preview Cards */}
      <div className="w-full pb-8 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
            }}
          >
            {previews.map((item, idx) => (
              <motion.div
                key={item.label}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.94 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
                }}
                whileHover={{ scale: 1.04, transition: { type: "spring", stiffness: 350, damping: 22 } }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  href={item.href}
                  className="group block p-5 md:p-6 rounded-2xl glass-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} bg-opacity-20 flex items-center justify-center mb-4`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-foreground font-semibold text-base md:text-lg mb-1.5 group-hover:text-primary transition-colors duration-300">{item.label}</h3>
                  <p className="text-foreground/50 text-sm leading-relaxed mb-3">{item.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-primary text-xs font-medium">
                    Batafsil ko'rish <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}
