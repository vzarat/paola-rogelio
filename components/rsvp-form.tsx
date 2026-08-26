"use client";

import React, { useState } from "react";
import { Send, CheckCircle, HelpCircle } from "lucide-react";

export default function RsvpForm() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no" | null>(null);
  const [guests, setGuests] = useState("1");
  const [diet, setDiet] = useState("");

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !attendance) return;

    // Configurable wedding organizer WhatsApp phone number
    const phoneNumber = "528992159176";

    // Build the formatted text message
    const attendanceText = attendance === "yes" ? "Sí, asistiré" : "No podré asistir";
    const guestsText = attendance === "yes" ? `Acompañantes: ${guests}` : "Acompañantes: 0";
    const dietText = diet ? `Restricciones alimenticias: ${diet}` : "Restricciones alimenticias: Ninguna";

    const text = `¡Hola Paola y Rogelio!\n\nConfirmo mi asistencia a su boda.\n\n*Nombre:* ${name}\n*Asistencia:* ${attendanceText}\n*${guestsText}*\n*${dietText}*\n\n¡Con muchas ganas de celebrar con ustedes!`;
    const encodedText = encodeURIComponent(text);

    // Open WhatsApp link in a new window
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, "_blank");
  };

  return (
    <section className="py-16 px-6 relative bg-warm-crema-dark border-t border-sepia-border">
      <div className="absolute inset-4 border border-sepia-border pointer-events-none rounded-sm" />

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <span className="font-script text-4xl text-royal-blue block">
          Kindly Respond
        </span>
        <p className="font-sans text-[10px] tracking-[0.2em] text-navy-primary/60 uppercase mt-2">
          PLEASE RSVP BY APRIL 10, 2025
        </p>
        <div className="w-10 my-4 border-b border-sepia-border/60 mx-auto" />
      </div>

      {/* Form */}
      <form onSubmit={handleWhatsAppRedirect} className="space-y-6 relative z-10 max-w-xs mx-auto">
        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="rsvpName" className="text-[10px] font-semibold uppercase tracking-wider text-navy-primary/80 mb-2 font-sans">
            Full Name
          </label>
          <input
            type="text"
            id="rsvpName"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="px-4 py-2.5 rounded bg-white border border-sepia-border/80 text-navy-primary text-xs font-sans focus:outline-hidden focus:border-royal-blue focus:ring-1 focus:ring-royal-blue transition-all shadow-xs"
          />
        </div>

        {/* Attendance Radios */}
        <div className="flex flex-col">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-navy-primary/80 mb-2 font-sans">
            Will you join us?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setAttendance("yes")}
              className={`py-2.5 rounded border text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                attendance === "yes"
                  ? "bg-navy-primary border-navy-primary text-white shadow-md scale-[1.01]"
                  : "bg-white border-sepia-border text-navy-primary hover:bg-navy-primary/5"
              }`}
            >
              Joyfully Attend
            </button>
            <button
              type="button"
              onClick={() => setAttendance("no")}
              className={`py-2.5 rounded border text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                attendance === "no"
                  ? "bg-navy-primary border-navy-primary text-white shadow-md scale-[1.01]"
                  : "bg-white border-sepia-border text-navy-primary hover:bg-navy-primary/5"
              }`}
            >
              Regretfully Decline
            </button>
          </div>
        </div>

        {/* Conditional Attending Fields */}
        {attendance === "yes" && (
          <div className="space-y-6 animate-[fadeIn_0.3s_ease-out_forwards]">
            {/* Number of Guests */}
            <div className="flex flex-col">
              <label htmlFor="rsvpGuests" className="text-[10px] font-semibold uppercase tracking-wider text-navy-primary/80 mb-2 font-sans">
                Number of Guests
              </label>
              <select
                id="rsvpGuests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="px-4 py-2.5 rounded bg-white border border-sepia-border/80 text-navy-primary text-xs font-sans focus:outline-hidden focus:border-royal-blue focus:ring-1 focus:ring-royal-blue transition-all shadow-xs appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231B365D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                  backgroundSize: "1.1em",
                }}
              >
                <option value="1">1 Person</option>
                <option value="2">2 Persons</option>
                <option value="3">3 Persons</option>
                <option value="4">4 Persons</option>
              </select>
            </div>

            {/* Diet restrictions */}
            <div className="flex flex-col">
              <label htmlFor="rsvpDiet" className="text-[10px] font-semibold uppercase tracking-wider text-navy-primary/80 mb-2 font-sans">
                Mensaje
              </label>
              <input
                type="text"
                id="rsvpDiet"
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
                placeholder="Mensaje"
                className="px-4 py-2.5 rounded bg-white border border-sepia-border/80 text-navy-primary text-xs font-sans focus:outline-hidden focus:border-royal-blue focus:ring-1 focus:ring-royal-blue transition-all shadow-xs"
              />
            </div>
          </div>
        )}

        {/* Submit to WhatsApp */}
        <button
          type="submit"
          disabled={attendance === null}
          className={`w-full py-3 rounded text-[10px] font-bold uppercase tracking-widest text-white shadow-md transition-all duration-300 flex items-center justify-center gap-1.5 ${
            attendance === null
              ? "bg-navy-primary/40 cursor-not-allowed"
              : "bg-navy-primary hover:bg-royal-blue active:scale-98 cursor-pointer"
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          Send RSVP via WhatsApp
        </button>
      </form>
    </section>
  );
}
