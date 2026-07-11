"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { X } from "lucide-react";

const items = [
  { id: 1, label: { id: "Proses Membatik",  en: "Batik Making"     }, span: "col-span-2 row-span-2" },
  { id: 2, label: { id: "Pencantingan",     en: "Canting Process"  }, span: "" },
  { id: 3, label: { id: "Pameran",          en: "Exhibition"       }, span: "" },
  { id: 4, label: { id: "Pengrajin",        en: "Artisan"          }, span: "" },
  { id: 5, label: { id: "Pewarnaan",        en: "Dyeing"           }, span: "col-span-2" },
  { id: 6, label: { id: "Produk Selesai",   en: "Finished Product" }, span: "" },
  { id: 7, label: { id: "Workshop",         en: "Workshop"         }, span: "" },
];

export default function GallerySection() {
  const { t, locale } = useLanguage();
  const [open, setOpen] = useState<(typeof items)[0] | null>(null);

  return (
    <section id="gallery" style={{ background: "var(--cream-2)", padding: "6rem 0" }}>
      <div className="container-custom">

        <AnimateOnScroll className="mb-16">
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)" }}>
            {t.gallery.sectionLabel}
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.9rem,3.5vw,3rem)", fontWeight: 500, color: "var(--brown)", marginTop: "0.5rem", marginBottom: "1.25rem" }}>
            {t.gallery.title}
          </h2>
          <span className="rule-gold" />
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.875rem", color: "var(--muted)", marginTop: "1.25rem", maxWidth: "520px", lineHeight: 1.85 }}>
            {t.gallery.subtitle}
          </p>
        </AnimateOnScroll>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gridAutoRows: "180px", gap: "10px" }}
          className="gallery-grid">
          {items.map((item) => (
            <AnimateOnScroll key={item.id} className={item.span}>
              <button
                onClick={() => setOpen(item)}
                style={{ width: "100%", height: "100%", background: "none", border: "none", padding: 0, cursor: "pointer", borderRadius: "12px", overflow: "hidden", position: "relative" }}
              >
                <div
                  className="img-placeholder"
                  style={{ width: "100%", height: "100%", borderRadius: "12px", transition: "opacity .2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = ".8")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "1")}
                >
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid var(--border)" }} />
                </div>
                {/* Label on hover via CSS */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0.75rem 1rem", background: "linear-gradient(to top, rgba(42,28,20,0.7), transparent)", borderRadius: "0 0 12px 12px" }}>
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.72rem", color: "rgba(240,232,220,0.8)", letterSpacing: "0.05em" }}>
                    {locale === "id" ? item.label.id : item.label.en}
                  </span>
                </div>
              </button>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {open && (
        <div
          onClick={() => setOpen(null)}
          style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(20,12,6,0.88)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", width: "100%", maxWidth: "560px", animation: "fadeIn .25s ease-out both" }}
          >
            <button
              onClick={() => setOpen(null)}
              style={{ position: "absolute", top: "-2.5rem", right: 0, background: "none", border: "none", cursor: "pointer", color: "rgba(240,232,220,0.5)", display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Poppins',sans-serif", fontSize: "0.75rem" }}
            >
              <X size={14} /> Close
            </button>
            <div className="img-placeholder" style={{ width: "100%", aspectRatio: "4/3", borderRadius: "16px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid var(--border)" }} />
              <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Photo</span>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", color: "var(--muted)", marginTop: "0.5rem" }}>
                {locale === "id" ? open.label.id : open.label.en}
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:768px){
          .gallery-grid{grid-template-columns:repeat(2,1fr) !important;grid-auto-rows:140px !important;}
          .col-span-2{grid-column:span 1 !important;}
          .row-span-2{grid-row:span 1 !important;}
        }
      `}</style>
    </section>
  );
}
