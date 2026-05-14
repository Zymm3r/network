export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type AvailabilityStatus = 'available' | 'limited' | 'full' | 'coming_soon';
export type ExerciseDifficulty = 'easy' | 'moderate' | 'challenging';
export type ResourceType = 'tool' | 'tutorial' | 'documentation' | 'video' | 'external_link';
export type PathType = 'sequential' | 'optional' | 'milestone';

export interface Course {
  id: string;
  name_th: string;
  name_en: string;
  description_th: string | null;
  description_en: string | null;
  level: CourseLevel;
  price_per_module: number;
  min_modules: number;
  availability: AvailabilityStatus;
  includes: string[] | null;
  highlights: string[] | null;
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title_th: string;
  title_en: string;
  content_th: string | null;
  content_en: string | null;
  lesson_type: 'video' | 'quiz' | 'exercise' | 'reading';
  duration_minutes: number | null;
  order_index: number;
  video_url: string | null;
  thumbnail_url: string | null;
  difficulty: ExerciseDifficulty | null;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  completed_at: string | null;
  status: 'active' | 'completed' | 'dropped';
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at: string | null;
  time_spent_seconds: number;
  last_accessed_at: string;
}

export interface LearningPath {
  id: string;
  name_th: string;
  name_en: string;
  description_th: string | null;
  description_en: string | null;
  path_type: PathType;
  course_ids: string[];
  created_at: string;
  updated_at: string;
}

export interface Resource {
  id: string;
  name_th: string;
  name_en: string;
  description_th: string | null;
  description_en: string | null;
  resource_type: ResourceType;
  url: string | null;
  location_lat: number | null;
  location_lng: number | null;
  address_th: string | null;
  address_en: string | null;
  thumbnail_url: string | null;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name_th: string | null;
  full_name_en: string | null;
  avatar_url: string | null;
  role: 'student' | 'instructor' | 'admin';
  created_at: string;
}

export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  issued_at: string;
  certificate_url: string | null;
}

export interface UserBookmark {
  id: string;
  user_id: string;
  course_id: string | null;
  lesson_id: string | null;
  created_at: string;
}

export interface PracticeExercise {
  id: string;
  lesson_id: string;
  question_th: string;
  question_en: string;
  options: string[];
  correct_index: number;
  explanation_th: string | null;
  explanation_en: string | null;
}