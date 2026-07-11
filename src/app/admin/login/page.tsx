"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/hooks/useAdmin";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const { login } = useAdmin();
  const router = useRouter();
  const [pw, setPw]     = useState("");
  const [err, setErr]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    const ok = await login(pw);
    setLoading(false);
    if (ok) router.replace("/admin/dashboard");
    else setErr("Password salah.");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F7F3EE" }}>
      <div style={{ width: "100%", maxWidth: "360px", padding: "0 1.5rem" }}>

        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", fontWeight: 600, color: "#3D2B1F", marginBottom: "0.25rem" }}>
            Batik Gumregah
          </p>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#B89660" }}>
            Admin Panel
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ position: "relative" }}>
            <Lock size={13} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#B89660", pointerEvents: "none" }} />
            <input
              type="password" value={pw} required
              onChange={(e) => setPw(e.target.value)}
              placeholder="Password"
              style={{ width: "100%", paddingLeft: "2.2rem", paddingRight: "1rem", paddingTop: "0.8rem", paddingBottom: "0.8rem", borderRadius: "10px", border: "1px solid rgba(184,150,96,0.25)", background: "#fff", fontFamily: "'Poppins',sans-serif", fontSize: "0.85rem", color: "#3D2B1F", outline: "none" }}
              onFocus={(e) => (e.target.style.borderColor = "#B89660")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(184,150,96,0.25)")}
            />
          </div>

          {err && (
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.75rem", color: "#A85440" }}>{err}</p>
          )}

          <button type="submit" disabled={loading}
            style={{ padding: "0.85rem", borderRadius: "10px", background: "#3D2B1F", color: "#F7F3EE", fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", fontWeight: 600, border: "none", cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </form>

        <p style={{ marginTop: "1.5rem", fontFamily: "'Poppins',sans-serif", fontSize: "0.72rem", color: "#9A8070", textAlign: "center" }}>
          Default password: <code style={{ background: "#EEE8DF", padding: "1px 6px", borderRadius: "4px", color: "#B89660" }}>admin123</code>
        </p>
      </div>
    </div>
  );
}
