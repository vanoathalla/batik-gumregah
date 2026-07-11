"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const { t } = useLanguage();

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#2A1C14]">
      {/* Soft radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 20% 55%, rgba(184,150,96,0.10) 0%, transparent 65%), radial-gradient(ellipse 55% 45% at 80% 25%, rgba(168,84,64,0.07) 0%, transparent 60%)",
        }}
      />

      {/* Very subtle diagonal pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #B89660 0, #B89660 1px, transparent 0, transparent 36px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container-custom text-center py-32">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 mb-8"
          style={{ animation: "fadeUp .6s ease-out .15s both" }}
        >
          <div className="h-px w-6 bg-[#B89660]/50" />
          <span
            className="font-body text-[10px] tracking-[0.4em] uppercase"
            style={{ color: "#B89660", fontFamily: "'Poppins', sans-serif" }}
          >
            Kanten · Imogiri · Yogyakarta
          </span>
          <div className="h-px w-6 bg-[#B89660]/50" />
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.4rem, 5.5vw, 5.2rem)",
            fontWeight: 500,
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            color: "#F0E8DC",
            animation: "fadeUp .7s ease-out .3s both",
            maxWidth: "820px",
            margin: "0 auto",
          }}
        >
          {t.hero.tagline}
        </h1>

        {/* Rule */}
        <div
          className="mx-auto my-7"
          style={{
            width: "40px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #B89660, transparent)",
            animation: "fadeIn .8s ease-out .45s both",
          }}
        />

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.9rem",
            color: "#A89080",
            maxWidth: "500px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.8,
            animation: "fadeUp .7s ease-out .5s both",
          }}
        >
          {t.hero.subtitle}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          style={{ animation: "fadeUp .7s ease-out .65s both" }}
        >
          <button
            onClick={() => scrollTo("#collections")}
            style={{
              background: "#B89660",
              color: "#1E1208",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              padding: "0.85rem 2rem",
              borderRadius: "100px",
              border: "none",
              cursor: "pointer",
              transition: "all .25s",
            }}
            onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.opacity = ".85"; }}
            onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.opacity = "1"; }}
          >
            {t.hero.ctaExplore}
          </button>
          <button
            onClick={() => scrollTo("#about")}
            style={{
              background: "transparent",
              color: "#C4B09A",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 400,
              letterSpacing: "0.03em",
              padding: "0.85rem 2rem",
              borderRadius: "100px",
              border: "1px solid rgba(196,176,154,0.25)",
              cursor: "pointer",
              transition: "all .25s",
            }}
            onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.borderColor = "rgba(196,176,154,0.5)"; }}
            onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.borderColor = "rgba(196,176,154,0.25)"; }}
          >
            {t.hero.ctaStory}
          </button>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => scrollTo("#about")}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={{
          color: "#6A5A4A",
          background: "none",
          border: "none",
          cursor: "pointer",
          animation: "fadeIn 1s ease-out 1s both",
        }}
      >
        <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
          scroll
        </span>
        <ChevronDown size={14} className="animate-scroll-down" />
      </button>
    </section>
  );
}
