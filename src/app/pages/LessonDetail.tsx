import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { useI18n } from '../i18n';
import { useLesson } from '../hooks/useLessons';
import { useAuth, useLessonProgress } from '../hooks';
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

/**
 * Convert a YouTube URL to its embeddable format.
 * Supports:
 *   - https://www.youtube.com/watch?v=VIDEO_ID
 *   - https://youtu.be/VIDEO_ID
 *   - https://www.youtube.com/embed/VIDEO_ID (already embed, return as-is)
 * Returns null if the URL is not a recognized YouTube link.
 */
function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);

    // Already an embed URL
    if (parsed.pathname.startsWith('/embed/')) {
      return url;
    }

    // Standard watch URL: youtube.com/watch?v=VIDEO_ID
    if (
      (parsed.hostname === 'www.youtube.com' || parsed.hostname === 'youtube.com') &&
      parsed.pathname === '/watch'
    ) {
      const videoId = parsed.searchParams.get('v');
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // Short URL: youtu.be/VIDEO_ID
    if (parsed.hostname === 'youtu.be') {
      const videoId = parsed.pathname.slice(1);
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
  } catch {
    // Invalid URL
  }
  return null;
}

/** Renders either a YouTube iframe embed or an HTML5 video player */
function VideoPlayer({ url }: { url: string }) {
  const embedUrl = getYouTubeEmbedUrl(url);

  if (embedUrl) {
    return (
      <iframe
        src={embedUrl}
        className="w-full h-full rounded-xl"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title="Lesson video"
        style={{ border: 0 }}
      />
    );
  }

  // Fallback: direct video file (e.g. .mp4)
  return (
    <video
      src={url}
      className="w-full h-full object-cover rounded-xl"
      controls
    />
  );
}

export function LessonDetail() {
  const { lessonId } = useParams();
  const { language, t } = useI18n();
  const navigate = useNavigate();

  const { lesson, loading } = useLesson(lessonId || '');
  const { user } = useAuth();
  const { progress, loading: progressLoading, markComplete } = useLessonProgress(
    user?.id || '',
    lessonId || ''
  );

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCompleted = progress?.status === 'completed';
  const durationMinutes = lesson?.duration_minutes || 0;
  const requiredSeconds = durationMinutes * 60;
  const isTimeMet = elapsedSeconds >= requiredSeconds;

  useEffect(() => {
    // Reset elapsed seconds when lesson changes
    setElapsedSeconds(0);
  }, [lessonId]);

  useEffect(() => {
    if (isCompleted || isTimeMet || !lesson || requiredSeconds <= 0) return;

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => {
        const next = prev + 1;
        if (next >= requiredSeconds) {
          clearInterval(interval);
          return requiredSeconds;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isCompleted, isTimeMet, lesson, requiredSeconds]);

  const handleMarkComplete = async () => {
    if (!isTimeMet || isSubmitting || isCompleted) return;

    try {
      setIsSubmitting(true);
      await markComplete();
    } catch (err) {
      console.error('Failed to mark lesson complete:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || progressLoading) {
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

      {/* Video Player — shown for any lesson type that has a video_url */}
      {lesson.video_url && (
        <Card className="border-slate-100">
          <CardContent className="pt-6">
            <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden">
              <VideoPlayer url={lesson.video_url} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Placeholder when video type has no URL */}
      {lesson.lesson_type === 'video' && !lesson.video_url && (
        <Card className="border-slate-100">
          <CardContent className="pt-6">
            <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Play className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">วิดีโอจะแสดงเมื่อพร้อมใช้งาน</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
      <Card className={`border-slate-100 transition-all duration-350 ${isCompleted ? 'border-green-200 bg-green-50/40' : 'bg-slate-50/40'}`}>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-indigo-50 text-indigo-600'}`}>
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-slate-800">
                  {isCompleted ? 'เรียนรู้บทเรียนนี้เสร็จสิ้นแล้ว' : 'ทำเครื่องหมายว่าเสร็จสิ้น'}
                </div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  {isCompleted 
                    ? `ยินดีด้วย! คุณเรียนบทเรียนนี้ครบถ้วนแล้ว ${progress?.completed_at ? `เมื่อ ${new Date(progress.completed_at).toLocaleString('th-TH', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}` : ''}` 
                    : 'กรุณาใช้เวลาศึกษาเนื้อหาบทเรียนนี้ให้ครบถ้วนเพื่อบันทึกความก้าวหน้าของคุณ'}
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-3 shrink-0">
              {!isCompleted && requiredSeconds > 0 && (
                <div className="text-left md:text-right shrink-0">
                  <div className="text-xs text-muted-foreground font-medium">เวลาที่ต้องศึกษา</div>
                  <div className="text-sm font-semibold text-indigo-600 mt-0.5">
                    {isTimeMet ? 'สะสมเวลาครบถ้วนแล้ว!' : `เหลืออีก ${Math.floor((requiredSeconds - elapsedSeconds) / 60)} นาที ${((requiredSeconds - elapsedSeconds) % 60)} วินาที`}
                  </div>
                </div>
              )}
              
              <Button
                onClick={handleMarkComplete}
                disabled={!isTimeMet || isSubmitting || isCompleted}
                className={`w-full md:w-auto font-semibold px-6 transition-all duration-350 ${
                  isCompleted
                    ? 'bg-green-600 hover:bg-green-600 text-white border-green-650 opacity-90 cursor-default shadow-none'
                    : isTimeMet
                    ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer shadow-md shadow-green-200 animate-pulse-subtle'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed hover:bg-slate-200 shadow-none'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-slate-300 border-t-white" />
                    กำลังบันทึก...
                  </span>
                ) : isCompleted ? (
                  'เสร็จสิ้นแล้ว'
                ) : isTimeMet ? (
                  'ทำเครื่องหมายเสร็จ'
                ) : (
                  'รอสะสมเวลา...'
                )}
              </Button>
            </div>
          </div>

          {/* Progress bar for timer */}
          {!isCompleted && requiredSeconds > 0 && (
            <div className="mt-4 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-indigo-600 h-1.5 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${(elapsedSeconds / requiredSeconds) * 100}%` }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}