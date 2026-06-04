import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Code2, PlayCircle, CheckCircle2, XCircle, Terminal,
  Zap, RotateCcw, Lightbulb, Copy, Check,
  Flame, Award, Clock
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useDailyStreak } from '../hooks/useDailyStreak';
import { useActivity } from '../contexts/ActivityContext';
import { playFeedback } from '../utils/feedback';
import { getExerciseForCourse, ExerciseData, TestCase } from '../data/courseQuizData';

/* ─────────────────────────────────────────
   Terminal Output Line
───────────────────────────────────────── */
function TerminalLine({ text, type, delay }: { text: string; type: 'info' | 'success' | 'error' | 'output'; delay: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!visible) return null;

  const colors = {
    info: 'text-slate-400',
    success: 'text-emerald-400',
    error: 'text-red-400',
    output: 'text-blue-300',
  };

  return (
    <div className={`${colors[type]} terminal-line-enter`}>
      {type === 'info' && <span className="text-slate-500">$ </span>}
      {type === 'success' && <span className="text-emerald-500">✓ </span>}
      {type === 'error' && <span className="text-red-500">✗ </span>}
      {type === 'output' && <span className="text-blue-500">→ </span>}
      {text}
    </div>
  );
}

const RETRY_ENCOURAGEMENTS = [
  'ใกล้แล้ว! ลองตรวจสอบ syntax อีกครั้ง 🔍',
  'ไม่ท้อ! ลองดูคำใบ้หรือแก้ไขโค้ด 💪',
  'ทุกนักพัฒนาเจอ bug! ลองใหม่อีกครั้ง 🐛',
  'อย่ายอมแพ้! การ debug คือทักษะที่สำคัญ 🚀',
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ─────────────────────────────────────────
   ExerciseCard Component
───────────────────────────────────────── */
interface ExerciseCardProps {
  courseName?: string;
  courseId?: string;
}

export default function ExerciseCard({ courseName, courseId }: ExerciseCardProps = {}) {
  const { user } = useAuth();
  const { currentStreak, recordActivity } = useDailyStreak(user?.id);
  const { totalSeconds } = useActivity();

  const exercise = getExerciseForCourse(courseId);

  const [code, setCode] = useState(exercise.starterCode);
  
  // Ensure code updates if course changes
  useEffect(() => {
    setCode(exercise.starterCode);
  }, [courseId, exercise.starterCode]);
  const [isRunning, setIsRunning] = useState(false);
  const [runComplete, setRunComplete] = useState(false);
  const [testResults, setTestResults] = useState<TestCase[]>([]);
  const [allPassed, setAllPassed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [showXpPopup, setShowXpPopup] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [runPhase, setRunPhase] = useState<'idle' | 'compiling' | 'testing' | 'done'>('idle');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showAchievement, setShowAchievement] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Get motivational helper text based on state
  const getHelperText = () => {
    if (showSolution) return '📝 ศึกษาเฉลยแล้วลองเขียนเองในครั้งถัดไป';
    if (runComplete && !allPassed) return '🔧 ลองแก้ไขโค้ดด้านบนแล้วรันอีกครั้ง';
    if (attempts === 0) return '🚀 พร้อมเขียนโค้ดแล้วใช่ไหม? มาเริ่มกัน!';
    return '💻 เขียนโค้ดและกดรันโค้ด';
  };

  const handleRun = useCallback(() => {
    setIsRunning(true);
    setRunComplete(false);
    setTestResults([]);
    setAllPassed(false);
    setAttempts(a => a + 1);
    setRunPhase('compiling');
    playFeedback('run');

    // Simulate compiling phase
    setTimeout(() => {
      setRunPhase('testing');
    }, 500);

    // Simulate running with delays for each test case
    // For mock evaluation, we just check if they modified the starter code
    const isCorrectCode = code.trim() !== exercise.starterCode.trim() && code.length > 10;

    const results = exercise.testCases.map(tc => ({
      ...tc,
      passed: isCorrectCode,
    }));

    // Simulate progressive test results (start after compiling)
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < results.length) {
        setTestResults(prev => [...prev, results[idx]]);
        idx++;
      } else {
        clearInterval(interval);
        const passed = results.every(r => r.passed);
        setAllPassed(passed);
        setRunComplete(true);
        setIsRunning(false);
        setRunPhase('done');
        if (passed && xpEarned === 0) {
          setXpEarned(exercise.xpReward);
          setShowXpPopup(true);
          setShowConfetti(true);
          playFeedback('complete');
          recordActivity(); // Record daily streak
          // Achievement badges
          if (idx === results.length && passed) {
            const achievementMsg = attempts === 0
              ? '⚡ First Try!'
              : attempts >= 3
              ? '🧗 Persistence Pays Off!'
              : null;
            if (achievementMsg) {
              playFeedback('achievement');
              setShowAchievement(achievementMsg);
              setTimeout(() => setShowAchievement(null), 3000);
            }
          }
          setTimeout(() => setShowXpPopup(false), 2000);
          setTimeout(() => setShowConfetti(false), 1500);
        }
      }
    }, 800); // slightly longer for more realistic feeling
  }, [code, xpEarned]);

  const handleReset = useCallback(() => {
    setCode(exercise.starterCode);
    setRunComplete(false);
    setTestResults([]);
    setAllPassed(false);
    setShowHint(false);
    setShowSolution(false);
    setRunPhase('idle');
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const handleShowSolution = useCallback(() => {
    setShowSolution(true);
    setCode(exercise.solutionCode);
  }, []);

  // Syntax highlighting for display
  const highlightCode = (raw: string) => {
    return raw.split('\n').map((line, i) => {
      let highlighted = line
        .replace(/(def |return |pass|if |else:|for |in |while |import |from |class |print|True|False|None)/g, '<span class="code-keyword">$1</span>')
        .replace(/(#.*$)/gm, '<span class="code-comment">$1</span>')
        .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, '<span class="code-string">$1</span>')
        .replace(/\b(\w+)\s*\(/g, '<span class="code-function">$1</span>(');
      return (
        <div key={i} className="flex">
          <span className="text-slate-600 select-none w-8 text-right pr-3 shrink-0 border-r border-slate-700/30">
            {i + 1}
          </span>
          <span className="pl-3 whitespace-pre" dangerouslySetInnerHTML={{ __html: highlighted || '&nbsp;' }} />
        </div>
      );
    });
  };

  // Format study time for display
  const formatTime = (s: number) => {
    if (s < 60) return `${s} วินาที`;
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    if (h > 0) return `${h} ชม. ${m % 60} นาที`;
    return `${m} นาที`;
  };

  // Line count for status bar
  const lineCount = code.split('\n').length;

  return (
    <Card className="border-slate-100 shadow-sm overflow-hidden relative">
      {/* Achievement badge overlay */}
      {showAchievement && (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <div className="achievement-badge-enter bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-8 py-4 rounded-2xl shadow-2xl shadow-emerald-300/50">
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
      {/* Progress Banner */}
      {(currentStreak > 0 || totalSeconds > 0) && (
        <div className="bg-gradient-to-r from-slate-50 to-emerald-50/50 px-6 py-2 border-b border-slate-100 flex items-center gap-4 text-xs text-slate-500 progress-banner-enter">
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
        </div>
      )}
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-emerald-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-800 font-semibold">
          <Code2 className="w-5 h-5" />
          <span>{courseName ? `แบบฝึกหัด: ${courseName}` : exercise.title}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Attempt counter */}
          {attempts > 0 && (
            <div className="flex items-center gap-1 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full text-xs font-medium">
              ครั้งที่ {attempts}
            </div>
          )}
          {xpEarned > 0 && (
            <div className="flex items-center gap-1 text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full text-xs font-bold relative">
              <Zap className="w-3.5 h-3.5" />
              <span>+{xpEarned} XP</span>
              {showXpPopup && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-amber-500 font-bold text-sm xp-popup-animate whitespace-nowrap">
                  +{exercise.xpReward} XP
                </span>
              )}
            </div>
          )}
          {/* Difficulty badge */}
          <Badge variant="outline" className="bg-white border-emerald-200 text-emerald-700">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block mr-1.5" />
            ง่าย
          </Badge>
          <Badge variant="outline" className="bg-white border-emerald-200 text-emerald-700">
            Python
          </Badge>
        </div>
      </div>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Instructions Side */}
          <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-slate-100 bg-white space-y-5">
            <div>
              <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                📝 โจทย์: {exercise.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {exercise.description}
              </p>
            </div>

            {/* Expected Output */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-inner">
              <div className="text-xs text-slate-400 font-medium mb-2">📋 ตัวอย่างผลลัพธ์ที่คาดหวัง</div>
              <div className="text-sm font-mono text-slate-700 space-y-1">
                {exercise.testCases.map((tc, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <code className="text-indigo-600">{tc.input}</code>
                    <span className="text-slate-300">→</span>
                    <code className="text-emerald-600">{tc.expected}</code>
                  </div>
                ))}
              </div>
            </div>

            {/* Hint */}
            {!showHint ? (
              <button
                onClick={() => setShowHint(true)}
                className={`text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1.5 transition-colors ${attempts >= 3 ? 'hint-glow rounded-lg px-3 py-1.5 bg-amber-50 border border-amber-200' : ''}`}
              >
                <Lightbulb className="w-4 h-4" /> {attempts >= 3 ? 'ลองดูคำใบ้สิ!' : 'ต้องการคำใบ้?'}
              </button>
            ) : (
              <div className="text-sm bg-amber-50 border border-amber-200 px-4 py-3 rounded-xl exercise-hint-enter">
                <div className="flex items-center gap-2 text-amber-700 font-medium mb-1">
                  <Lightbulb className="w-4 h-4" /> คำใบ้
                </div>
                <code className="text-amber-800">{exercise.hint}</code>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <Button
                onClick={handleRun}
                disabled={isRunning}
                className={`w-full font-semibold transition-all duration-300 ${
                  isRunning
                    ? 'bg-emerald-400 cursor-wait'
                    : 'bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-200 exercise-run-btn'
                }`}
              >
                {isRunning ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {runPhase === 'compiling' ? 'กำลังคอมไพล์...' : 'กำลังทดสอบ...'}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <PlayCircle className="w-4 h-4" /> รันโค้ด
                  </span>
                )}
              </Button>
              <div className="flex gap-2">
                <Button onClick={handleReset} variant="outline" className="flex-1 gap-1 text-sm">
                  <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ต
                </Button>
                {!showSolution && !allPassed && (
                  <Button onClick={handleShowSolution} variant="outline" className="flex-1 gap-1 text-sm text-amber-600 border-amber-200 hover:bg-amber-50">
                    <Lightbulb className="w-3.5 h-3.5" /> ดูเฉลย
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Code Editor + Terminal Side */}
          <div className="flex flex-col">
            {/* Motivational helper text */}
            <div className="bg-white px-4 py-2 border-b border-slate-100 text-sm font-medium text-slate-600 flex items-center exercise-motivational-text">
               {getHelperText()}
            </div>
            {/* VS Code-style Editor */}
            <div className="bg-[#1E1E1E] relative flex-1">
              {/* Tab Bar */}
              <div className="flex items-center bg-[#252526] px-2 py-1.5 border-b border-[#3C3C3C]">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1E1E1E] rounded-t text-sm">
                  <span className="text-blue-400 text-xs">🐍</span>
                  <span className="text-slate-300 text-xs">main.py</span>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <button onClick={handleCopy} className="p-1 text-slate-500 hover:text-slate-300 transition-colors" title="คัดลอกโค้ด">
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Code Area */}
              <div className="p-4 font-mono text-sm text-slate-300 relative min-h-[200px]">
                {/* Syntax-highlighted display */}
                <div className="space-y-0.5 leading-relaxed">
                  {highlightCode(code)}
                </div>
                {/* Hidden textarea for editing */}
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="absolute inset-0 opacity-0 w-full h-full resize-none cursor-text"
                  spellCheck={false}
                  onFocus={() => setCursorBlink(false)}
                  onBlur={() => setCursorBlink(true)}
                />
                {cursorBlink && (
                  <div className="absolute bottom-4 right-4 text-xs text-slate-600">
                    คลิกเพื่อแก้ไขโค้ด ✏️
                  </div>
                )}
              </div>
            </div>

            {/* VS Code Status Bar */}
            <div className="bg-[#007ACC] px-4 py-1 flex items-center justify-between text-[10px] text-white/90 font-mono">
              <div className="flex items-center gap-3">
                <span>Ln {lineCount}, Col 1</span>
                <span>Spaces: 4</span>
              </div>
              <div className="flex items-center gap-3">
                <span>UTF-8</span>
                <span>Python</span>
                <span className="flex items-center gap-1">
                  {allPassed ? <CheckCircle2 className="w-3 h-3" /> : null}
                  {allPassed ? 'Passed' : runComplete && !allPassed ? 'Errors' : 'Ready'}
                </span>
              </div>
            </div>

            {/* Terminal Output */}
            <div className="bg-[#0D1117] border-t border-[#30363D]">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-[#21262D]">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-xs text-slate-500 font-medium">Terminal</span>
                {isRunning && <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />}
                {runComplete && allPassed && <span className="w-2 h-2 bg-emerald-400 rounded-full" />}
                {runComplete && !allPassed && <span className="w-2 h-2 bg-red-400 rounded-full" />}
              </div>
              <div className="p-4 font-mono text-xs space-y-1 min-h-[120px] max-h-[200px] overflow-y-auto">
                {!isRunning && testResults.length === 0 && (
                  <div className="text-slate-600 flex items-center gap-2">
                    <span className="text-slate-700">$</span> กดปุ่ม "รันโค้ด" เพื่อทดสอบ...
                  </div>
                )}
                {isRunning && testResults.length === 0 && (
                  <TerminalLine text="python main.py" type="info" delay={0} />
                )}
                {testResults.map((tc, i) => (
                  <div key={i} className="terminal-line-enter" style={{ animationDelay: `${i * 100}ms` }}>
                    <TerminalLine
                      text={`Test ${i + 1}: ${tc.input}`}
                      type="info"
                      delay={0}
                    />
                    <TerminalLine
                      text={tc.passed ? `${tc.expected} ✓` : `Expected "${tc.expected}" but got error`}
                      type={tc.passed ? 'success' : 'error'}
                      delay={100}
                    />
                  </div>
                ))}
                {runComplete && (
                  <div className="terminal-line-enter mt-2 pt-2 border-t border-[#21262D]">
                    {allPassed ? (
                      <div className="text-emerald-400 font-semibold">
                        ✅ All {testResults.length} tests passed! Great job!
                      </div>
                    ) : (
                      <div className="text-red-400 font-semibold space-y-1">
                        <div>❌ {testResults.filter(t => !t.passed).length} test(s) failed.</div>
                        <div className="text-amber-400 font-normal flex items-center gap-1.5 pt-1">
                          {getRandomItem(RETRY_ENCOURAGEMENTS)}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Success Banner */}
        {allPassed && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-t border-emerald-200 p-5 exercise-success-enter relative overflow-hidden">
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="exercise-confetti-particle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      bottom: '-10px',
                      animationDelay: `${Math.random() * 0.3}s`,
                      backgroundColor: ['#10B981', '#34D399', '#059669', '#FCD34D'][i % 4],
                    }}
                  />
                ))}
              </div>
            )}
            <div className="flex items-center justify-between flex-wrap gap-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center exercise-success-icon shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="font-semibold text-emerald-800">
                    {attempts === 1 ? '🎉 ผ่านตั้งแต่ครั้งแรก! สุดยอด! 🌟' : '🎉 ไม่ยอมแพ้จนสำเร็จ! เยี่ยมมาก! 💪'}
                  </div>
                  <div className="text-sm text-emerald-600">ผ่านการทดสอบทั้ง {testResults.length} ข้อ</div>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-amber-100 text-amber-700 px-4 py-2 rounded-full font-bold">
                <Zap className="w-4 h-4" /> +{exercise.xpReward} XP
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
