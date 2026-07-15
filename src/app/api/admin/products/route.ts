import { NextRequest, NextResponse } from "next/server";
import { getProducts, addProduct, updateProduct, deleteProduct } from "@/lib/db";

function auth(req: NextRequest) {
  return req.headers.get("x-admin-token") === (process.env.ADMIN_PASSWORD ?? "admin123");
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json(await getProducts());
  } catch (e) {
    console.error("GET /api/admin/products error:", e);
    return NextResponse.json({ error: "Gagal memuat produk." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    if (!body?.nameId?.trim() && !body?.nameEn?.trim())
      return NextResponse.json({ error: "Nama produk wajib diisi." }, { status: 400 });
    if (body.price !== undefined && (typeof body.price !== "number" || body.price < 0))
      return NextResponse.json({ error: "Harga tidak valid." }, { status: 400 });
    const item = await addProduct(body);
    return NextResponse.json(item, { status: 201 });
  } catch (e) {
    console.error("POST /api/admin/products error:", e);
    return NextResponse.json({ error: "Gagal menyimpan produk." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const { id, ...patch } = body ?? {};
    if (!id || typeof id !== "string")
      return NextResponse.json({ error: "ID produk tidak valid." }, { status: 400 });
    await updateProduct(id, patch);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("PATCH /api/admin/products error:", e);
    return NextResponse.json({ error: "Gagal memperbarui produk." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const { id } = body ?? {};
    if (!id || typeof id !== "string")
      return NextResponse.json({ error: "ID produk tidak valid." }, { status: 400 });
    await deleteProduct(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DELETE /api/admin/products error:", e);
    return NextResponse.json({ error: "Gagal menghapus produk." }, { status: 500 });
  }
}
