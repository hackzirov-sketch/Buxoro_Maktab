import { useState, useEffect, useCallback } from "react";
import { Phone, X } from "lucide-react";
import { Link, useLocation } from "wouter";
const logoImg = "/logo.png";
import { motion, AnimatePresence } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const navLinks = [
  { name: "Bosh sahifa", href: "/" },
  { name: "Jamoa", href: "/jamoa" },
  { name: "Sinflar", href: "/sinflar" },
  { name: "Oshxona", href: "/oshxona" },
  { name: "Ariza", href: "/ariza" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [mobileMenuOpen]);

  const closeMobile = useCallback(() => setMobileMenuOpen(false), []);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/40 backdrop-blur-2xl border-b border-white/[0.06] py-2.5 shadow-[0_4px_40px_rgba(0,0,0,0.3)]"
          : "bg-transparent py-4 md:py-5"
      }`}
    >
      <div className="w-full px-4 md:px-8 flex items-center justify-between h-12 md:h-auto">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-primary/50 blur-md rounded-full group-hover:bg-primary/80 transition-all duration-400" />
            <img src={logoImg} alt="Logo" className="w-9 h-9 md:w-10 md:h-10 object-cover relative z-10 rounded-full" />
          </div>
          <span className="font-poppins font-bold text-lg md:text-xl tracking-tight text-white group-hover:text-primary transition-colors duration-300">
            Buxoro Maktabi
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium relative group py-1 focus-visible:outline-none focus-visible:text-white transition-colors duration-200 ${
                isActive(link.href) ? "text-white" : "text-white/65 hover:text-white"
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-0.5 left-0 h-px bg-primary transition-all duration-300 rounded-full ${
                isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          ))}
        </nav>

        {/* Phone button — desktop */}
        <a
          href="tel:+998948356666"
          className="hidden lg:inline-flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-primary/20 hover:border-primary/50 transition-colors duration-300 backdrop-blur-md shrink-0 focus-visible:outline-2 focus-visible:outline-primary/60"
        >
          <Phone className="w-4 h-4 text-primary shrink-0" />
          +998 94 835 66 66
        </a>

        {/* Hamburger — mobile */}
        <button
          className="lg:hidden relative w-9 h-9 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-primary/60 rounded-lg"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label={mobileMenuOpen ? "Menyuni yopish" : "Menyuni ochish"}
          aria-expanded={mobileMenuOpen}
        >
          <div className="relative w-5 h-4">
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
              className="absolute left-0 top-0 w-5 h-0.5 bg-white rounded-full origin-center block"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-1.5 w-5 h-0.5 bg-white rounded-full block"
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
              className="absolute left-0 bottom-0 w-5 h-0.5 bg-white rounded-full origin-center block"
            />
          </div>
        </button>
      </div>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={closeMobile}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12, scaleY: 0.96, transformOrigin: "top" }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -12, scaleY: 0.96 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className="fixed top-[72px] left-4 right-4 z-50 lg:hidden overflow-hidden rounded-2xl border border-white/[0.08] bg-[#071f13]/95 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
          >
            <div className="py-3 px-4 flex flex-col gap-0.5">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-medium transition-colors py-3 px-3 rounded-xl ${
                    isActive(link.href)
                      ? "text-primary bg-white/[0.06]"
                      : "text-white/75 hover:text-primary hover:bg-white/[0.04]"
                  }`}
                  onClick={closeMobile}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="tel:+998948356666"
                className="flex items-center justify-center gap-2 px-5 py-3 mt-3 rounded-xl bg-primary/15 border border-primary/40 text-white font-medium text-sm active:scale-[0.98] transition-transform hover:bg-primary/20"
                onClick={closeMobile}
              >
                <Phone className="w-4 h-4 text-primary shrink-0" />
                +998 94 835 66 66
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
