import { useState, useEffect, useMemo } from 'react';
import { Product, RawProduct } from '../types/product';
import productsData from '../../../app/data/products.json';
import slugify from 'slugify';
import { supabase } from '../../../app/lib/supabase';
import { useI18n } from '../../../app/i18n';

const getCategory = (title: string): string => {
  const t = title.toLowerCase();
  if (t.includes('camera') || t.includes('cctv') || t.includes('nvr') || t.includes('ds-')) return 'Surveillance';
  if (t.includes('access point') || t.includes('switch') || t.includes('wi-fi')) return 'Networking';
  if (t.includes('door') || t.includes('access control') || t.includes('hip') || t.includes('barrier') || t.includes('reader')) return 'Access Control';
  if (t.includes('printer') || t.includes('pos')) return 'POS';
  if (t.includes('hdd') || t.includes('seagate')) return 'Storage';
  return 'Accessories';
};

export function useProducts() {
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [useLocalOnly, setUseLocalOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { language } = useI18n();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data, error: dbError } = await supabase
          .from('products')
          .select('*');

        if (dbError) throw dbError;

        if (!data || data.length === 0) {
          setUseLocalOnly(true);
        } else {
          setDbProducts(data);
        }
      } catch (err) {
        console.warn('Failed to query products from database, falling back to local JSON catalog:', err);
        setUseLocalOnly(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const parsedLocalProducts = useMemo(() => {
    return (productsData as RawProduct[]).map((p, index) => {
      const name = p.title || 'Unknown Product';
      const slug = slugify(name, { lower: true, strict: true, locale: 'th' });
      return {
        id: p.id || `product-${index}`,
        name: name,
        slug: slug || `product-${index}`,
        category: getCategory(name),
        description: p.description || 'No description available.',
        content: p.description || undefined,
        image_url: p.image || '',
        source_url: p.url || '#',
      };
    });
  }, []);

  const products = useMemo(() => {
    if (useLocalOnly || dbProducts.length === 0) {
      return parsedLocalProducts;
    }

    const localFallbackMap = new Map(parsedLocalProducts.map(p => [p.slug, p]));

    return dbProducts.map((dbProd: any) => {
      let localProd = localFallbackMap.get(dbProd.slug) || null;
      if (!localProd) {
        const normalizedSlug = dbProd.slug?.replace(/-/g, '') || '';
        localProd = parsedLocalProducts.find(lp => lp.slug.replace(/-/g, '') === normalizedSlug) || null;
      }

      const nameFallback = dbProd.name || localProd?.name || 'Unknown Product';
      const finalName = dbProd[`name_${language}` as 'name_th' | 'name_en']?.trim() || nameFallback;

      const descFallback = dbProd.description?.trim() ? dbProd.description : localProd?.description || 'No description available.';
      const finalDesc = dbProd[`description_${language}` as 'description_th' | 'description_en']?.trim() || descFallback;

      const contentFallback = dbProd.content?.trim() ? dbProd.content : (localProd?.content || finalDesc);
      const finalContent = dbProd[`content_${language}` as 'content_th' | 'content_en']?.trim() || contentFallback;

      return {
        ...(localProd || {}),
        ...dbProd,
        name: finalName,
        slug: dbProd.slug || localProd?.slug || slugify(finalName, { lower: true, strict: true, locale: 'th' }),
        category: localProd?.category || getCategory(finalName),
        description: finalDesc,
        content: finalContent,
        image_url: dbProd.image_url || localProd?.image_url || '',
        source_url: dbProd.source_url || localProd?.source_url || '#',
      };
    });
  }, [dbProducts, useLocalOnly, parsedLocalProducts, language]);

  return { products, isLoading, error };
}
