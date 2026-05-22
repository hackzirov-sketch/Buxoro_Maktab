import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const EASE = [0.16, 1, 0.3, 1] as const;

const moments = [
  {
    src: "/photo_2026-05-18_16-57-24.webp",
    title: "Bright Minds 2026",
    desc: "Buxoro maktabi 6-sinf o'quvchilari xalqaro musobaqada yuqori natija qayd etdi.",
    badge: "Xalqaro yutuq",
    meta: "Baku Youth Center, Boku • 11-may 2026",
    details: [
      "Xalmirzayev Javohir, 6-A sinf: Ingliz tili B2 daraja bo'yicha oliy o'rin va 10 kunlik xalqaro ingliz tili oromgohiga yo'llanma.",
      "Po'ladxo'jayeva Dilshoda, 6-sinf: Matematika yo'nalishida 1-o'rin.",
    ],
  },
  {
    src: "/photo_2026-05-18_17-03-45.webp",
    title: "Tarixdan super natija",
    desc: "6-sinf o'quvchimiz G'aibulloyev Shoxijahon tarix fanidan navbatdagi yuqori natijani qo'lga kiritdi.",
    badge: "O'quvchi yutug'i",
    meta: "Fan: Tarix • Vaqt: 3,5 oy",
    details: [
      "O'quvchi: G'aibulloyev Shoxijahon, 6-sinf.",
      "Daraja: A +. Tarix ustozi: Bekzod Xojimuratov.",
    ],
  },
  {
    src: "/photo_2026-04-26_14-22-25.webp",
    title: "Tibbiyot o'quvchilari",
    desc: "Bir necha kunlik sayohat o'quvchilarimiz uchun katta tajriba va yangi maqsadlar manbai bo'ldi.",
    badge: "Tajriba safari",
    meta: "Bilim • Jamoa • Maqsad",
    details: [
      "Kelajak shifokorlari bilim, jamoaviylik va kasbiy maqsad sari yana bir pog'ona yuqoriga ko'tarildi.",
      "Buxoro maktabi — ta'lim va tarbiya birlashgan maskan.",
    ],
  },
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

function MomentCard({ item, index }: { item: typeof moments[number]; index: number }) {
  const isFeatured = Boolean("details" in item && item.details);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.06 }}
      className="group"
    >
      <div className={`relative rounded-2xl overflow-hidden glass-card hover:shadow-lg transition-all duration-300 group ${isFeatured ? "border-primary/30" : ""}`}>
        <div className="aspect-[4/3] overflow-hidden relative bg-white/10">
          <div className={`absolute inset-0 bg-gradient-to-br ${fallbackColors[index % fallbackColors.length]} z-0`} />
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <span className="text-4xl font-bold text-white/10 select-none">{item.title.charAt(0)}</span>
          </div>
          {"src" in item && item.src ? (
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
              className="relative w-full h-full object-cover transition-all duration-500 group-hover:brightness-110 group-hover:scale-105 z-[1]"
            />
          ) : (
            <div className="relative z-[1] flex h-full w-full flex-col justify-end bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 p-5">
              <span className="mb-3 inline-flex w-fit rounded-full bg-primary/20 px-3 py-1 text-sm font-bold text-emerald-200">
                {"badge" in item ? item.badge : "Maktab hayoti"}
              </span>
              <h3 className="text-3xl font-black leading-tight text-white drop-shadow-lg">{item.title}</h3>
              <p className="mt-2 text-base font-semibold text-white/78">International Competition</p>
            </div>
          )}
        </div>
        <div className="p-4 md:p-4">
          <h3 className="text-foreground font-bold text-lg md:text-base mb-1 md:mb-1 truncate">{item.title}</h3>
          <p className="text-foreground/65 text-base md:text-sm leading-relaxed line-clamp-2">{item.desc}</p>
          {"meta" in item && item.meta && (
            <p className="mt-3 text-sm font-semibold text-primary">{item.meta}</p>
          )}
          {"details" in item && item.details && (
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/75">
              {item.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function SchoolLife() {
  return (
    <section id="maktab-hayoti" className="py-20 md:py-24 relative overflow-hidden dark:bg-emerald-900/15">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE }}
            className="text-5xl md:text-5xl font-bold font-poppins text-foreground mb-4 leading-tight"
          >
            Maktab <span className="text-primary drop-shadow-[0_0_10px_rgba(34,197,94,0.25)]">hayotidan parchalar</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
            className="text-xl md:text-xl text-muted-foreground/85 max-w-2xl mx-auto font-semibold md:font-normal leading-relaxed"
          >
            Kunlik hayotimizdan eng yorqin lahzalarni jamlagan xotira devori
          </motion.p>
        </div>

        <Carousel opts={{ align: "start", loop: false }} className="w-full">
          <CarouselContent>
            {moments.map((item, idx) => (
              <CarouselItem key={idx} className="basis-[86%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <MomentCard item={item} index={idx} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="glass-button -left-3 sm:-left-5 h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center text-[#065f46] hover:bg-primary/20 z-10" />
          <CarouselNext className="glass-button -right-3 sm:-right-5 h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center text-[#065f46] hover:bg-primary/20 z-10" />
        </Carousel>
      </div>
    </section>
  );
}
