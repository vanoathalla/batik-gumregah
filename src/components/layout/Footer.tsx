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

  return (
    <footer style={{ background: "#211610", color: "#9A8070", fontFamily: "'Poppins',sans-serif", overflowX: "hidden" }}>

      {/* ── Newsletter ── */}
      <div style={{ borderBottom: "1px solid rgba(184,150,96,0.12)", padding: "3.5rem 0" }}>
        <div style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center", padding: "0 1.5rem" }}>
          <p style={{ fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem" }}>
            Newsletter
          </p>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 500, color: "#E8DDD0", marginBottom: "0.5rem", lineHeight: 1.2 }}>
            {t.newsletter.title}
          </h3>
          <p style={{ fontSize: "0.8rem", color: "#7A6A5A", marginBottom: "1.5rem", lineHeight: 1.75 }}>
            {t.newsletter.subtitle}
          </p>
          {subscribed ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "0.82rem", color: "var(--gold)" }}>
              <Check size={14} /> {t.newsletter.button}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <input
                type="email" value={email} required
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletter.placeholder}
                style={{ width: "100%", padding: "0.8rem 1.2rem", borderRadius: "100px", border: "1px solid rgba(184,150,96,0.25)", background: "rgba(255,255,255,0.04)", color: "#E8DDD0", fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", outline: "none", boxSizing: "border-box" }}
              />
              <button
                type="submit"
                style={{ width: "100%", padding: "0.8rem 1.2rem", borderRadius: "100px", background: "var(--gold)", color: "#1E1208", fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", fontWeight: 600, border: "none", cursor: "pointer" }}
              >
                {t.newsletter.button}
              </button>
            </form>
          )}
        </div>
      </div>

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
          <p style={{ fontSize: "0.8rem", lineHeight: 1.8, color: "#7A6A5A", maxWidth: "320px" }}>
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
                    style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "#7A6A5A", padding: 0, transition: "color .2s", textAlign: "left" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#B89660")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#7A6A5A")}
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
                { Icon: Phone,  text: "+62 812-3456-7890" },
                { Icon: Mail,   text: "hello@batikgumregah.com" },
              ].map(({ Icon, text }) => (
                <li key={text} style={{ display: "flex", gap: "0.5rem", alignItems: "start" }}>
                  <Icon size={11} style={{ color: "var(--gold)", marginTop: "3px", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.75rem", color: "#7A6A5A", lineHeight: 1.6, wordBreak: "break-word", minWidth: 0 }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: "1px solid rgba(184,150,96,0.08)", padding: "1rem 1.5rem", boxSizing: "border-box" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.4rem" }}>
          <p style={{ fontSize: "0.68rem", color: "#4A3A2A", letterSpacing: "0.01em" }}>
            © 2026 Batik Gumregah · KKN UPNVY 84.038
          </p>
          <p style={{ fontSize: "0.68rem", color: "#4A3A2A", letterSpacing: "0.01em" }}>
            Dibuat oleh R. Revano Athalla Kartika
          </p>
        </div>
      </div>

    </footer>
  );
}
