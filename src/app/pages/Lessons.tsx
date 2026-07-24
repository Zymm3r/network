import { useEffect, useState } from 'react';
import { useI18n } from '../i18n';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  FileQuestion, PenTool, ChevronRight, ChevronDown,
  CheckCircle2, Trophy, Zap, Star, Lock, Play, RotateCcw,
  BookOpen, Shield, Network, Cpu, Wrench, Code2
} from 'lucide-react';
import QuizCard from '../components/QuizCard';
import ExerciseCard from '../components/ExerciseCard';
import { COURSE_QUIZ_MAP, COURSE_EXERCISE_MAP } from '../data/courseQuizData';
import { exerciseProgressService } from '../../application/services/ExerciseProgressService';
import { studyProgressService, type CourseChapterCompletion } from '../../application/services/StudyProgressService';

/* ─────────────────────────────────────────
   Course catalogue — ordered easy → hard
───────────────────────────────────────── */
interface CourseEntry {
  id: string;
  name: string;
  track: string;
  trackIcon: React.ElementType;
  trackColor: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  difficultyLabel: string;
  xp: number;
}

const DIFFICULTY_ORDER = { beginner: 0, intermediate: 1, advanced: 2 };

const COURSES: CourseEntry[] = [
  // CCNA Track — Beginner
  { id: 'ccna-001', name: 'เครือข่ายพื้นฐาน (OSI / TCP/IP)', track: 'CCNA', trackIcon: Network, trackColor: 'indigo', difficulty: 'beginner', difficultyLabel: 'เบื้องต้น', xp: 25 },
  { id: 'ccna-002', name: 'Switching & VLANs', track: 'CCNA', trackIcon: Network, trackColor: 'indigo', difficulty: 'beginner', difficultyLabel: 'เบื้องต้น', xp: 25 },
  { id: 'ccna-003', name: 'Routing Protocols', track: 'CCNA', trackIcon: Network, trackColor: 'indigo', difficulty: 'intermediate', difficultyLabel: 'ปานกลาง', xp: 30 },
  { id: 'ccna-004', name: 'WAN Technologies', track: 'CCNA', trackIcon: Network, trackColor: 'indigo', difficulty: 'intermediate', difficultyLabel: 'ปานกลาง', xp: 30 },
  { id: 'ccna-005', name: 'IP Services (DHCP/NAT/ACL)', track: 'CCNA', trackIcon: Network, trackColor: 'indigo', difficulty: 'intermediate', difficultyLabel: 'ปานกลาง', xp: 30 },
  { id: 'ccna-006', name: 'Network Security', track: 'CCNA', trackIcon: Network, trackColor: 'indigo', difficulty: 'intermediate', difficultyLabel: 'ปานกลาง', xp: 30 },
  { id: 'ccna-007', name: 'Wireless Networking', track: 'CCNA', trackIcon: Network, trackColor: 'indigo', difficulty: 'intermediate', difficultyLabel: 'ปานกลาง', xp: 30 },
  { id: 'ccna-008', name: 'Network Automation', track: 'CCNA', trackIcon: Network, trackColor: 'indigo', difficulty: 'advanced', difficultyLabel: 'ยาก', xp: 40 },
  // Security Track
  { id: 'sec-001', name: 'Firewall & Stateful Inspection', track: 'Security', trackIcon: Shield, trackColor: 'rose', difficulty: 'intermediate', difficultyLabel: 'ปานกลาง', xp: 35 },
  { id: 'sec-002', name: 'VPN (IPSec / SSL)', track: 'Security', trackIcon: Shield, trackColor: 'rose', difficulty: 'intermediate', difficultyLabel: 'ปานกลาง', xp: 35 },
  { id: 'sec-003', name: 'IDS/IPS', track: 'Security', trackIcon: Shield, trackColor: 'rose', difficulty: 'advanced', difficultyLabel: 'ยาก', xp: 45 },
  // Advanced Track
  { id: 'adv-001', name: 'OSPF Advanced', track: 'Advanced', trackIcon: Cpu, trackColor: 'violet', difficulty: 'advanced', difficultyLabel: 'ยาก', xp: 50 },
  { id: 'adv-003', name: 'BGP Routing', track: 'Advanced', trackIcon: Cpu, trackColor: 'violet', difficulty: 'advanced', difficultyLabel: 'ยาก', xp: 50 },
  // Troubleshoot Track
  { id: 'troubleshoot-001', name: 'Wireshark & Packet Analysis', track: 'Troubleshoot', trackIcon: Wrench, trackColor: 'amber', difficulty: 'intermediate', difficultyLabel: 'ปานกลาง', xp: 35 },
  { id: 'troubleshoot-002', name: 'Network Troubleshooting', track: 'Troubleshoot', trackIcon: Wrench, trackColor: 'amber', difficulty: 'advanced', difficultyLabel: 'ยาก', xp: 45 },
  // DevNet Track
  { id: 'devnet-001', name: 'Python for Network Engineers', track: 'DevNet', trackIcon: Code2, trackColor: 'emerald', difficulty: 'intermediate', difficultyLabel: 'ปานกลาง', xp: 40 },
  { id: 'devnet-004', name: 'REST APIs for Networking', track: 'DevNet', trackIcon: Code2, trackColor: 'emerald', difficulty: 'intermediate', difficultyLabel: 'ปานกลาง', xp: 40 },
  { id: 'devnet-005', name: 'Git & CI/CD for Network Code', track: 'DevNet', trackIcon: Code2, trackColor: 'emerald', difficulty: 'intermediate', difficultyLabel: 'ปานกลาง', xp: 40 },
].sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty]);

/* ─── track color helpers ─── */
const TRACK_COLORS: Record<string, { bg: string; text: string; border: string; icon: string; badge: string }> = {
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', icon: 'text-indigo-500', badge: 'bg-indigo-100 text-indigo-700' },
  rose:   { bg: 'bg-rose-50',   text: 'text-rose-700',   border: 'border-rose-200',   icon: 'text-rose-500',   badge: 'bg-rose-100 text-rose-700' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', icon: 'text-violet-500', badge: 'bg-violet-100 text-violet-700' },
  amber:  { bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200',  icon: 'text-amber-500',  badge: 'bg-amber-100 text-amber-700' },
  emerald:{ bg: 'bg-emerald-50',text: 'text-emerald-700',border: 'border-emerald-200',icon: 'text-emerald-500',badge: 'bg-emerald-100 text-emerald-700' },
};

const DIFF_STYLE: Record<string, string> = {
  beginner:     'bg-emerald-100 text-emerald-700',
  intermediate: 'bg-amber-100 text-amber-700',
  advanced:     'bg-rose-100 text-rose-700',
};

/* ─── Session score store (in-memory) ─── */
type ScoreMap = Record<string, { score: number; total: number; passed: boolean }>;

/* ═══════════════════════════════════════
   Main Component
═══════════════════════════════════════ */
export function Lessons() {
  const { t } = useI18n();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'quiz' | 'exercise'>('quiz');
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [quizScores, setQuizScores] = useState<ScoreMap>({});
  const [exerciseScores, setExerciseScores] = useState<ScoreMap>({});
  const [chapterCompletion, setChapterCompletion] = useState<CourseChapterCompletion>({});
  const [progressHydrated, setProgressHydrated] = useState(false);

  const quizCourses  = COURSES.filter(c => !!COURSE_QUIZ_MAP[c.id]);
  const exCourses    = COURSES.filter(c => !!COURSE_EXERCISE_MAP[c.id]);
  const displayList  = activeTab === 'quiz' ? quizCourses : exCourses;
  const scoreMap     = activeTab === 'quiz' ? quizScores  : exerciseScores;

  // `/lessons` must never use session state as the authority for exercise
  // completion or its chapter gate.  Hydrate both from the user's RLS-scoped
  // Supabase records whenever the signed-in account changes.
  useEffect(() => {
    let cancelled = false;
    if (!user?.id) {
      setExerciseScores({});
      setChapterCompletion({});
      setProgressHydrated(true);
      return () => { cancelled = true; };
    }

    const courseIds = COURSES.map(course => course.id);
    setProgressHydrated(false);
    void Promise.all([
      studyProgressService.getCourseChapterCompletion(user.id, courseIds),
      exerciseProgressService.getCompletedExercises(user.id, courseIds),
    ]).then(([chapters, completedExercises]) => {
      if (cancelled) return;
      setChapterCompletion(chapters);
      setExerciseScores(Object.fromEntries(completedExercises.map(exercise => [exercise.exercise_id, {
        score: exercise.score ?? 1,
        total: 1,
        passed: true,
      }])));
    }).catch(error => {
      // Fail closed: exercise access is not granted unless chapter completion
      // was confirmed by Supabase.
      console.error('[Lessons] Failed to hydrate exercise access:', error);
      if (!cancelled) setChapterCompletion({});
    }).finally(() => {
      if (!cancelled) setProgressHydrated(true);
    });

    return () => { cancelled = true; };
  }, [user?.id]);

  const totalPassed  = Object.values(scoreMap).filter(s => s.passed).length;
  const totalAttempted = Object.values(scoreMap).length;

  function handleToggle(courseId: string) {
    setActiveCourseId(prev => prev === courseId ? null : courseId);
  }

  function handleQuizComplete(courseId: string, score: number, total: number) {
    const passed = score / total >= 0.8;
    setQuizScores(prev => ({ ...prev, [courseId]: { score, total, passed } }));
    if (passed) {
      // auto-advance to next in list
      const idx = quizCourses.findIndex(c => c.id === courseId);
      const next = quizCourses[idx + 1];
      if (next) setTimeout(() => setActiveCourseId(next.id), 1200);
    }
  }

  function handleExerciseComplete(courseId: string, passed: boolean) {
    setExerciseScores(prev => ({
      ...prev,
      [courseId]: { score: passed ? 1 : 0, total: 1, passed },
    }));
    if (passed) {
      const idx = exCourses.findIndex(c => c.id === courseId);
      const next = exCourses[idx + 1];
      if (next) setTimeout(() => setActiveCourseId(next.id), 1200);
    }
  }

  function handleNextCourse(courseId: string) {
    const list = activeTab === 'quiz' ? quizCourses : exCourses;
    const idx = list.findIndex(c => c.id === courseId);
    const next = list[idx + 1];
    if (next) setActiveCourseId(next.id);
  }

  /* ── Render ── */
  return (
    <div className="space-y-6 pb-12">

      {/* ── Page Header ── */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">
          {activeTab === 'quiz' ? '🧠 แบบทดสอบ' : '💻 แบบฝึกหัด Python'}
        </h1>
        <p className="text-slate-500 text-sm">
          {activeTab === 'quiz'
            ? 'ทดสอบความเข้าใจแต่ละหัวข้อ — ต้องได้ ≥ 80% เพื่อผ่านและไปต่อ'
            : 'ฝึกเขียนโค้ด Python เพื่อแก้ปัญหาเครือข่าย — ต้องได้ ≥ 80% เพื่อผ่าน'}
        </p>
      </div>

      {/* ── Tab Switcher ── */}
      <div className="flex gap-2">
        <button
          onClick={() => { setActiveTab('quiz'); setActiveCourseId(null); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'quiz'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <FileQuestion className="w-4 h-4" /> แบบทดสอบ (Quiz)
        </button>
        <button
          onClick={() => { setActiveTab('exercise'); setActiveCourseId(null); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'exercise'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <PenTool className="w-4 h-4" /> แบบฝึกหัด (Python)
        </button>
      </div>

      {/* ── Progress Bar ── */}
      {totalAttempted > 0 && (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50 border border-slate-100">
          <div className="flex items-center gap-2 text-indigo-600">
            <Trophy className="w-5 h-5" />
            <span className="font-bold text-sm">{totalPassed} / {displayList.length} ผ่าน</span>
          </div>
          <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
              style={{ width: `${(totalPassed / displayList.length) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-1.5 text-amber-600 font-semibold text-sm">
            <Zap className="w-4 h-4" />
            +{Object.values(scoreMap).reduce((sum, s) => sum + (s.passed ? 1 : 0), 0) * 30} XP
          </div>
        </div>
      )}

      {/* ── Course List ── */}
      <div className="space-y-3">
        {displayList.map((course, idx) => {
          const sessionScore = scoreMap[course.id];
          const isPassed     = sessionScore?.passed ?? false;
          const isAttempted  = !!sessionScore;
          const isActive     = activeCourseId === course.id;
          const chapters = chapterCompletion[course.id];
          const isExerciseLocked = activeTab === 'exercise' && (
            !progressHydrated || !user?.id || !chapters?.complete
          );
          const isLocked = isExerciseLocked || (
            activeTab === 'quiz' && idx > 0 && !scoreMap[displayList[idx - 1].id]?.passed && !isAttempted
          );
          const tc           = TRACK_COLORS[course.trackColor];
          const TrackIcon    = course.trackIcon;

          return (
            <div key={course.id} className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              isActive ? 'border-indigo-300 shadow-lg shadow-indigo-100' : 'border-slate-200 shadow-sm'
            } ${isLocked ? 'opacity-60' : ''}`}>

              {/* ── Card Header (always visible) ── */}
              <button
                onClick={() => !isLocked && handleToggle(course.id)}
                disabled={isLocked}
                className={`w-full flex items-center gap-4 p-4 text-left transition-colors ${
                  isActive ? 'bg-indigo-50/60' : 'bg-white hover:bg-slate-50'
                } ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {/* Number / Status icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${
                  isPassed
                    ? 'bg-emerald-100 text-emerald-600'
                    : isActive
                    ? 'bg-indigo-100 text-indigo-600'
                    : isLocked
                    ? 'bg-slate-100 text-slate-400'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {isPassed
                    ? <CheckCircle2 className="w-5 h-5" />
                    : isLocked
                    ? <Lock className="w-4 h-4" />
                    : <span>{idx + 1}</span>
                  }
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tc.badge}`}>
                      <TrackIcon className="w-3 h-3 inline mr-1" />
                      {course.track}
                    </span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${DIFF_STYLE[course.difficulty]}`}>
                      {course.difficultyLabel}
                    </span>
                    {isPassed && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        ผ่านแล้ว {sessionScore.score}/{sessionScore.total} ข้อ
                      </span>
                    )}
                    {isAttempted && !isPassed && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                        {sessionScore.score}/{sessionScore.total} ข้อ — ยังไม่ผ่าน
                      </span>
                    )}
                  </div>
                  <p className="font-semibold text-slate-800 mt-1 text-sm leading-snug">{course.name}</p>
                  {isExerciseLocked && progressHydrated && (
                    <p className="mt-1 text-xs text-slate-500">
                      เรียนให้ครบทุกบทก่อน ({chapters?.completed || 0}/{chapters?.total || 0} บท)
                    </p>
                  )}
                </div>

                {/* Right: XP + chevron */}
                <div className="flex items-center gap-3 shrink-0">
                  {!isLocked && (
                    <span className="text-xs text-amber-600 font-bold flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" />+{course.xp} XP
                    </span>
                  )}
                  {isLocked
                    ? <Lock className="w-4 h-4 text-slate-300" />
                    : isActive
                    ? <ChevronDown className="w-5 h-5 text-indigo-500 transition-transform" />
                    : <ChevronRight className="w-5 h-5 text-slate-400 transition-transform" />
                  }
                </div>
              </button>

              {/* ── Inline action bar (when collapsed but attempted) ── */}
              {!isActive && isAttempted && !isLocked && (
                <div className="flex items-center justify-between px-4 pb-3 pt-0 bg-white border-t border-slate-100">
                  <div className="flex gap-2 items-center text-sm text-slate-500">
                    <BookOpen className="w-4 h-4" />
                    {isPassed ? 'เสร็จสมบูรณ์' : 'ลองทำอีกครั้ง'}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5 h-8 text-xs"
                      onClick={() => handleToggle(course.id)}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      ทำใหม่
                    </Button>
                    {isPassed && (
                      <Button
                        size="sm"
                        className="gap-1.5 h-8 text-xs bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => handleNextCourse(course.id)}
                      >
                        ถัดไป <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* ── Expanded: Quiz / Exercise ── */}
              {isActive && (
                <div className="border-t border-slate-100 bg-slate-50/50 p-4">
                  {/* start/restart bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      {activeTab === 'quiz'
                        ? <><FileQuestion className="w-4 h-4 text-indigo-500" /> กำลังทำแบบทดสอบ</>
                        : <><PenTool className="w-4 h-4 text-emerald-500" /> กำลังทำแบบฝึกหัด Python</>
                      }
                    </div>
                    <div className="flex gap-2">
                      {isAttempted && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1.5 h-8 text-xs"
                          onClick={() => {
                            if (activeTab === 'quiz') {
                              setQuizScores(prev => { const n = {...prev}; delete n[course.id]; return n; });
                            } else {
                              setExerciseScores(prev => { const n = {...prev}; delete n[course.id]; return n; });
                            }
                          }}
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> เริ่มใหม่
                        </Button>
                      )}
                      {isPassed && (
                        <Button
                          size="sm"
                          className="gap-1.5 h-8 text-xs bg-emerald-600 hover:bg-emerald-700"
                          onClick={() => handleNextCourse(course.id)}
                        >
                          <Play className="w-3.5 h-3.5" /> ไปถัดไป
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* The actual card */}
                  {activeTab === 'quiz' ? (
                    <QuizCard
                      courseId={course.id}
                      courseName={course.name}
                      onComplete={(score, total) => handleQuizComplete(course.id, score, total)}
                      onNextLesson={
                        (() => {
                          const idx2 = quizCourses.findIndex(c => c.id === course.id);
                          return quizCourses[idx2 + 1] ? () => handleNextCourse(course.id) : undefined;
                        })()
                      }
                    />
                  ) : (
                    <ExerciseCard
                      courseId={course.id}
                      onComplete={(passed) => handleExerciseComplete(course.id, passed)}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── All done banner ── */}
      {totalPassed === displayList.length && displayList.length > 0 && (
        <div className="text-center py-10 space-y-2">
          <div className="text-5xl">🏆</div>
          <h3 className="text-xl font-bold text-slate-800">ผ่านทุกหัวข้อแล้ว!</h3>
          <p className="text-slate-500">คุณได้สะสม +{totalPassed * 30} XP จากเซสชันนี้</p>
        </div>
      )}
    </div>
  );
}
