import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isConfigured = supabaseUrl && supabaseAnonKey;

// Mock client that logs when methods are called without real credentials
const createMockClient = () => new Proxy({} as ReturnType<typeof createClient>, {
  get: (_target, prop) => {
    if (prop === 'then' || prop === 'catch') return undefined;
    return () => {
      console.warn(`Supabase not configured: called supabase.${String(prop)}(). Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env`);
      return Promise.resolve({ data: null, error: { message: 'Supabase not configured', code: 'NOT_CONFIGURED' } });
    };
  },
});

const realSupabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : createMockClient();

const getMockData = (table: string): any[] => {
  const t = table.toLowerCase();
  if (t === 'courses') {
    return [
      {
        id: 'course-1',
        name_th: 'Course 1 TH',
        name_en: 'Course 1 EN',
        slug: 'course-1',
        description_th: 'Desc 1 TH',
        description_en: 'Desc 1 EN',
        level: 'beginner',
        min_modules: 5,
        enrolled_count: 150,
        rating: 4.8,
        minutes_per_lesson: 120,
        created_at: new Date().toISOString()
      }
    ];
  }
  if (t === 'lessons') {
    return [
      {
        id: 'lesson-1',
        course_id: 'course-1',
        title: 'Lesson 1',
        title_th: 'Lesson 1 TH',
        title_en: 'Lesson 1 EN',
        video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        lesson_type: 'video',
        duration_minutes: 10,
        created_at: new Date().toISOString()
      }
    ];
  }
  if (t === 'products') {
    return [
      {
        id: '1',
        slug: '1',
        name: 'Product 1',
        name_th: 'Product 1 TH',
        name_en: 'Product 1 EN',
        description: 'Hikvision Network Camera',
        category: 'CCTV',
        image_url: 'https://cache-igetweb-v2.mt108.info/uploads/images-cache/4405/product/01f0d33b6d73f4aa72acabef01014483_full.png',
        source_url: 'https://utechphuket.com/th/products/863875-ds-2cd1143g2-liu%28f%29---network-cameras'
      },
      {
        id: 'cctv-product-id',
        slug: 'cctv-product-id',
        name: 'CCTV Product',
        name_th: 'CCTV Product TH',
        name_en: 'CCTV Product EN',
        description: 'Hikvision Network Camera',
        category: 'CCTV',
        image_url: 'https://cache-igetweb-v2.mt108.info/uploads/images-cache/4405/product/01f0d33b6d73f4aa72acabef01014483_full.png',
        source_url: 'https://utechphuket.com/th/products/863875-ds-2cd1143g2-liu%28f%29---network-cameras'
      },
      {
        id: 'network-product-id',
        slug: 'network-product-id',
        name: 'Network Product',
        name_th: 'Network Product TH',
        name_en: 'Network Product EN',
        description: 'Network Switch',
        category: 'Networking',
        image_url: 'https://cache-igetweb-v2.mt108.info/uploads/images-cache/4405/product/01f0d33b6d73f4aa72acabef01014483_full.png',
        source_url: 'https://utechphuket.com/th/products/863875-ds-2cd1143g2-liu%28f%29---network-cameras'
      }
    ];
  }
  if (t === 'documents') {
    return [
      {
        id: 'doc-1',
        product_id: '1',
        title: 'Doc 1',
        title_th: 'เอกสาร 1',
        title_en: 'Doc 1 EN',
        url: '#'
      }
    ];
  }
  if (t === 'faqs') {
    return [
      {
        id: 'faq-1',
        product_id: '1',
        question: 'Q 1',
        question_th: 'คำถาม 1',
        question_en: 'Q 1 EN',
        answer: 'A 1',
        answer_th: 'คำตอบ 1',
        answer_en: 'A 1 EN'
      }
    ];
  }
  if (t === 'troubleshooting_guides') {
    return [
      {
        id: 'guide-1',
        product_id: '1',
        issue: 'Issue 1',
        issue_th: 'ปัญหา 1',
        issue_en: 'Issue 1 EN',
        symptoms: 'Symptom 1',
        symptoms_th: 'อาการ 1',
        symptoms_en: 'Symptom 1 EN',
        solution: 'Sol 1',
        solution_th: 'ทางแก้ 1',
        solution_en: 'Sol 1 EN'
      }
    ];
  }
  if (t === 'training_courses') {
    return [
      {
        id: 'course-1',
        product_id: '1',
        title: 'Course 1',
        title_th: 'คอร์ส 1',
        title_en: 'Course 1 EN',
        description: 'Desc 1',
        description_th: 'คำอธิบาย 1',
        description_en: 'Desc 1 EN'
      }
    ];
  }
  if (t === 'training_lessons') {
    return [
      {
        id: 'lesson-1',
        course_id: 'course-1',
        title: 'Installation Basics',
        title_th: 'Installation Basics',
        title_en: 'Installation Basics',
        description: 'Learn how to install',
        video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      }
    ];
  }
  if (t === 'learning_paths' || t === 'paths') {
    return [
      {
        id: 'path-1',
        name_th: 'Network Engineer',
        name_en: 'Network Engineer',
        description_th: 'เส้นทางการเรียน Network Engineer',
        description_en: 'Network Engineer Path'
      }
    ];
  }
  if (t === 'resources') {
    return [
      {
        id: 'res-1',
        title: 'Resource 1',
        description: 'Desc 1',
        url: '#'
      }
    ];
  }
  return [];
};

export const supabase = new Proxy(realSupabase, {
  get: (target, prop) => {
    if (typeof window !== 'undefined' && window.localStorage.getItem('sb-mock-auth') === 'true') {
      if (prop === 'from') {
        return (table: string) => {
          console.log(`[Supabase Mock Proxy] Intercepted from('${table}')`);
          const data = getMockData(table);
          const builder: any = {
            select: () => builder,
            insert: () => Promise.resolve({ data: [], error: null }),
            update: () => builder,
            upsert: () => Promise.resolve({ data: [], error: null }),
            delete: () => builder,
            eq: () => builder,
            in: () => builder,
            match: () => builder,
            order: () => builder,
            limit: () => builder,
            single: () => Promise.resolve({ data: data[0] || null, error: null }),
            maybeSingle: () => Promise.resolve({ data: data[0] || null, error: null }),
            then: (onfulfilled: any) => Promise.resolve({ data, error: null }).then(onfulfilled),
          };
          return builder;
        };
      }
      if (prop === 'rpc') {
        return (fn: string) => {
          console.log(`[Supabase Mock Proxy] Intercepted rpc('${fn}')`);
          return Promise.resolve({ data: null, error: null });
        };
      }
    }
    return target[prop as keyof typeof target];
  }
});
