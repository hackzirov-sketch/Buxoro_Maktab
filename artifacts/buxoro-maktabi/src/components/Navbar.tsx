import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import logoImg from "@assets/image_1778575455248.png";
import { motion, AnimatePresence } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Bosh sahifa", href: "#" },
    { name: "Biz haqimizda", href: "#" },
    { name: "Ta'lim", href: "#" },
    { name: "Sinflar", href: "#" },
    { name: "Natijalar", href: "#" },
    { name: "Yangiliklar", href: "#" },
    { name: "Aloqa", href: "#" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/25 backdrop-blur-2xl border-b border-white/8 py-3 shadow-[0_4px_40px_rgba(0,0,0,0.2)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <motion.a
          href="#"
          className="flex items-center gap-3 group"
          data-testid="link-home"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/50 blur-md rounded-full group-hover:bg-primary/80 transition-all duration-500"></div>
            <img src={logoImg} alt="Buxoro Maktabi Logo" className="w-10 h-10 object-cover relative z-10 rounded-full" />
          </div>
          <span className="font-poppins font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors duration-300">
            Buxoro Maktabi
          </span>
        </motion.a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white relative group"
              data-testid={`link-nav-${link.name}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.05 * i }}
            >
              {link.name}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300 rounded-full" />
            </motion.a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center">
          <motion.a
            href="tel:+998948356666"
            whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(74,222,128,0.35)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-primary/20 hover:border-primary/50 transition-colors duration-300 backdrop-blur-md"
            data-testid="link-phone"
          >
            <Phone className="w-4 h-4 text-primary" />
            +998 94 835 66 66
          </motion.a>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="lg:hidden text-white/80 hover:text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="lg:hidden overflow-hidden"
          >
            <motion.div
              initial={{ y: -12 }}
              animate={{ y: 0 }}
              exit={{ y: -12 }}
              transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
              className="absolute top-full left-0 right-0 bg-black/85 backdrop-blur-2xl border-b border-white/10 py-6 px-4 flex flex-col gap-2 shadow-2xl"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT_EXPO, delay: i * 0.04 }}
                  className="text-lg font-medium text-white/80 hover:text-primary transition-colors py-2 border-b border-white/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="tel:+998948356666"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO, delay: 0.3 }}
                className="flex items-center justify-center gap-2 px-5 py-3 mt-4 rounded-full bg-primary/20 border border-primary/50 text-white font-medium"
              >
                <Phone className="w-4 h-4 text-primary" />
                +998 94 835 66 66
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
