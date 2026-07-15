"use client";

// Aksara Jawa per section
const JAVANESE: Record<string, string> = {
  about:         "ꦏꦶꦱꦃ",
  philosophy:    "ꦥꦶꦭꦱꦥ",
  craftsmanship: "ꦏꦫꦗꦶꦤꦤ꧀",
  collections:   "ꦏꦺꦴꦭꦺꦏꦱꦶ",
  artisans:      "ꦥꦼꦔꦿꦗꦶꦤ꧀",
  gallery:       "ꦒꦭꦺꦴꦫꦶ",
  custom:        "ꦥꦼꦱꦤꦤ꧀",
  testimonials:  "ꦮꦼꦠꦼꦁ",
  visit:         "ꦏꦸꦤ꧀ꦗꦸꦁꦔꦤ꧀",
  contact:       "ꦲꦸꦧꦸꦁꦔꦤ꧀",
  hero:          "ꦧꦠꦶꦏ꧀",
};

interface Props {
  section: keyof typeof JAVANESE;
  label: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionHeading({ section, label, title, subtitle, light = false }: Props) {
  const javanese = JAVANESE[section] ?? "";

  return (
    <div style={{ marginBottom: "4rem" }}>
      {/* Aksara Jawa — di atas eyebrow label */}
      {javanese && (
        <p
          aria-hidden="true"
          style={{
            fontFamily: "'Noto Serif Javanese', 'Javanese Text', serif",
            fontSize: "1.1rem",
            color: "var(--gold)",
            opacity: 0.55,
            letterSpacing: "0.08em",
            marginBottom: "0.5rem",
            lineHeight: 1.4,
            userSelect: "none",
          }}
        >
          {javanese}
        </p>
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
        lineHeight: 1.2,
      }}>
        {title}
      </h2>

      {/* Gold rule */}
      <span className="rule-gold" />

      {/* Subtitle */}
      {subtitle && (
        <p style={{
          fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
          fontSize: "0.875rem",
          color: light ? "rgba(240,232,220,0.65)" : "var(--muted)",
          marginTop: "1.25rem",
          maxWidth: "520px",
          lineHeight: 1.85,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
