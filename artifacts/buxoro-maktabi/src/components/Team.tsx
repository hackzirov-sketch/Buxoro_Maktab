import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaTelegram, FaInstagram } from "react-icons/fa";
import { ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const EASE = [0.4, 0, 0.2, 1] as const;

interface TeamMember {
  name: string; role: string; shortDesc: string; fullDesc: string;
  highlight?: string; telegram?: string; instagram?: string;
}

const colorPalette = [
  "from-primary to-emerald-400", "from-amber-400 to-orange-400", "from-pink-400 to-rose-400",
  "from-sky-400 to-blue-400", "from-purple-400 to-violet-400", "from-teal-400 to-cyan-400",
  "from-primary to-emerald-400", "from-amber-400 to-orange-400", "from-pink-400 to-rose-400",
];

const topRowMembers: TeamMember[] = [
  { name: "Bekzod Rahimov", role: "Maktab direktori", shortDesc: "25 yillik tajriba", fullDesc: "25 yillik pedagogik va rahbarlik tajribasi. O'z faoliyati davomida yuzlab o'quvchilarning yuqori natijalarga erishishiga rahbarlik qilgan.", highlight: "🏆 2024 — Eng yaxshi direktor mukofoti" },
  { name: "Zulfiya Karimova", role: "O'quv ishlari bo'yicha direktor", shortDesc: "15 yillik tajriba", fullDesc: "O'quv dasturlarini ishlab chiqish va monitoring qilish bo'yicha keng tajribaga ega. Xalqaro ta'lim dasturlari sertifikati (IB, Cambridge) egasi.", highlight: "📊 15+ xalqaro seminarlar" },
  { name: "Rustam Xoldorov", role: "IT bo'limi rahbari", shortDesc: "10 yillik IT tajribasi", fullDesc: "Zamonaviy ta'lim texnologiyalarini joriy etish va raqamli infrastukturani boshqarish bo'yicha mutaxassis.", highlight: "💻 500+ o'quvchi raqamli savodxonligi" },
  { name: "Alisher Rustamov", role: "Matematika o'qituvchisi", shortDesc: "12 yillik tajriba", fullDesc: "Matematika olimpiadalarining g'oliblarini tayyorlagan tajribali pedagog. Darslarida interfaol metodlar va amaliy masalalarga asoslanadi.", highlight: "🥇 3 nafar respublika olimpiadasi g'olibi" },
  { name: "Dilnoza Murodova", role: "Ingliz tili o'qituvchisi", shortDesc: "8 yillik tajriba", fullDesc: "IELTS 8.0 va CELTA sertifikatlariga ega. Ingliz tilini immersiv metodika asosida o'rgatadi.", highlight: "🌍 IELTS 8.0 | CELTA sertifikati" },
  { name: "Sanjar Qodirov", role: "Fizika o'qituvchisi", shortDesc: "15 yillik tajriba", fullDesc: "Ilmiy loyihalar va amaliy tajribalar asosida fizika fanini o'rgatadi. O'quvchilari bilan birgalikda 10 dan ortiq ilmiy loyihalarni amalga oshirgan.", highlight: "🔬 10+ ilmiy loyiha rahbari" },
  { name: "Malika Ismoilova", role: "Kimyo o'qituvchisi", shortDesc: "10 yillik tajriba", fullDesc: "Zamonaviy laboratoriya jihozlari bilan ishlash bo'yicha mutaxassis. Organik va noorganik kimyo fanlarini amaliy tajribalar asosida o'rgatadi.", highlight: "🧪 50+ laboratoriya ishlanmasi" },
  { name: "Javohir Olimov", role: "Informatika o'qituvchisi", shortDesc: "7 yillik tajriba", fullDesc: "Dasturlash, robototexnika va sun'iy intellekt asoslari bo'yicha dars beradi.", highlight: "🤖 3 marta RoboContest finalchisi" },
  { name: "Nigora Aliyeva", role: "Ona tili o'qituvchisi", shortDesc: "20 yillik tajriba", fullDesc: "Filologiya fanlari nomzodi. O'zbek tili va adabiyoti fanlarini innovatsion metodikalar asosida o'rgatadi.", highlight: "📖 5 ta o'quv qo'llanma muallifi" },
];

const bottomRowMembers: TeamMember[] = [
  { name: "Gulnora Xasanova", role: "Oshpaz", shortDesc: "18 yillik tajriba", fullDesc: "Bolalar ovqatlanishi bo'yicha mutaxassis. Sog'lom va mazali taomlar tayyorlashda 18 yillik tajribaga ega.", highlight: "👨‍🍳 500+ o'quvchi uchun kunlik ovqat" },
  { name: "Maftuna Sodiqova", role: "Oshpaz yordamchisi", shortDesc: "5 yillik tajriba", fullDesc: "Sog'lom ovqatlanish bo'yicha maxsus kurslarni tamomlagan. Bolalar uchun mazali va foydali taomlar tayyorlashda oshpazga yordam beradi.", highlight: "🥗 30+ sog'lom retsept muallifi" },
  { name: "Dilshod Ergashev", role: "Oshxona mudiri", shortDesc: "8 yillik tajriba", fullDesc: "Mahsulot sifati va sanitariya nazorati bo'yicha mas'ul. Oshxonaning tozaligi, mahsulotlarning sifatli va yangi bo'lishini ta'minlaydi.", highlight: "✅ HACCP sertifikati" },
];

function TeamCard({ member, index, expanded, onToggle }: {
  member: TeamMember; index: number;
  expanded: boolean; onToggle: () => void;
}) {
  const gradient = colorPalette[index % colorPalette.length];

  return (
    <div
      className="relative select-none cursor-pointer h-full"
      onClick={onToggle}
      role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } }}
      aria-expanded={expanded}
    >
      <motion.div
        animate={{ scale: expanded ? 1.03 : 1, y: expanded ? -4 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative rounded-2xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm md:backdrop-blur-xl overflow-hidden will-change-transform"
      >
        <motion.div
          animate={{ opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          className="absolute -inset-1 rounded-[1.4rem] bg-primary/[0.12] blur-lg md:blur-xl -z-10 pointer-events-none"
        />
        <div className="relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.12]`} />
          <div className="aspect-[4/5] bg-gradient-to-br from-gray-800 to-black flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent" />
            <motion.span animate={{ scale: expanded ? 1.15 : 1 }} transition={{ duration: 0.4, ease: EASE }}
              className="text-5xl md:text-6xl font-bold text-white/15 select-none"
            >
              {member.name.charAt(0)}
            </motion.span>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background/95 to-transparent" />
          </div>
        </div>
        <div className="p-3 md:p-5 relative z-[2] bg-gradient-to-t from-background/60 to-transparent">
          <h3 className="text-white font-bold text-xs md:text-base leading-tight mb-0.5 truncate">{member.name}</h3>
          <span className={`inline-block text-[9px] md:text-[10px] font-semibold uppercase tracking-wider mb-1 md:mb-2 bg-clip-text text-transparent bg-gradient-to-r ${gradient}`}>
            {member.role}
          </span>
          <p className="text-white/50 text-[10px] md:text-xs leading-relaxed line-clamp-1">{member.shortDesc}</p>
          <div className="flex items-center gap-1 mt-1.5">
            <span className="text-white/20 text-[9px] font-medium uppercase tracking-wider">Batafsil</span>
            <ChevronRight className="w-2.5 h-2.5 text-white/20" />
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
            <div className="rounded-xl bg-background/95 backdrop-blur-2xl border border-white/[0.1] p-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] pointer-events-auto mx-2 mb-2">
              <p className="text-white/70 text-[10px] md:text-xs leading-relaxed mb-2">{member.fullDesc}</p>
              {member.highlight && <p className="text-[10px] md:text-xs text-primary/90 font-medium mb-2">{member.highlight}</p>}
              <div className="flex items-center gap-2 pt-1.5 border-t border-white/[0.06]">
                {member.telegram && (
                  <a href={member.telegram} target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center text-white/40 hover:bg-sky-500/20 hover:text-sky-400 transition-all duration-200" aria-label={`${member.name} Telegram`}>
                    <FaTelegram className="w-2.5 h-2.5" />
                  </a>
                )}
                {member.instagram && (
                  <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center text-white/40 hover:bg-pink-500/20 hover:text-pink-400 transition-all duration-200" aria-label={`${member.name} Instagram`}>
                    <FaInstagram className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Team() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [expandedTop, setExpandedTop] = useState<number | null>(null);
  const [expandedBottom, setExpandedBottom] = useState<number | null>(null);

  return (
    <section id="jamoa" ref={sectionRef} className="py-24 md:py-28 relative overflow-hidden">
      <div className="absolute left-0 top-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px] pointer-events-none -translate-x-1/2" />
      <div className="absolute right-0 bottom-1/3 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[150px] pointer-events-none translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.75, ease: EASE }}
          className="text-center mb-14 md:mb-18"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-5">
            Bizning <span className="text-primary drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">Jamoa</span>
          </h2>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto font-normal leading-[1.8]">
            Tajribali mutaxassislar jamoasi farzandingiz ta'limi va tarbiyasi uchun mas'uldir.
          </p>
        </motion.div>

        <div className="space-y-10 md:space-y-14">
          {/* Pedagogic team */}
          <Carousel opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent>
              {topRowMembers.map((member, idx) => (
                <CarouselItem key={idx} className="basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <TeamCard
                    member={member}
                    index={idx}
                    expanded={expandedTop === idx}
                    onToggle={() => setExpandedTop(expandedTop === idx ? null : idx)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-2 sm:-left-4 h-9 w-9 bg-background/90 backdrop-blur-2xl border-2 border-primary/50 shadow-xl shadow-black/40 text-primary hover:bg-primary hover:text-black hover:border-primary hover:scale-110 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 ease-out animate-glow-btn z-10" />
            <CarouselNext className="-right-2 sm:-right-4 h-9 w-9 bg-background/90 backdrop-blur-2xl border-2 border-primary/50 shadow-xl shadow-black/40 text-primary hover:bg-primary hover:text-black hover:border-primary hover:scale-110 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 ease-out animate-glow-btn z-10" />
          </Carousel>

          {/* Support team */}
          <Carousel opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent>
              {bottomRowMembers.map((member, idx) => (
                <CarouselItem key={idx} className="basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <TeamCard
                    member={member}
                    index={idx}
                    expanded={expandedBottom === idx}
                    onToggle={() => setExpandedBottom(expandedBottom === idx ? null : idx)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-2 sm:-left-4 h-9 w-9 bg-background/90 backdrop-blur-2xl border-2 border-primary/50 shadow-xl shadow-black/40 text-primary hover:bg-primary hover:text-black hover:border-primary hover:scale-110 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 ease-out animate-glow-btn z-10" />
            <CarouselNext className="-right-2 sm:-right-4 h-9 w-9 bg-background/90 backdrop-blur-2xl border-2 border-primary/50 shadow-xl shadow-black/40 text-primary hover:bg-primary hover:text-black hover:border-primary hover:scale-110 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 ease-out animate-glow-btn z-10" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
