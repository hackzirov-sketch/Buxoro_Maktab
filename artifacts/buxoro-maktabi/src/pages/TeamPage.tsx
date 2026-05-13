import { PageWrapper, PageHeader } from "./Layout";
import { FaTelegram, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const EASE = [0.4, 0, 0.2, 1] as const;

const members = [
  { name: "Bekzod Rahimov", role: "Maktab direktori", short: "25 yillik tajriba", full: "25 yillik pedagogik va rahbarlik tajribasi. Ta'lim sohasida innovatsion yondashuv va xalqaro standartlarni joriy etish bo'yicha yetakchi mutaxassis.", grad: "from-sky-400 to-blue-400" },
  { name: "Zulfiya Karimova", role: "O'quv ishlari bo'yicha direktor", short: "15 yillik tajriba", full: "Xalqaro ta'lim dasturlari sertifikati (IB, Cambridge) egasi. Maktabning akademik ko'rsatkichlarini 40% ga oshirgan.", grad: "from-primary to-emerald-400" },
  { name: "Rustam Xoldorov", role: "IT bo'limi rahbari", short: "10 yillik IT tajribasi", full: "Zamonaviy ta'lim texnologiyalarini joriy etish va raqamli infrastukturani boshqarish bo'yicha mutaxassis.", grad: "from-amber-400 to-orange-400" },
  { name: "Alisher Rustamov", role: "Matematika o'qituvchisi", short: "12 yillik tajriba", full: "Matematika olimpiadalarining g'oliblarini tayyorlagan tajribali pedagog. Darslarida interfaol metodlar va amaliy masalalarga asoslanadi.", grad: "from-pink-400 to-rose-400" },
  { name: "Dilnoza Murodova", role: "Ingliz tili o'qituvchisi", short: "8 yillik tajriba", full: "IELTS 8.0 va CELTA sertifikatlariga ega. Ingliz tilini immersiv metodika asosida o'rgatadi.", grad: "from-primary to-emerald-400" },
  { name: "Sanjar Qodirov", role: "Fizika o'qituvchisi", short: "15 yillik tajriba", full: "Ilmiy loyihalar va amaliy tajribalar asosida fizika fanini o'rgatadi. O'quvchilari bilan birgalikda 10 dan ortiq ilmiy loyihalarni amalga oshirgan.", grad: "from-teal-400 to-cyan-400" },
  { name: "Nigora Aliyeva", role: "Ona tili o'qituvchisi", short: "20 yillik tajriba", full: "Filologiya fanlari nomzodi. O'zbek tili va adabiyoti fanlarini innovatsion metodikalar asosida o'rgatadi.", grad: "from-purple-400 to-violet-400" },
];

function Card({ m, idx }: { m: typeof members[0]; idx: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="select-none cursor-pointer h-full" onClick={() => setExpanded((v) => !v)}>
      <motion.div
        animate={{ scale: expanded ? 1.03 : 1, y: expanded ? -4 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative rounded-2xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm md:backdrop-blur-xl overflow-hidden"
      >
        <motion.div animate={{ opacity: expanded ? 1 : 0 }} transition={{ duration: 0.35 }}
          className="absolute -inset-1 rounded-[1.4rem] bg-primary/[0.12] blur-lg md:blur-xl -z-10 pointer-events-none" />
        <div className="relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${m.grad} opacity-[0.12]`} />
          <div className="aspect-[4/5] bg-gradient-to-br from-gray-800 to-black flex items-center justify-center relative">
            <span className="text-5xl md:text-6xl font-bold text-white/15 select-none">{m.name.charAt(0)}</span>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background/95 to-transparent" />
          </div>
        </div>
        <div className="p-3 md:p-5 relative z-[2] bg-gradient-to-t from-background/60 to-transparent">
          <h3 className="text-white font-bold text-xs md:text-base leading-tight mb-0.5 truncate">{m.name}</h3>
          <span className={`inline-block text-[9px] md:text-[10px] font-semibold uppercase tracking-wider mb-1 md:mb-2 bg-clip-text text-transparent bg-gradient-to-r ${m.grad}`}>{m.role}</span>
          <p className="text-white/50 text-[10px] md:text-xs leading-relaxed">{m.short}</p>
          {expanded && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: EASE }}>
              <p className="text-white/70 text-[10px] md:text-xs leading-relaxed mt-2 pt-2 border-t border-white/[0.06]">{m.full}</p>
              <div className="flex items-center gap-2 mt-2">
                <a href="#" className="w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center text-white/40 hover:bg-sky-500/20 hover:text-sky-400 transition-all duration-200"><FaTelegram className="w-2.5 h-2.5" /></a>
                <a href="#" className="w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center text-white/40 hover:bg-pink-500/20 hover:text-pink-400 transition-all duration-200"><FaInstagram className="w-2.5 h-2.5" /></a>
              </div>
            </motion.div>
          )}
          {!expanded && <div className="flex items-center gap-1 mt-1.5"><span className="text-white/20 text-[9px] font-medium uppercase tracking-wider">Batafsil</span><ChevronRight className="w-2.5 h-2.5 text-white/20" /></div>}
        </div>
      </motion.div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <PageWrapper>
      <section className="py-16 md:py-24">
        <PageHeader title={<>Bizning <span className="text-primary">Jamoa</span></>} subtitle="Tajribali mutaxassislar jamoasi farzandingiz ta'limi va tarbiyasi uchun mas'uldir." />
        <div className="container mx-auto px-4 md:px-6">
          <Carousel opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent>
              {members.map((m, idx) => (
                <CarouselItem key={m.name} className="basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <Card m={m} idx={idx} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-3 sm:-left-5 h-10 w-10 sm:h-12 sm:w-12 bg-background/90 backdrop-blur-2xl border-2 border-primary/50 shadow-xl shadow-black/40 text-primary hover:bg-primary hover:text-black hover:border-primary hover:scale-110 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 ease-out animate-glow-btn z-10" />
            <CarouselNext className="-right-3 sm:-right-5 h-10 w-10 sm:h-12 sm:w-12 bg-background/90 backdrop-blur-2xl border-2 border-primary/50 shadow-xl shadow-black/40 text-primary hover:bg-primary hover:text-black hover:border-primary hover:scale-110 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 ease-out animate-glow-btn z-10" />
          </Carousel>
        </div>
      </section>
    </PageWrapper>
  );
}
