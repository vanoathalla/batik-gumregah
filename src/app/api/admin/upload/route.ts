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

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });
    
    const fileType = (file.type || "").toLowerCase();
    if (!ALLOWED.includes(fileType))
      return NextResponse.json({ error: "Hanya JPG, PNG, WebP yang diizinkan." }, { status: 400 });
    // No size limit — client already resized before upload

    const ext      = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const hasVercelBlob = process.env.BLOB_READ_WRITE_TOKEN && process.env.BLOB_READ_WRITE_TOKEN !== "placeholder";

    let url = "";

    if (hasVercelBlob) {
      try {
        const folder = (form.get("folder") as string) || "uploads";
        const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2,7)}.${ext}`;
        const blob = await put(filename, file, {
          access: "public",
          contentType: file.type,
        });
        url = blob.url;
      } catch (blobError) {
        console.warn("Vercel Blob upload failed, falling back to base64:", blobError);
        // Fallback to base64 if Vercel Blob fails
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString("base64");
        url = `data:${file.type};base64,${base64}`;
      }
    } else {
      // Base64 upload fallback (works on both local development & Vercel serverless)
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString("base64");
      url = `data:${file.type};base64,${base64}`;
    }

    return NextResponse.json({ success: true, url }, { status: 201 });
  } catch (e) {
    console.error("Upload error:", e);
    const errMsg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: `Upload failed: ${errMsg}` }, { status: 500 });
  }
}
