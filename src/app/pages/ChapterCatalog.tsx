import { useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLessons } from '../hooks/useLessons';
import { useLessonsProgress } from '../hooks/useProgress';
import { LessonCard } from '../components/lesson/LessonCard';
import { Skeleton } from '../components/ui/skeleton';

/** The canonical /lessons route. Its source of truth is public.lessons. */
export function ChapterCatalog() {
  const { user } = useAuth();
  const { lessons, loading, error } = useLessons({ limit: 200 });
  const lessonIds = useMemo(() => lessons.map(lesson => lesson.id), [lessons]);
  const { completedLessonIds, loading: progressLoading } = useLessonsProgress(user?.id || '', lessonIds);

  if (loading || progressLoading) {
    return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 9 }, (_, index) => <Skeleton key={index} className="h-72 rounded-2xl" />)}</div>;
  }

  if (error) {
    return <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">Unable to load chapters. Please try again.</div>;
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600"><BookOpen className="h-5 w-5" /></div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">บทเรียนทั้งหมด</h1>
          <p className="text-sm text-slate-500">เลือก chapter เพื่อเรียนและทำกิจกรรมภายในบทเรียนนั้น</p>
        </div>
      </div>

      {lessons.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">No chapters are available yet.</div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {lessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson} isCompleted={completedLessonIds.has(lesson.id)} />)}
        </div>
      )}
    </div>
  );
}
