"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

export default function RsvpForm() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const [diet, setDiet] = useState("");
  const [rsvpError, setRsvpError] = useState<string | null>(null);

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setRsvpError("Por favor ingresa tu nombre.");
      const inputEl = document.getElementById("rsvpName");
      if (inputEl) inputEl.focus();
      return;
    }

    setRsvpError(null);

    // Configurable wedding organizer WhatsApp phone number
    const phoneNumber = "528992159176";

    // Build the formatted text message
    const attendanceText = attendance === "yes" ? "Sí, asistiré" : "No podré asistir";
    const messageContent = diet.trim() ? `\n*Mensaje:* ${diet.trim()}` : "";

    const text = `¡Hola Paola y Rogelio!\n\nConfirmo mi asistencia a su boda.\n\n*Nombre:* ${name.trim()}\n*Asistencia:* ${attendanceText}${messageContent}\n\n¡Con muchas ganas de celebrar con ustedes!`;
    const encodedText = encodeURIComponent(text);

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    // Open WhatsApp link reliably across mobile and desktop
    if (typeof window !== "undefined") {
      const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = whatsappUrl;
      } else {
        const newTab = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
          window.location.href = whatsappUrl;
        }
      }
    }
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
            onChange={(e) => {
              setName(e.target.value);
              if (rsvpError) setRsvpError(null);
            }}
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
              onClick={() => {
                setAttendance("yes");
                if (rsvpError) setRsvpError(null);
              }}
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
              onClick={() => {
                setAttendance("no");
                if (rsvpError) setRsvpError(null);
              }}
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

        {/* Mensaje */}
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

        {rsvpError && (
          <p className="text-[11px] text-red-700 bg-red-50 border border-red-200 px-3 py-2 text-center rounded-xs font-sans">
            {rsvpError}
          </p>
        )}

        {/* Submit to WhatsApp */}
        <button
          type="submit"
          className="w-full py-3 rounded text-[10px] font-bold uppercase tracking-widest text-white shadow-md transition-all duration-300 flex items-center justify-center gap-1.5 bg-navy-primary hover:bg-royal-blue active:scale-98 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          Send RSVP via WhatsApp
        </button>
      </form>
    </section>
  );
}
