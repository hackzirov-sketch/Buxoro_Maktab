import { PageWrapper, PageHeader } from "./Layout";
import SectionNav from "@/components/SectionNav";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const EASE = [0.4, 0, 0.2, 1] as const;

const members = [
  { name: "Mamadaliyev Abdulaziz", role: "Jismoniy tarbiya o'qituvchisi", short: "10 yillik tajriba", full: "Sport ustasi. Basketbol, voleybol va yengil atletika bo'yicha murabbiy.", grad: "from-lime-400 to-green-400", image: "/GYM.jpg" },
  { name: "Xojimuratov Bekzod", role: "Milliy sertifikat o'qituvchisi", short: "A+ natija", full: "Milliy sertifikat natijasi A+. 10 dan oshiq o'quvchilarni yuqori natijalarga olib chiqqan.", grad: "from-primary to-emerald-400", image: "/History.jpg" },
  { name: "Umarov Zamira", role: "Boshlang'ich sinf ingliz tili o'qituvchisi", short: "Boshlang'ich ta'lim", full: "Ingliz tili fanidan boshlang'ich o'quvchilar uchun dars berishadi.", grad: "from-amber-400 to-orange-400", image: "/English 2.jpg" },
  { name: "Shodmatova Nozima", role: "Boshlang'ich sinf o'qituvchisi", short: "Boshlang'ich ta'lim", full: "Boshlang'ich o'quvchilar uchun o'qituvchi.", grad: "from-pink-400 to-rose-400", image: "/Boshlangich1.jpg" },
  { name: "Anorkulov Kamronbek", role: "Ingliz tili o'qituvchisi", short: "IELTS 8.0", full: "O'rta sinflar uchun ingliz tili fanidan dars berishadi. IELTS darajasi 8 bo'lgan yuqori malumotli o'qituvchilarimizdan biri.", grad: "from-primary to-emerald-400", image: "/English.jpg" },
  { name: "Mirzayeva Mohidil", role: "Boshlang'ich sinf o'qituvchisi", short: "Boshlang'ich ta'lim", full: "Boshlang'ich o'quvchilar uchun muallima.", grad: "from-teal-400 to-cyan-400", image: "/Boshlangich.jpg" },
  { name: "Otaboyeva Shaxnoza", role: "Rus tili o'qituvchisi", short: "Rus tili fani", full: "Rus tili fanidan dars berishadi.", grad: "from-purple-400 to-violet-400", image: "/Rus Tili.jpg" },
  { name: "Bekzod Rahimov", role: "Maktab direktori", short: "25 yillik tajriba", full: "25 yillik pedagogik va rahbarlik tajribasi.", grad: "from-sky-400 to-blue-400", image: "/Boshlangich3.jpg" },
  { name: "Mr. Sherzod", role: "Ingliz tili o'qituvchisi", short: "IELTS 7.5", full: "Yuqori sinflarni CEFR va IELTS imtihoniga tayyorlaydi. CEFR natijasi C1, IELTS 7.5.", grad: "from-primary to-emerald-400", image: "/Mr.Sherzod.JPEG" },
  { name: "Hakimbek Gʻulomjonov", role: "Huquq va ingliz tili fani oʻqituvchisi", short: "IELTS 7.0", full: "Toshkent davlat yuridik universiteti (2025). “Adolat-advokat” advokatlik firmasi advokat yordamchisi. Xitoy, Chongching shahrida stajirovka.", grad: "from-amber-400 to-orange-400", image: "/LawXuquq.jpg" },
];

function Card({ m, idx }: { m: typeof members[0]; idx: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="select-none cursor-pointer h-full" onClick={() => setExpanded((v) => !v)}>
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
              <img src={(m as any).image} alt={m.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                <span className="text-5xl md:text-6xl font-bold text-white/15 select-none">{m.name.charAt(0)}</span>
              </div>
            )}
          </div>
        </div>
        <div className="p-3 md:p-5 relative z-[2] bg-emerald-200/50 dark:bg-emerald-900/60">
          <h3 className="text-foreground font-bold text-xs md:text-base leading-tight mb-0.5 truncate">{m.name}</h3>
          <span className={`inline-block text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-1 md:mb-2 bg-clip-text text-transparent bg-gradient-to-r ${m.grad}`}>{m.role}</span>
          {expanded && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: EASE }}>
              <p className="text-foreground/70 text-[10px] md:text-xs leading-relaxed mt-2 pt-2 border-t border-emerald-200/30">{m.full}</p>
            </motion.div>
          )}
          {!expanded && <div className="flex items-center gap-1 mt-1.5"><span className="text-foreground/20 text-[9px] font-medium uppercase tracking-wider">Batafsil</span><ChevronRight className="w-2.5 h-2.5 text-foreground/20" /></div>}
        </div>
      </motion.div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <PageWrapper>
      <section className="py-16 md:py-24">
        <PageHeader title={<>Bizning <span className="text-primary">Jamoa</span></>} subtitle="Tajribali mutaxassislar jamoasi farzandingiz ta'limi va tarbiyasi uchun mas'uldir." />
        <div className="mb-8 md:mb-12 -mx-4 sm:-mx-6 md:-mx-8 md:mx-0 overflow-hidden md:rounded-2xl flex justify-center bg-emerald-50/30 dark:bg-emerald-900/10 py-4 md:py-6 px-4">
          <img
            src="/All.jpg"
            alt="Jamoa"
            className="w-full max-w-md h-auto rounded-xl border border-transparent animate-neon-border"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <Carousel opts={{ align: "start", loop: true }} autoPlay autoPlayInterval={3000} className="w-full">
            <CarouselContent>
              {members.map((m, idx) => (
                <CarouselItem key={m.name} className="basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <Card m={m} idx={idx} />
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
