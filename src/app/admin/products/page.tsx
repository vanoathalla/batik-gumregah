"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { useAdmin } from "@/hooks/useAdmin";
import { Plus, Trash2, Pencil, X, Check } from "lucide-react";
import type { Product } from "@/lib/store";
import { CATEGORIES } from "@/lib/store";

const EMPTY: Omit<Product, "id" | "createdAt"> = {
  category: "Batik Tulis", motif: "", nameId: "", nameEn: "",
  descId: "", descEn: "", price: 0, sizes: "", materialId: "", materialEn: "",
  estimasiId: "", estimasiEn: "", careId: "", careEn: "", featured: false,
};

const fmt = (n: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

export default function AdminProducts() {
  const { apiFetch } = useAdmin();
  const [list, setList]   = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm]   = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await apiFetch("/api/admin/products");
    const data = await res.json();
    if (Array.isArray(data)) setList(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew  = () => { setEditing(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (p: Product) => { setEditing(p); setForm({ ...p }); setShowForm(true); };

  const save = async () => {
    setSaving(true);
    if (editing) {
      await apiFetch("/api/admin/products", { method: "PATCH", body: JSON.stringify({ id: editing.id, ...form }) });
    } else {
      await apiFetch("/api/admin/products", { method: "POST", body: JSON.stringify(form) });
    }
    setSaving(false);
    setShowForm(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Hapus produk ini?")) return;
    await apiFetch("/api/admin/products", { method: "DELETE", body: JSON.stringify({ id }) });
    load();
  };

  const inp = (placeholder: string, key: keyof typeof EMPTY, type = "text"): React.ReactNode => (
    <input
      type={type}
      placeholder={placeholder}
      value={form[key] as string | number}
      onChange={(e) => setForm({ ...form, [key]: type === "number" ? Number(e.target.value) : e.target.value })}
      style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "8px", border: "1px solid rgba(184,150,96,0.25)", background: "#fff", fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "#3D2B1F", outline: "none" }}
      onFocus={(e) => (e.target.style.borderColor = "#B89660")}
      onBlur={(e) => (e.target.style.borderColor = "rgba(184,150,96,0.25)")}
    />
  );

  return (
    <AdminShell>
      <div style={{ maxWidth: "900px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
          <div>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#B89660", marginBottom: "0.5rem" }}>Manajemen</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 500, color: "#3D2B1F" }}>Produk</h1>
          </div>
          <button onClick={openNew}
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0.65rem 1.25rem", borderRadius: "100px", background: "#3D2B1F", color: "#F7F3EE", fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", fontWeight: 600, border: "none", cursor: "pointer" }}>
            <Plus size={14} /> Tambah Produk
          </button>
        </div>

        {loading ? (
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", color: "#9A8070" }}>Memuat...</p>
        ) : list.length === 0 ? (
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", color: "#9A8070", paddingBottom: "2rem", borderBottom: "1px solid rgba(184,150,96,0.12)" }}>
            Belum ada produk. Klik "Tambah Produk" untuk memulai.
          </p>
        ) : (
          <div>
            {list.map((p) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", paddingTop: "1rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(184,150,96,0.12)" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#3D2B1F" }}>{p.nameId || p.nameEn}</p>
                    <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.7rem", color: "#B89660" }}>{p.category}</span>
                    {p.featured && <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.7rem", color: "#5D7A52" }}>Featured</span>}
                  </div>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.78rem", color: "#9A8070", marginTop: "0.2rem" }}>{fmt(p.price)}</p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => openEdit(p)}
                    style={{ width: "30px", height: "30px", borderRadius: "50%", border: "1px solid rgba(184,150,96,0.3)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#B89660" }}>
                    <Pencil size={12} />
                  </button>
                  <button onClick={() => remove(p.id)}
                    style={{ width: "30px", height: "30px", borderRadius: "50%", border: "1px solid rgba(168,84,64,0.3)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#A85440" }}>
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <div onClick={() => setShowForm(false)}
          style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(20,12,6,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", backdropFilter: "blur(4px)" }}>
          <div onClick={(e) => e.stopPropagation()}
            style={{ background: "#F7F3EE", borderRadius: "16px", width: "100%", maxWidth: "560px", maxHeight: "88vh", overflowY: "auto", padding: "2rem", animation: "fadeUp .3s ease-out both" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 600, color: "#3D2B1F" }}>
                {editing ? "Edit Produk" : "Tambah Produk"}
              </p>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9A8070" }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {/* Category */}
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "8px", border: "1px solid rgba(184,150,96,0.25)", background: "#fff", fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "#3D2B1F", outline: "none", cursor: "pointer" }}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {inp("Nama (Indonesia) *", "nameId")}
                {inp("Name (English) *", "nameEn")}
              </div>
              {inp("Motif *", "motif")}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {inp("Deskripsi (ID)", "descId")}
                {inp("Description (EN)", "descEn")}
              </div>
              {inp("Harga (Rp) *", "price", "number")}
              {inp("Ukuran (pisah koma, cth: S, M, L)", "sizes")}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {inp("Material (ID)", "materialId")}
                {inp("Material (EN)", "materialEn")}
                {inp("Estimasi (ID, cth: 7-14 hari)", "estimasiId")}
                {inp("Estimation (EN)", "estimasiEn")}
                {inp("Perawatan (ID)", "careId")}
                {inp("Care (EN)", "careEn")}
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "#7A6A5A", cursor: "pointer" }}>
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                Tampilkan sebagai Featured
              </label>
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
