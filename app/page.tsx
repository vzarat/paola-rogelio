"use client";

import React, { useState, useRef } from "react";
import {
  Play,
  Pause,
  Music,
  Clock,
  Church,
  Utensils,
  Sparkles,
  MapPin,
  Navigation,
  Copy,
  Check,
  Send,
  Heart,
  Camera
} from "lucide-react";

const PETALS_CONFIG = [
  { left: "8%", size: 13, delay: "0s", duration: "6.5s", color: "#D98282", opacity: 0.75, rotate: 12 },
  { left: "22%", size: 17, delay: "1.2s", duration: "8s", color: "#7A1C28", opacity: 0.55, rotate: 35 },
  { left: "33%", size: 12, delay: "2.8s", duration: "7s", color: "#E59834", opacity: 0.50, rotate: -25 },
  { left: "48%", size: 19, delay: "0.4s", duration: "9s", color: "#C8521A", opacity: 0.50, rotate: 20 },
  { left: "62%", size: 14, delay: "1.8s", duration: "5.8s", color: "#D98282", opacity: 0.80, rotate: -15 },
  { left: "76%", size: 16, delay: "4.2s", duration: "7.6s", color: "#7A1C28", opacity: 0.60, rotate: 45 },
  { left: "88%", size: 13, delay: "0.8s", duration: "6.2s", color: "#E59834", opacity: 0.50, rotate: 8 },
  { left: "12%", size: 16, delay: "5.2s", duration: "8.6s", color: "#C8521A", opacity: 0.50, rotate: -30 },
  { left: "28%", size: 14, delay: "2.2s", duration: "7.2s", color: "#D98282", opacity: 0.65, rotate: 18 },
  { left: "42%", size: 18, delay: "3.2s", duration: "9.2s", color: "#7A1C28", opacity: 0.55, rotate: -12 },
  { left: "55%", size: 11, delay: "6.2s", duration: "6.2s", color: "#E59834", opacity: 0.50, rotate: 40 },
  { left: "70%", size: 17, delay: "1.5s", duration: "8.4s", color: "#C8521A", opacity: 0.50, rotate: -35 },
  { left: "82%", size: 13, delay: "3.8s", duration: "7.4s", color: "#D98282", opacity: 0.70, rotate: 5 },
  { left: "18%", size: 15, delay: "0.6s", duration: "6.9s", color: "#7A1C28", opacity: 0.55, rotate: 28 },
  { left: "73%", size: 12, delay: "3.0s", duration: "7.9s", color: "#E59834", opacity: 0.60, rotate: -22 }
];

export default function Home() {
  // Envelope / Cover Screen State
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  // Audio Playback State
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Bank Details Copy State
  const [copied, setCopied] = useState(false);
  const clabeNumber = "012180009876543219";

  // RSVP Form State
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no" | null>(null);
  const [guests, setGuests] = useState("1");
  const [diet, setDiet] = useState("");

  const handleOpenInvitation = () => {
    setIsEnvelopeOpen(true);
    
    if (audioRef.current) {
      const audio = audioRef.current;
      
      const startAudio = () => {
        audio.currentTime = 122; // Inicia en min 2:02 (122 segundos)
        audio.volume = 0; // Inicia en silencio
        audio.play()
          .then(() => {
            setIsPlaying(true);
            // Fade-in de volumen progresivo de 0 a 1 en 3 segundos (3000ms)
            let currentVolume = 0;
            const intervalTime = 100;
            const totalSteps = 30; // 30 pasos * 100ms = 3000ms
            let step = 0;

            const fadeInterval = setInterval(() => {
              step++;
              currentVolume = Math.min(step / totalSteps, 1);
              if (audioRef.current) {
                audioRef.current.volume = currentVolume;
              }
              if (step >= totalSteps) {
                clearInterval(fadeInterval);
              }
            }, intervalTime);
          })
          .catch((err) => console.error("Error al reproducir /audio/cancion.mp3:", err));
      };

      // Si ya cargó los metadatos inicia directo, si no espera el evento
      if (audio.readyState >= 1) {
        startAudio();
      } else {
        audio.addEventListener('loadedmetadata', startAudio, { once: true });
        audio.load();
      }
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Error al reproducir /audio/cancion.mp3:", err));
    }
  };

  const handleCopyCLABE = () => {
    navigator.clipboard.writeText(clabeNumber);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !attendance) return;

    const targetPhone = "521234567890";
    const attendanceMsg = attendance === "yes" ? "¡Sí, con mucho gusto asistiré!" : "Lo siento, no podré asistir";
    const guestsMsg = attendance === "yes" ? `Pases sugeridos: ${guests}` : "Pases sugeridos: 0";
    const restrictionsMsg = diet ? `Notas / Restricciones dietarias: ${diet}` : "Notas / Restricciones: Ninguna";

    const text = `¡Hola Paola y Rogelio!\n\nConfirmo mi asistencia a su enlace matrimonial:\n\n*Nombre completo:* ${name}\n*Confirmación:* ${attendanceMsg}\n*${guestsMsg}*\n*${restrictionsMsg}*\n\n¡Les enviamos un fuerte abrazo!`;
    const encodedText = encodeURIComponent(text);

    window.open(`https://wa.me/${targetPhone}?text=${encodedText}`, "_blank");
  };

  const colorPalette = [
    { name: "Amber", hex: "bg-[#E59834]", border: "border-[#CC8122]" },
    { name: "Burnt", hex: "bg-[#C8521A]", border: "border-[#AD4210]" },
    { name: "Burgundy", hex: "bg-[#7A1C28]", border: "border-[#5E121B]" },
    { name: "Rose", hex: "bg-[#D98282]", border: "border-[#C26B6B]" },
    { name: "Green", hex: "bg-[#6B7E43]", border: "border-[#546432]" },
  ];

  return (
    <main className="flex-1 w-full flex items-center justify-center p-0 md:py-8 sm:px-4 bg-[#F7F2EB] text-[#2D1810]">
      
      {/* Dynamic Keyframes Stylesheet (Shared scoped animations) */}
      <style>{`
        @keyframes petalFall {
          0% {
            opacity: 0;
            transform: translateY(-10%) rotate(0deg) translateX(0px);
          }
          15% {
            opacity: 0.8;
          }
          85% {
            opacity: 0.7;
          }
          100% {
            opacity: 0;
            transform: translateY(105vh) rotate(360deg) translateX(25px);
          }
        }
        
        @keyframes titleReveal {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
            letter-spacing: -0.05em;
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            letter-spacing: 0.1em;
          }
        }

        @keyframes subtitleReveal {
          0% {
            opacity: 0;
            transform: scale(0.7) rotate(-8deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes scrollReveal {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-petal {
          animation-name: petalFall;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }

        .animate-title-reveal {
          animation: titleReveal 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-subtitle-reveal {
          animation: subtitleReveal 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .scroll-reveal-title {
          animation-name: scrollReveal;
          animation-fill-mode: both;
          animation-timeline: view();
          animation-range: entry 10% cover 30%;
        }
      `}</style>

      {/* Centered Vertical Story Card Container */}
      <div className="w-full max-w-md min-h-screen md:min-h-[850px] md:max-h-[92vh] md:rounded-xl bg-[#FDFBF7] shadow-2xl overflow-y-auto relative border-x border-[#EFE8DE] flex flex-col md:my-auto scrollbar-thin">
        
        {/* ================= WELCOME OPENING SCREEN (ENVELOPE COVER) ================= */}
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#FDFBF7] p-6 text-center overflow-hidden h-[100dvh] transition-opacity duration-700 select-none ${
          isEnvelopeOpen ? "pointer-events-none opacity-0" : "opacity-100"
        }`}>
          {/* Burgundy border frame */}
          <div className="absolute inset-4 border-2 border-[#7A1C28] pointer-events-none rounded-md" />
          <div className="absolute inset-[22px] border border-dashed border-[#7A1C28]/40 pointer-events-none rounded-md" />

          {/* Monogram */}
          <div className="relative w-24 h-24 mt-8 flex items-center justify-center bg-white rounded-full border border-[#7A1C28]/25 shadow-lg animate-pulse">
            <div className="absolute inset-[5px] rounded-full border border-dashed border-[#7A1C28]/15 animate-[spin_16s_linear_infinite]" />
            <span className="font-serif text-3xl font-light text-[#7A1C28] tracking-widest">P&R</span>
          </div>

          {/* Invitation Text */}
          <div className="space-y-4 max-w-xs text-center my-auto">
            <p className="font-sans text-[9px] tracking-[0.35em] text-[#7A1C28] uppercase font-bold">NUESTRA BODA</p>
            <h2 className="font-script text-5xl text-[#C8521A] leading-relaxed">Paola & Rogelio</h2>
            <div className="w-12 border-b border-[#7A1C28]/30 mx-auto" />
            <p className="font-sans text-[11px] text-[#2D1810]/60 leading-relaxed font-light mt-4">
              Te invitamos a compartir con nosotros el día más importante de nuestras vidas.
            </p>
          </div>

          {/* Button to Open & Autoplay Audio */}
          <div className="mb-8 flex flex-col items-center space-y-3 z-10">
            <p className="font-sans text-[9px] tracking-wider text-[#7A1C28]/70 uppercase animate-pulse">
              Toca para abrir la invitación con música
            </p>
            <button
              onClick={handleOpenInvitation}
              className="px-8 py-3 bg-[#7A1C28] hover:bg-[#C8521A] active:scale-95 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span>Abrir Invitación</span>
              <span className="text-base">✉️</span>
            </button>
          </div>
        </div>

        {/* ================= NATIVE HTML5 AUDIO ELEMENT ================= */}
        <audio ref={audioRef} preload="metadata" loop playsInline>
          <source src="/audio/cancion.mp3" type="audio/mpeg" />
          Tu navegador no soporta el elemento de audio.
        </audio>

        {/* ================= HEADER FLOTANTE CON AUDIO PERSISTENTE ================= */}
        <div className="fixed top-6 right-6 z-40">
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 border border-[#EFE8DE] backdrop-blur-md shadow-md hover:bg-white active:scale-95 hover:shadow-lg transition-all duration-300 group"
            aria-label={isPlaying ? "Silenciar música" : "Escuchar música"}
          >
            {/* Equalizer waves animation */}
            <div className="flex items-end gap-[2px] h-3 w-3.5">
              <span
                className={`w-[2px] bg-[#7A1C28] rounded-full transition-all duration-300 ${
                  isPlaying ? "animate-[bounce_0.8s_infinite_100ms]" : "h-1"
                }`}
                style={{ height: isPlaying ? undefined : "3px" }}
              />
              <span
                className={`w-[2px] bg-[#7A1C28] rounded-full transition-all duration-300 ${
                  isPlaying ? "animate-[bounce_0.8s_infinite_300ms]" : "h-2.5"
                }`}
                style={{ height: isPlaying ? undefined : "9px" }}
              />
              <span
                className={`w-[2px] bg-[#7A1C28] rounded-full transition-all duration-300 ${
                  isPlaying ? "animate-[bounce_0.8s_infinite_200ms]" : "h-1.5"
                }`}
                style={{ height: isPlaying ? undefined : "5px" }}
              />
            </div>

            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-[#7A1C28] fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 text-[#7A1C28] fill-current translate-x-[0.5px]" />
            )}
            
            <Music className={`w-3 h-3 text-[#7A1C28]/60 ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "6s" }} />
          </button>
        </div>

        {/* ================= HERO SECTION (PORTADA EDITORIAL) ================= */}
        <section className="flex flex-col items-center justify-between text-center min-h-[90vh] py-12 px-6 relative overflow-hidden select-none animate-fade-in-up">
          <div className="absolute inset-4 border border-[#EFE8DE] pointer-events-none rounded-md" />
          <div className="absolute inset-[18px] border border-dashed border-[#EFE8DE]/50 pointer-events-none rounded-md" />

          {/* Falling Petals Background Overlay */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
            {isEnvelopeOpen && PETALS_CONFIG.map((petal, index) => (
              <svg
                key={index}
                className="absolute animate-petal"
                style={{
                  left: petal.left,
                  width: `${petal.size}px`,
                  height: `${petal.size * 1.3}px`,
                  animationDelay: petal.delay,
                  animationDuration: petal.duration,
                  color: petal.color,
                  opacity: petal.opacity,
                  transform: `rotate(${petal.rotate}deg)`,
                  top: "-5%",
                }}
                viewBox="0 0 20 26"
                fill="currentColor"
              >
                <path d="M10,0 C17,5 20,15 10,25 C0,15 3,5 10,0 Z" />
              </svg>
            ))}
          </div>

          {/* Floating flower petals in hero background */}
          <div className="absolute top-24 left-10 w-8 h-8 text-[#D98282]/20 pointer-events-none animate-float select-none" style={{ animationDelay: "1s" }}>
            <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
              <path d="M12 2a4 4 0 0 1 4 4c0 3-4 8-4 8s-4-5-4-8a4 4 0 0 1 4-4Z" />
            </svg>
          </div>
          <div className="absolute bottom-32 right-12 w-6 h-6 text-[#6B7E43]/15 pointer-events-none animate-float select-none" style={{ animationDelay: "3s" }}>
            <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
              <path d="M12 2a3 3 0 0 1 3 3c0 2.5-3 6-3 6s-3-3.5-3-3a3 3 0 0 1 3-3Z" />
            </svg>
          </div>

          {/* Heading */}
          <div className="mt-6 flex flex-col items-center z-10 w-full">
            <p className="font-sans text-[9px] tracking-[0.35em] text-[#7A1C28]/85 uppercase font-bold">
              THE WEDDING OF
            </p>
            
            {/* Caligraphic Monogram */}
            <div className="relative w-14 h-14 my-4 flex items-center justify-center bg-white rounded-full border border-[#7A1C28]/20 shadow-xs hover:rotate-6 transition-transform duration-300">
              <div className="absolute inset-[3px] rounded-full border border-dashed border-[#7A1C28]/10" />
              <span className="font-serif text-2xl font-light text-[#7A1C28] relative -translate-x-[0.5px] -translate-y-[0.5px]">
                P&R
              </span>
            </div>
          </div>

          {/* Names */}
          <div className="flex flex-col items-center z-10 my-auto">
            {isEnvelopeOpen ? (
              <>
                <h1 
                  className="font-serif text-4xl tracking-wider text-[#7A1C28] font-light uppercase transition-all duration-500 hover:scale-103 cursor-default animate-title-reveal"
                  style={{ animationDelay: "0.2s", opacity: 0 }}
                >
                  Paola
                </h1>
                <span 
                  className="font-script text-3xl text-[#C8521A] my-1 animate-subtitle-reveal"
                  style={{ animationDelay: "0.7s", opacity: 0 }}
                >
                  y
                </span>
                <h1 
                  className="font-serif text-4xl tracking-wider text-[#7A1C28] font-light uppercase transition-all duration-500 hover:scale-103 cursor-default animate-title-reveal"
                  style={{ animationDelay: "1.2s", opacity: 0 }}
                >
                  Rogelio
                </h1>
              </>
            ) : (
              // Fallback during server pre-rendering / closed envelope state
              <>
                <h1 className="font-serif text-4xl tracking-wider text-[#7A1C28] font-light uppercase">Paola</h1>
                <span className="font-script text-3xl text-[#C8521A] my-1">y</span>
                <h1 className="font-serif text-4xl tracking-wider text-[#7A1C28] font-light uppercase">Rogelio</h1>
              </>
            )}
          </div>

          {/* Arch Portrait Placeholder with detailed monoline flowers */}
          <div className="relative w-52 h-64 my-4 z-10 flex items-center justify-center p-1 bg-white rounded-t-full shadow-md border border-[#C8521A]/20 transition-transform duration-500 hover:scale-[1.02]">
            <div className="relative w-full h-full rounded-t-full overflow-hidden flex items-center justify-center bg-[#F7F2EB]">
              <svg viewBox="0 0 200 280" className="w-full h-full text-[#6B7E43]">
                <defs>
                  <linearGradient id="warm-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F3D7D7" />
                    <stop offset="60%" stopColor="#FAF2EB" />
                    <stop offset="100%" stopColor="#F3D7D7" />
                  </linearGradient>
                </defs>
                <rect width="200" height="280" rx="100" fill="url(#warm-grad)" />
                
                {/* Botanical monoline leaves vector */}
                <path d="M100 250 C100 210, 110 160, 80 120 C70 100, 75 70, 100 30 C125 70, 130 100, 120 120 C90 160, 100 210, 100 250 Z" fill="none" stroke="#6B7E43" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M100 250 C102 210, 125 170, 140 160" fill="none" stroke="#6B7E43" strokeWidth="1" />
                <path d="M140 160 C138 150, 148 145, 155 148 C160 150, 158 155, 140 160 Z" fill="#7A1C28" fillOpacity="0.15" stroke="#7A1C28" strokeWidth="1" />
                
                {/* Extra flower buds */}
                <circle cx="140" cy="160" r="1.5" fill="#7A1C28" />
                <path d="M115 190 C110 182, 118 175, 126 178 C130 180, 128 186, 115 190 Z" fill="#6B7E43" fillOpacity="0.15" stroke="#6B7E43" strokeWidth="1" />
                <path d="M85 190 C90 182, 82 175, 74 178 C70 180, 72 186, 85 190 Z" fill="#6B7E43" fillOpacity="0.15" stroke="#6B7E43" strokeWidth="1" />
                <path d="M100 250 C98 210, 75 170, 60 160" fill="none" stroke="#6B7E43" strokeWidth="1" />
                <path d="M60 160 C62 150, 52 145, 45 148 C40 150, 42 155, 60 160 Z" fill="#7A1C28" fillOpacity="0.15" stroke="#7A1C28" strokeWidth="1" />
                <circle cx="60" cy="160" r="1.5" fill="#7A1C28" />
                <circle cx="100" cy="65" r="2.5" fill="#7A1C28" />
              </svg>
            </div>
          </div>

          {/* Date Badge */}
          <div className="mb-4 z-10">
            <div className="flex items-center justify-center gap-3 py-1.5 px-5 bg-white border border-[#EFE8DE] rounded-full font-serif text-xs font-semibold tracking-widest text-[#7A1C28] shadow-xs hover:scale-105 active:scale-97 transition-all duration-300 cursor-pointer">
              <span>SÁBADO</span>
              <span className="w-px h-3.5 bg-[#7A1C28]/20" />
              <span className="text-[#C8521A] text-sm">14</span>
              <span className="w-px h-3.5 bg-[#7A1C28]/20" />
              <span>NOVIEMBRE 2026</span>
            </div>
          </div>

          {/* Quote */}
          <div className="mb-6 px-4 z-10">
            <p className="font-script text-2.5xl text-[#7A1C28]">
              "El amor nunca deja de ser."
            </p>
          </div>

          {/* Bounce indicator */}
          <div className="absolute bottom-2.5 flex flex-col items-center text-[#7A1C28]/40 animate-bounce">
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </section>

        {/* ================= NUESTRA HISTORIA ================= */}
        <section className="py-16 px-6 relative bg-white overflow-hidden border-t border-[#EFE8DE] animate-fade-in-up">
          {/* Animated floating green botanical SVGs in corners */}
          <div className="absolute top-0 left-0 w-24 h-24 text-[#6B7E43]/15 pointer-events-none select-none animate-float">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-1">
              <path d="M 0 0 C 30 10, 45 35, 35 60" />
              <path d="M 35 60 C 30 50, 40 48, 48 52 C 38 40, 30 30, 0 0 Z" fill="currentColor" fillOpacity="0.05" />
              <circle cx="48" cy="52" r="1.5" fill="#7A1C28" />
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 text-[#6B7E43]/15 rotate-180 pointer-events-none select-none animate-float" style={{ animationDelay: "2s" }}>
            <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-1">
              <path d="M 0 0 C 30 10, 45 35, 35 60" />
              <path d="M 35 60 C 30 50, 40 48, 48 52 C 38 40, 30 30, 0 0 Z" fill="currentColor" fillOpacity="0.05" />
              <circle cx="48" cy="52" r="1.5" fill="#7A1C28" />
            </svg>
          </div>

          <div className="relative z-10 max-w-xs mx-auto text-center space-y-5">
            <span className="font-script text-4xl text-[#C8521A] block scroll-reveal-title">
              Nuestra Historia
            </span>
            
            <div className="w-10 border-b border-[#EFE8DE] mx-auto my-2" />

            <div className="p-4 rounded-lg bg-[#F7F2EB]/40 border border-[#EFE8DE]/40 relative transition-transform duration-300 hover:scale-[1.02]">
              <p className="font-sans text-xs text-[#2D1810]/85 leading-relaxed font-light">
                Desde el primer día que conversamos, supimos que compartíamos un camino común. Nuestra historia se ha construido de risas, metas compartidas y un profundo amor que hoy decidimos consolidar ante Dios y las personas que más queremos.
              </p>
            </div>

            <div className="py-1 flex justify-center text-[#7A1C28]/40 animate-pulse">
              <Heart className="w-4 h-4 fill-current" />
            </div>

            <div className="p-4 rounded-lg bg-[#FDFBF7]/60 border border-[#EFE8DE]/45 relative transition-transform duration-300 hover:scale-[1.02]">
              <p className="font-sans text-xs text-[#2D1810]/85 leading-relaxed font-light">
                Estamos felices de comenzar esta nueva etapa y agradecidos de contar con su cariño en este día tan especial de nuestras vidas.
              </p>
            </div>
          </div>
        </section>

        {/* ================= EL ITINERARIO (WEDDING PROGRAM) ================= */}
        <section className="py-16 px-6 bg-[#FDFBF7] relative border-t border-[#EFE8DE] overflow-hidden">
          
          {/* Subtle botanical lines flanking the program title */}
          <div className="absolute top-10 left-4 w-12 h-12 text-[#6B7E43]/15 pointer-events-none select-none">
            <svg viewBox="0 0 50 50" className="w-full h-full fill-none stroke-current stroke-1">
              <path d="M 0 50 C 10 30, 30 20, 50 10 M 20 35 C 30 25, 40 10, 45 5" />
            </svg>
          </div>
          <div className="absolute top-10 right-4 w-12 h-12 text-[#6B7E43]/15 pointer-events-none select-none scale-x-[-1]">
            <svg viewBox="0 0 50 50" className="w-full h-full fill-none stroke-current stroke-1">
              <path d="M 0 50 C 10 30, 30 20, 50 10 M 20 35 C 30 25, 40 10, 45 5" />
            </svg>
          </div>

          <div className="text-center mb-10 relative z-10">
            <span className="font-script text-4xl text-[#C8521A] block scroll-reveal-title">
              El Itinerario
            </span>
            <p className="font-sans text-[9px] tracking-[0.2em] text-[#7A1C28]/60 uppercase mt-1 font-bold">
              WEDDING PROGRAM
            </p>
          </div>

          {/* Arch frame outline with surrounding branches */}
          <div className="relative max-w-[300px] mx-auto">
            
            {/* Wreath branch left */}
            <div className="absolute -left-6 -top-4 w-12 h-28 text-[#6B7E43]/30 pointer-events-none select-none animate-float">
              <svg viewBox="0 0 50 150" className="w-full h-full fill-none stroke-current stroke-[1.25]">
                <path d="M 10 140 C 15 100, 35 60, 30 20" />
                <path d="M 12 110 C 22 105, 25 115, 12 110 Z" fill="currentColor" fillOpacity="0.05" />
                <path d="M 20 80 C 30 75, 32 85, 20 80 Z" fill="currentColor" fillOpacity="0.05" />
                <path d="M 28 50 C 38 45, 40 55, 28 50 Z" fill="currentColor" fillOpacity="0.05" />
              </svg>
            </div>

            {/* Wreath branch right */}
            <div className="absolute -right-6 -top-4 w-12 h-28 text-[#6B7E43]/30 pointer-events-none select-none scale-x-[-1] animate-float" style={{ animationDelay: "3s" }}>
              <svg viewBox="0 0 50 150" className="w-full h-full fill-none stroke-current stroke-[1.25]">
                <path d="M 10 140 C 15 100, 35 60, 30 20" />
                <path d="M 12 110 C 22 105, 25 115, 12 110 Z" fill="currentColor" fillOpacity="0.05" />
                <path d="M 20 80 C 30 75, 32 85, 20 80 Z" fill="currentColor" fillOpacity="0.05" />
                <path d="M 28 50 C 38 45, 40 55, 28 50 Z" fill="currentColor" fillOpacity="0.05" />
              </svg>
            </div>

            <div className="border border-[#7A1C28]/15 rounded-t-full px-6 py-12 bg-white shadow-xs relative transition-transform duration-500 hover:scale-[1.01]">
              <div className="absolute inset-1.5 border border-dashed border-[#7A1C28]/10 rounded-t-full pointer-events-none" />

              {/* Timeline list */}
              <div className="relative space-y-8 z-10 text-left">
                
                {/* Event 1 */}
                <div className="flex gap-4 relative group">
                  <div className="absolute left-[15px] top-8 bottom-[-32px] w-px border-l border-dashed border-[#7A1C28]/20" />
                  <div className="w-8 h-8 rounded-full bg-[#FDFBF7] border border-[#EFE8DE] flex items-center justify-center text-[#7A1C28] shrink-0 shadow-xs transition-all duration-300 group-hover:scale-115 group-hover:bg-[#FDFBF7] group-hover:shadow-md">
                    <Church className="w-4 h-4 text-[#6B7E43]" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-serif text-[10px] font-bold text-[#7A1C28] bg-[#7A1C28]/5 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                      <Clock className="w-3 h-3 text-[#E59834]" />
                      4:30 PM
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-[#7A1C28]">Ceremonia Religiosa</h4>
                    <p className="font-sans text-[11px] text-[#2D1810]/70 font-light">Enlace y bendición sacramental.</p>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="flex gap-4 relative group">
                  <div className="absolute left-[15px] top-8 bottom-[-32px] w-px border-l border-dashed border-[#7A1C28]/20" />
                  <div className="w-8 h-8 rounded-full bg-[#FDFBF7] border border-[#EFE8DE] flex items-center justify-center text-[#7A1C28] shrink-0 shadow-xs transition-all duration-300 group-hover:scale-115 group-hover:bg-[#FDFBF7] group-hover:shadow-md">
                    <Sparkles className="w-4 h-4 text-[#E59834]" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-serif text-[10px] font-bold text-[#7A1C28] bg-[#7A1C28]/5 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                      <Clock className="w-3 h-3 text-[#E59834]" />
                      6:30 PM
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-[#7A1C28]">Recepción & Cóctel</h4>
                    <p className="font-sans text-[11px] text-[#2D1810]/70 font-light">Bebidas de bienvenida y socialización.</p>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="flex gap-4 relative group">
                  <div className="absolute left-[15px] top-8 bottom-[-32px] w-px border-l border-dashed border-[#7A1C28]/20" />
                  <div className="w-8 h-8 rounded-full bg-[#FDFBF7] border border-[#EFE8DE] flex items-center justify-center text-[#7A1C28] shrink-0 shadow-xs transition-all duration-300 group-hover:scale-115 group-hover:bg-[#FDFBF7] group-hover:shadow-md">
                    <Utensils className="w-4 h-4 text-[#C8521A]" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-serif text-[10px] font-bold text-[#7A1C28] bg-[#7A1C28]/5 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                      <Clock className="w-3 h-3 text-[#E59834]" />
                      8:00 PM
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-[#7A1C28]">Banquete & Brindis</h4>
                    <p className="font-sans text-[11px] text-[#2D1810]/70 font-light">Cena formal, postres y brindis de honor.</p>
                  </div>
                </div>

                {/* Event 4 */}
                <div className="flex gap-4 relative group">
                  <div className="w-8 h-8 rounded-full bg-[#FDFBF7] border border-[#EFE8DE] flex items-center justify-center text-[#7A1C28] shrink-0 shadow-xs transition-all duration-300 group-hover:scale-115 group-hover:bg-[#FDFBF7] group-hover:shadow-md">
                    <Music className="w-4 h-4 text-[#7A1C28]" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-serif text-[10px] font-bold text-[#7A1C28] bg-[#7A1C28]/5 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                      <Clock className="w-3 h-3 text-[#E59834]" />
                      9:30 PM
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-[#7A1C28]">Fiesta & Baile</h4>
                    <p className="font-sans text-[11px] text-[#2D1810]/70 font-light">Apertura de pista y festejo.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ================= DETALLES & VESTIMENTA ================= */}
        <section className="py-16 px-6 bg-white relative border-t border-[#EFE8DE] overflow-hidden">
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#7A1C28]/10" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#7A1C28]/10" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#7A1C28]/10" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#7A1C28]/10" />

          {/* Delicate flower drawing watermark */}
          <div className="absolute inset-0 flex items-center justify-center text-[#6B7E43]/5 pointer-events-none select-none animate-pulse-slow">
            <svg viewBox="0 0 200 200" className="w-80 h-80 fill-none stroke-current stroke-1">
              <circle cx="100" cy="100" r="40" />
              <path d="M 100 60 C 110 40, 130 40, 140 60 C 130 80, 110 80, 100 60 Z" fill="currentColor" fillOpacity="0.02" />
              <path d="M 140 100 C 160 110, 160 130, 140 140 C 120 130, 120 110, 140 100 Z" fill="currentColor" fillOpacity="0.02" />
              <path d="M 100 140 C 90 160, 70 160, 60 140 C 70 120, 90 120, 100 140 Z" fill="currentColor" fillOpacity="0.02" />
              <path d="M 60 100 C 40 90, 40 70, 60 60 C 80 70, 80 90, 60 100 Z" fill="currentColor" fillOpacity="0.02" />
            </svg>
          </div>

          {/* Header */}
          <div className="text-center mb-10 relative z-10">
            <span className="font-script text-4xl text-[#C8521A] block scroll-reveal-title">
              Código de Vestimenta
            </span>
            <p className="font-sans text-[9px] tracking-[0.2em] text-[#7A1C28]/60 uppercase mt-1 font-bold">
              THE DETAILS
            </p>
          </div>

          <div className="max-w-xs mx-auto text-center space-y-6 relative z-10">
            
            {/* Outline vectors */}
            <div className="flex justify-center gap-6">
              {/* Suit SVG */}
              <div className="w-14 h-14 bg-[#FDFBF7] rounded-full border border-[#EFE8DE] flex items-center justify-center text-[#7A1C28] shadow-xs hover:scale-105 transition-transform duration-300">
                <svg viewBox="0 0 100 100" className="w-7 h-7 fill-none stroke-current stroke-[2.5]">
                  <path d="M 22 22 L 50 40 L 78 22 L 68 85 L 32 85 Z" stroke="#6B7E43" />
                  <path d="M 50 40 L 46 55 L 50 63 L 54 55 Z" fill="#7A1C28" />
                  <path d="M 22 22 L 35 44 M 78 22 L 65 44" stroke="#6B7E43" />
                </svg>
              </div>

              {/* Dress Gown SVG */}
              <div className="w-14 h-14 bg-[#FDFBF7] rounded-full border border-[#EFE8DE] flex items-center justify-center text-[#7A1C28] shadow-xs hover:scale-105 transition-transform duration-300">
                <svg viewBox="0 0 100 100" className="w-7 h-7 fill-none stroke-current stroke-[2.5]">
                  <path d="M 40 20 C 45 35, 30 55, 25 85 L 75 85 C 70 55, 55 35, 60 20 Z" stroke="#7A1C28" fill="#F3D7D7" fillOpacity="0.4" />
                  <path d="M 40 20 C 44 14, 56 14, 60 20" stroke="#7A1C28" />
                </svg>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-[#7A1C28]">
                Rigurosa Etiqueta / Formal
              </h4>
              <p className="font-sans text-xs text-[#2D1810]/70 leading-relaxed font-light">
                Hombres de traje oscuro / Mujeres de vestido largo. Agradecemos evitar vestir de color blanco.
              </p>
            </div>

            {/* Suggested Palette */}
            <div className="py-3 bg-[#FDFBF7]/85 border border-[#EFE8DE] rounded-lg p-3">
              <p className="text-[9px] uppercase tracking-wider font-semibold text-[#7A1C28]/70 mb-2 font-bold font-serif">
                Guía de Color para Invitados
              </p>
              <div className="flex justify-center gap-2">
                {colorPalette.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1 transition-transform hover:scale-115 duration-305 cursor-pointer">
                    <div className={`w-7 h-7 rounded-full ${item.hex} border ${item.border} shadow-inner`} />
                    <span className="text-[8px] text-[#2D1810]/70 font-semibold">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-12 border-b border-[#EFE8DE] mx-auto my-3" />

            {/* Gift Registry */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-[#7A1C28]">
                Mesa de Regalos
              </h4>
              <p className="font-sans text-xs text-[#2D1810]/70 leading-relaxed font-light">
                El mejor regalo es su presencia. Si desean realizar un obsequio, agradeceríamos un detalle en efectivo mediante sobre el día del evento o transferencia bancaria:
              </p>

              {/* Transfer account details card */}
              <div className="p-3.5 rounded-lg border border-[#EFE8DE] bg-[#FAF8F5] text-left space-y-2 relative transition-all duration-300 hover:shadow-xs hover:border-[#7A1C28]/30">
                <div className="flex justify-between items-center text-[9px] font-semibold text-[#7A1C28]/60">
                  <span>DATOS DE TRANSFERENCIA</span>
                  <span className="px-1.5 py-0.5 bg-[#7A1C28]/10 text-[#7A1C28] rounded font-semibold text-[8px]">CLABE</span>
                </div>
                <div className="text-xs text-[#2D1810] space-y-1">
                  <p className="font-bold">Banco Nacional</p>
                  <p className="text-[11px] text-[#2D1810]/70">Titular: Paola & Rogelio Boda</p>
                  <div className="text-[11px] font-mono bg-white border border-[#EFE8DE] px-2 py-1.5 rounded flex justify-between items-center mt-1 focus-within:ring-1 focus-within:ring-[#C8521A]">
                    <span>CLABE: {clabeNumber}</span>
                    <button
                      onClick={handleCopyCLABE}
                      className="p-1 hover:bg-slate-100 rounded text-[#C8521A] transition-colors active:scale-90"
                      title="Copiar CLABE"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-600 animate-pulse" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Floating Toast Notification */}
          <div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#7A1C28] text-white text-xs tracking-wider rounded-full shadow-lg border border-white/10 flex items-center gap-1.5 transition-all duration-300 uppercase ${
              copied ? "opacity-100 translate-y-0 scale-100 animate-pulse" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
            }`}
          >
            <Check className="w-3.5 h-3.5 text-[#E59834]" />
            ¡Copiado con éxito!
          </div>

        </section>

        {/* ================= UBICACIONES ================= */}
        <section className="py-16 px-6 bg-[#F7F2EB] relative border-t border-[#EFE8DE]">
          <div className="text-center mb-10">
            <span className="font-script text-4xl text-[#C8521A] block scroll-reveal-title">
              Ubicaciones
            </span>
            <p className="font-sans text-[9px] tracking-[0.2em] text-[#7A1C28]/60 uppercase mt-1 font-semibold">
              THE VENUES
            </p>
          </div>

          <div className="space-y-6 max-w-xs mx-auto text-left relative z-10">
            
            {/* Ceremony Card */}
            <div className="bg-white border border-[#EFE8DE] rounded-lg overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div className="h-32 bg-gradient-to-br from-[#FAF2EB] via-[#F3D7D7] to-[#D98282] p-4 flex items-end relative border-b border-[#EFE8DE] overflow-hidden">
                
                {/* SVG Facade Line art in Olive Green with flower branches */}
                <div className="absolute right-4 bottom-2 w-20 h-24 text-[#6B7E43]/20 group-hover:scale-105 transition-transform duration-500">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-[1.5]">
                    <path d="M 20 90 L 20 50 L 50 20 L 80 50 L 80 90 Z" />
                    <path d="M 40 90 L 40 70 C 40 65, 60 65, 60 70 L 60 90 Z" />
                    <path d="M 50 20 L 50 5" />
                    <path d="M 45 10 L 55 10" />
                    {/* Tiny monoline rose bud */}
                    <path d="M 85 45 C 90 40, 92 48, 85 45 Z" fill="#7A1C28" fillOpacity="0.2" />
                  </svg>
                </div>
                <div className="relative z-10">
                  <span className="text-[9px] font-bold text-[#7A1C28] block uppercase">4:30 PM</span>
                  <h4 className="font-serif text-base font-semibold text-[#7A1C28]">Templo Expiatorio</h4>
                </div>
              </div>
              <div className="p-4 space-y-3.5">
                <p className="font-sans text-xs text-[#2D1810]/70 font-light leading-relaxed">
                  Av. Francisco I. Madero 950, Zona Centro, Guadalajara, Jal.
                </p>
                <a
                  href="https://maps.google.com/?q=Templo+Expiatorio+Guadalajara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded border border-[#7A1C28]/15 text-[10px] font-bold uppercase tracking-wider text-[#7A1C28] bg-white hover:bg-slate-50 transition-all w-full shadow-xs active:scale-98"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#C8521A]" />
                  Abrir en Google Maps
                </a>
              </div>
            </div>

            {/* Reception Card */}
            <div className="bg-white border border-[#EFE8DE] rounded-lg overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div className="h-32 bg-gradient-to-br from-[#FAF2EB] via-[#F3D7D7] to-[#D98282] p-4 flex items-end relative border-b border-[#EFE8DE] overflow-hidden">
                
                {/* SVG Facade Line art */}
                <div className="absolute right-4 bottom-2 w-20 h-24 text-[#6B7E43]/20 group-hover:scale-105 transition-transform duration-500">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-[1.5]">
                    <path d="M 10 90 L 10 30 L 90 30 L 90 90" />
                    <path d="M 25 90 C 25 60, 45 60, 45 90" />
                    <path d="M 55 90 C 55 60, 75 60, 75 90" />
                    <circle cx="50" cy="15" r="4" />
                    {/* Hanging vines */}
                    <path d="M 15 35 C 18 45, 12 55, 15 65" />
                    <path d="M 85 35 C 82 45, 88 55, 85 65" />
                  </svg>
                </div>
                <div className="relative z-10">
                  <span className="text-[9px] font-bold text-[#7A1C28] block uppercase">6:30 PM</span>
                  <h4 className="font-serif text-base font-semibold text-[#7A1C28]">Hacienda La Solariega</h4>
                </div>
              </div>
              <div className="p-4 space-y-3.5">
                <p className="font-sans text-xs text-[#2D1810]/70 font-light leading-relaxed">
                  Km 4.5 Carretera Huimilpan, El Vegil, Querétaro, Qro.
                </p>
                <a
                  href="https://maps.google.com/?q=Hacienda+La+Solariega"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded border border-[#7A1C28]/15 text-[10px] font-bold uppercase tracking-wider text-[#7A1C28] bg-white hover:bg-slate-50 transition-all w-full shadow-xs active:scale-98"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#C8521A]" />
                  Abrir en Google Maps
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ================= GALERÍA DE FOTOS (COLLAGE) ================= */}
        <section className="py-16 px-6 bg-white relative border-t border-[#EFE8DE] animate-fade-in-up">
          {/* Accent monoline branches on the header sides */}
          <div className="absolute top-10 left-4 w-10 h-10 text-[#6B7E43]/15 pointer-events-none select-none">
            <svg viewBox="0 0 50 50" className="w-full h-full fill-none stroke-current stroke-1">
              <path d="M 0 50 C 10 30, 20 20, 40 10" />
            </svg>
          </div>
          <div className="absolute top-10 right-4 w-10 h-10 text-[#6B7E43]/15 pointer-events-none select-none scale-x-[-1]">
            <svg viewBox="0 0 50 50" className="w-full h-full fill-none stroke-current stroke-1">
              <path d="M 0 50 C 10 30, 20 20, 40 10" />
            </svg>
          </div>

          <div className="text-center mb-10 relative z-10">
            <span className="font-script text-4xl text-[#C8521A] block scroll-reveal-title">
              Momentos Guardados
            </span>
            <p className="font-sans text-[9px] tracking-[0.2em] text-[#7A1C28]/60 uppercase mt-1 font-bold font-serif">
              PHOTO GALLERY
            </p>
          </div>

          {/* Asymmetric Collage Grid with Warm Gradients & Outline Drawings */}
          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto relative z-10">
            
            {/* Photo 1: Vertical Tall */}
            <div className="col-span-2 row-span-2 h-72 rounded-lg overflow-hidden border border-[#EFE8DE] shadow-xs relative group bg-gradient-to-br from-[#FAF2EB] via-[#F3D7D7] to-[#D98282] flex items-center justify-center transition-all duration-300 hover:scale-[1.01] hover:shadow-sm cursor-pointer">
              <div className="absolute inset-0 bg-[#7A1C28]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              {/* Botanical Overlay Drawing */}
              <div className="text-[#7A1C28]/25 w-24 h-24 absolute pointer-events-none select-none animate-float">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-1">
                  <path d="M 50 10 C 60 30, 40 50, 50 90 M 50 50 C 70 40, 80 60, 90 70 M 50 30 C 30 20, 20 40, 10 50" />
                </svg>
              </div>
              <div className="relative z-10 p-2.5 bg-white/90 rounded-full shadow-sm text-[#7A1C28] group-hover:scale-110 transition-transform duration-500">
                <Camera className="w-5 h-5" />
              </div>
            </div>

            {/* Photo 2: Small Square */}
            <div className="col-span-1 row-span-1 h-32 rounded-lg overflow-hidden border border-[#EFE8DE] shadow-xs relative group bg-gradient-to-br from-[#FDFBF7] via-[#F3D7D7] to-[#E59834]/30 flex items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xs cursor-pointer">
              <div className="absolute inset-0 bg-[#7A1C28]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="text-[#6B7E43]/20 w-12 h-12 absolute pointer-events-none select-none animate-float" style={{ animationDelay: "1.5s" }}>
                <svg viewBox="0 0 50 50" className="w-full h-full fill-none stroke-current stroke-1">
                  <path d="M 25 5 C 30 15, 20 25, 25 45" />
                </svg>
              </div>
              <div className="relative z-10 p-2 bg-white/90 rounded-full shadow-sm text-[#7A1C28] group-hover:scale-110 transition-transform duration-500">
                <Camera className="w-4 h-4" />
              </div>
            </div>

            {/* Photo 3: Small Square */}
            <div className="col-span-1 row-span-1 h-32 rounded-lg overflow-hidden border border-[#EFE8DE] shadow-xs relative group bg-gradient-to-br from-[#FAF2EB] via-[#FAF8F5] to-[#6B7E43]/20 flex items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xs cursor-pointer">
              <div className="absolute inset-0 bg-[#7A1C28]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="text-[#6B7E43]/20 w-12 h-12 absolute pointer-events-none select-none animate-float" style={{ animationDelay: "3s" }}>
                <svg viewBox="0 0 50 50" className="w-full h-full fill-none stroke-current stroke-1">
                  <path d="M 25 5 C 30 15, 20 25, 25 45" />
                </svg>
              </div>
              <div className="relative z-10 p-2 bg-white/90 rounded-full shadow-sm text-[#7A1C28] group-hover:scale-110 transition-transform duration-500">
                <Camera className="w-4 h-4" />
              </div>
            </div>

            {/* Photo 4: Horizontal Wide */}
            <div className="col-span-3 row-span-1 h-40 rounded-lg overflow-hidden border border-[#EFE8DE] shadow-xs relative group bg-gradient-to-br from-[#FDFBF7] via-[#FAF2EB] to-[#D98282]/40 flex items-center justify-center transition-all duration-300 hover:scale-[1.01] hover:shadow-sm cursor-pointer">
              <div className="absolute inset-0 bg-[#7A1C28]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="text-[#7A1C28]/15 w-36 h-12 absolute pointer-events-none select-none animate-float" style={{ animationDelay: "2s" }}>
                <svg viewBox="0 0 150 50" className="w-full h-full fill-none stroke-current stroke-1">
                  <path d="M 10 25 C 50 25, 100 25, 140 25 M 30 25 C 30 15, 45 15, 45 25 M 105 25 C 105 15, 120 15, 120 25" />
                </svg>
              </div>
              <div className="relative z-10 p-2.5 bg-white/90 rounded-full shadow-sm text-[#7A1C28] group-hover:scale-110 transition-transform duration-500">
                <Camera className="w-5 h-5" />
              </div>
            </div>

          </div>
        </section>

        {/* ================= CONFIRMACIÓN (RSVP CON WHATSAPP) ================= */}
        <section className="py-16 px-6 bg-white relative border-t border-[#EFE8DE] overflow-hidden">
          <div className="absolute inset-4 border border-[#EFE8DE] pointer-events-none rounded-md" />

          {/* Botanical corner illustrations */}
          <div className="absolute bottom-4 left-4 w-12 h-12 text-[#6B7E43]/20 pointer-events-none select-none scale-x-[-1] animate-float">
            <svg viewBox="0 0 50 50" className="w-full h-full fill-none stroke-current stroke-1">
              <path d="M 0 50 C 10 30, 20 20, 40 10 M 15 35 C 25 25, 30 15, 35 5" />
            </svg>
          </div>
          <div className="absolute bottom-4 right-4 w-12 h-12 text-[#6B7E43]/20 pointer-events-none select-none animate-float" style={{ animationDelay: "2.5s" }}>
            <svg viewBox="0 0 50 50" className="w-full h-full fill-none stroke-current stroke-1">
              <path d="M 0 50 C 10 30, 20 20, 40 10 M 15 35 C 25 25, 30 15, 35 5" />
            </svg>
          </div>

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <span className="font-script text-4xl text-[#C8521A] block scroll-reveal-title">
              Confirma tu Asistencia
            </span>
            <p className="font-sans text-[10px] tracking-[0.2em] text-[#7A1C28]/60 uppercase mt-2 font-semibold">
              FAVOR DE CONFIRMAR ANTES DEL 14 DE OCTUBRE 2026
            </p>
            <div className="w-10 my-3 border-b border-[#EFE8DE] mx-auto" />
          </div>

          <form onSubmit={handleRSVPSubmit} className="space-y-5 relative z-10 max-w-xs mx-auto text-left">
            
            {/* Name */}
            <div className="flex flex-col">
              <label htmlFor="rsvpName" className="text-[10px] font-bold uppercase tracking-wider text-[#7A1C28] mb-2 font-sans">
                Nombre Completo
              </label>
              <input
                type="text"
                id="rsvpName"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Juan Carlos Ramos"
                className="px-4 py-2.5 rounded bg-[#FDFBF7] border border-[#EFE8DE] text-[#2D1810] text-xs font-sans focus:outline-hidden focus:border-[#C8521A] focus:ring-1 focus:ring-[#C8521A] transition-all shadow-xs"
              />
            </div>

            {/* Attendance Radios */}
            <div className="flex flex-col">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#7A1C28] mb-2 font-sans">
                ¿Asistirás?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttendance("yes")}
                  className={`py-2.5 rounded border text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    attendance === "yes"
                      ? "bg-[#7A1C28] border-[#7A1C28] text-white shadow-md scale-[1.01]"
                      : "bg-[#FDFBF7] border-[#EFE8DE] text-[#7A1C28] hover:bg-[#FAF2EB]"
                  }`}
                >
                  ¡Sí, con mucho gusto!
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance("no")}
                  className={`py-2.5 rounded border text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    attendance === "no"
                      ? "bg-[#7A1C28] border-[#7A1C28] text-white shadow-md scale-[1.01]"
                      : "bg-[#FDFBF7] border-[#EFE8DE] text-[#7A1C28] hover:bg-[#FAF2EB]"
                  }`}
                >
                  Lo siento, no podré
                </button>
              </div>
            </div>

            {/* Conditional Fields */}
            {attendance === "yes" && (
              <div className="space-y-5 animate-[fadeIn_0.3s_ease-out_forwards]">
                {/* Number of passes */}
                <div className="flex flex-col">
                  <label htmlFor="rsvpGuests" className="text-[10px] font-bold uppercase tracking-wider text-[#7A1C28] mb-2 font-sans">
                    Número de pases
                  </label>
                  <select
                    id="rsvpGuests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="px-4 py-2.5 rounded bg-[#FDFBF7] border border-[#EFE8DE] text-[#2D1810] text-xs font-sans focus:outline-hidden focus:border-[#C8521A] focus:ring-1 focus:ring-[#C8521A] transition-all shadow-xs appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237A1C28' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1.1em",
                    }}
                  >
                    <option value="1">1 Pase</option>
                    <option value="2">2 Pases (Pase Doble)</option>
                    <option value="3">3 Pases</option>
                    <option value="4">4 Pases</option>
                  </select>
                </div>

                {/* Diet notes */}
                <div className="flex flex-col">
                  <label htmlFor="rsvpDiet" className="text-[10px] font-bold uppercase tracking-wider text-[#7A1C28] mb-2 font-sans">
                    Mensaje o Alergias Alimenticias
                  </label>
                  <textarea
                    id="rsvpDiet"
                    rows={2}
                    value={diet}
                    onChange={(e) => setDiet(e.target.value)}
                    placeholder="Ej. Menú vegetariano, alérgico al gluten..."
                    className="px-4 py-2.5 rounded bg-[#FDFBF7] border border-[#EFE8DE] text-[#2D1810] text-xs font-sans focus:outline-hidden focus:border-[#C8521A] focus:ring-1 focus:ring-[#C8521A] transition-all shadow-xs resize-none"
                  />
                </div>
              </div>
            )}

            {/* Confirm button */}
            <button
              type="submit"
              disabled={attendance === null}
              className={`w-full py-3 rounded text-[10px] font-bold uppercase tracking-widest text-white shadow-md transition-all duration-300 flex items-center justify-center gap-1.5 ${
                attendance === null
                  ? "bg-[#7A1C28]/40 cursor-not-allowed"
                  : "bg-[#7A1C28] hover:bg-[#5E121B] active:scale-98 cursor-pointer"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              Confirmar por WhatsApp
            </button>

          </form>

          {/* Decorative QR Code SVG Pattern */}
          <div className="mt-12 flex flex-col items-center justify-center relative z-10">
            <div className="p-3.5 bg-white border border-[#EFE8DE] rounded-md shadow-xs flex flex-col items-center">
              <svg className="w-20 h-20 text-[#7A1C28]" viewBox="0 0 100 100" fill="currentColor">
                <rect x="0" y="0" width="24" height="24" />
                <rect x="3" y="3" width="18" height="18" fill="white" />
                <rect x="6" y="6" width="12" height="12" />

                <rect x="76" y="0" width="24" height="24" />
                <rect x="79" y="3" width="18" height="18" fill="white" />
                <rect x="82" y="6" width="12" height="12" />

                <rect x="0" y="76" width="24" height="24" />
                <rect x="3" y="79" width="18" height="18" fill="white" />
                <rect x="6" y="82" width="12" height="12" />

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
                <circle cx="40" cy="40" r="3.5" />

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
              <span className="text-[8px] tracking-widest text-[#6B7E43] uppercase font-sans mt-2 font-bold animate-pulse">
                #BodaPaolaYRogelio
              </span>
            </div>
          </div>

        </section>

        {/* ================= FOOTER ================= */}
        <footer className="py-12 text-center bg-[#FDFBF7] border-t border-[#EFE8DE] relative z-10 space-y-2 select-none">
          <p className="font-serif text-lg font-light text-[#7A1C28] tracking-widest animate-pulse">
            P & R
          </p>
          <p className="font-sans text-[9px] font-semibold tracking-wider text-[#C8521A]">
            #BodaPaolaYRogelio
          </p>
          <p className="font-script text-2xl text-[#7A1C28]/70 pt-2 block">
            Agradecemos de corazón su compañía.
          </p>
          <p className="font-sans text-[8px] tracking-[0.25em] text-[#7A1C28]/35 uppercase mt-4 block">
            Paola & Rogelio • 2026
          </p>
        </footer>

      </div>

    </main>
  );
}
