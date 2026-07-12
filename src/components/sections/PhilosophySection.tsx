"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { motifs } from "@/lib/data";
import { ArrowRight, X } from "lucide-react";

export default function PhilosophySection() {
  const { t, locale } = useLanguage();
  const [selected, setSelected] = useState<(typeof motifs)[0] | null>(null);

  return (
    <section id="philosophy" style={{ background: "var(--cream-2)", padding: "6rem 0" }}>
      <div className="container-custom">

        <AnimateOnScroll className="mb-16">
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)" }}>
            {t.philosophy.sectionLabel}
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.9rem,3.5vw,3rem)", fontWeight: 500, color: "var(--brown)", marginTop: "0.5rem", marginBottom: "1.25rem" }}>
            {t.philosophy.title}
          </h2>
          <span className="rule-gold" />
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.875rem", color: "var(--muted)", marginTop: "1.25rem", maxWidth: "520px", lineHeight: 1.85 }}>
            {t.philosophy.subtitle}
          </p>
        </AnimateOnScroll>

        {/* Kutipan Filosofi Nama "Gumregah" */}
        <AnimateOnScroll direction="up">
          <div style={{
            position: "relative",
            background: "var(--cream)",
            border: "1px solid var(--border)",
            borderLeft: "4px solid var(--gold)",
            borderRadius: "0 16px 16px 0",
            padding: "2.5rem 2.5rem 2.5rem 3rem",
            maxWidth: "860px",
            marginBottom: "4.5rem",
            boxShadow: "0 4px 32px rgba(61,43,31,0.06)"
          }}>
            {/* Tanda kutip dekoratif */}
            <span style={{
              position: "absolute", top: "1.25rem", left: "1.5rem",
              fontFamily: "'Cormorant Garamond',serif", fontSize: "5rem",
              color: "var(--gold)", opacity: 0.18, lineHeight: 1,
              userSelect: "none", pointerEvents: "none"
            }}>
              &ldquo;
            </span>
            <p style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(1.1rem,2vw,1.4rem)",
              fontStyle: "italic",
              fontWeight: 500,
              color: "var(--brown)",
              lineHeight: 1.75,
              marginBottom: "1.25rem"
            }}>
              {locale === "id"
                ? <>Nama dari <em>Gumregah</em> memiliki arti kata <strong>Semangat dan Bangkit</strong>, nama ini dipilih oleh sang owner sebagai pemacu semangat dan terus berinovasi untuk menghasilkan karya&#8209;karya batik.</>
                : <>The name <em>Gumregah</em> means <strong>Spirit and Rise</strong>, chosen by the owner as a constant reminder to stay passionate and keep innovating in producing batik works.</>
              }
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ display: "inline-block", width: "32px", height: "1px", background: "var(--gold)", opacity: 0.6 }} />
              <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)" }}>
                Batik Gumregah
              </span>
            </div>
          </div>
        </AnimateOnScroll>


        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem" }}
          className="motif-grid">
          {motifs.map((motif, idx) => {
            const d = locale === "id" ? motif.id : motif.en;
            return (
              <AnimateOnScroll key={motif.slug} delay={idx * 70}>
                <button
                  onClick={() => setSelected(motif)}
                  style={{
                    width: "100%", textAlign: "left", background: "none",
                    border: "1px solid var(--border)", borderRadius: "14px",
                    overflow: "hidden", cursor: "pointer", transition: "border-color .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                >
                  {/* Placeholder */}
                  <div className="img-placeholder" style={{ height: "160px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid var(--border)" }} />
                    <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Photo</span>
                  </div>
                  <div style={{ padding: "1.1rem 1.25rem" }}>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--brown)", marginBottom: "0.5rem" }}>
                      {d.name}
                    </p>
                    <p className="clamp-3" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.7 }}>
                      {d.meaning}
                    </p>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: "'Poppins',sans-serif", fontSize: "0.72rem", color: "var(--gold)", marginTop: "0.75rem" }}>
                      {locale === "id" ? "Pelajari" : "Learn more"}
                      <ArrowRight size={11} />
                    </div>
                  </div>
                </button>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selected && (() => {
        const d = locale === "id" ? selected.id : selected.en;
        return (
          <div
            onClick={() => setSelected(null)}
            style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(20,12,6,0.75)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", backdropFilter: "blur(4px)" }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{ background: "var(--cream)", borderRadius: "18px", maxWidth: "480px", width: "100%", maxHeight: "85vh", overflowY: "auto", animation: "fadeUp .3s ease-out both" }}
            >
              {/* Image placeholder */}
              <div className="img-placeholder" style={{ height: "200px", borderRadius: "18px 18px 0 0" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid var(--border)" }} />
                <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Photo</span>
              </div>
              <div style={{ padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", fontWeight: 600, color: "var(--brown)" }}>
                    {d.name}
                  </h3>
                  <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", flexShrink: 0, marginTop: "4px" }}>
                    <X size={18} />
                  </button>
                </div>

                {[
                  { label: t.philosophy.meaningLabel, text: d.meaning },
                  { label: t.philosophy.philosophyLabel, text: d.philosophy },
                  { label: t.philosophy.colorsLabel, text: d.colors },
                  { label: t.philosophy.usedWhenLabel, text: d.usedWhen },
                ].map(({ label, text }) => (
                  <div key={label} style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.35rem" }}>{label}</p>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.8 }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      <style>{`@media(max-width:768px){.motif-grid{grid-template-columns:1fr 1fr !important;}}`}</style>
    </section>
  );
}
