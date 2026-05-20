import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { useI18n } from '../i18n';
import { useLesson } from '../hooks/useLessons';
import { useAuth, useLessonProgress } from '../hooks';
import { supabase } from '../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import {
  ArrowLeft, Clock, ChevronRight, Play, FileText, HelpCircle,
  CheckCircle, CheckCircle2, Circle, Zap, BookOpen, Trophy, ChevronDown,
} from 'lucide-react';

/* ─────────────────────────────────────────
   Static look-up tables
───────────────────────────────────────── */
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

/* ─────────────────────────────────────────
   Python lesson checkpoint data (35 topics)
   Duration = seconds to stay on page per checkpoint
───────────────────────────────────────── */
interface PythonCheckpoint {
  id: number;
  title: string;
  startTime: string; // e.g. "0:00"
  duration: number;  // seconds
}

const PYTHON_CHECKPOINTS: PythonCheckpoint[] = [
  { id: 0,  title: 'Introduction',                    startTime: '0:00',    duration: 105 },
  { id: 1,  title: 'Installing Python & PyCharm',     startTime: '1:45',    duration: 295 },
  { id: 2,  title: 'Setup & Hello World',             startTime: '6:40',    duration: 223 },
  { id: 3,  title: 'Drawing a Shape',                 startTime: '10:23',   duration: 283 },
  { id: 4,  title: 'Variables & Data Types',          startTime: '15:06',   duration: 717 },
  { id: 5,  title: 'Working With Strings',            startTime: '27:03',   duration: 675 },
  { id: 6,  title: 'Working With Numbers',            startTime: '38:18',   duration: 608 },
  { id: 7,  title: 'Getting Input From Users',        startTime: '48:26',   duration: 251 },
  { id: 8,  title: 'Building a Basic Calculator',     startTime: '52:37',   duration: 350 },
  { id: 9,  title: 'Mad Libs Game',                   startTime: '58:27',   duration: 283 },
  { id: 10, title: 'Lists',                           startTime: '1:03:10', duration: 454 },
  { id: 11, title: 'List Functions',                  startTime: '1:10:44', duration: 493 },
  { id: 12, title: 'Tuples',                          startTime: '1:18:57', duration: 318 },
  { id: 13, title: 'Functions',                       startTime: '1:24:15', duration: 596 },
  { id: 14, title: 'Return Statement',                startTime: '1:34:11', duration: 355 },
  { id: 15, title: 'If Statements',                   startTime: '1:40:06', duration: 841 },
  { id: 16, title: 'If Statements & Comparisons',     startTime: '1:54:07', duration: 390 },
  { id: 17, title: 'Building a better Calculator',    startTime: '2:00:37', duration: 400 },
  { id: 18, title: 'Dictionaries',                    startTime: '2:07:17', duration: 416 },
  { id: 19, title: 'While Loop',                      startTime: '2:14:13', duration: 368 },
  { id: 20, title: 'Building a Guessing Game',        startTime: '2:20:21', duration: 743 },
  { id: 21, title: 'For Loops',                       startTime: '2:32:44', duration: 516 },
  { id: 22, title: 'Exponent Function',               startTime: '2:41:20', duration: 353 },
  { id: 23, title: '2D Lists & Nested Loops',         startTime: '2:47:13', duration: 328 },
  { id: 24, title: 'Building a Translator',           startTime: '2:52:41', duration: 457 },
  { id: 25, title: 'Comments',                        startTime: '3:00:18', duration: 239 },
  { id: 26, title: 'Try / Except',                    startTime: '3:04:17', duration: 504 },
  { id: 27, title: 'Reading Files',                   startTime: '3:12:41', duration: 525 },
  { id: 28, title: 'Writing to Files',                startTime: '3:21:26', duration: 407 },
  { id: 29, title: 'Modules & Pip',                   startTime: '3:28:13', duration: 943 },
  { id: 30, title: 'Classes & Objects',               startTime: '3:43:56', duration: 821 },
  { id: 31, title: 'Building a Multiple Choice Quiz', startTime: '3:57:37', duration: 651 },
  { id: 32, title: 'Object Functions',                startTime: '4:08:28', duration: 249 },
  { id: 33, title: 'Inheritance',                     startTime: '4:12:37', duration: 486 },
  { id: 34, title: 'Python Interpreter',              startTime: '4:20:43', duration: 300 },
];

/* ─────────────────────────────────────────
   Helpers
───────────────────────────────────────── */
function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.pathname.startsWith('/embed/')) return url;
    if (
      (parsed.hostname === 'www.youtube.com' || parsed.hostname === 'youtube.com') &&
      parsed.pathname === '/watch'
    ) {
      const videoId = parsed.searchParams.get('v');
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
    if (parsed.hostname === 'youtu.be') {
      const videoId = parsed.pathname.slice(1);
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch { /* invalid URL */ }
  return null;
}

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
  return <video src={url} className="w-full h-full object-cover rounded-xl" controls />;
}

function formatCompletedAt(dateStr: string | null | undefined): string {
  if (!dateStr) return '';
  try {
    const safeStr = dateStr.includes(' ') && !dateStr.includes('T') ? dateStr.replace(' ', 'T') : dateStr;
    const date = new Date(safeStr);
    if (isNaN(date.getTime())) return '';
    return `เมื่อ ${date.toLocaleString('th-TH', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`;
  } catch { return ''; }
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m} นาที ${s > 0 ? `${s} วินาที` : ''}`.trim() : `${s} วินาที`;
}

function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/* ─────────────────────────────────────────
   Checkpoint Row Component
───────────────────────────────────────── */
interface CheckpointRowProps {
  cp: PythonCheckpoint;
  isCompleted: boolean;
  isActive: boolean;
  onClick: () => void;
}

function CheckpointRow({ cp, isCompleted, isActive, onClick }: CheckpointRowProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group border ${
        isActive
          ? 'bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200 shadow-sm'
          : isCompleted
          ? 'bg-green-50/60 border-green-100 hover:bg-green-50'
          : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200'
      }`}
    >
      {/* Status icon */}
      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
        isCompleted
          ? 'bg-emerald-100 text-emerald-600'
          : isActive
          ? 'bg-indigo-100 text-indigo-600 ring-2 ring-indigo-300 ring-offset-1'
          : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500'
      }`}>
        {isCompleted
          ? <CheckCircle2 className="w-4 h-4" />
          : isActive
          ? <Zap className="w-4 h-4" />
          : <Circle className="w-4 h-4" />
        }
      </div>

      {/* Title + time */}
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-semibold truncate ${
          isActive ? 'text-indigo-700' : isCompleted ? 'text-emerald-700' : 'text-slate-700'
        }`}>
          <span className="text-slate-400 mr-1 font-normal">{cp.id + 1}.</span>
          {cp.title}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-slate-400">⌨️ {cp.startTime}</span>
          <span className="text-xs text-slate-300">•</span>
          <span className="text-xs text-slate-400">{formatDuration(cp.duration)}</span>
        </div>
      </div>

      {/* Badge */}
      {isCompleted && (
        <span className="shrink-0 text-[10px] bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
          เสร็จแล้ว
        </span>
      )}
      {isActive && !isCompleted && (
        <span className="shrink-0 text-[10px] bg-indigo-100 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full font-semibold animate-pulse">
          กำลังเรียน
        </span>
      )}
    </button>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export function LessonDetail() {
  const { lessonId } = useParams();
  const { language, t } = useI18n();
  const navigate = useNavigate();

  const { lesson, loading } = useLesson(lessonId || '');
  const { user } = useAuth();
  const { progress, loading: progressLoading, refetch: refetchProgress } = useLessonProgress(
    user?.id || '',
    lessonId || ''
  );

  const isPythonLesson = lessonId === 'lesson-python-01';

  /* ── Elapsed timer ── */
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllCheckpoints, setShowAllCheckpoints] = useState(false);
  const [activeCheckpointIdx, setActiveCheckpointIdx] = useState(0);

  /* ── Parse completed checkpoints from notes column ── */
  const completedCheckpoints: number[] = useMemo(() => {
    if (!isPythonLesson || !progress?.notes) return [];
    try {
      const parsed = JSON.parse(progress.notes);
      return Array.isArray(parsed) ? parsed : [];
    } catch { return []; }
  }, [isPythonLesson, progress?.notes]);

  const completedSet = useMemo(() => new Set(completedCheckpoints), [completedCheckpoints]);

  /* ── Auto-select first uncompleted checkpoint on load ── */
  useEffect(() => {
    if (!isPythonLesson || progressLoading) return;
    const first = PYTHON_CHECKPOINTS.find(cp => !completedSet.has(cp.id));
    if (first !== undefined) {
      setActiveCheckpointIdx(first.id);
    } else {
      // All done — show last one
      setActiveCheckpointIdx(PYTHON_CHECKPOINTS.length - 1);
    }
  }, [isPythonLesson, progressLoading, completedCheckpoints.length]);

  /* ── Reset timer when active checkpoint changes ── */
  useEffect(() => {
    setElapsedSeconds(0);
  }, [lessonId, activeCheckpointIdx]);

  /* ── Derived values ── */
  const activeCheckpoint = isPythonLesson ? PYTHON_CHECKPOINTS[activeCheckpointIdx] : null;
  const durationMinutes = lesson?.duration_minutes || 0;
  const requiredSeconds = isPythonLesson
    ? (activeCheckpoint?.duration ?? 0)
    : durationMinutes * 60;
  const isCurrentCheckpointDone = isPythonLesson
    ? completedSet.has(activeCheckpointIdx)
    : progress?.status === 'completed';
  const isFullyCompleted = isPythonLesson
    ? completedCheckpoints.length === PYTHON_CHECKPOINTS.length
    : progress?.status === 'completed';
  const isTimeMet = elapsedSeconds >= requiredSeconds;

  /* ── Stay-timer ── */
  useEffect(() => {
    if (isCurrentCheckpointDone || isTimeMet || !lesson || requiredSeconds <= 0) return;

    const interval = setInterval(() => {
      setElapsedSeconds(prev => {
        const next = prev + 1;
        if (next >= requiredSeconds) {
          clearInterval(interval);
          return requiredSeconds;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isCurrentCheckpointDone, isTimeMet, lesson, requiredSeconds]);

  /* ── Save checkpoint progress to Supabase (notes column) ── */
  const saveCheckpointProgress = useCallback(async (newCompletedIndices: number[]) => {
    if (!user?.id || !lessonId) return;
    const pct = Math.round((newCompletedIndices.length / PYTHON_CHECKPOINTS.length) * 100);
    const isAll = newCompletedIndices.length === PYTHON_CHECKPOINTS.length;
    const now = new Date().toISOString();

    await supabase.from('user_progress').upsert({
      user_id: user.id,
      lesson_id: lessonId,
      status: isAll ? 'completed' : 'in_progress',
      progress_percentage: pct,
      notes: JSON.stringify(newCompletedIndices),
      completed_at: isAll ? now : null,
      last_accessed_at: now,
    }, { onConflict: 'user_id,lesson_id' });
  }, [user?.id, lessonId]);

  /* ── Handle marking a checkpoint complete ── */
  const handleMarkCheckpointComplete = async () => {
    if (!isTimeMet || isSubmitting || isCurrentCheckpointDone) return;
    try {
      setIsSubmitting(true);
      const updated = [...new Set([...completedCheckpoints, activeCheckpointIdx])];
      await saveCheckpointProgress(updated);
      await refetchProgress();
      // Auto-advance to next uncompleted
      const updatedSet = new Set(updated);
      const next = PYTHON_CHECKPOINTS.find(cp => !updatedSet.has(cp.id));
      if (next) setActiveCheckpointIdx(next.id);
    } catch (err) {
      console.error('Failed to mark checkpoint complete:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Standard (non-Python) mark complete ── */
  const handleMarkComplete = async () => {
    if (!isTimeMet || isSubmitting || isFullyCompleted) return;
    try {
      setIsSubmitting(true);
      await supabase.from('user_progress').upsert({
        user_id: user?.id,
        lesson_id: lessonId,
        status: 'completed',
        progress_percentage: 100,
        completed_at: new Date().toISOString(),
        last_accessed_at: new Date().toISOString(),
      }, { onConflict: 'user_id,lesson_id' });
      await refetchProgress();
    } catch (err) {
      console.error('Failed to mark lesson complete:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ─── Loading ─── */
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

  /* ────────────────────────────────────────────────────
     Checkpoint-specific variables (Python lesson only)
  ──────────────────────────────────────────────────── */
  const overallPct = isPythonLesson
    ? Math.round((completedCheckpoints.length / PYTHON_CHECKPOINTS.length) * 100)
    : (progress?.progress_percentage ?? 0);

  const visibleCheckpoints = showAllCheckpoints
    ? PYTHON_CHECKPOINTS
    : PYTHON_CHECKPOINTS.slice(0, 10);

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
            {isPythonLesson && (
              <Badge className="bg-amber-400/90 text-amber-900 border-0 font-bold">
                🐍 35 หัวข้อย่อย
              </Badge>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
          {isPythonLesson ? (
            <div className="flex flex-col gap-2 mt-3">
              <div className="flex items-center justify-between text-sm text-indigo-100">
                <span>ความก้าวหน้าโดยรวม</span>
                <span className="font-bold text-white">{completedCheckpoints.length} / {PYTHON_CHECKPOINTS.length} หัวข้อ ({overallPct}%)</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-300 to-emerald-300 h-2.5 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
              {isFullyCompleted && (
                <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm mt-1">
                  <Trophy className="w-4 h-4" />
                  เรียนครบ 35 หัวข้อแล้ว! ยอดเยี่ยมมาก 🎉
                </div>
              )}
            </div>
          ) : (
            lesson.duration_minutes && (
              <div className="flex items-center gap-2 text-indigo-100">
                <Clock className="w-4 h-4" />
                <span>{lesson.duration_minutes} นาที</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Video Player */}
      {lesson.video_url && (
        <Card className="border-slate-100">
          <CardContent className="pt-6">
            <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden">
              <VideoPlayer url={lesson.video_url} />
            </div>
          </CardContent>
        </Card>
      )}

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

      {/* Lesson Type Specific */}
      {lesson.lesson_type === 'quiz' && (
        <Card className="border-slate-100">
          <CardHeader><CardTitle>แบบทดสอบ</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">ทำแบบทดสอบเพื่อทดสอบความเข้าใจของคุณ</p>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              เริ่มทำแบบทดสอบ <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      )}
      {lesson.lesson_type === 'exercise' && (
        <Card className="border-slate-100">
          <CardHeader><CardTitle>แบบฝึกหัด</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">ฝึกทักษะด้วยแบบฝึกหัดที่ให้คุณได้ลงมือทำ</p>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              เริ่มทำแบบฝึกหัด <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      )}
      {lesson.lesson_type === 'reading' && (
        <Card className="border-slate-100">
          <CardHeader><CardTitle>อ่านเพิ่มเติม</CardTitle></CardHeader>
          <CardContent>
            <div className="prose prose-slate max-w-none">
              <p className="text-muted-foreground leading-relaxed">เนื้อหาสำหรับอ่านเพิ่มเติมจะแสดงที่นี่</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ══════════════════════════════════════════════════════════
          PYTHON LESSON: 35 Checkpoint List
      ══════════════════════════════════════════════════════════ */}
      {isPythonLesson && (
        <Card className="border-slate-100 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-indigo-50/40 border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                หัวข้อย่อยทั้งหมด
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">
                  <span className="font-bold text-emerald-600">{completedCheckpoints.length}</span>/{PYTHON_CHECKPOINTS.length} เสร็จสิ้น
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-1.5">
              {visibleCheckpoints.map(cp => (
                <CheckpointRow
                  key={cp.id}
                  cp={cp}
                  isCompleted={completedSet.has(cp.id)}
                  isActive={activeCheckpointIdx === cp.id}
                  onClick={() => {
                    setActiveCheckpointIdx(cp.id);
                    setElapsedSeconds(0);
                  }}
                />
              ))}
            </div>

            {/* Show more / show less toggle */}
            {PYTHON_CHECKPOINTS.length > 10 && (
              <button
                onClick={() => setShowAllCheckpoints(v => !v)}
                className="mt-3 w-full flex items-center justify-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium py-2 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                {showAllCheckpoints ? (
                  <>แสดงน้อยลง <ChevronDown className="w-4 h-4 rotate-180 transition-transform" /></>
                ) : (
                  <>ดูหัวข้ออีก {PYTHON_CHECKPOINTS.length - 10} รายการ <ChevronDown className="w-4 h-4 transition-transform" /></>
                )}
              </button>
            )}
          </CardContent>
        </Card>
      )}

      {/* ══════════════════════════════════════════════════════════
          COMPLETION / TIMER CARD
      ══════════════════════════════════════════════════════════ */}
      {isPythonLesson ? (
        /* ── Python: per-checkpoint completion card ── */
        <Card className={`border transition-all duration-350 overflow-hidden ${
          isFullyCompleted
            ? 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50'
            : isCurrentCheckpointDone
            ? 'border-emerald-100 bg-emerald-50/30'
            : 'border-slate-100 bg-slate-50/40'
        }`}>
          <CardContent className="pt-6">
            {/* Checkpoint name banner */}
            {!isFullyCompleted && activeCheckpoint && (
              <div className="mb-4 flex items-center gap-3 p-3 rounded-xl bg-white border border-indigo-100 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                  <span className="text-indigo-700 font-bold text-sm">{activeCheckpointIdx + 1}</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-800 text-sm">{activeCheckpoint.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    ⌨️ {activeCheckpoint.startTime} · ต้องสะสม {formatDuration(activeCheckpoint.duration)}
                  </div>
                </div>
                {isCurrentCheckpointDone && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />
                )}
              </div>
            )}

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isFullyCompleted
                    ? 'bg-emerald-100 text-emerald-600'
                    : isCurrentCheckpointDone
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-indigo-50 text-indigo-600'
                }`}>
                  {isFullyCompleted ? <Trophy className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                </div>
                <div>
                  <div className="font-semibold text-slate-800">
                    {isFullyCompleted
                      ? '🎉 เรียนครบทั้ง 35 หัวข้อแล้ว!'
                      : isCurrentCheckpointDone
                      ? `✅ หัวข้อ "${activeCheckpoint?.title}" เสร็จสิ้นแล้ว`
                      : `📚 กำลังสะสมเวลา: ${activeCheckpoint?.title}`
                    }
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">
                    {isFullyCompleted
                      ? `ยินดีด้วย! คุณเรียนจบบทเรียน Python Basics ครบถ้วนสมบูรณ์แล้ว ${formatCompletedAt(progress?.completed_at)}`
                      : isCurrentCheckpointDone
                      ? 'คลิกหัวข้ออื่นด้านบนเพื่อเริ่มสะสมเวลาหัวข้อถัดไป'
                      : 'กรุณาเปิดและรับชมวิดีโอในหัวข้อนี้เพื่อสะสมเวลาและบันทึกความก้าวหน้า'
                    }
                  </div>
                </div>
              </div>

              {/* Timer + Button */}
              {!isFullyCompleted && (
                <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-3 shrink-0">
                  {!isCurrentCheckpointDone && requiredSeconds > 0 && (
                    <div className="text-left md:text-right shrink-0">
                      <div className="text-xs text-muted-foreground font-medium">เวลาที่ต้องสะสม</div>
                      <div className="text-sm font-semibold text-indigo-600 mt-0.5">
                        {isTimeMet
                          ? '✅ สะสมเวลาครบแล้ว!'
                          : `เหลืออีก ${formatCountdown(requiredSeconds - elapsedSeconds)}`
                        }
                      </div>
                    </div>
                  )}
                  <Button
                    onClick={handleMarkCheckpointComplete}
                    disabled={!isTimeMet || isSubmitting || isCurrentCheckpointDone}
                    className={`w-full md:w-auto font-semibold px-6 transition-all duration-350 ${
                      isCurrentCheckpointDone
                        ? 'bg-emerald-600 hover:bg-emerald-600 text-white opacity-80 cursor-default shadow-none'
                        : isTimeMet
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-md shadow-emerald-200 animate-pulse-subtle'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed hover:bg-slate-200 shadow-none'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2 justify-center">
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-slate-300 border-t-white" />
                        กำลังบันทึก...
                      </span>
                    ) : isCurrentCheckpointDone ? (
                      'เสร็จสิ้นแล้ว'
                    ) : isTimeMet ? (
                      'ทำเครื่องหมายเสร็จ'
                    ) : (
                      'รอสะสมเวลา...'
                    )}
                  </Button>
                </div>
              )}
            </div>

            {/* Per-checkpoint progress bar */}
            {!isCurrentCheckpointDone && !isFullyCompleted && requiredSeconds > 0 && (
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>เวลาสะสม</span>
                  <span>{formatCountdown(elapsedSeconds)} / {formatCountdown(requiredSeconds)}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${(elapsedSeconds / requiredSeconds) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Checkpoint mini progress dots (visual summary) */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500 font-medium">ภาพรวมความก้าวหน้า</span>
                <span className="text-xs text-slate-400">{overallPct}%</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {PYTHON_CHECKPOINTS.map(cp => (
                  <button
                    key={cp.id}
                    title={`${cp.id + 1}. ${cp.title}`}
                    onClick={() => { setActiveCheckpointIdx(cp.id); setElapsedSeconds(0); }}
                    className={`w-5 h-5 rounded-sm transition-all hover:scale-110 ${
                      completedSet.has(cp.id)
                        ? 'bg-emerald-400'
                        : activeCheckpointIdx === cp.id
                        ? 'bg-indigo-400 ring-2 ring-indigo-300 ring-offset-1'
                        : 'bg-slate-200 hover:bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* ── Standard lesson completion card ── */
        <Card className={`border-slate-100 transition-all duration-350 ${isFullyCompleted ? 'border-green-200 bg-green-50/40' : 'bg-slate-50/40'}`}>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isFullyCompleted ? 'bg-green-100 text-green-600' : 'bg-indigo-50 text-indigo-600'}`}>
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">
                    {isFullyCompleted ? 'เรียนรู้บทเรียนนี้เสร็จสิ้นแล้ว' : 'ทำเครื่องหมายว่าเสร็จสิ้น'}
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">
                    {isFullyCompleted
                      ? `ยินดีด้วย! คุณเรียนบทเรียนนี้ครบถ้วนแล้ว ${formatCompletedAt(progress?.completed_at)}`
                      : 'กรุณาใช้เวลาศึกษาเนื้อหาบทเรียนนี้ให้ครบถ้วนเพื่อบันทึกความก้าวหน้าของคุณ'
                    }
                  </div>
                </div>
              </div>

              <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-3 shrink-0">
                {!isFullyCompleted && requiredSeconds > 0 && (
                  <div className="text-left md:text-right shrink-0">
                    <div className="text-xs text-muted-foreground font-medium">เวลาที่ต้องศึกษา</div>
                    <div className="text-sm font-semibold text-indigo-600 mt-0.5">
                      {isTimeMet ? 'สะสมเวลาครบถ้วนแล้ว!' : `เหลืออีก ${Math.floor((requiredSeconds - elapsedSeconds) / 60)} นาที ${((requiredSeconds - elapsedSeconds) % 60)} วินาที`}
                    </div>
                  </div>
                )}
                <Button
                  onClick={handleMarkComplete}
                  disabled={!isTimeMet || isSubmitting || isFullyCompleted}
                  className={`w-full md:w-auto font-semibold px-6 transition-all duration-350 ${
                    isFullyCompleted
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
                  ) : isFullyCompleted ? 'เสร็จสิ้นแล้ว' : isTimeMet ? 'ทำเครื่องหมายเสร็จ' : 'รอสะสมเวลา...'}
                </Button>
              </div>
            </div>

            {!isFullyCompleted && requiredSeconds > 0 && (
              <div className="mt-4 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-indigo-600 h-1.5 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${(elapsedSeconds / requiredSeconds) * 100}%` }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}