import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const certificates = [
  { name: "Abdulloh", image: "/results/abdulloh.jpg" },
  { name: "Axmadbek", image: "/results/axmadbek.jpg" },
  { name: "Azizbek", image: "/results/Azizbek_page-0001.jpg" },
  { name: "Durdona", image: "/results/Durdona_page-0001.jpg" },
  { name: "Ezoz", image: "/results/Ezoz_page-0001.jpg" },
  { name: "Ibrohim", image: "/results/Ibrohim_page-0001.jpg" },
  { name: "Kamron", image: "/results/Kamron_page-0001.jpg" },
  { name: "Rashida", image: "/results/rashida.jpg" },
  { name: "Ulug'bek", image: "/results/Ulug_page-0001.jpg" },
];

export default function CertificatesPage() {
  const plugin = useRef(Autoplay({ delay: 2500, stopOnInteraction: false }));

  return (
    <section className="min-h-screen py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-emerald-50/80 via-white to-emerald-50/60 dark:from-emerald-950/20 dark:via-background dark:to-emerald-950/10">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-300/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-teal-300/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.06] rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 w-full px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 dark:text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
            Sertifikatlar
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-poppins text-foreground mb-4">
            O'quvchilarimizning <span className="text-yellow-500">Yutuqlari</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Bitiruvchilarimiz xalqaro imtihonlarda yuqori natijalarga erishmoqda
          </p>
        </div>

        <Carousel
          plugins={[plugin.current]}
          opts={{ loop: true, align: "center" }}
          className="w-full"
        >
          <CarouselContent>
            {certificates.map((cert, idx) => (
              <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                <div className="group relative overflow-hidden rounded-3xl bg-white/60 dark:bg-emerald-950/30 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] cursor-pointer">
                  {/* Yellow gold neon border */}
                  <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 opacity-40 group-hover:opacity-80 blur-[2px] group-hover:blur-[3px] transition-all duration-500 animate-neon-border pointer-events-none" />
                  <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 opacity-0 group-hover:opacity-60 blur-[6px] transition-all duration-500 pointer-events-none" />
                  <div className="absolute -inset-[3px] rounded-3xl bg-gradient-to-br from-transparent via-yellow-300/20 to-transparent opacity-0 group-hover:opacity-40 blur-[8px] transition-all duration-500 pointer-events-none animate-pulse" />

                  {/* Inner content */}
                  <div className="relative z-10 rounded-3xl overflow-hidden">
                    <div className="aspect-[3/4] sm:aspect-[4/5] w-full relative overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-5">
                      <h3 className="text-white font-bold text-sm md:text-lg drop-shadow-lg">{cert.name}</h3>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="-left-3 sm:-left-5 h-10 w-10 sm:h-12 sm:w-12 bg-white/80 dark:bg-emerald-900/60 backdrop-blur-xl border border-yellow-400/30 dark:border-yellow-500/30 shadow-lg text-foreground/60 hover:text-yellow-600 hover:bg-white hover:shadow-xl hover:border-yellow-500 transition-all duration-300" />
          <CarouselNext className="-right-3 sm:-right-5 h-10 w-10 sm:h-12 sm:w-12 bg-white/80 dark:bg-emerald-900/60 backdrop-blur-xl border border-yellow-400/30 dark:border-yellow-500/30 shadow-lg text-foreground/60 hover:text-yellow-600 hover:bg-white hover:shadow-xl hover:border-yellow-500 transition-all duration-300" />
        </Carousel>
      </div>
    </section>
  );
}
