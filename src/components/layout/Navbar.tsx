"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { localeFlags, localeNames } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { Moon, Sun, Menu, X } from "lucide-react";

export default function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#about",        label: t.nav.ourStory      },
    { href: "#philosophy",   label: t.nav.philosophy    },
    { href: "#craftsmanship",label: t.nav.craftsmanship },
    { href: "#collections",  label: t.nav.collections   },
    { href: "#journal",      label: t.nav.journal       },
    { href: "#visit",        label: t.nav.visitUs       },
    { href: "#contact",      label: t.nav.contact       },
  ];

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const navBase: React.CSSProperties = {
    position: "fixed",
    top: 0, left: 0, right: 0,
    zIndex: 100,
    transition: "all .35s",
    background: scrolled ? (isDark ? "rgba(26,20,16,0.92)" : "rgba(247,243,238,0.92)") : "transparent",
    backdropFilter: scrolled ? "blur(16px)" : "none",
    borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
  };

  const linkStyle: React.CSSProperties = {
    fontFamily: "'Poppins',sans-serif",
    fontSize: "0.78rem",
    letterSpacing: "0.02em",
    color: scrolled ? "var(--muted)" : "rgba(240,232,220,0.75)",
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "color .2s",
    padding: 0,
  };

  return (
    <>
      <nav style={navBase}>
        <div className="container-custom" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0, display: "flex", alignItems: "center", gap: "0.6rem" }}
          >
            <Image
              src="/images/logo.png"
              alt="Logo Batik Gumregah"
              width={40}
              height={40}
              style={{ objectFit: "contain", flexShrink: 0 }}
              priority
            />
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", fontWeight: 600, color: scrolled ? "var(--brown)" : "#F0E8DC", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
                Batik Gumregah
              </p>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: scrolled ? "var(--gold)" : "rgba(184,150,96,0.8)", marginTop: "1px" }}>
                Kanten · Imogiri
              </p>
            </div>
          </button>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="desktop-nav">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={linkStyle}
                onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.color = "var(--gold)")}
                onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.color = linkStyle.color as string)}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Theme */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{ background: "none", border: "none", cursor: "pointer", color: scrolled ? "var(--muted)" : "rgba(184,150,96,0.7)", padding: "4px", display: "flex" }}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Language */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{ display: "flex", alignItems: "center", gap: "4px", background: "none", border: "1px solid var(--border)", borderRadius: "100px", padding: "0.3rem 0.7rem", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontSize: "0.72rem", color: scrolled ? "var(--muted)" : "rgba(240,232,220,0.7)" }}
              >
                <span>{localeFlags[locale]}</span>
                <span className="lang-text">{localeNames[locale]}</span>
              </button>
              {langOpen && (
                <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: "var(--cream)", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden", minWidth: "130px", boxShadow: "0 4px 20px rgba(61,43,31,0.12)", animation: "fadeUp .2s ease-out both" }}>
                  {(["id", "en"] as Locale[]).map((loc) => (
                    <button
                      key={loc}
                      onClick={() => { setLocale(loc); setLangOpen(false); }}
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: "8px", padding: "0.65rem 1rem", background: "none", border: "none", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontSize: "0.78rem", color: locale === loc ? "var(--gold)" : "var(--muted)", fontWeight: locale === loc ? 600 : 400, transition: "background .15s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--cream-2)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "none")}
                    >
                      <span>{localeFlags[loc]}</span>
                      <span>{localeNames[loc]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: scrolled ? "var(--muted)" : "rgba(240,232,220,0.7)", padding: "4px" }}
              className="hamburger"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "var(--cream)", borderTop: "1px solid var(--border)", animation: "fadeUp .25s ease-out both" }}>
            <div className="container-custom" style={{ paddingTop: "1rem", paddingBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "0" }}>
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  style={{ textAlign: "left", padding: "0.85rem 0", background: "none", border: "none", borderBottom: "1px solid var(--border)", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontSize: "0.85rem", color: "var(--muted)" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

<style>{`
  @media (max-width:1024px) { .desktop-nav{display:none !important;} .hamburger{display:flex !important;} }
  @media (max-width:768px) { .lang-text{display:none;} }
`}</style>
    </>
  );
}
