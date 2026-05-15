import { useParams, Link, useNavigate } from 'react-router';
import { useI18n } from '../i18n';
import { useLesson } from '../hooks/useLessons';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { ArrowLeft, Clock, ChevronRight, Play, FileText, HelpCircle, CheckCircle } from 'lucide-react';

const lessonTypeLabels: Record<string, string> = {
  video: 'วิดีโอ',
  reading: 'บทความ',
  quiz: 'แบบทดสอบ',
  exercise: 'แบบฝึกหัด',
};

const difficultyColors: Record<string, string> = {
  easy: 'bg-green-100 text-green-700 border-green-200',
  moderate: 'bg-amber-100 text-amber-700 border-amber-200',
  challenging: 'bg-red-100 text-red-700 border-red-200',
};

export function LessonDetail() {
  const { lessonId } = useParams();
  const { language, t } = useI18n();
  const navigate = useNavigate();

  const { lesson, loading } = useLesson(lessonId || '');

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-xl font-semibold mb-2">ไม่พบบทเรียน</h2>
        <p className="text-muted-foreground mb-4">บทเรียนที่คุณกำลังค้นหาอาจถูกลบหรือย้ายไปแล้ว</p>
        <Button onClick={() => navigate('/lessons')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          กลับไปหน้าบทเรียน
        </Button>
      </div>
    );
  }

  const title = language === 'th' ? lesson.title_th : lesson.title_en;
  const content = language === 'th' ? lesson.content_th : lesson.content_en;

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link
        to={`/courses/${lesson.course_id}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        กลับไปหลักสูตร
      </Link>

      {/* Lesson Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 p-6 md:p-8 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-white/20 text-white border-0">
              {lessonTypeLabels[lesson.lesson_type]}
            </Badge>
            {lesson.difficulty && (
              <Badge className={`${difficultyColors[lesson.difficulty]} border`}>
                {t.difficulty[lesson.difficulty] || lesson.difficulty}
              </Badge>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
          {lesson.duration_minutes && (
            <div className="flex items-center gap-2 text-indigo-100">
              <Clock className="w-4 h-4" />
              <span>{lesson.duration_minutes} นาที</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {content && (
        <Card className="border-slate-100">
          <CardHeader>
            <CardTitle>เนื้อหา</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{content}</p>
          </CardContent>
        </Card>
      )}

      {/* Lesson Type Specific Content */}
      {lesson.lesson_type === 'video' && (
        <Card className="border-slate-100">
          <CardContent className="pt-6">
            <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center">
              {lesson.video_url ? (
                <video
                  src={lesson.video_url}
                  className="w-full h-full object-cover rounded-xl"
                  controls
                />
              ) : (
                <div className="text-center">
                  <Play className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">วิดีโอจะแสดงเมื่อพร้อมใช้งาน</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {lesson.lesson_type === 'quiz' && (
        <Card className="border-slate-100">
          <CardHeader>
            <CardTitle>แบบทดสอบ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              ทำแบบทดสอบเพื่อทดสอบความเข้าใจของคุณ
            </p>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              เริ่มทำแบบทดสอบ
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      )}

      {lesson.lesson_type === 'exercise' && (
        <Card className="border-slate-100">
          <CardHeader>
            <CardTitle>แบบฝึกหัด</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              ฝึกทักษะด้วยแบบฝึกหัดที่ให้คุณได้ลงมือทำ
            </p>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              เริ่มทำแบบฝึกหัด
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      )}

      {lesson.lesson_type === 'reading' && (
        <Card className="border-slate-100">
          <CardHeader>
            <CardTitle>อ่านเพิ่มเติม</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-slate max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                เนื้อหาสำหรับอ่านเพิ่มเติมจะแสดงที่นี่
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completion */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-medium">ทำเครื่องหมายว่าเสร็จสิ้น</div>
              <div className="text-sm text-muted-foreground">บันทึกความก้าวหน้าของคุณ</div>
            </div>
          </div>
          <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-100">
            ทำเครื่องหมายเสร็จ
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}