import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { useProducts } from '../features/equipment/hooks/useProducts';
import { useProductDetail } from '../features/equipment/hooks/useProductDetail';
import { useGlobalSearch } from '../app/hooks/useGlobalSearch';

// Let's create global variables to hold mock states that can be updated dynamically in each test
let currentLanguage = 'th';
let mockProductsDb: any[] = [];
let mockProductDetailDb: any = null;
let mockDocsDb: any[] = [];
let mockFaqsDb: any[] = [];
let mockGuidesDb: any[] = [];
let mockCoursesDb: any[] = [];
let mockLessonsDb: any[] = [];
let mockResourcesDb: any[] = [];
let mockLearningPathsDb: any[] = [];
let mockError: any = null;

// Mock the i18n module
vi.mock('../app/i18n', () => {
  console.log('[DEBUG MOCK] Mock useI18n registered');
  return {
    useI18n: () => {
      console.log('[DEBUG MOCK] useI18n hook called, returning language:', currentLanguage);
      return {
        language: currentLanguage,
        setLanguage: (lang: string) => { currentLanguage = lang; },
        t: {}
      };
    }
  };
});

// Mock the supabase client module
vi.mock('../app/lib/supabase', () => {
  console.log('[DEBUG MOCK] Mock supabase registered');
  const supabaseMock = {
    from: (table: string) => {
      console.log('[DEBUG MOCK] supabase.from called for table:', table);
      const chain = {
        select: (cols?: string) => {
          console.log('[DEBUG MOCK] select called for table:', table, 'cols:', cols);
          return chain;
        },
        eq: (col: string, val: any) => {
          console.log('[DEBUG MOCK] eq called for table:', table, 'col:', col, 'val:', val);
          return chain;
        },
        maybeSingle: async () => {
          console.log('[DEBUG MOCK] maybeSingle called for table:', table);
          if (mockError) return { data: null, error: mockError };
          if (table === 'products') return { data: mockProductDetailDb, error: null };
          return { data: null, error: null };
        },
        ilike: (col: string, val: string) => {
          console.log('[DEBUG MOCK] ilike called for table:', table, 'col:', col, 'val:', val);
          return chain;
        },
        limit: (n: number) => {
          console.log('[DEBUG MOCK] limit called for table:', table, 'limit:', n);
          return chain;
        },
        then: (resolve: any, reject: any) => {
          console.log('[DEBUG MOCK] then called for table:', table);
          if (mockError) {
            console.log('[DEBUG MOCK] then resolving with mockError:', mockError.message);
            resolve({ data: null, error: mockError });
            return;
          }
          let data: any = [];
          if (table === 'products') data = mockProductsDb;
          else if (table === 'documents') data = mockDocsDb;
          else if (table === 'faqs') data = mockFaqsDb;
          else if (table === 'troubleshooting_guides') data = mockGuidesDb;
          else if (table === 'courses') data = mockCoursesDb;
          else if (table === 'training_courses') data = mockCoursesDb;
          else if (table === 'lessons') data = mockLessonsDb;
          else if (table === 'resources') data = mockResourcesDb;
          else if (table === 'learning_paths') data = mockLearningPathsDb;
          console.log('[DEBUG MOCK] then resolving for table:', table, 'with data length:', data.length);
          resolve({ data, error: null });
        }
      };
      return chain;
    }
  };
  return {
    supabase: supabaseMock
  };
});

// Helper function to wait for a condition
async function waitCondition(cond: () => boolean, timeout = 3000): Promise<void> {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    function check() {
      if (cond()) {
        resolve();
      } else if (Date.now() - start > timeout) {
        reject(new Error('Timeout waiting for condition'));
      } else {
        setTimeout(check, 10);
      }
    }
    check();
  });
}

describe('Hooks Verification Tests', () => {
  let container: HTMLDivElement;
  let root: any;

  beforeEach(() => {
    currentLanguage = 'th';
    mockProductsDb = [];
    mockProductDetailDb = null;
    mockDocsDb = [];
    mockFaqsDb = [];
    mockGuidesDb = [];
    mockCoursesDb = [];
    mockLessonsDb = [];
    mockResourcesDb = [];
    mockLearningPathsDb = [];
    mockError = null;

    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    root.unmount();
    document.body.removeChild(container);
  });

  describe('useProducts', () => {
    it('should query products from database and return mapped fields (Thai language state)', async () => {
      mockProductsDb = [
        {
          id: 'db-1',
          slug: 'test-camera',
          name_th: 'กล้องทดสอบ Camera',
          name_en: 'Test Camera',
          description_th: 'คำอธิบายไทย',
          description_en: 'English description',
          content_th: 'เนื้อหาไทย',
          content_en: 'English content',
          image_url: 'http://db-image.jpg',
          source_url: 'http://db-source.com'
        }
      ];

      let hookResult: any = null;
      function TestWrapper() {
        hookResult = useProducts();
        return null;
      }

      root.render(<TestWrapper />);
      await waitCondition(() => hookResult !== null && !hookResult.isLoading);

      expect(hookResult.error).toBeNull();
      expect(hookResult.products).toHaveLength(1);
      
      const prod = hookResult.products[0];
      expect(prod.name).toBe('กล้องทดสอบ Camera');
      expect(prod.description).toBe('คำอธิบายไทย');
      expect(prod.content).toBe('เนื้อหาไทย');
      expect(prod.image_url).toBe('http://db-image.jpg');
      expect(prod.source_url).toBe('http://db-source.com');
      expect(prod.category).toBe('Surveillance');
    });

    it('should fallback to local JSON catalog when database query fails or is empty', async () => {
      mockError = new Error('Database connection failed');

      let hookResult: any = null;
      function TestWrapper() {
        hookResult = useProducts();
        return null;
      }

      root.render(<TestWrapper />);
      await waitCondition(() => hookResult !== null && !hookResult.isLoading);

      expect(hookResult.products.length).toBeGreaterThan(0);
      expect(hookResult.products[0].id).toBe('prod-1');
    });

    it('should map fields correctly under English language state', async () => {
      currentLanguage = 'en';
      mockProductsDb = [
        {
          id: 'db-1',
          slug: 'test-camera',
          name_th: 'กล้องทดสอบ',
          name_en: 'Test Camera',
          description_th: 'คำอธิบายไทย',
          description_en: 'English description',
          content_th: 'เนื้อหาไทย',
          content_en: 'English content',
          image_url: 'http://db-image.jpg',
          source_url: 'http://db-source.com'
        }
      ];

      let hookResult: any = null;
      function TestWrapper() {
        hookResult = useProducts();
        return null;
      }

      root.render(<TestWrapper />);
      await waitCondition(() => hookResult !== null && !hookResult.isLoading);

      const prod = hookResult.products[0];
      expect(prod.name).toBe('Test Camera');
      expect(prod.description).toBe('English description');
      expect(prod.content).toBe('English content');
    });
  });

  describe('useProductDetail', () => {
    it('should load product details with sub-resource translation and fallback logic', async () => {
      mockProductsDb = [
        {
          id: 'db-1',
          slug: 'test-camera',
          name_th: 'กล้องทดสอบ',
          name_en: 'Test Camera',
          description_th: 'คำอธิบายไทย',
          description_en: 'English description',
        }
      ];

      mockProductDetailDb = {
        id: 'db-1',
        slug: 'test-camera',
        name_th: 'กล้องทดสอบ',
        name_en: 'Test Camera',
        description_th: 'คำอธิบายไทย',
        description_en: 'English description',
      };

      mockDocsDb = [
        { id: 'doc-1', product_id: 'db-1', title_th: 'คู่มือการใช้งาน', title_en: 'User Manual', url: 'http://manual.pdf' }
      ];

      mockFaqsDb = [
        { id: 'faq-1', product_id: 'db-1', question_th: 'คำถาม', question_en: 'Question', answer_th: 'คำตอบ', answer_en: 'Answer' }
      ];

      mockGuidesDb = [
        {
          id: 'guide-1',
          product_id: 'db-1',
          issue_th: 'ปัญหา',
          issue_en: 'Issue',
          symptoms_th: 'อาการ',
          symptoms_en: 'Symptoms',
          solution_th: 'ทางแก้',
          solution_en: 'Solution'
        }
      ];

      mockCoursesDb = [
        {
          id: 'course-1',
          product_id: 'db-1',
          title_th: 'คอร์สเรียน',
          title_en: 'Course',
          description_th: 'คำอธิบายคอร์ส',
          description_en: 'Course description',
          training_lessons: [
            { id: 'lesson-1', course_id: 'course-1', title_th: 'บทเรียน 1', title_en: 'Lesson 1', content_th: 'เนื้อหา 1', content_en: 'Content 1' }
          ]
        }
      ];

      let hookResult: any = null;
      function TestWrapper() {
        hookResult = useProductDetail('test-camera');
        return null;
      }

      root.render(<TestWrapper />);
      await waitCondition(() => hookResult !== null && !hookResult.isLoading);

      expect(hookResult.error).toBeNull();
      const detail = hookResult.data;
      expect(detail.product).not.toBeNull();
      expect(detail.product.name).toBe('กล้องทดสอบ');
      
      expect(detail.documents).toHaveLength(1);
      expect(detail.documents[0].title).toBe('คู่มือการใช้งาน');

      expect(detail.faqs).toHaveLength(1);
      expect(detail.faqs[0].question).toBe('คำถาม');
      expect(detail.faqs[0].answer).toBe('คำตอบ');

      expect(detail.troubleshooting_guides).toHaveLength(1);
      expect(detail.troubleshooting_guides[0].issue).toBe('ปัญหา');
      expect(detail.troubleshooting_guides[0].solution).toBe('ทางแก้');

      expect(detail.training_courses).toHaveLength(1);
      expect(detail.training_courses[0].title).toBe('คอร์สเรียน');
      expect(detail.training_courses[0].training_lessons[0].title).toBe('บทเรียน 1');
      expect(detail.training_courses[0].training_lessons[0].markdown_content).toBe('เนื้อหา 1');
    });

    it('should resiliently match slugs by ignoring hyphens and replace history state', async () => {
      mockProductsDb = [
        {
          id: 'db-1',
          slug: 'test-camera',
          name: 'Test Camera'
        }
      ];

      mockProductDetailDb = {
        id: 'db-1',
        slug: 'test-camera',
        name: 'Test Camera'
      };

      const replaceSpy = vi.spyOn(window.history, 'replaceState');

      let hookResult: any = null;
      function TestWrapper() {
        hookResult = useProductDetail('testcamera');
        return null;
      }

      root.render(<TestWrapper />);
      await waitCondition(() => hookResult !== null && !hookResult.isLoading);

      expect(hookResult.error).toBeNull();
      expect(hookResult.data.product).not.toBeNull();
      expect(hookResult.data.product.slug).toBe('test-camera');
      expect(replaceSpy).toHaveBeenCalledWith(null, '', '/equipment/test-camera');

      replaceSpy.mockRestore();
    });
  });

  describe('useGlobalSearch', () => {
    it('should search lessons, resources, courses, and paths and return mapped results', async () => {
      console.log('[TEST] Starting useGlobalSearch test case');
      mockLessonsDb = [{ id: 'l1', title_th: 'บทเรียนเอบีซี', title_en: 'ABC Lesson' }];
      mockResourcesDb = [{ id: 'r1', title: 'เครื่องมือเอบีซี' }];
      mockCoursesDb = [{ id: 'c1', title_th: 'คอร์สเอบีซี', title_en: 'ABC Course' }];
      mockLearningPathsDb = [{ id: 'p1', name_th: 'เส้นทางเอบีซี', name_en: 'ABC Path' }];

      let hookResult: any = null;
      function TestWrapper() {
        hookResult = useGlobalSearch('เอบีซี');
        console.log('[TEST] Hook rendered. loading:', hookResult?.loading, 'results:', hookResult?.results?.length);
        return null;
      }

      console.log('[TEST] Rendering TestWrapper');
      root.render(<TestWrapper />);
      
      console.log('[TEST] Waiting for search results...');
      await waitCondition(() => {
        const found = hookResult !== null && hookResult.results && hookResult.results.length > 0;
        console.log('[TEST] Condition check. hookResult loaded:', hookResult !== null, 'results length:', hookResult?.results?.length);
        return found;
      });

      console.log('[TEST] Condition met! Verifying results:', hookResult.results);
      expect(hookResult.error).toBeNull();
      expect(hookResult.results.length).toBeGreaterThan(0);
      
      const hits = hookResult.results;
      const lessonHit = hits.find((h: any) => h.category === 'lesson');
      expect(lessonHit).toBeDefined();
      expect(lessonHit.title).toBe('บทเรียนเอบีซี');

      const resourceHit = hits.find((h: any) => h.category === 'resource');
      expect(resourceHit).toBeDefined();
      expect(resourceHit.title).toBe('เครื่องมือเอบีซี');

      const courseHit = hits.find((h: any) => h.category === 'course');
      expect(courseHit).toBeDefined();
      expect(courseHit.title).toBe('คอร์สเอบีซี');

      const pathHit = hits.find((h: any) => h.category === 'path');
      expect(pathHit).toBeDefined();
      expect(pathHit.title).toBe('เส้นทางเอบีซี');
    });
  });
});
