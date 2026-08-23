import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-between text-center min-h-[92vh] py-12 px-6 relative overflow-hidden select-none">
      {/* Editorial Decorative Frames */}
      <div className="absolute inset-4 border border-sepia-border pointer-events-none rounded-sm" />
      <div className="absolute inset-[18px] border border-dashed border-sepia-border/40 pointer-events-none rounded-sm" />

      {/* Header Editorial */}
      <div className="mt-8 flex flex-col items-center z-10 w-full">
        <p className="font-sans text-[10px] tracking-[0.35em] text-navy-primary/70 uppercase">
          NUESTRA BODA
        </p>

        {/* Decorative Entwined Monogram */}
        <div className="relative w-16 h-16 my-4 flex items-center justify-center">
          {/* Circular border wrapper */}
          <div className="absolute inset-0 rounded-full border border-navy-primary/20 animate-[spin_20s_linear_infinite]" />
          <span className="font-serif text-3xl font-light text-navy-primary tracking-wide relative select-none">
            P&R
          </span>
        </div>
      </div>

      {/* Main Couple Names */}
      <div className="flex flex-col items-center my-auto py-4 z-10">
        <h1 className="font-serif text-4xl tracking-widest text-navy-primary font-normal uppercase leading-tight">
          Paola
        </h1>
        <span className="font-script text-3xl text-royal-blue my-2">y</span>
        <h1 className="font-serif text-4xl tracking-widest text-navy-primary font-normal uppercase leading-tight">
          Rogelio
        </h1>
      </div>

      {/* Arch Cutout Hero Image */}
      <div className="relative w-56 h-72 my-4 z-10 flex items-center justify-center p-1 bg-white rounded-t-full shadow-lg border border-sepia-border">
        <div className="relative w-full h-full rounded-t-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop"
            alt="Paola y Rogelio Boda Portada"
            fill
            sizes="(max-w-md) 220px"
            priority
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>

      {/* Date Badge */}
      <div className="mb-4 z-10">
        <div className="flex items-center justify-center gap-4 py-2 px-6 bg-white/60 backdrop-blur-xs border border-sepia-border rounded-full font-serif text-sm font-semibold tracking-widest text-navy-primary shadow-xs">
          <span>MAY</span>
          <span className="w-px h-4 bg-navy-primary/20" />
          <span className="text-royal-blue text-base">18</span>
          <span className="w-px h-4 bg-navy-primary/20" />
          <span>2025</span>
        </div>
      </div>

      {/* Fine Typography Quote */}
      <div className="mb-8 px-4 z-10">
        <p className="font-script text-2xl text-navy-primary/80">
          "He encontrado al amor de mi vida."
        </p>
        <p className="font-sans text-[9px] tracking-widest text-slate-blue uppercase mt-1">
          — Cantares 3:4
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-2.5 flex flex-col items-center text-navy-primary/45 animate-bounce">
        <span className="text-[8px] tracking-[0.30em] uppercase font-sans mb-1">
          Desliza para entrar
        </span>
        <svg
          className="w-3.5 h-3.5 fill-none stroke-current stroke-2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
