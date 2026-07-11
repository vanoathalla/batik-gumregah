"use client";

import { useLanguage } from "@/context/LanguageContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { MessageCircle, MessageSquare, Scissors, Palette, Package, Check } from "lucide-react";

const steps = [
  { icon: MessageSquare, id: { title: "Konsultasi Desain", desc: "Ceritakan ide Anda. Kami siap mendengarkan dan memberikan saran terbaik." }, en: { title: "Design Consultation", desc: "Tell us your ideas. We'll listen and provide the best advice." } },
  { icon: Scissors,      id: { title: "Pilih Kain",        desc: "Pilih jenis kain, berat, dan kualitas sesuai kebutuhan dan anggaran Anda." }, en: { title: "Choose Fabric",       desc: "Select type, weight, and quality that fits your needs and budget." } },
  { icon: Palette,       id: { title: "Proses Produksi",   desc: "Pengrajin kami bekerja dengan penuh dedikasi mewujudkan batik impian Anda." }, en: { title: "Production",          desc: "Our artisans work with full dedication to bring your dream batik to life." } },
  { icon: Package,       id: { title: "Pengiriman",        desc: "Dikemas indah dan dikirim ke seluruh Indonesia maupun mancanegara." }, en: { title: "Delivery",            desc: "Beautifully packaged and delivered throughout Indonesia and internationally." } },
];

export default function CustomSection() {
  const { t, locale } = useLanguage();
  const waMsg = encodeURIComponent("Halo Batik Gumregah! Saya ingin berkonsultasi untuk pembuatan batik custom.");

  return (
    <section id="custom" style={{ background: "var(--cream-2)", padding: "6rem 0" }}>
      <div className="container-custom">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}
          className="custom-grid">

          {/* Left */}
          <AnimateOnScroll direction="left">
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)" }}>
              {t.custom.sectionLabel}
            </span>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.9rem,3.5vw,3rem)", fontWeight: 500, color: "var(--brown)", marginTop: "0.5rem", marginBottom: "1.25rem" }}>
              {t.custom.title}
            </h2>
            <span className="rule-gold" />
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.875rem", color: "var(--muted)", marginTop: "1.25rem", lineHeight: 1.85, marginBottom: "2rem" }}>
              {t.custom.subtitle}
            </p>

            <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2.5rem" }}>
              {[
                locale === "id" ? "Motif sesuai keinginan" : "Custom motifs",
                locale === "id" ? "Pilihan warna bebas" : "Free color choice",
                locale === "id" ? "Berbagai ukuran" : "Various sizes",
                locale === "id" ? "Pewarna alami tersedia" : "Natural dyes available",
                locale === "id" ? "Untuk korporat & pernikahan" : "Corporate & wedding ready",
                locale === "id" ? "Pengiriman internasional" : "International shipping",
              ].map((feat) => (
                <li key={feat} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", color: "var(--muted)" }}>
                  <Check size={12} style={{ color: "var(--gold)", flexShrink: 0 }} />
                  {feat}
                </li>
              ))}
            </ul>

            <a
              href={`https://wa.me/6281234567890?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "0.85rem 1.75rem", borderRadius: "100px", background: "var(--brown)", color: "var(--cream)", fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none", transition: "opacity .2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = ".8")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            >
              <MessageCircle size={15} />
              {t.custom.ctaStart}
            </a>
          </AnimateOnScroll>

          {/* Right — steps */}
          <AnimateOnScroll direction="right">
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {steps.map((step, idx) => {
                const d = locale === "id" ? step.id : step.en;
                const Icon = step.icon;
                return (
                  <div
                    key={step.id.title}
                    style={{ display: "flex", gap: "1.25rem", paddingTop: "1.25rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--border)" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%", border: "1px solid var(--border)", flexShrink: 0 }}>
                      <Icon size={14} style={{ color: "var(--gold)" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "var(--brown)" }}>
                          {d.title}
                        </p>
                        <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", color: "var(--gold)", opacity: 0.5 }}>
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.75 }}>
                        {d.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      <style>{`@media(max-width:768px){.custom-grid{grid-template-columns:1fr !important;gap:2.5rem !important;}}`}</style>
    </section>
  );
}
