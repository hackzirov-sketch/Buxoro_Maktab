import { PageWrapper, PageHeader } from "./Layout";
import SectionNav from "@/components/SectionNav";
import CardViewer from "@/components/CardViewer";
import { motion } from "framer-motion";

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

const foodGalleries = [
  {
    title: "Maktabgacha tayyorlov nonushtasi",
    subtitle: "Nolavoylar uchun nonushta lavhalari",
    images: [
      { title: "Sutli bo'tqa va shokoladli pishiriq", src: "/Nolavoylarga%20Nonushta%20uchun/photo_2026-05-21_16-34-34%20(2).webp" },
      { title: "Sutli bo'tqa, bulochka va ichimliklar", src: "/Nolavoylarga%20Nonushta%20uchun/photo_2026-05-21_16-34-36.webp" },
      { title: "Suli bo'tqa va nonushta nonlari", src: "/Nolavoylarga%20Nonushta%20uchun/photo_2026-05-21_16-34-42.webp" },
      { title: "Sutli nonushta va issiq choy", src: "/Nolavoylarga%20Nonushta%20uchun/photo_2026-05-21_16-34-50.webp" },
      { title: "Bo'tqa va shirin ichimliklar", src: "/Nolavoylarga%20Nonushta%20uchun/photo_2026-05-21_16-34-57.webp" },
      { title: "Sharbat va keksli nonushta", src: "/Nolavoylarga%20Nonushta%20uchun/photo_2026-05-21_16-34-59.webp" },
      { title: "Sutli bo'tqa va bulochka assortisi", src: "/Nolavoylarga%20Nonushta%20uchun/photo_2026-05-21_16-37-12.webp" },
    ],
  },
  {
    title: "Tushlik",
    subtitle: "Issiq taom va kunlik tushliklar",
    images: [
      { title: "Sho'rva, salat va nonli tushlik", src: "/Tushlik/photo_2026-05-21_16-34-33.webp" },
      { title: "Go'shtli taom va sabzavotli garnir", src: "/Tushlik/photo_2026-05-21_16-34-35.webp" },
      { title: "Kartoshkali sho'rva va salat", src: "/Tushlik/photo_2026-05-21_16-34-37.webp" },
      { title: "Mastava, qatiq va salat", src: "/Tushlik/photo_2026-05-21_16-34-39.webp" },
      { title: "Issiq sho'rva va vitaminli salat", src: "/Tushlik/photo_2026-05-21_16-34-41.webp" },
      { title: "Makaronli tushlik va ichimliklar", src: "/Tushlik/photo_2026-05-21_16-34-44.webp" },
      { title: "Go'shtli taom va non", src: "/Tushlik/photo_2026-05-21_16-34-45.webp" },
      { title: "Tovuq sho'rva va ko'katli salat", src: "/Tushlik/photo_2026-05-21_16-34-47.webp" },
      { title: "Grechka, qatiq va foydali salat", src: "/Tushlik/photo_2026-05-21_16-34-48.webp" },
      { title: "Sabzavotli sho'rva va salat", src: "/Tushlik/photo_2026-05-21_16-34-49.webp" },
      { title: "Kartoshkali issiq taom va non", src: "/Tushlik/photo_2026-05-21_16-34-51.webp" },
      { title: "Palov, salat va non assortisi", src: "/Tushlik/photo_2026-05-21_16-34-53.webp" },
      { title: "Guruchli taom va sho'rva", src: "/Tushlik/photo_2026-05-21_16-34-55.webp" },
      { title: "Rang-barang tushlik to'plami", src: "/Tushlik/photo_2026-05-21_16-34-56.webp" },
      { title: "Makaronli garnir va ko'k choy", src: "/Tushlik/photo_2026-05-21_16-35-00.webp" },
      { title: "Sho'rva va sabzavotli likopcha", src: "/Tushlik/photo_2026-05-21_16-35-03.webp" },
      { title: "Grechkali tushlik va non", src: "/Tushlik/photo_2026-05-21_16-35-04.webp" },
      { title: "Sho'rva, qatiq va salat", src: "/Tushlik/photo_2026-05-21_16-35-06.webp" },
      { title: "Kartoshkali sho'rva va sabzavotlar", src: "/Tushlik/photo_2026-05-21_16-35-24.webp" },
      { title: "Issiq tushlik va mevali ichimlik", src: "/Tushlik/photo_2026-05-21_16-36-52.webp" },
    ],
  },
  {
    title: "Poldnik",
    subtitle: "Tushdan keyingi yengil ovqatlar",
    images: [
      { title: "Shokoladli desert va choy", src: "/Poldnik/photo_2026-05-21_16-34-34.webp" },
      { title: "Yumshoq bulochkalar", src: "/Poldnik/photo_2026-05-21_16-34-38.webp" },
      { title: "Jemli shirin pishiriqlar", src: "/Poldnik/photo_2026-05-21_16-34-41.webp" },
      { title: "Qatlama va issiq ichimlik", src: "/Poldnik/photo_2026-05-21_16-34-43.webp" },
      { title: "Uy uslubidagi bulochkalar", src: "/Poldnik/photo_2026-05-21_16-34-44.webp" },
      { title: "Shakar sepilgan qatlama", src: "/Poldnik/photo_2026-05-21_16-34-46.webp" },
      { title: "Somsa va rangli choylar", src: "/Poldnik/photo_2026-05-21_16-34-49.webp" },
      { title: "Tvorogli shirin bulochka", src: "/Poldnik/photo_2026-05-21_16-34-52%20(2).webp" },
      { title: "Tvorogli bulochkalar", src: "/Poldnik/photo_2026-05-21_16-34-52.webp" },
      { title: "Mevali rulet va choy", src: "/Poldnik/photo_2026-05-21_16-34-54.webp" },
      { title: "Bulochka va mevali ichimlik", src: "/Poldnik/photo_2026-05-21_16-35-01.webp" },
      { title: "Shirin ruletchalar assortisi", src: "/Poldnik/photo_2026-05-21_16-35-02.webp" },
      { title: "Burgercha va issiq choy", src: "/Poldnik/photo_2026-05-21_16-37-09.webp" },
      { title: "Shokoladli pirog", src: "/Poldnik/photo_2026-05-21_16-37-15.webp" },
      { title: "Suli yormali poldnik", src: "/Poldnik/photo_2026-05-21_16-37-18.webp" },
      { title: "Lavash va choy", src: "/Poldnik/photo_2026-05-21_16-41-43.webp" },
    ],
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

function FoodGalleryRow({ gallery }: { gallery: typeof foodGalleries[0] }) {
  return (
    <div className="mb-12 md:mb-14">
      <div className="mb-5 md:mb-6 text-center">
        <h3 className="text-xl md:text-2xl font-bold font-poppins text-white">{gallery.title}</h3>
        <p className="mt-1 text-xs md:text-sm text-white/45">{gallery.subtitle}</p>
      </div>
      <CardViewer
        perPage={4}
        items={gallery.images.map((image) => (
          <FoodPhotoCard key={image.src} image={image} />
        ))}
      />
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
