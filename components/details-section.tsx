import React from "react";

export default function DetailsSection() {
  return (
    <section className="py-16 px-6 relative bg-white border-t border-[#E5E0D8]">
      {/* Editorial Decorative Corner Lines */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-navy-primary/20" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-navy-primary/20" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-navy-primary/20" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-navy-primary/20" />

      {/* Parents Section */}
      <div className="text-center mb-14">
        <span className="font-script text-4xl text-navy-primary block mb-4">
          Con la bendición de nuestros padres
        </span>
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-xs tracking-wider text-navy-primary/80 font-sans mt-2">
          <div>
            <p className="font-semibold uppercase mb-1">Padres de la Novia</p>
            <p>Mauricio Zaragoza</p>
            <p>Paola Mondragón</p>
          </div>
          <div>
            <p className="font-semibold uppercase mb-1">Padres del Novio</p>
            <p>Rogelio Ramos</p>
            <p>Gabriela Martínez</p>
          </div>
        </div>
      </div>

      <div className="editorial-divider my-8" />

      {/* Events Timeline / Details */}
      <div className="space-y-12">
        {/* Ceremony Detail */}
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-warm-crema border border-navy-primary/10 mb-4">
            <svg
              className="w-6 h-6 text-navy-primary stroke-current fill-none stroke-[1.5]"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <h3 className="font-serif text-xl font-bold text-navy-primary uppercase tracking-widest">
            Ceremonia Religiosa
          </h3>
          <p className="font-script text-3xl text-navy-primary/70 my-1">
            Parroquia de San Francisco
          </p>
          <p className="font-sans text-sm text-navy-primary/80 mt-2 font-light">
            Hora: 16:30 hrs
          </p>
          <p className="font-sans text-xs text-navy-primary/60 max-w-[280px] mt-1">
            Calle de San Francisco s/n, Centro, Valle de Bravo, Estado de México
          </p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-4 py-1.5 rounded-full border border-navy-primary/20 text-xs font-semibold uppercase tracking-wider text-navy-primary hover:bg-navy-primary hover:text-white transition-all duration-300 shadow-xs"
          >
            Ver Ubicación
          </a>
        </div>

        {/* Reception Detail */}
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-warm-crema border border-navy-primary/10 mb-4">
            <svg
              className="w-6 h-6 text-navy-primary stroke-current fill-none stroke-[1.5]"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h3 className="font-serif text-xl font-bold text-navy-primary uppercase tracking-widest">
            Recepción y Fiesta
          </h3>
          <p className="font-script text-3xl text-navy-primary/70 my-1">
            Jardín Vista Hermosa
          </p>
          <p className="font-sans text-sm text-navy-primary/80 mt-2 font-light">
            Hora: 18:00 hrs
          </p>
          <p className="font-sans text-xs text-navy-primary/60 max-w-[280px] mt-1">
            Av. del Parque #104, El Cerrillo, Valle de Bravo, Estado de México
          </p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-4 py-1.5 rounded-full border border-navy-primary/20 text-xs font-semibold uppercase tracking-wider text-navy-primary hover:bg-navy-primary hover:text-white transition-all duration-300 shadow-xs"
          >
            Ver Ubicación
          </a>
        </div>
      </div>

      <div className="editorial-divider my-10" />

      {/* Dress Code Section */}
      <div className="flex flex-col items-center text-center py-4 bg-warm-crema/40 rounded-lg border border-navy-primary/5 px-4 max-w-sm mx-auto">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-xs border border-navy-primary/5 mb-3">
          <svg
            className="w-5 h-5 text-navy-primary fill-none stroke-current stroke-2"
            viewBox="0 0 24 24"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
        <h4 className="font-serif text-base font-bold uppercase tracking-widest text-navy-primary">
          Código de Vestimenta
        </h4>
        <p className="font-script text-2xl text-navy-primary/80 my-1">
          Formal Playero / Hacienda
        </p>
        <p className="font-sans text-xs text-navy-primary/60 mt-1 max-w-[260px] leading-relaxed">
          Sugerimos colores frescos de día. Los tonos azul claro, beige, crema y olivo son muy bienvenidos.
        </p>
      </div>

      <div className="editorial-divider my-10" />

      {/* Gift Table Section */}
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-warm-crema border border-navy-primary/10 mb-4">
          <svg
            className="w-6 h-6 text-navy-primary fill-none stroke-current stroke-[1.5]"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="8" width="18" height="14" rx="2" />
            <path d="M12 5V3m0 2a3 3 0 100-6 3 3 0 000 6zM3 8h18" />
          </svg>
        </div>
        <h3 className="font-serif text-lg font-bold text-navy-primary uppercase tracking-widest">
          Mesa de Regalos
        </h3>
        <p className="font-sans text-xs text-navy-primary/60 max-w-[280px] mt-2 mb-4 leading-relaxed">
          El mejor regalo es tu presencia, pero si deseas hacernos un detalle, contamos con las siguientes mesas de regalos:
        </p>
        <div className="flex flex-col gap-2 w-full max-w-[260px]">
          <a
            href="https://www.liverpool.com.mx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-between items-center px-4 py-2.5 bg-white border border-navy-primary/15 rounded hover:bg-navy-primary/5 transition-all text-xs font-semibold text-navy-primary uppercase tracking-wider"
          >
            <span>Liverpool</span>
            <span className="text-[10px] text-navy-primary/50">N° 5104928</span>
          </a>
          <a
            href="https://www.amazon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-between items-center px-4 py-2.5 bg-white border border-navy-primary/15 rounded hover:bg-navy-primary/5 transition-all text-xs font-semibold text-navy-primary uppercase tracking-wider"
          >
            <span>Amazon Wedding</span>
            <span className="text-[10px] text-navy-primary/50">Mesa: P & R 2026</span>
          </a>
        </div>
      </div>
    </section>
  );
}
