import Link from "next/link";

export default function NotFound() {
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
        404
      </p>
      <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 500, color: "var(--brown)", marginBottom: "1rem", lineHeight: 1.2 }}>
        Halaman Tidak Ditemukan
      </h1>
      <span style={{ display: "block", width: "40px", height: "1px", background: "linear-gradient(90deg,var(--gold),transparent)", margin: "0 auto 1.5rem" }} />
      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.875rem", color: "var(--muted)", marginBottom: "2.5rem", maxWidth: "400px", lineHeight: 1.8 }}>
        Halaman yang kamu cari tidak ada atau sudah dipindahkan.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "0.85rem 2rem",
          borderRadius: "100px",
          background: "var(--brown)",
          color: "var(--cream)",
          fontFamily: "'Poppins',sans-serif",
          fontSize: "0.8rem",
          fontWeight: 600,
          textDecoration: "none",
          transition: "opacity .2s",
        }}
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
