/**
 * db.ts — Neon PostgreSQL database layer
 */

import { neon } from "@neondatabase/serverless";
import type { Testimonial, Product, Artisan, GalleryItem } from "./store";

function sql() {
  const url = process.env.DATABASE_URL;
  if (!url || url.includes("placeholder")) {
    throw new Error("DATABASE_URL env var not set.");
  }
  return neon(url);
}

// ── Testimonials ──────────────────────────────────────

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const rows = await sql()`
    SELECT * FROM testimonials ORDER BY created_at DESC
  `;
  return rows.map((r) => ({
    id: r.id, name: r.name, country: r.country, flag: r.flag,
    rating: r.rating, text: r.text, approved: true,
    createdAt: r.created_at,
  }));
}

export async function addTestimonial(
  input: Omit<Testimonial, "id" | "approved" | "createdAt">
): Promise<Testimonial> {
  const rows = await sql()`
    INSERT INTO testimonials (name, country, flag, rating, text)
    VALUES (${input.name}, ${input.country}, ${input.flag}, ${input.rating}, ${input.text})
    RETURNING *
  `;
  const r = rows[0];
  return { id: r.id, name: r.name, country: r.country, flag: r.flag, rating: r.rating, text: r.text, approved: true, createdAt: r.created_at };
}

export async function deleteTestimonial(id: string) {
  await sql()`DELETE FROM testimonials WHERE id = ${id}`;
}

// ── Products ─────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  const rows = await sql()`SELECT * FROM products ORDER BY created_at DESC`;
  return rows.map(mapProduct);
}

export async function addProduct(input: Omit<Product, "id" | "createdAt">): Promise<Product> {
  const rows = await sql()`
    INSERT INTO products
      (category, motif, name_id, name_en, desc_id, desc_en, price, sizes,
       material_id, material_en, estimasi_id, estimasi_en, care_id, care_en, featured, images)
    VALUES
      (${input.category}, ${input.motif}, ${input.nameId}, ${input.nameEn},
       ${input.descId}, ${input.descEn}, ${input.price}, ${input.sizes},
       ${input.materialId}, ${input.materialEn}, ${input.estimasiId}, ${input.estimasiEn},
       ${input.careId}, ${input.careEn}, ${input.featured}, ${JSON.stringify(input.images)})
    RETURNING *
  `;
  return mapProduct(rows[0]);
}

export async function updateProduct(id: string, input: Partial<Product>) {
  // Fetch current then re-insert all fields (simpler than dynamic SQL with Neon)
  const rows = await sql()`SELECT * FROM products WHERE id = ${id}`;
  if (rows.length === 0) return;
  const cur = mapProduct(rows[0]);
  const merged: Omit<Product, "id" | "createdAt"> = {
    category:   input.category   ?? cur.category,
    motif:      input.motif      ?? cur.motif,
    nameId:     input.nameId     ?? cur.nameId,
    nameEn:     input.nameEn     ?? cur.nameEn,
    descId:     input.descId     ?? cur.descId,
    descEn:     input.descEn     ?? cur.descEn,
    price:      input.price      ?? cur.price,
    sizes:      input.sizes      ?? cur.sizes,
    materialId: input.materialId ?? cur.materialId,
    materialEn: input.materialEn ?? cur.materialEn,
    estimasiId: input.estimasiId ?? cur.estimasiId,
    estimasiEn: input.estimasiEn ?? cur.estimasiEn,
    careId:     input.careId     ?? cur.careId,
    careEn:     input.careEn     ?? cur.careEn,
    featured:   input.featured   ?? cur.featured,
    images:     input.images     ?? cur.images,
  };
  await sql()`
    UPDATE products SET
      category=${merged.category}, motif=${merged.motif},
      name_id=${merged.nameId}, name_en=${merged.nameEn},
      desc_id=${merged.descId}, desc_en=${merged.descEn},
      price=${merged.price}, sizes=${merged.sizes},
      material_id=${merged.materialId}, material_en=${merged.materialEn},
      estimasi_id=${merged.estimasiId}, estimasi_en=${merged.estimasiEn},
      care_id=${merged.careId}, care_en=${merged.careEn},
      featured=${merged.featured}, images=${JSON.stringify(merged.images)}
    WHERE id=${id}
  `;
}

export async function deleteProduct(id: string) {
  await sql()`DELETE FROM products WHERE id = ${id}`;
}

function mapProduct(r: Record<string, unknown>): Product {
  let images: string[] = [];
  if (typeof r.images === "string") {
    try { images = JSON.parse(r.images); } catch { images = []; }
  } else if (Array.isArray(r.images)) {
    images = r.images as string[];
  }
  return {
    id: r.id as string, category: r.category as string, motif: r.motif as string,
    nameId: r.name_id as string, nameEn: r.name_en as string,
    descId: r.desc_id as string, descEn: r.desc_en as string,
    price: r.price as number, sizes: r.sizes as string,
    materialId: r.material_id as string, materialEn: r.material_en as string,
    estimasiId: r.estimasi_id as string, estimasiEn: r.estimasi_en as string,
    careId: r.care_id as string, careEn: r.care_en as string,
    featured: r.featured as boolean, images,
    createdAt: r.created_at as string,
  };
}

// ── Artisans ─────────────────────────────────────────

export async function getArtisans(): Promise<Artisan[]> {
  const rows = await sql()`SELECT * FROM artisans ORDER BY created_at DESC`;
  return rows.map(mapArtisan);
}

export async function addArtisan(input: Omit<Artisan, "id" | "createdAt">): Promise<Artisan> {
  const rows = await sql()`
    INSERT INTO artisans (name, experience, specialty_id, specialty_en, quote_id, quote_en, image)
    VALUES (${input.name}, ${input.experience}, ${input.specialtyId}, ${input.specialtyEn},
            ${input.quoteId}, ${input.quoteEn}, ${input.image})
    RETURNING *
  `;
  return mapArtisan(rows[0]);
}

export async function updateArtisan(id: string, input: Partial<Artisan>) {
  const rows = await sql()`SELECT * FROM artisans WHERE id = ${id}`;
  if (rows.length === 0) return;
  const cur = mapArtisan(rows[0]);
  const m = {
    name:        input.name        ?? cur.name,
    experience:  input.experience  ?? cur.experience,
    specialtyId: input.specialtyId ?? cur.specialtyId,
    specialtyEn: input.specialtyEn ?? cur.specialtyEn,
    quoteId:     input.quoteId     ?? cur.quoteId,
    quoteEn:     input.quoteEn     ?? cur.quoteEn,
    image:       input.image       ?? cur.image,
  };
  await sql()`
    UPDATE artisans SET
      name=${m.name}, experience=${m.experience},
      specialty_id=${m.specialtyId}, specialty_en=${m.specialtyEn},
      quote_id=${m.quoteId}, quote_en=${m.quoteEn}, image=${m.image}
    WHERE id=${id}
  `;
}

export async function deleteArtisan(id: string) {
  await sql()`DELETE FROM artisans WHERE id = ${id}`;
}

function mapArtisan(r: Record<string, unknown>): Artisan {
  return {
    id: r.id as string, name: r.name as string, experience: r.experience as number,
    specialtyId: r.specialty_id as string, specialtyEn: r.specialty_en as string,
    quoteId: r.quote_id as string, quoteEn: r.quote_en as string,
    image: r.image as string, createdAt: r.created_at as string,
  };
}

// ── Gallery ──────────────────────────────────────────

export async function getGallery(): Promise<GalleryItem[]> {
  const rows = await sql()`SELECT * FROM gallery ORDER BY created_at DESC`;
  return rows.map(mapGallery);
}

export async function addGalleryItem(input: Omit<GalleryItem, "id" | "createdAt">): Promise<GalleryItem> {
  const rows = await sql()`
    INSERT INTO gallery (url, caption_id, caption_en, category)
    VALUES (${input.url}, ${input.captionId}, ${input.captionEn}, ${input.category})
    RETURNING *
  `;
  return mapGallery(rows[0]);
}

export async function deleteGalleryItem(id: string) {
  await sql()`DELETE FROM gallery WHERE id = ${id}`;
}

function mapGallery(r: Record<string, unknown>): GalleryItem {
  return {
    id: r.id as string, url: r.url as string,
    captionId: r.caption_id as string, captionEn: r.caption_en as string,
    category: r.category as GalleryItem["category"],
    createdAt: r.created_at as string,
  };
}

// ── Image upload — pakai Vercel Blob atau base64 URL ──

export async function uploadImageToStorage(
  buffer: Buffer,
  filename: string,
  folder: string,
  mimetype: string
): Promise<string> {
  // Kalau ada Vercel Blob, pakai itu. Kalau tidak, simpan ke Supabase Storage.
  // Untuk sekarang pakai Vercel Blob (gratis 1GB di Vercel)
  const { put } = await import("@vercel/blob");
  const blob = await put(`${folder}/${filename}`, buffer, {
    access: "public",
    contentType: mimetype,
  });
  return blob.url;
}

// ── Admin auth ────────────────────────────────────────

export function checkAdminPassword(password: string): boolean {
  return password === (process.env.ADMIN_PASSWORD ?? "admin123");
}
