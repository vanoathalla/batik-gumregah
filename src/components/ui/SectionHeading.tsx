"use client";

// Aksara Jawa per section — tulisan asli huruf Jawa yang relevan
// Sumber: Unicode Javanese block (U+A980–U+A9DF)
const JAVANESE: Record<string, string> = {
  about:         "ꦏꦶꦱꦃ",        // kisah (cerita/sejarah)
  philosophy:    "ꦥꦶꦭꦱꦥ",       // filsafat
  craftsmanship: "ꦏꦫꦗꦶꦤꦤ꧀",    // karajinanan (kerajinan)
  collections:   "ꦏꦺꦴꦭꦺꦏꦱꦶ",   // koleksi
  artisans:      "ꦥꦼꦔꦿꦗꦶꦤ꧀",   // pengrajin
  gallery:       "ꦒꦭꦺꦴꦫꦶ",      // galeri
  custom:        "ꦥꦼꦱꦤꦤ꧀",      // pesanan
  testimonials:  "ꦮꦼꦠꦼꦁ",       // weteng (suara hati)
  visit:         "ꦏꦸꦤ꧀ꦗꦸꦁꦔꦤ꧀", // kunjungan
  contact:       "ꦲꦸꦧꦸꦁꦔꦤ꧀",   // hubungan
  hero:          "ꦧꦠꦶꦏ꧀",       // batik
};

interface Props {
  section: keyof typeof JAVANESE;
  label: string;        // eyebrow label (uppercase kecil, gold)
  title: string;        // judul utama h2
  subtitle?: string;    // paragraf bawah judul (opsional)
  light?: boolean;      // true = teks putih (untuk background gelap)
}

export default function SectionHeading({ section, label, title, subtitle, light = false }: Props) {
  const javanese = JAVANESE[section] ?? "";

  return (
    <div style={{ position: "relative", marginBottom: "4rem" }}>
      {/* Aksara Jawa watermark */}
      {javanese && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-60%)",
            fontFamily: "'Noto Serif Javanese', serif",
            fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
            color: light ? "rgba(255,255,255,0.07)" : "rgba(184,150,96,0.13)",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
          }}
        >
          {javanese}
        </span>
      )}

      {/* Eyebrow */}
      <span style={{
        fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
        fontSize: "10px",
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        color: "var(--gold)",
        display: "block",
        marginBottom: "0.6rem",
        position: "relative",
      }}>
        {label}
      </span>

      {/* Title */}
      <h2 style={{
        fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
        fontSize: "clamp(1.9rem, 3.5vw, 3rem)",
        fontWeight: 500,
        color: light ? "var(--cream)" : "var(--brown)",
        marginTop: "0.25rem",
        marginBottom: "1.25rem",
        position: "relative",
        lineHeight: 1.2,
      }}>
        {title}
      </h2>

      {/* Gold rule */}
      <span className="rule-gold" style={{ position: "relative" }} />

      {/* Subtitle */}
      {subtitle && (
        <p style={{
          fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
          fontSize: "0.875rem",
          color: light ? "rgba(240,232,220,0.65)" : "var(--muted)",
          marginTop: "1.25rem",
          maxWidth: "520px",
          lineHeight: 1.85,
          position: "relative",
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
