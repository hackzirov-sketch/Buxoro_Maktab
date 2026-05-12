import logoImg from "@assets/image_1778575455248.png";
import { Phone, MapPin, Mail } from "lucide-react";
import { FaTelegram, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/40 border-t border-white/5 pt-20 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          <div className="space-y-6">
            <a href="#" className="flex items-center gap-3">
              <img src={logoImg} alt="Buxoro Maktabi Logo" className="w-12 h-12 object-cover rounded-full" />
              <span className="font-poppins font-bold text-xl text-white">
                Buxoro Maktabi
              </span>
            </a>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Zamonaviy texnologiyalar va ilg'or metodikalar asosida ta'lim beruvchi Buxorodagi yetakchi xususiy maktab.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/buxoro_maktabi_bekobod/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-instagram"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-pink-500 hover:text-white transition-colors duration-300"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/BM_Bekobod"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-telegram"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-sky-500 hover:text-white transition-colors duration-300"
              >
                <FaTelegram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Tezkor havolalar</h4>
            <ul className="space-y-3">
              {["Bosh sahifa", "Biz haqimizda", "Ta'lim dasturlari", "To'garaklar", "Oshxona menyusi", "Bo'sh ish o'rinlari"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Bog'lanish</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Buxoro viloyati, Bekobod shahri</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+998948356666" className="hover:text-primary transition-colors">+998 94 835 66 66</a>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:buxoromaktabi777@gmail.com" className="hover:text-primary transition-colors">buxoromaktabi777@gmail.com</a>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <FaTelegram className="w-5 h-5 text-sky-400 shrink-0" />
                <a href="https://t.me/BM_Bekobod" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">@BM_Bekobod</a>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <FaInstagram className="w-5 h-5 text-pink-400 shrink-0" />
                <a href="https://www.instagram.com/buxoro_maktabi_bekobod/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">@buxoro_maktabi_bekobod</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Xabarnomaga obuna bo'lish</h4>
            <p className="text-white/60 text-sm mb-4">Eng so'nggi yangiliklardan xabardor bo'ling.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email manzilingiz"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button
                type="button"
                className="bg-primary text-black px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Obuna
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {currentYear} Buxoro Maktabi. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-4 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Maxfiylik siyosati</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Foydalanish shartlari</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
