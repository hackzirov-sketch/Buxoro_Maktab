import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const moments = [
  { src: "https://images.unsplash.com/photo-1577896851231-70c1883b42e3?w=600&q=80", title: "Kutubxona", desc: "O'quvchilar sevimli mashg'ulotlaridan bahramand bo'lishmoqda" },
  { src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80", title: "Sport maydoni", desc: "Jismoniy tarbiya darsida o'quvchilar" },
  { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80", title: "Dars jarayoni", desc: "Zamonaviy metodikalar bilan o'tilayotgan dars" },
  { src: "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=600&q=80", title: "Bitiruv marosimi", desc: "Maktabimizning eng unutilmas kuni" },
  { src: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=600&q=80", title: "Ijodiy kecha", desc: "O'quvchilar ijodiy qobiliyatlarini namoyish etmoqda" },
  { src: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80", title: "Laboratoriya", desc: "Ilmiy izlanishlar va amaliy tajribalar" },
];

function MomentCard({ item, index }: { item: typeof moments[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.06 }}
      className="group"
    >
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={item.src}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-white font-semibold text-sm md:text-base mb-1">{item.title}</h3>
          <p className="text-white/50 text-xs md:text-sm leading-relaxed line-clamp-1">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function SchoolLife() {
  return (
    <section id="maktab-hayoti" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE }}
            className="text-4xl md:text-5xl font-bold font-poppins text-white mb-4"
          >
            Maktab <span className="text-primary drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">hayotidan parchalar</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
            className="text-base md:text-lg text-white/70 max-w-xl mx-auto font-normal leading-[1.8]"
          >
            Kunlik hayotimizdan eng yorqin lahzalarni jamlagan xotira devori
          </motion.p>
        </div>

        {/* Static Grid — no carousel, no scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {moments.map((item, idx) => (
            <MomentCard key={idx} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
