import { NextResponse } from "next/server";
import { getArtisans } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getArtisans());
}
