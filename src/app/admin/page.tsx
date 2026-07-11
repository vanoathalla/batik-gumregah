"use client";

export default function AdminPage() {
  // Redirect ke dashboard
  if (typeof window !== "undefined") {
    window.location.href = "/admin/dashboard";
  }
  return null;
}
