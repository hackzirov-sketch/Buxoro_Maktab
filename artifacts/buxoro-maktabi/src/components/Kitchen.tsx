import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

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
      { name: "Sutli Bo'tqa", desc: "Sariq yog' va mavsumiy mevalar", img: "/sutli-botqa.webp" },
      { name: "Tuxum va Sosiska", desc: "Pishloq, qaynatilgan tuxum", img: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=120&q=80" },
      { name: "Kruassan va Choy", desc: "Issiq tandir noni, yashil choy", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=120&q=80" },
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
      { name: "Osh (Palov)", desc: "Haqiqiy Buxoro oshi, go'sht va sabzavot", img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=120&q=80" },
      { name: "Mastava", desc: "Guruchli qaynatma sho'rva", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=120&q=80" },
      { name: "Mavsumiy Salat", desc: "Vitaminli yangi sabzavotlar", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=120&q=80" },
    ],
  },
  {
    id: "desert",
    label: "Tushdan keyin",
    time: "15:30 – 16:00",
    icon: "🍰",
    lottie: "https://lottie.host/embed/60082d9a-6177-4fd4-bc6e-fc1408e0d72f/5kgOIgvPU4.lottie",
    accentClass: "text-pink-300",
    borderClass: "border-pink-400/30",
    bgClass: "from-pink-500/15 to-rose-500/5",
    dotClass: "bg-pink-400",
    barClass: "bg-gradient-to-r from-pink-400 to-rose-400",
    items: [
      { name: "Tort va Pirojnoe", desc: "Shirinlik, krem va meva bilan", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=120&q=80" },
      { name: "Muzqaymoq", desc: "Tabiiy mevali muzqaymoq", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=120&q=80" },
      { name: "Meva Salatı", desc: "Toza mavsumiy mevalar", img: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=120&q=80" },
      { name: "Shokoladli Keks", desc: "Qo'lda pishirilgan shokolad keksi", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&q=80" },
    ],
  },
];

export default function Kitchen() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isInView || isOpen) return;
    const timer = setTimeout(() => setIsOpen(true), 350);
    return () => clearTimeout(timer);
  }, [isInView, isOpen]);

  const chapter = chapters[currentChapter];

  const navigate = (dir: number) => {
    const next = currentChapter + dir;
    if (next < 0 || next >= chapters.length) return;
    setDirection(dir);
    setCurrentChapter(next);
  };

  const desktopVariants = {
    enter: (d: number) => ({
      rotateY: d > 0 ? 90 : -90, opacity: 0, x: d > 0 ? "4%" : "-4%",
    }),
    center: {
      rotateY: 0, opacity: 1, x: "0%",
      transition: {
        rotateY: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
        opacity:  { duration: 0.25, ease: "easeOut" as const },
        x:        { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
      },
    },
    exit: (d: number) => ({
      rotateY: d > 0 ? -90 : 90, opacity: 0, x: d > 0 ? "-4%" : "4%",
      transition: {
        rotateY: { duration: 0.5, ease: [0.55, 0, 1, 0.45] as const },
        opacity:  { duration: 0.2, ease: "easeIn" as const, delay: 0.15 },
        x:        { duration: 0.5, ease: [0.55, 0, 1, 0.45] as const },
      },
    }),
  };

  const mobileVariants = {
    enter: (d: number) => ({
      rotateY: 0, opacity: 0, x: "6%",
    }),
    center: {
      rotateY: 0, opacity: 1, x: "0%",
      transition: { duration: 0.35, ease: "easeOut" as const },
    },
    exit: (d: number) => ({
      rotateY: 0, opacity: 0, x: "-6%",
      transition: { duration: 0.25, ease: "easeIn" as const },
    }),
  };

  const pageVariants = isMobile ? mobileVariants : desktopVariants;

  return (
    <section id="oshxona" className="py-16 md:py-24 relative overflow-hidden" ref={sectionRef}>
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-[0.055] bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('/school-bg.png')" }}
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6">

        {/* School image card above heading */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="mb-6 md:mb-10 mx-auto max-w-[200px] sm:max-w-sm"
        >
          <img
            src="/oshxona-logo.webp"
            alt="Buxoro Maktabi Oshxonasi"
            className="w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(74,222,128,0.35)] rounded-tl-[110px] rounded-tr-[110px] rounded-br-[110px] rounded-bl-[110px]"
          />
        </motion.div>

        <div className="text-center mb-10 md:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
            className="text-4xl md:text-5xl font-bold font-poppins text-white mb-5"
          >
            Bizning <span className="text-primary drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">Oshxonamiz</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.12 }}
            className="text-base md:text-lg text-white/85 max-w-2xl mx-auto font-normal leading-[1.8]"
          >
            Sog'lom va mazali taomlar — o'quvchilarimizning energiyasi va diqqat-e'tibori garovi. Kuniga 3 mahal issiq ovqat va desert.
          </motion.p>
        </div>

        <div className="flex flex-col items-center" style={{ perspective: "2000px" }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.2 }}
            className="mb-4 flex items-center gap-3"
          >
            <div className="h-px w-12 bg-white/20" />
            <span className="text-xs uppercase tracking-[0.25em] text-white/40 font-semibold">Kunlik Menyu Kitobi</span>
            <div className="h-px w-12 bg-white/20" />
          </motion.div>

          <motion.div
            initial={{ scale: 0.82, opacity: 0, rotateX: 18, filter: "blur(10px)" }}
            animate={isOpen
              ? { scale: 1, opacity: 1, rotateX: 0, filter: "blur(0px)" }
              : { scale: 0.82, opacity: 0, rotateX: 18, filter: "blur(10px)" }
            }
            transition={{
              scale:   { duration: 1.1, ease: [0.34, 1.56, 0.64, 1] },
              opacity: { duration: 0.7, ease: "easeOut" },
              rotateX: { duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] },
              filter:  { duration: 0.7, ease: "easeOut" },
            }}
            className="w-full max-w-4xl"
          >
            <div className="relative">
              {/* Book shadow */}
              <div className="absolute inset-0 translate-y-4 translate-x-1.5 rounded-2xl bg-black/50 blur-2xl" />
              <div className="absolute inset-0 translate-y-1.5 rounded-2xl bg-black/30" />

              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-[#0d2b1e] to-[#071a10] shadow-[0_0_80px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)]">

                <motion.div
                  key={currentChapter}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
                  className={`h-1 w-full origin-left ${chapter.barClass}`}
                />

                {/* Pages area */}
                <div className="relative md:min-h-[480px]">
                  {/* Book spine — hidden on mobile */}
                  <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/20 via-white/8 to-transparent z-20 -translate-x-1/2">
                    <div className="absolute inset-0 blur-[3px] bg-white/12" />
                  </div>

                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentChapter}
                      custom={direction}
                      variants={pageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="grid md:absolute md:inset-0 md:grid-cols-2 gap-4 md:gap-0 md:[transform-style:preserve-3d] md:[transform-origin:center_center] md:[backface-visibility:hidden]"
                    >
                      {/* LEFT PAGE */}
                      <div className={`p-5 sm:p-6 md:p-10 flex flex-col justify-between bg-gradient-to-br ${chapter.bgClass} border-b md:border-b-0 md:border-r border-white/8 rounded-xl md:rounded-none`}>
                        <div className="flex flex-col gap-1.5 mb-4 md:mb-6">
                          <div className={`w-8 md:w-10 h-0.5 ${chapter.dotClass} opacity-70 rounded-full`} />
                          <div className={`w-5 md:w-6 h-0.5 ${chapter.dotClass} opacity-40 rounded-full`} />
                        </div>

                        <div className="flex-1 flex flex-col justify-center gap-3 md:gap-4">
                          <div className="w-16 sm:w-20 md:w-[7.5rem] h-16 sm:h-20 md:h-[7.5rem] -ml-1 sm:-ml-2">
                            <iframe
                              key={chapter.id}
                              src={chapter.lottie}
                              className="w-full h-full border-none"
                              allow="autoplay"
                              title={chapter.label}
                            />
                          </div>

                          <div>
                            <p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-widest mb-1 font-semibold">Ovqat vaqti</p>
                            <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold font-poppins ${chapter.accentClass} leading-tight`}>
                              {chapter.label}
                            </h3>
                          </div>

                          <div className={`inline-flex items-center gap-2 self-start px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/40 border ${chapter.borderClass} backdrop-blur-md`}>
                            <Clock className={`w-3 sm:w-3.5 h-3 sm:h-3.5 ${chapter.accentClass}`} />
                            <span className={`text-[11px] sm:text-sm font-bold ${chapter.accentClass} tracking-wide`}>{chapter.time}</span>
                          </div>

                          {chapter.id === "desert" && (
                            <p className="text-white/35 text-[11px] sm:text-xs leading-relaxed max-w-[180px] sm:max-w-[200px]">
                              Tushlikdan 3 soat o'tgach, o'quvchilarga xush ta'm desert taqdim etiladi.
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-1.5 mt-4 md:mt-6">
                          <span className="text-white/20 text-xs font-mono mb-1">
                            {String(currentChapter + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
                          </span>
                          <div className={`w-5 md:w-6 h-0.5 ${chapter.dotClass} opacity-40 rounded-full`} />
                          <div className={`w-8 md:w-10 h-0.5 ${chapter.dotClass} opacity-70 rounded-full`} />
                        </div>
                      </div>

                      {/* RIGHT PAGE */}
                      <div className="p-5 sm:p-6 md:p-10 flex flex-col gap-3 md:gap-4 bg-gradient-to-bl from-white/3 to-transparent rounded-xl md:rounded-none">
                        <p className="text-white/35 text-[10px] sm:text-xs uppercase tracking-widest font-semibold mb-1">Taomlar</p>

                        <div className="flex flex-col gap-2 md:gap-3">
                          {chapter.items.map((item, idx) => (
                            <motion.div
                              key={`${currentChapter}-${idx}`}
                              initial={{ opacity: 0, x: 28, filter: "blur(3px)" }}
                              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                              transition={{ delay: 0.25 + idx * 0.09, duration: 0.55, ease: EASE_OUT_EXPO }}
                              whileHover={{ x: 4, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                              className="flex items-center gap-3 md:gap-4 p-2 sm:p-2.5 md:p-3 rounded-xl bg-white/4 border border-white/8 hover:bg-white/8 hover:border-white/15 transition-colors duration-250 group cursor-default"
                            >
                              <div className="shrink-0 w-12 sm:w-14 h-12 sm:h-14 rounded-lg overflow-hidden border border-white/10">
                                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white font-semibold text-xs sm:text-sm leading-tight mb-0.5">{item.name}</h4>
                                <p className="text-white/45 text-[11px] sm:text-xs leading-relaxed truncate">{item.desc}</p>
                              </div>
                              <div className={`shrink-0 w-1.5 h-1.5 rounded-full ${chapter.dotClass} opacity-60`} />
                            </motion.div>
                          ))}
                        </div>

                        <div className="flex justify-end gap-1.5 mt-auto pt-3 md:pt-4">
                          <div className={`w-8 md:w-10 h-0.5 ${chapter.dotClass} opacity-30 rounded-full`} />
                          <div className={`w-5 md:w-6 h-0.5 ${chapter.dotClass} opacity-20 rounded-full`} />
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation footer */}
                <div className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-5 border-t border-white/8 bg-black/25">
                  <motion.button
                    onClick={() => navigate(-1)}
                    disabled={currentChapter === 0}
                    whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 20 } }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-200 text-xs font-semibold"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Oldingi</span>
                  </motion.button>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {chapters.map((ch, idx) => (
                      <motion.button
                        key={ch.id}
                        onClick={() => { setDirection(idx > currentChapter ? 1 : -1); setCurrentChapter(idx); }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`rounded-full transition-all duration-300 ${idx === currentChapter ? `w-5 sm:w-7 h-2 sm:h-2.5 ${ch.dotClass}` : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/20 hover:bg-white/40"}`}
                        title={ch.label}
                      />
                    ))}
                  </div>

                  <motion.button
                    onClick={() => navigate(1)}
                    disabled={currentChapter === chapters.length - 1}
                    whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 20 } }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-200 text-xs font-semibold"
                  >
                    <span className="hidden sm:inline">Keyingi</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: 0.65 }}
            className="flex flex-wrap justify-center gap-2 mt-6 md:mt-8"
          >
            {chapters.map((ch, idx) => (
              <motion.button
                key={ch.id}
                onClick={() => { setDirection(idx > currentChapter ? 1 : -1); setCurrentChapter(idx); }}
                whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 380, damping: 22 } }}
                whileTap={{ scale: 0.96 }}
                className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                  idx === currentChapter
                    ? `${ch.accentClass} border-current bg-white/8 shadow-[0_0_16px_rgba(0,0,0,0.3)]`
                    : "text-white/40 border-white/10 hover:text-white/70 hover:border-white/25"
                }`}
              >
                {ch.icon} {ch.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
