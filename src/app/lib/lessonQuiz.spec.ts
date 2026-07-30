import { describe, expect, it } from 'vitest';
import type { LessonQuizData } from '../types';
import { getLessonQuizQuestions } from './lessonQuiz';

const quizData: LessonQuizData = {
  questions: Array.from({ length: 5 }, (_, index) => ({
    question_th: `TH ${index + 1}`,
    question_en: `EN ${index + 1}`,
    options: ['A', 'B', 'C', 'D'],
    options_th: ['กองหน้า', 'กองกลาง', 'กองหลัง', 'ผู้รักษาประตู'],
    correct_index: index % 4,
    explanation_th: `TH explanation ${index + 1}`,
    explanation_en: `EN explanation ${index + 1}`,
  })),
};

describe('getLessonQuizQuestions', () => {
  it('maps all five database questions in the selected language', () => {
    const questions = getLessonQuizQuestions(quizData, 'th');

    expect(questions).toHaveLength(5);
    expect(questions[0]).toMatchObject({
      id: 1,
      question: 'TH 1',
      choices: ['กองหน้า', 'กองกลาง', 'กองหลัง', 'ผู้รักษาประตู'],
      correctIndex: 0,
      explanation: 'TH explanation 1',
    });
  });

  it('keeps the English options and correct index when English is selected', () => {
    const [question] = getLessonQuizQuestions(quizData, 'en');

    expect(question.choices).toEqual(['A', 'B', 'C', 'D']);
    expect(question.correctIndex).toBe(0);
  });

  it('falls back to source options when Thai options are incomplete', () => {
    const incomplete: LessonQuizData = {
      questions: [{ ...quizData.questions[0], options_th: ['ตัวเลือกเดียว'] }],
    };

    expect(getLessonQuizQuestions(incomplete, 'th')[0].choices).toEqual(['A', 'B', 'C', 'D']);
  });

  it('drops malformed questions instead of crashing the quiz', () => {
    const malformed: LessonQuizData = {
      questions: [{ ...quizData.questions[0], correct_index: 8 }],
    };

    expect(getLessonQuizQuestions(malformed, 'en')).toEqual([]);
  });
});
