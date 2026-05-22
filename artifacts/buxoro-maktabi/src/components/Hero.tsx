import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Award, FileText } from "lucide-react";
const logoImg = "/logo.png";

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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/65 md:bg-gradient-to-r md:from-black/45 md:via-black/20 md:to-transparent" />
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 relative z-10 flex-1 flex flex-col justify-center pb-6">

        {/* Logo — mobile only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.05, ease: EASE_OUT_EXPO, delay: 0.05 }}
          className="flex justify-center items-center mb-6 lg:hidden"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-10 bg-primary/10 blur-[60px] rounded-full animate-pulse-slow" />
            <img
              src={logoImg}
              alt="Buxoro Maktabi Logo"
              className="w-36 h-36 sm:w-44 sm:h-44 object-cover relative z-10 animate-float drop-shadow-[0_0_28px_rgba(5,150,105,0.38)] rounded-full"
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
              <span className="text-sm md:text-xs font-semibold text-white md:text-foreground/80 uppercase tracking-wide md:tracking-widest">Qabul 2026-2027 ochiq</span>
            </motion.div>

            <motion.h1
              variants={lineVariants}
              className="font-bold text-white md:text-foreground leading-[1.08] tracking-tight font-poppins mb-5 drop-shadow-[0_3px_18px_rgba(0,0,0,0.55)] md:drop-shadow-none"
              style={{ fontSize: "clamp(2.55rem, 9vw, 4.5rem)" }}
            >
              Farzandingiz uchun{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-200 drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                zamonaviy
              </span>{" "}
              va sifatli xususiy maktab
            </motion.h1>

            <motion.div
              variants={lineVariants}
              className="max-w-2xl"
            >
              <p className="text-lg sm:text-xl md:text-xl text-white/95 md:text-foreground/75 leading-relaxed font-semibold md:font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] md:drop-shadow-none">
                Bekoboddagi zamonaviy maktab: 2007-yildan buyon minglab o'quvchilar va ota-onalar ishonchini qozongan, kuchli ustozlar, nazoratli ta'lim va ochiq aloqa.
              </p>
            </motion.div>

            <motion.div
              variants={lineVariants}
              className="mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link
                href="/ariza"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-base font-bold text-primary-foreground shadow-[0_12px_32px_rgba(5,150,105,0.35)] transition-transform duration-200 active:scale-[0.98] hover:translate-y-[-1px]"
              >
                <FileText className="h-5 w-5" />
                Ariza topshirish
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/natijalar"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/12 px-6 py-3 text-base font-semibold text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/18 md:border-primary/25 md:bg-white/70 md:text-foreground md:hover:bg-white"
              >
                <Award className="h-5 w-5 text-primary" />
                Natijalarni ko'rish
              </Link>
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


    </section>
  );
}
