import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SchoolLife from "@/components/SchoolLife";
import Testimonials from "@/components/Testimonials";
import Kitchen from "@/components/Kitchen";
import Results from "@/components/Results";
import Teachers from "@/components/Teachers";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();

function LandingPage() {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground font-sans overflow-x-hidden selection:bg-primary selection:text-primary-foreground relative">
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
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
