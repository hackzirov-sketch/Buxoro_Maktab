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
