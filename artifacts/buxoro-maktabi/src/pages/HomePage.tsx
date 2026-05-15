import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SchoolLife from "@/components/SchoolLife";
import Advantages from "@/components/Advantages";
import Roadmap from "@/components/Roadmap";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Map from "@/components/Map";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import FloatingCTA from "@/components/FloatingCTA";
import { useScroll, useSpring } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-emerald-300 to-primary origin-left z-[9999] shadow-[0_0_8px_rgba(34,197,94,0.6)] dark:shadow-[0_0_8px_rgba(74,222,128,0.8)]" />;
}

export default function HomePage() {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground font-sans overflow-x-hidden selection:bg-primary selection:text-primary-foreground relative">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Advantages />
        <SchoolLife />
        <Roadmap />
        <FAQ />
        <CTASection />
        <CTABanner />
        <Map />

      </main>
      <Footer />
      <ChatBot />
      <FloatingCTA />
    </div>
  );
}
