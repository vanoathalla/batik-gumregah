/**
 * Simple file-based store using Next.js API routes.
 * Data disimpan di /data/*.json — tidak butuh database.
 */

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  flag: string;
  rating: number;
  text: string;          // user always submits in their language
  approved: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  category: string;
  motif: string;
  nameId: string;
  nameEn: string;
  descId: string;
  descEn: string;
  price: number;
  sizes: string;         // comma-separated
  materialId: string;
  materialEn: string;
  estimasiId: string;
  estimasiEn: string;
  careId: string;
  careEn: string;
  featured: boolean;
  createdAt: string;
}

export interface Artisan {
  id: string;
  name: string;
  experience: number;
  specialtyId: string;
  specialtyEn: string;
  quoteId: string;
  quoteEn: string;
  createdAt: string;
}

export const COUNTRY_FLAGS: Record<string, string> = {
  Indonesia: "🇮🇩",
  Malaysia: "🇲🇾",
  Singapore: "🇸🇬",
  Australia: "🇦🇺",
  Japan: "🇯🇵",
  USA: "🇺🇸",
  UK: "🇬🇧",
  Netherlands: "🇳🇱",
  Germany: "🇩🇪",
  Other: "🌍",
};

export const CATEGORIES = ["Batik Tulis", "Batik Cap", "Fashion", "Accessories", "Souvenir"];
