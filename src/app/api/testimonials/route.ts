export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { getAllTestimonials, addTestimonial } from "@/lib/db";
import { COUNTRY_FLAGS } from "@/lib/store";

export async function GET() {
  try {
    const data = await getAllTestimonials();
    return NextResponse.json(data);
  } catch (e) {
    console.error("GET /api/testimonials error:", e);
    return NextResponse.json({ error: "Gagal memuat testimoni." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, country, rating, text } = body;

    if (!name?.trim() || !text?.trim() || !rating)
      return NextResponse.json({ error: "Nama, rating, dan pesan wajib diisi." }, { status: 400 });
    if (typeof rating !== "number" || rating < 1 || rating > 5)
      return NextResponse.json({ error: "Rating harus 1-5." }, { status: 400 });
    if (text.trim().length < 5)
      return NextResponse.json({ error: "Pesan terlalu pendek." }, { status: 400 });

    const flag = COUNTRY_FLAGS[country] ?? "🌍";
    const item = await addTestimonial({
      name: name.trim().slice(0, 80),
      country: (country ?? "Other").slice(0, 40),
      flag, rating,
      text: text.trim().slice(0, 500),
    });
    return NextResponse.json({ success: true, id: item.id }, { status: 201 });
  } catch (e) {
    console.error("POST /api/testimonials error:", e);
    return NextResponse.json({ error: "Gagal menyimpan ulasan. Coba lagi." }, { status: 500 });
  }
}
