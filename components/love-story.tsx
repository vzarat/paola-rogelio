import React from "react";

export default function LoveStory() {
  return (
    <section className="py-16 px-6 relative bg-white overflow-hidden border-t border-sepia-border">
      {/* Cobalt Monoline SVG Botanical Illustration - Top Left Corner */}
      <div className="absolute top-0 left-0 w-24 h-24 text-navy-primary/10 pointer-events-none select-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-[0.75]">
          <path d="M 0 0 C 30 10, 50 40, 40 70" />
          <path d="M 40 70 C 42 60, 52 58, 60 62 C 65 65, 62 70, 40 70 Z" fill="rgba(37, 99, 235, 0.03)" />
          <path d="M 20 15 C 32 18, 38 28, 32 38 C 28 42, 22 35, 20 15 Z" fill="rgba(37, 99, 235, 0.03)" />
          <path d="M 10 35 C 18 42, 14 55, 6 52 C 2 50, 4 40, 10 35 Z" fill="rgba(37, 99, 235, 0.03)" />
          <path d="M 30 50 C 45 42, 50 30, 42 24 C 36 20, 32 35, 30 50 Z" />
        </svg>
      </div>

      {/* Cobalt Monoline SVG Botanical Illustration - Bottom Right Corner */}
      <div className="absolute bottom-0 right-0 w-24 h-24 text-navy-primary/10 rotate-180 pointer-events-none select-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-[0.75]">
          <path d="M 0 0 C 30 10, 50 40, 40 70" />
          <path d="M 40 70 C 42 60, 52 58, 60 62 C 65 65, 62 70, 40 70 Z" fill="rgba(37, 99, 235, 0.03)" />
          <path d="M 20 15 C 32 18, 38 28, 32 38 C 28 42, 22 35, 20 15 Z" fill="rgba(37, 99, 235, 0.03)" />
          <path d="M 30 50 C 45 42, 50 30, 42 24 C 36 20, 32 35, 30 50 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-xs mx-auto text-center space-y-6">
        {/* Section script title */}
        <span className="font-script text-4xl text-royal-blue block">
          Our Love Story
        </span>

        <h3 className="font-serif text-xs uppercase tracking-[0.25em] text-navy-primary/70">
          HOW WE MET & CHOSE FOREVER
        </h3>

        <div className="w-12 border-b border-sepia-border mx-auto my-3" />

        {/* Narrative Paragraphs */}
        <p className="font-sans text-xs text-slate-blue leading-relaxed font-light">
          It all began in the fall of 2021, over a shared love for art, quiet coffee shops, and late-night walks. What started as simple conversations quickly blossomed into a beautiful partnership founded on faith, support, and deep joy.
        </p>

        <div className="py-2 flex justify-center">
          <svg className="w-6 h-6 text-royal-blue/30 fill-none stroke-current stroke-[1]" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <p className="font-sans text-xs text-slate-blue leading-relaxed font-light">
          Three years later, on a snowy evening overlooking the city lights, Ralph asked Olivia to spend the rest of her life by his side. We cannot wait to begin this new chapter and celebrate our covenant under God with you.
        </p>

        <div className="pt-4">
          <p className="font-script text-3xl text-navy-primary">
            Olivia & Ralph
          </p>
        </div>
      </div>
    </section>
  );
}
