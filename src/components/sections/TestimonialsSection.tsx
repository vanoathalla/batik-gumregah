"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { ChevronLeft, ChevronRight, Star, Send } from "lucide-react";
import type { Testimonial } from "@/lib/store";
import { COUNTRY_FLAGS } from "@/lib/store";

export default function TestimonialsSection() {
  const { t, locale } = useLanguage();
  const [list, setList]     = useState<Testimonial[]>([]);
  const [cur, setCur]       = useState(0);
  const [showForm, setShowForm] = useState(false);

  // form state
  const [name, setName]       = useState("");
  const [country, setCountry] = useState("Indonesia");
  const [rating, setRating]   = useState(5);
  const [text, setText]       = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]       = useState(false);
  const [err, setErr]         = useState("");

  // fetch approved testimonials on mount
  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setList(d))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, country, rating, text }),
      });
      const json = await res.json();
      if (!res.ok) { setErr(json.error ?? "Error"); return; }
      setDone(true);
      setName(""); setCountry("Indonesia"); setRating(5); setText("");
    } catch {
      setErr("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.75rem 1rem", borderRadius: "8px",
    border: "1px solid var(--border)", background: "transparent",
    fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem",
    color: "var(--ink)", outline: "none", transition: "border-color .2s",
  };

  return (
    <section style={{ background: "var(--cream)", padding: "6rem 0" }}>
      <div className="container-custom">

        {/* Header */}
        <AnimateOnScroll className="mb-16">
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)" }}>
            {t.testimonials.sectionLabel}
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.9rem,3.5vw,3rem)", fontWeight: 500, color: "var(--brown)", marginTop: "0.5rem", marginBottom: "1.25rem" }}>
            {t.testimonials.title}
          </h2>
          <span className="rule-gold" />
        </AnimateOnScroll>

        {/* Testimonials list */}
        {list.length === 0 ? (
          <AnimateOnScroll>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.85rem", color: "var(--muted)", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
              {locale === "id" ? "Belum ada testimoni. Jadilah yang pertama!" : "No testimonials yet. Be the first!"}
            </p>
          </AnimateOnScroll>
        ) : (
          <>
            {/* Desktop grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2rem" }}
              className="testi-grid">
              {list.map((item, idx) => (
                <AnimateOnScroll key={item.id} delay={idx * 60}>
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
                    <div style={{ display: "flex", gap: "3px", marginBottom: "0.85rem" }}>
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} size={11} style={{ color: "var(--gold)", fill: "var(--gold)" }} />
                      ))}
                    </div>
                    <blockquote style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.8, fontStyle: "italic", marginBottom: "1.25rem" }}>
                      "{item.text}"
                    </blockquote>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "var(--brown)" }}>{item.name}</p>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.72rem", color: "var(--gold)" }}>{item.flag} {item.country}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            {/* Mobile slider */}
            <div className="testi-mobile" style={{ display: "none" }}>
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
                <div style={{ display: "flex", gap: "3px", marginBottom: "0.85rem" }}>
                  {Array.from({ length: list[cur % list.length].rating }).map((_, i) => (
                    <Star key={i} size={11} style={{ color: "var(--gold)", fill: "var(--gold)" }} />
                  ))}
                </div>
                <blockquote style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.8, fontStyle: "italic", marginBottom: "1.5rem" }}>
                  "{list[cur % list.length].text}"
                </blockquote>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "var(--brown)" }}>{list[cur % list.length].name}</p>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.72rem", color: "var(--gold)" }}>{list[cur % list.length].flag} {list[cur % list.length].country}</p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {[ChevronLeft, ChevronRight].map((Icon, i) => (
                      <button key={i}
                        onClick={() => setCur((c) => i === 0 ? (c - 1 + list.length) % list.length : (c + 1) % list.length)}
                        style={{ width: "30px", height: "30px", borderRadius: "50%", border: "1px solid var(--border)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)" }}>
                        <Icon size={13} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* CTA to write a review */}
        <AnimateOnScroll delay={100}>
          <div style={{ marginTop: "3.5rem", borderTop: "1px solid var(--border)", paddingTop: "3rem" }}>
            {!showForm ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 500, color: "var(--brown)", marginBottom: "0.25rem" }}>
                    {locale === "id" ? "Sudah memesan dari kami?" : "Ordered from us before?"}
                  </p>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "var(--muted)" }}>
                    {locale === "id" ? "Bagikan pengalamanmu — akan ditayangkan setelah ditinjau." : "Share your experience — it will appear after review."}
                  </p>
                </div>
                <button
                  onClick={() => setShowForm(true)}
                  style={{ padding: "0.75rem 1.5rem", borderRadius: "100px", border: "1px solid var(--border)", background: "none", fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "var(--brown)", cursor: "pointer", transition: "all .2s", whiteSpace: "nowrap" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--gold)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--brown)"; }}
                >
                  {locale === "id" ? "Tulis Ulasan" : "Write a Review"}
                </button>
              </div>
            ) : done ? (
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 500, color: "var(--brown)", marginBottom: "0.4rem" }}>
                  {locale === "id" ? "Terima kasih!" : "Thank you!"}
                </p>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", color: "var(--muted)" }}>
                  {locale === "id" ? "Ulasanmu sedang ditinjau dan akan segera ditampilkan." : "Your review is being reviewed and will appear soon."}
                </p>
                <button onClick={() => { setDone(false); setShowForm(false); }}
                  style={{ marginTop: "1rem", fontFamily: "'Poppins',sans-serif", fontSize: "0.78rem", color: "var(--gold)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  {locale === "id" ? "Tutup" : "Close"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ maxWidth: "540px" }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", fontWeight: 500, color: "var(--brown)", marginBottom: "1.5rem" }}>
                  {locale === "id" ? "Tulis Ulasan" : "Write a Review"}
                </p>

                {/* Name + Country row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <input value={name} onChange={(e) => setName(e.target.value)} required
                    placeholder={locale === "id" ? "Nama Anda *" : "Your Name *"}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                  <select value={country} onChange={(e) => setCountry(e.target.value)}
                    style={{ ...inputStyle, cursor: "pointer" }}>
                    {Object.keys(COUNTRY_FLAGS).map((c) => (
                      <option key={c} value={c}>{COUNTRY_FLAGS[c]} {c}</option>
                    ))}
                  </select>
                </div>

                {/* Star rating */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.78rem", color: "var(--muted)" }}>
                    {locale === "id" ? "Rating:" : "Rating:"}
                  </span>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} type="button" onClick={() => setRating(s)}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: "2px" }}>
                      <Star size={18} style={{ color: s <= rating ? "var(--gold)" : "var(--border)", fill: s <= rating ? "var(--gold)" : "transparent", transition: "all .15s" }} />
                    </button>
                  ))}
                </div>

                {/* Message */}
                <textarea value={text} onChange={(e) => setText(e.target.value)} required rows={4}
                  placeholder={locale === "id" ? "Ceritakan pengalamanmu... *" : "Share your experience... *"}
                  style={{ ...inputStyle, resize: "none", marginBottom: "0.75rem" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />

                {err && (
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.75rem", color: "#B65E3C", marginBottom: "0.75rem" }}>{err}</p>
                )}

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button type="submit" disabled={submitting}
                    style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0.75rem 1.5rem", borderRadius: "100px", background: "var(--brown)", color: "var(--cream)", fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", fontWeight: 600, border: "none", cursor: "pointer", opacity: submitting ? 0.6 : 1 }}>
                    {submitting ? (
                      <span className="animate-spin" style={{ width: "12px", height: "12px", borderRadius: "50%", border: "2px solid rgba(247,243,238,0.3)", borderTopColor: "var(--cream)", display: "inline-block" }} />
                    ) : <Send size={13} />}
                    {locale === "id" ? "Kirim Ulasan" : "Submit Review"}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)}
                    style={{ padding: "0.75rem 1.25rem", borderRadius: "100px", background: "none", border: "1px solid var(--border)", fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "var(--muted)", cursor: "pointer" }}>
                    {locale === "id" ? "Batal" : "Cancel"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </AnimateOnScroll>
      </div>

      <style>{`@media(max-width:768px){.testi-grid{display:none !important;}.testi-mobile{display:block !important;}}`}</style>
    </section>
  );
}
