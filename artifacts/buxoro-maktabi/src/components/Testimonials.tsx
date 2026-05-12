import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const testimonials = [
  {
    quote: "Farzandimning bilim olishiga bo'lgan ishtiyoqi ortdi. Buxoro Maktabidagi ustozlar juda mehribon va talabchan.",
    name: "Nodira Rahmatova",
    role: "Ota-ona"
  },
  {
    quote: "Maktabdagi zamonaviy laboratoriyalar va amaliy mashg'ulotlar fizika va kimyoni chuqurroq o'rganishimga yordam berdi.",
    name: "Sardor Aliyev",
    role: "O'quvchi"
  },
  {
    quote: "Ingliz tili darslari yuqori saviyada o'tiladi. IELTS dan qisqa vaqt ichida 7.5 ball olishimga sababchi bo'lgan maktab.",
    name: "Malika Karimova",
    role: "O'quvchi"
  },
  {
    quote: "Oshxonadagi ovqatlar juda mazali. O'qituvchilar bilan doimiy aloqada bo'lish tizimi ota-onalar uchun qulay.",
    name: "Jasur Qodirov",
    role: "Ota-ona"
  },
  {
    quote: "IT to'garaklari orqali dasturlash asoslarini o'rgandim. Maktab har tomonlama rivojlanish uchun barcha imkoniyatlarni beradi.",
    name: "Azizbek Umarov",
    role: "O'quvchi"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
            className="text-4xl md:text-5xl font-bold font-poppins text-white mb-6"
          >
            Mijozlar <span className="text-primary drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">fikri</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: EASE_OUT_EXPO }}
        >
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full max-w-5xl mx-auto relative"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((t, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
                  <motion.div
                    whileHover={{ y: -3, transition: { type: "spring", stiffness: 300, damping: 22 } }}
                    className="h-full p-5 sm:p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between hover:bg-white/8 hover:border-white/20 transition-all duration-300 group cursor-default"
                  >
                    <div>
                      <Quote className="w-8 h-8 md:w-10 md:h-10 text-primary/40 mb-5 md:mb-6 group-hover:text-primary transition-colors duration-300" />
                      <p className="text-white/80 text-base md:text-lg leading-relaxed italic mb-6 md:mb-8">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-emerald-800 p-[2px] shrink-0">
                        <div className="w-full h-full bg-background rounded-full flex items-center justify-center text-primary font-bold text-sm md:text-base">
                          {t.name.charAt(0)}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-white font-medium text-sm md:text-base truncate">{t.name}</h4>
                        <p className="text-primary/80 text-xs md:text-sm">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-3 md:gap-4 mt-8">
              <CarouselPrevious className="static transform-none bg-white/5 border-white/20 hover:bg-primary hover:text-black hover:border-primary text-white transition-all duration-250 w-10 h-10 rounded-full focus-visible:outline-2 focus-visible:outline-primary/60" />
              <CarouselNext className="static transform-none bg-white/5 border-white/20 hover:bg-primary hover:text-black hover:border-primary text-white transition-all duration-250 w-10 h-10 rounded-full focus-visible:outline-2 focus-visible:outline-primary/60" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
