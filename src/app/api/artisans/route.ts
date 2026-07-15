export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getArtisans } from "@/lib/db";

export async function GET() {
  try {
    const data = await getArtisans();
    return NextResponse.json(data);
  } catch (e) {
    console.error("GET /api/artisans error:", e);
    return NextResponse.json({ error: "Gagal memuat data pengrajin." }, { status: 500 });
  }
}
