# Supabase Schema & Hook Analysis for Bilingual Content Support (R2)

## Executive Summary
This report analyzes the requirements and design for implementing bilingual (Thai and English) content support (R2) for the equipment catalog on the UTech Network 101 learning platform. Currently, core training tables (courses, lessons, resources) support bilingual name and description fields using a `*_th` and `*_en` column suffix pattern. In contrast, the equipment-related tables (`products`, `documents`, `faqs`, `troubleshooting_guides`, `training_courses`, `training_lessons`) only feature single-language columns. 

We propose adding bilingual columns to all equipment-related tables while retaining the existing single-language columns as fallbacks. Since frontend queries in custom hooks use `select('*')`, the Supabase API will automatically return the new columns without query modifications. The data translation logic will be encapsulated inside the `useProductDetail` hook using the `useI18n()` active language state, leaving UI components completely decoupled from translation mechanics.

---

## 1. Existing Database Bilingual Pattern
The core learning platform tables are fully localized. We examined `recreate_schema_and_policies.sql` to identify the pattern used:

### 1.1 Schema Column Pattern
Core tables define separate columns suffixing `_th` (Thai) and `_en` (English) for translatable text fields:
- **`courses`**: `name_th` (TEXT NOT NULL), `name_en` (TEXT NOT NULL), `description_th` (TEXT), `description_en` (TEXT)
- **`resources`**: `name_th` (TEXT NOT NULL), `name_en` (TEXT NOT NULL), `description_th` (TEXT), `description_en` (TEXT)
- **`learning_paths`**: `name_th` (TEXT NOT NULL), `name_en` (TEXT NOT NULL), `description_th` (TEXT), `description_en` (TEXT)
- **`lessons`**: `title_th` (TEXT NOT NULL), `title_en` (TEXT NOT NULL), `content_th` (TEXT), `content_en` (TEXT)
- **`practice_exercises`**: `name_th` (TEXT), `name_en` (TEXT), `description_th` (TEXT), `description_en` (TEXT), `question_th` (TEXT), `question_en` (TEXT), `explanation_th` (TEXT), `explanation_en` (TEXT)

### 1.2 Frontend Consumption Pattern
Components import the `useI18n()` hook to determine the active language and select the corresponding column:
```typescript
const { language } = useI18n(); // returns 'th' | 'en'
const name = language === 'th' ? course.name_th : course.name_en;
```
For fallback scenarios, components rely on logical ORs to ensure a name or description is displayed even if the active language column is empty:
```typescript
const courseName = language === 'th' ? (course.name_th || course.name_en) : (course.name_en || course.name_th);
```

---

## 2. Equipment-Related Table Schemas
We analyzed the database setup from the migration logs, seeding scripts, and typescript models (`src/features/equipment/types/product.ts`).

### 2.1 Current Column Structure and Types
The equipment-domain tables are structured with single-language text columns and UUID identifiers:

1. **`products`**
   - `id`: `UUID` PRIMARY KEY (e.g. `4b91e49f-0049-4eb9-9123-3056ef506ed0`)
   - `name`: `TEXT` NOT NULL
   - `slug`: `TEXT` NOT NULL UNIQUE
   - `description`: `TEXT`
   - `content`: `TEXT`
   - `category_id`: `UUID` REFERENCES `public.categories(id)`
   - `image_url`: `TEXT`
   - `source_url`: `TEXT`
   - `created_at` / `updated_at`: `TIMESTAMPTZ`

2. **`documents`**
   - `id`: `UUID` PRIMARY KEY
   - `product_id`: `UUID` REFERENCES `public.products(id)` ON DELETE CASCADE
   - `title`: `TEXT` NOT NULL
   - `document_type`: `TEXT`
   - `file_url`: `TEXT`
   - `markdown_content`: `TEXT`
   - `created_at`: `TIMESTAMPTZ`

3. **`faqs`**
   - `id`: `UUID` PRIMARY KEY
   - `product_id`: `UUID` REFERENCES `public.products(id)` ON DELETE CASCADE
   - `question`: `TEXT` NOT NULL
   - `answer`: `TEXT` NOT NULL
   - `created_at`: `TIMESTAMPTZ`

4. **`troubleshooting_guides`**
   - `id`: `UUID` PRIMARY KEY
   - `product_id`: `UUID` REFERENCES `public.products(id)` ON DELETE CASCADE
   - `issue`: `TEXT` NOT NULL
   - `symptoms`: `TEXT`
   - `solution`: `TEXT`
   - `created_at`: `TIMESTAMPTZ`

5. **`training_courses`**
   - `id`: `UUID` PRIMARY KEY
   - `product_id`: `UUID` REFERENCES `public.products(id)` ON DELETE CASCADE
   - `title`: `TEXT` NOT NULL
   - `description`: `TEXT`
   - `difficulty`: `TEXT`
   - `video_url`: `TEXT`
   - `created_at`: `TIMESTAMPTZ`

6. **`training_lessons`**
   - `id`: `UUID` PRIMARY KEY
   - `course_id`: `UUID` REFERENCES `public.training_courses(id)` ON DELETE CASCADE
   - `title`: `TEXT` NOT NULL
   - `lesson_order`: `INTEGER`
   - `markdown_content`: `TEXT`
   - `video_url`: `TEXT`
   - `created_at`: `TIMESTAMPTZ`

### 2.2 RLS Rules and Migration Impact Assessment
- **Status of Row Level Security (RLS)**: Row Level Security is fully enabled on all 6 tables (applied in `20260608100054_equipment_rls_policies.sql` and reinforced in `20260609000000_fix_rls_and_m4_analytics.sql`).
- **SELECT Policies**: The SELECT policies allow public read access using a simple `USING (true)` rule:
  ```sql
  CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (true);
  ```
- **Impact Assessment**: Adding columns to these tables **does not affect RLS rules or existing policies**. Row-level filters will continue to match rows exactly as before, and the database engine will serve the new columns automatically to all queries.
- **Triggers Impact**: There are no database triggers active on the equipment-related tables. The progress and certificate triggers (`sync_enrollment_progress` and `auto_issue_course_certificate`) only monitor the core `user_progress` table and do not intercept mutations on equipment tables. Therefore, adding columns carries zero trigger-breakage risk.

---

## 3. Equipment Hooks Data Retrieval & Queries
We examined `src/features/equipment/hooks/useProductDetail.ts` and `useProducts.ts` to identify where and how they query Supabase.

### 3.1 Queries in `useProductDetail.ts`
- **Overview Fetching**:
  ```typescript
  const { data: dbProduct, error: dbProductError } = await supabase
    .from('products')
    .select('*')
    .eq('slug', canonicalSlug)
    .maybeSingle();
  ```
- **Related Records Fetching**:
  ```typescript
  const [
    { data: documents },
    { data: faqs },
    { data: troubleshooting_guides },
    { data: training_courses }
  ] = await Promise.all([
    supabase.from('documents').select('*').eq('product_id', productId),
    supabase.from('faqs').select('*').eq('product_id', productId),
    supabase.from('troubleshooting_guides').select('*').eq('product_id', productId),
    supabase.from('training_courses').select('*, training_lessons(*)').eq('product_id', productId)
  ]);
  ```

### 3.2 Key Hook Insights
- **Automatic Column Exposure**: Both the product overview query and the parallel fetch block use `select('*')` or nested `select('*, training_lessons(*)')`. Consequently, **no SQL query updates are needed** in `useProductDetail.ts` to retrieve the new columns. Once added to the database, they will be instantly delivered in the query results.
- **`useProducts.ts` Status**: This hook loads products from the local `products.json` file on the client side and does not query Supabase directly. To support bilingual titles and descriptions in the equipment catalog list, we can either:
  1. Map the static JSON data based on the language.
  2. Transition `useProducts` to query the Supabase `products` table (e.g. `supabase.from('products').select('*')`), which is a better production pattern.

---

## 4. Proposed Migration SQL (R2 Columns Addition)
The migration must be idempotent and add the bilingual columns as nullable fields (`TEXT` without `NOT NULL`) to avoid breaking existing data and allow smooth fallbacks.

```sql
-- Migration: Add bilingual columns to equipment-related tables (R2)
-- Description: Adds columns to support both Thai and English content with backward compatibility.
-- This migration is idempotent.

BEGIN;

-- 1. products table
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS name_th TEXT,
  ADD COLUMN IF NOT EXISTS name_en TEXT,
  ADD COLUMN IF NOT EXISTS description_th TEXT,
  ADD COLUMN IF NOT EXISTS description_en TEXT,
  ADD COLUMN IF NOT EXISTS content_th TEXT,
  ADD COLUMN IF NOT EXISTS content_en TEXT;

-- 2. documents table
ALTER TABLE public.documents
  ADD COLUMN IF NOT EXISTS title_th TEXT,
  ADD COLUMN IF NOT EXISTS title_en TEXT;

-- 3. faqs table
ALTER TABLE public.faqs
  ADD COLUMN IF NOT EXISTS question_th TEXT,
  ADD COLUMN IF NOT EXISTS question_en TEXT,
  ADD COLUMN IF NOT EXISTS answer_th TEXT,
  ADD COLUMN IF NOT EXISTS answer_en TEXT;

-- 4. troubleshooting_guides table
ALTER TABLE public.troubleshooting_guides
  ADD COLUMN IF NOT EXISTS issue_th TEXT,
  ADD COLUMN IF NOT EXISTS issue_en TEXT,
  ADD COLUMN IF NOT EXISTS symptoms_th TEXT,
  ADD COLUMN IF NOT EXISTS symptoms_en TEXT,
  ADD COLUMN IF NOT EXISTS solution_th TEXT,
  ADD COLUMN IF NOT EXISTS solution_en TEXT;

-- 5. training_courses table
ALTER TABLE public.training_courses
  ADD COLUMN IF NOT EXISTS title_th TEXT,
  ADD COLUMN IF NOT EXISTS title_en TEXT,
  ADD COLUMN IF NOT EXISTS description_th TEXT,
  ADD COLUMN IF NOT EXISTS description_en TEXT;

-- 6. training_lessons table
ALTER TABLE public.training_lessons
  ADD COLUMN IF NOT EXISTS title_th TEXT,
  ADD COLUMN IF NOT EXISTS title_en TEXT,
  ADD COLUMN IF NOT EXISTS content_th TEXT,
  ADD COLUMN IF NOT EXISTS content_en TEXT;

COMMIT;
```

---

## 5. Proposed Hook & Types Updates Design

To avoid modifying field accessors across multiple UI pages and components (e.g. `EquipmentDetailTabs.tsx`, `EquipmentCard.tsx`), the custom hook should perform the translation mapping. It will resolve the active language via `useI18n()` and map the localized fields back into the standard single-language properties (`name`, `description`, `title`, etc.) before returning them to the UI.

### 5.1 Type Updates (`src/features/equipment/types/product.ts`)
Update the TypeScript interfaces to include the new database columns:

```typescript
export interface Product {
  id: string;
  name: string;
  category: string;
  slug: string;
  description: string;
  content?: string;
  image_url: string;
  source_url: string;
  // Bilingual Database Columns
  name_th?: string;
  name_en?: string;
  description_th?: string;
  description_en?: string;
  content_th?: string;
  content_en?: string;
}

export interface Document {
  id: string;
  title: string;
  document_type: string;
  file_url: string;
  markdown_content?: string;
  created_at: string;
  // Bilingual Database Columns
  title_th?: string;
  title_en?: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  created_at: string;
  // Bilingual Database Columns
  question_th?: string;
  question_en?: string;
  answer_th?: string;
  answer_en?: string;
}

export interface TroubleshootingGuide {
  id: string;
  issue: string;
  symptoms: string;
  solution: string;
  created_at: string;
  // Bilingual Database Columns
  issue_th?: string;
  issue_en?: string;
  symptoms_th?: string;
  symptoms_en?: string;
  solution_th?: string;
  solution_en?: string;
}

export interface TrainingLesson {
  id: string;
  course_id: string;
  title: string;
  lesson_order: number;
  markdown_content?: string;
  video_url?: string;
  created_at: string;
  // Bilingual Database Columns
  title_th?: string;
  title_en?: string;
  content_th?: string;
  content_en?: string;
}

export interface TrainingCourse {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  video_url?: string;
  training_lessons?: TrainingLesson[];
  created_at: string;
  // Bilingual Database Columns
  title_th?: string;
  title_en?: string;
  description_th?: string;
  description_en?: string;
}
```

### 5.2 Hook Updates (`src/features/equipment/hooks/useProductDetail.ts`)
Incorporate `useI18n()` and translate variables dynamically with proper fallback chains:

```typescript
import { useState, useEffect } from 'react';
import { supabase } from '../../../app/lib/supabase';
import { useProducts } from './useProducts';
import { useI18n } from '../../../app/i18n'; // Import active language hook
import { ProductDetailData } from '../types/product';

export function useProductDetail(slug: string | undefined) {
  const { products, isLoading: isCatalogLoading } = useProducts();
  const { language } = useI18n(); // Retrieve current active language: 'th' | 'en'
  const [data, setData] = useState<ProductDetailData>({
    product: null,
    documents: [],
    faqs: [],
    troubleshooting_guides: [],
    training_courses: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (isCatalogLoading) return;

    const fetchDetail = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        if (!slug) throw new Error('Product slug is required');

        let localProduct = products.find(p => p.slug === slug) || null;
        if (!localProduct) {
          const normalizedInputSlug = slug.replace(/-/g, '');
          localProduct = products.find(p => p.slug.replace(/-/g, '') === normalizedInputSlug) || null;
          if (localProduct) {
            window.history.replaceState(null, '', `/equipment/${localProduct.slug}`);
          }
        }

        if (!localProduct) {
          throw new Error('Product not found in catalog');
        }

        const canonicalSlug = localProduct.slug;

        // 1. Fetch main product details from Supabase
        const { data: dbProduct, error: dbProductError } = await supabase
          .from('products')
          .select('*')
          .eq('slug', canonicalSlug)
          .maybeSingle();

        if (!dbProduct || dbProductError) {
          setData({
            product: localProduct,
            documents: [],
            faqs: [],
            troubleshooting_guides: [],
            training_courses: []
          });
          setIsLoading(false);
          return;
        }

        const productId = dbProduct.id;

        // 2. Fetch all related entities in parallel
        const [
          { data: documents },
          { data: faqs },
          { data: troubleshooting_guides },
          { data: training_courses }
        ] = await Promise.all([
          supabase.from('documents').select('*').eq('product_id', productId),
          supabase.from('faqs').select('*').eq('product_id', productId),
          supabase.from('troubleshooting_guides').select('*').eq('product_id', productId),
          supabase.from('training_courses').select('*, training_lessons(*)').eq('product_id', productId)
        ]);

        // 3. Dynamic language-specific resolution with fallbacks
        const isTh = language === 'th';

        // Product resolution
        const nameResolved = isTh 
          ? (dbProduct.name_th || dbProduct.name || localProduct.name)
          : (dbProduct.name_en || dbProduct.name || localProduct.name);

        const rawDescription = isTh
          ? (dbProduct.description_th || dbProduct.description || localProduct.description)
          : (dbProduct.description_en || dbProduct.description || localProduct.description);

        const parts = (rawDescription || '').split('#');
        const shortDesc = parts[0].trim();
        const extractedLongDesc = parts.length > 1 ? parts.slice(1).join('#').trim() : '';

        const contentResolved = isTh
          ? (dbProduct.content_th || dbProduct.content || extractedLongDesc || shortDesc)
          : (dbProduct.content_en || dbProduct.content || extractedLongDesc || shortDesc);

        const mergedProduct = {
          ...localProduct,
          ...dbProduct,
          name: nameResolved,
          description: shortDesc,
          content: contentResolved,
          source_url: dbProduct.source_url || localProduct.source_url
        };

        // Documents resolution
        const mappedDocuments = (documents || []).map(doc => ({
          ...doc,
          title: isTh ? (doc.title_th || doc.title) : (doc.title_en || doc.title)
        }));

        // FAQs resolution
        const mappedFaqs = (faqs || []).map(faq => ({
          ...faq,
          question: isTh ? (faq.question_th || faq.question) : (faq.question_en || faq.question),
          answer: isTh ? (faq.answer_th || faq.answer) : (faq.answer_en || faq.answer)
        }));

        // Troubleshooting resolution
        const mappedTroubleshooting = (troubleshooting_guides || []).map(guide => ({
          ...guide,
          issue: isTh ? (guide.issue_th || guide.issue) : (guide.issue_en || guide.issue),
          symptoms: isTh ? (guide.symptoms_th || guide.symptoms) : (guide.symptoms_en || guide.symptoms),
          solution: isTh ? (guide.solution_th || guide.solution) : (guide.solution_en || guide.solution)
        }));

        // Training resolution (courses and lessons)
        const mappedTrainingCourses = (training_courses || []).map(course => ({
          ...course,
          title: isTh ? (course.title_th || course.title) : (course.title_en || course.title),
          description: isTh ? (course.description_th || course.description) : (course.description_en || course.description),
          training_lessons: (course.training_lessons || []).map(lesson => ({
            ...lesson,
            title: isTh ? (lesson.title_th || lesson.title) : (lesson.title_en || lesson.title),
            markdown_content: isTh ? (lesson.content_th || lesson.markdown_content) : (lesson.content_en || lesson.markdown_content)
          }))
        }));

        setData({
          product: mergedProduct,
          documents: mappedDocuments,
          faqs: mappedFaqs,
          troubleshooting_guides: mappedTroubleshooting,
          training_courses: mappedTrainingCourses
        });

      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load product detail'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [slug, products, isCatalogLoading, language]); // Include language in dependency array

  return { data, isLoading, error };
}
```

### 5.3 Updates to `useProducts.ts`
For `useProducts.ts` (which drives the catalog card layout), we can add language selection so that search filters and the card list display properly localized title/description strings.

```typescript
// Update within useEffect of useProducts.ts
const { language } = useI18n();

// ... inside mapping callback ...
const parsedProducts: Product[] = (productsData as RawProduct[]).map((p, index) => {
  const name = p.title || 'Unknown Product';
  const slug = slugify(name, { lower: true, strict: true, locale: 'th' });
  return {
    id: p.id || `product-${index}`,
    name: name, // If productsData is updated to contain name_th/name_en, use them here based on language
    slug: slug || `product-${index}`,
    category: getCategory(name),
    description: p.description || 'No description available.',
    content: p.description || undefined,
    image_url: p.image || '',
    source_url: p.url || '#',
  };
});
```
If we fetch the product list from Supabase instead of a static JSON file, `useProducts` can execute:
```typescript
const { data, error } = await supabase.from('products').select('*');
```
Then, map name/description using `language` similar to `useProductDetail.ts`. This is highly recommended to keep the list view consistent with the details view.
