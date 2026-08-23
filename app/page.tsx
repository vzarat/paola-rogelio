"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
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

const GALLERY_IMAGES = [
  {
    src: "/images/pareja.jpg",
    alt: "Paola y Rogelio bailando",
    className: "col-span-2 row-span-2 h-64",
  },
  {
    src: "/images/novios-3-kiss.jpg",
    alt: "Paola y Rogelio, un beso",
    className: "col-span-1 row-span-2 h-64",
  },
  {
    src: "/images/nuestra_historia.jpg",
    alt: "Paola y Rogelio en la terraza",
    className: "col-span-1 row-span-2 h-52",
  },
  {
    src: "/images/novios-2-hugging.jpg",
    alt: "Paola y Rogelio abrazados",
    className: "col-span-2 row-span-2 h-52",
  },
  {
    src: "/images/gomez_farias.jpg",
    alt: "Paola y Rogelio en Gómez Farías",
    className: "col-span-3 row-span-1 h-44",
  },
];

export default function Home() {
  // Envelope / Cover Screen State
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  // Lightbox State
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");

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

  // Intersection Observer for scroll animation triggers (iOS Safari compatible)
  useEffect(() => {
    if (!isEnvelopeOpen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    // Dynamic query selector for class triggers
    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [isEnvelopeOpen]);

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

    const targetPhone = "528992159176";
    const attendanceMsg = attendance === "yes" ? "¡Sí, con mucho gusto asistiré!" : "Lo siento, no podré asistir";
    const guestsMsg = attendance === "yes" ? `Pases sugeridos: ${guests}` : "Pases sugeridos: 0";
    const restrictionsMsg = diet ? `Notas / Restricciones dietarias: ${diet}` : "Notas / Restricciones: Ninguna";

    const text = `¡Hola Paola y Rogelio!\n\nConfirmo mi asistencia a su enlace matrimonial:\n\n*Nombre completo:* ${name}\n*Confirmación:* ${attendanceMsg}\n*${guestsMsg}*\n*${restrictionsMsg}*\n\n¡Les enviamos un fuerte abrazo!`;
    const encodedText = encodeURIComponent(text);

    window.open(`https://wa.me/${targetPhone}?text=${encodedText}`, "_blank");
  };



  return (
    <main className="flex-1 w-full flex items-center justify-center p-0 md:py-8 sm:px-4 bg-[#FAF9F5] text-[#111111]">
      
      {/* Dynamic Keyframes Stylesheet (Shared scoped animations) */}
      <style>{`
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

        .animate-title-reveal {
          animation: titleReveal 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-subtitle-reveal {
          animation: subtitleReveal 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Scroll reveal animations (Ensures 100% visibility across all browsers) */
        .scroll-reveal {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .delay-100 {
          transition-delay: 100ms;
        }

        .delay-200 {
          transition-delay: 200ms;
        }
      `}</style>

      {/* Centered Vertical Story Card Container */}
      <div className="w-full max-w-md min-h-screen md:min-h-[850px] md:max-h-[92vh] md:rounded-xl bg-white shadow-2xl overflow-y-auto relative border-x border-[#EFECE6] flex flex-col md:my-auto scrollbar-thin">
         {/* ================= WELCOME OPENING SCREEN (ENVELOPE COVER) ================= */}
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 text-center overflow-hidden h-[100dvh] transition-opacity duration-700 select-none ${
          isEnvelopeOpen ? "pointer-events-none opacity-0" : "opacity-100"
        }`}>
          {/* Background Image of the couple */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="/images/pareja.jpg"
              alt="Fondo de bienvenida"
              fill
              priority
              className="object-cover object-center filter brightness-[1.02] contrast-[0.98]"
            />
            {/* White elegant backdrop overlay */}
            <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px]" />
          </div>

          {/* Dashed black border frame */}
          <div className="absolute inset-[20px] border border-dashed border-[#111111]/10 pointer-events-none rounded-md z-10" />

          {/* Interactive content container wrapped in relative z-10 */}
          <div className="relative z-10 flex flex-col items-center justify-between h-full w-full pointer-events-none">
            {/* Monogram */}
            <div className="relative w-20 h-20 mt-8 flex items-center justify-center bg-white rounded-full border border-[#111111]/10 shadow-xs pointer-events-auto">
              <div className="absolute inset-[4px] rounded-full border border-dashed border-[#111111]/5" />
              <span className="font-serif text-2xl font-light text-[#111111] tracking-widest translate-x-[1px]">P&R</span>
            </div>

            {/* Invitation Text */}
            <div className="space-y-4 max-w-xs text-center my-auto pointer-events-auto">
              <p className="font-sans text-[10px] tracking-[0.3em] text-[#111111]/60 uppercase font-semibold">NUESTRA BODA</p>
              
              {/* Stacked Barlow Condensed Names */}
              <div className="flex flex-col items-center justify-center my-6">
                <span className="font-[family-name:var(--font-barlow-condensed)] text-5xl font-bold tracking-widest text-[#111111] uppercase leading-none">PAOLA</span>
                <span className="font-serif italic text-4xl font-light text-[#111111] my-2 select-none">&</span>
                <span className="font-[family-name:var(--font-barlow-condensed)] text-5xl font-bold tracking-widest text-[#111111] uppercase leading-none">ROGELIO</span>
              </div>
              
              <div className="w-8 border-b border-[#111111]/20 mx-auto" />
              
              <p className="font-sans text-[11px] text-[#111111]/70 leading-relaxed font-light mt-4">
                Te invitamos a compartir con nosotros el día más importante de nuestras vidas.
              </p>
            </div>

            {/* Button to Open & Autoplay Audio */}
            <div className="mb-8 flex flex-col items-center space-y-3.5 pointer-events-auto">
              <p className="font-sans text-[9px] tracking-widest text-black/55 uppercase animate-pulse">
                TOCA PARA ABRIR LA INVITACIÓN CON MÚSICA
              </p>
              <button
                onClick={handleOpenInvitation}
                className="px-10 py-3.5 bg-[#111111] hover:bg-black active:scale-97 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-none shadow-xs hover:shadow-md transition-all duration-300 flex items-center gap-2 cursor-pointer border border-black"
              >
                <span>ABRIR INVITACIÓN</span>
                <span className="text-sm">✉</span>
              </button>
            </div>
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
        <section className="flex flex-col items-center text-center bg-white min-h-[90vh] pb-12 relative overflow-hidden select-none animate-fade-in-up">
          {/* Dashed black border frame */}
          <div className="absolute inset-[20px] border border-dashed border-[#111111]/10 pointer-events-none rounded-md z-5" />

          {/* Top Folk Floral Banner Image */}
          <div className="w-full relative aspect-[3/2] z-10 overflow-hidden border-b border-[#111111]/5">
            <Image
              src="/images/flores_folk.jpg"
              alt="Decoración Floral Folclórica"
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          {/* Subtitle */}
          <p className="font-sans text-[10px] tracking-[0.25em] text-[#111111]/70 uppercase font-semibold mt-8 z-10">
            TE INVITAMOS A CELEBRAR NUESTRA BODA
          </p>

          {/* Names side-by-side Layout styled after mockup */}
          <div className="flex items-center justify-center gap-4 my-8 w-full max-w-[320px] px-4 z-10">
            <div className="text-right flex-1">
              <h1 className="font-[family-name:var(--font-barlow-condensed)] text-4xl font-bold tracking-widest text-[#111111] uppercase leading-none">
                PAOLA
              </h1>
            </div>
            
            <span className="font-serif italic text-5xl font-light text-[#111111] leading-none select-none">&</span>
            
            <div className="text-left flex-1">
              <h1 className="font-[family-name:var(--font-barlow-condensed)] text-4xl font-bold tracking-widest text-[#111111] uppercase leading-none">
                ROGELIO
              </h1>
            </div>
          </div>

          {/* Date Block inspired by mockup */}
          <div className="flex flex-col items-center justify-center my-4 z-10">
            {/* Day name */}
            <p className="font-serif text-[11px] italic tracking-widest text-[#111111]/60 mb-2">. Sábado .</p>
            
            {/* Month | Day | Year Grid */}
            <div className="flex items-center justify-center gap-4 w-full max-w-xs">
              <div className="w-16 border-y border-black/20 py-1.5 text-center">
                <span className="font-sans text-[11px] tracking-[0.15em] text-[#111111]/70 uppercase font-bold">NOV</span>
              </div>
              
              <span className="font-serif text-4xl font-normal text-[#111111] leading-none px-1">14</span>
              
              <div className="w-16 border-y border-black/20 py-1.5 text-center">
                <span className="font-sans text-[11px] tracking-[0.15em] text-[#111111]/70 uppercase font-bold">2026</span>
              </div>
            </div>

            {/* Time */}
            <p className="font-serif text-[11px] italic tracking-widest text-[#111111]/60 mt-2">. 6:00 PM .</p>
          </div>

          {/* Location Summary */}
          <div className="space-y-1 mt-4 z-10 text-center px-6">
            <p className="font-sans text-[11px] tracking-[0.2em] font-bold text-[#111111] uppercase">GÓMEZ FARÍAS</p>
            <p className="font-sans text-[9px] tracking-widest text-[#111111]/60 uppercase">TAMAULIPAS, MÉXICO</p>
            <p className="font-serif text-[11px] italic text-[#111111]/60 mt-3 select-none">*recepción a continuación*</p>
          </div>

          {/* Elegant quote at bottom */}
          <div className="mt-8 mb-4 px-6 z-10">
            <p className="font-serif text-lg italic text-[#111111]/80 font-medium">
              "El amor nunca deja de ser."
            </p>
          </div>

          {/* Bounce indicator */}
          <div className="absolute bottom-2.5 flex flex-col items-center text-[#111111]/45 animate-bounce z-20">
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </section>

        {/* ================= NUESTRA HISTORIA ================= */}
        <section className="py-12 px-6 relative bg-white overflow-hidden border-t border-[#111111]/5 animate-fade-in-up">
          <div className="relative z-10 max-w-xs mx-auto text-center space-y-3">
            <h3 className="font-script text-4xl text-[#111111] block">
              Nuestra Historia
            </h3>
            
            <div className="w-8 border-b border-black/25 mx-auto my-2" />
          </div>
        </section>

        {/* ================= SECCIÓN INTERMEDIA: PAPEL RASGADO (VERTICAL COMPLETA) ================= */}
        <div className="w-full h-[480px] sm:h-[560px] relative overflow-hidden pointer-events-none select-none z-20">
          {/* Top Torn Edge (Double Layer) */}
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute -top-1 left-0 right-0 w-full h-12 sm:h-16 pointer-events-none z-20 drop-shadow-[0_8px_12px_rgba(0,0,0,0.18)]">
            {/* Inner Layer (Beige fiber core) */}
            <path d="M 0 0 L 0 10.5 L 5 9.5 L 10 13.5 L 15 11.5 L 20 16.5 L 25 14.5 L 30 18.5 L 35 15.5 L 40 20.5 L 45 18.5 L 50 23.5 L 55 21.5 L 60 25.5 L 65 22.5 L 70 27.5 L 75 24.5 L 80 29.5 L 85 27.5 L 90 31.5 L 95 29.5 L 100 33.5 L 100 0 Z" fill="#EFECE6" />
            {/* Outer Layer (White paper) */}
            <path d="M 0 0 L 0 8 L 5 7 L 10 11 L 15 9 L 20 14 L 25 12 L 30 16 L 35 13 L 40 18 L 45 16 L 50 21 L 55 19 L 60 23 L 65 20 L 70 25 L 75 22 L 80 27 L 85 25 L 90 29 L 95 27 L 100 31 L 100 0 Z" fill="white" />
          </svg>

          {/* Background Image of the couple */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/nuestra_historia.jpg"
              alt="Paola y Rogelio"
              fill
              sizes="(max-w-md) 450px"
              className="object-cover object-center"
            />
          </div>

          {/* Bottom Torn Edge (Double Layer) */}
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute -bottom-1 left-0 right-0 w-full h-12 sm:h-16 pointer-events-none z-20 drop-shadow-[0_-8px_12px_rgba(0,0,0,0.18)]">
            {/* Inner Layer (Beige fiber core) */}
            <path d="M 0 40 L 0 7.5 L 5 8.5 L 10 5.5 L 15 10.5 L 20 8.5 L 25 12.5 L 30 10.5 L 35 14.5 L 40 11.5 L 45 16.5 L 50 14.5 L 55 18.5 L 60 16.5 L 65 20.5 L 70 18.5 L 75 23.5 L 80 21.5 L 85 25.5 L 90 22.5 L 95 26.5 L 100 24.5 L 100 40 Z" fill="#EFECE6" />
            {/* Outer Layer (White paper) */}
            <path d="M 0 40 L 0 10 L 5 11 L 10 8 L 15 13 L 20 11 L 25 15 L 30 13 L 35 17 L 40 14 L 45 19 L 50 17 L 55 21 L 60 19 L 65 23 L 70 21 L 75 26 L 80 24 L 85 28 L 90 25 L 95 29 L 100 27 L 100 40 Z" fill="white" />
          </svg>
        </div>

        {/* ================= MENSAJES DE NUESTRA HISTORIA ================= */}
        <section className="py-12 px-6 relative bg-white overflow-hidden">
          <div className="relative z-10 max-w-xs mx-auto text-center space-y-5">
            <div className="p-4 rounded-none bg-[#FAF9F5]/80 border border-[#111111]/10 relative transition-transform duration-300 hover:scale-[1.01] shadow-2xs">
              <p className="font-serif italic text-sm text-[#111111]/90 leading-relaxed">
                "Mientras uno esté vivo, uno debe amar lo más que pueda"
              </p>
            </div>

            <div className="py-1 flex justify-center text-[#111111]/40 animate-pulse">
              <Heart className="w-4 h-4 fill-current text-[#111111]" />
            </div>

            <div className="p-4 rounded-none bg-[#FAF9F5]/60 border border-[#111111]/10 relative transition-transform duration-300 hover:scale-[1.01] shadow-2xs">
              <p className="font-sans text-xs text-[#111111]/85 leading-relaxed font-light">
                Entre risas, sueños, momentos inolvidables y algunos desafíos, hemos construido una historia que nos ha enseñado que amar también es elegirnos cada día.
              </p>
            </div>
          </div>
        </section>

        {/* ================= EL ITINERARIO (WEDDING PROGRAM) ================= */}
        <section className="py-16 px-6 bg-white relative border-t border-[#111111]/5 overflow-hidden">

          <div className="text-center mb-10 relative z-10">
            <h3 className="font-script text-4xl text-[#111111] block scroll-reveal">
              El Itinerario
            </h3>
            <p className="font-sans text-[9px] tracking-[0.25em] text-[#111111]/50 uppercase mt-1 font-bold scroll-reveal delay-100">
              PROGRAMA
            </p>
          </div>

          <div className="relative max-w-[300px] mx-auto">
            <div className="border border-[#111111]/10 px-6 py-10 bg-white relative shadow-xs scroll-reveal delay-100">
              {/* Timeline list */}
              <div className="relative space-y-8 z-10 text-left">
                
                {/* Event 1 */}
                <div className="flex gap-4 relative group">
                  <div className="absolute left-[15px] top-8 bottom-[-32px] w-px border-l border-dashed border-[#111111]/10" />
                  <div className="w-8 h-8 rounded-full bg-white border border-[#111111]/15 flex items-center justify-center text-black shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:border-black group-hover:shadow-xs">
                    <Church className="w-4 h-4 text-black" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-serif text-[10px] font-bold text-[#111111] bg-[#111111]/5 px-2.5 py-0.5 rounded-none flex items-center gap-1 w-fit">
                      <Clock className="w-3 h-3 text-[#111111]/60" />
                      6:00 PM - 7:00 PM
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-[#111111]">Ceremonia Religiosa</h4>
                    <p className="font-sans text-[11px] text-[#111111]/60 font-light">Enlace y bendición sacramental.</p>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="flex gap-4 relative group">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#111111]/15 flex items-center justify-center text-black shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:border-black group-hover:shadow-xs">
                    <Sparkles className="w-4 h-4 text-black" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-serif text-[10px] font-bold text-[#111111] bg-[#111111]/5 px-2.5 py-0.5 rounded-none flex items-center gap-1 w-fit">
                      <Clock className="w-3 h-3 text-[#111111]/60" />
                      7:00 PM - 12:00 AM
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-[#111111]">Banquete & Fiesta</h4>
                    <p className="font-sans text-[11px] text-[#111111]/60 font-light">Cena, brindis de honor y gran festejo.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ================= SECCIÓN INTERMEDIA 2: PAPEL RASGADO INVERTIDO ================= */}
        <div className="w-full h-72 sm:h-96 relative overflow-hidden pointer-events-none select-none z-20">
          {/* Top Torn Edge (Double Layer) - Sloping Up */}
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute -top-1 left-0 right-0 w-full h-12 sm:h-16 pointer-events-none z-20 drop-shadow-[0_8px_12px_rgba(0,0,0,0.18)]">
            {/* Inner Layer (Beige fiber core) */}
            <path d="M 0 0 L 0 33.5 L 4 29.5 L 7 31.5 L 10 27.5 L 14 29.5 L 17 24.5 L 21 26.5 L 25 24.5 L 30 21.5 L 34 23.5 L 38 20.5 L 42 21.5 L 46 18.5 L 50 19.5 L 54 15.5 L 58 16.5 L 62 13.5 L 66 14.5 L 70 10.5 L 74 12.5 L 78 9.5 L 82 10.5 L 86 7.5 L 90 8.5 L 94 6.5 L 97 7.5 L 100 10.5 L 100 0 Z" fill="#EFECE6" />
            {/* Outer Layer (White paper) */}
            <path d="M 0 0 L 0 31 L 4 27 L 7 29 L 10 25 L 14 27 L 17 22 L 21 24 L 25 22 L 30 19 L 34 21 L 38 18 L 42 19 L 46 16 L 50 17 L 54 13 L 58 14 L 62 11 L 66 12 L 70 8 L 74 10 L 78 7 L 82 8 L 86 5 L 90 6 L 94 4 L 97 5 L 100 8 L 100 0 Z" fill="white" />
          </svg>

          {/* Background Image of the couple */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/novios-2-hugging.jpg"
              alt="Paola y Rogelio Detalles"
              fill
              sizes="(max-w-md) 450px"
              className="object-cover object-center"
            />
          </div>

          {/* Bottom Torn Edge (Double Layer) - Sloping Up */}
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute -bottom-1 left-0 right-0 w-full h-12 sm:h-16 pointer-events-none z-20 drop-shadow-[0_-8px_12px_rgba(0,0,0,0.18)]">
            {/* Inner Layer (Beige fiber core) */}
            <path d="M 0 40 L 0 24.5 L 4 26.5 L 8 22.5 L 12 25.5 L 16 21.5 L 20 23.5 L 24 19.5 L 28 21.5 L 32 17.5 L 36 19.5 L 40 15.5 L 44 17.5 L 48 13.5 L 52 14.5 L 56 11.5 L 60 12.5 L 64 9.5 L 68 10.5 L 72 7.5 L 76 8.5 L 80 5.5 L 84 6.5 L 88 2.5 L 92 3.5 L 96 1.5 L 100 7.5 L 100 40 Z" fill="#EFECE6" />
            {/* Outer Layer (White paper) */}
            <path d="M 0 40 L 0 27 L 4 29 L 8 25 L 12 28 L 16 24 L 20 26 L 24 22 L 28 24 L 32 20 L 36 22 L 40 18 L 44 20 L 48 16 L 52 17 L 56 14 L 60 15 L 64 12 L 68 13 L 72 10 L 76 11 L 80 8 L 84 9 L 88 5 L 92 6 L 96 4 L 100 10 L 100 40 Z" fill="white" />
          </svg>
        </div>

        {/* ================= DETALLES & VESTIMENTA ================= */}
        <section className="py-16 px-6 bg-white relative border-t border-[#111111]/5 overflow-hidden">
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#111111]/10" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#111111]/10" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#111111]/10" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#111111]/10" />

          {/* Header */}
          <div className="text-center mb-10 relative z-10">
            <h3 className="font-script text-4xl text-[#111111] block scroll-reveal">
              Código de Vestimenta
            </h3>
            <p className="font-sans text-[9px] tracking-[0.25em] text-[#111111]/50 uppercase mt-1 font-bold scroll-reveal delay-100">
              DETALLES
            </p>
          </div>

          <div className="max-w-xs mx-auto text-center space-y-6 relative z-10 scroll-reveal">
            
            {/* Outline vectors */}
            <div className="flex justify-center gap-6">
              {/* Top Hat SVG (Man) */}
              <div className="w-14 h-14 bg-white rounded-full border border-black/10 flex items-center justify-center text-[#111111] shadow-xs hover:scale-105 transition-transform duration-300">
                <svg viewBox="0 0 100 100" className="w-7 h-7 fill-none stroke-current stroke-[2.2]">
                  <path d="M 32 70 L 28 30 Q 50 25 72 30 L 68 70 Z" stroke="#111111" fill="#111111" fillOpacity="0.05" />
                  <path d="M 15 72 C 15 67, 85 67, 85 72 C 85 77, 15 77, 15 72 Z" stroke="#111111" fill="#111111" fillOpacity="0.1" />
                  <path d="M 31 60 C 50 58, 50 58, 69 60 L 68 70 C 50 68, 50 68, 32 70 Z" fill="#111111" />
                </svg>
              </div>

              {/* Dress Gown SVG (Woman) - Larger silhouette */}
              <div className="w-14 h-14 bg-white rounded-full border border-black/10 flex items-center justify-center text-[#111111] shadow-xs hover:scale-105 transition-transform duration-300">
                <svg viewBox="0 0 100 100" className="w-9 h-9 fill-none stroke-current stroke-[2.2]">
                  <path d="M 40 20 C 45 35, 30 55, 25 85 L 75 85 C 70 55, 55 35, 60 20 Z" stroke="#111111" fill="#111111" fillOpacity="0.05" />
                  <path d="M 40 20 C 44 14, 56 14, 60 20" stroke="#111111" />
                </svg>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#111111]">
                Formal
              </h4>
              <p className="font-sans text-xs text-[#111111]/70 leading-relaxed font-light">
                Hombres de traje / Mujeres de vestido. Agradecemos evitar vestir de color blanco.
              </p>
            </div>

            {/* Ceremony Seating Diagram (Mini-croquis) */}
            <div className="bg-white border border-[#111111]/10 rounded-none p-4 shadow-xs text-center space-y-3">
              <p className="text-[9px] uppercase tracking-widest font-bold font-sans text-[#111111]">
                Acomodo de Asientos en la Ceremonia
              </p>

              {/* Altar / Arch */}
              <div className="flex flex-col items-center justify-center my-1">
                <div className="w-16 h-4 border-t-2 border-x-2 border-black/30 rounded-t-lg flex items-center justify-center">
                  <span className="text-[7.5px] font-bold uppercase tracking-wider text-black/60">ALTAR</span>
                </div>
              </div>

              {/* Seating Layout Grid */}
              <div className="grid grid-cols-2 gap-4 items-center relative pt-1">
                
                {/* Left Side: Novia */}
                <div className="flex flex-col items-center space-y-1.5">
                  <span className="text-[8.5px] font-bold uppercase tracking-wider text-black/80">
                    Invitados Novia
                  </span>
                  <span className="text-[7.5px] text-black/50 font-semibold">(Izquierda - 25 Sillas)</span>
                  
                  {/* 5x5 Grid of 25 Chairs */}
                  <div className="grid grid-cols-5 gap-1 p-1.5 bg-[#FAF9F5] border border-black/10">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={`novia-${i}`}
                        className="w-2.5 h-2.5 rounded-[1px] bg-[#111111]/15 border border-black/20 flex items-center justify-center"
                        title={`Silla ${i + 1} - Novia`}
                      >
                        <span className="w-1 h-1 rounded-full bg-black/40" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Central Aisle Divider */}
                <div className="absolute left-1/2 top-6 bottom-1 -translate-x-1/2 flex flex-col items-center justify-between pointer-events-none z-10">
                  <div className="h-full w-px border-l border-dashed border-black/25" />
                  <span className="text-[7px] font-bold uppercase tracking-widest text-black/40 bg-white px-1 py-0.5 rotate-90 my-auto">
                    PASILLO
                  </span>
                </div>

                {/* Right Side: Novio */}
                <div className="flex flex-col items-center space-y-1.5">
                  <span className="text-[8.5px] font-bold uppercase tracking-wider text-black/80">
                    Invitados Novio
                  </span>
                  <span className="text-[7.5px] text-black/50 font-semibold">(Derecha - 25 Sillas)</span>
                  
                  {/* 5x5 Grid of 25 Chairs */}
                  <div className="grid grid-cols-5 gap-1 p-1.5 bg-[#FAF9F5] border border-black/10">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={`novio-${i}`}
                        className="w-2.5 h-2.5 rounded-[1px] bg-[#111111]/15 border border-black/20 flex items-center justify-center"
                        title={`Silla ${i + 1} - Novio`}
                      >
                        <span className="w-1 h-1 rounded-full bg-black/40" />
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <p className="text-[8.5px] text-[#111111]/60 font-light italic pt-1">
                Agradecemos ubicarse en el lado correspondiente a su invitación.
              </p>
            </div>

            <div className="w-12 border-b border-[#111111]/10 mx-auto my-3" />

            {/* Gift Registry */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#111111]">
                Mesa de Regalos
              </h4>
              <p className="font-sans text-xs text-[#111111]/70 leading-relaxed font-light">
                El mejor regalo es su presencia. Si desean realizar un obsequio, agradeceríamos un detalle en efectivo mediante sobre el día del evento o transferencia bancaria:
              </p>

              {/* Transfer account details card */}
              <div className="p-4 rounded-none border border-[#111111]/10 bg-white text-left space-y-2 relative transition-all duration-300 hover:shadow-xs hover:border-black/30">
                <div className="flex justify-between items-center text-[9px] font-bold text-black/50">
                  <span>DATOS DE TRANSFERENCIA</span>
                  <span className="px-1.5 py-0.5 bg-[#111111] text-white rounded-none font-bold text-[8px]">CLABE</span>
                </div>
                <div className="text-xs text-[#111111] space-y-1">
                  <p className="font-bold">Banco Nacional</p>
                  <p className="text-[11px] text-[#111111]/70">Titular: Paola & Rogelio Boda</p>
                  <div className="text-[11px] font-mono bg-[#FAF9F5] border border-[#111111]/10 px-2 py-1.5 rounded-none flex justify-between items-center mt-1 focus-within:ring-1 focus-within:ring-black">
                    <span>CLABE: {clabeNumber}</span>
                    <button
                      onClick={handleCopyCLABE}
                      className="p-1 hover:bg-black/5 rounded text-black transition-colors active:scale-90"
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
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 bg-black text-white text-[10px] font-bold tracking-widest rounded-none shadow-lg border border-white/10 flex items-center gap-1.5 transition-all duration-300 uppercase ${
              copied ? "opacity-100 translate-y-0 scale-100 animate-pulse" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
            }`}
          >
            <Check className="w-3.5 h-3.5 text-white" />
            ¡Copiado con éxito!
          </div>

        </section>

        {/* ================= UBICACIONES ================= */}
        <section className="py-16 px-6 bg-[#FAF9F5]/40 relative border-t border-[#111111]/5">
          <div className="text-center mb-10">
            <h3 className="font-script text-4xl text-[#111111] block scroll-reveal">
              Ubicaciones
            </h3>
            <p className="font-sans text-[9px] tracking-[0.25em] text-[#111111]/50 uppercase mt-1 font-bold scroll-reveal delay-100">
              DIRECCIONES
            </p>
          </div>

          <div className="space-y-6 max-w-xs mx-auto text-left relative z-10">
            
            {/* Ceremony Card */}
            <div className="bg-white border border-[#111111]/10 rounded-none overflow-hidden shadow-xs hover:border-black/35 hover:-translate-y-0.5 transition-all duration-300 group scroll-reveal">
              <div className="h-32 p-4 flex items-end relative border-b border-[#111111]/10 overflow-hidden">
                {/* Background image of Gomez Farias */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/gomez_farias.jpg"
                    alt="Gómez Farías"
                    fill
                    sizes="(max-w-md) 280px"
                    className="object-cover object-center filter brightness-[0.80] contrast-[0.95] transition-transform duration-700 group-hover:scale-103"
                  />
                </div>
                <div className="relative z-10">
                  <span className="text-[9px] font-bold text-white block uppercase">14 de Noviembre 2026</span>
                  <h4 className="font-serif text-base font-semibold text-white">Gómez Farías, Tamaulipas</h4>
                </div>
              </div>
              <div className="p-4 space-y-3.5">
                <p className="font-sans text-xs text-[#111111]/70 font-light leading-relaxed">
                  Zona Centro, Gómez Farías, Tamaulipas.
                </p>
                <a
                  href="https://www.google.com/maps/place/Parador+Tur%C3%ADstico+-+El+Jaguar/@23.0243807,-99.0956012,1000m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8678d1c4da8af8ef:0x5c547e18d6534f8!8m2!3d23.0243758!4d-99.0930263!16s%2Fg%2F11sbgzfbp5?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-[#111111] hover:bg-black text-[10px] font-bold uppercase tracking-wider text-white w-full transition-all duration-300 active:scale-98 shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-white" />
                  Abrir en Google Maps
                </a>
              </div>
            </div>

            {/* Reception Card */}
            <div className="bg-white border border-[#111111]/10 rounded-none overflow-hidden shadow-xs hover:border-black/35 hover:-translate-y-0.5 transition-all duration-300 group scroll-reveal delay-100">
              <div className="h-32 p-4 flex items-end relative border-b border-[#111111]/10 overflow-hidden">
                {/* Background image of Casa de Piedra */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/casa_de_piedra.jpg"
                    alt="Hostal Casa de Piedra"
                    fill
                    sizes="(max-w-md) 280px"
                    className="object-cover object-center filter brightness-[0.80] contrast-[0.95] transition-transform duration-700 group-hover:scale-103"
                  />
                </div>
                <div className="relative z-10">
                  <span className="text-[9px] font-bold text-white block uppercase">7:00 PM</span>
                  <h4 className="font-serif text-base font-semibold text-white">Hostal Casa de Piedra</h4>
                </div>
              </div>
              <div className="p-4 space-y-3.5">
                <p className="font-sans text-xs text-[#111111]/70 font-light leading-relaxed">
                  Calle Hidalgo s/n (a 150m de la Presidencia Municipal), Gómez Farías, Tamaulipas.
                </p>
                <a
                  href="https://www.google.com/maps/place/Hostal+Casa+de+Piedra/@23.0491611,-99.159136,1000m/data=!3m1!1e3!4m9!3m8!1s0x8678d4f27586a0ef:0xfd70dc659701efac!5m2!4m1!1i2!8m2!3d23.0492923!4d-99.1565967!16s%2Fg%2F11c1ww6xss!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-[#111111] hover:bg-black text-[10px] font-bold uppercase tracking-wider text-white w-full transition-all duration-300 active:scale-98 shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-white" />
                  Abrir en Google Maps
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ================= GALERÍA DE FOTOS (COLLAGE) ================= */}
        <section className="py-16 px-6 bg-white relative border-t border-[#111111]/5 animate-fade-in-up">
          <div className="text-center mb-10 relative z-10">
            <h3 className="font-script text-4xl text-[#111111] block scroll-reveal">
              Momentos Guardados
            </h3>
            <p className="font-sans text-[9px] tracking-[0.25em] text-[#111111]/50 uppercase mt-1 font-bold scroll-reveal delay-100">
              GALERÍA DE FOTOS
            </p>
          </div>

          {/* Interactive Photo Grid with Lightbox */}
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto relative z-10">
            {GALLERY_IMAGES.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => { setLightboxSrc(img.src); setLightboxAlt(img.alt); }}
                className={`relative rounded-none overflow-hidden border border-black/10 shadow-xs group cursor-zoom-in ${img.className} focus:outline-none focus:ring-2 focus:ring-black/40`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 448px) 200px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover overlay with magnify hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-[9px] font-bold uppercase tracking-widest bg-black/50 px-2 py-1">
                    Ver foto
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Lightbox Modal */}
          {lightboxSrc && (
            <div
              className="fixed inset-0 z-[200] bg-black/92 flex items-center justify-center p-4"
              onClick={() => setLightboxSrc(null)}
            >
              <div className="relative w-full max-w-sm max-h-[85dvh] flex items-center justify-center">
                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setLightboxSrc(null)}
                  className="absolute -top-10 right-0 text-white/80 hover:text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 z-10"
                >
                  <span className="text-lg leading-none">&times;</span> Cerrar
                </button>

                {/* Full image */}
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "3/4" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={lightboxSrc}
                    alt={lightboxAlt}
                    fill
                    sizes="448px"
                    className="object-contain"
                  />
                </div>

                {/* Caption */}
                <p className="absolute -bottom-8 left-0 right-0 text-center text-white/60 text-[9px] uppercase tracking-widest font-bold">
                  {lightboxAlt}
                </p>
              </div>
            </div>
          )}
        </section>

        {/* ================= CONFIRMACIÓN (RSVP CON WHATSAPP) ================= */}
        <section className="py-16 px-6 bg-white relative border-t border-[#111111]/5 overflow-hidden">


          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <h3 className="font-script text-4xl text-[#111111] block scroll-reveal">
              Confirma tu Asistencia
            </h3>
            <p className="font-sans text-[9.5px] tracking-[0.15em] text-[#111111]/50 uppercase mt-2 font-bold scroll-reveal delay-100">
              FAVOR DE CONFIRMAR ANTES DEL 14 DE NOVIEMBRE 2026
            </p>
            <div className="w-8 my-3 border-b border-black/25 mx-auto scroll-reveal delay-100" />
          </div>

          <form onSubmit={handleRSVPSubmit} className="space-y-5 relative z-10 max-w-xs mx-auto text-left scroll-reveal">
            
            {/* Name */}
            <div className="flex flex-col">
              <label htmlFor="rsvpName" className="text-[10px] font-bold uppercase tracking-widest text-[#111111] mb-2 font-sans">
                Nombre Completo
              </label>
              <input
                type="text"
                id="rsvpName"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Juan Carlos Ramos"
                className="px-4 py-3 rounded-none bg-[#FAF9F5]/40 border border-black/10 text-[#111111] text-xs font-sans focus:outline-hidden focus:border-black focus:ring-0 focus:bg-white transition-all shadow-xs"
              />
            </div>

            {/* Attendance Radios */}
            <div className="flex flex-col">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#111111] mb-2 font-sans">
                ¿Asistirás?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttendance("yes")}
                  className={`py-2.5 rounded-none border text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    attendance === "yes"
                      ? "bg-[#111111] border-[#111111] text-white shadow-xs"
                      : "bg-white border-black/10 text-black/60 hover:bg-[#FAF9F5]"
                  }`}
                >
                  ¡Sí, asistiré!
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance("no")}
                  className={`py-2.5 rounded-none border text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    attendance === "no"
                      ? "bg-[#111111] border-[#111111] text-white shadow-xs"
                      : "bg-white border-black/10 text-black/60 hover:bg-[#FAF9F5]"
                  }`}
                >
                  No podré asistir
                </button>
              </div>
            </div>

            {/* Conditional Fields */}
            {attendance === "yes" && (
              <div className="space-y-5 animate-[fadeIn_0.3s_ease-out_forwards]">
                {/* Number of passes */}
                <div className="flex flex-col">
                  <label htmlFor="rsvpGuests" className="text-[10px] font-bold uppercase tracking-widest text-[#111111] mb-2 font-sans">
                    Número de pases
                  </label>
                  <select
                    id="rsvpGuests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="px-4 py-2.5 rounded-none bg-white border border-black/10 text-[#111111] text-xs font-sans focus:outline-hidden focus:border-black transition-all appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23111111' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
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
                  <label htmlFor="rsvpDiet" className="text-[10px] font-bold uppercase tracking-widest text-[#111111] mb-2 font-sans">
                    Mensaje o Alergias Alimenticias
                  </label>
                  <textarea
                    id="rsvpDiet"
                    rows={2}
                    value={diet}
                    onChange={(e) => setDiet(e.target.value)}
                    placeholder="Ej. Menú vegetariano, alérgico al gluten..."
                    className="px-4 py-2.5 rounded-none bg-white border border-black/10 text-[#111111] text-xs font-sans focus:outline-hidden focus:border-black transition-all resize-none"
                  />
                </div>
              </div>
            )}

            {/* Confirm button */}
            <button
              type="submit"
              disabled={attendance === null}
              className={`w-full py-3.5 rounded-none text-[10px] font-bold uppercase tracking-widest text-white shadow-xs transition-all duration-300 flex items-center justify-center gap-1.5 ${
                attendance === null
                  ? "bg-black/30 cursor-not-allowed border border-transparent"
                  : "bg-[#111111] hover:bg-black active:scale-98 cursor-pointer border border-black"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              Confirmar por WhatsApp
            </button>

          </form>

          {/* Decorative QR Code SVG Pattern */}
          <div className="mt-12 flex flex-col items-center justify-center relative z-10 scroll-reveal">
            <div className="p-3.5 bg-white border border-black/10 rounded-none flex flex-col items-center">
              <svg className="w-16 h-16 text-black" viewBox="0 0 100 100" fill="currentColor">
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
              <span className="text-[9px] tracking-widest text-black/50 uppercase font-sans mt-2 font-semibold">
                #BodaPaolaYRogelio
              </span>
            </div>
          </div>

        </section>

        {/* ================= SECCIÓN FOTOGRÁFICA DE CIERRE: PAPEL RASGADO ================= */}
        <div className="w-full h-72 sm:h-96 relative overflow-hidden pointer-events-none select-none z-20">
          {/* Top Torn Edge (Double Layer) - Sloping Down */}
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute -top-1 left-0 right-0 w-full h-12 sm:h-16 pointer-events-none z-20 drop-shadow-[0_8px_12px_rgba(0,0,0,0.18)]">
            {/* Inner Layer (Beige fiber core) */}
            <path d="M 0 0 L 0 10.5 L 5 9.5 L 10 13.5 L 15 11.5 L 20 16.5 L 25 14.5 L 30 18.5 L 35 15.5 L 40 20.5 L 45 18.5 L 50 23.5 L 55 21.5 L 60 25.5 L 65 22.5 L 70 27.5 L 75 24.5 L 80 29.5 L 85 27.5 L 90 31.5 L 95 29.5 L 100 33.5 L 100 0 Z" fill="#EFECE6" />
            {/* Outer Layer (White paper) */}
            <path d="M 0 0 L 0 8 L 5 7 L 10 11 L 15 9 L 20 14 L 25 12 L 30 16 L 35 13 L 40 18 L 45 16 L 50 21 L 55 19 L 60 23 L 65 20 L 70 25 L 75 22 L 80 27 L 85 25 L 90 29 L 95 27 L 100 31 L 100 0 Z" fill="white" />
          </svg>

          {/* Background Image of the couple */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/novios-3-kiss.jpg"
              alt="Paola y Rogelio Agradecimiento"
              fill
              sizes="(max-w-md) 450px"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <footer className="py-12 text-center bg-[#FAF9F5] border-t border-[#111111]/5 relative z-10 space-y-2 select-none">
          <p className="font-serif text-lg font-light text-black tracking-[0.2em]">
            P <span className="italic font-normal">&</span> R
          </p>
          <p className="font-sans text-[9px] font-bold tracking-widest text-black/60 uppercase">
            #BodaPaolaYRogelio
          </p>
          <p className="font-serif text-lg italic text-black/70 pt-2 block">
            Agradecemos de corazón su compañía.
          </p>
          <p className="font-sans text-[8px] tracking-[0.2em] text-black/40 uppercase mt-4 block">
            Paola & Rogelio • 2026
          </p>
        </footer>

      </div>

    </main>
  );
}
