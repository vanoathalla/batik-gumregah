"use client";

import { useEffect, useState, useCallback } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { useAdmin } from "@/hooks/useAdmin";
import { Trash2, Star } from "lucide-react";
import type { Testimonial } from "@/lib/store";

export default function AdminTestimonials() {
  const { apiFetch } = useAdmin();
  const [list, setList]   = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res  = await apiFetch("/api/admin/testimonials");
    const data = await res.json();
    if (Array.isArray(data)) {
      setList(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
    setLoading(false);
  }, [apiFetch]);

  useEffect(() => { load(); }, [load]);

  const remove = async (id: string) => {
    if (!confirm("Hapus testimoni ini?")) return;
    await apiFetch("/api/admin/testimonials", { method: "DELETE", body: JSON.stringify({ id }) });
    load();
  };

  return (
    <AdminShell>
      <div style={{ maxWidth: "800px" }}>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#B89660", marginBottom: "0.5rem" }}>
          Manajemen
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 500, color: "#3D2B1F", marginBottom: "0.5rem" }}>
          Testimoni
        </h1>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "#9A8070", marginBottom: "2rem" }}>
          {list.length} ulasan masuk dari pelanggan. Hapus jika tidak relevan.
        </p>

        {loading ? (
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", color: "#9A8070" }}>Memuat...</p>
        ) : list.length === 0 ? (
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", color: "#9A8070" }}>
            Belum ada testimoni.
          </p>
        ) : (
          <div>
            {list.map((t) => (
              <div key={t.id} style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: "1rem", paddingTop: "1.25rem", paddingBottom: "1.25rem", borderBottom: "1px solid rgba(184,150,96,0.12)" }}>
                <div style={{ flex: 1 }}>
                  {/* Meta */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#3D2B1F" }}>
                      {t.name}
                    </span>
                    <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.72rem", color: "#B89660" }}>
                      {t.flag} {t.country}
                    </span>
                    <div style={{ display: "flex", gap: "2px" }}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={10} style={{ color: "#B89660", fill: "#B89660" }} />
                      ))}
                    </div>
                  </div>

                  {/* Text */}
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "#7A6A5A", lineHeight: 1.7 }}>
                    "{t.text}"
                  </p>

                  {/* Date */}
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.68rem", color: "#B8A898", marginTop: "0.35rem" }}>
                    {new Date(t.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>

                {/* Delete */}
                <button onClick={() => remove(t.id)} title="Hapus"
                  style={{ width: "30px", height: "30px", borderRadius: "50%", border: "1px solid rgba(168,84,64,0.3)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#A85440", flexShrink: 0 }}>
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
