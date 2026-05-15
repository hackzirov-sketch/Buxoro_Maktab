import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CTABanner() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 dark:from-amber-950/30 dark:via-yellow-950/20 dark:to-amber-950/30">
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob" style={{ width: "400px", height: "400px", top: "-30%", right: "-10%", background: "radial-gradient(circle, rgba(217,119,6,0.1) 0%, transparent 70%)", animation: "drift 20s ease-in-out infinite" }} />
        <div className="blob" style={{ width: "300px", height: "300px", bottom: "-20%", left: "-5%", background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)", animation: "drift 18s ease-in-out infinite reverse" }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="glass-card overflow-hidden"
        >
          <div className="relative p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(254,243,199,0.6) 100%)",
            }}
          >
            <div className="flex-1 text-center md:text-left">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/80 dark:bg-amber-800/40 text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-[0.12em] mb-4"
              >
                <Sparkles className="w-3.5 h-3.5" /> Hoziroq boshlang
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight"
              >
                Farzandingizni bugun ro'yxatdan o'tkazing
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
                className="text-base md:text-lg text-foreground/60 mt-3 max-w-xl leading-relaxed"
              >
                O'rinlar soni cheklangan. 2026-2027 o'quv yili uchun qabul ochiq. 
                Ariza qoldiring, operatorlarimiz siz bilan bog'lansin.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
              className="shrink-0"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/ariza"
                  className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 rounded-2xl text-lg md:text-xl font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%)",
                    boxShadow: "0 8px 32px rgba(217,119,6,0.35)",
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-[1s] ease-out" />
                  <span className="relative z-10">Ro'yxatdan o'tish</span>
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
