"use client";

import { useLanguage } from "@/context/LanguageContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { MessageSquare, Mail, ArrowUpRight } from "lucide-react";

// Custom SVG icon for Instagram since brand icons are not packaged in this project's lucide-react
const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function ContactSection() {
  const { t, locale } = useLanguage();

  // Data kontak (bisa diubah nanti)
  const contactInfo = {
    whatsappNumber: "6288229514350",
    whatsappMessage: locale === "id" 
      ? "Halo Batik Gumregah! Saya ingin bertanya tentang koleksi batik Anda."
      : "Hello Batik Gumregah! I would like to inquire about your batik collections.",
    email: "hello@batikgumregah.com",
    instagram: "batik_gumregah"
  };

  const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(contactInfo.whatsappMessage)}`;

  const secondaryChannels = [
    {
      label: "Email",
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      Icon: Mail,
      sub: locale === "id" ? "Balas dalam 24 jam" : "Reply within 24 hours"
    },
    {
      label: "Instagram",
      value: `@${contactInfo.instagram}`,
      href: `https://instagram.com/${contactInfo.instagram}`,
      Icon: InstagramIcon,
      sub: locale === "id" ? "Koleksi terbaru & update" : "Latest collections & updates"
    }
  ];

  return (
    <section id="contact" style={{ background: "var(--cream-2)", padding: "6rem 0" }}>
      <div className="container-custom">
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "5rem" }} className="contact-grid">
          
          {/* Sisi Kiri: Deskripsi & Saluran Sekunder */}
          <AnimateOnScroll direction="left">
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)" }}>
                {t.contact.sectionLabel}
              </span>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.9rem,3.5vw,3rem)", fontWeight: 500, color: "var(--brown)", marginTop: "0.5rem", marginBottom: "1.25rem" }}>
                {t.contact.title}
              </h2>
              <span className="rule-gold" />
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.875rem", color: "var(--muted)", marginTop: "1.25rem", maxWidth: "480px", lineHeight: 1.85, marginBottom: "2.5rem" }}>
                {t.contact.subtitle}
              </p>

              {/* Email & Instagram List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "440px" }}>
                {secondaryChannels.map(({ label, value, href, Icon, sub }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: "1.25rem", padding: "1.25rem", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--cream)", textDecoration: "none", transition: "all .3s ease" }}
                    className="contact-card-hover"
                  >
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(184, 150, 96, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)", flexShrink: 0 }}>
                      <Icon size={18} />
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                      <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600 }}>
                        {label}
                      </span>
                      <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.85rem", fontWeight: 500, color: "var(--brown)" }}>
                        {value}
                      </span>
                      <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.72rem", color: "var(--muted)" }}>
                        {sub}
                      </span>
                    </div>
                    <ArrowUpRight size={16} style={{ color: "var(--muted)", opacity: 0.6 }} />
                  </a>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Sisi Kanan: Kartu Utama WhatsApp (CTA Card) */}
          <AnimateOnScroll direction="right">
            <div style={{
              background: "var(--cream)",
              border: "1px solid rgba(184, 150, 96, 0.18)",
              borderRadius: "20px",
              padding: "2.5rem",
              boxShadow: "0 10px 30px rgba(33, 22, 16, 0.02)",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden"
            }}>
              {/* Hiasan latar belakang batik/lingkaran halus */}
              <div style={{
                position: "absolute",
                top: "-50px",
                right: "-50px",
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                background: "rgba(184, 150, 96, 0.03)",
                pointerEvents: "none"
              }} />

              <div>
                <div style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  background: "rgba(37, 211, 102, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#25D366",
                  marginBottom: "2rem"
                }}>
                  <MessageSquare size={26} />
                </div>

                <h3 style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "1.8rem",
                  fontWeight: 600,
                  color: "var(--brown)",
                  marginBottom: "1rem"
                }}>
                  {locale === "id" ? "Hubungi Melalui WhatsApp" : "Connect on WhatsApp"}
                </h3>

                <p style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "0.85rem",
                  color: "var(--muted)",
                  lineHeight: 1.8,
                  marginBottom: "2rem"
                }}>
                  {locale === "id"
                    ? "Hubungi admin kami langsung untuk melakukan pemesanan, menanyakan stok produk batik tulis, berkonsultasi mengenai custom motif, atau menjadwalkan kunjungan ke workshop kami di Desa Kanten, Imogiri."
                    : "Get in touch with our admin directly for orders, checking batik tulis stock, consulting about custom motifs, or scheduling a visit to our workshop in Kanten Village, Imogiri."}
                </p>

                <div style={{
                  background: "rgba(184, 150, 96, 0.04)",
                  border: "1px dashed rgba(184, 150, 96, 0.2)",
                  borderRadius: "12px",
                  padding: "1rem",
                  marginBottom: "2rem"
                }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--gold)", fontWeight: 600 }}>
                      {locale === "id" ? "Waktu Respon Admin" : "Admin Response Time"}
                    </span>
                    <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "var(--brown)", fontWeight: 500 }}>
                      {locale === "id" ? "Senin – Sabtu: 08:00 – 17:00 WIB" : "Monday – Saturday: 08:00 – 17:00 WIB"}
                    </span>
                  </div>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "1rem",
                  borderRadius: "12px",
                  background: "var(--brown)",
                  color: "var(--cream)",
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "none",
                  textAlign: "center",
                  transition: "all .3s ease",
                  boxShadow: "0 4px 12px rgba(33, 22, 16, 0.1)"
                }}
                className="whatsapp-btn-hover"
              >
                <MessageSquare size={16} />
                {locale === "id" ? "Hubungi via WhatsApp" : "Chat on WhatsApp"}
              </a>
            </div>
          </AnimateOnScroll>

        </div>
      </div>

      <style>{`
        .contact-card-hover:hover {
          border-color: var(--gold) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(184, 150, 96, 0.06);
        }
        .whatsapp-btn-hover:hover {
          background: var(--gold) !important;
          color: #1e1208 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(184, 150, 96, 0.25);
        }
        @media(max-width:768px){
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
