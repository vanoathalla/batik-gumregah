import { NextRequest, NextResponse } from "next/server";
import { checkAdminPassword } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body ?? {};
    if (!password || typeof password !== "string")
      return NextResponse.json({ error: "Password wajib diisi." }, { status: 400 });
    if (checkAdminPassword(password)) {
      return NextResponse.json({ success: true, token: password });
    }
    return NextResponse.json({ error: "Password salah." }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Request tidak valid." }, { status: 400 });
  }
}
