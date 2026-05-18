import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CTABanner() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 70%, #059669 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob" style={{ width: "500px", height: "500px", top: "-20%", right: "-10%", background: "radial-gradient(circle, rgba(52,211,153,0.25) 0%, transparent 70%)", animation: "drift 20s ease-in-out infinite" }} />
        <div className="blob" style={{ width: "400px", height: "400px", bottom: "-20%", left: "-8%", background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)", animation: "drift 18s ease-in-out infinite reverse" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(110,231,183,0.15) 0%, transparent 60%)" }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="overflow-hidden rounded-3xl border border-white/20"
          style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}
        >
          <div className="relative p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
            <div className="flex-1 text-center md:text-left">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-base md:text-xs font-bold text-white uppercase tracking-wide md:tracking-[0.12em] mb-4"
              >
                <Sparkles className="w-3.5 h-3.5" /> Hoziroq boshlang
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
                className="text-5xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.12] tracking-tight"
              >
                Farzandingizni bugun ro'yxatdan o'tkazing
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
                className="text-xl md:text-lg text-white/88 mt-3 max-w-xl leading-relaxed font-semibold md:font-normal"
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
                  className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 rounded-2xl text-xl md:text-xl font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
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
