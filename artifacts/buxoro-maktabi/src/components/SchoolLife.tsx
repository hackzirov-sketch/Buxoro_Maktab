import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import schoolGate from "@assets/image_1778575966057.png";

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className="relative rounded-3xl overflow-hidden border border-white/10 group bg-black/30"
    >
      <div className="aspect-[9/16] sm:aspect-video w-full relative">
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onEnded={() => setPlaying(false)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={togglePlay}
            data-testid="button-video-play"
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-primary/40 hover:border-primary/50 transition-all duration-300 hover:scale-110"
          >
            {playing ? <Pause className="w-7 h-7 text-white" /> : <Play className="w-7 h-7 text-white ml-1" />}
          </button>
        </div>

        <button
          onClick={toggleMute}
          data-testid="button-video-mute"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white transition-colors"
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h4 className="text-white font-semibold text-lg mb-1">{title}</h4>
        <p className="text-white/70 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

export default function SchoolLife() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold font-poppins text-white mb-6"
          >
            Maktab <span className="text-primary drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">hayoti</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Zamonaviy infratuzilma, qulay sinfxonalar va xavfsiz muhit. O'quvchilarimiz uchun eng yaxshi sharoitlarni yaratganmiz.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2.5rem] overflow-hidden group border border-white/10 mb-12"
        >
          <div className="aspect-[21/9] md:aspect-[21/8] w-full">
            <img
              src={schoolGate}
              alt="Buxoro Maktabi Darvozasi"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-3xl">
              <h3 className="text-2xl font-bold text-white mb-2">Xavfsiz va shinam hudud</h3>
              <p className="text-white/80">
                Maktabimiz eng zamonaviy xavfsizlik tizimlari bilan jihozlangan. Keng va yashil maydon o'quvchilarning darsdan bo'sh vaqtlarini mazmunli o'tkazishlari uchun xizmat qiladi.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            delay={0.15}
          />
        </div>
      </div>
    </section>
  );
}
