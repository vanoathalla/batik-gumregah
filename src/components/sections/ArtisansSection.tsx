"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Artisan } from "@/lib/store";

export default function ArtisansSection() {
  const { t, locale } = useLanguage();
  const [artisans, setArtisans] = useState<Artisan[]>([]);

  useEffect(() => {
    fetch("/api/artisans")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setArtisans(d))
      .catch(() => {});
  }, []);

  return (
    <section style={{ background: "var(--cream-2)", padding: "6rem 0" }}>
      <div className="container-custom">

        <AnimateOnScroll>
          <SectionHeading
            section="artisans"
            label={t.artisans.sectionLabel}
            title={t.artisans.title}
            subtitle={t.artisans.subtitle}
          />
        </AnimateOnScroll>

        {artisans.length === 0 ? (
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "3rem" }}>
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
              <AnimateOnScroll key={a.id} delay={idx * 80}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: "100px", height: "100px", borderRadius: "50%", margin: "0 auto 1.25rem", overflow: "hidden", background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {a.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.image} alt={a.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div className="img-placeholder" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid var(--border)" }} />
                      </div>
                    )}
                  </div>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", fontWeight: 600, color: "var(--brown)", marginBottom: "0.25rem" }}>
                    {a.name}
                  </p>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
                    {locale === "id" ? a.specialtyId : a.specialtyEn}
                  </p>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.75rem", color: "var(--muted)" }}>
                    {a.experience} {locale === "id" ? "tahun pengalaman" : "years experience"}
                  </p>
                  {(a.quoteId || a.quoteEn) && (
                    <blockquote style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1rem", color: "var(--muted)", lineHeight: 1.65, maxWidth: "240px", margin: "0.75rem auto 0" }}>
                      "{locale === "id" ? a.quoteId : a.quoteEn}"
                    </blockquote>
                  )}
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
