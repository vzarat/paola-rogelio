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
  { left: "8%", size: 13, delay: "0s", duration: "6.5s", color: "#B00056", opacity: 0.75, rotate: 12 },
  { left: "22%", size: 17, delay: "1.2s", duration: "8s", color: "#E63917", opacity: 0.55, rotate: 35 },
  { left: "33%", size: 12, delay: "2.8s", duration: "7s", color: "#FFB300", opacity: 0.50, rotate: -25 },
  { left: "48%", size: 19, delay: "0.4s", duration: "9s", color: "#1D62C4", opacity: 0.50, rotate: 20 },
  { left: "62%", size: 14, delay: "1.8s", duration: "5.8s", color: "#B00056", opacity: 0.80, rotate: -15 },
  { left: "76%", size: 16, delay: "4.2s", duration: "7.6s", color: "#E63917", opacity: 0.60, rotate: 45 },
  { left: "88%", size: 13, delay: "0.8s", duration: "6.2s", color: "#FFB300", opacity: 0.50, rotate: 8 },
  { left: "12%", size: 16, delay: "5.2s", duration: "8.6s", color: "#1D62C4", opacity: 0.50, rotate: -30 },
  { left: "28%", size: 14, delay: "2.2s", duration: "7.2s", color: "#B00056", opacity: 0.65, rotate: 18 },
  { left: "42%", size: 18, delay: "3.2s", duration: "9.2s", color: "#E63917", opacity: 0.55, rotate: -12 },
  { left: "55%", size: 11, delay: "6.2s", duration: "6.2s", color: "#FFB300", opacity: 0.50, rotate: 40 },
  { left: "70%", size: 17, delay: "1.5s", duration: "8.4s", color: "#1D62C4", opacity: 0.50, rotate: -35 },
  { left: "82%", size: 13, delay: "3.8s", duration: "7.4s", color: "#B00056", opacity: 0.70, rotate: 5 },
  { left: "18%", size: 15, delay: "0.6s", duration: "6.9s", color: "#E63917", opacity: 0.55, rotate: 28 },
  { left: "73%", size: 12, delay: "3.0s", duration: "7.9s", color: "#FFB300", opacity: 0.60, rotate: -22 }
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
    { name: "Magenta", hex: "bg-[#B00056]", border: "border-[#80003C]" },
    { name: "Rojo Cálido", hex: "bg-[#E63917]", border: "border-[#B3240C]" },
    { name: "Amarillo", hex: "bg-[#FFB300]", border: "border-[#CC8F00]" },
    { name: "Azul Cobalto", hex: "bg-[#1D62C4]", border: "border-[#14438A]" },
    { name: "Verde Olivo", hex: "bg-[#5A7A38]", border: "border-[#435C2A]" },
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

        @keyframes cardReveal {
          from {
            opacity: 0;
            transform: translateY(35px) scale(0.98);
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

        .scroll-reveal-card {
          animation-name: cardReveal;
          animation-fill-mode: both;
          animation-timeline: view();
          animation-range: entry 5% cover 25%;
        }
      `}</style>

      {/* Centered Vertical Story Card Container */}
      <div className="w-full max-w-md min-h-screen md:min-h-[850px] md:max-h-[92vh] md:rounded-xl bg-[#FDFBF7] shadow-2xl overflow-y-auto relative border-x border-[#EFE8DE] flex flex-col md:my-auto scrollbar-thin">
        
        {/* ================= WELCOME OPENING SCREEN (ENVELOPE COVER) ================= */}
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#FDFBF7] p-6 text-center overflow-hidden h-[100dvh] transition-opacity duration-700 select-none ${
          isEnvelopeOpen ? "pointer-events-none opacity-0" : "opacity-100"
        }`}>
          {/* Dark border frame */}
          <div className="absolute inset-4 border border-[#1A1A1A]/20 pointer-events-none rounded-md" />
          <div className="absolute inset-[22px] border border-dashed border-[#1A1A1A]/10 pointer-events-none rounded-md" />

          {/* Floral Folk Art Header Banner */}
          <div className="w-full -mt-6 z-10 max-w-[340px]">
            <img src="/flores.png" alt="Flores" className="w-full h-auto object-contain" />
          </div>

          {/* Invitation Text */}
          <div className="space-y-4 max-w-xs text-center my-auto z-10">
            <p className="font-sans text-[9px] tracking-[0.35em] text-[#B00056] uppercase font-bold">NUESTRA BODA</p>
            
            {/* Couple Names Serif Layout */}
            <div className="flex flex-col items-center justify-center py-2">
              <h2 className="font-serif text-3xl tracking-wider text-[#1A1A1A] font-bold uppercase leading-none">PAOLA</h2>
              <span className="font-serif text-4xl text-[#B00056] font-bold italic my-1">&</span>
              <h2 className="font-serif text-3xl tracking-wider text-[#1A1A1A] font-bold uppercase leading-none">ROGELIO</h2>
            </div>
            
            <div className="w-12 border-b border-[#B00056]/30 mx-auto" />
            <p className="font-sans text-[11px] text-[#2D1810]/60 leading-relaxed font-light mt-4">
              Te invitamos a compartir con nosotros el día más importante de nuestras vidas.
            </p>
          </div>

          {/* Button to Open & Autoplay Audio */}
          <div className="mb-8 flex flex-col items-center space-y-3 z-10">
            <p className="font-sans text-[9px] tracking-wider text-[#B00056]/80 uppercase animate-pulse">
              Toca para abrir la invitación con música
            </p>
            <button
              onClick={handleOpenInvitation}
              className="px-8 py-3 bg-[#B00056] hover:bg-[#E63917] active:scale-95 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer"
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
                className={`w-[2px] bg-[#B00056] rounded-full transition-all duration-300 ${
                  isPlaying ? "animate-[bounce_0.8s_infinite_100ms]" : "h-1"
                }`}
                style={{ height: isPlaying ? undefined : "3px" }}
              />
              <span
                className={`w-[2px] bg-[#B00056] rounded-full transition-all duration-300 ${
                  isPlaying ? "animate-[bounce_0.8s_infinite_300ms]" : "h-2.5"
                }`}
                style={{ height: isPlaying ? undefined : "9px" }}
              />
              <span
                className={`w-[2px] bg-[#B00056] rounded-full transition-all duration-300 ${
                  isPlaying ? "animate-[bounce_0.8s_infinite_200ms]" : "h-1.5"
                }`}
                style={{ height: isPlaying ? undefined : "5px" }}
              />
            </div>

            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-[#B00056] fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 text-[#B00056] fill-current translate-x-[0.5px]" />
            )}
            
            <Music className={`w-3 h-3 text-[#B00056]/60 ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "6s" }} />
          </button>
        </div>

        {/* ================= HERO SECTION (PORTADA EDITORIAL) ================= */}
        <section className="flex flex-col items-center justify-between text-center min-h-[90vh] py-12 px-6 relative overflow-hidden select-none animate-fade-in-up">
          {/* Dark border frame */}
          <div className="absolute inset-4 border border-[#1A1A1A]/10 pointer-events-none rounded-md" />
          <div className="absolute inset-[18px] border border-dashed border-[#1A1A1A]/5 pointer-events-none rounded-md" />

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

          {/* Floral Folk Art Header Banner */}
          <div className="w-full -mt-12 mb-2 z-10">
            <img src="/flores.png" alt="Flores" className="w-full h-auto object-contain" />
          </div>

          {/* Heading */}
          <div className="mt-2 flex flex-col items-center z-10 w-full">
            <p className="font-sans text-[9px] tracking-[0.35em] text-[#B00056] uppercase font-bold">
              NUESTRA BODA
            </p>
          </div>

          {/* Names */}
          <div className="flex flex-col items-center justify-center my-4 z-10 w-full px-4">
            <h1 className="font-serif text-4xl tracking-wider text-[#1A1A1A] font-bold uppercase leading-none animate-title-reveal">PAOLA</h1>
            <span className="font-serif text-5xl text-[#B00056] font-bold italic my-1 animate-subtitle-reveal">&</span>
            <h1 className="font-serif text-4xl tracking-wider text-[#1A1A1A] font-bold uppercase leading-none animate-title-reveal">ROGELIO</h1>
          </div>

          {/* Date Block */}
          <div className="my-4 z-10 flex flex-col items-center">
            <span className="font-sans text-[10px] tracking-[0.25em] text-[#1A1A1A]/60 uppercase font-bold mb-1.5">
              . SÁBADO .
            </span>
            <div className="w-full flex items-center justify-center gap-6 py-2 border-y border-[#1A1A1A]/20 text-lg font-bold tracking-widest text-[#1A1A1A] font-serif min-w-[260px]">
              <span>NOV</span>
              <span className="text-2xl font-extrabold text-[#B00056]">14</span>
              <span>2026</span>
            </div>
            <span className="font-sans text-[10px] tracking-[0.2em] text-[#1A1A1A]/60 uppercase font-bold mt-1.5">
              . 6:00 PM .
            </span>
          </div>

          {/* Quote */}
          <div className="mb-4 px-4 z-10">
            <p className="font-script text-2.5xl text-[#B00056]">
              "El amor nunca deja de ser."
            </p>
          </div>

          {/* Bounce indicator */}
          <div className="absolute bottom-2.5 flex flex-col items-center text-[#B00056]/30 animate-bounce">
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
              <circle cx="48" cy="52" r="1.5" fill="#B00056" />
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 text-[#6B7E43]/15 rotate-180 pointer-events-none select-none animate-float" style={{ animationDelay: "2s" }}>
            <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-1">
              <path d="M 0 0 C 30 10, 45 35, 35 60" />
              <path d="M 35 60 C 30 50, 40 48, 48 52 C 38 40, 30 30, 0 0 Z" fill="currentColor" fillOpacity="0.05" />
              <circle cx="48" cy="52" r="1.5" fill="#B00056" />
            </svg>
          </div>

          <div className="relative z-10 max-w-xs mx-auto text-center space-y-5">
            <span className="font-script text-4xl text-[#E63917] block scroll-reveal-title">
              Nuestra Historia
            </span>
            
            <div className="w-10 border-b border-[#EFE8DE] mx-auto my-2" />

            <div className="p-4 rounded-lg bg-[#F7F2EB]/40 border border-[#EFE8DE]/40 relative transition-transform duration-300 hover:scale-[1.02] scroll-reveal-card">
              <p className="font-sans text-xs text-[#2D1810]/85 leading-relaxed font-light">
                Desde el primer día que conversamos, supimos que compartíamos un camino común. Nuestra historia se ha construido de risas, metas compartidas y un profundo amor que hoy decidimos consolidar ante Dios y las personas que más queremos.
              </p>
            </div>

            <div className="py-1 flex justify-center text-[#B00056]/40 animate-pulse">
              <Heart className="w-4 h-4 fill-current" />
            </div>

            <div className="p-4 rounded-lg bg-[#FDFBF7]/60 border border-[#EFE8DE]/45 relative transition-transform duration-300 hover:scale-[1.02] scroll-reveal-card">
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
            <span className="font-script text-4xl text-[#E63917] block scroll-reveal-title">
              El Itinerario
            </span>
            <p className="font-sans text-[9px] tracking-[0.2em] text-[#B00056]/60 uppercase mt-1 font-bold">
              PROGRAMA DE LA BODA
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

            <div className="border border-[#B00056]/15 rounded-t-full px-6 py-12 bg-white shadow-xs relative transition-transform duration-500 hover:scale-[1.01] scroll-reveal-card">
              <div className="absolute inset-1.5 border border-dashed border-[#B00056]/10 rounded-t-full pointer-events-none" />

              {/* Timeline list */}
              <div className="relative space-y-8 z-10 text-left">
                
                {/* Event 1 */}
                <div className="flex gap-4 relative group">
                  <div className="absolute left-[15px] top-8 bottom-[-32px] w-px border-l border-dashed border-[#B00056]/20" />
                  <div className="w-8 h-8 rounded-full bg-[#FDFBF7] border border-[#EFE8DE] flex items-center justify-center text-[#B00056] shrink-0 shadow-xs transition-all duration-300 group-hover:scale-115 group-hover:bg-[#FDFBF7] group-hover:shadow-md">
                    <Church className="w-4 h-4 text-[#6B7E43]" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-serif text-[10px] font-bold text-[#B00056] bg-[#B00056]/5 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                      <Clock className="w-3 h-3 text-[#E59834]" />
                      6:00 PM - 7:00 PM
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-[#B00056]">Ceremonia Religiosa</h4>
                    <p className="font-sans text-[11px] text-[#2D1810]/70 font-light">Enlace y bendición sacramental.</p>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="flex gap-4 relative group">
                  <div className="w-8 h-8 rounded-full bg-[#FDFBF7] border border-[#EFE8DE] flex items-center justify-center text-[#B00056] shrink-0 shadow-xs transition-all duration-300 group-hover:scale-115 group-hover:bg-[#FDFBF7] group-hover:shadow-md">
                    <Sparkles className="w-4 h-4 text-[#E59834]" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-serif text-[10px] font-bold text-[#B00056] bg-[#B00056]/5 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                      <Clock className="w-3 h-3 text-[#E59834]" />
                      7:00 PM - 12:00 AM
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-[#B00056]">Banquete & Fiesta</h4>
                    <p className="font-sans text-[11px] text-[#2D1810]/70 font-light">Cena, brindis de honor y gran festejo.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ================= DETALLES & VESTIMENTA ================= */}
        <section className="py-16 px-6 bg-white relative border-t border-[#EFE8DE] overflow-hidden">
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#B00056]/10" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#B00056]/10" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#B00056]/10" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#B00056]/10" />

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
            <span className="font-script text-4xl text-[#E63917] block scroll-reveal-title">
              Código de Vestimenta
            </span>
            <p className="font-sans text-[9px] tracking-[0.2em] text-[#B00056]/60 uppercase mt-1 font-bold">
              DETALLES DEL EVENTO
            </p>
          </div>

          <div className="max-w-xs mx-auto text-center space-y-6 relative z-10 scroll-reveal-card">
            
            {/* Outline vectors */}
            <div className="flex justify-center gap-6">
              {/* Hat (Sombrero) SVG */}
              <div className="w-14 h-14 bg-[#FDFBF7] rounded-full border border-[#EFE8DE] flex items-center justify-center text-[#B00056] shadow-xs hover:scale-105 transition-transform duration-300">
                <svg viewBox="0 0 100 100" className="w-7 h-7 fill-none stroke-current stroke-[2.5]">
                  <path d="M 35 25 L 65 25 L 62 65 L 38 65 Z" stroke="#6B7E43" />
                  <path d="M 38 65 L 39 57 L 61 57 L 62 65" stroke="#B00056" />
                  <path d="M 20 65 C 25 63, 75 63, 80 65 C 85 66, 85 69, 80 70 C 75 72, 25 72, 20 70 C 15 69, 15 66, 20 65 Z" stroke="#6B7E43" />
                </svg>
              </div>

              {/* Dress Gown SVG */}
              <div className="w-14 h-14 bg-[#FDFBF7] rounded-full border border-[#EFE8DE] flex items-center justify-center text-[#B00056] shadow-xs hover:scale-105 transition-transform duration-300">
                <svg viewBox="0 0 100 100" className="w-7 h-7 fill-none stroke-current stroke-[2.5]">
                  <path d="M 40 20 C 45 35, 30 55, 25 85 L 75 85 C 70 55, 55 35, 60 20 Z" stroke="#B00056" fill="#F3D7D7" fillOpacity="0.4" />
                  <path d="M 40 20 C 44 14, 56 14, 60 20" stroke="#B00056" />
                </svg>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-[#B00056]">
                Formal
              </h4>
              <p className="font-sans text-xs text-[#2D1810]/70 leading-relaxed font-light">
                Vestimenta formal. Agradecemos evitar vestir de color blanco.
              </p>
            </div>

            {/* Suggested Palette */}
            <div className="py-3 bg-[#FDFBF7]/85 border border-[#EFE8DE] rounded-lg p-3">
              <p className="text-[9px] uppercase tracking-wider font-semibold text-[#B00056]/70 mb-2 font-bold font-serif">
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
              <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-[#B00056]">
                Mesa de Regalos
              </h4>
              <p className="font-sans text-xs text-[#2D1810]/70 leading-relaxed font-light">
                El mejor regalo es su presencia. Si desean realizar un obsequio, agradeceríamos un detalle en efectivo mediante sobre el día del evento o transferencia bancaria:
              </p>

              {/* Transfer account details card */}
              <div className="p-3.5 rounded-lg border border-[#EFE8DE] bg-[#FAF8F5] text-left space-y-2 relative transition-all duration-300 hover:shadow-xs hover:border-[#B00056]/30">
                <div className="flex justify-between items-center text-[9px] font-semibold text-[#B00056]/60">
                  <span>DATOS DE TRANSFERENCIA</span>
                  <span className="px-1.5 py-0.5 bg-[#B00056]/10 text-[#B00056] rounded font-semibold text-[8px]">CLABE</span>
                </div>
                <div className="text-xs text-[#2D1810] space-y-1">
                  <p className="font-bold">Banco Nacional</p>
                  <p className="text-[11px] text-[#2D1810]/70">Titular: Paola & Rogelio Boda</p>
                  <div className="text-[11px] font-mono bg-white border border-[#EFE8DE] px-2 py-1.5 rounded flex justify-between items-center mt-1 focus-within:ring-1 focus-within:ring-[#E63917]">
                    <span>CLABE: {clabeNumber}</span>
                    <button
                      onClick={handleCopyCLABE}
                      className="p-1 hover:bg-slate-100 rounded text-[#E63917] transition-colors active:scale-90"
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
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#B00056] text-white text-xs tracking-wider rounded-full shadow-lg border border-white/10 flex items-center gap-1.5 transition-all duration-300 uppercase ${
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
            <span className="font-script text-4xl text-[#E63917] block scroll-reveal-title">
              Ubicaciones
            </span>
            <p className="font-sans text-[9px] tracking-[0.2em] text-[#B00056]/60 uppercase mt-1 font-semibold">
              UBICACIONES
            </p>
          </div>

          <div className="space-y-6 max-w-xs mx-auto text-left relative z-10">
            
            {/* Ceremony Card */}
            <div className="bg-white border border-[#EFE8DE] rounded-lg overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group scroll-reveal-card">
              <div className="h-32 bg-gradient-to-br from-[#FAF2EB] via-[#F3D7D7] to-[#D98282] p-4 flex items-end relative border-b border-[#EFE8DE] overflow-hidden">
                
                {/* SVG Facade Line art in Olive Green with flower branches */}
                <div className="absolute right-4 bottom-2 w-20 h-24 text-[#6B7E43]/20 group-hover:scale-105 transition-transform duration-500">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-[1.5]">
                    <path d="M 20 90 L 20 50 L 50 20 L 80 50 L 80 90 Z" />
                    <path d="M 40 90 L 40 70 C 40 65, 60 65, 60 70 L 60 90 Z" />
                    <path d="M 50 20 L 50 5" />
                    <path d="M 45 10 L 55 10" />
                    {/* Tiny monoline rose bud */}
                    <path d="M 85 45 C 90 40, 92 48, 85 45 Z" fill="#B00056" fillOpacity="0.2" />
                  </svg>
                </div>
                <div className="relative z-10">
                  <span className="text-[9px] font-bold text-[#B00056] block uppercase">14 de Noviembre 2026</span>
                  <h4 className="font-serif text-base font-semibold text-[#B00056]">Gómez Farías, Tamaulipas</h4>
                </div>
              </div>
              <div className="p-4 space-y-3.5">
                <p className="font-sans text-xs text-[#2D1810]/70 font-light leading-relaxed">
                  Zona Centro, Gómez Farías, Tamaulipas.
                </p>
                <a
                  href="https://maps.google.com/?q=Gomez+Farias+Tamaulipas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded border border-[#B00056]/15 text-[10px] font-bold uppercase tracking-wider text-[#B00056] bg-white hover:bg-slate-50 transition-all w-full shadow-xs active:scale-98"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#E63917]" />
                  Abrir en Google Maps
                </a>
              </div>
            </div>

            {/* Reception Card */}
            <div className="bg-white border border-[#EFE8DE] rounded-lg overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group scroll-reveal-card">
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
                  <span className="text-[9px] font-bold text-[#B00056] block uppercase">7:00 PM</span>
                  <h4 className="font-serif text-base font-semibold text-[#B00056]">Hostal Casa de Piedra</h4>
                </div>
              </div>
              <div className="p-4 space-y-3.5">
                <p className="font-sans text-xs text-[#2D1810]/70 font-light leading-relaxed">
                  Calle Hidalgo s/n (a 150m de la Presidencia Municipal), Gómez Farías, Tamaulipas.
                </p>
                <a
                  href="https://maps.app.goo.gl/nMLmNS6j987hkA1z7?g_st=iw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded border border-[#B00056]/15 text-[10px] font-bold uppercase tracking-wider text-[#B00056] bg-white hover:bg-slate-50 transition-all w-full shadow-xs active:scale-98"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#E63917]" />
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
            <span className="font-script text-4xl text-[#E63917] block scroll-reveal-title">
              Momentos Guardados
            </span>
            <p className="font-sans text-[9px] tracking-[0.2em] text-[#B00056]/60 uppercase mt-1 font-bold font-serif">
              GALERÍA DE FOTOS
            </p>
          </div>

          {/* Asymmetric Collage Grid with Warm Gradients & Outline Drawings */}
          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto relative z-10">
            
            {/* Photo 1: Vertical Tall */}
            <div className="col-span-2 row-span-2 h-72 rounded-lg overflow-hidden border border-[#EFE8DE] shadow-xs relative group bg-gradient-to-br from-[#FAF2EB] via-[#F3D7D7] to-[#D98282] flex items-center justify-center transition-all duration-300 hover:scale-[1.01] hover:shadow-sm cursor-pointer scroll-reveal-card">
              <div className="absolute inset-0 bg-[#B00056]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              {/* Botanical Overlay Drawing */}
              <div className="text-[#B00056]/25 w-24 h-24 absolute pointer-events-none select-none animate-float">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-1">
                  <path d="M 50 10 C 60 30, 40 50, 50 90 M 50 50 C 70 40, 80 60, 90 70 M 50 30 C 30 20, 20 40, 10 50" />
                </svg>
              </div>
              <div className="relative z-10 p-2.5 bg-white/90 rounded-full shadow-sm text-[#B00056] group-hover:scale-110 transition-transform duration-500">
                <Camera className="w-5 h-5" />
              </div>
            </div>

            {/* Photo 2: Small Square */}
            <div className="col-span-1 row-span-1 h-32 rounded-lg overflow-hidden border border-[#EFE8DE] shadow-xs relative group bg-gradient-to-br from-[#FDFBF7] via-[#F3D7D7] to-[#E59834]/30 flex items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xs cursor-pointer scroll-reveal-card">
              <div className="absolute inset-0 bg-[#B00056]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="text-[#6B7E43]/20 w-12 h-12 absolute pointer-events-none select-none animate-float" style={{ animationDelay: "1.5s" }}>
                <svg viewBox="0 0 50 50" className="w-full h-full fill-none stroke-current stroke-1">
                  <path d="M 25 5 C 30 15, 20 25, 25 45" />
                </svg>
              </div>
              <div className="relative z-10 p-2 bg-white/90 rounded-full shadow-sm text-[#B00056] group-hover:scale-110 transition-transform duration-500">
                <Camera className="w-4 h-4" />
              </div>
            </div>

            {/* Photo 3: Small Square */}
            <div className="col-span-1 row-span-1 h-32 rounded-lg overflow-hidden border border-[#EFE8DE] shadow-xs relative group bg-gradient-to-br from-[#FAF2EB] via-[#FAF8F5] to-[#6B7E43]/20 flex items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xs cursor-pointer scroll-reveal-card">
              <div className="absolute inset-0 bg-[#B00056]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="text-[#6B7E43]/20 w-12 h-12 absolute pointer-events-none select-none animate-float" style={{ animationDelay: "3s" }}>
                <svg viewBox="0 0 50 50" className="w-full h-full fill-none stroke-current stroke-1">
                  <path d="M 25 5 C 30 15, 20 25, 25 45" />
                </svg>
              </div>
              <div className="relative z-10 p-2 bg-white/90 rounded-full shadow-sm text-[#B00056] group-hover:scale-110 transition-transform duration-500">
                <Camera className="w-4 h-4" />
              </div>
            </div>

            {/* Photo 4: Horizontal Wide */}
            <div className="col-span-3 row-span-1 h-40 rounded-lg overflow-hidden border border-[#EFE8DE] shadow-xs relative group bg-gradient-to-br from-[#FDFBF7] via-[#FAF2EB] to-[#D98282]/40 flex items-center justify-center transition-all duration-300 hover:scale-[1.01] hover:shadow-sm cursor-pointer scroll-reveal-card">
              <div className="absolute inset-0 bg-[#B00056]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="text-[#B00056]/15 w-36 h-12 absolute pointer-events-none select-none animate-float" style={{ animationDelay: "2s" }}>
                <svg viewBox="0 0 150 50" className="w-full h-full fill-none stroke-current stroke-1">
                  <path d="M 10 25 C 50 25, 100 25, 140 25 M 30 25 C 30 15, 45 15, 45 25 M 105 25 C 105 15, 120 15, 120 25" />
                </svg>
              </div>
              <div className="relative z-10 p-2.5 bg-white/90 rounded-full shadow-sm text-[#B00056] group-hover:scale-110 transition-transform duration-500">
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
            <span className="font-script text-4xl text-[#E63917] block scroll-reveal-title">
              Confirma tu Asistencia
            </span>
            <p className="font-sans text-[10px] tracking-[0.2em] text-[#B00056]/60 uppercase mt-2 font-semibold">
              FAVOR DE CONFIRMAR ANTES DEL 14 DE OCTUBRE 2026
            </p>
            <div className="w-10 my-3 border-b border-[#EFE8DE] mx-auto" />
          </div>

          <form onSubmit={handleRSVPSubmit} className="space-y-5 relative z-10 max-w-xs mx-auto text-left scroll-reveal-card">
            
            {/* Name */}
            <div className="flex flex-col">
              <label htmlFor="rsvpName" className="text-[10px] font-bold uppercase tracking-wider text-[#B00056] mb-2 font-sans">
                Nombre Completo
              </label>
              <input
                type="text"
                id="rsvpName"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Juan Carlos Ramos"
                className="px-4 py-2.5 rounded bg-[#FDFBF7] border border-[#EFE8DE] text-[#2D1810] text-xs font-sans focus:outline-hidden focus:border-[#E63917] focus:ring-1 focus:ring-[#E63917] transition-all shadow-xs"
              />
            </div>

            {/* Attendance Radios */}
            <div className="flex flex-col">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#B00056] mb-2 font-sans">
                ¿Asistirás?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttendance("yes")}
                  className={`py-2.5 rounded border text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    attendance === "yes"
                      ? "bg-[#B00056] border-[#B00056] text-white shadow-md scale-[1.01]"
                      : "bg-[#FDFBF7] border-[#EFE8DE] text-[#B00056] hover:bg-[#FAF2EB]"
                  }`}
                >
                  ¡Sí, con mucho gusto!
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance("no")}
                  className={`py-2.5 rounded border text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    attendance === "no"
                      ? "bg-[#B00056] border-[#B00056] text-white shadow-md scale-[1.01]"
                      : "bg-[#FDFBF7] border-[#EFE8DE] text-[#B00056] hover:bg-[#FAF2EB]"
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
                  <label htmlFor="rsvpGuests" className="text-[10px] font-bold uppercase tracking-wider text-[#B00056] mb-2 font-sans">
                    Número de pases
                  </label>
                  <select
                    id="rsvpGuests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="px-4 py-2.5 rounded bg-[#FDFBF7] border border-[#EFE8DE] text-[#2D1810] text-xs font-sans focus:outline-hidden focus:border-[#E63917] focus:ring-1 focus:ring-[#E63917] transition-all shadow-xs appearance-none"
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
                  <label htmlFor="rsvpDiet" className="text-[10px] font-bold uppercase tracking-wider text-[#B00056] mb-2 font-sans">
                    Mensaje o Alergias Alimenticias
                  </label>
                  <textarea
                    id="rsvpDiet"
                    rows={2}
                    value={diet}
                    onChange={(e) => setDiet(e.target.value)}
                    placeholder="Ej. Menú vegetariano, alérgico al gluten..."
                    className="px-4 py-2.5 rounded bg-[#FDFBF7] border border-[#EFE8DE] text-[#2D1810] text-xs font-sans focus:outline-hidden focus:border-[#E63917] focus:ring-1 focus:ring-[#E63917] transition-all shadow-xs resize-none"
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
                  ? "bg-[#B00056]/40 cursor-not-allowed"
                  : "bg-[#B00056] hover:bg-[#5E121B] active:scale-98 cursor-pointer"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              Confirmar por WhatsApp
            </button>

          </form>

          {/* Decorative QR Code SVG Pattern */}
          <div className="mt-12 flex flex-col items-center justify-center relative z-10">
            <div className="p-3.5 bg-white border border-[#EFE8DE] rounded-md shadow-xs flex flex-col items-center">
              <svg className="w-20 h-20 text-[#B00056]" viewBox="0 0 100 100" fill="currentColor">
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
          <p className="font-serif text-lg font-light text-[#B00056] tracking-widest animate-pulse">
            P & R
          </p>
          <p className="font-sans text-[9px] font-semibold tracking-wider text-[#E63917]">
            #BodaPaolaYRogelio
          </p>
          <p className="font-script text-2xl text-[#B00056]/70 pt-2 block">
            Agradecemos de corazón su compañía.
          </p>
          <p className="font-sans text-[8px] tracking-[0.25em] text-[#B00056]/35 uppercase mt-4 block">
            Paola & Rogelio • 2026
          </p>
        </footer>

      </div>

    </main>
  );
}
