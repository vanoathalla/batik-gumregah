"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { faqs } from "@/lib/data";
import { Plus, Minus } from "lucide-react";

export default function FAQSection() {
  const { t, locale } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" style={{ background: "var(--cream)", padding: "6rem 0" }}>
      <div className="container-custom">

        <AnimateOnScroll className="mb-16">
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)" }}>
            {t.faq.sectionLabel}
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.9rem,3.5vw,3rem)", fontWeight: 500, color: "var(--brown)", marginTop: "0.5rem", marginBottom: "1.25rem" }}>
            {t.faq.title}
          </h2>
          <span className="rule-gold" />
        </AnimateOnScroll>

        <div style={{ maxWidth: "640px" }}>
          {faqs.map((faq, idx) => {
            const d = locale === "id" ? faq.id : faq.en;
            const isOpen = open === idx;
            return (
              <AnimateOnScroll key={idx} delay={idx * 40}>
                <div style={{ borderBottom: "1px solid var(--border)" }}>
                  <button
                    onClick={() => setOpen(isOpen ? null : idx)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", paddingTop: "1.25rem", paddingBottom: "1.25rem", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                    aria-expanded={isOpen}
                  >
                    <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.875rem", fontWeight: isOpen ? 600 : 400, color: isOpen ? "var(--brown)" : "var(--muted)", lineHeight: 1.5, transition: "color .2s" }}>
                      {d.q}
                    </span>
                    <span style={{ color: "var(--gold)", flexShrink: 0 }}>
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div style={{ paddingBottom: "1.25rem", animation: "fadeUp .25s ease-out both" }}>
                      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.85 }}>
                        {d.a}
                      </p>
                    </div>
                  )}
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        <AnimateOnScroll delay={100}>
          <div style={{ marginTop: "3rem" }}>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", color: "var(--muted)", marginBottom: "1rem" }}>
              {locale === "id" ? "Masih ada pertanyaan?" : "Still have questions?"}
            </p>
            <a
              href="https://wa.me/6288229514350"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "0.75rem 1.5rem", borderRadius: "100px", background: "#25D366", color: "#fff", fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none" }}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {locale === "id" ? "Tanya via WhatsApp" : "Ask via WhatsApp"}
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
