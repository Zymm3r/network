-- ============================================================
-- Migration: Add multilingual content columns to products
-- Date: 2026-07-14
-- ============================================================

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS content_th       TEXT,
  ADD COLUMN IF NOT EXISTS content_en       TEXT,
  ADD COLUMN IF NOT EXISTS content_status   TEXT DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS content_source   TEXT,
  ADD COLUMN IF NOT EXISTS last_verified_at TIMESTAMPTZ;

COMMENT ON COLUMN public.products.content_th       IS 'Official product content in Thai (Markdown)';
COMMENT ON COLUMN public.products.content_en       IS 'Official product content in English (Markdown)';
COMMENT ON COLUMN public.products.content_status   IS 'official | no-official-source | pending';
COMMENT ON COLUMN public.products.content_source   IS 'Official URL used as content source';
COMMENT ON COLUMN public.products.last_verified_at IS 'Timestamp when content was last verified against official source';
