"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--cream)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "2rem",
    }}>
      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
        Terjadi Kesalahan
      </p>
      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 500, color: "var(--brown)", marginBottom: "1rem", lineHeight: 1.2 }}>
        Sesuatu Tidak Berjalan Semestinya
      </h2>
      <span style={{ display: "block", width: "40px", height: "1px", background: "linear-gradient(90deg,var(--gold),transparent)", margin: "0 auto 1.5rem" }} />
      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.875rem", color: "var(--muted)", marginBottom: "2.5rem", maxWidth: "400px", lineHeight: 1.8 }}>
        Coba muat ulang halaman. Jika masalah berlanjut, hubungi kami via WhatsApp.
      </p>
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
        <button
          onClick={reset}
          style={{
            padding: "0.85rem 2rem",
            borderRadius: "100px",
            background: "var(--brown)",
            color: "var(--cream)",
            fontFamily: "'Poppins',sans-serif",
            fontSize: "0.8rem",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          Coba Lagi
        </button>
        <a
          href="/"
          style={{
            padding: "0.85rem 2rem",
            borderRadius: "100px",
            background: "transparent",
            color: "var(--muted)",
            fontFamily: "'Poppins',sans-serif",
            fontSize: "0.8rem",
            border: "1px solid var(--border)",
            textDecoration: "none",
          }}
        >
          Ke Beranda
        </a>
      </div>
    </div>
  );
}
