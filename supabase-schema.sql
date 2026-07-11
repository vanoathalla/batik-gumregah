-- ============================================================
-- Batik Gumregah — Neon PostgreSQL Schema
-- Jalankan ini di Neon SQL Editor:
-- https://console.neon.tech → project → SQL Editor
-- ============================================================

-- Testimoni
CREATE TABLE IF NOT EXISTS testimonials (
  id         TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name       TEXT NOT NULL,
  country    TEXT NOT NULL DEFAULT 'Indonesia',
  flag       TEXT NOT NULL DEFAULT '🇮🇩',
  rating     INT  NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text       TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Produk
CREATE TABLE IF NOT EXISTS products (
  id           TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  category     TEXT NOT NULL DEFAULT 'Batik Tulis',
  motif        TEXT NOT NULL DEFAULT '',
  name_id      TEXT NOT NULL DEFAULT '',
  name_en      TEXT NOT NULL DEFAULT '',
  desc_id      TEXT NOT NULL DEFAULT '',
  desc_en      TEXT NOT NULL DEFAULT '',
  price        BIGINT NOT NULL DEFAULT 0,
  sizes        TEXT NOT NULL DEFAULT '',
  material_id  TEXT NOT NULL DEFAULT '',
  material_en  TEXT NOT NULL DEFAULT '',
  estimasi_id  TEXT NOT NULL DEFAULT '',
  estimasi_en  TEXT NOT NULL DEFAULT '',
  care_id      TEXT NOT NULL DEFAULT '',
  care_en      TEXT NOT NULL DEFAULT '',
  featured     BOOLEAN NOT NULL DEFAULT FALSE,
  images       JSONB NOT NULL DEFAULT '[]',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Pengrajin
CREATE TABLE IF NOT EXISTS artisans (
  id           TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name         TEXT NOT NULL,
  experience   INT  NOT NULL DEFAULT 1,
  specialty_id TEXT NOT NULL DEFAULT '',
  specialty_en TEXT NOT NULL DEFAULT '',
  quote_id     TEXT NOT NULL DEFAULT '',
  quote_en     TEXT NOT NULL DEFAULT '',
  image        TEXT NOT NULL DEFAULT '',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Galeri
CREATE TABLE IF NOT EXISTS gallery (
  id         TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  url        TEXT NOT NULL,
  caption_id TEXT NOT NULL DEFAULT '',
  caption_en TEXT NOT NULL DEFAULT '',
  category   TEXT NOT NULL DEFAULT 'product',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
