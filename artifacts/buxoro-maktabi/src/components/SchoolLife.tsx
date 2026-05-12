import { motion } from "framer-motion";
import schoolGate from "@assets/image_1778575510337.png";

export default function SchoolLife() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold font-poppins text-white mb-6"
          >
            Maktab <span className="text-primary drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">hayoti</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Zamonaviy infratuzilma, qulay sinfxonalar va xavfsiz muhit. O'quvchilarimiz uchun eng yaxshi sharoitlarni yaratganmiz.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2.5rem] overflow-hidden group border border-white/10"
        >
          <div className="aspect-[21/9] md:aspect-[21/8] w-full">
            <img 
              src={schoolGate} 
              alt="Buxoro Maktabi Darvozasi" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-3xl bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <h3 className="text-2xl font-bold text-white mb-3">Xavfsiz va shinam hudud</h3>
              <p className="text-white/80">
                Maktabimiz eng zamonaviy xavfsizlik tizimlari bilan jihozlangan. Keng va yashil maydon o'quvchilarning darsdan bo'sh vaqtlarini mazmunli o'tkazishlari uchun xizmat qiladi.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}