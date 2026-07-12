"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Phone, Mail, Check } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  const navLinks = [
    { href: "#about",         label: t.nav.ourStory      },
    { href: "#philosophy",    label: t.nav.philosophy    },
    { href: "#craftsmanship", label: t.nav.craftsmanship },
    { href: "#collections",   label: t.nav.collections   },
    { href: "#journal",       label: t.nav.journal       },
    { href: "#visit",         label: t.nav.visitUs       },
  ];

  const footerBase: React.CSSProperties = {
    background: "#211610",
    color: "#9A8070",
    fontFamily: "'Poppins',sans-serif",
  };

  return (
    <footer style={footerBase}>

      {/* Newsletter strip */}
      <div style={{ borderBottom: "1px solid rgba(184,150,96,0.12)", padding: "4rem 0" }}>
        <div className="container-custom" style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
            Newsletter
          </p>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", fontWeight: 500, color: "#E8DDD0", marginBottom: "0.5rem" }}>
            {t.newsletter.title}
          </h3>
          <p style={{ fontSize: "0.82rem", color: "#7A6A5A", marginBottom: "1.75rem", lineHeight: 1.75 }}>
            {t.newsletter.subtitle}
          </p>
          {subscribed ? (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "var(--gold)" }}>
              <Check size={14} /> {t.newsletter.button}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "0.5rem", maxWidth: "400px", margin: "0 auto" }}>
              <input
                type="email" value={email} required
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletter.placeholder}
                style={{ flex: 1, padding: "0.75rem 1rem", borderRadius: "100px", border: "1px solid rgba(184,150,96,0.2)", background: "rgba(255,255,255,0.04)", color: "#E8DDD0", fontFamily: "'Poppins',sans-serif", fontSize: "0.78rem", outline: "none" }}
              />
              <button
                type="submit"
                style={{ padding: "0.75rem 1.25rem", borderRadius: "100px", background: "var(--gold)", color: "#1E1208", fontFamily: "'Poppins',sans-serif", fontSize: "0.78rem", fontWeight: 600, border: "none", cursor: "pointer", whiteSpace: "nowrap" }}
              >
                {t.newsletter.button}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main */}
      <div className="container-custom" style={{ padding: "4rem 0 3rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem" }}
          className="footer-grid">

          {/* Brand */}
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.25rem", fontWeight: 600, color: "#E8DDD0", marginBottom: "0.25rem" }}>
              Batik Gumregah
            </p>
            <p style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
              Kanten · Imogiri · Yogyakarta
            </p>
            <p style={{ fontSize: "0.8rem", lineHeight: 1.8, color: "#7A6A5A", maxWidth: "260px" }}>
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.25rem" }}>
              {t.footer.quickLinks}
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem", listStyle: "none" }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "#7A6A5A", padding: 0, transition: "color .2s" }}
                    onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.color = "#B89660")}
                    onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.color = "#7A6A5A")}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.25rem" }}>
              Contact
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none" }}>
              {[
                { Icon: MapPin, text: "Desa Kanten, Imogiri, Bantul, DIY" },
                { Icon: Phone,  text: "+62 812-3456-7890" },
                { Icon: Mail,   text: "hello@batikgumregah.com" },
              ].map(({ Icon, text }) => (
                <li key={text} style={{ display: "flex", gap: "0.6rem", alignItems: "start" }}>
                  <Icon size={12} style={{ color: "var(--gold)", marginTop: "3px", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.78rem", color: "#7A6A5A", lineHeight: 1.6 }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: "1px solid rgba(184,150,96,0.10)", padding: "1.25rem 0" }}>
        <div className="container-custom footer-bottom" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
          <p style={{ fontSize: "0.72rem", color: "#4A3A2A" }}>
            © 2026 Batik Gumregah · KKN UPNVY 84.038
          </p>
          <p style={{ fontSize: "0.72rem", color: "#4A3A2A" }}>
            Dibuat oleh R. Revano Athalla Kartika
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .footer-bottom { flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 0.25rem !important; }
        }
      `}</style>
    </footer>
  );
}
