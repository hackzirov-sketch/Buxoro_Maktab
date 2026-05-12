import { motion, useInView, useSpring, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { GraduationCap, Award, Globe, Users } from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

function Counter({ end, label, icon: Icon, suffix = "", duration = 2 }: {
  end: number; label: string; icon: any; suffix?: string; duration?: number;
}) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;
    const isFloat = !Number.isInteger(end);
    const controls = animate(0, end, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        setDisplay(isFloat ? v.toFixed(1) : Math.floor(v).toString());
      },
      onComplete() {
        setDisplay(isFloat ? end.toFixed(1) : end.toString());
      },
    });
    return () => controls.stop();
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 350, damping: 22 } }}
      className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group cursor-default"
    >
      <motion.div
        className="absolute inset-0 bg-primary/0 group-hover:bg-primary/6 transition-colors duration-500 rounded-3xl"
      />
      <div className="absolute -inset-1 rounded-[2rem] bg-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-400">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <div className="text-5xl font-bold text-white mb-2 font-poppins tabular-nums">
        {display}{suffix}
      </div>
      <p className="text-white/70 font-medium uppercase tracking-wider text-sm">{label}</p>
    </motion.div>
  );
}

export default function Results() {
  const timeline = [
    { year: "2021", title: "Maktab tashkil etildi", desc: "Zamonaviy ta'lim tizimi bilan Buxoroda o'z faoliyatini boshladi." },
    { year: "2022", title: "Xalqaro hamkorlik", desc: "Buyuk Britaniya va AQSh maktablari bilan tajriba almashish dasturi yo'lga qo'yildi." },
    { year: "2023", title: "100% Qabul", desc: "Ilk bitiruvchilarimiz 100% natija bilan xalqaro va mahalliy OTMlarga qabul qilindi." },
    { year: "2024", title: "Yangi bino va imkoniyatlar", desc: "Zamonaviy laboratoriyalar va IT markaziga ega yangi o'quv binosi ishga tushdi." }
  ];

  return (
    <section id="natijalar" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/3 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
            className="text-4xl md:text-5xl font-bold font-poppins text-white mb-6"
          >
            Bizning <span className="text-primary drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">Natijalarimiz</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.12 }}
            className="text-base md:text-lg text-white/85 max-w-2xl mx-auto font-normal leading-[1.8]"
          >
            Raqamlar gapirganda so'zlarga hojat yo'q. O'quvchilarimiz erishayotgan yutuqlar bizning asosiy g'ururimizdir.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <Counter end={7.5} label="O'rtacha IELTS" icon={Globe} suffix="+" duration={1.6} />
          <Counter end={1400} label="O'rtacha SAT" icon={Award} suffix="+" duration={1.9} />
          <Counter end={95} label="OTMga qabul" icon={GraduationCap} suffix="%" duration={1.7} />
          <Counter end={500} label="O'quvchilar" icon={Users} suffix="+" duration={2.1} />
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className="text-2xl md:text-3xl font-bold text-center text-white mb-12"
          >
            Rivojlanish <span className="text-primary">Yo'li</span>
          </motion.h3>

          <div className="relative">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.2 }}
              className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-primary/25 to-transparent transform md:-translate-x-1/2 origin-top"
            />

            <div className="flex flex-col gap-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.75, ease: EASE_OUT_EXPO, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row relative items-start md:items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className="hidden md:block w-1/2"></div>

                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: index * 0.1 + 0.2 }}
                    className="absolute left-0 md:left-1/2 top-1.5 md:top-auto transform md:-translate-x-1/2 w-10 h-10 rounded-full bg-background border-4 border-primary flex items-center justify-center shadow-[0_0_18px_rgba(74,222,128,0.6)] z-10"
                  >
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  </motion.div>

                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 350, damping: 22 } }}
                      className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/9 hover:border-primary/30 transition-colors duration-300"
                    >
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold mb-3">
                        {item.year}
                      </span>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
