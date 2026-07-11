"use client";

import { useAdmin } from "@/hooks/useAdmin";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard, MessageSquare, ShoppingBag, Users,
  LogOut, Menu, X, ExternalLink, Image
} from "lucide-react";

const NAV = [
  { href: "/admin/dashboard",    label: "Dashboard",    icon: LayoutDashboard },
  { href: "/admin/testimonials", label: "Testimoni",    icon: MessageSquare   },
  { href: "/admin/products",     label: "Produk",       icon: ShoppingBag     },
  { href: "/admin/artisans",     label: "Pengrajin",    icon: Users           },
  { href: "/admin/gallery",      label: "Galeri",       icon: Image           },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, checking, logout } = useAdmin();
  const router   = useRouter();
  const pathname = usePathname();
  const [sideOpen, setSideOpen] = useState(false);

  useEffect(() => {
    if (!checking && !isLoggedIn) router.replace("/admin/login");
  }, [checking, isLoggedIn, router]);

  if (checking || !isLoggedIn) return null;

  const s = {
    sidebar: {
      position: "fixed" as const,
      top: 0, left: 0, bottom: 0,
      width: "220px",
      background: "#211610",
      display: "flex", flexDirection: "column" as const,
      padding: "1.5rem 0",
      zIndex: 40,
    },
    link: (active: boolean): React.CSSProperties => ({
      display: "flex", alignItems: "center", gap: "10px",
      padding: "0.65rem 1.5rem",
      fontFamily: "'Poppins',sans-serif", fontSize: "0.82rem",
      color: active ? "#B89660" : "#7A6A5A",
      background: active ? "rgba(184,150,96,0.08)" : "none",
      border: "none", cursor: "pointer", textDecoration: "none",
      width: "100%", textAlign: "left",
      borderLeft: active ? "2px solid #B89660" : "2px solid transparent",
      transition: "all .15s",
    }),
  };

  return (
    <>
      {/* Sidebar desktop */}
      <aside style={s.sidebar} className="admin-sidebar">
        <div style={{ padding: "0 1.5rem 1.5rem", borderBottom: "1px solid rgba(184,150,96,0.12)" }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 600, color: "#E8DDD0" }}>
            Batik Gumregah
          </p>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#B89660", marginTop: "2px" }}>
            Admin Panel
          </p>
        </div>

        <nav style={{ flex: 1, marginTop: "1rem" }}>
          {NAV.map(({ href, label, icon: Icon }) => (
            <button key={href} onClick={() => { router.push(href); setSideOpen(false); }}
              style={s.link(pathname === href)}>
              <Icon size={15} />
              {label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid rgba(184,150,96,0.12)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <button onClick={() => window.open("/", "_blank")}
            style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontSize: "0.75rem", color: "#7A6A5A", padding: 0 }}>
            <ExternalLink size={13} /> Lihat Website
          </button>
          <button onClick={() => { logout(); router.replace("/admin/login"); }}
            style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontSize: "0.75rem", color: "#7A6A5A", padding: 0 }}>
            <LogOut size={13} /> Keluar
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="admin-topbar" style={{ display: "none", position: "fixed", top: 0, left: 0, right: 0, height: "52px", background: "#211610", alignItems: "center", justifyContent: "space-between", padding: "0 1.25rem", zIndex: 40 }}>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", fontWeight: 600, color: "#E8DDD0" }}>
          Admin
        </p>
        <button onClick={() => setSideOpen(!sideOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#B89660" }}>
          {sideOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile slide drawer */}
      {sideOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 39 }}>
          <div onClick={() => setSideOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
          <aside style={{ ...s.sidebar, width: "200px" }}>
            <nav style={{ flex: 1, marginTop: "3.5rem" }}>
              {NAV.map(({ href, label, icon: Icon }) => (
                <button key={href} onClick={() => { router.push(href); setSideOpen(false); }}
                  style={s.link(pathname === href)}>
                  <Icon size={15} /> {label}
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main style={{ marginLeft: "220px", minHeight: "100vh", background: "#F7F3EE", padding: "2.5rem 2rem" }}
        className="admin-main">
        {children}
      </main>

      <style>{`
        @media(max-width:768px){
          .admin-sidebar{display:none !important;}
          .admin-topbar{display:flex !important;}
          .admin-main{margin-left:0 !important; padding-top:4rem !important;}
        }
      `}</style>
    </>
  );
}
