"use client";

import { useEffect, useRef, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { useAdmin } from "@/hooks/useAdmin";
import { Upload, Trash2, X } from "lucide-react";
import type { GalleryItem } from "@/lib/store";

const CATS: GalleryItem["category"][] = ["process", "exhibition", "artisan", "product", "workshop"];
const CAT_LABELS: Record<GalleryItem["category"], string> = {
  process: "Proses", exhibition: "Pameran", artisan: "Pengrajin",
  product: "Produk", workshop: "Workshop",
};

export default function AdminGallery() {
  const { apiFetch } = useAdmin();
  const [list, setList]     = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState<"all" | GalleryItem["category"]>("all");
  const [err, setErr]       = useState("");

  // form state for new item
  const [captionId, setCaptionId] = useState("");
  const [captionEn, setCaptionEn] = useState("");
  const [category, setCategory]   = useState<GalleryItem["category"]>("product");
  const inputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const res  = await apiFetch("/api/admin/gallery");
    const data = await res.json();
    if (Array.isArray(data)) setList(data.sort((a: GalleryItem, b: GalleryItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleFiles = async (files: FileList) => {
    setErr("");
    setUploading(true);
    let successCount = 0;
    let failCount = 0;
    let lastError = "";

    for (const file of Array.from(files)) {
      try {
        const form = new FormData();
        form.append("file", file);
        form.append("folder", "gallery");
        const uploadRes = await apiFetch("/api/admin/upload", { method: "POST", body: form, headers: {} });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          lastError = uploadData.error ?? "Upload gambar gagal";
          failCount++;
          continue;
        }

        const res = await apiFetch("/api/admin/gallery", {
          method: "POST",
          body: JSON.stringify({ url: uploadData.url, captionId, captionEn, category }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          lastError = errData.error ?? "Gagal menyimpan foto ke database";
          failCount++;
        } else {
          successCount++;
        }
      } catch {
        lastError = "Kesalahan jaringan.";
        failCount++;
      }
    }
    
    if (failCount > 0) {
      alert(`Berhasil mengunggah ${successCount} foto. Gagal ${failCount} foto. Error: ${lastError}`);
    }

    setUploading(false);
    setCaptionId(""); setCaptionEn("");
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Hapus foto ini?")) return;
    try {
      const res = await apiFetch("/api/admin/gallery", { method: "DELETE", body: JSON.stringify({ id }) });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        alert(`Gagal menghapus foto: ${errorData.error || res.statusText || "Terjadi kesalahan"}`);
      } else {
        load();
      }
    } catch {
      alert("Gagal menghubungi server.");
    }
  };

  const filtered = filter === "all" ? list : list.filter((g) => g.category === filter);

  const inp: React.CSSProperties = {
    flex: 1, padding: "0.6rem 0.85rem", borderRadius: "8px",
    border: "1px solid rgba(184,150,96,0.25)", background: "#fff",
    fontFamily: "'Poppins',sans-serif", fontSize: "0.78rem", color: "#3D2B1F", outline: "none",
  };

  return (
    <AdminShell>
      <div style={{ maxWidth: "960px" }}>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#B89660", marginBottom: "0.5rem" }}>Manajemen</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 500, color: "#3D2B1F", marginBottom: "2rem" }}>Galeri Foto</h1>

        {/* Upload form */}
        <div style={{ background: "#fff", borderRadius: "14px", padding: "1.5rem", border: "1px solid rgba(184,150,96,0.2)", marginBottom: "2rem" }}>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "#3D2B1F", marginBottom: "1rem" }}>
            Upload Foto Baru
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
            <input placeholder="Keterangan (Indonesia)" value={captionId}
              onChange={(e) => setCaptionId(e.target.value)} style={inp}
              onFocus={(e) => (e.target.style.borderColor = "#B89660")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(184,150,96,0.25)")}
            />
            <input placeholder="Caption (English)" value={captionEn}
              onChange={(e) => setCaptionEn(e.target.value)} style={inp}
              onFocus={(e) => (e.target.style.borderColor = "#B89660")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(184,150,96,0.25)")}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value as GalleryItem["category"])}
              style={{ ...inp, flex: "none", width: "140px", cursor: "pointer" }}>
              {CATS.map((c) => <option key={c} value={c}>{CAT_LABELS[c]}</option>)}
            </select>
          </div>

          <div
            onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => !uploading && inputRef.current?.click()}
            style={{ border: "1px dashed rgba(184,150,96,0.4)", borderRadius: "10px", padding: "2rem", textAlign: "center", cursor: uploading ? "not-allowed" : "pointer", opacity: uploading ? 0.6 : 1, transition: "border-color .2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#B89660")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(184,150,96,0.4)")}
          >
            <Upload size={20} style={{ color: "#B89660", margin: "0 auto 0.5rem" }} />
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "#9A8070" }}>
              {uploading ? "Mengupload..." : "Klik atau drag foto ke sini (bisa multiple)"}
            </p>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.7rem", color: "#B8A898", marginTop: "0.25rem" }}>JPG, PNG, WebP · Maks 5MB per file</p>
          </div>
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple
            onChange={(e) => e.target.files && handleFiles(e.target.files)} style={{ display: "none" }} />
          {err && <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.72rem", color: "#A85440", marginTop: "0.5rem" }}>{err}</p>}
        </div>

        {/* Filter */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {(["all", ...CATS] as const).map((f) => {
            const active = filter === f;
            const count = f === "all" ? list.length : list.filter((g) => g.category === f).length;
            return (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding: "0.3rem 0.9rem", borderRadius: "100px", fontFamily: "'Poppins',sans-serif", fontSize: "0.72rem", background: active ? "#3D2B1F" : "transparent", color: active ? "#F7F3EE" : "#9A8070", border: active ? "1px solid #3D2B1F" : "1px solid rgba(184,150,96,0.25)", cursor: "pointer" }}>
                {f === "all" ? `Semua (${count})` : `${CAT_LABELS[f as GalleryItem["category"]]} (${count})`}
              </button>
            );
          })}
        </div>

        {/* Gallery grid */}
        {loading ? (
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", color: "#9A8070" }}>Memuat...</p>
        ) : filtered.length === 0 ? (
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", color: "#9A8070" }}>Belum ada foto.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem" }}
            className="gallery-admin-grid">
            {filtered.map((item) => (
              <div key={item.id} style={{ position: "relative", borderRadius: "10px", overflow: "hidden", aspectRatio: "1", background: "#EEE8DF" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt={item.captionId}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                {/* Overlay */}
                <div style={{ position: "absolute", inset: 0, background: "rgba(20,12,6,0)", transition: "background .2s", display: "flex", alignItems: "flex-end" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "rgba(20,12,6,0.5)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = "rgba(20,12,6,0)")}>
                  <div style={{ padding: "0.5rem 0.6rem", width: "100%" }}>
                    {item.captionId && (
                      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "9px", color: "rgba(255,255,255,0.8)", lineHeight: 1.3 }}>
                        {item.captionId}
                      </p>
                    )}
                  </div>
                  {/* Category badge */}
                  <div style={{ position: "absolute", top: "6px", left: "6px" }}>
                    <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "8px", background: "rgba(184,150,96,0.9)", color: "#1E1208", padding: "2px 6px", borderRadius: "100px" }}>
                      {CAT_LABELS[item.category]}
                    </span>
                  </div>
                  {/* Delete */}
                  <button onClick={() => remove(item.id)}
                    style={{ position: "absolute", top: "6px", right: "6px", width: "22px", height: "22px", borderRadius: "50%", background: "rgba(168,84,64,0.85)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                    <Trash2 size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`@media(max-width:768px){.gallery-admin-grid{grid-template-columns:repeat(2,1fr) !important;}}`}</style>
    </AdminShell>
  );
}
