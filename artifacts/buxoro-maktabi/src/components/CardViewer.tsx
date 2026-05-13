import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  items: React.ReactNode[];
  className?: string;
  perPage?: number;
}

export default function CardViewer({ items, className = "", perPage = 4 }: Props) {
  const [page, setPage] = useState(0);
  const startX = useRef(0);
  const isSwiping = useRef(false);
  const totalPages = Math.ceil(items.length / perPage);

  const go = (dir: number) => {
    setPage((prev) => {
      const next = prev + dir;
      if (next < 0) return totalPages - 1;
      if (next >= totalPages) return 0;
      return next;
    });
  };

  useEffect(() => {
    const el = document.getElementById("card-viewer-track");
    if (!el) return;
    const onTouchStart = (e: TouchEvent) => { startX.current = e.touches[0].clientX; isSwiping.current = false; };
    const onTouchMove = (e: TouchEvent) => {
      if (Math.abs(e.touches[0].clientX - startX.current) > 10) isSwiping.current = true;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!isSwiping.current) return;
      const dx = e.changedTouches[0].clientX - startX.current;
      if (dx > 40) go(-1);
      else if (dx < -40) go(1);
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => { el.removeEventListener("touchstart", onTouchStart); el.removeEventListener("touchmove", onTouchMove); el.removeEventListener("touchend", onTouchEnd); };
  }, []);

  if (items.length === 0) return null;

  const start = page * perPage;
  const pageItems = items.slice(start, start + perPage);

  return (
    <div className={`relative ${className}`}>
      <div id="card-viewer-track" className="overflow-hidden select-none">
        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {pageItems.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <>
          <div className="flex justify-center gap-1.5 mt-5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`rounded-full transition-all duration-300 ${i === page ? "w-5 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-foreground/20 hover:bg-foreground/40"}`}
                aria-label={`${i + 1}/${totalPages}`}
              />
            ))}
          </div>
          <button onClick={() => go(-1)}
            className="absolute left-2 top-1/3 -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-white/10 transition-all duration-200 backdrop-blur-md"
            aria-label="Oldingi"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => go(1)}
            className="absolute right-2 top-1/3 -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-white/10 transition-all duration-200 backdrop-blur-md"
            aria-label="Keyingi"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
}
