import { useState, useEffect, useCallback } from "react";
import { Phone, Menu, X } from "lucide-react";
const logoImg = "/logo.png";
import { motion, AnimatePresence } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const navLinks = [
  { name: "Bosh sahifa", href: "#" },
  { name: "Biz haqimizda", href: "#" },
  { name: "Ta'lim", href: "#maktab-hayoti" },
  { name: "Sinflar", href: "#" },
  { name: "Natijalar", href: "#natijalar" },
  { name: "Yangiliklar", href: "#" },
  { name: "Aloqa", href: "#" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/30 backdrop-blur-2xl border-b border-white/8 py-2.5 shadow-[0_4px_40px_rgba(0,0,0,0.25)]"
          : "bg-transparent py-4 md:py-5"
      }`}
    >
      <div className="w-full px-4 md:px-8 flex items-center justify-between h-12 md:h-auto">

        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-2.5 group shrink-0"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-primary/50 blur-md rounded-full group-hover:bg-primary/80 transition-all duration-400" />
            <img src={logoImg} alt="Logo" className="w-9 h-9 md:w-10 md:h-10 object-cover relative z-10 rounded-full" />
          </div>
          <span className="font-poppins font-bold text-lg md:text-xl tracking-tight text-white group-hover:text-primary transition-colors duration-300">
            Buxoro Maktabi
          </span>
        </motion.a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/65 hover:text-white relative group py-1"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.04 * i }}
            >
              {link.name}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300 rounded-full" />
            </motion.a>
          ))}
        </nav>

        {/* Phone button — desktop */}
        <motion.a
          href="tel:+998948356666"
          whileHover={{ scale: 1.04, boxShadow: "0 0 22px rgba(74,222,128,0.3)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
          className="hidden lg:flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-primary/20 hover:border-primary/50 transition-colors duration-300 backdrop-blur-md shrink-0"
        >
          <Phone className="w-4 h-4 text-primary shrink-0" />
          +998 94 835 66 66
        </motion.a>

        {/* Hamburger — mobile */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          className="lg:hidden text-white/80 hover:text-white p-2 -mr-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Menyu"
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.38, ease: EASE_OUT_EXPO }}
            className="lg:hidden overflow-hidden"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
              className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-2xl border-b border-white/10 py-5 px-5 flex flex-col gap-1 shadow-2xl"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.28, ease: EASE_OUT_EXPO, delay: i * 0.035 }}
                  className="text-base font-medium text-white/75 hover:text-primary active:text-primary transition-colors py-2.5 border-b border-white/5 last:border-0"
                  onClick={closeMobile}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="tel:+998948356666"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, ease: EASE_OUT_EXPO, delay: 0.27 }}
                className="flex items-center justify-center gap-2 px-5 py-3 mt-3 rounded-full bg-primary/20 border border-primary/50 text-white font-medium text-sm active:scale-95 transition-transform"
                onClick={closeMobile}
              >
                <Phone className="w-4 h-4 text-primary shrink-0" />
                +998 94 835 66 66
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
