import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Monitor, Wind, Presentation, Wifi, Maximize2, ChevronRight } from "lucide-react";

const EASE = [0.4, 0, 0.2, 1] as const;
const PX_PER_MS = 0.05;

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

const CARD_WIDTH = 380;
const GAP = 16;
const SET_WIDTH = classrooms.length * (CARD_WIDTH + GAP);

function ClassroomCard({ room, index, onHover, onLeave, onTap }: {
  room: Classroom; index: number;
  onHover: () => void; onLeave: () => void; onTap: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const handleMouseEnter = () => { onHover(); setExpanded(true); };
  const handleMouseLeave = () => { onLeave(); setExpanded(false); };
  const handleClick = () => { onTap(); setExpanded((v) => !v); };

  return (
    <div
      className="relative shrink-0 w-[75vw] sm:w-[55vw] md:w-[380px] select-none cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); } }}
      aria-expanded={expanded}
    >
      <motion.div
        animate={{ scale: expanded ? 1.04 : 1, y: expanded ? -6 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative rounded-[1.6rem] bg-white/[0.05] border border-white/[0.08] backdrop-blur-xl overflow-hidden will-change-transform"
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
          <div className="absolute top-3 left-3 z-[3]">
            <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-medium text-white/80">{room.type}</span>
          </div>
        </div>
        <div className="p-4 md:p-5 relative z-[2] -mt-1">
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-white font-bold text-base md:text-lg leading-tight">{room.name}</h3>
            <span className={`text-[11px] font-semibold ${room.color}`}>{room.capacity}</span>
          </div>
          <p className="text-white/50 text-xs md:text-sm leading-relaxed line-clamp-2">{room.desc}</p>
          <div className="flex items-center gap-3 mt-3">
            {room.features.map((f, i) => (
              <div key={i} className="flex items-center gap-1 text-white/35" title={f.label}>
                <f.icon className="w-3.5 h-3.5" />
                <span className="text-[9px] font-medium hidden sm:inline">{f.label}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 mt-2.5">
            <span className="text-white/20 text-[9px] font-medium uppercase tracking-wider">Batafsil</span>
            <ChevronRight className="w-2.5 h-2.5 text-white/20" />
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5 pt-0 pointer-events-none"
          >
            <div className="rounded-xl bg-background/95 backdrop-blur-2xl border border-white/[0.1] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] pointer-events-auto">
              <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-3">{room.desc}</p>
              <div className="flex flex-wrap gap-2">
                {room.features.map((f, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.06] text-[10px] text-white/60">
                    <f.icon className="w-3 h-3" />{f.label}
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
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [isPaused, setIsPaused] = useState(false);
  const xPos = useRef(0);
  const rafId = useRef(0);
  const lastTime = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);

  // RAF animation loop
  useEffect(() => {
    if (isPaused || !isInView || !trackRef.current) return;

    const loop = (now: number) => {
      if (!trackRef.current) return;
      const delta = lastTime.current ? now - lastTime.current : 16;
      lastTime.current = now;

      xPos.current -= PX_PER_MS * delta;

      if (xPos.current <= -SET_WIDTH) {
        xPos.current += SET_WIDTH;
      }

      trackRef.current.style.transform = `translate3d(${xPos.current}px, 0, 0)`;
      rafId.current = requestAnimationFrame(loop);
    };

    lastTime.current = 0;
    rafId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId.current);
  }, [isPaused, isInView]);

  // Mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setIsPaused(true);
    dragStartX.current = e.clientX;
    dragStartPos.current = xPos.current;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = e.clientX - dragStartX.current;
    const newX = dragStartPos.current + dx;
    trackRef.current.style.transform = `translate3d(${newX}px, 0, 0)`;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    // Snap to nearest card
    const current = parseFloat(trackRef.current?.style.transform.replace(/translate3d\(|px.*/g, '') || '0');
    const cardStep = CARD_WIDTH + GAP;
    const snapped = Math.round(current / cardStep) * cardStep;
    const clamped = Math.max(-SET_WIDTH + cardStep, Math.min(0, snapped));
    xPos.current = clamped;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${clamped}px, 0, 0)`;
    }
    setTimeout(() => setIsPaused(false), 400);
  };

  // Touch drag
  const touchStartRef = useRef(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      setIsPaused(true);
      touchStartRef.current = e.touches[0].clientX;
      dragStartPos.current = xPos.current;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const dx = e.touches[0].clientX - touchStartRef.current;
      const newX = dragStartPos.current + dx;
      el.style.transform = `translate3d(${newX}px, 0, 0)`;
    };

    const onTouchEnd = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      const current = parseFloat(el.style.transform.replace(/translate3d\(|px.*/g, '') || '0');
      const cardStep = CARD_WIDTH + GAP;
      const snapped = Math.round(current / cardStep) * cardStep;
      const clamped = Math.max(-SET_WIDTH + cardStep, Math.min(0, snapped));
      xPos.current = clamped;
      el.style.transform = `translate3d(${clamped}px, 0, 0)`;
      setTimeout(() => setIsPaused(false), 500);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const duplicated = [...classrooms, ...classrooms];

  return (
    <section id="sinflar" ref={sectionRef} className="py-24 md:py-28 relative overflow-hidden">
      <div className="absolute right-0 top-1/3 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/3 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-14 md:mb-18">
          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE }}
            className="text-4xl md:text-5xl font-bold font-poppins text-white mb-5"
          >
            Sinf <span className="text-primary drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">Xonalarimiz</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
            className="text-base md:text-lg text-white/80 max-w-2xl mx-auto font-normal leading-[1.8]"
          >
            Har bir sinf xonasi zamonaviy texnologiyalar va qulayliklar bilan jihozlangan
          </motion.p>
        </div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => { setIsPaused(false); isDragging.current = false; }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div
            ref={trackRef}
            className="flex gap-4 will-change-transform cursor-grab active:cursor-grabbing"
          >
            {duplicated.map((room, idx) => (
              <ClassroomCard
                key={`${room.name}-${idx}`}
                room={room} index={idx % classrooms.length}
                onHover={() => setIsPaused(true)}
                onLeave={() => setIsPaused(false)}
                onTap={() => setIsPaused(true)}
              />
            ))}
          </div>

          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background via-background/60 to-transparent pointer-events-none z-[3]" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background via-background/60 to-transparent pointer-events-none z-[3]" />
        </div>
      </div>
    </section>
  );
}
