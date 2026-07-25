import { describe, it, expect } from 'vitest';
import { Lesson } from './index';

describe('Lesson interface type checks', () => {
  it('should allow quiz_data property on a Lesson object', () => {
    const mockLesson: Lesson = {
      id: 'lesson-1',
      course_id: 'course-1',
      title_th: 'บทเรียนทดสอบ',
      title_en: 'Test Lesson',
      content_th: 'เนื้อหา',
      content_en: 'Content',
      lesson_type: 'quiz',
      duration_minutes: 10,
      order_index: 1,
      video_url: null,
      thumbnail_url: null,
      difficulty: 'easy',
      quiz_data: {
        questions: [
          {
            question_en: 'What is 1 + 1?',
            question_th: '1 + 1 ได้เท่าไหร่?',
            options: ['1', '2', '3'],
            correct_index: 1
          }
        ]
      },
      created_at: '2026-07-14T14:35:27Z',
      updated_at: '2026-07-14T14:35:27Z'
    };

    expect(mockLesson.quiz_data).toBeDefined();
    expect(mockLesson.quiz_data.questions).toHaveLength(1);
    expect(mockLesson.quiz_data.questions[0].correct_index).toBe(1);
  });

  it('should allow quiz_data to be omitted', () => {
    const mockLesson: Lesson = {
      id: 'lesson-2',
      course_id: 'course-1',
      title_th: 'บทเรียนทดสอบ 2',
      title_en: 'Test Lesson 2',
      content_th: 'เนื้อหา',
      content_en: 'Content',
      lesson_type: 'video',
      duration_minutes: 15,
      order_index: 2,
      video_url: 'https://example.com/video.mp4',
      thumbnail_url: 'https://example.com/thumb.png',
      difficulty: null,
      created_at: '2026-07-14T14:35:27Z',
      updated_at: '2026-07-14T14:35:27Z'
    };

    expect(mockLesson.quiz_data).toBeUndefined();
  });
});
