import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

const chapters = [
  {
    id: "nonushta",
    label: "Nonushta",
    time: "07:30 – 08:30",
    icon: "🌅",
    lottie: "https://lottie.host/embed/dc5b4ab3-0ac6-4968-8abc-b49dc975510d/PNiyUxEVLN.lottie",
    accentClass: "text-amber-300",
    borderClass: "border-amber-400/30",
    bgClass: "from-amber-500/15 to-orange-500/5",
    dotClass: "bg-amber-400",
    barClass: "bg-gradient-to-r from-amber-400 to-orange-400",
    items: [
      {
        name: "Sutli Bo'tqa",
        desc: "Sariq yog' va mavsumiy mevalar",
        img: "https://images.unsplash.com/photo-1517673408408-6b8de3bb7234?w=120&q=80",
      },
      {
        name: "Tuxum va Sosiska",
        desc: "Pishloq, qaynatilgan tuxum",
        img: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=120&q=80",
      },
      {
        name: "Kruassan va Choy",
        desc: "Issiq tandir noni, yashil choy",
        img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=120&q=80",
      },
    ],
  },
  {
    id: "tushlik",
    label: "Tushlik",
    time: "12:30 – 13:30",
    icon: "☀️",
    lottie: "https://lottie.host/embed/8bd09d6b-efee-4afd-9be0-8f5e7b56844e/XUREsAUi11.lottie",
    accentClass: "text-primary",
    borderClass: "border-primary/30",
    bgClass: "from-primary/15 to-emerald-600/5",
    dotClass: "bg-primary",
    barClass: "bg-gradient-to-r from-primary to-emerald-400",
    items: [
      {
        name: "Osh (Palov)",
        desc: "Haqiqiy Buxoro oshi, go'sht va sabzavot",
        img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=120&q=80",
      },
      {
        name: "Mastava",
        desc: "Guruchli qaynatma sho'rva",
        img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=120&q=80",
      },
      {
        name: "Mavsumiy Salat",
        desc: "Vitaminli yangi sabzavotlar",
        img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=120&q=80",
      },
    ],
  },
  {
    id: "desert",
    label: "Tushlidan keyingi tamaddi",
    time: "15:30 – 16:00",
    icon: "🍰",
    lottie: "https://lottie.host/embed/60082d9a-6177-4fd4-bc6e-fc1408e0d72f/5kgOIgvPU4.lottie",
    accentClass: "text-pink-300",
    borderClass: "border-pink-400/30",
    bgClass: "from-pink-500/15 to-rose-500/5",
    dotClass: "bg-pink-400",
    barClass: "bg-gradient-to-r from-pink-400 to-rose-400",
    items: [
      {
        name: "Tort va Pirojnoe",
        desc: "Shirinlik, krem va meva bilan",
        img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=120&q=80",
      },
      {
        name: "Muzqaymoq",
        desc: "Tabiiy mevali muzqaymoq",
        img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=120&q=80",
      },
      {
        name: "Meva Salatı",
        desc: "Toza mavsumiy mevalar",
        img: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=120&q=80",
      },
      {
        name: "Shokoladli Keks",
        desc: "Qo'lda pishirilgan shokolad keksi",
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&q=80",
      },
    ],
  },
];

export default function Kitchen() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Trigger book open when section enters view
  if (isInView && !isOpen) {
    setTimeout(() => setIsOpen(true), 400);
  }

  const chapter = chapters[currentChapter];

  const navigate = (dir: number) => {
    const next = currentChapter + dir;
    if (next < 0 || next >= chapters.length) return;
    setDirection(dir);
    setCurrentChapter(next);
  };

  const pageVariants = {
    enter: (d: number) => ({
      x: d > 0 ? 80 : -80,
      opacity: 0,
      rotateY: d > 0 ? 20 : -20,
    }),
    center: { x: 0, opacity: 1, rotateY: 0 },
    exit: (d: number) => ({
      x: d > 0 ? -80 : 80,
      opacity: 0,
      rotateY: d > 0 ? -20 : 20,
    }),
  };

  return (
    <section id="oshxona" className="py-24 relative overflow-hidden" ref={sectionRef}>
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold font-poppins text-white mb-5"
          >
            Bizning <span className="text-primary drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">Oshxonamiz</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-white/85 max-w-2xl mx-auto font-normal leading-[1.8]"
          >
            Sog'lom va mazali taomlar — o'quvchilarimizning energiyasi va diqqat-e'tibori garovi. Kuniga 3 mahal issiq ovqat va desert.
          </motion.p>
        </div>

        {/* Book wrapper */}
        <div className="flex flex-col items-center" style={{ perspective: "1400px" }}>
          {/* Book label */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 flex items-center gap-3"
          >
            <div className="h-px w-12 bg-white/20"></div>
            <span className="text-xs uppercase tracking-[0.25em] text-white/40 font-semibold">Kunlik Menyu Kitobi</span>
            <div className="h-px w-12 bg-white/20"></div>
          </motion.div>

          {/* The Book */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, rotateX: 8 }}
            animate={isOpen ? { scale: 1, opacity: 1, rotateX: 0 } : { scale: 0.85, opacity: 0, rotateX: 8 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-4xl"
          >
            {/* Outer book cover shadow */}
            <div className="relative">
              {/* Book shadow layers (depth illusion) */}
              <div className="absolute inset-0 translate-y-3 translate-x-1 rounded-2xl bg-black/40 blur-xl"></div>
              <div className="absolute inset-0 translate-y-1.5 rounded-2xl bg-black/30"></div>

              {/* Book body */}
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-[#0d2b1e] to-[#071a10] shadow-[0_0_80px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)]">

                {/* Animated accent bar at top */}
                <motion.div
                  key={currentChapter}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`h-1 w-full origin-left ${chapter.barClass}`}
                />

                {/* Book inner pages area */}
                <div className="relative grid md:grid-cols-2 min-h-[400px]" style={{ perspective: "800px" }}>

                  {/* Book spine */}
                  <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/15 via-white/8 to-transparent z-20 -translate-x-1/2">
                    <div className="absolute inset-0 blur-[3px] bg-white/10"></div>
                  </div>

                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentChapter}
                      custom={direction}
                      variants={pageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="contents"
                    >
                      {/* LEFT PAGE — Chapter identity */}
                      <div className={`p-8 md:p-10 flex flex-col justify-between bg-gradient-to-br ${chapter.bgClass} border-b md:border-b-0 md:border-r border-white/8`}>
                        {/* Top ornament */}
                        <div className="flex flex-col gap-1.5 mb-6">
                          <div className={`w-10 h-0.5 ${chapter.dotClass} opacity-70 rounded-full`}></div>
                          <div className={`w-6 h-0.5 ${chapter.dotClass} opacity-40 rounded-full`}></div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center gap-4">
                          {/* Lottie animation */}
                          <div className="w-24 h-24 -ml-2">
                            <iframe
                              key={chapter.id}
                              src={chapter.lottie}
                              className="w-full h-full border-none"
                              allow="autoplay"
                              title={chapter.label}
                            />
                          </div>

                          {/* Chapter name */}
                          <div>
                            <p className="text-white/40 text-xs uppercase tracking-widest mb-1 font-semibold">Ovqat vaqti</p>
                            <h3 className={`text-3xl md:text-4xl font-bold font-poppins ${chapter.accentClass} leading-tight`}>
                              {chapter.label}
                            </h3>
                          </div>

                          {/* Time badge */}
                          <div className={`inline-flex items-center gap-2 self-start px-4 py-2 rounded-full bg-black/40 border ${chapter.borderClass} backdrop-blur-md`}>
                            <Clock className={`w-3.5 h-3.5 ${chapter.accentClass}`} />
                            <span className={`text-sm font-bold ${chapter.accentClass} tracking-wide`}>
                              {chapter.time}
                            </span>
                          </div>

                          {/* Tushlik uchun desert vaqti tushuntirish */}
                          {chapter.id === "desert" && (
                            <p className="text-white/35 text-xs leading-relaxed max-w-[200px]">
                              Tushlikdan 3 soat o'tgach, o'quvchilarga xush ta'm desert taqdim etiladi.
                            </p>
                          )}
                        </div>

                        {/* Bottom ornament + page num */}
                        <div className="flex flex-col gap-1.5 mt-6">
                          <span className="text-white/20 text-xs font-mono mb-1">
                            {String(currentChapter + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
                          </span>
                          <div className={`w-6 h-0.5 ${chapter.dotClass} opacity-40 rounded-full`}></div>
                          <div className={`w-10 h-0.5 ${chapter.dotClass} opacity-70 rounded-full`}></div>
                        </div>
                      </div>

                      {/* RIGHT PAGE — Food items with images */}
                      <div className="p-8 md:p-10 flex flex-col gap-4 bg-gradient-to-bl from-white/3 to-transparent">
                        <p className="text-white/35 text-xs uppercase tracking-widest font-semibold mb-1">Taomlar</p>

                        <div className="flex flex-col gap-3">
                          {chapter.items.map((item, idx) => (
                            <motion.div
                              key={`${currentChapter}-${idx}`}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + idx * 0.07, duration: 0.35 }}
                              className={`flex items-center gap-4 p-3 rounded-xl bg-white/4 border border-white/8 hover:bg-white/8 hover:border-white/15 transition-all duration-300 group`}
                            >
                              {/* Dish photo */}
                              <div className="shrink-0 w-14 h-14 rounded-lg overflow-hidden border border-white/10">
                                <img
                                  src={item.img}
                                  alt={item.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  loading="lazy"
                                />
                              </div>

                              {/* Text */}
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white font-semibold text-sm leading-tight mb-0.5">{item.name}</h4>
                                <p className="text-white/45 text-xs leading-relaxed truncate">{item.desc}</p>
                              </div>

                              {/* Accent dot */}
                              <div className={`shrink-0 w-1.5 h-1.5 rounded-full ${chapter.dotClass} opacity-60`}></div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Bottom right ornament */}
                        <div className="flex justify-end gap-1.5 mt-auto pt-4">
                          <div className={`w-10 h-0.5 ${chapter.dotClass} opacity-30 rounded-full`}></div>
                          <div className={`w-6 h-0.5 ${chapter.dotClass} opacity-20 rounded-full`}></div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation footer */}
                <div className="flex items-center justify-between px-8 py-5 border-t border-white/8 bg-black/25">
                  <button
                    onClick={() => navigate(-1)}
                    disabled={currentChapter === 0}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 text-xs font-semibold"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Oldingi
                  </button>

                  {/* Chapter dots */}
                  <div className="flex items-center gap-2">
                    {chapters.map((ch, idx) => (
                      <button
                        key={ch.id}
                        onClick={() => { setDirection(idx > currentChapter ? 1 : -1); setCurrentChapter(idx); }}
                        className={`rounded-full transition-all duration-300 ${idx === currentChapter ? `w-7 h-2.5 ${ch.dotClass}` : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"}`}
                        title={ch.label}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => navigate(1)}
                    disabled={currentChapter === chapters.length - 1}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 text-xs font-semibold"
                  >
                    Keyingi
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chapter shortcut tabs below book */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2 mt-8"
          >
            {chapters.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => { setDirection(idx > currentChapter ? 1 : -1); setCurrentChapter(idx); }}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  idx === currentChapter
                    ? `${ch.accentClass} border-current bg-white/8 shadow-[0_0_16px_rgba(0,0,0,0.3)]`
                    : "text-white/40 border-white/10 hover:text-white/70 hover:border-white/25"
                }`}
              >
                {ch.icon} {ch.label}
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
