import logoImg from "@assets/image_1778575455248.png";
import { Phone, MapPin, Mail, Instagram, Facebook, Send } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/40 border-t border-white/5 pt-20 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <a href="#" className="flex items-center gap-3">
              <img src={logoImg} alt="Buxoro Maktabi Logo" className="w-12 h-12 object-contain" />
              <span className="font-poppins font-bold text-xl text-white">
                Buxoro Maktabi
              </span>
            </a>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Zamonaviy texnologiyalar va ilg'or metodikalar asosida ta'lim beruvchi Buxorodagi yetakchi xususiy maktab.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors duration-300">
                <Send className="w-5 h-5" /> {/* Telegram icon placeholder */}
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors duration-300">
                <Facebook className="w-5 h-5" />
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
                <span>Buxoro viloyati, Buxoro shahri, Mustaqillik ko'chasi, 1-uy</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+998901234545" className="hover:text-primary transition-colors">+998 90 123 45 45</a>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info@buxoromaktabi.uz" className="hover:text-primary transition-colors">info@buxoromaktabi.uz</a>
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