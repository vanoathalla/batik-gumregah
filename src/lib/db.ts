/**
 * File-based database using JSON files in /data/
 * Works in Next.js server components and API routes.
 */

import fs from "fs";
import path from "path";
import type { Testimonial, Product, Artisan } from "./store";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readFile<T>(filename: string, fallback: T): T {
  ensureDir();
  const file = path.join(DATA_DIR, filename);
  if (!fs.existsSync(file)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

function writeFile(filename: string, data: unknown) {
  ensureDir();
  fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2), "utf-8");
}

// ── Testimonials ──────────────────────────────────────
export function getTestimonials(): Testimonial[] {
  return readFile<Testimonial[]>("testimonials.json", []);
}

export function getApprovedTestimonials(): Testimonial[] {
  return getTestimonials().filter((t) => t.approved);
}

export function addTestimonial(data: Omit<Testimonial, "id" | "approved" | "createdAt">): Testimonial {
  const all = getTestimonials();
  const item: Testimonial = {
    ...data,
    id: Date.now().toString(),
    approved: false,
    createdAt: new Date().toISOString(),
  };
  all.push(item);
  writeFile("testimonials.json", all);
  return item;
}

export function updateTestimonial(id: string, patch: Partial<Testimonial>) {
  const all = getTestimonials().map((t) => (t.id === id ? { ...t, ...patch } : t));
  writeFile("testimonials.json", all);
}

export function deleteTestimonial(id: string) {
  writeFile("testimonials.json", getTestimonials().filter((t) => t.id !== id));
}

// ── Products ─────────────────────────────────────────
export function getProducts(): Product[] {
  return readFile<Product[]>("products.json", []);
}

export function addProduct(data: Omit<Product, "id" | "createdAt">): Product {
  const all = getProducts();
  const item: Product = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() };
  all.push(item);
  writeFile("products.json", all);
  return item;
}

export function updateProduct(id: string, patch: Partial<Product>) {
  const all = getProducts().map((p) => (p.id === id ? { ...p, ...patch } : p));
  writeFile("products.json", all);
}

export function deleteProduct(id: string) {
  writeFile("products.json", getProducts().filter((p) => p.id !== id));
}

// ── Artisans ─────────────────────────────────────────
export function getArtisans(): Artisan[] {
  return readFile<Artisan[]>("artisans.json", []);
}

export function addArtisan(data: Omit<Artisan, "id" | "createdAt">): Artisan {
  const all = getArtisans();
  const item: Artisan = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() };
  all.push(item);
  writeFile("artisans.json", all);
  return item;
}

export function updateArtisan(id: string, patch: Partial<Artisan>) {
  const all = getArtisans().map((a) => (a.id === id ? { ...a, ...patch } : a));
  writeFile("artisans.json", all);
}

export function deleteArtisan(id: string) {
  writeFile("artisans.json", getArtisans().filter((a) => a.id !== id));
}

// ── Admin auth (simple password) ─────────────────────
export function checkAdminPassword(password: string): boolean {
  const correct = process.env.ADMIN_PASSWORD ?? "admin123";
  return password === correct;
}
