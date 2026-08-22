import React from "react";
import Image from "next/image";
import { MapPin, Navigation } from "lucide-react";

export default function Venues() {
  const venues = [
    {
      title: "The Ceremony",
      time: "2:00 PM",
      location: "St. Mary's Chapel",
      address: "104 Forest Ave, Whispering Pines, NC 28327",
      imageUrl: "https://images.unsplash.com/photo-1545232979-8bf34eb9757b?q=80&w=500&auto=format&fit=crop",
      mapsUrl: "https://maps.google.com/?q=St.+Mary's+Chapel",
    },
    {
      title: "The Reception",
      time: "4:00 PM",
      location: "The Rosewood Estate",
      address: "209 Oak Ridge Lane, Southern Pines, NC 28387",
      imageUrl: "https://images.unsplash.com/photo-1519225495810-7512c696505a?q=80&w=500&auto=format&fit=crop",
      mapsUrl: "https://maps.google.com/?q=The+Rosewood+Estate",
    },
  ];

  return (
    <section className="py-16 px-6 bg-warm-crema-dark relative border-t border-sepia-border">
      <div className="text-center mb-10">
        <span className="font-script text-4xl text-royal-blue block">
          The Venues
        </span>
        <p className="font-sans text-[10px] tracking-[0.2em] text-navy-primary/60 uppercase mt-1">
          HOW TO GET THERE
        </p>
      </div>

      <div className="space-y-8 max-w-xs mx-auto">
        {venues.map((venue, idx) => (
          <div
            key={idx}
            className="bg-white border border-sepia-border rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md group"
          >
            {/* Venue Image */}
            <div className="relative h-44 w-full">
              <Image
                src={venue.imageUrl}
                alt={venue.location}
                fill
                sizes="(max-w-md) 300px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-4 text-white font-serif text-lg font-semibold">
                {venue.location}
              </span>
            </div>

            {/* Venue Details */}
            <div className="p-4 space-y-3.5">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider text-navy-primary/60">
                <span>{venue.title}</span>
                <span className="text-royal-blue">{venue.time}</span>
              </div>

              <div className="flex gap-2 text-left">
                <MapPin className="w-4 h-4 text-royal-blue shrink-0 mt-0.5" />
                <p className="font-sans text-xs text-slate-blue leading-relaxed font-light">
                  {venue.address}
                </p>
              </div>

              {/* Navigation Action Buttons */}
              <div className="grid grid-cols-1 gap-2 pt-1">
                <a
                  href={venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 rounded border border-navy-primary/15 text-[10px] font-bold uppercase tracking-wider text-navy-primary bg-white hover:bg-navy-primary/5 active:scale-98 transition-all"
                >
                  <Navigation className="w-3.5 h-3.5 text-royal-blue" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
