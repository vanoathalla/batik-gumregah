"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import MultiImageUpload from "@/components/admin/MultiImageUpload";
import { useAdmin } from "@/hooks/useAdmin";
import { Plus, Trash2, Pencil, X, Check } from "lucide-react";
import type { Product } from "@/lib/store";
import { CATEGORIES } from "@/lib/store";

const EMPTY: Omit<Product, "id" | "createdAt"> = {
  category: "Batik Tulis", motif: "", nameId: "", nameEn: "",
  descId: "", descEn: "", price: 0, sizes: "", materialId: "", materialEn: "",
  estimasiId: "", estimasiEn: "", careId: "", careEn: "", featured: false, images: [],
};

const fmt = (n: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

export default function AdminProducts() {
  const { apiFetch } = useAdmin();
  const [list, setList]     = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm]     = useState<Omit<Product, "id" | "createdAt">>(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const res  = await apiFetch("/api/admin/products");
    const data = await res.json();
    if (Array.isArray(data)) setList(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew  = () => { setEditing(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (p: Product) => { setEditing(p); setForm({ ...p }); setShowForm(true); };

  const save = async () => {
    if (!form.nameId && !form.nameEn) return alert("Nama produk wajib diisi.");
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

  const field = (placeholder: string, key: keyof Omit<Product,"id"|"createdAt"|"featured"|"images">, type = "text") => (
    <input type={type} placeholder={placeholder}
      value={form[key] as string | number}
      onChange={(e) => setForm({ ...form, [key]: type === "number" ? Number(e.target.value) : e.target.value })}
      style={inp}
      onFocus={(e) => (e.target.style.borderColor = "#B89660")}
      onBlur={(e) => (e.target.style.borderColor = "rgba(184,150,96,0.25)")}
    />
  );

  const inp: React.CSSProperties = {
    width: "100%", padding: "0.65rem 0.85rem", borderRadius: "8px",
    border: "1px solid rgba(184,150,96,0.25)", background: "#fff",
    fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "#3D2B1F", outline: "none",
  };

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
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", color: "#9A8070" }}>
            Belum ada produk. Klik "Tambah Produk" untuk mulai.
          </p>
        ) : (
          <div>
            {list.map((p) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "1rem", paddingTop: "1rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(184,150,96,0.12)" }}>
                {/* Thumbnail */}
                <div style={{ width: "56px", height: "48px", borderRadius: "8px", overflow: "hidden", flexShrink: 0, background: "#EEE8DF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {p.images?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.images[0]} alt={p.nameId} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontSize: "9px", color: "#B8A898" }}>No img</span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#3D2B1F" }}>{p.nameId || p.nameEn}</p>
                    <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.7rem", color: "#B89660" }}>{p.category}</span>
                    {p.featured && <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.7rem", color: "#5D7A52", background: "rgba(93,122,82,0.1)", padding: "1px 7px", borderRadius: "100px" }}>Featured</span>}
                  </div>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.75rem", color: "#9A8070", marginTop: "0.15rem" }}>{fmt(p.price)} · {p.images?.length ?? 0} foto</p>
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
            style={{ background: "#F7F3EE", borderRadius: "16px", width: "100%", maxWidth: "580px", maxHeight: "90vh", overflowY: "auto", padding: "2rem", animation: "fadeUp .3s ease-out both" }}>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 600, color: "#3D2B1F" }}>
                {editing ? "Edit Produk" : "Tambah Produk"}
              </p>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9A8070" }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>

              {/* Upload foto */}
              <MultiImageUpload
                folder="products"
                values={form.images ?? []}
                onChange={(urls) => setForm({ ...form, images: urls })}
                label="Foto Produk (maks 5)"
                max={5}
              />

              {/* Category */}
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                style={{ ...inp, cursor: "pointer" }}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {field("Nama (Indonesia) *", "nameId")}
                {field("Name (English)", "nameEn")}
              </div>
              {field("Motif", "motif")}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {field("Deskripsi (ID)", "descId")}
                {field("Description (EN)", "descEn")}
              </div>
              {field("Harga (Rp)", "price", "number")}
              {field("Ukuran (pisah koma, cth: S, M, L atau 2.4mx1.1m)", "sizes")}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {field("Material (ID)", "materialId")}
                {field("Material (EN)", "materialEn")}
                {field("Estimasi (ID, cth: 7-14 hari)", "estimasiId")}
                {field("Estimation (EN)", "estimasiEn")}
                {field("Cara Perawatan (ID)", "careId")}
                {field("Care Instructions (EN)", "careEn")}
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
