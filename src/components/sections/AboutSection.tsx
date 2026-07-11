"use client";

import { useLanguage } from "@/context/LanguageContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { timeline } from "@/lib/data";
import { MapPin } from "lucide-react";

export default function AboutSection() {
  const { t, locale } = useLanguage();

  return (
    <section id="about" style={{ background: "var(--cream)", padding: "6rem 0" }}>
      <div className="container-custom">

        {/* Header */}
        <AnimateOnScroll className="mb-16">
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)" }}>
            {t.about.sectionLabel}
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.9rem,3.5vw,3rem)", fontWeight: 500, color: "var(--brown)", marginTop: "0.5rem", marginBottom: "1.25rem" }}>
            {t.about.title}
          </h2>
          <span className="rule-gold" />
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.875rem", color: "var(--muted)", marginTop: "1.25rem", maxWidth: "520px", lineHeight: 1.85 }}>
            {t.about.subtitle}
          </p>
        </AnimateOnScroll>

        {/* Two col */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start", marginBottom: "5rem" }}
          className="grid-cols-1 md:grid-cols-2">

          {/* Image placeholder */}
          <AnimateOnScroll direction="left">
            <div style={{ aspectRatio: "4/5", borderRadius: "16px", overflow: "hidden" }}
              className="img-placeholder">
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid var(--border)" }} />
              <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Photo</span>
            </div>
          </AnimateOnScroll>

          {/* Text */}
          <AnimateOnScroll direction="right">
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.875rem", color: "var(--ink)", lineHeight: 1.9, marginBottom: "2rem" }}>
              {t.about.history}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1px", borderLeft: "2px solid var(--border)", paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
              <div style={{ marginBottom: "1.25rem" }}>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.4rem" }}>Visi</p>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.8 }}>{t.about.vision}</p>
              </div>
              <div>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.4rem" }}>Misi</p>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.8 }}>{t.about.mission}</p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Poppins',sans-serif", fontSize: "0.78rem", color: "var(--muted)" }}>
              <MapPin size={12} style={{ color: "var(--gold)", flexShrink: 0 }} />
              {t.about.location}
            </div>
          </AnimateOnScroll>
        </div>

        {/* Timeline */}
        <AnimateOnScroll>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "3.5rem" }}>
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", display: "block", marginBottom: "2.5rem" }}>
              {t.about.timelineTitle}
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "2rem" }}
              className="grid-timeline">
              {timeline.map((item, idx) => {
                const d = locale === "id" ? item.id : item.en;
                return (
                  <AnimateOnScroll key={item.year} delay={idx * 80}>
                    <div>
                      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 600, color: "var(--gold)", marginBottom: "0.25rem" }}>
                        {item.year}
                      </p>
                      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "var(--brown)", marginBottom: "0.35rem" }}>
                        {d.event}
                      </p>
                      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.7 }}>
                        {d.desc}
                      </p>
                    </div>
                  </AnimateOnScroll>
                );
              })}
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .grid-cols-1.md\\:grid-cols-2 { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .grid-timeline { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
