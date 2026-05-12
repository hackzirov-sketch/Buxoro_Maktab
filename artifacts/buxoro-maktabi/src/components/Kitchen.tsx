import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import kitchenImg from "@assets/image_1778575515104.png";

const menuData = {
  nonushta: [
    { name: "Sutli Bo'tqa", desc: "Sariq yog' va mevalar bilan" },
    { name: "Tuxum va Sosiska", desc: "Qaynatilgan tuxum, pishloq va sosiska" },
    { name: "Shirinliklar", desc: "Kruassan va issiq choy" }
  ],
  tushlik: [
    { name: "Osh (Palov)", desc: "Haqiqiy Buxoro oshi, go'sht va sabzavotlar bilan" },
    { name: "Sho'rva", desc: "Qaynatma sho'rva, barra go'shtidan" },
    { name: "Meva va Salatlar", desc: "Mavsumiy mevalar va vitaminli salat" }
  ],
  kechki: [
    { name: "Manti", desc: "Bug'da pishirilgan manti" },
    { name: "Dimlama", desc: "Go'sht va sabzavotli dimlama" },
    { name: "Qatiq va Non", desc: "Uy qatig'i va issiq tandir noni" }
  ]
};

export default function Kitchen() {
  const [activeTab, setActiveTab] = useState<keyof typeof menuData>("tushlik");

  const tabs = [
    { id: "nonushta", label: "Nonushta" },
    { id: "tushlik", label: "Tushlik" },
    { id: "kechki", label: "Kechki ovqat" }
  ] as const;

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
            Bizning <span className="text-primary drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">Oshxonamiz</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Sog'lom va mazali taomlar — o'quvchilarimizning energiyasi va diqqat-e'tibori garovi. Kuniga 3 mahal issiq ovqat.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden border border-white/10 group"
          >
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-500 mix-blend-overlay z-10"></div>
            <img src={kitchenImg} alt="Oshxona" className="w-full h-full object-cover aspect-square md:aspect-[4/3] transform group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-20"></div>
            
            <div className="absolute bottom-8 left-8 right-8 z-30">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                <span className="text-white font-medium">Toza va halol mahsulotlar</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex p-1 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 mb-8 w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === tab.id ? "text-black" : "text-white/70 hover:text-white"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4"
                >
                  {menuData[activeTab].map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-primary/30 transition-all duration-300"
                    >
                      <h4 className="text-xl font-semibold text-white mb-2">{item.name}</h4>
                      <p className="text-white/60">{item.desc}</p>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}