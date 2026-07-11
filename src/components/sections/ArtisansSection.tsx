"use client";

import { useLanguage } from "@/context/LanguageContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { artisans } from "@/lib/data";

export default function ArtisansSection() {
  const { t, locale } = useLanguage();

  return (
    <section style={{ background: "var(--cream-2)", padding: "6rem 0" }}>
      <div className="container-custom">

        <AnimateOnScroll className="mb-16">
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)" }}>
            {t.artisans.sectionLabel}
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.9rem,3.5vw,3rem)", fontWeight: 500, color: "var(--brown)", marginTop: "0.5rem", marginBottom: "1.25rem" }}>
            {t.artisans.title}
          </h2>
          <span className="rule-gold" />
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.875rem", color: "var(--muted)", marginTop: "1.25rem", maxWidth: "520px", lineHeight: 1.85 }}>
            {t.artisans.subtitle}
          </p>
        </AnimateOnScroll>

        {artisans.length === 0 ? (
          /* Empty state — data belum tersedia */
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "3rem", textAlign: "center" }}>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.8 }}>
              {locale === "id"
                ? "Profil pengrajin akan segera ditambahkan."
                : "Artisan profiles will be added soon."}
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "3rem" }}
            className="artisan-grid">
            {artisans.map((a, idx) => (
              <AnimateOnScroll key={a.name} delay={idx * 80}>
                <div style={{ textAlign: "center" }}>
                  {/* Avatar placeholder */}
                  <div className="img-placeholder" style={{ width: "100px", height: "100px", borderRadius: "50%", margin: "0 auto 1.25rem" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid var(--border)" }} />
                  </div>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", fontWeight: 600, color: "var(--brown)", marginBottom: "0.25rem" }}>
                    {a.name}
                  </p>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
                    {locale === "id" ? a.specialty.id : a.specialty.en}
                  </p>
                  <blockquote style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1rem", color: "var(--muted)", lineHeight: 1.65, maxWidth: "240px", margin: "0 auto" }}>
                    "{locale === "id" ? a.quote.id : a.quote.en}"
                  </blockquote>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        )}
      </div>

      <style>{`@media(max-width:768px){.artisan-grid{grid-template-columns:1fr !important;gap:2rem !important;}}`}</style>
    </section>
  );
}
