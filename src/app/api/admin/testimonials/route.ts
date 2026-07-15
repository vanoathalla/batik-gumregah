import { NextRequest, NextResponse } from "next/server";
import { getAllTestimonials, deleteTestimonial } from "@/lib/db";

function auth(req: NextRequest) {
  return req.headers.get("x-admin-token") === (process.env.ADMIN_PASSWORD ?? "admin123");
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json(await getAllTestimonials());
  } catch (e) {
    console.error("GET /api/admin/testimonials error:", e);
    return NextResponse.json({ error: "Gagal memuat testimoni." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const { id } = body ?? {};
    if (!id || typeof id !== "string")
      return NextResponse.json({ error: "ID testimoni tidak valid." }, { status: 400 });
    await deleteTestimonial(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DELETE /api/admin/testimonials error:", e);
    return NextResponse.json({ error: "Gagal menghapus testimoni." }, { status: 500 });
  }
}
