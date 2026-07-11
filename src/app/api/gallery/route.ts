import { NextResponse } from "next/server";
import { getGallery } from "@/lib/db";

export async function GET() {
  return NextResponse.json(await getGallery());
}
