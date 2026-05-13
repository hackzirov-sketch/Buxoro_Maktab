import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function PageHeader({ title, subtitle }: { title: React.ReactNode; subtitle?: string }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.75, ease: EASE }}
        className="text-4xl md:text-5xl font-bold font-poppins text-foreground mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
          className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto font-normal leading-[1.8]"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-[100dvh] w-full bg-background text-foreground font-sans overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      <div className="pt-20 md:pt-24">
        {children}
      </div>
    </main>
  );
}
