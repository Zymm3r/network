import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('LessonDetail section order', () => {
  it('places reading content before comprehension practice', () => {
    const source = readFileSync(new URL('./LessonDetail.tsx', import.meta.url), 'utf8');
    const readingWithContent = source.indexOf('{isReadingLesson && readingContent && (');
    const readingWithoutContent = source.indexOf('{isReadingLesson && !readingContent && (');
    const practiceTabs = source.indexOf('{/* Practice Tabs (Quiz & Exercise) for all lessons */}');

    expect(readingWithContent).toBeGreaterThan(-1);
    expect(readingWithoutContent).toBeGreaterThan(-1);
    expect(practiceTabs).toBeGreaterThan(-1);
    expect(readingWithContent).toBeLessThan(practiceTabs);
    expect(readingWithoutContent).toBeLessThan(practiceTabs);
  });
});
