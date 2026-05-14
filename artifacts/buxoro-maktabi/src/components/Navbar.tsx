import { useState, useEffect, useCallback } from "react";
import { Phone, X, Sun, Moon } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useTheme } from "next-themes";
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
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

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
          ? "bg-emerald-100/70 dark:bg-black/70 backdrop-blur-xl border-b border-emerald-200/50 dark:border-white/10 shadow-sm py-2.5"
          : "bg-transparent py-4 md:py-5"
      }`}
    >
      <div className="w-full px-4 md:px-8 flex items-center justify-between h-12 md:h-auto border-b border-transparent backdrop-blur-[2px] animate-neon-border">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-primary/50 blur-md rounded-full group-hover:bg-primary/80 transition-all duration-400" />
            <img src={logoImg} alt="Logo" className="w-9 h-9 md:w-10 md:h-10 object-cover relative z-10 rounded-full" />
          </div>
          <span className="font-great-vibes text-xl md:text-2xl md:mt-1 text-[#059669] dark:text-emerald-300 group-hover:text-primary transition-colors duration-300 animate-neon-pulse">
            Buxoro Maktabi
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium relative group py-1 focus-visible:outline-none focus-visible:text-[#059669] transition-colors duration-200 ${
                isActive(link.href) ? "text-[#059669] dark:text-emerald-300" : "text-[#059669]/60 dark:text-emerald-300/60 hover:text-[#059669] dark:hover:text-emerald-300"
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-0.5 left-0 h-[2px] bg-[#059669] transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(5,150,105,0.5)] ${
                isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          ))}
        </nav>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-2 rounded-2xl p-1 border border-transparent animate-neon-border">
          <button
            className="glass-button hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] flex items-center justify-center shrink-0 w-10 h-10 focus-visible:outline-2 focus-visible:outline-primary/60 transition-all duration-300 overflow-hidden"
            aria-label="Tilni o'zgartirish"
          >
            <img src="/uz.gif" alt="O'zbekcha" className="w-5 h-5 object-cover rounded-sm" />
          </button>
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="glass-button text-[#065f46] dark:text-white/80 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] flex items-center justify-center shrink-0 w-10 h-10 focus-visible:outline-2 focus-visible:outline-primary/60 transition-all duration-300"
            aria-label="Tema almashtirish"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <a
            href="tel:+998948356666"
            className="glass-button text-[#059669] dark:text-emerald-300 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] inline-flex items-center gap-2 px-4 xl:px-5 py-2.5 shrink-0 text-sm font-medium focus-visible:outline-2 focus-visible:outline-primary/60 transition-all duration-300"
          >
            <Phone className="w-4 h-4 text-[#059669] shrink-0" />
            +998 94 835 66 66
          </a>
        </div>

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
              className="absolute left-0 top-0 w-5 h-0.5 bg-foreground rounded-full origin-center block"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-1.5 w-5 h-0.5 bg-foreground rounded-full block"
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
              className="absolute left-0 bottom-0 w-5 h-0.5 bg-foreground rounded-full origin-center block"
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
            className="fixed inset-0 top-0 left-0 w-full h-full bg-black/30 z-40 lg:hidden"
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
            className="glass-card fixed top-[72px] left-4 right-4 z-50 lg:hidden overflow-hidden"
          >
            <div className="py-3 px-4 flex flex-col gap-0.5">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-medium transition-colors py-3 px-3 rounded-xl ${
                    isActive(link.href)
                      ? "text-primary bg-black/[0.04] dark:bg-white/[0.06]"
                      : "text-foreground/70 hover:text-primary hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                  }`}
                  onClick={closeMobile}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center gap-2 px-3">
                <button
                  className="glass-button hover:bg-primary/10 flex items-center justify-center shrink-0 w-10 h-10 transition-all duration-300 overflow-hidden"
                  aria-label="Tilni o'zgartirish"
                >
                  <img src="/uz.gif" alt="O'zbekcha" className="w-5 h-5 object-cover rounded-sm" />
                </button>
                <button
                  onClick={() => { setTheme(isDark ? "light" : "dark"); closeMobile(); }}
                  className="glass-button text-[#065f46] dark:text-white/80 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] flex items-center justify-center gap-2 px-4 py-3 font-medium text-sm active:scale-[0.98] transition-all duration-300 flex-1"
                >
                  {isDark ? <Sun className="w-4 h-4 text-primary shrink-0" /> : <Moon className="w-4 h-4 text-primary shrink-0" />}
                  {isDark ? "Yorug' tema" : "Qorong'i tema"}
                </button>
              </div>
              <a
                href="tel:+998948356666"
                className="glass-button text-[#065f46] dark:text-white/80 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] flex items-center justify-center gap-2 px-5 py-3 mt-2 font-medium text-sm active:scale-[0.98] transition-all duration-300"
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
