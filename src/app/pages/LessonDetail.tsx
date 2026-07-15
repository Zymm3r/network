import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { useI18n } from '../i18n';
import { useLesson } from '../hooks/useLessons';
import { useAuth, useLessonProgress } from '../hooks';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '../lib/components/ui/card';
import { Badge } from '../lib/components/ui/badge';
import { Button } from '../lib/components/ui/button';
import { Skeleton } from '../lib/components/ui/skeleton';
import {
  ArrowLeft, Clock, ChevronRight, Play, FileText, HelpCircle,
  CheckCircle, CheckCircle2, Circle, Zap, BookOpen, Trophy, ChevronDown,
  Code2, PlayCircle, Eye, Lock
} from 'lucide-react';
import QuizCard from '../lib/components/QuizCard';
import ExerciseCard from '../lib/components/ExerciseCard';
import { KalturaPlayer } from '../lib/components/KalturaPlayer';

/* ─────────────────────────────────────────
   Static look-up tables
───────────────────────────────────────── */

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
  // Direct YouTube ID handling (11 characters)
  if (!url.startsWith('http') && /^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return `https://www.youtube.com/embed/${url}`;
  }

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

function parseStartTimeToSeconds(timeStr: string): number {
  const parts = timeStr.split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return 0;
}

interface VideoSeekState {
  time: number;
  triggerId: number;
}

function VideoPlayer({ url, seekState }: { url: string; seekState?: VideoSeekState | null }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!seekState) return;
    
    if (iframeRef.current && iframeRef.current.contentWindow) {
      // YouTube Iframe API message seeking
      iframeRef.current.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: 'seekTo',
        args: [seekState.time, true]
      }), '*');
      iframeRef.current.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: 'playVideo',
        args: []
      }), '*');
    } else if (videoRef.current) {
      // HTML5 Video
      videoRef.current.currentTime = seekState.time;
      videoRef.current.play().catch(() => {});
    }
  }, [seekState]);

  const embedUrl = getYouTubeEmbedUrl(url);
  if (embedUrl) {
    const finalUrl = embedUrl.includes('?')
      ? (embedUrl.includes('enablejsapi=1') ? embedUrl : `${embedUrl}&enablejsapi=1`)
      : `${embedUrl}?enablejsapi=1`;

    return (
      <iframe
        ref={iframeRef}
        src={finalUrl}
        className="w-full h-full rounded-xl bg-slate-100"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        title="Lesson video"
        style={{ border: 0 }}
      />
    );
  }
  return <video ref={videoRef} src={url} className="w-full h-full object-cover rounded-xl bg-slate-100" controls preload="metadata" />;
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
   Reading Content Markdown-like Renderer
───────────────────────────────────────── */
function ReadingContentRenderer({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block (```)
    if (line.trim().startsWith('```')) {
      const langMatch = line.trim().match(/^```(\w*)/);
      const lang = langMatch?.[1] || '';
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <div key={key++} className="my-5 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
          {lang && (
            <div className="bg-slate-800 text-slate-300 text-xs font-mono px-4 py-1.5 flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5" />
              {lang}
            </div>
          )}
          <pre className="bg-slate-900 text-slate-100 text-sm font-mono px-5 py-4 overflow-x-auto leading-relaxed">
            <code>{codeLines.join('\n')}</code>
          </pre>
        </div>
      );
      continue;
    }

    // H2 heading (##)
    if (line.trim().startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-xl md:text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
          <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
          {line.trim().replace(/^## /, '')}
        </h2>
      );
      i++;
      continue;
    }

    // H3 heading (###)
    if (line.trim().startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-lg font-semibold text-slate-700 mt-7 mb-3">
          {line.trim().replace(/^### /, '')}
        </h3>
      );
      i++;
      continue;
    }

    // Bullet point (- or *)
    if (line.trim().match(/^[-*] /)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().match(/^[-*] /)) {
        listItems.push(lines[i].trim().replace(/^[-*] /, ''));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-4 space-y-2 pl-1">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex gap-3 text-slate-600 leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 bg-indigo-400 rounded-full shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list (1. 2. etc.)
    if (line.trim().match(/^\d+\. /)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().match(/^\d+\. /)) {
        listItems.push(lines[i].trim().replace(/^\d+\. /, ''));
        i++;
      }
      elements.push(
        <ol key={key++} className="my-4 space-y-2 pl-1 list-none">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex gap-3 text-slate-700 leading-relaxed text-base">
              <span className="mt-0.5 w-6 h-6 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                {idx + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Markdown Table (| Header | Header |)
    if (line.trim().startsWith('|') && i + 1 < lines.length && lines[i+1].trim().match(/^\|[-\s|]+\|$/)) {
      const tableRows: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableRows.push(lines[i].trim());
        i++;
      }
      
      const headers = tableRows[0].split('|').filter(Boolean).map(s => s.trim());
      // Skip row 1 which is the separator |---|---|
      const rows = tableRows.slice(2).map(row => row.split('|').filter(Boolean).map(s => s.trim()));
      
      elements.push(
        <div key={key++} className="my-6 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left text-base text-slate-700">
            <thead className="bg-slate-50 text-slate-800 font-semibold border-b border-slate-200">
              <tr>
                {headers.map((h, idx) => (
                  <th key={idx} className="px-4 py-3" dangerouslySetInnerHTML={{ __html: inlineFormat(h) }} />
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/50 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: inlineFormat(cell) }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key++} className="text-slate-700 leading-[1.85] my-4 text-base" dangerouslySetInnerHTML={{ __html: inlineFormat(line) }} />
    );
    i++;
  }

  return <div className="reading-content max-w-none">{elements}</div>;
}

/** Inline formatting: **bold**, `code`, [link](url) */
function inlineFormat(text: string): string {
  return text
    // Bold **text**
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-slate-800">$1</strong>')
    // Inline code `text`
    .replace(/`([^`]+)`/g, '<code class="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded text-[13px] font-mono">$1</code>')
    // Links [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-indigo-600 underline underline-offset-2 hover:text-indigo-800">$1</a>');
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
// ════════════════════════════════════════════
//  SAVE TO SUPABASE: All dependent tables
//  Updates lesson_progress, course_progress,
//  and learning_path_progress consistently
// ════════════════════════════════════════════
const saveAllProgress = async (
  userId: string,
  lessonId: string,
  courseId: string | null,
  status: 'completed' | 'in_progress',
  progressPercentage: number,
  notes: string | null,
) => {
  const now = new Date().toISOString();
  const isCompleted = status === 'completed';
  const results: { table: string; success: boolean; error?: any }[] = [];

  // 1. Save lesson_progress (user_progress table)
  try {
    const payload = {
      user_id: userId,
      lesson_id: lessonId,
      status,
      progress_percentage: progressPercentage,
      notes,
      completed_at: isCompleted ? now : null,
      last_accessed_at: now,
    };
    
    const { data: existing } = await supabase
      .from('user_progress')
      .select('id')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase.from('user_progress').update(payload).eq('id', existing.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('user_progress').insert(payload);
      if (error) throw error;
    }
    results.push({ table: 'user_progress', success: true });
  } catch (err) {
    console.error('[Progress DB Log] Failed to save lesson progress:', err);
    results.push({ table: 'user_progress', success: false, error: err });
  }

  // 2. Save course_progress (enrollments table) — update if courseId provided
  if (courseId && isCompleted) {
    try {
      // Get total lesson count for this course
      const { data: lessons, error: lessonsError } = await supabase
        .from('lessons')
        .select('id')
        .eq('course_id', courseId);

      if (!lessonsError && lessons && lessons.length > 0) {
        const totalLessons = lessons.length;
        
        // Get completed lesson count
        const { data: completedData } = await supabase
          .from('user_progress')
          .select('id')
          .eq('user_id', userId)
          .eq('status', 'completed')
          .in('lesson_id', lessons.map(l => l.id));

        const completedCount = completedData?.length || 0;
        const coursePercentage = Math.round((completedCount / totalLessons) * 100);
        const courseStatus = coursePercentage >= 100 ? 'completed' : 'active';

        const { error: enrollError } = await supabase
          .from('enrollments')
          .upsert({
            user_id: userId,
            course_id: courseId,
            status: courseStatus,
            progress_percentage: coursePercentage,
            completed_at: coursePercentage >= 100 ? now : null,
            last_accessed_at: now,
          }, { onConflict: 'user_id,course_id' });

        if (enrollError) throw enrollError;
        results.push({ table: 'enrollments', success: true });
      }
    } catch (err) {
      console.error('[Progress DB Log] Failed to save course progress:', err);
      results.push({ table: 'enrollments', success: false, error: err });
    }
  }

  // 3. Auto-issue certificate if course is now 100% complete
  if (courseId && isCompleted) {
    try {
      import('../lib/api/certificates').then(({ certificateApi }) => {
        certificateApi.checkAndIssueCourseCertificate(userId, courseId).then(cert => {
          if (cert) {
            console.log(`[Certificate] Auto-issued certificate:`, cert.certificate_number);
          }
        });
      });
    } catch (err) {
      console.error('[Certificate] Failed to check certificate:', err);
    }
  }

  return results;
};

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

  /* ── Elapsed timer & submit states ── */
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllCheckpoints, setShowAllCheckpoints] = useState(false);
  const [activeCheckpointIdx, setActiveCheckpointIdx] = useState(0);

  /* ── Load/Initialize timer from localStorage when storage key or required duration changes ── */
  const timerStorageKey = useMemo(() => {
    if (!user?.id || !lessonId) return null;
    return `study-timer:${user.id}:${lessonId}:${isPythonLesson ? activeCheckpointIdx : 'general'}`;
  }, [user?.id, lessonId, isPythonLesson, activeCheckpointIdx]);

  /* ── Offline resilience helper: Queue a failed save ── */
  const queueFailedSave = useCallback((payload: {
    userId: string;
    lessonId: string;
    isPython: boolean;
    completedCheckpoints: number[];
  }) => {
    try {
      const existingStr = localStorage.getItem('pending-progress-saves');
      const queue = existingStr ? JSON.parse(existingStr) : [];
      
      // Deduplicate by lessonId
      const filtered = queue.filter(
        (item: any) => !(item.lessonId === payload.lessonId)
      );
      filtered.push(payload);
      
      localStorage.setItem('pending-progress-saves', JSON.stringify(filtered));
      console.log('[Progress Offline Log] Saved progress update to offline queue:', payload);
    } catch (e) {
      console.error('[Progress Offline Log] Failed to queue offline progress:', e);
    }
  }, []);

  /* ── Offline resilience helper: Flush pending saves ── */
  const flushPendingSaves = useCallback(async (currentUserId: string) => {
    try {
      const existingStr = localStorage.getItem('pending-progress-saves');
      if (!existingStr) return;
      
      const queue = JSON.parse(existingStr);
      if (!Array.isArray(queue) || queue.length === 0) return;

      console.log(`[Progress Offline Log] Attempting to flush ${queue.length} pending saves for user ${currentUserId}`);
      
      const remaining = [];
      let successCount = 0;

      for (const item of queue) {
        if (item.userId !== currentUserId) {
          remaining.push(item);
          continue;
        }

        try {
          if (item.isPython) {
            const pct = Math.round((item.completedCheckpoints.length / PYTHON_CHECKPOINTS.length) * 100);
            const isAll = item.completedCheckpoints.length === PYTHON_CHECKPOINTS.length;
            const now = new Date().toISOString();

            const { error: upsertError } = await supabase.from('user_progress').upsert({
              user_id: item.userId,
              lesson_id: item.lessonId,
              status: isAll ? 'completed' : 'in_progress',
              progress_percentage: pct,
              notes: JSON.stringify(item.completedCheckpoints),
              completed_at: isAll ? now : null,
              last_accessed_at: now,
            }, { onConflict: 'user_id,lesson_id' });

            if (upsertError) throw upsertError;
          } else {
            const { error: upsertError } = await supabase.from('user_progress').upsert({
              user_id: item.userId,
              lesson_id: item.lessonId,
              status: 'completed',
              progress_percentage: 100,
              completed_at: new Date().toISOString(),
              last_accessed_at: new Date().toISOString(),
            }, { onConflict: 'user_id,lesson_id' });

            if (upsertError) throw upsertError;
          }
          successCount++;
          console.log('[Progress Offline Log] Flushed offline progress successfully:', item);
        } catch (err) {
          console.error('[Progress Offline Log] Failed to flush offline progress item:', item, err);
          remaining.push(item);
        }
      }

      if (remaining.length > 0) {
        localStorage.setItem('pending-progress-saves', JSON.stringify(remaining));
      } else {
        localStorage.removeItem('pending-progress-saves');
      }

      if (successCount > 0) {
        toast.success(
          t.lessonDetail.offlineSyncSuccess.replace('{count}', successCount.toString())
        );
        await refetchProgress();
      }
    } catch (e) {
      console.error('[Progress Offline Log] Error during flush:', e);
    }
  }, [refetchProgress, language, t.lessonDetail.offlineSyncSuccess]);

  /* ── Offline queue triggers ── */
  useEffect(() => {
    if (!user?.id) return;

    // 1. Flush immediately on mount/load
    flushPendingSaves(user.id);

    // 2. Flush when user comes back online
    const handleOnline = () => {
      console.log('[Progress Offline Log] Browser detected as ONLINE — flushing queue');
      flushPendingSaves(user.id);
    };

    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, [user?.id, flushPendingSaves]);

  const [videoSeekState, setVideoSeekState] = useState<VideoSeekState | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const readingContentRef = useRef<HTMLDivElement>(null);
  
  // Concurrent Flight Lock
  const isSavingRef = useRef(false);

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

  /* ── Derived values ── */
  const activeCheckpoint = isPythonLesson ? PYTHON_CHECKPOINTS[activeCheckpointIdx] : null;

  const isReadingLesson = lesson?.lesson_type === 'reading';
  const readingContent = useMemo(() => {
    if (!isReadingLesson || !lesson) return '';
    return lesson[`content_${language}` as 'content_th' | 'content_en'] || '';
  }, [isReadingLesson, lesson, language]);

  const estimatedReadingMinutes = useMemo(() => {
    if (!readingContent) return 0;
    const wpmMap: Record<'th' | 'en', number> = { th: 180, en: 230 };
    const wpm = wpmMap[language];
    const words = readingContent.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / wpm));
  }, [readingContent, language]);

  const durationMinutes = isReadingLesson && estimatedReadingMinutes > 0
    ? estimatedReadingMinutes
    : (lesson?.duration_minutes || 0);
  
  // Disable page-level timer for video lessons
  const requiredSeconds = lesson?.lesson_type === 'video'
    ? 0
    : isPythonLesson
      ? (activeCheckpoint?.duration ?? 0)
      : durationMinutes * 60;
      
  const isCurrentCheckpointDone = isPythonLesson
    ? completedSet.has(activeCheckpointIdx)
    : progress?.status === 'completed';
  const isFullyCompleted = isPythonLesson
    ? completedCheckpoints.length === PYTHON_CHECKPOINTS.length
    : progress?.status === 'completed';
    
  // Require video completion for videos, fallback to timer for reading
  const isTimeMet = lesson?.lesson_type === 'video'
    ? isVideoCompleted
    : elapsedSeconds >= requiredSeconds;

  /* ── Standard (non-Python) mark complete ── */
  const handleMarkComplete = useCallback(async () => {
    if (!isTimeMet || isSubmitting || isFullyCompleted || !user?.id || !lessonId) return;

    // Concurrent Flight Locking
    if (isSavingRef.current) {
      console.warn('[Progress DB Log] Save request already in flight — blocking concurrent submission');
      return;
    }

    try {
      isSavingRef.current = true;
      setIsSubmitting(true);
      console.log(`[Progress DB Log] Attempting to mark standard lesson ${lessonId} complete...`);

      const now = new Date().toISOString();
      
      try {
        // Save to all dependent tables consistently
        await saveAllProgress(
          user.id,
          lessonId,
          lesson?.course_id || null,
          'completed',
          100,
          null,
        );

        toast.success(t.lessonDetail.standardLessonCompleteSuccess);
        
        // Clear stay-timer from localStorage upon completion
        if (timerStorageKey) {
          localStorage.removeItem(timerStorageKey);
        }
      } catch (dbErr) {
        console.error('[Progress DB Log] Standard lesson database write failed — queueing for offline retry', dbErr);

        // Queue progress update for offline sync
        queueFailedSave({
          userId: user.id,
          lessonId,
          isPython: false,
          completedCheckpoints: [],
        });

        toast.warning(t.lessonDetail.offlineQueueWarning);
      }

      // Refresh progress data in UI silently
      await refetchProgress();
    } catch (err) {
      console.error('[Progress DB Log] Unexpected error during lesson completion:', err);
      toast.error(t.lessonDetail.saveProgressError);
    } finally {
      setIsSubmitting(false);
      isSavingRef.current = false;
    }
  }, [isTimeMet, isSubmitting, isFullyCompleted, user?.id, lessonId, lesson?.course_id, saveAllProgress, timerStorageKey, queueFailedSave, t, refetchProgress]);

  // ════════════════════════════════════════════
  //  AUTO-COMPLETION SYSTEM
  //  Automatically marks lesson complete when
  //  progress reaches 100% without user clicking
  // ════════════════════════════════════════════
  const autoCompletedRef = useRef(false);
  
  // Reset auto-completed when lesson changes
  useEffect(() => {
    autoCompletedRef.current = false;
  }, [lessonId]);

  // Auto-completion: Standard lessons (time-based / reading scroll)
  useEffect(() => {
    if (!user?.id) return;
    if (isPythonLesson) return;
    if (!isTimeMet || isFullyCompleted || isSubmitting || autoCompletedRef.current) return;
    if (isReadingLesson && readingProgress < 90) return;
    
    console.log('[AutoComplete] Triggering auto-completion for standard lesson', lessonId);
    autoCompletedRef.current = true;
    handleMarkComplete();
  }, [user?.id, isTimeMet, isFullyCompleted, isSubmitting, isPythonLesson, isReadingLesson, readingProgress, lessonId, handleMarkComplete]);

  // Auto-completion: Video lessons (KalturaPlayer onComplete)
  useEffect(() => {
    if (!user?.id) return;
    if (!isVideoCompleted) return;
    if (isPythonLesson) return;
    if (isFullyCompleted || isSubmitting || autoCompletedRef.current) return;
    
    console.log('[AutoComplete] Video completed — auto-completing lesson', lessonId);
    autoCompletedRef.current = true;
    handleMarkComplete();
  }, [user?.id, isVideoCompleted, isPythonLesson, isFullyCompleted, isSubmitting, lessonId, handleMarkComplete]);

  // Auto-completion: Reading lessons (scroll 100% + time met)
  useEffect(() => {
    if (!user?.id) return;
    if (!isReadingLesson) return;
    if (readingProgress < 100) return;
    if (isFullyCompleted || isSubmitting || autoCompletedRef.current) return;
    if (!isTimeMet) return;
    
    console.log('[AutoComplete] Reading scroll 100% — auto-completing lesson', lessonId);
    autoCompletedRef.current = true;
    handleMarkComplete();
  }, [user?.id, readingProgress, isTimeMet, isReadingLesson, isFullyCompleted, isSubmitting, lessonId, handleMarkComplete]);



  useEffect(() => {
    if (!timerStorageKey) {
      setElapsedSeconds(0);
      return;
    }
    const saved = localStorage.getItem(timerStorageKey);
    const parsed = saved ? parseInt(saved, 10) : 0;
    
    // Safety check: ensure it doesn't exceed requiredSeconds
    const initialElapsed = Math.min(parsed, requiredSeconds);
    
    console.log(`[Progress Timer Log] Initializing timer for key [${timerStorageKey}] to ${initialElapsed}s (required: ${requiredSeconds}s)`);
    setElapsedSeconds(initialElapsed);
  }, [timerStorageKey, requiredSeconds]);

  /* ── Stay-timer ticker with storage syncing ── */
  useEffect(() => {
    if (isCurrentCheckpointDone || isTimeMet || !lesson || requiredSeconds <= 0 || !timerStorageKey) return;

    console.log(`[Progress Timer Log] Starting timer for key [${timerStorageKey}]. Current elapsed: ${elapsedSeconds}s, required: ${requiredSeconds}s`);

    const interval = setInterval(() => {
      setElapsedSeconds(prev => {
        const next = prev + 1;
        
        // Sync tick to localStorage
        localStorage.setItem(timerStorageKey, String(next));
        
        if (next >= requiredSeconds) {
          console.log(`[Progress Timer Log] Timer target reached for key [${timerStorageKey}]!`);
          clearInterval(interval);
          return requiredSeconds;
        }
        return next;
      });
    }, 1000);

    return () => {
      console.log(`[Progress Timer Log] Clearing interval for key [${timerStorageKey}]`);
      clearInterval(interval);
    };
  }, [isCurrentCheckpointDone, isTimeMet, lesson, requiredSeconds, timerStorageKey]);





  /* ── Save checkpoint progress to Supabase (notes column) ── */
  const saveCheckpointProgress = useCallback(async (newCompletedIndices: number[]) => {
    if (!user?.id || !lessonId) {
      throw new Error('User is not authenticated or lesson ID is missing');
    }
    const pct = Math.round((newCompletedIndices.length / PYTHON_CHECKPOINTS.length) * 100);
    const isAll = newCompletedIndices.length === PYTHON_CHECKPOINTS.length;
    const now = new Date().toISOString();

    console.log(`[Progress DB Log] Saving Python checkpoint progress. User: ${user.id}, completed: [${newCompletedIndices.join(', ')}], percentage: ${pct}%`);

    // Save all dependent tables consistently
    const results = await saveAllProgress(
      user.id,
      lessonId,
      lesson?.course_id || null,
      isAll ? 'completed' : 'in_progress',
      pct,
      JSON.stringify(newCompletedIndices),
    );

    const hasFailure = results.some(r => !r.success);
    if (hasFailure) {
      throw new Error('Failed to save progress to some tables');
    }
  }, [user?.id, lessonId, lesson?.course_id, saveAllProgress]);

  const handleCheckpointClick = (cp: PythonCheckpoint) => {
    setActiveCheckpointIdx(cp.id);
    setElapsedSeconds(0);
    // Reset auto-completion for the new checkpoint
    autoCompletedRef.current = false;
    setVideoSeekState({ time: parseStartTimeToSeconds(cp.startTime), triggerId: Date.now() });
  };

  /* ── Handle marking a checkpoint complete ── */
  const handleMarkCheckpointComplete = async () => {
    if (!isTimeMet || isSubmitting || isCurrentCheckpointDone || !user?.id || !lessonId) return;

    // Concurrent Flight Locking
    if (isSavingRef.current) {
      console.warn('[Progress DB Log] Save request already in flight — blocking concurrent submission');
      return;
    }

    try {
      isSavingRef.current = true;
      setIsSubmitting(true);
      console.log(`[Progress DB Log] Attempting to mark checkpoint ${activeCheckpointIdx} complete...`);

      const updated = [...new Set([...completedCheckpoints, activeCheckpointIdx])];
      const isAll = updated.length === PYTHON_CHECKPOINTS.length;
      
      // Attempt to save to Supabase
      try {
        await saveCheckpointProgress(updated);
        
        // Success feedback
        toast.success(
          t.lessonDetail.checkpointSaveSuccess.replace('{title}', activeCheckpoint?.title || '')
        );
        
        // Clear active checkpoint timer from localStorage upon completion
        if (timerStorageKey) {
          localStorage.removeItem(timerStorageKey);
        }
      } catch (dbErr) {
        console.error('[Progress DB Log] Database write failed — queueing for offline retry', dbErr);
        
        // Queue progress update for offline sync
        queueFailedSave({
          userId: user.id,
          lessonId,
          isPython: true,
          completedCheckpoints: updated,
        });

        toast.warning(t.lessonDetail.checkpointOfflineWarning);
      }

      // Refresh progress data in UI silently
      await refetchProgress();
      
      // Auto-advance to next uncompleted checkpoint
      const updatedSet = new Set(updated);
      const next = PYTHON_CHECKPOINTS.find(cp => !updatedSet.has(cp.id));
      if (next) {
        console.log(`[Progress Timer Log] Auto-advancing to next checkpoint: ${next.id} (${next.title})`);
        setActiveCheckpointIdx(next.id);
        // Reset auto-completion for the new checkpoint
        autoCompletedRef.current = false;
      }
    } catch (err) {
      console.error('[Progress DB Log] Unexpected error during checkpoint completion:', err);
      toast.error(t.lessonDetail.unexpectedError);
    } finally {
      setIsSubmitting(false);
      isSavingRef.current = false;
    }
  };

  // ════════════════════════════════════════════
  //  AUTO-COMPLETION: Python Checkpoints
  //  Triggers when elapsed time reaches required
  // ════════════════════════════════════════════
  useEffect(() => {
    if (!user?.id) return;
    if (!isPythonLesson) return;
    if (!isTimeMet || isCurrentCheckpointDone || isSubmitting || autoCompletedRef.current) return;
    if (!activeCheckpoint) return;
    
    console.log(`[AutoComplete] Python checkpoint ${activeCheckpointIdx} time met — auto-completing`);
    autoCompletedRef.current = true;
    handleMarkCheckpointComplete();
  }, [user?.id, isTimeMet, isCurrentCheckpointDone, isSubmitting, isPythonLesson, activeCheckpointIdx]);

  /* ─── Loading ─── */
  if (loading || (progressLoading && !progress)) {
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
        <h2 className="text-xl font-semibold mb-2">{t.lessonDetail.notFound}</h2>
        <p className="text-muted-foreground mb-4">{t.lessonDetail.notFoundDesc}</p>
        <Button onClick={() => navigate('/lessons')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.lessonDetail.backToLessonsBtn}
        </Button>
      </div>
    );
  }

  const title = lesson[`title_${language}` as 'title_th' | 'title_en'];
  const content = lesson[`content_${language}` as 'content_th' | 'content_en'];

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
        {t.lessonDetail.backToCourseBtn}
      </Link>

      {/* Lesson Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 p-6 md:p-8 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-white/20 text-white border-0">
              {t.lessons[lesson.lesson_type as keyof typeof t.lessons] || lesson.lesson_type}
            </Badge>
            {lesson.difficulty && (
              <Badge className={`${difficultyColors[lesson.difficulty]} border`}>
                {t.difficulty[lesson.difficulty] || lesson.difficulty}
              </Badge>
            )}
            {isPythonLesson && (
              <Badge className="bg-amber-400/90 text-amber-900 border-0 font-bold">
                {t.lessonDetail.pythonSubTopicsCount}
              </Badge>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
          {isPythonLesson ? (
            <div className="flex flex-col gap-2 mt-3">
              <div className="flex items-center justify-between text-sm text-indigo-100">
                <span>{t.lessonDetail.overallProgressLabel}</span>
                <span className="font-bold text-white">{t.lessonDetail.pythonProgressText.replace('{completed}', completedCheckpoints.length.toString()).replace('{total}', PYTHON_CHECKPOINTS.length.toString()).replace('{percent}', overallPct.toString())}</span>
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
                  {t.lessonDetail.pythonAllCompleted}
                </div>
              )}
            </div>
          ) : (
            (durationMinutes > 0) && (
              <div className="flex items-center gap-2 text-indigo-100">
                <Clock className="w-4 h-4" />
                <span>
                  {isReadingLesson
                    ? t.lessonDetail.estReadingTime.replace('{minutes}', durationMinutes.toString())
                    : t.lessonDetail.readingTime.replace('{minutes}', durationMinutes.toString())
                  }
                </span>
                {isReadingLesson && (
                  <span className="flex items-center gap-1 ml-2 text-indigo-200">
                    <Eye className="w-3.5 h-3.5" />
                    <span className="text-xs">{t.lessonDetail.wordCountText.replace('{count}', readingContent.split(/\s+/).filter(Boolean).length.toLocaleString())}</span>
                  </span>
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* Video Player */}
      {lesson.video_url && (
        <Card className="border-slate-100">
          <CardContent className="pt-6">
              <div className="aspect-video w-full mb-6">
                <KalturaPlayer
                  source={{ url: lesson.video_url }}
                  enforceNoSkip={true}
                  seekToSeconds={videoSeekState?.time}
                  showLockIndicator={true}
                  onComplete={() => {
                    console.log('[Lesson] Video completed!');
                    setIsVideoCompleted(true);
                  }}
                  onProgress={(p) => console.log(`[Lesson] Progress: ${p}%`)}
                />
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
                <p className="text-muted-foreground">{t.lessonDetail.videoPlaceholderText}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content — show short description for non-reading lessons */}
      {content && !isReadingLesson && (
        <Card className="border-slate-100">
          <CardHeader>
            <CardTitle>{t.lessonDetail.contentHeader}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{content}</p>
          </CardContent>
        </Card>
      )}

      {/* Lesson Type Specific */}
      {lesson.lesson_type === 'quiz' && <QuizCard />}

      {lesson.lesson_type === 'exercise' && <ExerciseCard courseId={lesson.course_id} lessonId={lesson.id} />}

      {/* ══════════════════════════════════════════════════════════
          READING LESSON: Rich Article Renderer
      ══════════════════════════════════════════════════════════ */}
      {isReadingLesson && readingContent && (
        <>
          {/* Reading progress bar — fixed at top */}
          <div className="sticky top-0 z-30 -mx-1">
            <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${readingProgress}%` }}
              />
            </div>
          </div>

          <Card className="border-slate-100 overflow-hidden shadow-sm">
            <CardHeader className="bg-gradient-to-r from-indigo-50 via-purple-50/40 to-slate-50 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  {t.lessonDetail.articleHeader}
                </CardTitle>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {t.lessonDetail.estReadingTime.replace('{minutes}', durationMinutes.toString())}
                  </span>
                  <span className="font-medium text-indigo-600">
                    {Math.round(readingProgress)}%
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div
                ref={readingContentRef}
                className="reading-article px-6 py-8 md:px-10 md:py-10"
                onScroll={(e) => {
                  const el = e.currentTarget;
                  const scrollPct = el.scrollTop / (el.scrollHeight - el.clientHeight);
                  setReadingProgress(Math.min(100, Math.round(scrollPct * 100)));
                }}
                style={{ maxHeight: '70vh', overflowY: 'auto', scrollBehavior: 'smooth' }}
              >
                <ReadingContentRenderer content={readingContent} />
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Reading lesson with no content yet */}
      {isReadingLesson && !readingContent && (
        <Card className="border-slate-100">
          <CardHeader><CardTitle>{t.lessonDetail.articleHeader}</CardTitle></CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-muted-foreground">{t.lessonDetail.articleNotAvailable}</p>
            </div>
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
              <button
                onClick={() => handleCheckpointClick(activeCheckpoint)}
                className="w-full text-left mb-4 flex items-center gap-3 p-3 rounded-xl bg-white border border-indigo-100 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0 group-hover:bg-indigo-200 transition-colors">
                  <span className="text-indigo-700 font-bold text-sm">{activeCheckpointIdx + 1}</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-800 text-sm group-hover:text-indigo-700 transition-colors">{activeCheckpoint.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    ⌨️ {activeCheckpoint.startTime} · {t.lessonDetail.pythonRequiredTime.replace('{duration}', formatDuration(activeCheckpoint.duration))}
                  </div>
                </div>
                {isCurrentCheckpointDone && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />
                )}
              </button>
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
                      ? t.lessonDetail.pythonFullyCompletedTitle
                      : isCurrentCheckpointDone
                      ? t.lessonDetail.pythonCheckpointDoneTitle.replace('{title}', activeCheckpoint?.title || '')
                      : t.lessonDetail.pythonAccumulatingTitle.replace('{title}', activeCheckpoint?.title || '')
                    }
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">
                    {isFullyCompleted
                      ? t.lessonDetail.pythonFullyCompletedDesc.replace('{completedAt}', formatCompletedAt(progress?.completed_at))
                      : isCurrentCheckpointDone
                      ? t.lessonDetail.pythonCheckpointDoneDesc
                      : t.lessonDetail.pythonAccumulatingDesc
                    }
                  </div>
                </div>
              </div>

              {/* Timer + Button */}
              {!isFullyCompleted && (
                <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-3 shrink-0">
                  {!isCurrentCheckpointDone && requiredSeconds > 0 && (
                    <div className="text-left md:text-right shrink-0">
                      <div className="text-xs text-muted-foreground font-medium">{t.lessonDetail.requiredAccumulatedTime}</div>
                      <div className="text-sm font-semibold text-indigo-600 mt-0.5">
                        {isTimeMet
                          ? t.lessonDetail.timeAccumulatedDone
                          : t.lessonDetail.timeRemainingText.replace('{time}', formatCountdown(requiredSeconds - elapsedSeconds))
                        }
                      </div>
                    </div>
                  )}
                  <Button
                    onClick={handleMarkCheckpointComplete}
                    disabled={!isTimeMet || isSubmitting || isCurrentCheckpointDone}
                    className={`w-full md:w-auto font-semibold px-6 transition-all duration-350 ${
                      isFullyCompleted || isCurrentCheckpointDone
                        ? 'bg-emerald-600 hover:bg-emerald-600 text-white opacity-80 cursor-default shadow-none hidden md:inline-flex' // Hide on mobile, dim on desktop
                        : isTimeMet
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-md shadow-emerald-200 animate-pulse-subtle'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed hover:bg-slate-200 shadow-none'
                    }`}
                    style={{
                      display: (isFullyCompleted || isCurrentCheckpointDone) ? 'none' : undefined
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2 justify-center">
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-slate-300 border-t-white" />
                        {t.lessonDetail.savingProgress}
                      </span>
                    ) : isCurrentCheckpointDone ? (
                      t.lessonDetail.completedLabel
                    ) : isTimeMet ? (
                      t.lessonDetail.markAsCompletedLabel
                    ) : (
                      t.lessonDetail.waitingForTime
                    )}
                  </Button>
                </div>
              )}
            </div>

            {/* Per-checkpoint progress bar */}
            {!isCurrentCheckpointDone && !isFullyCompleted && requiredSeconds > 0 && (
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{t.lessonDetail.accumulatedTimeHeader}</span>
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
                <span className="text-xs text-slate-500 font-medium">{t.lessonDetail.progressOverviewHeader}</span>
                <span className="text-xs text-slate-400">{overallPct}%</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {PYTHON_CHECKPOINTS.map(cp => (
                  <button
                    key={cp.id}
                    title={`${cp.id + 1}. ${cp.title}`}
                    onClick={() => { setActiveCheckpointIdx(cp.id); setElapsedSeconds(0); autoCompletedRef.current = false; }}
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
                    {isFullyCompleted ? t.lessonDetail.standardCompletedTitle : t.lessonDetail.standardMarkCompleteTitle}
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">
                    {isFullyCompleted
                      ? t.lessonDetail.standardCompletedDesc.replace('{completedAt}', formatCompletedAt(progress?.completed_at))
                      : t.lessonDetail.standardAccumulateTimeDesc
                    }
                  </div>
                </div>
              </div>

              <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-3 shrink-0">
                {!isFullyCompleted && requiredSeconds > 0 && (
                  <div className="text-left md:text-right shrink-0">
                    <div className="text-xs text-muted-foreground font-medium">{t.lessonDetail.requiredStudyTimeLabel}</div>
                    <div className="text-sm font-semibold text-indigo-600 mt-0.5">
                      {isTimeMet ? t.lessonDetail.studyTimeAccumulatedDone : t.lessonDetail.studyTimeRemainingText.replace('{minutes}', Math.floor((requiredSeconds - elapsedSeconds) / 60).toString()).replace('{seconds}', ((requiredSeconds - elapsedSeconds) % 60).toString())}
                    </div>
                  </div>
                )}
                <Button
                  onClick={handleMarkComplete}
                  disabled={!isTimeMet || isSubmitting || isFullyCompleted}
                  className={`w-full md:w-auto font-semibold px-6 transition-all duration-350 ${
                    isFullyCompleted
                      ? 'bg-green-600 hover:bg-green-600 text-white border-green-650 opacity-90 cursor-default shadow-none hidden'
                      : isTimeMet
                      ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer shadow-md shadow-green-200 animate-pulse-subtle'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed hover:bg-slate-200 shadow-none'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2 justify-center">
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-slate-300 border-t-white" />
                      {t.lessonDetail.savingProgress}
                    </span>
                  ) : isFullyCompleted ? t.lessonDetail.completedLabel : isTimeMet ? t.lessonDetail.markAsCompletedLabel : t.lessonDetail.waitingForTime}
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

      {/* ══════════════════════════════════════════════════════════
          PYTHON LESSON: 35 Checkpoint List
      ══════════════════════════════════════════════════════════ */}
      {isPythonLesson && (
        <Card className="border-slate-100 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-indigo-50/40 border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                {t.lessonDetail.allSubtopicsTitle}
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">
                  <span className="font-bold text-emerald-600">{completedCheckpoints.length}</span>/{PYTHON_CHECKPOINTS.length} {t.lessonDetail.subtopicsCompletedStatus.replace('{completed}', completedCheckpoints.length.toString()).replace('{total}', PYTHON_CHECKPOINTS.length.toString())}
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
                  onClick={() => handleCheckpointClick(cp)}
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
                  <>{t.lessonDetail.showLessBtn} <ChevronDown className="w-4 h-4 rotate-180 transition-transform" /></>
                ) : (
                  <>{t.lessonDetail.showMoreSubtopicsBtn.replace('{count}', (PYTHON_CHECKPOINTS.length - 10).toString())} <ChevronDown className="w-4 h-4 transition-transform" /></>
                )}
              </button>
            )}
          </CardContent>
        </Card>
      )}

          </div>
  );
}
