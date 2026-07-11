"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { useAdmin } from "@/hooks/useAdmin";
import { Check, X, Trash2, Star } from "lucide-react";
import type { Testimonial } from "@/lib/store";

export default function AdminTestimonials() {
  const { apiFetch } = useAdmin();
  const [list, setList]   = useState<Testimonial[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await apiFetch("/api/admin/testimonials");
    const data = await res.json();
    if (Array.isArray(data)) setList(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const approve = async (id: string) => {
    await apiFetch("/api/admin/testimonials", { method: "PATCH", body: JSON.stringify({ id, approved: true }) });
    load();
  };
  const reject = async (id: string) => {
    await apiFetch("/api/admin/testimonials", { method: "PATCH", body: JSON.stringify({ id, approved: false }) });
    load();
  };
  const remove = async (id: string) => {
    if (!confirm("Hapus testimoni ini?")) return;
    await apiFetch("/api/admin/testimonials", { method: "DELETE", body: JSON.stringify({ id }) });
    load();
  };

  const filtered = list.filter((t) => {
    if (filter === "pending")  return !t.approved;
    if (filter === "approved") return t.approved;
    return true;
  });

  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: "0.35rem 1rem", borderRadius: "100px",
    fontFamily: "'Poppins',sans-serif", fontSize: "0.75rem",
    background: active ? "#3D2B1F" : "transparent",
    color: active ? "#F7F3EE" : "#9A8070",
    border: active ? "1px solid #3D2B1F" : "1px solid rgba(184,150,96,0.25)",
    cursor: "pointer",
  });

  return (
    <AdminShell>
      <div style={{ maxWidth: "800px" }}>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#B89660", marginBottom: "0.5rem" }}>
          Manajemen
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 500, color: "#3D2B1F", marginBottom: "2rem" }}>
          Testimoni
        </h1>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
          {(["all","pending","approved"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={btnStyle(filter === f)}>
              {f === "all" ? `Semua (${list.length})` : f === "pending" ? `Menunggu (${list.filter(t => !t.approved).length})` : `Aktif (${list.filter(t => t.approved).length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", color: "#9A8070" }}>Memuat...</p>
        ) : filtered.length === 0 ? (
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", color: "#9A8070" }}>Tidak ada testimoni.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {filtered.map((t) => (
              <div key={t.id} style={{ paddingTop: "1.25rem", paddingBottom: "1.25rem", borderBottom: "1px solid rgba(184,150,96,0.12)" }}>
                <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: "1rem" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#3D2B1F" }}>{t.name}</span>
                      <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.72rem", color: "#B89660" }}>{t.flag} {t.country}</span>
                      <div style={{ display: "flex", gap: "2px" }}>
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} size={10} style={{ color: "#B89660", fill: "#B89660" }} />
                        ))}
                      </div>
                      <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.7rem", padding: "2px 8px", borderRadius: "100px", background: t.approved ? "rgba(93,122,82,0.12)" : "rgba(168,84,64,0.12)", color: t.approved ? "#5D7A52" : "#A85440" }}>
                        {t.approved ? "Aktif" : "Menunggu"}
                      </span>
                    </div>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "#7A6A5A", lineHeight: 1.7 }}>
                      "{t.text}"
                    </p>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.7rem", color: "#9A8070", marginTop: "0.35rem" }}>
                      {new Date(t.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                    {!t.approved && (
                      <button onClick={() => approve(t.id)} title="Approve"
                        style={{ width: "30px", height: "30px", borderRadius: "50%", border: "1px solid rgba(93,122,82,0.4)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#5D7A52" }}>
                        <Check size={13} />
                      </button>
                    )}
                    {t.approved && (
                      <button onClick={() => reject(t.id)} title="Non-aktifkan"
                        style={{ width: "30px", height: "30px", borderRadius: "50%", border: "1px solid rgba(168,84,64,0.4)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#A85440" }}>
                        <X size={13} />
                      </button>
                    )}
                    <button onClick={() => remove(t.id)} title="Hapus"
                      style={{ width: "30px", height: "30px", borderRadius: "50%", border: "1px solid rgba(184,150,96,0.2)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#9A8070" }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
