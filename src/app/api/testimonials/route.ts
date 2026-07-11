import { NextRequest, NextResponse } from "next/server";
import { getApprovedTestimonials, addTestimonial } from "@/lib/db";
import { COUNTRY_FLAGS } from "@/lib/store";

// GET — public: hanya yang sudah approved
export async function GET() {
  const data = getApprovedTestimonials();
  return NextResponse.json(data);
}

// POST — user submit testimoni baru (pending approval)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, country, rating, text } = body;

  if (!name?.trim() || !text?.trim() || !rating) {
    return NextResponse.json({ error: "Name, rating, and message are required." }, { status: 400 });
  }
  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be between 1 and 5." }, { status: 400 });
  }
  if (text.trim().length < 10) {
    return NextResponse.json({ error: "Message too short." }, { status: 400 });
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
