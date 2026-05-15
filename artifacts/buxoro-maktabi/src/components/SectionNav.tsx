import { Link } from "wouter";
import { ArrowRight, Users, Building2, Utensils } from "lucide-react";

const links = [
  { label: "Jamoamiz", href: "/jamoa", icon: Users, color: "#059669" },
  { label: "Sinfxonalar", href: "/sinflar", icon: Building2, color: "#0284c7" },
  { label: "Oshxona", href: "/oshxona", icon: Utensils, color: "#d97706" },
];

export default function SectionNav() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 pb-10 md:pb-14">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-foreground/30">
            Boshqa bo'limlar
          </span>
          <div className="w-8 h-[2px] bg-primary/20 rounded-full mx-auto mt-2" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={l.href}
                className="group relative"
              >
                <div
                  className="relative overflow-hidden rounded-xl p-4 md:p-5 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: `linear-gradient(135deg, ${l.color}10, ${l.color}05)`,
                    border: `1px solid ${l.color}20`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${l.color}15 0%, transparent 70%)`,
                    }}
                  />
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-2.5 relative transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${l.color}25, ${l.color}10)`,
                      boxShadow: `0 0 20px ${l.color}15`,
                    }}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: l.color }} />
                  </div>
                  <span className="text-sm md:text-base font-semibold text-foreground/80 group-hover:text-foreground transition-colors duration-300 relative z-10">
                    {l.label}
                  </span>
                  <div className="flex items-center gap-1 mt-1.5 text-[10px] md:text-xs font-medium text-foreground/30 group-hover:text-primary transition-all duration-300 relative z-10">
                    <span>Ko'rish</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
