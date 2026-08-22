import React from "react";
import Image from "next/image";

export default function Gallery() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400&auto=format&fit=crop",
      alt: "Couple embracing",
      className: "col-span-2 row-span-2 h-72",
    },
    {
      src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=400&auto=format&fit=crop",
      alt: "Wedding rings",
      className: "col-span-1 row-span-1 h-32",
    },
    {
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=400&auto=format&fit=crop",
      alt: "Wedding details",
      className: "col-span-1 row-span-1 h-32",
    },
    {
      src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=400&auto=format&fit=crop",
      alt: "Table setting",
      className: "col-span-3 row-span-1 h-40",
    },
  ];

  return (
    <section className="py-16 px-6 bg-white relative border-t border-sepia-border">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="font-script text-4xl text-royal-blue block">
          Captured Moments
        </span>
        <p className="font-sans text-[10px] tracking-[0.2em] text-navy-primary/60 uppercase mt-1">
          GALLERY
        </p>
      </div>

      {/* Asymmetric Editorial Grid */}
      <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`relative rounded-md overflow-hidden border border-sepia-border shadow-xs group ${img.className}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-w-md) 200px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Soft overlay on hover */}
            <div className="absolute inset-0 bg-navy-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}
