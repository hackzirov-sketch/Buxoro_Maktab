import { motion } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Map() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-b from-white via-white/80 to-white dark:from-emerald-900/30 dark:via-emerald-900/20 dark:to-emerald-900/30">
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob" style={{ width: "400px", height: "400px", top: "10%", right: "-5%", background: "radial-gradient(circle, rgba(5,150,105,0.04) 0%, transparent 70%)", animation: "drift 22s ease-in-out infinite" }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-10 md:mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-btn text-sm md:text-base font-semibold text-primary uppercase tracking-[0.15em] mb-5"
          >
            <MapPin className="w-4 h-4" /> Manzilimiz
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tight">
            Bizni <span className="text-primary">xaritada toping</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/50 mt-4 max-w-lg mx-auto leading-relaxed">
            Bekobod shahri, Toshkent viloyati — maktabimizga tashrif buyuring
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="glass-card overflow-hidden p-2 md:p-3"
        >
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden">
            <iframe
              src="https://maps.google.com/maps?q=40.213644,69.269192+(Buxoro+Maktabi)&output=embed&z=21&hl=uz"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Buxoro Maktabi xaritada"
            />
          </div>
          <div className="flex items-center justify-between px-2 pt-3 pb-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm md:text-base text-foreground/70">6779+CQ, Bekobod, Toshkent viloyati</span>
            </div>
            <a
              href="https://maps.google.com/maps?q=40.213644,69.269192"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Katta xaritada ko'rish →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
