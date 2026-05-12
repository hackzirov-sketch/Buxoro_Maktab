import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import schoolGate from "@assets/image_1778575966057.png";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

function VideoCard({ src, title, description, delay }: { src: string; title: string; description: string; delay: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.94, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay }}
      className="flex flex-col items-center"
    >
      <div className="relative w-full max-w-[300px] mx-auto">
        <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-[3rem] pointer-events-none"></div>

        <motion.div
          whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 280, damping: 22 } }}
          className="relative rounded-[2.5rem] overflow-hidden border border-white/15 bg-black/50 shadow-[0_0_50px_rgba(0,0,0,0.5)] group"
        >
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-white/20 rounded-full z-20"></div>

          <div className="aspect-[9/16] w-full relative">
            <video
              ref={videoRef}
              src={src}
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              onEnded={() => setPlaying(false)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                onClick={togglePlay}
                data-testid="button-video-play"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-primary/50 hover:border-primary/60 transition-colors duration-300 shadow-[0_0_24px_rgba(74,222,128,0.35)]"
              >
                {playing
                  ? <Pause className="w-6 h-6 text-white" />
                  : <Play className="w-6 h-6 text-white ml-1" />
                }
              </motion.button>
            </div>

            <button
              onClick={toggleMute}
              data-testid="button-video-mute"
              className="absolute top-6 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-primary transition-colors border border-white/10"
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h4 className="text-white font-semibold text-base mb-1">{title}</h4>
              <p className="text-white/60 text-xs leading-relaxed">{description}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function SchoolLife() {
  return (
    <section id="maktab-hayoti" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
            className="text-4xl md:text-5xl font-bold font-poppins text-white mb-6"
          >
            Maktab <span className="text-primary drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">hayoti</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.12 }}
            className="text-base md:text-lg text-white/85 max-w-2xl mx-auto font-normal leading-[1.8]"
          >
            Zamonaviy infratuzilma, qulay sinfxonalar va xavfsiz muhit. O'quvchilarimiz uchun eng yaxshi sharoitlarni yaratganmiz.
          </motion.p>
        </div>

        {/* Wide banner image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
          className="relative rounded-[2.5rem] overflow-hidden group border border-white/10 mb-16"
        >
          <div className="aspect-[21/9] md:aspect-[21/8] w-full">
            <img
              src={schoolGate}
              alt="Buxoro Maktabi Darvozasi"
              className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.3 }}
            className="absolute bottom-0 left-0 right-0 p-8 md:p-12"
          >
            <div className="max-w-3xl">
              <h3 className="text-2xl font-bold text-white mb-2">Xavfsiz va shinam hudud</h3>
              <p className="text-white/80">
                Maktabimiz eng zamonaviy xavfsizlik tizimlari bilan jihozlangan. Keng va yashil maydon o'quvchilarning darsdan bo'sh vaqtlarini mazmunli o'tkazishlari uchun xizmat qiladi.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center gap-8 md:gap-12">
          <VideoCard
            src="/video1.mov"
            title="Maktab muhiti"
            description="O'quvchilarimizning kundalik hayotidan lavhalar"
            delay={0}
          />
          <VideoCard
            src="/video2.mov"
            title="Ta'lim jarayoni"
            description="Zamonaviy usullar bilan qurilgan dars mashg'ulotlari"
            delay={0.14}
          />
        </div>
      </div>
    </section>
  );
}
