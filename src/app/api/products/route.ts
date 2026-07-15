export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getProducts } from "@/lib/db";

export async function GET() {
  try {
    const data = await getProducts();
    return NextResponse.json(data);
  } catch (e) {
    console.error("GET /api/products error:", e);
    return NextResponse.json({ error: "Gagal memuat produk." }, { status: 500 });
  }
}
