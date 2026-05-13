import { PageWrapper, PageHeader } from "./Layout";
import SectionNav from "@/components/SectionNav";
import { motion } from "framer-motion";
import { Monitor, Wind, Presentation, Wifi, Maximize2 } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const rooms = [
  { name: "1-A sinf", type: "Boshlang'ich", cap: "25 o'rin", desc: "Yorug' va shinam sinf xonasi. Eng zamonaviy o'quv qurollari bilan jihozlangan.", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80", features: ["Smart doska", "Proyektor", "Konditsioner"], gradient: "from-emerald-500/20 to-teal-500/10" },
  { name: "Matematika xonasi", type: "Maxsus fan", cap: "20 o'rin", desc: "Geometrik shakllar va 3D modellar bilan jihozlangan interaktiv matematika darsligi.", img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80", features: ["Interaktiv doska", "3D modellar", "Wi-Fi 6"], gradient: "from-blue-500/20 to-indigo-500/10" },
  { name: "Fizika lab.", type: "Ilmiy lab", cap: "18 o'rin", desc: "Zamonaviy fizik asbob-uskunalar bilan jihozlangan laboratoriya.", img: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80", features: ["Raqamli sensorlar", "Smart doska", "Shamollatish"], gradient: "from-purple-500/20 to-violet-500/10" },
  { name: "Informatika xonasi", type: "IT sinfi", cap: "20 o'rin", desc: "Har bir o'quvchi uchun zamonaviy kompyuter bilan jihozlangan IT sinfi.", img: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400&q=80", features: ["20 ta PC", "Gigabit internet", '45" ekran'], gradient: "from-cyan-500/20 to-sky-500/10" },
  { name: "Ingliz tili xonasi", type: "Til markazi", cap: "22 o'rin", desc: "Immersiv til o'rganish muhiti. Audio va video jihozlar bilan to'liq ta'minlangan.", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80", features: ['75" ekran', "Audio tizim", "Online platforma"], gradient: "from-pink-500/20 to-rose-500/10" },
  { name: "Sport zali", type: "Jismoniy tarbiya", cap: "60 o'rin", desc: "Keng va yorug' sport zali. Basketbol, voleybol, gimnastika va boshqa sport turlari uchun jihozlangan.", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80", features: ["500 m²", "Ventilyatsiya", "Audio tizim"], gradient: "from-lime-500/20 to-green-500/10" },
];

function RoomCard({ r }: { r: typeof rooms[0] }) {
  return (
    <div className="h-full select-none">
      <motion.div className="relative rounded-[1.6rem] bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm md:backdrop-blur-xl overflow-hidden">
        <div className="relative overflow-hidden aspect-[4/3]">
          <div className={`absolute inset-0 bg-gradient-to-br ${r.gradient} z-[1]`} />
          <img src={r.img} alt={r.name} loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-[2]" />
          <div className="absolute top-2 left-2 z-[3]">
            <span className="px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[9px] md:text-[10px] font-medium text-white/80">{r.type}</span>
          </div>
        </div>
        <div className="p-3 md:p-5 relative z-[2]">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-white font-bold text-xs md:text-lg leading-tight truncate">{r.name}</h3>
            <span className="text-[10px] md:text-[11px] font-semibold text-white/60 shrink-0">{r.cap}</span>
          </div>
          <p className="text-white/50 text-[10px] md:text-sm leading-relaxed line-clamp-1">{r.desc}</p>
          <div className="flex items-center gap-2 mt-2">
            {r.features.map((f, i) => (
              <span key={i} className="text-white/35 text-[8px] md:text-[10px] font-medium">{f}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ClassroomsPage() {
  return (
    <PageWrapper>
      <section className="py-16 md:py-24">
        <PageHeader title={<>Sinf <span className="text-primary">Xonalarimiz</span></>} subtitle="Har bir sinf xonasi zamonaviy texnologiyalar va qulayliklar bilan jihozlangan" />
        <div className="container mx-auto px-4 md:px-6">
          <Carousel opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent>
              {rooms.map((r) => (
                <CarouselItem key={r.name} className="basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <RoomCard r={r} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-3 sm:-left-5 h-10 w-10 sm:h-12 sm:w-12 bg-background/90 backdrop-blur-2xl border-2 border-primary/50 shadow-xl shadow-black/40 text-primary hover:bg-primary hover:text-black hover:border-primary hover:scale-110 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 ease-out animate-glow-btn z-10" />
            <CarouselNext className="-right-3 sm:-right-5 h-10 w-10 sm:h-12 sm:w-12 bg-background/90 backdrop-blur-2xl border-2 border-primary/50 shadow-xl shadow-black/40 text-primary hover:bg-primary hover:text-black hover:border-primary hover:scale-110 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 ease-out animate-glow-btn z-10" />
          </Carousel>
        </div>
      </section>
      <SectionNav />
    </PageWrapper>
  );
}
