import { Lesson } from '../types';

export interface CompletionState {
  isTimeMet: boolean;
  isVideoCompleted?: boolean;
  isQuizPassed?: boolean;
  isExercisePassed?: boolean;
  readingProgress?: number;
}

export class LessonCompletionService {
  /**
   * Determines if a lesson has satisfied all requirements for completion.
   *
   * @param lesson The lesson data from the database
   * @param state The current interactive state of the user in the lesson
   * @returns true if the lesson can be marked complete, false otherwise
   */
  static evaluateCompletion(lesson: Lesson | null, state: CompletionState): boolean {
    if (!lesson) return false;

    // Time condition is foundational for ALL lesson types if duration_minutes > 0
    if (!state.isTimeMet && lesson.duration_minutes && lesson.duration_minutes > 0) {
      return false;
    }

    // Check quiz requirements (applies to ANY lesson type that has quiz data)
    const hasQuiz = lesson.quiz_data && 
                   typeof lesson.quiz_data === 'object' && 
                   'questions' in lesson.quiz_data && 
                   Array.isArray((lesson.quiz_data as any).questions) &&
                   (lesson.quiz_data as any).questions.length > 0;

    if (hasQuiz && !state.isQuizPassed) {
      return false;
    }

    // Type-specific requirements
    switch (lesson.lesson_type) {
      case 'video':
        // For video lessons, video must be completed
        if (!state.isVideoCompleted) return false;
        break;

      case 'reading':
        // For reading lessons, user must scroll to bottom (or very near)
        if ((state.readingProgress || 0) < 95) return false;
        break;

      case 'exercise':
        // For code exercise lessons, the exercise must be passed
        // Note: Python checkpoints might be an exception if we don't have code validation yet,
        // but generally, exercise lessons require passing the exercise.
        if (lesson.id.startsWith('lesson-python-01')) {
           // Special case for the manual python checkpoint lesson - handled via handleMarkCheckpointComplete
           // For the overall lesson, if it's the checkpoint lesson, we'll just return true if time is met and quiz is passed
           // but ideally this is handled by checking if all checkpoints are done.
           // For now, allow it to pass if other conditions met, as checkpoint completion is manually saved.
           return true; 
        }
        
        if (!state.isExercisePassed) return false;
        break;

      case 'quiz':
        // Pure quiz lesson (just in case)
        if (!state.isQuizPassed) return false;
        break;
        
      default:
        // Unknown type, just rely on time and quiz
        break;
    }

    return true;
  }
}
