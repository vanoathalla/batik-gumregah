import { NextRequest, NextResponse } from "next/server";
import { getArtisans, addArtisan, updateArtisan, deleteArtisan } from "@/lib/db";

function auth(req: NextRequest) {
  return req.headers.get("x-admin-token") === (process.env.ADMIN_PASSWORD ?? "admin123");
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json(await getArtisans());
  } catch (e) {
    console.error("GET /api/admin/artisans error:", e);
    return NextResponse.json({ error: "Gagal memuat data pengrajin." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    if (!body?.name?.trim())
      return NextResponse.json({ error: "Nama pengrajin wajib diisi." }, { status: 400 });
    if (body.experience !== undefined && (typeof body.experience !== "number" || body.experience < 0))
      return NextResponse.json({ error: "Pengalaman tidak valid." }, { status: 400 });
    const item = await addArtisan(body);
    return NextResponse.json(item, { status: 201 });
  } catch (e) {
    console.error("POST /api/admin/artisans error:", e);
    return NextResponse.json({ error: "Gagal menyimpan data pengrajin." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const { id, ...patch } = body ?? {};
    if (!id || typeof id !== "string")
      return NextResponse.json({ error: "ID pengrajin tidak valid." }, { status: 400 });
    await updateArtisan(id, patch);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("PATCH /api/admin/artisans error:", e);
    return NextResponse.json({ error: "Gagal memperbarui data pengrajin." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const { id } = body ?? {};
    if (!id || typeof id !== "string")
      return NextResponse.json({ error: "ID pengrajin tidak valid." }, { status: 400 });
    await deleteArtisan(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DELETE /api/admin/artisans error:", e);
    return NextResponse.json({ error: "Gagal menghapus pengrajin." }, { status: 500 });
  }
}
