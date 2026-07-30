import type {
  Document,
  TrainingCourse,
  TrainingLesson,
  TroubleshootingGuide,
} from '../types/product';

const generatedTroubleshootingIssue = 'เปิดไม่ติด / No Power';

export function hasUsableResourceUrl(value: unknown): value is string {
  if (typeof value !== 'string' || !value.trim()) return false;

  try {
    const url = new URL(value.trim(), 'https://local.invalid');
    return ['http:', 'https:'].includes(url.protocol)
      && !/(^|\.)example\.com$/i.test(url.hostname);
  } catch {
    return false;
  }
}

export function filterDocuments(documents: Document[]): Document[] {
  return documents.filter((document) => hasUsableResourceUrl(document.file_url));
}

export function filterTroubleshootingGuides(
  guides: TroubleshootingGuide[],
): TroubleshootingGuide[] {
  return guides.filter((guide) => guide.issue.trim() !== generatedTroubleshootingIssue);
}

export function filterTrainingCourses(courses: TrainingCourse[]): TrainingCourse[] {
  return courses.flatMap((course) => {
    const playableLessons = (course.training_lessons || []).filter(
      (lesson: TrainingLesson) => hasUsableResourceUrl(lesson.video_url),
    );

    if (!hasUsableResourceUrl(course.video_url) && playableLessons.length === 0) return [];
    return [{ ...course, training_lessons: playableLessons }];
  });
}
