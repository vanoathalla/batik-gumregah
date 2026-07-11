"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { Send } from "lucide-react";

export default function ContactSection() {
  const { t, locale } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); setForm({ name: "", email: "", message: "" }); }, 1200);
  };

  const channels = [
    { label: "WhatsApp", value: "+62 812-3456-7890", href: "https://wa.me/6281234567890", sub: locale === "id" ? "Respon cepat setiap hari" : "Quick response every day" },
    { label: "Email",    value: "hello@batikgumregah.com", href: "mailto:hello@batikgumregah.com", sub: locale === "id" ? "Balas dalam 24 jam" : "Reply within 24 hours" },
    { label: "Instagram",value: "@batikgumregah", href: "https://instagram.com/batikgumregah", sub: locale === "id" ? "Koleksi terbaru" : "Latest collections" },
  ];

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.8rem 1rem",
    borderRadius: "10px",
    border: "1px solid var(--border)",
    background: "transparent",
    fontFamily: "'Poppins',sans-serif",
    fontSize: "0.82rem",
    color: "var(--ink)",
    outline: "none",
    transition: "border-color .2s",
  };

  return (
    <section id="contact" style={{ background: "var(--cream-2)", padding: "6rem 0" }}>
      <div className="container-custom">

        <AnimateOnScroll className="mb-16">
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)" }}>
            {t.contact.sectionLabel}
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.9rem,3.5vw,3rem)", fontWeight: 500, color: "var(--brown)", marginTop: "0.5rem", marginBottom: "1.25rem" }}>
            {t.contact.title}
          </h2>
          <span className="rule-gold" />
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.875rem", color: "var(--muted)", marginTop: "1.25rem", maxWidth: "520px", lineHeight: 1.85 }}>
            {t.contact.subtitle}
          </p>
        </AnimateOnScroll>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem" }}
          className="contact-grid">

          {/* Channels */}
          <AnimateOnScroll direction="left">
            <div style={{ display: "flex", flexDirection: "column" }}>
              {channels.map(({ label, value, href, sub }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "flex", flexDirection: "column", paddingTop: "1.25rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--border)", textDecoration: "none", transition: "opacity .2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = ".7")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
                >
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.2rem" }}>
                    {label}
                  </span>
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.9rem", fontWeight: 500, color: "var(--brown)", marginBottom: "0.15rem" }}>
                    {value}
                  </span>
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.75rem", color: "var(--muted)" }}>
                    {sub}
                  </span>
                </a>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Form */}
          <AnimateOnScroll direction="right">
            {sent ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.75rem", paddingTop: "2rem" }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 600, color: "var(--brown)" }}>
                  {locale === "id" ? "Pesan terkirim." : "Message sent."}
                </p>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", color: "var(--muted)" }}>
                  {locale === "id" ? "Kami akan segera menghubungi Anda." : "We'll get back to you soon."}
                </p>
                <button
                  onClick={() => setSent(false)}
                  style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.78rem", color: "var(--gold)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "3px", marginTop: "0.5rem" }}
                >
                  {locale === "id" ? "Kirim pesan lain" : "Send another"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <input
                  type="text" value={form.name} placeholder={t.contact.namePlaceholder} required
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
                <input
                  type="email" value={form.email} placeholder={t.contact.emailPlaceholder} required
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
                <textarea
                  value={form.message} placeholder={t.contact.messagePlaceholder} required rows={5}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
                <button
                  type="submit" disabled={loading}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "0.9rem", borderRadius: "10px", background: "var(--brown)", color: "var(--cream)", fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", fontWeight: 600, border: "none", cursor: "pointer", opacity: loading ? 0.6 : 1, transition: "opacity .2s" }}
                >
                  {loading ? (
                    <span className="animate-spin" style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid rgba(247,243,238,0.3)", borderTopColor: "var(--cream)", display: "inline-block" }} />
                  ) : (
                    <><Send size={13} /> {t.contact.sendButton}</>
                  )}
                </button>
              </form>
            )}
          </AnimateOnScroll>
        </div>
      </div>

      <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr !important;gap:2.5rem !important;}}`}</style>
    </section>
  );
}
