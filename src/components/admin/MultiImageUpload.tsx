"use client";

import { useRef, useState } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import { Upload, X } from "lucide-react";
import { resizeImage } from "@/lib/imageResize";

interface Props {
  folder: string;
  values: string[];
  onChange: (urls: string[]) => void;
  max?: number;
  label?: string;
}

export default function MultiImageUpload({ folder, values, onChange, max = 5, label = "Foto" }: Props) {
  const { apiFetch } = useAdmin();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  const uploadFile = async (file: File): Promise<{ url: string | null; error?: string }> => {
    try {
      // Resize before upload
      const compressed = await resizeImage(file, 1200, 0.82);

      const form = new FormData();
      form.append("file", compressed);
      form.append("folder", folder);
      const res = await apiFetch("/api/admin/upload", { method: "POST", body: form, headers: {} });
      const data = await res.json();
      if (!res.ok) return { url: null, error: data.error || "Gagal mengunggah foto." };
      return { url: data.url };
    } catch {
      return { url: null, error: "Kesalahan jaringan saat mengunggah foto." };
    }
  };

  const handleFiles = async (files: FileList) => {
    if (values.length >= max) return;
    setErr("");
    setUploading(true);
    const results: string[] = [];
    let uploadError = "";

    for (const file of Array.from(files).slice(0, max - values.length)) {
      const res = await uploadFile(file);
      if (res.url) {
        results.push(res.url);
      } else if (res.error) {
        uploadError = res.error;
      }
    }

    if (uploadError) setErr(uploadError);
    onChange([...values, ...results]);
    setUploading(false);
  };

  const remove = (idx: number) => onChange(values.filter((_, i) => i !== idx));

  return (
    <div>
      {label && (
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.75rem", color: "#9A8070", marginBottom: "0.5rem" }}>
          {label} ({values.length}/{max})
        </p>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {values.map((url, idx) => (
          <div key={url} style={{ position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={`img-${idx}`} style={{ width: "80px", height: "70px", objectFit: "cover", borderRadius: "8px", border: "1px solid rgba(184,150,96,0.25)", display: "block" }} />
            <button type="button" onClick={() => remove(idx)}
              style={{ position: "absolute", top: "3px", right: "3px", width: "18px", height: "18px", borderRadius: "50%", background: "rgba(20,12,6,0.7)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
              <X size={9} />
            </button>
          </div>
        ))}

        {values.length < max && (
          <div
            onClick={() => !uploading && inputRef.current?.click()}
            onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
            onDragOver={(e) => e.preventDefault()}
            style={{ width: "80px", height: "70px", borderRadius: "8px", border: "1px dashed rgba(184,150,96,0.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: uploading ? "not-allowed" : "pointer", gap: "3px", background: "rgba(184,150,96,0.03)", transition: "border-color .2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#B89660")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(184,150,96,0.4)")}
          >
            {uploading ? (
              <span style={{ fontSize: "9px", color: "#9A8070" }}>...</span>
            ) : (
              <>
                <Upload size={14} style={{ color: "#B89660" }} />
                <span style={{ fontSize: "9px", color: "#9A8070" }}>Tambah</span>
              </>
            )}
          </div>
        )}
      </div>

      {err && <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.7rem", color: "#A85440", marginTop: "0.35rem" }}>{err}</p>}
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(e) => e.target.files && handleFiles(e.target.files)} style={{ display: "none" }} />
    </div>
  );
}
