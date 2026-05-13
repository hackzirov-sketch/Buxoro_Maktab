import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const EASE = [0.16, 1, 0.3, 1] as const;

const moments = [
  { src: "https://images.unsplash.com/photo-1577896851231-70c1883b42e3?w=600&q=80", title: "Kutubxona", desc: "O'quvchilar sevimli mashg'ulotlaridan bahramand bo'lishmoqda" },
  { src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80", title: "Sport maydoni", desc: "Jismoniy tarbiya darsida o'quvchilar" },
  { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80", title: "Dars jarayoni", desc: "Zamonaviy metodikalar bilan o'tilayotgan dars" },
  { src: "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=600&q=80", title: "Bitiruv marosimi", desc: "Maktabimizning eng unutilmas kuni" },
  { src: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=600&q=80", title: "Ijodiy kecha", desc: "O'quvchilar ijodiy qobiliyatlarini namoyish etmoqda" },
  { src: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80", title: "Laboratoriya", desc: "Ilmiy izlanishlar va amaliy tajribalar" },
];

const fallbackColors = [
  "from-emerald-600/30 to-teal-700/30",
  "from-sky-600/30 to-blue-700/30",
  "from-amber-600/30 to-orange-700/30",
  "from-primary/30 to-emerald-700/30",
  "from-pink-600/30 to-rose-700/30",
  "from-purple-600/30 to-violet-700/30",
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
        <div className="aspect-[4/3] overflow-hidden relative bg-gray-900">
          {/* Fallback gradient shown while image loads */}
          <div className={`absolute inset-0 bg-gradient-to-br ${fallbackColors[index % fallbackColors.length]} z-0`} />
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <span className="text-4xl font-bold text-white/10 select-none">{item.title.charAt(0)}</span>
          </div>
          <img
            src={item.src}
            alt={item.title}
            loading="lazy"
            className="relative w-full h-full object-cover transition-all duration-500 group-hover:brightness-110 group-hover:scale-105 z-[1]"
          />
        </div>
        <div className="p-3 md:p-4">
          <h3 className="text-white font-semibold text-xs md:text-base mb-0.5 md:mb-1 truncate">{item.title}</h3>
          <p className="text-white/50 text-[10px] md:text-sm leading-relaxed line-clamp-1">{item.desc}</p>
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

        {/* Carousel — 4 cards per view on lg, responsive down */}
        <Carousel opts={{ align: "start", loop: false }} className="w-full">
          <CarouselContent>
            {moments.map((item, idx) => (
              <CarouselItem key={idx} className="basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <MomentCard item={item} index={idx} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-3 sm:-left-5 h-10 w-10 sm:h-12 sm:w-12 bg-background/90 backdrop-blur-2xl border-2 border-primary/50 shadow-xl shadow-black/40 text-primary hover:bg-primary hover:text-black hover:border-primary hover:scale-110 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 ease-out animate-glow-btn z-10" />
          <CarouselNext className="-right-3 sm:-right-5 h-10 w-10 sm:h-12 sm:w-12 bg-background/90 backdrop-blur-2xl border-2 border-primary/50 shadow-xl shadow-black/40 text-primary hover:bg-primary hover:text-black hover:border-primary hover:scale-110 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 ease-out animate-glow-btn z-10" />
        </Carousel>
      </div>
    </section>
  );
}
