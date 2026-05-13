import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  items: React.ReactNode[];
  className?: string;
}

export default function CardViewer({ items, className = "" }: Props) {
  const [idx, setIdx] = useState(0);
  const startX = useRef(0);
  const isSwiping = useRef(false);
  const total = items.length;

  const go = (dir: number) => {
    setIdx((prev) => {
      const next = prev + dir;
      if (next < 0) return total - 1;
      if (next >= total) return 0;
      return next;
    });
  };

  // Touch swipe
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

  if (total === 0) return null;

  return (
    <div className={`relative ${className}`}>
      <div id="card-viewer-track" className="overflow-hidden select-none">
        <div className="flex justify-center">
          {items[idx]}
        </div>
      </div>

      {/* Dots */}
      {total > 1 && (
        <div className="flex justify-center gap-1.5 mt-4">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`rounded-full transition-all duration-300 ${i === idx ? "w-4 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"}`}
              aria-label={`${i + 1}/${total}`}
            />
          ))}
        </div>
      )}

      {/* Prev/Next buttons */}
      {total > 1 && (
        <>
          <button onClick={() => go(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200 backdrop-blur-md"
            aria-label="Oldingi"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => go(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200 backdrop-blur-md"
            aria-label="Keyingi"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
}
