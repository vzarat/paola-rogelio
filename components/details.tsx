"use client";

import React, { useState } from "react";
import { Copy, Check, Shirt, HelpCircle } from "lucide-react";

export default function Details() {
  const [copied, setCopied] = useState(false);
  const clabeNumber = "127180029837465210";

  const handleCopy = () => {
    navigator.clipboard.writeText(clabeNumber);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const palette = [
    { name: "Sand", hex: "bg-[#EFECE6]", border: "border-[#D6CFBE]" },
    { name: "Soft Sky", hex: "bg-[#93C5FD]", border: "border-[#60A5FA]" },
    { name: "Slate", hex: "bg-[#64748B]", border: "border-[#475569]" },
    { name: "Royal", hex: "bg-[#2563EB]", border: "border-[#1D4ED8]" },
    { name: "Navy", hex: "bg-[#1B365D]", border: "border-[#0F1E36]" },
  ];

  return (
    <section className="py-16 px-6 bg-white relative border-t border-sepia-border overflow-hidden">
      {/* Background Frame Lines */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-navy-primary/10" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-navy-primary/10" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-navy-primary/10" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-navy-primary/10" />

      {/* Header */}
      <div className="text-center mb-10">
        <span className="font-script text-4xl text-royal-blue block">
          Los Detalles
        </span>
        <p className="font-sans text-[10px] tracking-[0.2em] text-navy-primary/60 uppercase mt-1">
          INFORMACIÓN PARA INVITADOS
        </p>
      </div>

      {/* Dress Code Block */}
      <div className="max-w-xs mx-auto text-center space-y-6 mb-12">
        <div className="flex justify-center gap-6">
          {/* Hat (Sombrero) SVG */}
          <div className="w-14 h-14 bg-warm-crema rounded-full border border-sepia-border flex items-center justify-center text-navy-primary shadow-xs">
            <svg viewBox="0 0 100 100" className="w-8 h-8 fill-none stroke-current stroke-[2.5]">
              <path d="M 35 25 L 65 25 L 62 65 L 38 65 Z" stroke="#6B7E43" />
              <path d="M 38 65 L 39 57 L 61 57 L 62 65" stroke="#7A1C28" />
              <path d="M 20 65 C 25 63, 75 63, 80 65 C 85 66, 85 69, 80 70 C 75 72, 25 72, 20 70 C 15 69, 15 66, 20 65 Z" stroke="#6B7E43" />
            </svg>
          </div>

          {/* Dress Gown SVG */}
          <div className="w-14 h-14 bg-warm-crema rounded-full border border-sepia-border flex items-center justify-center text-navy-primary shadow-xs">
            <svg viewBox="0 0 100 100" className="w-8 h-8 fill-none stroke-current stroke-[2.5]">
              {/* Dress outline */}
              <path d="M 40 20 C 45 35, 30 55, 25 85 L 75 85 C 70 55, 55 35, 60 20 Z" stroke="#7A1C28" fill="#F3D7D7" fillOpacity="0.4" />
              {/* Strap details */}
              <path d="M 40 20 C 45 15, 55 15, 60 20" stroke="#6B7E43" />
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-serif text-base font-bold uppercase tracking-widest text-navy-primary">
            Código de Vestimenta
          </h4>
          <p className="font-script text-2xl text-royal-blue">
            Formal
          </p>
          <p className="font-sans text-xs text-slate-blue leading-relaxed font-light">
            Vestimenta formal. Agradecemos evitar vestir de color blanco.
          </p>
        </div>

        {/* Color Palette Row */}
        <div className="py-2 bg-warm-crema/40 border border-sepia-border/40 rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-navy-primary/70 mb-3">
            Paleta de Colores
          </p>
          <div className="flex justify-center gap-3">
            {palette.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1 group">
                <div
                  className={`w-8 h-8 rounded-full ${item.hex} border ${item.border} shadow-inner transition-transform duration-300 group-hover:scale-110`}
                />
                <span className="text-[8px] text-slate-blue tracking-wide">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="editorial-divider max-w-xs mx-auto my-8" />

      {/* Gift Table Block */}
      <div className="max-w-xs mx-auto text-center space-y-4">
        <h4 className="font-serif text-base font-bold uppercase tracking-widest text-navy-primary">
          Mesa de Regalos
        </h4>
        <p className="font-sans text-xs text-slate-blue leading-relaxed font-light">
          Su presencia es nuestro mayor regalo. Si desean realizarnos un obsequio, tendremos una caja de sobres en la recepción, o pueden realizar una transferencia bancaria a la siguiente cuenta:
        </p>

        {/* Transfer bank card */}
        <div className="p-4 rounded border border-sepia-border bg-[#FBF9F5] shadow-xs text-left space-y-2.5 relative">
          <div className="flex justify-between items-center">
            <span className="text-[9px] uppercase tracking-wider text-navy-primary/60 font-semibold">
              Datos Bancarios
            </span>
            <span className="text-[9px] px-2 py-0.5 bg-royal-blue/10 text-royal-blue rounded font-medium">
              Transferencia
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-navy-primary font-bold">Banco Unión</p>
            <p className="text-[11px] text-slate-blue">Titular: Boda Paola & Rogelio</p>
            <p className="text-[11px] font-mono text-navy-primary bg-white border border-sepia-border/50 px-2 py-1.5 rounded flex justify-between items-center gap-1 mt-1.5">
              <span>CLABE: {clabeNumber}</span>
              <button
                onClick={handleCopy}
                className="p-1 hover:bg-slate-100 rounded text-royal-blue transition-colors shrink-0"
                title="Copiar número CLABE"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Elegant Toast Message */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-navy-primary text-white text-xs tracking-wider rounded-full shadow-lg border border-white/10 flex items-center gap-2 transition-all duration-300 uppercase ${
          copied ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <Check className="w-3.5 h-3.5 text-sky-blue" />
        ¡CLABE copiada con éxito!
      </div>
    </section>
  );
}
