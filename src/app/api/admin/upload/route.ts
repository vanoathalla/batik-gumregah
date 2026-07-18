import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

function auth(req: NextRequest) {
  return req.headers.get("x-admin-token") === (process.env.ADMIN_PASSWORD ?? "admin123");
}

const ALLOWED = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const form   = await req.formData();
    const file   = form.get("file") as File | null;
    const folder = (form.get("folder") as string) || "uploads";

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });
    if (!ALLOWED.includes(file.type))
      return NextResponse.json({ error: "Hanya JPG, PNG, WebP yang diizinkan." }, { status: 400 });
    // No size limit — client already resized before upload

    const ext      = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2,7)}.${ext}`;

    const blob = await put(filename, file, {
      access: "public",
      contentType: file.type,
    });

    return NextResponse.json({ success: true, url: blob.url }, { status: 201 });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
