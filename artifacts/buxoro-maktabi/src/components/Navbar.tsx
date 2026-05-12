import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import logoImg from "@assets/image_1778575455248.png";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/20 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group" data-testid="link-home">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/50 blur-md rounded-full group-hover:bg-primary/80 transition-all duration-500"></div>
            <img src={logoImg} alt="Buxoro Maktabi Logo" className="w-10 h-10 object-cover relative z-10 rounded-full" />
          </div>
          <span className="font-poppins font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors">
            Buxoro Maktabi
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-white hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.8)] transition-all"
              data-testid={`link-nav-${link.name}`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center">
          <a
            href="tel:+998901234545"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] transition-all duration-300 backdrop-blur-md"
            data-testid="link-phone"
          >
            <Phone className="w-4 h-4 text-primary" />
            +998 90 123 45 45
          </a>
        </div>

        <button 
          className="lg:hidden text-white/80 hover:text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-black/80 backdrop-blur-2xl border-b border-white/10 py-6 px-4 flex flex-col gap-4 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-white/80 hover:text-primary transition-colors py-2 border-b border-white/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="tel:+998901234545"
              className="flex items-center justify-center gap-2 px-5 py-3 mt-4 rounded-full bg-primary/20 border border-primary/50 text-white font-medium"
            >
              <Phone className="w-4 h-4 text-primary" />
              +998 90 123 45 45
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}