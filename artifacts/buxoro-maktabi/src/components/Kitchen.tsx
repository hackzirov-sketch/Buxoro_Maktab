import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import kitchenImg from "@assets/image_1778575515104.png";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

const pages = [
  {
    id: "nonushta",
    label: "Nonushta",
    time: "07:30 – 08:30",
    color: "from-amber-400/20 to-orange-500/10",
    dot: "bg-amber-400",
    accent: "text-amber-300",
    border: "border-amber-400/20",
    icon: "🌅",
    items: [
      { name: "Sutli Bo'tqa", desc: "Sariq yog' va mavsumiy mevalar bilan" },
      { name: "Tuxum va Sosiska", desc: "Qaynatilgan tuxum, pishloq va sosiska" },
      { name: "Shirinliklar", desc: "Kruassan va issiq choy" },
    ],
  },
  {
    id: "tushlik",
    label: "Tushlik",
    time: "12:30 – 13:30",
    color: "from-primary/20 to-emerald-600/10",
    dot: "bg-primary",
    accent: "text-primary",
    border: "border-primary/20",
    icon: "☀️",
    items: [
      { name: "Osh (Palov)", desc: "Haqiqiy Buxoro oshi, go'sht va sabzavotlar bilan" },
      { name: "Sho'rva", desc: "Qaynatma sho'rva, barra go'shtidan" },
      { name: "Meva va Salatlar", desc: "Mavsumiy mevalar va vitaminli salat" },
    ],
  },
  {
    id: "tamaddi",
    label: "Yengil tamaddi",
    time: "17:00 – 18:00",
    color: "from-violet-400/20 to-indigo-500/10",
    dot: "bg-violet-400",
    accent: "text-violet-300",
    border: "border-violet-400/20",
    icon: "🌙",
    items: [
      { name: "Manti", desc: "Bug'da pishirilgan manti, qatiq bilan" },
      { name: "Dimlama", desc: "Go'sht va sabzavotli dimlama" },
      { name: "Qatiq va Non", desc: "Uy qatig'i va issiq tandir noni" },
    ],
  },
];

export default function Kitchen() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const navigate = (dir: number) => {
    const next = currentPage + dir;
    if (next < 0 || next >= pages.length) return;
    setDirection(dir);
    setCurrentPage(next);
  };

  const page = pages[currentPage];

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 60 : -60,
      rotateY: d > 0 ? 25 : -25,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (d: number) => ({
      x: d > 0 ? -60 : 60,
      rotateY: d > 0 ? -25 : 25,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section id="oshxona" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold font-poppins text-white mb-6"
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
            Sog'lom va mazali taomlar — o'quvchilarimizning energiyasi va diqqat-e'tibori garovi. Kuniga 3 mahal issiq ovqat.
          </motion.p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Kitchen image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden border border-white/10 group"
          >
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-500 mix-blend-overlay z-10"></div>
            <img
              src={kitchenImg}
              alt="Oshxona"
              className="w-full h-full object-cover aspect-square md:aspect-[4/3] transform group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-20"></div>
            <div className="absolute bottom-8 left-8 right-8 z-30">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                <span className="text-white font-medium">Toza va halol mahsulotlar</span>
              </div>
            </div>
          </motion.div>

          {/* Menu Book */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Book label */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold">Kunlik Menyu</span>
            </div>

            {/* Book wrapper with perspective */}
            <div style={{ perspective: "1200px" }} className="w-full max-w-md">
              {/* Book shell */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]">

                {/* Book top decorative bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${page.color} transition-all duration-500`}></div>

                {/* Book spine line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent pointer-events-none z-20"></div>

                {/* Animated page content */}
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentPage}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="grid grid-cols-2 min-h-[320px]"
                  >
                    {/* Left page — meal identity */}
                    <div className={`p-6 flex flex-col justify-between bg-gradient-to-br ${page.color} border-r border-white/8`}>
                      {/* Corner ornament */}
                      <div className="flex flex-col gap-1">
                        <div className={`w-8 h-px ${page.dot} opacity-60`}></div>
                        <div className={`w-4 h-px ${page.dot} opacity-40`}></div>
                      </div>

                      <div className="flex flex-col items-start gap-3">
                        <span className="text-3xl">{page.icon}</span>
                        <h3 className={`text-xl font-bold font-poppins ${page.accent} leading-tight`}>
                          {page.label}
                        </h3>
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 border ${page.border} backdrop-blur-md`}>
                          <Clock className={`w-3 h-3 ${page.accent}`} />
                          <span className={`text-xs font-semibold ${page.accent} tracking-wide`}>
                            {page.time}
                          </span>
                        </div>
                      </div>

                      {/* Page number */}
                      <div className="flex flex-col items-start gap-1">
                        <div className={`w-4 h-px ${page.dot} opacity-40`}></div>
                        <div className={`w-8 h-px ${page.dot} opacity-60`}></div>
                        <span className="text-xs text-white/25 mt-1 font-mono">
                          {String(currentPage + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Right page — food items */}
                    <div className="p-6 flex flex-col justify-between">
                      <div className="flex flex-col gap-4">
                        {page.items.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + idx * 0.08, duration: 0.3 }}
                            className="group/item"
                          >
                            <div className="flex items-start gap-2 mb-0.5">
                              <div className={`w-1.5 h-1.5 rounded-full ${page.dot} mt-[5px] shrink-0 opacity-70`}></div>
                              <h4 className="text-sm font-semibold text-white leading-snug">{item.name}</h4>
                            </div>
                            <p className="text-white/45 text-xs leading-relaxed pl-3.5">{item.desc}</p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Corner ornament bottom right */}
                      <div className="flex flex-col items-end gap-1 mt-4">
                        <div className={`w-8 h-px ${page.dot} opacity-30`}></div>
                        <div className={`w-4 h-px ${page.dot} opacity-20`}></div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Bottom navigation bar */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-white/8 bg-black/20">
                  <button
                    onClick={() => navigate(-1)}
                    disabled={currentPage === 0}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 text-xs font-medium"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Oldingi
                  </button>

                  {/* Page dots */}
                  <div className="flex items-center gap-2">
                    {pages.map((p, idx) => (
                      <button
                        key={p.id}
                        onClick={() => { setDirection(idx > currentPage ? 1 : -1); setCurrentPage(idx); }}
                        className={`rounded-full transition-all duration-300 ${
                          idx === currentPage
                            ? `w-6 h-2 ${p.dot}`
                            : "w-2 h-2 bg-white/20 hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => navigate(1)}
                    disabled={currentPage === pages.length - 1}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 text-xs font-medium"
                  >
                    Keyingi
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tab shortcuts below book */}
            <div className="flex items-center gap-2 mt-6">
              {pages.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => { setDirection(idx > currentPage ? 1 : -1); setCurrentPage(idx); }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border ${
                    idx === currentPage
                      ? `${p.accent} border-current bg-white/8`
                      : "text-white/40 border-white/10 hover:text-white/70 hover:border-white/20"
                  }`}
                >
                  {p.icon} {p.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
