import { PageWrapper, PageHeader } from "./Layout";
import SectionNav from "@/components/SectionNav";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const EASE = [0.4, 0, 0.2, 1] as const;

const members = [
  { name: "Direktor", role: "Maktab direktori", short: "Rahbar va matematika mutaxassisi", full: "Oliy ma'lumotli rahbar. 7 yillik ish tajribasiga ega, matematika fanidan 5 yil dars bergan. Matematikadan A darajali sertifikat sohibi. 100 dan ortiq o'quvchining TDM va milliy sertifikatlarda yuqori natija qo'lga kiritishiga ko'maklashgan. 2 yil boshqaruv tizimida faoliyat yuritgan.", grad: "from-primary to-emerald-400", image: "/Direktor.webp" },
  { name: "Akmal To'lkinovich", role: "Direktor o'rinbosari", short: "11 yillik tajriba", full: "Akmal To'lkinovich - oliy ma'lumotli mutaxassis. 11 yillik ish tajribasiga ega, direktor o'rinbosari lavozimida 4 yil faoliyat yuritgan. O'nlab ustozlarning oliy toifa va milliy sertifikatlarga ega bo'lishiga hissa qo'shgan.", grad: "from-teal-400 to-cyan-400", image: "/Akmal-Tolkinovich.webp" },
  { name: "Faxriyor G'iyosov", role: "Boshqaruv jamoasi", short: "Ta'lim va boshqaruv tajribasi", full: "Ta'lim sifati, intizom, ustozlar rivoji va o'quvchilar natijalarini doimiy nazorat qiladigan boshqaruv jamoasi vakili. Har bir yo'nalishda tizimli yondashuv va mas'uliyatli boshqaruvni yo'lga qo'yishda faol ishtirok etadi.", grad: "from-sky-400 to-blue-400", image: "/Faxriyor-Giyosov.webp" },
  { name: "Saydullayev Abdumumin", role: "Matematika o'qituvchisi", short: "3 karra A+ va SAT 700", full: "Oliy ma'lumotli matematika o'qituvchisi. Milliy sertifikatni uch marta A+ darajada qo'lga kiritgan. SAT matematika bo'limidan 700 ball olgan. 5 yillik tajribaga ega, shogirdlari A va A+ natijalarga erishgan.", grad: "from-lime-400 to-green-400", image: "/Math.webp" },
  { name: "Mamadaliyev Abdulaziz", role: "Jismoniy tarbiya o'qituvchisi", short: "6 yillik tajriba", full: "Sport murabbiyligi bo'yicha sertifikatga ega. 2025-yilda futbol bo'yicha DXX kubogi chempioni, stol tennisi bo'yicha viloyat chempioni. Futbol, stol tennisi, shaxmat va badminton bo'yicha mahoratli murabbiy. 6 yillik tajribaga ega.", grad: "from-sky-400 to-blue-400", image: "/GYM.webp" },
  { name: "Xojimuratov Bekzod", role: "Milliy sertifikat o'qituvchisi", short: "A+ darajadagi mutaxassis", full: "Oliy ma'lumotli ustoz. Milliy sertifikati A+ darajada. Shogirdlarini 100 foiz A va A+ natijalarga olib chiqqan. 6 yillik tajribaga ega.", grad: "from-primary to-emerald-400", image: "/History.webp" },
  { name: "Umarov Zamira", role: "Boshlang'ich sinf ingliz tili o'qituvchisi", short: "IELTS 6.5, rus tili C1", full: "Rossiyada pedagogika yo'nalishida tahsil olgan. IELTS 6.5, rus tili darajasi C1. 3 yillik tajribaga ega, yuzlab o'quvchilarga ustozlik qilgan.", grad: "from-amber-400 to-orange-400", image: "/English 2.webp" },
  { name: "Shodmatova Nozima", role: "Boshlang'ich sinf o'qituvchisi", short: "36 yillik tajriba", full: "36 yillik tajribaga ega boshlang'ich sinf ustozi. Minglab o'quvchilarga ta'lim bergan, shogirdlari nufuzli ta'lim muassasalari va ish joylarida faoliyat yuritmoqda.", grad: "from-pink-400 to-rose-400", image: "/Boshlangich1.webp" },
  { name: "Anorkulov Kamronbek", role: "Ingliz tili o'qituvchisi", short: "IELTS overall 8.0", full: "IELTS overall 8.0, Reading va Listening bo'limlaridan 8.5 ball olgan. 4 yillik tajribaga ega. O'quvchilari IELTS 7.0 va 7.5 natijalariga erishgan.", grad: "from-primary to-emerald-400", image: "/English.webp" },
  { name: "Mirzayeva Mohidil Abdunaviyevna", role: "Boshlang'ich sinf o'qituvchisi", short: "1-toifali ustoz", full: "Oliy ma'lumotli, 1-toifali boshlang'ich sinf o'qituvchisi. 8 yillik ish tajribasiga ega. O'quvchilari fan olimpiadalarida a'lo natijalarni qayd etgan.", grad: "from-teal-400 to-cyan-400", image: "/Boshlangich.webp" },
  { name: "Otaboyeva Shaxnoza", role: "Rus tili o'qituvchisi", short: "Rus tilidan C1", full: "Oliy ma'lumotli rus tili o'qituvchisi. Rus tilidan C1 sertifikatiga ega. 7 yillik ish tajribasiga ega, yuzlab o'quvchilarga rus tilini mukammal o'zlashtirishda yordam bergan.", grad: "from-purple-400 to-violet-400", image: "/Rus Tili.webp" },
  { name: "Raxmatkulova Saboat Berdikulovna", role: "Oliy toifali boshlang'ich sinf o'qituvchisi", short: "30 yillik tajriba", full: "Oliy ma'lumotli, oliy toifali ustoz. 30 yillik tajribaga ega. O'quvchilari fan olimpiadalarida yuqori natijalar qayd etgan. 4 ta sinfni 1-sinfdan 4-sinfgacha yetaklab ta'lim bergan.", grad: "from-sky-400 to-blue-400", image: "/Boshlangich3.webp" },
  { name: "Mr. Sherzod", role: "Ingliz tili o'qituvchisi", short: "5 yillik tajriba", full: "5 yillik tajribaga ega ingliz tili o'qituvchisi. O'quvchilarni qisqa vaqt ichida yuqori natijalarga olib chiqishi bilan tanilgan.", grad: "from-primary to-emerald-400", image: "/Mr.Sherzod.webp" },
  { name: "Hakimbek G'ulomjonov", role: "Huquq va ingliz tili o'qituvchisi", short: "IELTS 7.0", full: "IELTS 7.0 darajasiga ega huquq va ingliz tili o'qituvchisi. O'quvchilarga huquqiy savodxonlik va ingliz tilini tizimli o'rgatadi.", grad: "from-amber-400 to-orange-400", image: "/LawXuquq.webp" },
  { name: "Haqberdiyev Asadbek", role: "Ona tili o'qituvchisi", short: "A sertifikat va turk tili B2", full: "Oliy ma'lumotli, 2-toifali ona tili o'qituvchisi. 4 yillik tajribaga ega. Ona tilidan A daraja va turk tilidan B2 sertifikat sohibi. 20 dan ortiq o'quvchini turk tili va milliy sertifikat yo'nalishlarida yuqori natijaga olib chiqqan.", grad: "from-primary to-emerald-400", image: "/Asadbek-Haqberdiyev.webp" },
  { name: "Teshayev Feruzbek", role: "Matematika o'qituvchisi", short: "Prezident maktablariga tayyorlov", full: "Oliy ma'lumotli matematika o'qituvchisi. 3 yillik tajribaga ega. Prezident, Al-Xorazmiy va ixtisoslashtirilgan maktablar imtihonlariga tayyorlashda kuchli mutaxassis.", grad: "from-lime-400 to-green-400", image: "/Teshayev-Feruzbek.webp" },
  { name: "Islom Qahhoraliyev", role: "Fizika va matematika o'qituvchisi", short: "2 fandan sertifikat", full: "Oliy ma'lumotli matematika va fizika o'qituvchisi. Har ikki fandan sertifikatga ega: matematikadan A daraja, fizikadan yuqori natijalarni qo'lga kiritgan. 5 yillik tajribaga ega, 30 dan ortiq o'quvchini yuqori natijaga olib chiqqan.", grad: "from-sky-400 to-blue-400", image: "/Islom%20Qahhoraliyev.webp" },
  { name: "Samijon ustoz", role: "Tarbiya fani o'qituvchisi", short: "Arab va ingliz tillari", full: "Samijon ustoz - oliy ma'lumotli tarbiya fani o'qituvchisi. Arab va ingliz tillarida erkin muloqot qila oladi. 2017-2021-yillarda O'zbekiston Xalqaro Islom Akademiyasida din sotsiopsixologiyasi yo'nalishida tahsil olgan. 2021-2023-yillarda Mirzo Ulug'bek maktabida o'qituvchi bo'lib ishlagan, 2023-2025-yillarda Saudiya Arabistonining Makka shahrida faoliyat olib borgan.", grad: "from-amber-400 to-orange-400", image: "/Tarbiya-ustoz.webp" },
];

function Card({ m, expanded, onToggle }: { m: typeof members[0]; expanded: boolean; onToggle: () => void }) {
  return (
    <div className="select-none cursor-pointer h-full" onClick={onToggle}>
      <motion.div
        animate={{ scale: expanded ? 1.03 : 1, y: expanded ? -4 : 0 }}
        whileHover={{ scale: 1.02, y: -3 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative rounded-2xl bg-emerald-200/30 dark:bg-emerald-900/40 backdrop-blur-sm md:backdrop-blur-xl border border-emerald-300/40 dark:border-emerald-800/50 shadow-sm hover:shadow-lg overflow-hidden will-change-transform"
      >
        <motion.div animate={{ opacity: expanded ? 1 : 0 }} transition={{ duration: 0.35 }}
          className="absolute -inset-1 rounded-[1.4rem] bg-primary/[0.12] blur-lg md:blur-xl -z-10 pointer-events-none" />
        <div className="relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${m.grad} opacity-[0.15] z-[1]`} />
          <div className="aspect-[4/5] relative overflow-hidden">
            {(m as any).image ? (
              <img src={(m as any).image} alt={m.name} title={m.full} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                <span className="text-5xl md:text-6xl font-bold text-white/15 select-none">{m.name.charAt(0)}</span>
              </div>
            )}
          </div>
        </div>
        <div className="p-4 md:p-5 relative z-[2] bg-emerald-200/50 dark:bg-emerald-900/60">
          <h3 className="text-foreground font-bold text-base md:text-lg leading-tight mb-1 truncate">{m.name}</h3>
          <span className={`inline-block text-xs md:text-sm font-semibold uppercase tracking-wider mb-1 md:mb-2 bg-clip-text text-transparent bg-gradient-to-r ${m.grad}`}>{m.role}</span>
          {!expanded && (
            <p className="text-foreground/65 text-sm md:text-base leading-snug mt-1 min-h-[2.8rem] line-clamp-2">{m.short}</p>
          )}
          {expanded && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: EASE }}>
              <p className="text-foreground/75 text-sm md:text-base leading-relaxed mt-2 pt-2 border-t border-emerald-200/30">{m.full}</p>
            </motion.div>
          )}
          {!expanded && <div className="flex items-center gap-1 mt-2"><span className="text-foreground/35 text-[11px] md:text-xs font-medium uppercase tracking-wider">Batafsil</span><ChevronRight className="w-3 h-3 text-foreground/35" /></div>}
        </div>
      </motion.div>
    </div>
  );
}

export default function TeamPage() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <PageWrapper>
      <section className="py-16 md:py-24">
        <PageHeader title={<>Bizning <span className="text-primary">Jamoa</span></>} subtitle="Tajribali mutaxassislar jamoasi farzandingiz ta'limi va tarbiyasi uchun mas'uldir." />
        <div className="mb-8 md:mb-12 -mx-4 sm:-mx-6 md:-mx-8 md:mx-0 overflow-hidden md:rounded-2xl flex justify-center bg-emerald-50/30 dark:bg-emerald-900/10 py-4 md:py-6 px-4">
          <img
            src="/all.webp"
            alt="Jamoa"
            className="w-full max-w-md h-auto rounded-xl border border-transparent animate-neon-border"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <Carousel opts={{ align: "start", loop: true }} autoPlay autoPlayInterval={3000} autoPlayPaused={expandedCard !== null} className="w-full">
            <CarouselContent>
              {members.map((m) => (
                <CarouselItem key={m.name} className="basis-full sm:basis-full md:basis-1/3 lg:basis-1/4">
                  <Card
                    m={m}
                    expanded={expandedCard === m.name}
                    onToggle={() => setExpandedCard((current) => current === m.name ? null : m.name)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-3 sm:-left-5 h-10 w-10 sm:h-12 sm:w-12 bg-white/80 backdrop-blur-2xl border border-primary/40 shadow-lg text-primary hover:bg-primary hover:text-white hover:border-primary hover:scale-110 hover:shadow-xl transition-all duration-300 z-10" />
            <CarouselNext className="-right-3 sm:-right-5 h-10 w-10 sm:h-12 sm:w-12 bg-white/80 backdrop-blur-2xl border border-primary/40 shadow-lg text-primary hover:bg-primary hover:text-white hover:border-primary hover:scale-110 hover:shadow-xl transition-all duration-300 z-10" />
          </Carousel>
        </div>
      </section>
      <SectionNav />
    </PageWrapper>
  );
}
