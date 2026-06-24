export interface Product {
  id: string;
  name: string;
  category: string;
  slug: string;
  description: string;
  content?: string;
  image_url: string;
  source_url: string;
  name_th?: string;
  name_en?: string;
  description_th?: string;
  description_en?: string;
  content_th?: string;
  content_en?: string;
}

export interface RawProduct {
  id?: string;
  title?: string;
  url?: string;
  image?: string;
  description?: string;
}

export interface Document {
  id: string;
  title: string;
  document_type: string;
  file_url: string;
  markdown_content?: string;
  created_at: string;
  title_th?: string;
  title_en?: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  created_at: string;
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
  title_th?: string;
  title_en?: string;
  description_th?: string;
  description_en?: string;
}

export interface ProductDetailData {
  product: Product | null;
  documents: Document[];
  faqs: Faq[];
  troubleshooting_guides: TroubleshootingGuide[];
  training_courses: TrainingCourse[];
}
