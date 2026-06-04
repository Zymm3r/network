import { useState, useEffect } from 'react';
import { useI18n } from '../i18n';
import { useLessons } from '../hooks/useLessons';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { LessonCard } from '../components/lesson/LessonCard';
import { Skeleton } from '../components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { FlaskConical, Video, FileQuestion, PenTool, BookOpen, CheckCircle2, Clock } from 'lucide-react';
import QuizCard from '../components/QuizCard';
import ExerciseCard from '../components/ExerciseCard';

const lessonTypes = [
  { key: 'all', label: 'ทั้งหมด', icon: FlaskConical },
  { key: 'video', label: 'วิดีโอ', icon: Video },
  { key: 'quiz', label: 'แบบทดสอบ', icon: FileQuestion },
  { key: 'exercise', label: 'แบบฝึกหัด', icon: PenTool },
  { key: 'reading', label: 'เอกสาร', icon: BookOpen },
];

export function Lessons() {
  const { t } = useI18n();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const { lessons, loading, error } = useLessons({ limit: 100 });
  const [userProgressList, setUserProgressList] = useState<{ lesson_id: string; status: string }[]>([]);

  useEffect(() => {
    const fetchUserProgress = async () => {
      if (!user?.id) return;
      try {
        const { data, error: progressErr } = await supabase
          .from('user_progress')
          .select('lesson_id, status')
          .eq('user_id', user.id);

        if (!progressErr && data) {
          setUserProgressList(data);
        }
      } catch (err) {
        console.error('Failed to fetch user progress stats:', err);
      }
    };

    fetchUserProgress();
  }, [user?.id]);

  const filteredLessons = activeTab === 'all'
    ? lessons
    : lessons.filter(l => l.lesson_type === activeTab);

  const lessonIdsSet = new Set(lessons.map(l => l.id));
  const completedCount = userProgressList.filter(
    p => p.status === 'completed' && lessonIdsSet.has(p.lesson_id)
  ).length;

  const inProgressCount = userProgressList.filter(
    p => p.status === 'in_progress' && lessonIdsSet.has(p.lesson_id)
  ).length;

  const stats = {
    total: lessons.length,
    completed: completedCount,
    inProgress: inProgressCount,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">แบบฝึกหัด</h1>
        <p className="text-muted-foreground">ฝึกฝนทักษะการสร้างเครือข่าย</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
          <CardContent className="pt-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <div className="text-xl font-bold">{stats.total}</div>
              <div className="text-xs text-muted-foreground">ทั้งหมด</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-xl font-bold">{stats.completed}</div>
              <div className="text-xs text-muted-foreground">เสร็จสิ้น</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-xl font-bold">{stats.inProgress}</div>
              <div className="text-xs text-muted-foreground">กำลังทำ</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-50">
          {lessonTypes.map((type) => (
            <TabsTrigger key={type.key} value={type.key} className="gap-1.5">
              <type.icon className="w-4 h-4" />
              {type.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Content Area */}
      {activeTab === 'quiz' ? (
        <div className="max-w-4xl mx-auto">
          <QuizCard />
        </div>
      ) : activeTab === 'exercise' ? (
        <div className="max-w-5xl mx-auto">
          <ExerciseCard />
        </div>
      ) : error ? (
        <div className="p-4 rounded-lg bg-red-50 text-red-600 border border-red-100">
          {t.common.error}: {error.message}
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredLessons.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <FlaskConical className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">ไม่พบเนื้อหา</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      )}
    </div>
  );
}