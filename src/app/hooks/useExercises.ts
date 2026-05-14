import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { PracticeExercise } from '../types';

interface UseExercisesOptions {
  lessonId: string;
}

interface UseExercisesResult {
  exercises: PracticeExercise[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useExercises(options: UseExercisesOptions): UseExercisesResult {
  const { lessonId } = options;

  const [exercises, setExercises] = useState<PracticeExercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchExercises = useCallback(async () => {
    if (!lessonId) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('practice_exercises')
        .select('*')
        .eq('lesson_id', lessonId);

      if (fetchError) throw fetchError;

      setExercises(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch exercises'));
      setExercises([]);
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  return { exercises, loading, error, refetch: fetchExercises };
}

interface SubmitAnswerResult {
  isCorrect: boolean;
  explanation?: string;
}

export function useExerciseSubmit(lessonId: string) {
  const [loading, setLoading] = useState(false);

  const submitAnswer = useCallback(async (
    exerciseId: string,
    userAnswerIndex: number
  ): Promise<SubmitAnswerResult> => {
    if (!lessonId) {
      throw new Error('Lesson ID is required');
    }

    try {
      setLoading(true);

      const { data: exercise, error: fetchError } = await supabase
        .from('practice_exercises')
        .select('correct_index, explanation_en, explanation_th')
        .eq('id', exerciseId)
        .eq('lesson_id', lessonId)
        .single();

      if (fetchError || !exercise) {
        throw new Error('Exercise not found');
      }

      const isCorrect = userAnswerIndex === exercise.correct_index;

      return {
        isCorrect,
        explanation: exercise.explanation_en || exercise.explanation_th || undefined,
      };
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to submit answer');
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  return { submitAnswer, loading };
}