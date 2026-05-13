import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { Route, Switch } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import HomePage from "@/pages/HomePage";
import TeamPage from "@/pages/TeamPage";
import ClassroomsPage from "@/pages/ClassroomsPage";
import KitchenPage from "@/pages/KitchenPage";
import ResultsPage from "@/pages/ResultsPage";
import ArizaPage from "@/pages/ArizaPage";

const queryClient = new QueryClient();

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground font-sans overflow-x-hidden selection:bg-primary selection:text-primary-foreground relative">
      <Navbar />
      {children}
      <Footer />
      <ChatBot />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <TooltipProvider>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/jamoa">
              <PageShell><TeamPage /></PageShell>
            </Route>
            <Route path="/sinflar">
              <PageShell><ClassroomsPage /></PageShell>
            </Route>
            <Route path="/oshxona">
              <PageShell><KitchenPage /></PageShell>
            </Route>
            <Route path="/natijalar">
              <PageShell><ResultsPage /></PageShell>
            </Route>
            <Route path="/ariza">
              <PageShell><ArizaPage /></PageShell>
            </Route>
          </Switch>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
