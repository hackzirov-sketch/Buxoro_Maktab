import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowRight, FileText, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingCTA() {
  const [pastFaq, setPastFaq] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const faqEl = document.getElementById("faq");
    if (!faqEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPastFaq(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    observer.observe(faqEl);
    return () => observer.disconnect();
  }, [location]);

  if (location === "/ariza") return null;

  return (
    <>
      <motion.div
        key="mobile-quick-actions"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.35 }}
        className="fixed bottom-3 left-3 right-3 z-[990] md:hidden"
      >
        <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-black/72 p-2 shadow-[0_12px_36px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <a
            href="tel:+998948356666"
            className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl bg-white/8 text-xs font-semibold text-white active:scale-[0.98]"
          >
            <Phone className="h-5 w-5 text-primary" />
            Qo'ng'iroq
          </a>
          <a
            href="https://t.me/BM_Bekobod"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl bg-white/8 text-xs font-semibold text-white active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5 text-sky-300" />
            Telegram
          </a>
          <Link
            href="/ariza"
            className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-[0_8px_24px_rgba(5,150,105,0.35)] active:scale-[0.98]"
          >
            <FileText className="h-5 w-5" />
            Ariza
          </Link>
        </div>
      </motion.div>

      <AnimatePresence>
        {pastFaq && (
          <motion.div
            key="desktop-cta"
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-[990] flex-col items-center"
          >
            <Link
              href="/ariza"
              className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-l-2xl px-4 py-6 font-bold text-white transition-all duration-300 hover:px-5"
              style={{
                background: "linear-gradient(180deg, #059669 0%, #10b981 60%, #34d399 100%)",
                boxShadow: "-6px 0 28px rgba(5,150,105,0.45), 0 4px 16px rgba(0,0,0,0.25)",
                writingMode: "vertical-rl",
                textOrientation: "mixed",
              }}
            >
              <span
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "linear-gradient(180deg, #047857 0%, #059669 60%, #10b981 100%)" }}
              />
              <FileText className="relative z-10 h-5 w-5 shrink-0" />
              <span className="relative z-10 text-sm font-semibold tracking-widest" style={{ writingMode: "vertical-rl" }}>
                Ariza topshirish
              </span>
              <ArrowRight className="relative z-10 h-4 w-4 shrink-0 rotate-90 transition-transform duration-300 group-hover:translate-y-1" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
