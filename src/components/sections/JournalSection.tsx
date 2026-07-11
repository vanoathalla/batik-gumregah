"use client";

import { useLanguage } from "@/context/LanguageContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { articles } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function JournalSection() {
  const { t, locale } = useLanguage();

  return (
    <section id="journal" style={{ background: "var(--cream)", padding: "6rem 0" }}>
      <div className="container-custom">

        <AnimateOnScroll className="mb-16">
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)" }}>
            {t.journal.sectionLabel}
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.9rem,3.5vw,3rem)", fontWeight: 500, color: "var(--brown)", marginTop: "0.5rem", marginBottom: "1.25rem" }}>
            {t.journal.title}
          </h2>
          <span className="rule-gold" />
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.875rem", color: "var(--muted)", marginTop: "1.25rem", maxWidth: "520px", lineHeight: 1.85 }}>
            {t.journal.subtitle}
          </p>
        </AnimateOnScroll>

        {/* Featured + side list */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem" }}
          className="journal-grid">

          {/* Featured */}
          <AnimateOnScroll direction="left">
            {(() => {
              const a = articles[0];
              const d = locale === "id" ? a.id : a.en;
              return (
                <div style={{ cursor: "pointer" }}>
                  <div className="img-placeholder" style={{ height: "280px", borderRadius: "14px", marginBottom: "1.25rem" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid var(--border)" }} />
                    <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Photo</span>
                  </div>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem" }}>
                    {d.category} · {new Date(a.date).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", { year: "numeric", month: "long" })}
                  </p>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 600, color: "var(--brown)", marginBottom: "0.75rem", lineHeight: 1.3 }}>
                    {d.title}
                  </h3>
                  <p className="clamp-3" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
                    {d.excerpt}
                  </p>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontFamily: "'Poppins',sans-serif", fontSize: "0.78rem", color: "var(--gold)" }}>
                    {t.journal.readMore} <ArrowRight size={12} />
                  </span>
                </div>
              );
            })()}
          </AnimateOnScroll>

          {/* Side list */}
          <AnimateOnScroll direction="right">
            <div style={{ display: "flex", flexDirection: "column" }}>
              {articles.slice(1).map((a, idx) => {
                const d = locale === "id" ? a.id : a.en;
                return (
                  <div
                    key={a.slug}
                    style={{ display: "flex", gap: "1.25rem", paddingTop: "1.25rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--border)", cursor: "pointer" }}
                  >
                    <div className="img-placeholder" style={{ width: "72px", height: "72px", borderRadius: "10px", flexShrink: 0 }}>
                      <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1px solid var(--border)" }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.3rem" }}>
                        {d.category}
                      </p>
                      <p className="clamp-2" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.05rem", fontWeight: 600, color: "var(--brown)", lineHeight: 1.35 }}>
                        {d.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimateOnScroll>
        </div>

        {/* UNESCO note */}
        <AnimateOnScroll delay={100}>
          <div style={{ marginTop: "4rem", borderTop: "1px solid var(--border)", paddingTop: "3rem", display: "flex", gap: "2rem", alignItems: "start" }}
            className="unesco-row">
            <div style={{ flexShrink: 0 }}>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem" }}>UNESCO · 2009</p>
              <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 600, color: "var(--brown)", maxWidth: "320px", lineHeight: 1.35 }}>
                {locale === "id" ? "Batik Diakui sebagai Warisan Budaya Takbenda Dunia" : "Batik Recognized as UNESCO Intangible Cultural Heritage"}
              </h4>
            </div>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.85, maxWidth: "420px" }}>
              {locale === "id"
                ? "Pada 2 Oktober 2009, UNESCO menetapkan batik Indonesia sebagai Warisan Budaya Takbenda Kemanusiaan — pengakuan dunia atas kekayaan budaya Indonesia."
                : "On October 2, 2009, UNESCO designated Indonesian batik as Intangible Cultural Heritage of Humanity — a global recognition of Indonesia's cultural richness."}
            </p>
          </div>
        </AnimateOnScroll>
      </div>

      <style>{`
        @media(max-width:768px){
          .journal-grid{grid-template-columns:1fr !important;gap:2.5rem !important;}
          .unesco-row{flex-direction:column !important;gap:1rem !important;}
        }
      `}</style>
    </section>
  );
}
