"use client";

import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  const navLinks = [
    { href: "#about",         label: t.nav.ourStory      },
    { href: "#philosophy",    label: t.nav.philosophy    },
    { href: "#craftsmanship", label: t.nav.craftsmanship },
    { href: "#collections",   label: t.nav.collections   },
    { href: "#visit",         label: t.nav.visitUs       },
  ];

  return (
    <footer style={{ background: "#211610", color: "#9A8070", fontFamily: "'Poppins',sans-serif", overflowX: "hidden" }}>




      {/* ── Main content ── */}
      <div style={{ padding: "3.5rem 1.5rem 2.5rem", maxWidth: "1200px", margin: "0 auto", boxSizing: "border-box" }}>

        {/* Brand */}
        <div style={{ marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(184,150,96,0.10)" }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 600, color: "#E8DDD0", marginBottom: "0.2rem" }}>
            Batik Gumregah
          </p>
          <p style={{ fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.9rem" }}>
            Kanten · Imogiri · Yogyakarta
          </p>
          <p style={{ fontSize: "0.8rem", lineHeight: 1.8, color: "#A89888", maxWidth: "320px" }}>
            {t.footer.tagline}
          </p>
        </div>

        {/* Quick links + Contact — 2 col always */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>

          {/* Quick links */}
          <div>
            <p style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
              {t.footer.quickLinks}
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.55rem", listStyle: "none" }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "#A89888", padding: 0, transition: "color .2s", textAlign: "left" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#B89660")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#A89888")}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
              Contact
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none" }}>
              {[
                { Icon: MapPin, text: "Desa Kanten, Imogiri, Bantul, DIY" },
                { Icon: Phone,  text: "+62 882-2951-4350" },
                { Icon: Mail,   text: "hello@batikgumregah.com" },
              ].map(({ Icon, text }) => (
                <li key={text} style={{ display: "flex", gap: "0.5rem", alignItems: "start" }}>
                  <Icon size={11} style={{ color: "var(--gold)", marginTop: "3px", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.75rem", color: "#A89888", lineHeight: 1.6, wordBreak: "break-word", minWidth: 0 }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: "1px solid rgba(184,150,96,0.08)", padding: "1rem 1.5rem", boxSizing: "border-box" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.4rem" }}>
          <p style={{ fontSize: "0.68rem", color: "#6B5A4A", letterSpacing: "0.01em" }}>
            © 2026 Batik Gumregah · KKN UPNVY 84.038
          </p>
          <p style={{ fontSize: "0.68rem", color: "#6B5A4A", letterSpacing: "0.01em" }}>
            Dibuat oleh R. Revano Athalla Kartika
          </p>
        </div>
      </div>

    </footer>
  );
}
