import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowRight, FileText } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingCTA() {
  const [pastFaq, setPastFaq] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const faqEl = document.getElementById("faq");
    if (!faqEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setPastFaq(true);
        } else {
          setPastFaq(false);
        }
      },
      { threshold: 0 }
    );

    observer.observe(faqEl);
    return () => observer.disconnect();
  }, [location]);

  if (location === "/ariza") return null;

  return (
    <AnimatePresence>
      {pastFaq && (
        <>
          {/* Mobile — bottom bar */}
          <motion.div
            key="mobile-cta"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-5 left-4 right-4 z-[990] md:hidden"
          >
            <Link
              href="/ariza"
              className="group flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-lg font-bold text-white transition-all duration-300 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)",
                boxShadow: "0 8px 30px rgba(5,150,105,0.5), 0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              <span>Ariza topshirish</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Desktop — right side sticky pill */}
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
              className="group relative flex flex-col items-center gap-3 px-4 py-6 rounded-l-2xl text-white font-bold transition-all duration-300 hover:px-5 overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #059669 0%, #10b981 60%, #34d399 100%)",
                boxShadow: "-6px 0 28px rgba(5,150,105,0.45), 0 4px 16px rgba(0,0,0,0.25)",
                writingMode: "vertical-rl",
                textOrientation: "mixed",
              }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(180deg, #047857 0%, #059669 60%, #10b981 100%)" }}
              />
              <FileText className="w-5 h-5 relative z-10 shrink-0" />
              <span className="relative z-10 text-sm tracking-widest font-semibold" style={{ writingMode: "vertical-rl" }}>
                Ariza topshirish
              </span>
              <ArrowRight className="w-4 h-4 relative z-10 shrink-0 rotate-90 group-hover:translate-y-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
