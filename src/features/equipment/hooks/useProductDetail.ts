import { useState, useEffect } from 'react';
import { supabase } from '../../../app/lib/supabase';
import { useProducts } from './useProducts';
import { ProductDetailData } from '../types/product';
import { useI18n } from '../../../app/i18n';

export function useProductDetail(slug: string | undefined) {
  const { products, isLoading: isCatalogLoading } = useProducts();
  const { language } = useI18n();
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

        // 1. Load product overview from products.json via useProducts hook
        let localProduct = products.find(p => p.slug === slug) || null;
        
        // Resilience: If exact match fails, try matching by ignoring hyphens (e.g. wme1-c vs wme1c)
        if (!localProduct) {
          const normalizedInputSlug = slug.replace(/-/g, '');
          localProduct = products.find(p => p.slug.replace(/-/g, '') === normalizedInputSlug) || null;
          
          if (localProduct) {
            // Optional redirect: update URL to canonical slug without reloading page
            window.history.replaceState(null, '', `/equipment/${localProduct.slug}`);
          }
        }

        if (!localProduct) {
          throw new Error('Product not found in catalog');
        }

        // Use the canonical slug from the matched product for DB lookup
        const canonicalSlug = localProduct.slug;

        console.log('[DEBUG useProductDetail] canonicalSlug:', canonicalSlug);

        // 2. Attempt to load related content from Supabase
        const { data: dbProduct, error: dbProductError } = await supabase
          .from('products')
          .select('*')
          .eq('slug', canonicalSlug)
          .maybeSingle();

        console.log('[DEBUG useProductDetail] dbProduct query result:', { found: !!dbProduct, error: dbProductError?.message });

        // If product doesn't exist in DB, we just gracefully return empty arrays for related content
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

        // 3. If product exists in DB, fetch related data in parallel
        const productId = dbProduct.id;
        
        console.log('[DEBUG useProductDetail] Found dbProduct id:', productId);

        const [
          { data: documents },
          { data: faqs },
          { data: troubleshooting_guides },
          { data: training_courses },
          { data: translations }
        ] = await Promise.all([
          supabase.from('documents').select('*').eq('product_id', productId),
          supabase.from('faqs').select('*').eq('product_id', productId),
          supabase.from('troubleshooting_guides').select('*').eq('product_id', productId),
          supabase.from('training_courses').select('*, training_lessons(*)').eq('product_id', productId),
          supabase.from('product_translations').select('language, content').eq('product_id', productId)
        ]);

        console.log('[DEBUG useProductDetail] Loaded related data:', { 
          docs: documents?.length, 
          faqs: faqs?.length, 
          guides: troubleshooting_guides?.length, 
          courses: training_courses?.length,
          translations: translations?.length
        });

        // 4. Translation Mapping Logic with Fallback
        const nameFallback = dbProduct.name || localProduct.title || localProduct.name;
        const nameVal = dbProduct[`name_${language}` as 'name_th' | 'name_en'];
        const finalName = nameVal !== null && nameVal !== undefined && nameVal !== '' ? nameVal : nameFallback;

        const descFallback = dbProduct.description?.trim() ? dbProduct.description : localProduct.description;
        const descVal = dbProduct[`description_${language}` as 'description_th' | 'description_en'];
        const rawDescription = descVal !== null && descVal !== undefined && descVal !== '' ? descVal : descFallback;

        const parts = (rawDescription || '').split('#');
        const shortDesc = parts[0].trim();
        const extractedLongDesc = parts.length > 1 ? parts.slice(1).join('#').trim() : '';
        
        const translation = (translations || []).find((t: any) => t.language === language);
        const contentFallback = dbProduct.content?.trim() ? dbProduct.content : (extractedLongDesc || shortDesc);
        
        // Prioritize product_translations table, then fallback to dbProduct inline columns
        let contentVal = translation?.content;
        if (contentVal === null || contentVal === undefined || contentVal === '') {
          contentVal = dbProduct[`content_${language}` as 'content_th' | 'content_en'];
        }
        
        const finalContent = contentVal !== null && contentVal !== undefined && contentVal !== '' ? contentVal : contentFallback;

        const mergedProduct = {
          ...localProduct,
          ...dbProduct,
          name: finalName,
          description: shortDesc,
          content: finalContent,
          source_url: dbProduct.source_url || localProduct.source_url
        };

        const mappedDocuments = (documents || []).map((doc: any) => {
          const docTitle = doc[`title_${language}` as 'title_th' | 'title_en'];
          return {
            ...doc,
            title: docTitle !== null && docTitle !== undefined && docTitle !== '' ? docTitle : doc.title
          };
        });

        const mappedFaqs = (faqs || []).map((faq: any) => {
          const qVal = faq[`question_${language}` as 'question_th' | 'question_en'];
          const aVal = faq[`answer_${language}` as 'answer_th' | 'answer_en'];
          return {
            ...faq,
            question: qVal !== null && qVal !== undefined && qVal !== '' ? qVal : faq.question,
            answer: aVal !== null && aVal !== undefined && aVal !== '' ? aVal : faq.answer
          };
        });

        const mappedGuides = (troubleshooting_guides || []).map((guide: any) => {
          const issueVal = guide[`issue_${language}` as 'issue_th' | 'issue_en'];
          const symVal = guide[`symptoms_${language}` as 'symptoms_th' | 'symptoms_en'];
          const solVal = guide[`solution_${language}` as 'solution_th' | 'solution_en'];
          return {
            ...guide,
            issue: issueVal !== null && issueVal !== undefined && issueVal !== '' ? issueVal : guide.issue,
            symptoms: symVal !== null && symVal !== undefined && symVal !== '' ? symVal : guide.symptoms,
            solution: solVal !== null && solVal !== undefined && solVal !== '' ? solVal : guide.solution
          };
        });

        const mappedCourses = (training_courses || []).map((course: any) => {
          const mappedLessons = (course.training_lessons || []).map((lesson: any) => {
            const lTitle = lesson[`title_${language}` as 'title_th' | 'title_en'];
            const lContent = lesson[`content_${language}` as 'content_th' | 'content_en'];
            return {
              ...lesson,
              title: lTitle !== null && lTitle !== undefined && lTitle !== '' ? lTitle : lesson.title,
              markdown_content: lContent !== null && lContent !== undefined && lContent !== '' ? lContent : lesson.markdown_content
            };
          });
          const cTitle = course[`title_${language}` as 'title_th' | 'title_en'];
          const cDesc = course[`description_${language}` as 'description_th' | 'description_en'];
          return {
            ...course,
            title: cTitle !== null && cTitle !== undefined && cTitle !== '' ? cTitle : course.title,
            description: cDesc !== null && cDesc !== undefined && cDesc !== '' ? cDesc : course.description,
            training_lessons: mappedLessons
          };
        });

        setData({
          product: mergedProduct,
          documents: mappedDocuments,
          faqs: mappedFaqs,
          troubleshooting_guides: mappedGuides,
          training_courses: mappedCourses
        });

      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load product detail'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [slug, products, isCatalogLoading, language]);

  return { data, isLoading, error };
}
