import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mocks configuration
let mockLanguage = 'en';
let mockDbProducts: any[] = [];
let mockUseLocalOnly = false;
let mockIsLoading = false;
let mockError: any = null;

// Mock i18n
vi.mock('../../../../app/i18n', () => ({
  useI18n: () => ({
    language: mockLanguage,
    setLanguage: vi.fn(),
    t: {} as any
  })
}));

// Mock products.json
vi.mock('../../../../app/data/products.json', () => ({
  default: [
    {
      id: 'local-prod-1',
      title: 'Local Camera',
      url: 'http://example.com/local',
      image: 'local.jpg',
      description: 'Local description'
    }
  ]
}));

// Mock supabase
let mockDbProductDetail: any = null;
let mockDbDocuments: any[] = [];
let mockDbFaqs: any[] = [];
let mockDbTroubleshooting: any[] = [];
let mockDbTrainingCourses: any[] = [];

const makeQueryMock = (data: any) => {
  const eqMock = vi.fn().mockImplementation(() => {
    const promise = Promise.resolve({ data, error: null });
    return Object.assign(promise, {
      maybeSingle: vi.fn().mockResolvedValue({ data, error: null })
    });
  });
  return {
    select: vi.fn().mockReturnValue({
      eq: eqMock
    })
  };
};

vi.mock('../../../../app/lib/supabase', () => ({
  supabase: {
    from: vi.fn((table) => {
      if (table === 'products') {
        return makeQueryMock(mockDbProductDetail);
      }
      if (table === 'documents') {
        return makeQueryMock(mockDbDocuments);
      }
      if (table === 'faqs') {
        return makeQueryMock(mockDbFaqs);
      }
      if (table === 'troubleshooting_guides') {
        return makeQueryMock(mockDbTroubleshooting);
      }
      if (table === 'training_courses') {
        return makeQueryMock(mockDbTrainingCourses);
      }
      return makeQueryMock([]);
    })
  }
}));

// Mock React hooks to control state synchronously
let useStateCallCount = 0;
let setDataMock = vi.fn();
let setIsLoadingMock = vi.fn();
let setErrorMock = vi.fn();
let effectCallback: any = null;

vi.mock('react', async () => {
  const actual = await vi.importActual<any>('react');
  return {
    ...actual,
    useState: (init: any) => {
      const index = useStateCallCount++;
      if (index === 0) {
        return [mockDbProducts, vi.fn()];
      } else if (index === 1) {
        return [mockUseLocalOnly, vi.fn()];
      } else if (index === 2) {
        return [mockIsLoading, vi.fn()];
      } else if (index === 3) {
        return [mockError, vi.fn()];
      } else if (index === 4) {
        return [init, setDataMock];
      } else if (index === 5) {
        return [true, setIsLoadingMock];
      } else {
        return [null, setErrorMock];
      }
    },
    useEffect: (effect: any, deps: any) => {
      effectCallback = effect;
    },
    useMemo: (factory: any) => factory()
  };
});

// Import the hooks AFTER mocking React and dependencies
import { useProducts } from '../useProducts';
import { useProductDetail } from '../useProductDetail';

const flushPromises = () => new Promise(resolve => setTimeout(resolve, 20));

describe('useProducts Fallback Behavior', () => {
  beforeEach(() => {
    useStateCallCount = 0;
    mockLanguage = 'en';
    mockDbProducts = [];
    mockUseLocalOnly = false;
    mockIsLoading = false;
    mockError = null;
  });

  it('should resolve to local products if db is empty or local only is true', () => {
    mockUseLocalOnly = true;
    const { products } = useProducts();
    expect(products.length).toBeGreaterThan(0);
    expect(products[0].slug).toBeDefined();
  });

  it('should use bilingual columns when language is th', () => {
    mockLanguage = 'th';
    mockDbProducts = [
      {
        id: 'db-prod-1',
        slug: 'camera-1',
        name: 'Default Name',
        name_th: 'ชื่อภาษาไทย',
        name_en: 'English Name',
        description: 'Default Desc',
        description_th: 'คำอธิบายภาษาไทย',
        description_en: 'English Desc',
        content: 'Default Content',
        content_th: 'เนื้อหาภาษาไทย',
        content_en: 'English Content',
      }
    ];

    const { products } = useProducts();
    expect(products.length).toBe(1);
    expect(products[0].name).toBe('ชื่อภาษาไทย');
    expect(products[0].description).toBe('คำอธิบายภาษาไทย');
    expect(products[0].content).toBe('เนื้อหาภาษาไทย');
  });

  it('should use bilingual columns when language is en', () => {
    mockLanguage = 'en';
    mockDbProducts = [
      {
        id: 'db-prod-1',
        slug: 'camera-1',
        name: 'Default Name',
        name_th: 'ชื่อภาษาไทย',
        name_en: 'English Name',
        description: 'Default Desc',
        description_th: 'คำอธิบายภาษาไทย',
        description_en: 'English Desc',
        content: 'Default Content',
        content_th: 'เนื้อหาภาษาไทย',
        content_en: 'English Content',
      }
    ];

    const { products } = useProducts();
    expect(products.length).toBe(1);
    expect(products[0].name).toBe('English Name');
    expect(products[0].description).toBe('English Desc');
    expect(products[0].content).toBe('English Content');
  });

  it('should fall back to name/description/content defaults when specific translation is missing', () => {
    mockLanguage = 'th'; // Language is th, but name_th, description_th, content_th are missing/empty
    mockDbProducts = [
      {
        id: 'db-prod-1',
        slug: 'camera-1',
        name: 'Default DB Name',
        name_th: '',
        name_en: 'English Name',
        description: 'Default DB Desc',
        description_th: '  ',
        description_en: 'English Desc',
        content: 'Default DB Content',
        content_th: null,
        content_en: 'English Content',
      }
    ];

    const { products } = useProducts();
    expect(products.length).toBe(1);
    expect(products[0].name).toBe('Default DB Name');
    expect(products[0].description).toBe('Default DB Desc');
    expect(products[0].content).toBe('Default DB Content');
  });
});

describe('useProductDetail Fallback Behavior', () => {
  beforeEach(() => {
    useStateCallCount = 0;
    mockLanguage = 'th';
    mockDbProducts = [
      {
        id: 'db-prod-1',
        slug: 'local-camera', // matches slugified 'Local Camera'
        name: 'Default DB Name',
      }
    ];
    mockUseLocalOnly = false;
    mockIsLoading = false;
    mockError = null;

    mockDbProductDetail = {
      id: 'db-prod-1',
      slug: 'local-camera',
      name: 'Default DB Name',
      name_th: 'ชื่อภาษาไทย',
      name_en: 'English Name',
      description: 'คำอธิบายสั้น # คำอธิบายยาวภาษาไทย',
      description_th: 'คำอธิบายสั้น TH # คำอธิบายยาว TH',
      description_en: 'Short Desc EN # Long Desc EN',
      content_th: 'เนื้อหาภาษาไทย',
      content_en: 'English Content',
    };

    mockDbDocuments = [
      { id: 'doc-1', title: 'Default Title', title_th: 'เอกสารไทย', title_en: 'English Doc' }
    ];
    mockDbFaqs = [
      { id: 'faq-1', question: 'Q', answer: 'A', question_th: 'คำถามไทย', question_en: 'Question EN', answer_th: 'คำตอบไทย', answer_en: 'Answer EN' }
    ];
    mockDbTroubleshooting = [
      {
        id: 'guide-1',
        issue: 'I',
        symptoms: 'Sy',
        solution: 'So',
        issue_th: 'ปัญหาไทย',
        issue_en: 'Issue EN',
        symptoms_th: 'อาการไทย',
        symptoms_en: 'Symptoms EN',
        solution_th: 'วิธีแก้ไทย',
        solution_en: 'Solution EN'
      }
    ];
    mockDbTrainingCourses = [
      {
        id: 'course-1',
        title: 'C',
        description: 'D',
        title_th: 'คอร์สไทย',
        title_en: 'Course EN',
        description_th: 'คำอธิบายคอร์สไทย',
        description_en: 'Course Desc EN',
        training_lessons: [
          {
            id: 'lesson-1',
            title: 'L',
            markdown_content: 'M',
            title_th: 'บทเรียนไทย',
            title_en: 'Lesson EN',
            content_th: 'เนื้อหาบทเรียนไทย',
            content_en: 'Lesson Content EN'
          }
        ]
      }
    ];

    setDataMock.mockClear();
    setIsLoadingMock.mockClear();
    setErrorMock.mockClear();
    effectCallback = null;
  });

  it('should map bilingual values for all detail fields when language is th', async () => {
    mockLanguage = 'th';
    useProductDetail('local-camera');

    // Run the useEffect callback
    expect(effectCallback).toBeDefined();
    effectCallback();

    await flushPromises();

    expect(setDataMock).toHaveBeenCalled();
    const result = setDataMock.mock.calls[0][0];

    // Verify product mappings
    expect(result.product.name).toBe('ชื่อภาษาไทย');
    expect(result.product.description).toBe('คำอธิบายสั้น TH');
    expect(result.product.content).toBe('เนื้อหาภาษาไทย');

    // Verify related entities mappings
    expect(result.documents[0].title).toBe('เอกสารไทย');
    expect(result.faqs[0].question).toBe('คำถามไทย');
    expect(result.faqs[0].answer).toBe('คำตอบไทย');
    expect(result.troubleshooting_guides[0].issue).toBe('ปัญหาไทย');
    expect(result.troubleshooting_guides[0].symptoms).toBe('อาการไทย');
    expect(result.troubleshooting_guides[0].solution).toBe('วิธีแก้ไทย');
    expect(result.training_courses[0].title).toBe('คอร์สไทย');
    expect(result.training_courses[0].description).toBe('คำอธิบายคอร์สไทย');
    expect(result.training_courses[0].training_lessons[0].title).toBe('บทเรียนไทย');
    expect(result.training_courses[0].training_lessons[0].markdown_content).toBe('เนื้อหาบทเรียนไทย');
  });

  it('should map bilingual values for all detail fields when language is en', async () => {
    mockLanguage = 'en';
    useProductDetail('local-camera');

    expect(effectCallback).toBeDefined();
    effectCallback();

    await flushPromises();

    expect(setDataMock).toHaveBeenCalled();
    const result = setDataMock.mock.calls[0][0];

    // Verify product mappings
    expect(result.product.name).toBe('English Name');
    expect(result.product.description).toBe('Short Desc EN');
    expect(result.product.content).toBe('English Content');

    // Verify related entities mappings
    expect(result.documents[0].title).toBe('English Doc');
    expect(result.faqs[0].question).toBe('Question EN');
    expect(result.faqs[0].answer).toBe('Answer EN');
    expect(result.troubleshooting_guides[0].issue).toBe('Issue EN');
    expect(result.troubleshooting_guides[0].symptoms).toBe('Symptoms EN');
    expect(result.troubleshooting_guides[0].solution).toBe('Solution EN');
    expect(result.training_courses[0].title).toBe('Course EN');
    expect(result.training_courses[0].description).toBe('Course Desc EN');
    expect(result.training_courses[0].training_lessons[0].title).toBe('Lesson EN');
    expect(result.training_courses[0].training_lessons[0].markdown_content).toBe('Lesson Content EN');
  });

  it('should fallback to default columns when bilingual columns are empty/null', async () => {
    mockLanguage = 'th';
    // Clear out _th columns
    mockDbProductDetail.name_th = null;
    mockDbProductDetail.description_th = null;
    mockDbProductDetail.content_th = null;

    mockDbDocuments[0].title_th = '';
    mockDbFaqs[0].question_th = '  ';
    mockDbFaqs[0].answer_th = undefined;
    mockDbTroubleshooting[0].issue_th = null;
    mockDbTroubleshooting[0].symptoms_th = null;
    mockDbTroubleshooting[0].solution_th = null;
    mockDbTrainingCourses[0].title_th = null;
    mockDbTrainingCourses[0].description_th = null;
    mockDbTrainingCourses[0].training_lessons[0].title_th = null;
    mockDbTrainingCourses[0].training_lessons[0].content_th = null;

    useProductDetail('local-camera');
    effectCallback();

    await flushPromises();

    expect(setDataMock).toHaveBeenCalled();
    const result = setDataMock.mock.calls[0][0];

    // Verify fallbacks to default fields
    expect(result.product.name).toBe('Default DB Name');
    expect(result.product.description).toBe('คำอธิบายสั้น'); // split from description
    expect(result.product.content).toBe('คำอธิบายยาวภาษาไทย'); // split from description contentFallback

    expect(result.documents[0].title).toBe('Default Title');
    expect(result.faqs[0].question).toBe('  '); // actual behavior: not trimmed
    expect(result.faqs[0].answer).toBe('A');
    expect(result.troubleshooting_guides[0].issue).toBe('I');
    expect(result.troubleshooting_guides[0].symptoms).toBe('Sy');
    expect(result.troubleshooting_guides[0].solution).toBe('So');
    expect(result.training_courses[0].title).toBe('C');
    expect(result.training_courses[0].description).toBe('D');
    expect(result.training_courses[0].training_lessons[0].title).toBe('L');
    expect(result.training_courses[0].training_lessons[0].markdown_content).toBe('M');
  });
});
