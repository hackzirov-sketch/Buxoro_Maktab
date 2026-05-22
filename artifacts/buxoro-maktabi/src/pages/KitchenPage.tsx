import { PageWrapper, PageHeader } from "./Layout";
import SectionNav from "@/components/SectionNav";
import CardViewer from "@/components/CardViewer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const staff = [
  { name: "Shoira Rahmatullayevna", role: "Bosh oshpaz", desc: "Buxoro Maktabi bosh oshpazi. 33 yillik ish tajribasiga ega malakali oshpaz.", grad: "from-primary to-emerald-400", image: "/Shoira-Rahmatullayevna.webp" },
  { name: "Saydullayeva Sevara", role: "Bosh qandolatchi", desc: "5 yillik tajribaga ega mohir qandolatchi. Hozirda Buxoro Maktabining bosh qandolatchisi.", grad: "from-pink-400 to-rose-400", image: "/Saydullayeva-Sevara.webp" },
  { name: "Gulnora Xasanova", role: "Oshpaz", desc: "18 yillik tajriba. Bolalar ovqatlanishi bo'yicha mutaxassis.", grad: "from-primary to-emerald-400" },
  { name: "Maftuna Sodiqova", role: "Oshpaz yordamchisi", desc: "5 yillik tajriba. Sog'lom ovqatlanish bo'yicha kurslar.", grad: "from-amber-400 to-orange-400" },
  { name: "Dilshod Ergashev", role: "Oshxona mudiri", desc: "8 yillik tajriba. Mahsulot sifati va sanitariya nazorati.", grad: "from-pink-400 to-rose-400" },
  { name: "Zulfiya Abdurahmonova", role: "Nonvoy", desc: "12 yillik tajriba. Pishiriq va non mahsulotlari bo'yicha mutaxassis.", grad: "from-sky-400 to-blue-400" },
  { name: "Shoxrux Mirzayev", role: "Farrosh", desc: "7 yillik tajriba. Oshxona tozaligi va gigiyena uchun mas'ul.", grad: "from-purple-400 to-violet-400" },
  { name: "Madina Rahmonova", role: "Sutli mahsulotlar bo'yicha oshpaz", desc: "6 yillik tajriba. Sutli taomlar va desertlar tayyorlash ustasi.", grad: "from-teal-400 to-cyan-400" },
];

const makeFoodImages = (prefix: string, count: number, label: string, firstName?: string) =>
  Array.from({ length: count }, (_, index) => {
    const number = index + 1;
    const fileName = number === 1 && firstName ? firstName : `${prefix}${number}.webp`;
    return {
      title: `${label} ${number}`,
      src: `/ovqatlar/${fileName}`,
    };
  });

const foodGalleries = [
  {
    title: "Maktabgacha tayyorlov nonushtasi",
    subtitle: "Nolavoylar uchun nonushta lavhalari",
    images: makeFoodImages("nonushta", 6, "Nonushta"),
  },
  {
    title: "Tushlik",
    subtitle: "Issiq taom va kunlik tushliklar",
    images: makeFoodImages("obed", 22, "Tushlik"),
  },
  {
    title: "Poldnik",
    subtitle: "Tushdan keyingi yengil ovqatlar",
    images: makeFoodImages("poldnik", 24, "Poldnik", "Poldnik1.webp"),
  },
];

function StaffCard({ s }: { s: typeof staff[0] }) {
  return (
    <div className="relative rounded-2xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm md:backdrop-blur-xl overflow-hidden h-full">
      <div className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${s.grad} opacity-[0.12]`} />
        <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
          {(s as any).image ? (
            <img src={(s as any).image} alt={s.name} title={s.desc} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          ) : (
            <span className="text-4xl md:text-5xl font-bold text-white/15">{s.name.charAt(0)}</span>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background/95 to-transparent" />
        </div>
      </div>
      <div className="p-3 md:p-4">
        <h3 className="text-white font-bold text-xs md:text-sm mb-0.5 truncate">{s.name}</h3>
        <span className={`inline-block text-[8px] md:text-[10px] font-semibold uppercase tracking-wider mb-1.5 bg-clip-text text-transparent bg-gradient-to-r ${s.grad}`}>{s.role}</span>
        <p className="text-white/50 text-[10px] md:text-xs leading-relaxed line-clamp-2">{s.desc}</p>
      </div>
    </div>
  );
}

function FoodPhotoCard({ image }: { image: typeof foodGalleries[0]["images"][0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className="group relative rounded-2xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm md:backdrop-blur-xl overflow-hidden h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.04]">
        <img
          src={image.src}
          alt={image.title}
          title={image.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </motion.div>
  );
}

function MobileFoodCarousel({ images }: { images: typeof foodGalleries[0]["images"] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = window.setInterval(() => {
      setCurrent((value) => (value + 1) % images.length);
    }, 1220);
    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <div className="md:hidden">
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.05]">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((image) => (
            <div key={image.src} className="w-full shrink-0">
              <FoodPhotoCard image={image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FoodGalleryRow({ gallery }: { gallery: typeof foodGalleries[0] }) {
  return (
    <div className="mb-12 md:mb-14">
      <div className="mb-5 md:mb-6 text-center">
        <h3 className="text-xl md:text-2xl font-bold font-poppins text-white">{gallery.title}</h3>
        <p className="mt-1 text-xs md:text-sm text-white/45">{gallery.subtitle}</p>
      </div>
      <MobileFoodCarousel images={gallery.images} />
      <div className="hidden md:block">
        <CardViewer
          perPage={4}
          items={gallery.images.map((image) => (
            <FoodPhotoCard key={image.src} image={image} />
          ))}
        />
      </div>
    </div>
  );
}

export default function KitchenPage() {
  return (
    <PageWrapper>
      <section className="py-16 md:py-24">
        <PageHeader title={<>Bizning <span className="text-primary">Oshxonamiz</span></>} subtitle="Sog'lom va mazali taomlar - o'quvchilarimizning energiyasi va diqqat-e'tibori garovi" />

        <div className="mb-8 md:mb-12 -mx-4 sm:-mx-6 md:-mx-8 md:mx-0 overflow-hidden md:rounded-2xl flex justify-center bg-emerald-50/30 dark:bg-emerald-900/10 py-4 md:py-6 px-4">
          <img
            src="/CookingTeam.webp"
            alt="Oshxona jamoasi"
            className="w-full max-w-md h-auto rounded-xl border border-transparent animate-neon-border"
          />
        </div>

        <div className="mb-16 md:mb-20">
          {foodGalleries.map((gallery) => (
            <FoodGalleryRow key={gallery.title} gallery={gallery} />
          ))}
        </div>

        <div>
          <h3 className="text-center text-xl md:text-2xl font-bold font-poppins text-white mb-8">Oshxona jamoasi</h3>
          <CardViewer items={staff.map((s) => <StaffCard key={s.name} s={s} />)} />
        </div>
      </section>
      <SectionNav />
    </PageWrapper>
  );
}
