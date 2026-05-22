const logoImg = "/logo.png";
import { motion } from "framer-motion";
import { Phone, MapPin, Mail } from "lucide-react";
import { FaTelegram, FaInstagram } from "react-icons/fa";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const colVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_OUT_EXPO, delay: i * 0.1 },
  }),
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-card rounded-none border-0 shadow-none pt-14 md:pt-20 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="w-full px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">

          {/* Brand */}
          <motion.div
            custom={0} variants={colVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="space-y-5 sm:col-span-2 lg:col-span-1"
          >
            <a href="#" className="flex items-center gap-3 group">
              <img src={logoImg} alt="Buxoro Maktabi Logo" className="w-11 h-11 object-cover rounded-full group-hover:scale-105 transition-transform duration-300" />
              <span className="font-poppins font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                Buxoro Maktabi
              </span>
            </a>
            <p className="text-foreground/50 text-sm leading-relaxed max-w-xs">
              2007-yildan buyon faoliyat yuritib, hozirgi kunda 8 ta filial, o'quv markazi va xususiy bog'chaga ega bo'lgan yetakchi xususiy maktab.
            </p>
            <div className="flex items-center gap-3">
              <motion.a
                href="https://www.instagram.com/buxoro_maktabi_bekobod/"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.94 }}
                className="rounded-full glass-button text-[#065f46] w-10 h-10 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-300 focus-visible:outline-2 focus-visible:outline-primary/60"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://t.me/BM_Bekobod"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.94 }}
                className="rounded-full glass-button text-[#065f46] w-10 h-10 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all duration-300 focus-visible:outline-2 focus-visible:outline-primary/60"
                aria-label="Telegram"
              >
                <FaTelegram className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div custom={1} variants={colVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h4 className="text-foreground font-semibold text-base md:text-lg mb-5 md:mb-6">Tezkor havolalar</h4>
            <ul className="space-y-3">
              {["Bosh sahifa", "Biz haqimizda", "Ta'lim dasturlari", "To'garaklar", "Oshxona menyusi", "Bo'sh ish o'rinlari"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-foreground/50 hover:text-primary transition-colors text-sm flex items-center gap-2 group focus-visible:outline-2 focus-visible:outline-primary/60 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-300 shrink-0" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div custom={2} variants={colVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h4 className="text-foreground font-semibold text-base md:text-lg mb-5 md:mb-6">Bog'lanish</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-foreground/50 text-sm">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Buxoro viloyati, Bekobod shahri</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+998948356666" className="text-foreground/50 hover:text-primary transition-colors">+998 94 835 66 66</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:buxoromaktabi777@gmail.com" className="text-foreground/50 hover:text-primary transition-colors truncate">buxoromaktabi777@gmail.com</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FaTelegram className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="https://t.me/BM_Bekobod" target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-primary transition-colors">@BM_Bekobod</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FaInstagram className="w-4 h-4 text-pink-400 shrink-0" />
                <a href="https://www.instagram.com/buxoro_maktabi_bekobod/" target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-primary transition-colors">@buxoro_maktabi_bekobod</a>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div custom={3} variants={colVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h4 className="text-foreground font-semibold text-base md:text-lg mb-5 md:mb-6">Xabarnomaga obuna</h4>
            <p className="text-foreground/50 text-sm mb-4 leading-relaxed">Eng so'nggi yangiliklardan xabardor bo'ling.</p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email manzilingiz"
                className="w-full glass-button text-[#065f46] placeholder:text-[#065f46]/30 px-4 py-3 text-sm outline-none rounded-xl focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(34,197,94,0.15)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary/60"
              >
                Obuna bo'lish
              </motion.button>
            </form>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.3 }}
          className="pt-6 md:pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4"
        >
          <p className="text-foreground/30 text-xs md:text-sm text-center sm:text-left">
            &copy; {currentYear} Buxoro Maktabi. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-4 text-xs md:text-sm text-foreground/30">
            <a href="#" className="hover:text-foreground/60 transition-colors focus-visible:outline-2 focus-visible:outline-primary/60 rounded">Maxfiylik siyosati</a>
            <span className="opacity-50">|</span>
            <a href="#" className="hover:text-foreground/60 transition-colors focus-visible:outline-2 focus-visible:outline-primary/60 rounded">Foydalanish shartlari</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
