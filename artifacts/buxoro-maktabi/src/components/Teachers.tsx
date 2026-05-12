import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
const teacherRefImg = "/teacher-ref.png";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const teachers = [
  { name: "Alisher Rustamov", subject: "Matematika", exp: "12 yil tajriba" },
  { name: "Dilnoza Murodova", subject: "Ingliz tili", exp: "8 yil tajriba" },
  { name: "Sanjar Qodirov", subject: "Fizika", exp: "15 yil tajriba" },
  { name: "Malika Ismoilova", subject: "Kimyo", exp: "10 yil tajriba" },
  { name: "Javohir Olimov", subject: "Informatika", exp: "7 yil tajriba" },
  { name: "Nigora Aliyeva", subject: "Ona tili", exp: "20 yil tajriba" }
];

function TeacherCard({ teacher, index }: { teacher: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: index * 0.08 }}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center cursor-pointer group h-full"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-transparent rounded-3xl transition-colors duration-400 z-0"></div>
        <div className="absolute -inset-1 rounded-[2rem] bg-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>

        <div
          style={{ transform: "translateZ(40px)" }}
          className="w-32 h-32 rounded-full mb-6 relative z-10 p-1 bg-gradient-to-br from-white/20 to-white/5 group-hover:from-primary/50 group-hover:to-primary/10 transition-colors duration-400"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-black overflow-hidden flex items-center justify-center">
            <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"></div>
            <span className="absolute text-3xl font-bold text-white/50">{teacher.name.charAt(0)}</span>
          </div>
        </div>

        <div style={{ transform: "translateZ(24px)" }} className="text-center z-10">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">{teacher.name}</h3>
          <p className="text-primary/80 font-medium mb-1">{teacher.subject}</p>
          <p className="text-white/50 text-sm">{teacher.exp}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Teachers() {
  return (
    <section id="oqituvchilar" className="py-24 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
            className="text-4xl md:text-5xl font-bold font-poppins text-white mb-6"
          >
            Professional <span className="text-primary drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">O'qituvchilar</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.12 }}
            className="text-base md:text-lg text-white/85 max-w-2xl mx-auto font-normal leading-[1.8]"
          >
            Xalqaro toifadagi sertifikatlarga ega, o'z kasbining fidoiy mutaxassislari farzandingiz ta'limiga mas'uldir.
          </motion.p>
        </div>

        <div className="hidden">
          <img src={teacherRefImg} alt="Reference" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((t, idx) => (
            <TeacherCard key={idx} teacher={t} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
