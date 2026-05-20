import { useParams, Link, useNavigate } from 'react-router';
import { useI18n } from '../i18n';
import { useCourses } from '../hooks/useCourses';
import { useLessons } from '../hooks/useLessons';
import { useAuth } from '../hooks/useAuth';
import { useLessonsProgress } from '../hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { ArrowLeft, BookOpen, CheckCircle, ChevronRight, Play, FileText, HelpCircle } from 'lucide-react';

const lessonTypeIcons: Record<string, typeof Play> = {
  video: Play,
  reading: FileText,
  quiz: HelpCircle,
  exercise: HelpCircle,
};

export function CourseLearn() {
  const { courseId } = useParams();
  const { language, t } = useI18n();
  const navigate = useNavigate();

  const { user } = useAuth();
  const { courses, loading: coursesLoading } = useCourses({ limit: 100 });
  const { lessons, loading: lessonsLoading } = useLessons({ courseId, limit: 50 });

  const lessonIds = lessons.map(l => l.id);
  const { completedLessonIds } = useLessonsProgress(user?.id || '', lessonIds);

  const course = courses.find(c => c.id === courseId);

  if (coursesLoading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-xl font-semibold mb-2">ไม่พบหลักสูตร</h2>
        <Button onClick={() => navigate('/courses')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          กลับไปหน้าหลักสูตร
        </Button>
      </div>
    );
  }

  const name = language === 'th' ? course.name_th : course.name_en;
  const description = language === 'th' ? course.description_th : course.description_en;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Back button */}
      <Link
        to={`/courses/${courseId}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.common.back || 'กลับไปหน้ารายละเอียด'}
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content Area */}
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{name}</h1>
            <div className="prose prose-indigo max-w-none">
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-indigo-900 text-lg leading-relaxed shadow-sm">
                <h3 className="text-indigo-800 font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  เนื้อหาที่ต้องเรียนรู้ (Course Description)
                </h3>
                <p>{description}</p>
              </div>
            </div>
          </div>

          {/* Additional details based on the course structure */}
          {course.prerequisites && course.prerequisites.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ความรู้พื้นฐานที่ควรมี (Prerequisites)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.prerequisites.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <span className="text-indigo-500 mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar: Lessons Navigation */}
        <div className="w-full md:w-80 shrink-0">
          <div className="sticky top-6">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-slate-50 border-b border-slate-100">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>เนื้อหาบทเรียน</span>
                  <span className="text-sm font-normal text-muted-foreground">{lessons.length} บท</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {lessonsLoading ? (
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : lessons.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground text-sm">
                    ยังไม่มีเนื้อหาบทเรียน
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 max-h-[60vh] overflow-y-auto">
                     {lessons.map((lesson, idx) => {
                      const lessonName = language === 'th' ? lesson.title_th : lesson.title_en;
                      const Icon = lessonTypeIcons[lesson.lesson_type] || BookOpen;
                      const isCompleted = completedLessonIds.has(lesson.id);
                      
                      return (
                        <Link 
                          key={lesson.id} 
                          to={`/lessons/${lesson.id}`}
                          className={`flex items-start gap-3 p-4 hover:bg-slate-50 transition-colors group ${isCompleted ? 'bg-green-50/10' : ''}`}
                        >
                          <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors mt-0.5 ${
                            isCompleted 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                          }`}>
                            {isCompleted ? <CheckCircle className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="font-medium text-sm text-slate-900 group-hover:text-indigo-700 transition-colors flex items-center gap-1.5 flex-wrap">
                              <span>{idx + 1}. {lessonName}</span>
                              {isCompleted && (
                                <span className="text-[9px] bg-green-100/80 text-green-700 border border-green-200 px-1.5 py-0.5 rounded-full font-semibold">
                                  เรียนแล้ว
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-500 mt-1 capitalize">
                              {lesson.lesson_type} {lesson.duration_minutes ? `• ${lesson.duration_minutes} นาที` : ''}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
