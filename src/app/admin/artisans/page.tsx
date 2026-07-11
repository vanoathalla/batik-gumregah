"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import ImageUpload from "@/components/admin/ImageUpload";
import { useAdmin } from "@/hooks/useAdmin";
import { Plus, Trash2, Pencil, X, Check } from "lucide-react";
import type { Artisan } from "@/lib/store";

const EMPTY: Omit<Artisan, "id" | "createdAt"> = {
  name: "", experience: 1, specialtyId: "", specialtyEn: "",
  quoteId: "", quoteEn: "", image: "",
};

export default function AdminArtisans() {
  const { apiFetch } = useAdmin();
  const [list, setList]     = useState<Artisan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Artisan | null>(null);
  const [form, setForm]     = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const res  = await apiFetch("/api/admin/artisans");
    const data = await res.json();
    if (Array.isArray(data)) setList(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew  = () => { setEditing(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (a: Artisan) => { setEditing(a); setForm({ ...a }); setShowForm(true); };

  const save = async () => {
    if (!form.name.trim()) return alert("Nama wajib diisi.");
    setSaving(true);
    try {
      const res = editing
        ? await apiFetch("/api/admin/artisans", { method: "PATCH", body: JSON.stringify({ id: editing.id, ...form }) })
        : await apiFetch("/api/admin/artisans", { method: "POST", body: JSON.stringify(form) });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        alert(`Gagal menyimpan pengrajin: ${errorData.error || res.statusText || "Terjadi kesalahan"}`);
      } else {
        setShowForm(false);
        load();
      }
    } catch {
      alert("Gagal menghubungi server. Periksa koneksi Anda.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Hapus pengrajin ini?")) return;
    try {
      const res = await apiFetch("/api/admin/artisans", { method: "DELETE", body: JSON.stringify({ id }) });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        alert(`Gagal menghapus pengrajin: ${errorData.error || res.statusText || "Terjadi kesalahan"}`);
      } else {
        load();
      }
    } catch {
      alert("Gagal menghubungi server.");
    }
  };

  const inp: React.CSSProperties = {
    width: "100%", padding: "0.65rem 0.85rem", borderRadius: "8px",
    border: "1px solid rgba(184,150,96,0.25)", background: "#fff",
    fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "#3D2B1F", outline: "none",
  };

  const field = (placeholder: string, key: keyof typeof EMPTY, type = "text") => (
    <input type={type} placeholder={placeholder}
      value={form[key] as string | number}
      onChange={(e) => setForm({ ...form, [key]: type === "number" ? Number(e.target.value) : e.target.value })}
      style={inp}
      onFocus={(e) => (e.target.style.borderColor = "#B89660")}
      onBlur={(e) => (e.target.style.borderColor = "rgba(184,150,96,0.25)")}
    />
  );

  return (
    <AdminShell>
      <div style={{ maxWidth: "800px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
          <div>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#B89660", marginBottom: "0.5rem" }}>Manajemen</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 500, color: "#3D2B1F" }}>Pengrajin</h1>
          </div>
          <button onClick={openNew}
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0.65rem 1.25rem", borderRadius: "100px", background: "#3D2B1F", color: "#F7F3EE", fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", fontWeight: 600, border: "none", cursor: "pointer" }}>
            <Plus size={14} /> Tambah Pengrajin
          </button>
        </div>

        {loading ? (
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", color: "#9A8070" }}>Memuat...</p>
        ) : list.length === 0 ? (
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", color: "#9A8070" }}>
            Belum ada pengrajin. Klik "Tambah Pengrajin" untuk mulai.
          </p>
        ) : (
          <div>
            {list.map((a) => (
              <div key={a.id} style={{ display: "flex", alignItems: "center", gap: "1rem", paddingTop: "1rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(184,150,96,0.12)" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, background: "#EEE8DF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {a.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={a.image} alt={a.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontSize: "9px", color: "#B8A898" }}>No img</span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#3D2B1F" }}>{a.name}</p>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.75rem", color: "#B89660", marginTop: "0.1rem" }}>
                    {a.specialtyId || a.specialtyEn} &bull; {a.experience} tahun
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => openEdit(a)}
                    style={{ width: "30px", height: "30px", borderRadius: "50%", border: "1px solid rgba(184,150,96,0.3)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#B89660" }}>
                    <Pencil size={12} />
                  </button>
                  <button onClick={() => remove(a.id)}
                    style={{ width: "30px", height: "30px", borderRadius: "50%", border: "1px solid rgba(168,84,64,0.3)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#A85440" }}>
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <div onClick={() => setShowForm(false)}
          style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(20,12,6,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", backdropFilter: "blur(4px)" }}>
          <div onClick={(e) => e.stopPropagation()}
            style={{ background: "#F7F3EE", borderRadius: "16px", width: "100%", maxWidth: "480px", maxHeight: "88vh", overflowY: "auto", padding: "2rem", animation: "fadeUp .3s ease-out both" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 600, color: "#3D2B1F" }}>
                {editing ? "Edit Pengrajin" : "Tambah Pengrajin"}
              </p>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9A8070" }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <ImageUpload
                folder="artisans"
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
                label="Foto Pengrajin"
              />
              {field("Nama Lengkap *", "name")}
              {field("Pengalaman (tahun)", "experience", "number")}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {field("Keahlian (Indonesia)", "specialtyId")}
                {field("Specialty (English)", "specialtyEn")}
                {field("Quote (Indonesia)", "quoteId")}
                {field("Quote (English)", "quoteEn")}
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              <button onClick={save} disabled={saving}
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0.75rem 1.5rem", borderRadius: "100px", background: "#3D2B1F", color: "#F7F3EE", fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", fontWeight: 600, border: "none", cursor: "pointer", opacity: saving ? 0.7 : 1 }}>
                <Check size={13} /> {saving ? "Menyimpan..." : "Simpan"}
              </button>
              <button onClick={() => setShowForm(false)}
                style={{ padding: "0.75rem 1.25rem", borderRadius: "100px", background: "none", border: "1px solid rgba(184,150,96,0.25)", fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "#9A8070", cursor: "pointer" }}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
