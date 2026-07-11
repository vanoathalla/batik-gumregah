import { NextRequest, NextResponse } from "next/server";
import { getApprovedTestimonials, getAllTestimonials, addTestimonial } from "@/lib/db";
import { COUNTRY_FLAGS } from "@/lib/store";

// GET — public: semua testimoni (langsung tampil tanpa approve)
export async function GET() {
  const data = getAllTestimonials();
  return NextResponse.json(data);
}

// POST — user submit langsung masuk, approved: true otomatis
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, country, rating, text } = body;

  if (!name?.trim() || !text?.trim() || !rating) {
    return NextResponse.json({ error: "Nama, rating, dan pesan wajib diisi." }, { status: 400 });
  }
  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating harus antara 1-5." }, { status: 400 });
  }
  if (text.trim().length < 5) {
    return NextResponse.json({ error: "Pesan terlalu pendek." }, { status: 400 });
  }

  const flag = COUNTRY_FLAGS[country] ?? "🌍";
  const item = addTestimonial({
    name: name.trim().slice(0, 80),
    country: (country ?? "Other").slice(0, 40),
    flag,
    rating,
    text: text.trim().slice(0, 500),
  });

  return NextResponse.json({ success: true, id: item.id }, { status: 201 });
}
