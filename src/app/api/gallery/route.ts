export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getGallery } from "@/lib/db";

export async function GET() {
  try {
    const data = await getGallery();
    return NextResponse.json(data);
  } catch (e) {
    console.error("GET /api/gallery error:", e);
    return NextResponse.json({ error: "Gagal memuat galeri." }, { status: 500 });
  }
}
