import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Wind, Presentation, Wifi, Maximize2, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const EASE = [0.4, 0, 0.2, 1] as const;

interface Classroom {
  name: string; type: string; capacity: string; desc: string;
  features: { icon: any; label: string }[];
  image: string; gradient: string; color: string;
}

const classrooms: Classroom[] = [
  { name: "1-A sinf", type: "Boshlang'ich sinf", capacity: "25 o'rin", desc: "Yorug' va shinam sinf xonasi. Eng zamonaviy o'quv qurollari bilan jihozlangan. Kichik yoshdagi o'quvchilar uchun maxsus moslashtirilgan muhit.", features: [{ icon: Presentation, label: "Smart doska" }, { icon: Monitor, label: "Proyektor" }, { icon: Wind, label: "Konditsioner" }], image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80", gradient: "from-emerald-500/20 to-teal-500/10", color: "text-emerald-400" },
  { name: "Matematika xonasi", type: "Maxsus fan xonasi", capacity: "20 o'rin", desc: "Geometrik shakllar va 3D modellar bilan jihozlangan interaktiv matematika darsligi.", features: [{ icon: Presentation, label: "Interaktiv doska" }, { icon: Maximize2, label: "3D modellar" }, { icon: Wifi, label: "Wi-Fi 6" }], image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80", gradient: "from-blue-500/20 to-indigo-500/10", color: "text-blue-400" },
  { name: "Fizika laboratoriyasi", type: "Ilmiy laboratoriya", capacity: "18 o'rin", desc: "Zamonaviy fizik asbob-uskunalar bilan jihozlangan laboratoriya. Tajriba o'tkazish va ilmiy loyihalar uchun ideal muhit.", features: [{ icon: Monitor, label: "Raqamli sensorlar" }, { icon: Presentation, label: "Smart doska" }, { icon: Wind, label: "Shamollatish" }], image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80", gradient: "from-purple-500/20 to-violet-500/10", color: "text-purple-400" },
  { name: "Informatika xonasi", type: "IT sinfi", capacity: "20 o'rin", desc: "Har bir o'quvchi uchun zamonaviy kompyuter bilan jihozlangan IT sinfi.", features: [{ icon: Monitor, label: "20 ta PC" }, { icon: Wifi, label: "Gigabit internet" }, { icon: Presentation, label: "45\" ekran" }], image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400&q=80", gradient: "from-cyan-500/20 to-sky-500/10", color: "text-cyan-400" },
  { name: "Kimyo laboratoriyasi", type: "Ilmiy laboratoriya", capacity: "16 o'rin", desc: "Xavfsizlik standartlariga to'liq javob beradigan zamonaviy kimyo laboratoriyasi.", features: [{ icon: Wind, label: "Shamollatish tizimi" }, { icon: Monitor, label: "Raqamli mikroskop" }, { icon: Maximize2, label: "Laboratoriya jihozlari" }], image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&q=80", gradient: "from-amber-500/20 to-orange-500/10", color: "text-amber-400" },
  { name: "Ingliz tili xonasi", type: "Til o'rganish markazi", capacity: "22 o'rin", desc: "Immersiv til o'rganish muhiti. Audio va video jihozlar bilan to'liq ta'minlangan.", features: [{ icon: Presentation, label: "75\" ekran" }, { icon: Monitor, label: "Audio tizim" }, { icon: Wifi, label: "Online platforma" }], image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80", gradient: "from-pink-500/20 to-rose-500/10", color: "text-pink-400" },
  { name: "San'at studiyasi", type: "Ijodiy ustaxona", capacity: "24 o'rin", desc: "Rasm chizish, haykaltaroshlik va boshqa ijodiy ishlar uchun to'liq jihozlangan studiya.", features: [{ icon: Maximize2, label: "Keng maydon" }, { icon: Wind, label: "Tabiiy yorug'lik" }, { icon: Monitor, label: "Media pleer" }], image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80", gradient: "from-fuchsia-500/20 to-pink-500/10", color: "text-fuchsia-400" },
  { name: "Sport zali", type: "Jismoniy tarbiya", capacity: "60 o'rin", desc: "Keng va yorug' sport zali. Basketbol, voleybol, gimnastika va boshqa sport turlari uchun jihozlangan.", features: [{ icon: Maximize2, label: "500 m² maydon" }, { icon: Wind, label: "Ventilyatsiya" }, { icon: Monitor, label: "Audio tizim" }], image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80", gradient: "from-lime-500/20 to-green-500/10", color: "text-lime-400" },
];

function ClassroomCard({ room, index }: { room: Classroom; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => setExpanded((v) => !v);

  return (
    <div
      className="relative select-none cursor-pointer h-full"
      onClick={handleClick}
      role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); } }}
      aria-expanded={expanded}
    >
      <motion.div
        animate={{ scale: expanded ? 1.04 : 1, y: expanded ? -6 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative rounded-[1.6rem] bg-white/60 backdrop-blur-xl border border-emerald-100/50 shadow-sm overflow-hidden will-change-transform"
      >
        <motion.div
          animate={{ opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          className="absolute -inset-1 rounded-[1.8rem] bg-primary/[0.1] blur-xl -z-10 pointer-events-none"
        />
        <div className="relative overflow-hidden aspect-[4/3]">
          <div className={`absolute inset-0 bg-gradient-to-br ${room.gradient} z-[1]`} />
          <img src={room.image} alt={room.name} loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-[2]" />
          <div className="absolute top-2 left-2 z-[3]">
            <span className="px-2 py-0.5 rounded-full bg-white/70 backdrop-blur-md border border-emerald-200/40 text-[9px] md:text-[10px] font-medium text-foreground/70">{room.type}</span>
          </div>
        </div>
        <div className="p-3 md:p-5 relative z-[2]">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-foreground font-bold text-xs md:text-lg leading-tight truncate">{room.name}</h3>
            <span className={`text-[10px] md:text-[11px] font-semibold shrink-0 ${room.color}`}>{room.capacity}</span>
          </div>
          <p className="text-foreground/50 text-[10px] md:text-sm leading-relaxed line-clamp-1">{room.desc}</p>
          <div className="flex items-center gap-2 mt-2">
            {room.features.map((f, i) => (
              <div key={i} className="flex items-center gap-1 text-foreground/30" title={f.label}>
                <f.icon className="w-3 md:w-3.5 h-3 md:h-3.5" />
                <span className="text-[8px] md:text-[9px] font-medium hidden sm:inline">{f.label}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 mt-1.5">
            <span className="text-foreground/20 text-[9px] font-medium uppercase tracking-wider">Batafsil</span>
            <ChevronRight className="w-2.5 h-2.5 text-foreground/20" />
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="absolute inset-x-0 bottom-0 z-20 pointer-events-none"
          >
            <div className="rounded-xl bg-white/90 backdrop-blur-2xl border border-emerald-100/50 p-3 shadow-lg pointer-events-auto mx-2 mb-2">
              <p className="text-foreground/70 text-[10px] md:text-sm leading-relaxed mb-2">{room.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {room.features.map((f, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50/80 border border-emerald-200/30 text-[9px] md:text-[10px] text-foreground/60">
                    <f.icon className="w-2.5 h-2.5" />{f.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Classrooms() {
  return (
    <section id="sinflar" className="py-24 md:py-28 relative overflow-hidden bg-emerald-50/60 dark:bg-emerald-900/20">
      <div className="absolute right-0 top-1/3 w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/3 w-[400px] h-[400px] bg-emerald-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-14 md:mb-18">
          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE }}
            className="text-4xl md:text-5xl font-bold font-poppins text-foreground mb-5"
          >
            Sinf <span className="text-primary">Xonalarimiz</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
            className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto font-normal leading-[1.8]"
          >
            Har bir sinf xonasi zamonaviy texnologiyalar va qulayliklar bilan jihozlangan
          </motion.p>
        </div>

        <Carousel opts={{ align: "start", loop: false }} autoPlay autoPlayInterval={4000} className="w-full">
          <CarouselContent>
            {classrooms.map((room, idx) => (
              <CarouselItem key={idx} className="basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <ClassroomCard room={room} index={idx} />
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
