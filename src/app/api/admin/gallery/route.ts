import { NextRequest, NextResponse } from "next/server";
import { getGallery, addGalleryItem, deleteGalleryItem } from "@/lib/db";

function auth(req: NextRequest) {
  return req.headers.get("x-admin-token") === (process.env.ADMIN_PASSWORD ?? "admin123");
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json(await getGallery());
  } catch (e) {
    console.error("GET /api/admin/gallery error:", e);
    return NextResponse.json({ error: "Gagal memuat galeri." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    if (!body?.url?.trim())
      return NextResponse.json({ error: "URL foto wajib diisi." }, { status: 400 });
    const validCats = ["process", "exhibition", "artisan", "product", "workshop"];
    if (body.category && !validCats.includes(body.category))
      return NextResponse.json({ error: "Kategori tidak valid." }, { status: 400 });
    const item = await addGalleryItem(body);
    return NextResponse.json(item, { status: 201 });
  } catch (e) {
    console.error("POST /api/admin/gallery error:", e);
    return NextResponse.json({ error: "Gagal menyimpan foto galeri." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const { id } = body ?? {};
    if (!id || typeof id !== "string")
      return NextResponse.json({ error: "ID foto tidak valid." }, { status: 400 });
    await deleteGalleryItem(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DELETE /api/admin/gallery error:", e);
    return NextResponse.json({ error: "Gagal menghapus foto." }, { status: 500 });
  }
}
