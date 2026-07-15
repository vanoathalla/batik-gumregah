"use client";

import { useLanguage } from "@/context/LanguageContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import SectionHeading from "@/components/ui/SectionHeading";
import { craftSteps } from "@/lib/data";
import { Pencil, Wand2, Palette, Wind, Droplets, BadgeCheck } from "lucide-react";

const icons = [Pencil, Wand2, Palette, Wind, Droplets, BadgeCheck];

export default function CraftsmanshipSection() {
  const { t, locale } = useLanguage();

  return (
    <section id="craftsmanship" style={{ background: "var(--cream)", padding: "6rem 0" }}>
      <div className="container-custom">

        <AnimateOnScroll>
          <SectionHeading
            section="craftsmanship"
            label={t.craftsmanship.sectionLabel}
            title={t.craftsmanship.title}
            subtitle={t.craftsmanship.subtitle}
          />
        </AnimateOnScroll>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}
          className="craft-grid">
          {craftSteps.map((step, idx) => {
            const d = locale === "id" ? step.id : step.en;
            const Icon = icons[idx] ?? Pencil;
            return (
              <AnimateOnScroll key={step.step} delay={idx * 60}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem" }}>
                  {/* Photo placeholder */}
                  <div className="img-placeholder" style={{ height: "130px", borderRadius: "12px", marginBottom: "1rem" }}>
                    <Icon size={20} style={{ color: "var(--gold)", opacity: 0.4 }} />
                    <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Photo</span>
                  </div>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.4rem" }}>
                    {String(step.step).padStart(2, "0")}
                  </p>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.15rem", fontWeight: 600, color: "var(--brown)", marginBottom: "0.4rem" }}>
                    {d.title}
                  </p>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.75 }}>
                    {d.desc}
                  </p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        {/* Pull quote */}
        <AnimateOnScroll delay={100}>
          <div style={{ marginTop: "4rem", borderTop: "1px solid var(--border)", paddingTop: "3rem", maxWidth: "600px" }}>
            <blockquote style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.1rem,2vw,1.4rem)", fontStyle: "italic", fontWeight: 400, color: "var(--brown-mid)", lineHeight: 1.6 }}>
              "Membatik bukan sekadar pekerjaan — ini adalah meditasi, doa, dan cinta yang dituangkan dalam setiap goresan."
            </blockquote>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginTop: "1rem" }}>
              — Para Pengrajin, Batik Gumregah
            </p>
          </div>
        </AnimateOnScroll>
      </div>

      <style>{`
        @media(max-width:768px){.craft-grid{grid-template-columns:1fr 1fr !important;}}
        @media(max-width:480px){.craft-grid{grid-template-columns:1fr !important;}}
      `}</style>
    </section>
  );
}
