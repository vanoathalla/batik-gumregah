import { NextRequest, NextResponse } from "next/server";
import { getTestimonials, updateTestimonial, deleteTestimonial } from "@/lib/db";

function auth(req: NextRequest) {
  return req.headers.get("x-admin-token") === (process.env.ADMIN_PASSWORD ?? "admin123");
}

// GET all (including pending)
export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getTestimonials());
}

// PATCH — approve/reject or edit
export async function PATCH(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...patch } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  updateTestimonial(id, patch);
  return NextResponse.json({ success: true });
}

// DELETE
export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  deleteTestimonial(id);
  return NextResponse.json({ success: true });
}
