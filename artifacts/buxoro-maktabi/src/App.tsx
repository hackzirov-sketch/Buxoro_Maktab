import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useScroll, useSpring, motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SchoolLife from "@/components/SchoolLife";
import Testimonials from "@/components/Testimonials";
import Kitchen from "@/components/Kitchen";
import Results from "@/components/Results";
import Teachers from "@/components/Teachers";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const queryClient = new QueryClient();

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-emerald-300 to-primary origin-left z-[9999] shadow-[0_0_8px_rgba(74,222,128,0.8)]"
    />
  );
}

function LandingPage() {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground font-sans overflow-x-hidden selection:bg-primary selection:text-primary-foreground relative">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <SchoolLife />
        <Testimonials />
        <Kitchen />
        <Results />
        <Teachers />
        <ApplicationForm />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LandingPage />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
