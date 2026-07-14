"use client";

import { useState, useMemo, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { categories } from "@/lib/data";
import { Search, X, MessageCircle } from "lucide-react";
import type { Product } from "@/lib/store";

const WA = "6288229514350";
const fmt = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

export default function ProductsSection() {
  const { t, locale } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [cat, setCat] = useState("All");
  const [q, setQ]     = useState("");
  const [sel, setSel] = useState<Product | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setProducts(d))
      .catch(() => {});
  }, []);

  const allCats = [t.products.allCategories, ...categories];

  const filtered = useMemo(() =>
    products.filter((p) => {
      const matchCat = cat === "All" || p.category === cat;
      const name = (locale === "id" ? p.nameId : p.nameEn).toLowerCase();
      return matchCat && (name.includes(q.toLowerCase()) || p.motif.toLowerCase().includes(q.toLowerCase()));
    }),
    [products, cat, q, locale]
  );

  return (
    <section id="collections" style={{ background: "var(--cream)", padding: "6rem 0" }}>
      <div className="container-custom">

        <AnimateOnScroll className="mb-12">
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)" }}>
            {t.products.sectionLabel}
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.9rem,3.5vw,3rem)", fontWeight: 500, color: "var(--brown)", marginTop: "0.5rem", marginBottom: "1.25rem" }}>
            {t.products.title}
          </h2>
          <span className="rule-gold" />
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.875rem", color: "var(--muted)", marginTop: "1.25rem", maxWidth: "520px", lineHeight: 1.85 }}>
            {t.products.subtitle}
          </p>
        </AnimateOnScroll>

        {/* Filter row */}
        <AnimateOnScroll>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "2.5rem", borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem" }}
            className="product-filter-row">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {allCats.map((c) => {
                const active = c === t.products.allCategories ? cat === "All" : cat === c;
                return (
                  <button key={c} onClick={() => setCat(c === t.products.allCategories ? "All" : c)}
                    style={{ padding: "0.35rem 1rem", borderRadius: "100px", fontFamily: "'Poppins',sans-serif", fontSize: "0.75rem", fontWeight: active ? 600 : 400, background: active ? "var(--gold)" : "transparent", color: active ? "var(--cream)" : "var(--muted)", border: active ? "1px solid var(--gold)" : "1px solid var(--border)", cursor: "pointer", transition: "all .2s" }}>
                    {c}
                  </button>
                );
              })}
            </div>
            <div style={{ position: "relative" }} className="product-search">
              <Search size={12} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--gold)", pointerEvents: "none" }} />
              <input value={q} onChange={(e) => setQ(e.target.value)}
                placeholder={t.products.searchPlaceholder}
                style={{ paddingLeft: "2rem", paddingRight: "1rem", paddingTop: "0.45rem", paddingBottom: "0.45rem", borderRadius: "100px", border: "1px solid var(--border)", background: "transparent", fontFamily: "'Poppins',sans-serif", fontSize: "0.78rem", color: "var(--ink)", outline: "none", width: "200px", transition: "border-color .2s" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>
          </div>
        </AnimateOnScroll>

        {/* Products */}
        {products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 0", borderTop: "1px solid var(--border)" }}>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.85rem", color: "var(--muted)" }}>
              {locale === "id" ? "Koleksi akan segera ditambahkan." : "Collections will be added soon."}
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 0" }}>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.85rem", color: "var(--muted)" }}>
              {locale === "id" ? "Produk tidak ditemukan." : "No products found."}
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}
            className="product-grid">
            {filtered.map((p, idx) => {
              const name = locale === "id" ? p.nameId : p.nameEn;
              const desc = locale === "id" ? p.descId : p.descEn;
              return (
                <AnimateOnScroll key={p.id} delay={idx * 50}>
                  <div onClick={() => setSel(p)}
                    style={{ cursor: "pointer", borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem" }}>
                    <div style={{ height: "220px", borderRadius: "12px", marginBottom: "1rem", overflow: "hidden", background: "var(--cream-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {p.images?.[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.images[0]} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div className="img-placeholder" style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid var(--border)" }} />
                          <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Photo</span>
                        </div>
                      )}
                    </div>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.3rem" }}>
                      {p.category}{p.motif ? ` · ${p.motif}` : ""}
                    </p>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--brown)", marginBottom: "0.3rem" }}>
                      {name}
                    </p>
                    {desc && (
                      <p className="clamp-2" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "0.4rem" }}>
                        {desc}
                      </p>
                    )}
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.85rem", color: "var(--brown-mid)", fontWeight: 500 }}>
                      {fmt(p.price)}
                    </p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {sel && (() => {
        const name = locale === "id" ? sel.nameId : sel.nameEn;
        const desc = locale === "id" ? sel.descId : sel.descEn;
        const material = locale === "id" ? sel.materialId : sel.materialEn;
        const estimasi = locale === "id" ? sel.estimasiId : sel.estimasiEn;
        const care = locale === "id" ? sel.careId : sel.careEn;
        const sizes = sel.sizes;
        const waMsg = encodeURIComponent(`Halo Batik Gumregah! Saya tertarik dengan: ${name}. Apakah masih tersedia?`);
        return (
          <div onClick={() => setSel(null)}
            style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(20,12,6,0.75)", display: "flex", alignItems: "flex-end", justifyContent: "center", backdropFilter: "blur(4px)" }}>
            <div onClick={(e) => e.stopPropagation()}
              style={{ background: "var(--cream)", borderRadius: "20px 20px 0 0", width: "100%", maxWidth: "500px", maxHeight: "88vh", overflowY: "auto", animation: "fadeUp .3s ease-out both" }}>
              <div style={{ height: "220px", borderRadius: "20px 20px 0 0", overflow: "hidden", background: "var(--cream-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {sel.images?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={sel.images[0]} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div className="img-placeholder" style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid var(--border)" }} />
                    <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Photo</span>
                  </div>
                )}
              </div>
              <div style={{ padding: "1.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                  <div>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.3rem" }}>
                      {sel.category}{sel.motif ? ` · ${sel.motif}` : ""}
                    </p>
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 600, color: "var(--brown)" }}>{name}</h3>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "1rem", color: "var(--gold)", fontWeight: 500, marginTop: "0.25rem" }}>{fmt(sel.price)}</p>
                  </div>
                  <button onClick={() => setSel(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", marginTop: "4px" }}>
                    <X size={18} />
                  </button>
                </div>

                {desc && <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.25rem" }}>{desc}</p>}

                {[
                  { label: t.products.materialLabel, val: material },
                  { label: t.products.sizeLabel,     val: sizes    },
                  { label: t.products.estimationLabel, val: estimasi },
                  { label: t.products.careLabel,      val: care     },
                ].filter(({ val }) => val).map(({ label, val }) => (
                  <div key={label} style={{ display: "flex", gap: "1rem", paddingTop: "0.75rem", paddingBottom: "0.75rem", borderTop: "1px solid var(--border)" }}>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.72rem", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.1em", minWidth: "100px" }}>{label}</p>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "var(--ink)" }}>{val}</p>
                  </div>
                ))}

                <a href={`https://wa.me/${WA}?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "1.5rem", padding: "0.9rem", borderRadius: "12px", background: "#25D366", color: "#fff", fontFamily: "'Poppins',sans-serif", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
                  <MessageCircle size={16} />
                  {t.products.orderWhatsApp}
                </a>
              </div>
            </div>
          </div>
        );
      })()}

      <style>{`
        @media(max-width:768px){.product-grid{grid-template-columns:1fr 1fr !important;}}
        @media(max-width:480px){.product-grid{grid-template-columns:1fr !important;}}
        @media(max-width:640px){
          .product-filter-row { flex-direction: column !important; align-items: stretch !important; }
          .product-search input { width: 100% !important; }
          .product-search { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
