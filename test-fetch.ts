import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);

async function test() {
  const canonicalSlug = 'ds-2cd1143g2-liuf-network-cameras';

  console.log(`Testing slug: ${canonicalSlug}`);

  // 1. Fetch product
  const { data: dbProduct, error: pError } = await supabase
    .from('products')
    .select('*')
    .eq('slug', canonicalSlug)
    .maybeSingle();

  console.log('--- PRODUCT DATA ---');
  if (pError) console.error('Error fetching product:', pError.message);
  else console.log(JSON.stringify(dbProduct, null, 2));
  
  if (dbProduct) {
    const productId = dbProduct.id;
    const [
      { data: documents, error: docsError },
      { data: faqs, error: faqsError },
      { data: troubleshooting_guides },
      { data: training_courses }
    ] = await Promise.all([
      supabase.from('documents').select('*').eq('product_id', productId),
      supabase.from('faqs').select('*').eq('product_id', productId),
      supabase.from('troubleshooting_guides').select('*').eq('product_id', productId),
      supabase.from('training_courses').select('*, training_lessons(*)').eq('product_id', productId)
    ]);

    console.log('Documents:', documents?.length, 'error:', docsError);
    console.log('FAQs:', faqs?.length, 'error:', faqsError);
    console.log('Troubleshooting:', troubleshooting_guides?.length);
    console.log('Training:', training_courses?.length);
  }
}
test();
