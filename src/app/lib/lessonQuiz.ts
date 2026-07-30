import type { QuizQuestion } from '../data/courseQuizData';
import type { LessonQuizData } from '../types';

export function getLessonQuizQuestions(
  quizData: LessonQuizData | null | undefined,
  language: 'th' | 'en'
): QuizQuestion[] {
  if (!quizData || !Array.isArray(quizData.questions)) return [];

  return quizData.questions
    .filter(question => (
      Array.isArray(question.options)
      && question.options.length >= 2
      && Number.isInteger(question.correct_index)
      && question.correct_index >= 0
      && question.correct_index < question.options.length
    ))
    .map((question, index) => ({
      id: index + 1,
      question: language === 'th'
        ? question.question_th || question.question_en
        : question.question_en || question.question_th,
      choices: language === 'th'
        && Array.isArray(question.options_th)
        && question.options_th.length === question.options.length
        ? question.options_th
        : question.options,
      correctIndex: question.correct_index,
      explanation: language === 'th'
        ? question.explanation_th || question.explanation_en || ''
        : question.explanation_en || question.explanation_th || '',
      hint: language === 'th'
        ? question.hint_th || question.hint_en || undefined
        : question.hint_en || question.hint_th || undefined,
    }));
}
