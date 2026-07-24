import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  HelpCircle, CheckCircle2, XCircle, ChevronRight, Zap,
  Trophy, Sparkles, Star, ArrowRight, RotateCcw, Brain,
  Flame, Award, Clock, Keyboard
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useDailyStreak } from '../hooks/useDailyStreak';
import { useActivity } from '../contexts/ActivityContext';
import { playFeedback } from '../utils/feedback';
import { getQuizForCourse, QuizQuestion } from '../data/courseQuizData';
import { studyProgressService } from '../../application/services/StudyProgressService';

/* ─────────────────────────────────────────
   Types & Data
───────────────────────────────────────── */

const ENCOURAGEMENTS = {
  correct: [
    'เก่งมาก! 🎉', 'ถูกต้องเลย! ✨', 'สุดยอด! 🌟', 'เยี่ยมไปเลย! 💪',
    'ยอดเยี่ยม! 🏆', 'แม่นมาก! 🎯',
  ],
  incorrect: [
    'ไม่เป็นไร ลองใหม่ได้! 💡', 'เกือบแล้ว! 🤔', 'คราวหน้าได้แน่! 🙂',
  ],
  streak: [
    'ตอบถูกติดต่อกัน {n} ข้อ! 🔥',
    '{n} ข้อติด! หยุดไม่ได้แล้ว! ⚡',
  ],
};

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ─────────────────────────────────────────
   QuizCard Component
───────────────────────────────────────── */
interface QuizCardProps {
  courseName?: string;
  courseId?: string;
  lessonId?: string;
  onComplete?: (score: number, totalQuestions: number) => void;
  onNextLesson?: () => void;
}

export default function QuizCard({ courseName, courseId, lessonId, onComplete, onNextLesson }: QuizCardProps = {}) {
  const { user } = useAuth();
  const { currentStreak, recordActivity } = useDailyStreak(user?.id);
  const { totalSeconds } = useActivity();

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [shakeWrong, setShakeWrong] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [xpPopup, setXpPopup] = useState<{ amount: number; show: boolean }>({ amount: 0, show: false });
  const [questionKey, setQuestionKey] = useState(0);
  const [showStreakMessage, setShowStreakMessage] = useState(false);
  const [progressPulse, setProgressPulse] = useState(false);
  const [selectedPulse, setSelectedPulse] = useState<number | null>(null);
  const [showAchievement, setShowAchievement] = useState<string | null>(null);
  const correctAudioRef = useRef<HTMLAudioElement | null>(null);

  const questions = getQuizForCourse(courseId);
  const question = questions[currentQ];
  const totalQuestions = questions.length;
  const progressPct = ((currentQ + (isSubmitted ? 1 : 0)) / totalQuestions) * 100;

  // Motivational sub-text based on progress
  const getMotivationalText = () => {
    if (currentQ === 0 && !isSubmitted) return 'เริ่มกันเลย! 💪';
    if (currentQ === totalQuestions - 1) return 'ข้อสุดท้าย! 🏁';
    if (currentQ >= totalQuestions - 2) return 'เกือบจบแล้ว! 🔥';
    if (streak >= 3) return `🔥 ${streak} ข้อติด! ไม่หยุด!`;
    if (score > 0) return 'กำลังไปได้ดี! 📚';
    return 'ตั้งใจทำนะ! ✨';
  };

  // Keyboard shortcuts: A/B/C/D to select, Enter to submit/next
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (showResults) return;
      const key = e.key.toUpperCase();
      if (!isSubmitted) {
        const idx = 'ABCD'.indexOf(key);
        if (idx !== -1 && idx < question.choices.length) {
          handleSelect(idx);
        }
        if (e.key === 'Enter' && selectedIdx !== null) {
          handleSubmit();
        }
      } else {
        if (e.key === 'Enter') {
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const handleSelect = useCallback((idx: number) => {
    if (isSubmitted) return;
    setSelectedIdx(idx);
    setSelectedPulse(idx);
    setShowHint(false);
    playFeedback('select');
    setTimeout(() => setSelectedPulse(null), 300);
  }, [isSubmitted]);

  const handleSubmit = useCallback(() => {
    if (selectedIdx === null) return;
    const correct = selectedIdx === question.correctIndex;
    setIsCorrect(correct);
    setIsSubmitted(true);

    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setScore(s => s + 1);
      const earnedXp = 10 + (newStreak >= 3 ? 5 : 0);
      setXp(x => x + earnedXp);
      setXpPopup({ amount: earnedXp, show: true });
      setConfetti(true);
      setProgressPulse(true);
      playFeedback('correct');
      setTimeout(() => setConfetti(false), 1500);
      setTimeout(() => setXpPopup({ amount: 0, show: false }), 1800);
      setTimeout(() => setProgressPulse(false), 1000);
      if (newStreak >= 3) {
        playFeedback('streak');
        setShowStreakMessage(true);
        setTimeout(() => setShowStreakMessage(false), 2000);
      }
    } else {
      setStreak(0);
      setShakeWrong(true);
      playFeedback('incorrect');
      setTimeout(() => setShakeWrong(false), 600);
    }
  }, [selectedIdx, question.correctIndex, streak]);

  const handleNext = useCallback(async () => {
    if (currentQ < totalQuestions - 1) {
      setCurrentQ(q => q + 1);
      setQuestionKey(k => k + 1); // trigger transition animation
      setSelectedIdx(null);
      setIsSubmitted(false);
      setIsCorrect(false);
      setShowHint(false);
    } else {
      setShowResults(true);
      playFeedback('complete');
      recordActivity(); // Record daily streak
      // Check for achievements
      if (score + (selectedIdx === question.correctIndex ? 1 : 0) === totalQuestions) {
        playFeedback('perfect');
        setShowAchievement('🏆 Perfect Score!');
        setTimeout(() => setShowAchievement(null), 3000);
      }
      
      const finalScore = score + (selectedIdx === question.correctIndex ? 1 : 0);
      const passed = finalScore / totalQuestions >= 0.8;
      if (passed && user?.id && lessonId) {
        const result = await studyProgressService.markLessonComplete(user.id, lessonId, courseId || null, finalScore);
        if (result.error) {
          console.error('[QuizCard] Failed to persist lesson completion:', result.error);
          return;
        }
      }
      if (onComplete) {
        onComplete(finalScore, totalQuestions);
      }
    }
  }, [currentQ, totalQuestions, score, selectedIdx, question.correctIndex, recordActivity, onComplete, user?.id, lessonId, courseId]);

  const handleRestart = useCallback(() => {
    setCurrentQ(0);
    setSelectedIdx(null);
    setIsSubmitted(false);
    setIsCorrect(false);
    setScore(0);
    setStreak(0);
    setXp(0);
    setShowResults(false);
    setShowHint(false);
  }, []);

  // Format study time for display
  const formatTime = (s: number) => {
    if (s < 60) return `${s} วินาที`;
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    if (h > 0) return `${h} ชม. ${m % 60} นาที`;
    return `${m} นาที`;
  };

  /* ── Results Screen ── */
  if (showResults) {
    const pct = Math.round((score / totalQuestions) * 100);
    const isPerfect = score === totalQuestions;
    return (
      <Card className="border-slate-100 shadow-sm overflow-hidden quiz-results-enter relative">
        {/* Achievement badge overlay */}
        {showAchievement && (
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <div className="achievement-badge-enter bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-8 py-4 rounded-2xl shadow-2xl shadow-amber-300/50">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8" />
                <div>
                  <div className="text-xl font-bold">{showAchievement}</div>
                  <div className="text-sm opacity-90">Achievement Unlocked!</div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={`px-6 py-5 border-b ${isPerfect ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-indigo-100'}`}>
          <div className="flex items-center gap-2 font-semibold text-lg">
            {isPerfect ? <Trophy className="w-6 h-6 text-amber-500" /> : <Star className="w-6 h-6 text-indigo-600" />}
            <span className={isPerfect ? 'text-amber-700' : 'text-indigo-700'}>
              {isPerfect ? '🏆 ยอดเยี่ยม! คะแนนเต็ม!' : 'สรุปผลแบบทดสอบ'}
            </span>
          </div>
        </div>
        <CardContent className="p-6 md:p-10">
          <div className="text-center space-y-6">
            {/* Score Circle */}
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-36 h-36 score-circle-animate" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#E2E8F0" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="52"
                  fill="none"
                  stroke={isPerfect ? '#F59E0B' : '#6366F1'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${pct * 3.27} 327`}
                  transform="rotate(-90 60 60)"
                  className="score-circle-fill"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-slate-800 score-number-animate">{score}</span>
                <span className="text-sm text-slate-500">จาก {totalQuestions}</span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-full font-bold xp-badge-animate">
                <Zap className="w-5 h-5" />
                <span>+{xp} XP</span>
              </div>
              {currentStreak > 0 && (
                <div className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-4 py-2 rounded-full font-bold xp-badge-animate">
                  <Flame className="w-4 h-4" />
                  <span>{currentStreak} วันติด</span>
                </div>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-800">
                {pct >= 80 ? 'เยี่ยมไปเลย! คุณเข้าใจเนื้อหาดีมาก' : pct >= 60 ? 'ดีมาก! ลองทบทวนอีกนิด' : 'ลองทบทวนเนื้อหาแล้วมาทำใหม่นะ'}
              </h3>
              <p className="text-slate-500">
                คุณตอบถูก {score} จาก {totalQuestions} ข้อ ({pct}%)
              </p>
              {pct > 0 && (
                <div className="flex items-center justify-center gap-1.5 text-sm text-emerald-600 mt-1 xp-badge-animate">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12 18 8l-4 4M18 8v8" /><path d="M2 20h20" /></svg>
                  คุณกำลังพัฒนาขึ้นเรื่อยๆ!
                </div>
              )}
              {/* Learning time */}
              {totalSeconds > 0 && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  เวลาเรียนสะสม: {formatTime(totalSeconds)}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button onClick={handleRestart} variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" /> ทำแบบทดสอบใหม่
              </Button>
              {pct >= 80 && (
                <Button onClick={onNextLesson} className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                  ไปบทเรียนถัดไป <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  /* ── Quiz In Progress ── */
  return (
    <Card className={`border-slate-100 shadow-sm overflow-hidden relative ${shakeWrong ? 'quiz-shake' : ''}`}>
      {/* Progress Banner */}
      {(currentStreak > 0 || totalSeconds > 0) && (
        <div className="bg-gradient-to-r from-slate-50 to-indigo-50/50 px-6 py-2 border-b border-slate-100 flex items-center gap-4 text-xs text-slate-500 progress-banner-enter">
          {currentStreak > 0 && (
            <div className="flex items-center gap-1 text-orange-600 font-semibold">
              <Flame className="w-3.5 h-3.5" /> {currentStreak} วันติด
            </div>
          )}
          {totalSeconds > 0 && (
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {formatTime(totalSeconds)}
            </div>
          )}
          <div className="ml-auto flex items-center gap-1 text-slate-400">
            <Keyboard className="w-3 h-3" /> A-D / Enter
          </div>
        </div>
      )}
      {/* Header with Progress */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-indigo-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-indigo-700 font-semibold">
            <HelpCircle className="w-5 h-5" />
            <span>{courseName ? `แบบทดสอบ: ${courseName}` : 'แบบทดสอบความเข้าใจ'}</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Streak Badge */}
            {streak >= 2 && (
              <div className="flex items-center gap-1 text-orange-600 bg-orange-100 px-2.5 py-1 rounded-full text-xs font-bold streak-badge-enter">
                🔥 {streak} ติด!
              </div>
            )}
            {/* XP Display */}
            <div className="flex items-center gap-1 text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full text-xs font-bold relative">
              <Zap className="w-3.5 h-3.5" />
              <span>{xp} XP</span>
              {xpPopup.show && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-amber-500 font-bold text-sm xp-popup-animate whitespace-nowrap">
                  +{xpPopup.amount}
                </span>
              )}
            </div>
            <Badge variant="outline" className="bg-white border-indigo-200 text-indigo-700">
              ข้อ {currentQ + 1} / {totalQuestions}
            </Badge>
          </div>
        </div>
        {/* Motivational Sub-text */}
        <div className="text-xs text-indigo-500 font-medium mb-2">{getMotivationalText()}</div>
        {/* Progress Bar */}
        <div className={`w-full bg-indigo-100 rounded-full h-2 overflow-hidden ${progressPulse ? 'progress-pulse' : ''}`}>
          <div
            className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <CardContent className="p-6 md:p-8 space-y-6">
        {/* Question — keyed for transition animation */}
        <div key={questionKey} className="quiz-question-transition">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
              <Brain className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-lg font-medium text-slate-800 leading-relaxed">
              {question.question}
            </div>
          </div>
        </div>

        {/* Choices */}
        <div className="space-y-3">
          {question.choices.map((choice, i) => {
            let choiceClass = 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50';
            let iconEl = null;

            if (isSubmitted) {
              if (i === question.correctIndex) {
                choiceClass = 'border-emerald-400 bg-emerald-50 ring-2 ring-emerald-200';
                iconEl = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 choice-icon-enter" />;
              } else if (i === selectedIdx && !isCorrect) {
                choiceClass = 'border-red-400 bg-red-50 ring-2 ring-red-200';
                iconEl = <XCircle className="w-5 h-5 text-red-500 shrink-0 choice-icon-enter" />;
              } else {
                choiceClass = 'border-slate-100 bg-slate-50/50 opacity-60';
              }
            } else if (selectedIdx === i) {
              choiceClass = 'border-indigo-400 bg-indigo-50 ring-2 ring-indigo-200';
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={isSubmitted}
                className={`quiz-choice-enter w-full flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 text-left group ${choiceClass}`}
                style={{
                  animationDelay: `${i * 80}ms`,
                  ...(selectedPulse === i ? { transform: 'scale(1.02)', transition: 'transform 0.15s ease-out' } : {}),
                }}
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold mr-3 shrink-0 transition-colors ${
                  isSubmitted && i === question.correctIndex
                    ? 'bg-emerald-200 text-emerald-700'
                    : isSubmitted && i === selectedIdx && !isCorrect
                    ? 'bg-red-200 text-red-700'
                    : selectedIdx === i
                    ? 'bg-indigo-200 text-indigo-700'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-slate-700 font-medium flex-1">{choice}</span>
                {!isSubmitted && (
                  <span className="text-[10px] text-slate-300 font-mono opacity-0 group-hover:opacity-100 transition-opacity mr-1">{String.fromCharCode(65 + i)}</span>
                )}
                {iconEl}
              </button>
            );
          })}
        </div>

        {/* Feedback Message */}
        {isSubmitted && (
          <div className={`p-4 rounded-xl border quiz-feedback-enter ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-200'
              : 'bg-amber-50 border-amber-200'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                isCorrect ? 'bg-emerald-100' : 'bg-amber-100'
              }`}>
                {isCorrect ? <Sparkles className="w-4 h-4 text-emerald-600" /> : <HelpCircle className="w-4 h-4 text-amber-600" />}
              </div>
              <div>
                <div className={`font-semibold text-sm ${isCorrect ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {isCorrect ? getRandomItem(ENCOURAGEMENTS.correct) : getRandomItem(ENCOURAGEMENTS.incorrect)}
                </div>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Hint */}
        {!isSubmitted && question.hint && !showHint && (
          <button
            onClick={() => setShowHint(true)}
            className="text-sm text-indigo-500 hover:text-indigo-700 flex items-center gap-1 transition-colors"
          >
            💡 ดูคำใบ้
          </button>
        )}
        {showHint && question.hint && (
          <div className="text-sm text-indigo-600 bg-indigo-50 px-4 py-3 rounded-xl border border-indigo-100 quiz-hint-enter">
            💡 คำใบ้: {question.hint}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-slate-400">
            {score > 0 && `✅ ตอบถูก ${score} ข้อ`}
          </div>
          {!isSubmitted ? (
            <Button
              onClick={handleSubmit}
              disabled={selectedIdx === null}
              className={`px-8 transition-all duration-300 ${
                selectedIdx !== null
                  ? 'bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200'
                  : 'bg-slate-200 text-slate-400'
              }`}
            >
              ส่งคำตอบ
            </Button>
          ) : (
            <Button onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700 gap-2 px-8 quiz-next-btn-enter">
              {currentQ < totalQuestions - 1 ? (
                <>ข้อถัดไป <ChevronRight className="w-4 h-4" /></>
              ) : (
                <>ดูผลคะแนน <Trophy className="w-4 h-4" /></>
              )}
            </Button>
          )}
        </div>
      </CardContent>

      {/* Confetti overlay */}
      {confetti && (
        <div className="quiz-confetti-container">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="quiz-confetti-particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                backgroundColor: ['#6366F1', '#F59E0B', '#10B981', '#EC4899', '#8B5CF6'][i % 5],
              }}
            />
          ))}
        </div>
      )}

      {/* Streak Combo Message */}
      {showStreakMessage && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="streak-message-enter bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-2xl shadow-lg shadow-orange-300/50">
            <div className="text-center">
              <div className="text-2xl font-bold">🔥 {streak} Combo!</div>
              <div className="text-sm opacity-90">
                {getRandomItem(ENCOURAGEMENTS.streak).replace('{n}', String(streak))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
