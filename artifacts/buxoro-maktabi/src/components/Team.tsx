import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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

const topRowMembers: (TeamMember & { image?: string })[] = [
  { name: "Mamadaliyev Abdulaziz", role: "Jismoniy tarbiya o'qituvchisi", shortDesc: "10 yillik tajriba", fullDesc: "Sport ustasi. Basketbol, voleybol va yengil atletika bo'yicha murabbiy.", highlight: "🏅 Respublika musobaqalari g'olibi", image: "/GYM.jpg" },
  { name: "Zulfiya Karimova", role: "O'quv ishlari bo'yicha direktor", shortDesc: "15 yillik tajriba", fullDesc: "Xalqaro ta'lim dasturlari sertifikati (IB, Cambridge) egasi.", highlight: "📊 15+ xalqaro seminarlar", image: "/History.jpg" },
  { name: "Rustam Xoldorov", role: "IT bo'limi rahbari", shortDesc: "10 yillik IT tajribasi", fullDesc: "Zamonaviy ta'lim texnologiyalarini joriy etish bo'yicha mutaxassis.", highlight: "💻 500+ o'quvchi raqamli savodxonligi", image: "/English 2.jpg" },
  { name: "Alisher Rustamov", role: "Matematika o'qituvchisi", shortDesc: "12 yillik tajriba", fullDesc: "Matematika olimpiadalarining g'oliblarini tayyorlagan tajribali pedagog.", highlight: "🥇 3 nafar respublika olimpiadasi g'olibi", image: "/Boshlangich1.jpg" },
  { name: "Dilnoza Murodova", role: "Ingliz tili o'qituvchisi", shortDesc: "8 yillik tajriba", fullDesc: "IELTS 8.0 va CELTA sertifikatlariga ega.", highlight: "🌍 IELTS 8.0 | CELTA sertifikati", image: "/English.jpg" },
  { name: "Sanjar Qodirov", role: "Fizika o'qituvchisi", shortDesc: "15 yillik tajriba", fullDesc: "Ilmiy loyihalar va amaliy tajribalar asosida fizika fanini o'rgatadi.", highlight: "🔬 10+ ilmiy loyiha rahbari", image: "/Boshlangich.jpg" },
  { name: "Malika Ismoilova", role: "Kimyo o'qituvchisi", shortDesc: "10 yillik tajriba", fullDesc: "Zamonaviy laboratoriya jihozlari bilan ishlash bo'yicha mutaxassis.", highlight: "🧪 50+ laboratoriya ishlanmasi", image: "/Biology.jpg" },
  { name: "Javohir Olimov", role: "Informatika o'qituvchisi", shortDesc: "7 yillik tajriba", fullDesc: "Dasturlash, robototexnika va sun'iy intellekt asoslari bo'yicha dars beradi.", highlight: "🤖 3 marta RoboContest finalchisi", image: "/LawXuquq.jpg" },
  { name: "Nigora Aliyeva", role: "Ona tili o'qituvchisi", shortDesc: "20 yillik tajriba", fullDesc: "Filologiya fanlari nomzodi.", highlight: "📖 5 ta o'quv qo'llanma muallifi", image: "/Rus Tili.jpg" },
  { name: "Bekzod Rahimov", role: "Maktab direktori", shortDesc: "25 yillik tajriba", fullDesc: "25 yillik pedagogik va rahbarlik tajribasi.", highlight: "🏆 2024 — Eng yaxshi direktor mukofoti", image: "/Boshlangich3.jpg" },
];

const bottomRowMembers: TeamMember[] = [
  { name: "Gulnora Xasanova", role: "Oshpaz", shortDesc: "18 yillik tajriba", fullDesc: "Bolalar ovqatlanishi bo'yicha mutaxassis. Sog'lom va mazali taomlar tayyorlashda 18 yillik tajribaga ega.", highlight: "👨‍🍳 500+ o'quvchi uchun kunlik ovqat" },
  { name: "Maftuna Sodiqova", role: "Oshpaz yordamchisi", shortDesc: "5 yillik tajriba", fullDesc: "Sog'lom ovqatlanish bo'yicha maxsus kurslarni tamomlagan. Bolalar uchun mazali va foydali taomlar tayyorlashda oshpazga yordam beradi.", highlight: "🥗 30+ sog'lom retsept muallifi" },
  { name: "Dilshod Ergashev", role: "Oshxona mudiri", shortDesc: "8 yillik tajriba", fullDesc: "Mahsulot sifati va sanitariya nazorati bo'yicha mas'ul. Oshxonaning tozaligi, mahsulotlarning sifatli va yangi bo'lishini ta'minlaydi.", highlight: "✅ HACCP sertifikati" },
];

function TeamCard({ member, index, expanded, onToggle }: {
  member: TeamMember & { image?: string }; index: number;
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
        whileHover={{ scale: 1.02, y: -3 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative rounded-2xl bg-emerald-200/30 dark:bg-emerald-900/40 backdrop-blur-sm md:backdrop-blur-xl border border-emerald-300/40 dark:border-emerald-800/50 shadow-sm hover:shadow-lg overflow-hidden will-change-transform"
      >
        <motion.div
          animate={{ opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          className="absolute -inset-1 rounded-[1.4rem] bg-primary/[0.12] blur-lg md:blur-xl -z-10 pointer-events-none"
        />
        <div className="relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.15] z-[1]`} />
          <div className="aspect-[4/5] relative overflow-hidden">
            {member.image ? (
              <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                <span className="text-5xl md:text-6xl font-bold text-white/15 select-none">{member.name.charAt(0)}</span>
              </div>
            )}
          </div>
        </div>
        <div className="p-3 md:p-5 relative z-[2] bg-emerald-200/50 dark:bg-emerald-900/60">
          <h3 className="text-foreground font-bold text-xs md:text-base leading-tight mb-0.5 truncate">{member.name}</h3>
          <span className={`inline-block text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-1 md:mb-2 bg-clip-text text-transparent bg-gradient-to-r ${gradient}`}>
            {member.role}
          </span>
          <div className="flex items-center gap-1 mt-2">
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
              <p className="text-foreground/70 text-[10px] md:text-xs leading-relaxed mb-2">{member.fullDesc}</p>
              {member.highlight && <p className="text-[10px] md:text-xs text-primary font-medium">{member.highlight}</p>}
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
    <section id="jamoa" ref={sectionRef} className="py-24 md:py-28 relative overflow-hidden bg-emerald-50/60 dark:bg-emerald-900/20">
      <div className="absolute left-0 top-1/3 w-[600px] h-[600px] bg-emerald-200/30 rounded-full blur-[200px] pointer-events-none -translate-x-1/2" />
      <div className="absolute right-0 bottom-1/3 w-[500px] h-[500px] bg-emerald-100/20 rounded-full blur-[150px] pointer-events-none translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.75, ease: EASE }}
          className="text-center mb-14 md:mb-18"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-foreground mb-5">
            Bizning <span className="text-primary">Jamoa</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto font-normal leading-[1.8]">
            Tajribali mutaxassislar jamoasi farzandingiz ta'limi va tarbiyasi uchun mas'uldir.
          </p>
        </motion.div>

        <div className="mb-8 md:mb-12 -mx-4 sm:-mx-6 md:-mx-8 md:mx-0 overflow-hidden md:rounded-2xl flex justify-center bg-emerald-50/30 dark:bg-emerald-900/10 py-4 md:py-6 px-4">
          <img
            src="/All.jpg"
            alt="Jamoa"
            className="w-full max-w-md h-auto rounded-xl border border-transparent animate-neon-border"
          />
        </div>

        <div className="space-y-10 md:space-y-14">
          {/* Pedagogic team */}
          <Carousel opts={{ align: "start", loop: true }} autoPlay autoPlayInterval={3000} className="w-full">
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
            <CarouselPrevious className="-left-2 sm:-left-4 h-9 w-9 bg-white/80 backdrop-blur-2xl border border-primary/40 shadow-lg text-primary hover:bg-primary hover:text-white hover:border-primary hover:scale-110 hover:shadow-xl transition-all duration-300 z-10" />
            <CarouselNext className="-right-2 sm:-right-4 h-9 w-9 bg-white/80 backdrop-blur-2xl border border-primary/40 shadow-lg text-primary hover:bg-primary hover:text-white hover:border-primary hover:scale-110 hover:shadow-xl transition-all duration-300 z-10" />
          </Carousel>

          {/* Support team */}
          <Carousel opts={{ align: "start", loop: true }} autoPlay autoPlayInterval={3000} className="w-full">
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
            <CarouselPrevious className="-left-2 sm:-left-4 h-9 w-9 bg-white/80 backdrop-blur-2xl border border-primary/40 shadow-lg text-primary hover:bg-primary hover:text-white hover:border-primary hover:scale-110 hover:shadow-xl transition-all duration-300 z-10" />
            <CarouselNext className="-right-2 sm:-right-4 h-9 w-9 bg-white/80 backdrop-blur-2xl border border-primary/40 shadow-lg text-primary hover:bg-primary hover:text-white hover:border-primary hover:scale-110 hover:shadow-xl transition-all duration-300 z-10" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
