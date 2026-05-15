import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-5 left-4 right-4 z-[999] md:hidden"
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
      )}
    </AnimatePresence>
  );
}
