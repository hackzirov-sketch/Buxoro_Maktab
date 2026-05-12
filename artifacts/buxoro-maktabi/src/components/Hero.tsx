import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import logoImg from "@assets/image_1778575455248.png";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-20">


      <div className="container mx-auto px-4 md:px-6 relative z-10 flex-1 flex flex-col justify-center pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-medium text-white/80 uppercase tracking-wider">Qabul 2024-2025 ochiq</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight font-poppins mb-6">
              Farzandingiz uchun <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-200 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]">zamonaviy</span> va sifatli ta'lim markazi
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl font-light leading-relaxed">
              Buxorodagi eng ilg'or va ishonchli ta'lim muhitini yaratayotgan maktab. Kelajak yetakchilarini bugun tarbiyalaymiz.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="px-8 py-4 rounded-full bg-primary text-black font-semibold hover:bg-primary/90 hover:scale-105 hover:shadow-[0_0_30px_rgba(74,222,128,0.6)] transition-all duration-300 flex items-center justify-center gap-2 group"
                data-testid="button-free-consultation"
              >
                Bepul konsultatsiya olish
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                className="px-8 py-4 rounded-full bg-white/5 border border-white/20 text-white font-medium hover:bg-white/10 backdrop-blur-md transition-all duration-300 flex items-center justify-center"
                data-testid="button-register"
              >
                Ro'yxatdan o'tish
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:flex justify-center items-center relative"
          >
            <div className="relative w-80 h-80 flex items-center justify-center">
              <div className="absolute -inset-16 bg-primary/25 blur-[80px] rounded-full animate-pulse-slow"></div>
              <img 
                src={logoImg} 
                alt="Big Logo" 
                className="w-64 h-64 object-cover relative z-10 animate-float drop-shadow-[0_0_30px_rgba(74,222,128,0.5)] rounded-full" 
              />
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}