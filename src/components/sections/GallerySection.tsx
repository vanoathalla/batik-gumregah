"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { X, ZoomIn } from "lucide-react";
import type { GalleryItem } from "@/lib/store";

export default function GallerySection() {
  const { t, locale } = useLanguage();
  const [items, setItems]   = useState<GalleryItem[]>([]);
  const [open, setOpen]     = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<"all" | GalleryItem["category"]>("all");

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setItems(d))
      .catch(() => {});
  }, []);

  const catLabels: Record<GalleryItem["category"], { id: string; en: string }> = {
    process:    { id: "Proses",    en: "Process"    },
    exhibition: { id: "Pameran",   en: "Exhibition" },
    artisan:    { id: "Pengrajin", en: "Artisan"    },
    product:    { id: "Produk",    en: "Product"    },
    workshop:   { id: "Workshop",  en: "Workshop"   },
  };

  const cats = ["all", "process", "exhibition", "artisan", "product", "workshop"] as const;

  const filtered = filter === "all" ? items : items.filter((g) => g.category === filter);

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

        {items.length === 0 ? (
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "3rem" }}>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.85rem", color: "var(--muted)" }}>
              {locale === "id" ? "Foto galeri akan segera ditambahkan." : "Gallery photos will be added soon."}
            </p>
          </div>
        ) : (
          <>
            {/* Category filter */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              {cats.map((c) => {
                const active = filter === c;
                const count = c === "all" ? items.length : items.filter((g) => g.category === c).length;
                if (c !== "all" && count === 0) return null;
                const label = c === "all"
                  ? (locale === "id" ? `Semua (${count})` : `All (${count})`)
                  : `${catLabels[c as GalleryItem["category"]][locale as "id" | "en"]} (${count})`;
                return (
                  <button key={c} onClick={() => setFilter(c as typeof filter)}
                    style={{ padding: "0.3rem 0.9rem", borderRadius: "100px", fontFamily: "'Poppins',sans-serif", fontSize: "0.72rem", background: active ? "var(--brown)" : "transparent", color: active ? "var(--cream)" : "var(--muted)", border: active ? "1px solid var(--brown)" : "1px solid var(--border)", cursor: "pointer", transition: "all .2s" }}>
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "10px" }}
              className="gallery-pub-grid">
              {filtered.map((item, idx) => (
                <AnimateOnScroll key={item.id} delay={idx * 30}>
                  <button
                    onClick={() => setOpen(item)}
                    style={{ position: "relative", width: "100%", aspectRatio: "1", background: "none", border: "none", padding: 0, cursor: "pointer", borderRadius: "10px", overflow: "hidden", display: "block" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={locale === "id" ? item.captionId : item.captionEn}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .4s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                    />
                    {/* Label overlay */}
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0.5rem 0.6rem", background: "linear-gradient(to top, rgba(42,28,20,0.65), transparent)", opacity: 0, transition: "opacity .3s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "1")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "0")}>
                      <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "9px", color: "rgba(240,232,220,0.85)" }}>
                        {locale === "id" ? item.captionId : item.captionEn}
                      </span>
                    </div>
                    {/* Zoom icon on hover */}
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0, transition: "opacity .2s", pointerEvents: "none" }}>
                      <ZoomIn size={20} style={{ color: "rgba(255,255,255,0.7)" }} />
                    </div>
                  </button>
                </AnimateOnScroll>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          onClick={() => setOpen(null)}
          style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(20,12,6,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}
        >
          <button onClick={() => setOpen(null)}
            style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", cursor: "pointer", color: "rgba(240,232,220,0.5)", display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Poppins',sans-serif", fontSize: "0.75rem" }}>
            <X size={16} />
          </button>
          <div onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "800px", width: "100%", animation: "fadeIn .25s ease-out both" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={open.url}
              alt={locale === "id" ? open.captionId : open.captionEn}
              style={{ width: "100%", maxHeight: "80vh", objectFit: "contain", borderRadius: "12px", display: "block" }}
            />
            {(open.captionId || open.captionEn) && (
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.78rem", color: "rgba(240,232,220,0.6)", textAlign: "center", marginTop: "1rem" }}>
                {locale === "id" ? open.captionId : open.captionEn}
              </p>
            )}
          </div>
        </div>
      )}

      <style>{`@media(max-width:768px){.gallery-pub-grid{grid-template-columns:repeat(2,1fr) !important;}}`}</style>
    </section>
  );
}
