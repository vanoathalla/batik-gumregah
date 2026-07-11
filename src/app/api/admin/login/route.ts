import { NextRequest, NextResponse } from "next/server";
import { checkAdminPassword } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (!password) return NextResponse.json({ error: "Password required" }, { status: 400 });
  if (checkAdminPassword(password)) {
    return NextResponse.json({ success: true, token: password });
  }
  return NextResponse.json({ error: "Wrong password" }, { status: 401 });
}
