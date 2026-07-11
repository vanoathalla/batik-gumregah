"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { useAdmin } from "@/hooks/useAdmin";
import { MessageSquare, ShoppingBag, Users, Clock, Image } from "lucide-react";

export default function AdminDashboard() {
  const { apiFetch } = useAdmin();
  const [stats, setStats] = useState({ testimonials: 0, products: 0, artisans: 0, gallery: 0 });

  useEffect(() => {
    Promise.all([
      apiFetch("/api/admin/testimonials").then((r) => r.json()),
      apiFetch("/api/admin/products").then((r) => r.json()),
      apiFetch("/api/admin/artisans").then((r) => r.json()),
      apiFetch("/api/admin/gallery").then((r) => r.json()),
    ]).then(([testi, prod, art, gal]) => {
      setStats({
        testimonials: Array.isArray(testi) ? testi.length : 0,
        products:     Array.isArray(prod)  ? prod.length  : 0,
        artisans:     Array.isArray(art)   ? art.length   : 0,
        gallery:      Array.isArray(gal)   ? gal.length   : 0,
      });
    });
  }, [apiFetch]);

  const cards = [
    { label: "Testimoni",  value: stats.testimonials, icon: MessageSquare, color: "#B89660" },
    { label: "Produk",     value: stats.products,     icon: ShoppingBag,   color: "#5D7A52" },
    { label: "Pengrajin",  value: stats.artisans,     icon: Users,         color: "#6B4C3B" },
    { label: "Foto Galeri",value: stats.gallery,      icon: Image,         color: "#7A6A8A" },
  ];

  return (
    <AdminShell>
      <div style={{ maxWidth: "900px" }}>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#B89660", marginBottom: "0.5rem" }}>
          Overview
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 500, color: "#3D2B1F", marginBottom: "2.5rem" }}>
          Dashboard
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}
          className="stat-grid">
          {cards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} style={{ background: "#fff", borderRadius: "12px", padding: "1.25rem 1.5rem", border: "1px solid rgba(184,150,96,0.15)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.75rem", color: "#9A8070" }}>{label}</p>
                <Icon size={15} style={{ color }} />
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 600, color: "#3D2B1F", lineHeight: 1 }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "2.5rem", background: "#fff", borderRadius: "12px", padding: "1.5rem", border: "1px solid rgba(184,150,96,0.15)" }}>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "#3D2B1F", marginBottom: "1rem" }}>
            Panduan Cepat
          </p>
          {[
            { step: "01", text: "Buka menu Produk untuk menambah koleksi beserta foto" },
            { step: "02", text: "Buka menu Pengrajin untuk menambah profil dan foto pengrajin" },
            { step: "03", text: "Buka menu Galeri untuk upload foto workshop, proses, dan pameran" },
            { step: "04", text: "Buka menu Testimoni untuk melihat ulasan dari pelanggan" },
          ].map(({ step, text }) => (
            <div key={step} style={{ display: "flex", gap: "1rem", alignItems: "start", paddingBottom: "0.85rem", marginBottom: "0.85rem", borderBottom: "1px solid rgba(184,150,96,0.1)" }}>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", fontWeight: 600, color: "#B89660", flexShrink: 0 }}>{step}</span>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.8rem", color: "#7A6A5A", lineHeight: 1.6 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:768px){.stat-grid{grid-template-columns:1fr 1fr !important;}}`}</style>
    </AdminShell>
  );
}
