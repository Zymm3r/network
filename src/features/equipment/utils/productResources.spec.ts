import { describe, expect, it } from 'vitest';
import {
  filterDocuments,
  filterTrainingCourses,
  filterTroubleshootingGuides,
  hasUsableResourceUrl,
} from './productResources';

describe('product resource filters', () => {
  it('keeps real resource URLs and rejects missing or placeholder URLs', () => {
    expect(hasUsableResourceUrl('https://cdn.example.org/manual.pdf')).toBe(true);
    expect(hasUsableResourceUrl('https://example.com/manual.pdf')).toBe(false);
    expect(hasUsableResourceUrl(null)).toBe(false);

    const documents = filterDocuments([
      { id: 'real', title: 'Manual', document_type: 'PDF', file_url: 'https://cdn.example.org/manual.pdf', created_at: '' },
      { id: 'fake', title: 'Datasheet', document_type: 'PDF', file_url: 'https://example.com/data.pdf', created_at: '' },
      { id: 'empty', title: 'Guide', document_type: 'PDF', file_url: '', created_at: '' },
    ]);

    expect(documents.map((document) => document.id)).toEqual(['real']);
  });

  it('removes the generated no-power troubleshooting placeholder', () => {
    const guides = filterTroubleshootingGuides([
      { id: 'placeholder', issue: 'เปิดไม่ติด / No Power', symptoms: 'Generated', solution: 'Generated', created_at: '' },
      { id: 'specific', issue: 'PoE negotiation fails', symptoms: 'No link', solution: 'Check the switch', created_at: '' },
    ]);

    expect(guides.map((guide) => guide.id)).toEqual(['specific']);
  });

  it('keeps only courses and lessons with playable videos', () => {
    const courses = filterTrainingCourses([
      { id: 'empty', title: 'Empty', description: '', difficulty: 'Beginner', created_at: '' },
      { id: 'course-video', title: 'Course video', description: '', difficulty: 'Beginner', video_url: 'https://video.example.org/course', created_at: '' },
      {
        id: 'lesson-video',
        title: 'Lesson video',
        description: '',
        difficulty: 'Beginner',
        created_at: '',
        training_lessons: [
          { id: 'playable', course_id: 'lesson-video', title: 'Play', lesson_order: 1, video_url: 'https://video.example.org/lesson', created_at: '' },
          { id: 'missing', course_id: 'lesson-video', title: 'Missing', lesson_order: 2, created_at: '' },
        ],
      },
    ]);

    expect(courses.map((course) => course.id)).toEqual(['course-video', 'lesson-video']);
    expect(courses[1].training_lessons?.map((lesson) => lesson.id)).toEqual(['playable']);
  });
});
