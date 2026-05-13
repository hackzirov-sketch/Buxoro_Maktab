import { PageWrapper, PageHeader } from "./Layout";
import SectionNav from "@/components/SectionNav";
import Kitchen from "@/components/Kitchen";
import CardViewer from "@/components/CardViewer";
import { motion } from "framer-motion";

const staff = [
  { name: "Gulnora Xasanova", role: "Oshpaz", desc: "18 yillik tajriba. Bolalar ovqatlanishi bo'yicha mutaxassis.", grad: "from-primary to-emerald-400" },
  { name: "Maftuna Sodiqova", role: "Oshpaz yordamchisi", desc: "5 yillik tajriba. Sog'lom ovqatlanish bo'yicha kurslar.", grad: "from-amber-400 to-orange-400" },
  { name: "Dilshod Ergashev", role: "Oshxona mudiri", desc: "8 yillik tajriba. Mahsulot sifati va sanitariya nazorati.", grad: "from-pink-400 to-rose-400" },
  { name: "Zulfiya Abdurahmonova", role: "Nonvoy", desc: "12 yillik tajriba. Pishiriq va non mahsulotlari bo'yicha mutaxassis.", grad: "from-sky-400 to-blue-400" },
  { name: "Shoxrux Mirzayev", role: "Farrosh", desc: "7 yillik tajriba. Oshxona tozaligi va gigiyena uchun mas'ul.", grad: "from-purple-400 to-violet-400" },
  { name: "Madina Rahmonova", role: "Sutli mahsulotlar bo'yicha oshpaz", desc: "6 yillik tajriba. Sutli taomlar va desertlar tayyorlash ustasi.", grad: "from-teal-400 to-cyan-400" },
];

const meals = [
  { name: "Nonushta", time: "07:30 – 08:30", items: ["Sutli bo'tqa", "Tuxum va sosiska", "Kruassan va choy"], img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80", grad: "from-amber-500/20 to-orange-500/10" },
  { name: "Tushlik", time: "12:30 – 13:30", items: ["Osh (Palov)", "Mastava", "Mavsumiy salat"], img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80", grad: "from-primary/20 to-emerald-600/10" },
  { name: "Tushdan keyin", time: "15:30 – 16:00", items: ["Tort va pirojnoe", "Muzqaymoq", "Meva salati"], img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80", grad: "from-pink-500/20 to-rose-500/10" },
];

function StaffCard({ s }: { s: typeof staff[0] }) {
  return (
    <div className="relative rounded-2xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm md:backdrop-blur-xl overflow-hidden h-full">
      <div className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${s.grad} opacity-[0.12]`} />
        <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
          <span className="text-4xl md:text-5xl font-bold text-white/15">{s.name.charAt(0)}</span>
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

function MealCard({ m }: { m: typeof meals[0] }) {
  return (
    <div className="relative rounded-[1.6rem] bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm md:backdrop-blur-xl overflow-hidden h-full">
      <div className="relative overflow-hidden aspect-[4/3]">
        <div className={`absolute inset-0 bg-gradient-to-br ${m.grad} z-[1]`} />
        <img src={m.img} alt={m.name} loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-[2]" />
      </div>
      <div className="p-3 md:p-4">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="text-white font-bold text-xs md:text-base">{m.name}</h3>
          <span className="text-primary text-[10px] md:text-xs font-semibold shrink-0">{m.time}</span>
        </div>
        <ul className="space-y-1">
          {m.items.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5 text-white/50 text-[10px] md:text-xs">
              <span className="w-1 h-1 rounded-full bg-primary/60 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function KitchenPage() {
  return (
    <PageWrapper>
      <section className="py-16 md:py-24">
        <PageHeader title={<>Bizning <span className="text-primary">Oshxonamiz</span></>} subtitle="Sog'lom va mazali taomlar — o'quvchilarimizning energiyasi va diqqat-e'tibori garovi" />

        {/* Daily menu */}
        <div className="mb-16 md:mb-20">
          <h3 className="text-center text-xl md:text-2xl font-bold font-poppins text-white mb-8">Kunlik menyu</h3>
          <CardViewer items={meals.map((m) => <MealCard key={m.name} m={m} />)} />
        </div>

        {/* Kitchen staff */}
        <div>
          <h3 className="text-center text-xl md:text-2xl font-bold font-poppins text-white mb-8">Oshxona jamoasi</h3>
          <CardViewer items={staff.map((s) => <StaffCard key={s.name} s={s} />)} />
        </div>

        {/* Full Kitchen menu book */}
        <div className="mt-16 md:mt-20">
          <Kitchen />
        </div>
      </section>
      <SectionNav />
    </PageWrapper>
  );
}
