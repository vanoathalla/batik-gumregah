"use client";

import { useLanguage } from "@/context/LanguageContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { MapPin, Clock, Phone, Share2 } from "lucide-react";

export default function VisitSection() {
  const { t } = useLanguage();

  const info = [
    { Icon: MapPin,  label: t.visit.addressLabel, value: t.visit.address   },
    { Icon: Clock,   label: t.visit.hoursLabel,   value: t.visit.hours     },
    { Icon: Phone,   label: t.visit.phoneLabel,   value: "+62 882-2951-4350" },
    { Icon: Share2,  label: "Instagram",          value: "@batik_gumregah"  },
  ];

  return (
    <section id="visit" style={{ background: "var(--cream-2)", padding: "6rem 0" }}>
      <div className="container-custom">

        <AnimateOnScroll className="mb-16">
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)" }}>
            {t.visit.sectionLabel}
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.9rem,3.5vw,3rem)", fontWeight: 500, color: "var(--brown)", marginTop: "0.5rem", marginBottom: "1.25rem" }}>
            {t.visit.title}
          </h2>
          <span className="rule-gold" />
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.875rem", color: "var(--muted)", marginTop: "1.25rem", maxWidth: "520px", lineHeight: 1.85 }}>
            {t.visit.subtitle}
          </p>
        </AnimateOnScroll>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "4rem", alignItems: "start" }}
          className="visit-grid">

          {/* Info */}
          <AnimateOnScroll direction="left">
            <div style={{ display: "flex", flexDirection: "column" }}>
              {info.map(({ Icon, label, value }) => (
                <div
                  key={label}
                  style={{ display: "flex", gap: "1rem", alignItems: "start", paddingTop: "1.25rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--border)" }}
                >
                  <Icon size={14} style={{ color: "var(--gold)", marginTop: "2px", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.2rem" }}>
                      {label}
                    </p>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", color: "var(--ink)", lineHeight: 1.65 }}>
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Map */}
          <AnimateOnScroll direction="right">
            <div style={{ borderRadius: "16px", overflow: "hidden", height: "400px", border: "1px solid var(--border)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.6!2d110.4123!3d-7.9469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKanten%2C+Imogiri%2C+Bantul!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                width="100%" height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Batik Gumregah"
              />
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      <style>{`@media(max-width:768px){.visit-grid{grid-template-columns:1fr !important;gap:2.5rem !important;}}`}</style>
    </section>
  );
}
