import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Users, Building2, Utensils, FileText, Sparkles } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const buttons = [
  {
    label: "Jamoamiz",
    desc: "Professional o'qituvchilar",
    href: "/jamoa",
    icon: Users,
    gradient: "from-emerald-500 to-teal-600",
    shadow: "rgba(5,150,105,0.35)",
    color: "#059669",
  },
  {
    label: "Sinfxonalar",
    desc: "Zamonaviy jihozlangan sinflar",
    href: "/sinflar",
    icon: Building2,
    gradient: "from-sky-500 to-blue-600",
    shadow: "rgba(2,132,199,0.35)",
    color: "#0284c7",
  },
  {
    label: "Oshxona",
    desc: "Sog'lom va mazali taomlar",
    href: "/oshxona",
    icon: Utensils,
    gradient: "from-amber-500 to-orange-600",
    shadow: "rgba(217,119,6,0.35)",
    color: "#d97706",
  },
  {
    label: "Ariza",
    desc: "Farzandingizni ro'yxatdan o'tkazing",
    href: "/ariza",
    icon: FileText,
    gradient: "from-primary to-emerald-600",
    shadow: "rgba(5,150,105,0.4)",
    color: "#059669",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.1 },
  }),
};

export default function CTASection() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob" style={{ width: "600px", height: "600px", top: "-20%", left: "-10%", background: "radial-gradient(circle, rgba(5,150,105,0.06) 0%, transparent 70%)", animation: "drift 25s ease-in-out infinite" }} />
        <div className="blob" style={{ width: "400px", height: "400px", bottom: "-15%", right: "-5%", background: "radial-gradient(circle, rgba(2,132,199,0.04) 0%, transparent 70%)", animation: "drift 20s ease-in-out infinite reverse" }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
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
            <Sparkles className="w-4 h-4" /> Maktab bilan tanishing
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tight">
            Ko'proq <span className="text-primary">bilishni xohlaysizmi?</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/50 mt-4 max-w-lg mx-auto leading-relaxed">
            Siz uchun eng qiziqarli bo'limga o'ting va maktab hayoti bilan tanishing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {buttons.map((btn, idx) => {
            const Icon = btn.icon;
            return (
              <motion.div
                key={btn.label}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                <Link
                  href={btn.href}
                  className="group block relative"
                >
                  <motion.div
                    className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${btn.shadow}, transparent 70%)`,
                      filter: "blur(25px)",
                    }}
                  />

                  <motion.div
                    className="relative overflow-hidden rounded-2xl p-6 md:p-8 flex flex-col items-center text-center"
                    style={{
                      background: `linear-gradient(135deg, ${btn.color}15, ${btn.color}05)`,
                      border: `1px solid ${btn.color}20`,
                    }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${btn.color}15 0%, transparent 70%)`,
                      }}
                    />

                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${btn.gradient} flex items-center justify-center mb-5 shadow-lg relative`}
                      style={{ boxShadow: `0 0 35px ${btn.shadow}` }}
                      whileHover={{ scale: 1.12, rotate: [0, -8, 8, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                      <motion.div
                        className="absolute -inset-2 rounded-2xl"
                        style={{ background: btn.shadow, filter: "blur(16px)" }}
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.3 }}
                      />
                    </motion.div>

                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-1.5">{btn.label}</h3>
                    <p className="text-xs md:text-sm text-foreground/50 mb-4 leading-relaxed">{btn.desc}</p>

                    <motion.span
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 ${btn.href === "/ariza" ? "bg-primary" : ""}`}
                      style={btn.href !== "/ariza" ? { background: btn.color } : {}}
                      whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${btn.shadow}` }}
                    >
                      O'tish <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
