import { describe, expect, it } from 'vitest';
import type { LessonQuizData } from '../types';
import { getLessonQuizQuestions } from './lessonQuiz';

const quizData: LessonQuizData = {
  questions: Array.from({ length: 5 }, (_, index) => ({
    question_th: `TH ${index + 1}`,
    question_en: `EN ${index + 1}`,
    options: ['A', 'B', 'C', 'D'],
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
      choices: ['A', 'B', 'C', 'D'],
      correctIndex: 0,
      explanation: 'TH explanation 1',
    });
  });

  it('drops malformed questions instead of crashing the quiz', () => {
    const malformed: LessonQuizData = {
      questions: [{ ...quizData.questions[0], correct_index: 8 }],
    };

    expect(getLessonQuizQuestions(malformed, 'en')).toEqual([]);
  });
});
