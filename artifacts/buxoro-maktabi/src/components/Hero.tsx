import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Users, Building2, Utensils } from "lucide-react";
const logoImg = "/logo.png";

const previews = [
  { icon: Users, label: "Jamoa", desc: "Professional o'qituvchilar va rahbarlar jamoasi", href: "/jamoa", gradient: "from-primary to-emerald-400", cardBg: "rgba(5,150,105,0.35)" },
  { icon: Building2, label: "Sinfxonalar", desc: "Zamonaviy texnologiyalar bilan jihozlangan sinflar", href: "/sinflar", gradient: "from-sky-400 to-blue-400", cardBg: "rgba(56,189,248,0.30)" },
  { icon: Utensils, label: "Oshxona", desc: "Sog'lom va mazali taomlar, kunlik menyu", href: "/oshxona", gradient: "from-orange-400 to-rose-400", cardBg: "rgba(251,146,60,0.32)" },
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
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-visible pt-24 md:pt-20">

      {/* Background — video on desktop, gradient on mobile */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Mobile video background */}
        <video
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          disablePictureInPicture
          className="md:hidden absolute inset-0 w-full h-full object-cover"
          onCanPlay={(e) => (e.currentTarget as HTMLVideoElement).play().catch(() => {})}
        >
          <source src="/hero-mobile.mp4" type="video/mp4" />
        </video>
        {/* Desktop video */}
        <video
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          disablePictureInPicture
          className="hidden md:block w-full h-full object-cover"
          onCanPlay={(e) => (e.currentTarget as HTMLVideoElement).play().catch(() => {})}
        >
          <source src="/hero-bg.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
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
            <div className="absolute -inset-14 bg-primary/10 blur-[80px] rounded-full animate-pulse-slow" />
            <img
              src={logoImg}
              alt="Buxoro Maktabi Logo"
              className="w-52 h-52 sm:w-56 sm:h-56 object-cover relative z-10 animate-float drop-shadow-[0_0_35px_rgba(5,150,105,0.4)] rounded-full"
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

            <motion.div
              variants={lineVariants}
              className="inline-block glass-card px-6 py-4 md:px-8 md:py-5 mt-4"
            >
              <p className="font-['Playfair_Display'] italic font-black text-white leading-[1.7] animate-neon-pulse drop-shadow-[0_0_20px_rgba(5,150,105,0.3)]"
                 style={{fontSize:"clamp(1.1rem, 3vw, 1.6rem)"}}>
                Bekoboddagi eng ilg'or va ishonchli ta'lim muhitini yaratayotgan maktab. Kelajak yetakchilarini bugun tarbiyalaymiz.
              </p>
            </motion.div>

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
      <div className="w-full pb-8 px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.5 }}
          >
            {previews.map((item, idx) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.05, y: -6 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  href={item.href}
                  className="group block p-6 md:p-7 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-white/20 hover:border-white/40"
                  style={{
                    background: item.cardBg,
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                  }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg flex items-center justify-center mb-5`}
                    style={{ boxShadow: "0 0 22px 6px rgba(255,255,255,0.18), 0 4px 18px rgba(0,0,0,0.35)" }}
                  >
                    <item.icon className="w-8 h-8 text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]" />
                  </div>
                  <h3 className="text-white font-extrabold text-2xl md:text-2xl mb-2 group-hover:text-primary transition-colors duration-300 tracking-tight">{item.label}</h3>
                  <p className="text-white/80 text-base md:text-base leading-relaxed mb-4 font-medium">{item.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-primary text-base md:text-base font-semibold">
                    Batafsil ko'rish <ArrowRight className="w-4 h-4" />
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
