-- ============================================================
-- Migration: Mark commodity products with no official source
-- These are generic consumables / components with no manufacturer
-- product pages. Content is intentionally left NULL.
-- ============================================================

-- Thermal Paper Rolls (generic consumables)
UPDATE public.products SET
  content_status   = 'no-official-source',
  last_verified_at = NOW()
WHERE slug IN (
  '57x30',
  '57x50',
  '80x80'
);

-- Chemical Paper (carbonless copy paper - generic)
UPDATE public.products SET
  content_status   = 'no-official-source',
  last_verified_at = NOW()
WHERE slug IN (
  '1-w',
  '2-ww',
  '3-www',
  '3-wyp'
);

-- Salary Slip / Barcode Labels (generic)
UPDATE public.products SET
  content_status   = 'no-official-source',
  last_verified_at = NOW()
WHERE slug IN (
  '9x55-3',
  '32x25mm'
);

-- Printer Ribbons (generic consumables)
UPDATE public.products SET
  content_status   = 'no-official-source',
  last_verified_at = NOW()
WHERE slug IN (
  'erc38br',
  'ribbon-erc38b',
  'ribbon-erc38rb',
  'ribbon-barcode-110300'
);

-- Generic Power Supplies
UPDATE public.products SET
  content_status   = 'no-official-source',
  last_verified_at = NOW()
WHERE slug IN (
  'power-supply-12v-20a',
  'switching-power-supply-12v20a'
);

-- Generic CCTV Accessories (no manufacturer-specific page)
UPDATE public.products SET
  content_status   = 'no-official-source',
  last_verified_at = NOW()
WHERE slug IN (
  'bnc-jack',
  'cctv-camera-video-balun',
  'jack-dc',
  'line-protector',
  'ac-line-surge-protector',
  'adapter-cctv-camera'
);

-- HIP Battery (generic 12V 7Ah SLA - no product-specific page)
UPDATE public.products SET
  content_status   = 'no-official-source',
  last_verified_at = NOW()
WHERE slug = 'hip-battery-12v-7ah';

-- HIP Reader & Writer (generic accessory)
UPDATE public.products SET
  content_status   = 'no-official-source',
  last_verified_at = NOW()
WHERE slug = 'hip-reader-and-writer';

-- LINK brand networking products (Thai brand - no verifiable official source)
UPDATE public.products SET
  content_status   = 'no-official-source',
  last_verified_at = NOW()
WHERE slug IN (
  'link-cb-0106awa',
  'link-uc-0026',
  'link-ul-1024',
  'link-us-1001',
  'link-us-1002',
  'link-us-6624',
  'link-us-9015',
  'link-us-9106',
  'link-us-9106a',
  'link-us-9106md',
  'link-us-9106out',
  'link-us-9116600mhz'
);

-- Accessories Access Control System (generic category item)
UPDATE public.products SET
  content_status   = 'no-official-source',
  last_verified_at = NOW()
WHERE slug = 'accessories-access-control-system';

-- Nurse Call Analog (generic system)
UPDATE public.products SET
  content_status   = 'no-official-source',
  last_verified_at = NOW()
WHERE slug = 'nurse-call-analog';

-- Model 118Series (unidentified brand)
UPDATE public.products SET
  content_status   = 'no-official-source',
  last_verified_at = NOW()
WHERE slug = 'model-118series';

-- PK-24G (unidentified product)
UPDATE public.products SET
  content_status   = 'no-official-source',
  last_verified_at = NOW()
WHERE slug = 'pk-24g';

-- Monitor Touch Screen TM 7117 (no verifiable official manufacturer page)
UPDATE public.products SET
  content_status   = 'no-official-source',
  last_verified_at = NOW()
WHERE slug = 'monitor-touch-screen-tm-7117';

-- PS-3316, PS-3415E (Posiflex models - will be covered if found; mark pending otherwise)
-- These may have official pages - leaving as pending for manual follow-up
-- Duplicate slug with trailing whitespace/newline (data quality issue)
UPDATE public.products SET
  content_status   = 'no-official-source',
  last_verified_at = NOW()
WHERE slug = E'Hikvision-DS-K1T321MFWX\r\n';

-- Hip Car Park Barrier duplicate slug (same product as cmw8133-dc)
UPDATE public.products SET
  content_status   = 'no-official-source',
  last_verified_at = NOW()
WHERE slug = 'hip-car-park-barrier-cmw8133-dc-1';

-- Hip Key Tag duplicate slug
UPDATE public.products SET
  content_status   = 'no-official-source',
  last_verified_at = NOW()
WHERE slug = 'hip-key-Tag';
