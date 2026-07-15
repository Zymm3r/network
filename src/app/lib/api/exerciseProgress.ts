import { supabase } from '../supabase';

export type ExerciseProgressStatus = 'not_started' | 'in_progress' | 'completed';

export interface ExerciseProgress {
  id: string;
  user_id: string;
  exercise_id: string;
  lesson_id: string | null;
  course_id: string | null;
  started_at: string | null;
  completed_at: string | null;
  last_activity_at: string;
  time_spent_seconds: number;
  progress_percentage: number;
  status: ExerciseProgressStatus;
  score: number | null;
  attempts: number;
  checkpoint_data: Record<string, unknown>;
  answers: Record<string, unknown>;
  updated_at: string;
  created_at: string;
}

export interface ExerciseProgressIdentity {
  userId: string;
  exerciseId: string;
  lessonId?: string;
  courseId?: string;
}

export type ExerciseProgressUpdate = Partial<Pick<ExerciseProgress,
  'started_at' | 'completed_at' | 'last_activity_at' | 'time_spent_seconds' |
  'progress_percentage' | 'status' | 'score' | 'attempts' | 'checkpoint_data' | 'answers'>>;

export class ExerciseProgressService {
  async loadProgress({ userId, exerciseId }: ExerciseProgressIdentity): Promise<ExerciseProgress | null> {
    const { data, error } = await supabase.from('exercise_progress').select('*')
      .eq('user_id', userId).eq('exercise_id', exerciseId).maybeSingle();
    if (error) throw error;
    return data as ExerciseProgress | null;
  }

  async saveProgress(identity: ExerciseProgressIdentity, update: ExerciseProgressUpdate): Promise<ExerciseProgress> {
    const now = new Date().toISOString();
    const payload = {
      user_id: identity.userId, exercise_id: identity.exerciseId,
      lesson_id: identity.lessonId || null, course_id: identity.courseId || null,
      ...update, last_activity_at: update.last_activity_at || now,
    };
    const { data, error } = await supabase.from('exercise_progress').upsert(payload, {
      onConflict: 'user_id,exercise_id',
    }).select().single();
    if (error) throw error;
    return data as ExerciseProgress;
  }

  markStarted(identity: ExerciseProgressIdentity) {
    const now = new Date().toISOString();
    return this.saveProgress(identity, { status: 'in_progress', started_at: now, last_activity_at: now });
  }
  updateAnswer(identity: ExerciseProgressIdentity, answers: Record<string, unknown>, update: ExerciseProgressUpdate = {}) {
    return this.saveProgress(identity, { ...update, status: 'in_progress', answers });
  }
  updateCheckpoint(identity: ExerciseProgressIdentity, checkpoint_data: Record<string, unknown>, update: ExerciseProgressUpdate = {}) {
    return this.saveProgress(identity, { ...update, status: 'in_progress', checkpoint_data });
  }
  updateTimer(identity: ExerciseProgressIdentity, time_spent_seconds: number, update: ExerciseProgressUpdate = {}) {
    return this.saveProgress(identity, { ...update, status: 'in_progress', time_spent_seconds });
  }
  markCompleted(identity: ExerciseProgressIdentity, update: ExerciseProgressUpdate = {}) {
    const now = new Date().toISOString();
    return this.saveProgress(identity, { ...update, status: 'completed', progress_percentage: 100, completed_at: update.completed_at || now });
  }
  async syncOfflineQueue(queue: Array<{ identity: ExerciseProgressIdentity; update: ExerciseProgressUpdate }>) {
    for (const entry of queue) await this.saveProgress(entry.identity, entry.update);
  }
}

export const exerciseProgressService = new ExerciseProgressService();
