import React from "react";
import { Clock, Church, Utensils, Camera, PartyPopper } from "lucide-react";

export default function Program() {
  const events = [
    {
      time: "2:00 PM",
      title: "The Ceremony",
      description: "Exchange of vows and blessing at the Chapel.",
      icon: Church,
    },
    {
      time: "4:00 PM",
      title: "Cocktail Hour",
      description: "Drinks, appetizers, and live acoustic music.",
      icon: PartyPopper,
    },
    {
      time: "5:00 PM",
      title: "Grand Dinner",
      description: "Fine dining and celebration in the main hall.",
      icon: Utensils,
    },
    {
      time: "6:30 PM",
      title: "First Dance & Photos",
      description: "Cutting the cake, toasts, and dancing.",
      icon: Camera,
    },
  ];

  return (
    <section className="py-16 px-6 bg-warm-crema relative border-t border-sepia-border">
      <div className="text-center mb-10">
        <span className="font-script text-4xl text-royal-blue block">
          Wedding Program
        </span>
        <p className="font-sans text-[10px] tracking-[0.2em] text-navy-primary/60 uppercase mt-1">
          THE DAY'S ITINERARY
        </p>
      </div>

      {/* Architectural Arch Frame */}
      <div className="relative border border-navy-primary/15 rounded-t-full max-w-[310px] mx-auto px-6 py-14 bg-white shadow-xs">
        {/* Decorative inner arch line */}
        <div className="absolute inset-2 border border-dashed border-navy-primary/10 rounded-t-full pointer-events-none" />

        {/* Timeline Event List */}
        <div className="relative space-y-10 z-10">
          {events.map((event, idx) => {
            const Icon = event.icon;
            return (
              <div key={idx} className="flex gap-4 relative">
                {/* Visual connecting line */}
                {idx !== events.length - 1 && (
                  <div className="absolute left-[17px] top-9 bottom-[-40px] w-px border-l border-dashed border-navy-primary/25" />
                )}

                {/* Event Icon Circle */}
                <div className="w-9 h-9 rounded-full bg-warm-crema border border-sepia-border flex items-center justify-center text-royal-blue shadow-xs shrink-0">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Event Text Info */}
                <div className="space-y-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-[11px] font-bold text-navy-primary bg-navy-primary/5 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3 text-royal-blue" />
                      {event.time}
                    </span>
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-navy-primary">
                    {event.title}
                  </h4>
                  <p className="font-sans text-xs text-slate-blue/80 font-light leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
