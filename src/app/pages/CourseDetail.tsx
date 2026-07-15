import { useParams, Link, useNavigate } from 'react-router';
import { useI18n } from '../i18n';
import { useCourses } from '../hooks/useCourses';
import { useLessons } from '../hooks/useLessons';
import { useAuth } from '../hooks/useAuth';
import { useLessonsProgress } from '../hooks/useProgress';
import { supabase } from '../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowLeft, Clock, BookOpen, Users, ChevronRight, Play, FileText, HelpCircle, CheckCircle2, PenTool, FlaskConical, Video } from 'lucide-react';
import QuizCard from '../components/QuizCard';
import ExerciseCard from '../components/ExerciseCard';
import { useState } from 'react';

const lessonTypeIcons: Record<string, typeof Play> = {
  video: Play,
  reading: FileText,
  quiz: HelpCircle,
  exercise: HelpCircle,
};

const levelColors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700 border-green-200',
  intermediate: 'bg-amber-100 text-amber-700 border-amber-200',
  advanced: 'bg-red-100 text-red-700 border-red-200',
};

const lessonTypesTab = [
  { key: 'all', labelKey: 'lessonTypeAll', icon: FlaskConical },
  { key: 'video', labelKey: 'lessonTypeVideo', icon: Video },
  { key: 'quiz', labelKey: 'lessonTypeQuiz', icon: HelpCircle },
  { key: 'exercise', labelKey: 'lessonTypeExercise', icon: PenTool },
  { key: 'reading', labelKey: 'lessonTypeReading', icon: FileText },
];

export function CourseDetail() {
  const { courseId } = useParams();
  const { language, t } = useI18n();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const { user } = useAuth();
  const { courses, loading: coursesLoading } = useCourses({ limit: 100 });
  const { lessons, loading: lessonsLoading } = useLessons({ courseId, limit: 50 });

  const lessonIds = lessons.map(l => l.id);
  const { completedLessonIds } = useLessonsProgress(user?.id || '', lessonIds);

  const course = courses.find(c => c.id === courseId);

  if (coursesLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-64 w-full rounded-xl" />
        <div className="grid gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-xl font-semibold mb-2">{t.courses.notFound}</h2>
        <p className="text-muted-foreground mb-4">{t.courses.notFoundDesc}</p>
        <Button onClick={() => navigate('/courses')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.courses.backToCourses}
        </Button>
      </div>
    );
  }

  const name = course[`name_${language}` as 'name_th' | 'name_en'];
  const description = course[`description_${language}` as 'description_th' | 'description_en'];
  const includes = course.includes || [];
  const highlights = course.highlights || [];

  const filteredLessons = activeTab === 'all'
    ? lessons
    : lessons.filter(l => l.lesson_type === activeTab);

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link
        to="/courses"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.common.back}
      </Link>

      {/* Course Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 p-6 md:p-8 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20" />
        <div className="relative z-10">
          <Badge className={`${levelColors[course.level]} border mb-4`}>
            {t.levels[course.level]}
          </Badge>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{name}</h1>
          {description && (
            <p className="text-indigo-100 mb-4 max-w-2xl">{description}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>{course.min_modules || 1} {t.courseDetail.modules}</span>
            </div>
            {course.enrolled_count !== undefined && course.enrolled_count > 0 && (
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{course.enrolled_count}+ {t.courseDetail.students}</span>
              </div>
            )}
            {course.rating !== null && (
              <div className="flex items-center gap-1.5">
                <span>⭐ {course.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Duration & CTA */}
      <Card className="border-slate-100">
        <CardContent className="pt-6 flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">{t.courseDetail.lessons}</div>
            <div className="text-3xl font-bold text-indigo-600">
              {course.minutes_per_lesson ? `${course.minutes_per_lesson} ${t.courseDetail.minutes}` : t.coursesList.free}
              {course.minutes_per_lesson && (
                <span className="text-sm font-normal text-muted-foreground">{t.courseDetail.perLesson}</span>
              )}
            </div>
          </div>
          {user ? (
            <Button 
              size="lg" 
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={async (e) => {
                e.preventDefault();
                try {
                  const { error } = await supabase.from('enrollments').upsert({
                    user_id: user.id,
                    course_id: course.id,
                    status: 'active',
                    last_accessed_at: new Date().toISOString()
                  }, { onConflict: 'user_id,course_id' });
                  
                  if (error) console.error('Enrollment error:', error);
                } catch (err) {
                  console.error('Failed to enroll:', err);
                } finally {
                  navigate(`/courses/${course.id}/learn`);
                }
              }}
            >
                {t.courseDetail.startLearning}
                <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Link to={`/courses/${course.id}/learn`}>
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                {t.courseDetail.startLearning}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>

      {/* What You'll Learn */}
      {highlights.length > 0 && (
        <Card className="border-slate-100">
          <CardHeader>
            <CardTitle>{t.courseDetail.whatYouWillLearn}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-3 md:grid-cols-2">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* What's Included */}
      {includes.length > 0 && (
        <Card className="border-slate-100">
          <CardHeader>
            <CardTitle>{t.courseDetail.whatsIncluded}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {includes.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lessons Filter Tabs & List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{t.courseDetail.courseContent.replace('{count}', lessons.length.toString())}</h2>
        </div>
        
        {/* Filter Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-slate-50 flex flex-wrap h-auto p-1 gap-1">
            {lessonTypesTab.map((type) => (
              <TabsTrigger key={type.key} value={type.key} className="gap-1.5 min-w-[80px]">
                <type.icon className="w-4 h-4" />
                {t.courseDetail[type.labelKey as keyof typeof t.courseDetail]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {activeTab === 'quiz' ? (
          <div className="max-w-4xl mx-auto">
            <QuizCard courseName={name} courseId={courseId} />
          </div>
        ) : activeTab === 'exercise' ? (
          <div className="max-w-5xl mx-auto">
            <ExerciseCard courseName={name} courseId={courseId} />
          </div>
        ) : lessonsLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        ) : filteredLessons.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">{t.lessons.noContent}</p>
              <p className="text-sm text-muted-foreground mt-1">{t.lessons.noContentDesc}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredLessons.map((lesson, index) => {
              const lessonName = lesson[`title_${language}` as 'title_th' | 'title_en'];
              const Icon = lessonTypeIcons[lesson.lesson_type] || BookOpen;
              const isCompleted = completedLessonIds.has(lesson.id);

              return (
                <Link
                  key={lesson.id}
                  to={`/lessons/${lesson.id}`}
                  className="block"
                >
                  <Card className={`hover:shadow-md transition-all cursor-pointer border-slate-100 ${isCompleted ? 'bg-green-50/10 border-green-100/60' : ''}`}>
                    <CardContent className="pt-4 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        isCompleted ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`font-medium ${isCompleted ? 'text-slate-600' : ''}`}>{lessonName}</span>
                          {isCompleted && (
                            <Badge className="bg-green-100/80 hover:bg-green-100 text-green-700 border-green-200 border text-[10px] font-semibold px-1.5 py-0 rounded-full shrink-0 flex items-center gap-0.5">
                              <span>{t.courseDetail.completedBadge}</span>
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="capitalize">{lesson.lesson_type}</span>
                          {lesson.duration_minutes && (
                            <>
                              <span>•</span>
                              <span>{lesson.duration_minutes} {t.courseDetail.minutes}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}