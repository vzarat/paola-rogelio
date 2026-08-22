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
    const phoneNumber = "521234567890";

    // Build the formatted text message
    const attendanceText = attendance === "yes" ? "Yes, I will attend" : "No, I cannot attend";
    const guestsText = attendance === "yes" ? `Guests: ${guests}` : "Guests: 0";
    const dietText = diet ? `Dietary restrictions: ${diet}` : "Dietary restrictions: None";

    const text = `Hello Olivia & Ralph!\n\nI am responding to your wedding RSVP.\n\n*Name:* ${name}\n*Attendance:* ${attendanceText}\n*${guestsText}*\n*${dietText}*\n\nLooking forward to celebrating with you!`;
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
                Dietary Restrictions / Notes
              </label>
              <input
                type="text"
                id="rsvpDiet"
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
                placeholder="Vegetarian, allergies, etc."
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

      {/* Decorative QR Code SVG */}
      <div className="mt-12 flex flex-col items-center justify-center relative z-10">
        <div className="p-3 bg-white border border-sepia-border rounded-md shadow-xs flex flex-col items-center">
          {/* Detailed Editorial QR Code Grid Pattern */}
          <svg className="w-24 h-24 text-navy-primary" viewBox="0 0 100 100" fill="currentColor">
            {/* Corners positioning blocks */}
            <rect x="0" y="0" width="24" height="24" />
            <rect x="3" y="3" width="18" height="18" fill="white" />
            <rect x="6" y="6" width="12" height="12" />

            <rect x="76" y="0" width="24" height="24" />
            <rect x="79" y="3" width="18" height="18" fill="white" />
            <rect x="82" y="6" width="12" height="12" />

            <rect x="0" y="76" width="24" height="24" />
            <rect x="3" y="79" width="18" height="18" fill="white" />
            <rect x="6" y="82" width="12" height="12" />

            {/* Random elegant geometric grid patterns representing code */}
            <rect x="32" y="4" width="8" height="8" />
            <rect x="48" y="0" width="8" height="8" />
            <rect x="60" y="4" width="8" height="8" />
            <rect x="36" y="16" width="12" height="8" />
            <rect x="64" y="16" width="4" height="8" />

            <rect x="4" y="32" width="8" height="8" />
            <rect x="16" y="36" width="8" height="12" />
            <rect x="0" y="56" width="8" height="8" />
            <rect x="12" y="60" width="12" height="4" />

            <rect x="32" y="32" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="40" cy="40" r="4" />

            <rect x="56" y="32" width="16" height="8" />
            <rect x="80" y="32" width="16" height="12" />
            <rect x="64" y="48" width="12" height="12" />
            <rect x="84" y="48" width="8" height="8" />

            <rect x="32" y="64" width="12" height="8" />
            <rect x="52" y="64" width="8" height="16" />
            <rect x="32" y="80" width="16" height="4" />
            <rect x="44" y="88" width="20" height="8" />

            <rect x="64" y="76" width="12" height="12" />
            <rect x="80" y="76" width="8" height="4" />
            <rect x="88" y="84" width="12" height="12" />
          </svg>
          <span className="text-[8px] tracking-widest text-slate-blue/60 uppercase font-sans mt-2">
            SCAN TO VIEW DETAILS
          </span>
        </div>
      </div>
    </section>
  );
}
