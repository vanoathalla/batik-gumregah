"use client";

import { useRef, useState } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface Props {
  folder: string;
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ folder, value, onChange, label = "Foto" }: Props) {
  const { apiFetch } = useAdmin();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  const handleFile = async (file: File) => {
    if (!file) return;
    setErr("");
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("folder", folder);
      const res = await apiFetch("/api/admin/upload", { method: "POST", body: form, headers: {} });
      const data = await res.json();
      if (!res.ok) { setErr(data.error ?? "Upload gagal"); return; }
      onChange(data.url);
    } catch {
      setErr("Upload gagal, coba lagi.");
    } finally {
      setUploading(false);
    }
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      {label && (
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.75rem", color: "#9A8070", marginBottom: "0.4rem" }}>
          {label}
        </p>
      )}

      {value ? (
        <div style={{ position: "relative", display: "inline-block" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="uploaded" style={{ width: "120px", height: "90px", objectFit: "cover", borderRadius: "8px", border: "1px solid rgba(184,150,96,0.25)", display: "block" }} />
          <button
            type="button"
            onClick={() => onChange("")}
            style={{ position: "absolute", top: "4px", right: "4px", width: "22px", height: "22px", borderRadius: "50%", background: "rgba(20,12,6,0.7)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}
          >
            <X size={11} />
          </button>
        </div>
      ) : (
        <div
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          style={{
            border: "1px dashed rgba(184,150,96,0.4)", borderRadius: "10px",
            padding: "1.25rem", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "0.4rem",
            cursor: uploading ? "not-allowed" : "pointer",
            background: "rgba(184,150,96,0.03)", transition: "border-color .2s",
            opacity: uploading ? 0.6 : 1,
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#B89660")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(184,150,96,0.4)")}
        >
          {uploading ? (
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.75rem", color: "#9A8070" }}>Mengupload...</span>
          ) : (
            <>
              <Upload size={18} style={{ color: "#B89660" }} />
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.72rem", color: "#9A8070", textAlign: "center" }}>
                Klik atau drag foto ke sini
              </p>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.65rem", color: "#B8A898" }}>
                JPG, PNG, WebP · Maks 5MB
              </p>
            </>
          )}
        </div>
      )}

      {err && <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.72rem", color: "#A85440", marginTop: "0.35rem" }}>{err}</p>}

      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={onInput} style={{ display: "none" }} />
    </div>
  );
}
