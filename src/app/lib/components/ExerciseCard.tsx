import React, { useState, useEffect, useCallback, useRef, Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Code2, PlayCircle, CheckCircle2, XCircle, Terminal,
  Zap, RotateCcw, Lightbulb, Copy, Check,
  Flame, Award, Clock
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useDailyStreak } from '../../hooks/useDailyStreak';
import { useActivity } from '../../contexts/ActivityContext';
import { useExerciseProgress } from '../../hooks/useExerciseProgress';
import { playFeedback } from '../../utils/feedback';
import { usePython } from "../../../application/hooks/usePython";
import { getExerciseForCourse, ExerciseData, TestCase } from '../../data/courseQuizData';
import { gradingService } from '../api/grading';

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
    <div className={`${colors[type]} terminal-line-enter whitespace-pre-wrap`}>
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
   ErrorBoundary Component
───────────────────────────────────────── */
class ExerciseErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Exercise Execution UI crashed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 text-red-700 rounded-xl border border-red-200 m-4">
          <h3 className="font-bold mb-2">Something went wrong in the execution UI.</h3>
          <p className="text-sm">{this.state.error?.message}</p>
          <button 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
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
  const { recordAttempt, isQueuedAttempts } = useExerciseProgress(
    exercise.id || courseId || 'unknown',
    exercise.lessonId || '',
    courseId || ''
  );

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
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [testResults, runPhase, isRunning, runComplete, allPassed]);

  // Get motivational helper text based on state
  const getHelperText = () => {
    if (showSolution) return '📝 ศึกษาเฉลยแล้วลองเขียนเองในครั้งถัดไป';
    if (runComplete && !allPassed) return '🔧 ลองแก้ไขโค้ดด้านบนแล้วรันอีกครั้ง';
    if (attempts === 0) return '🚀 พร้อมเขียนโค้ดแล้วใช่ไหม? มาเริ่มกัน!';
    return '💻 เขียนโค้ดและกดรันโค้ด';
  };

  const { runPythonTests, isInitializing, initWorker } = usePython();

  // Parse Python error messages to extract error type and details
  const parsePythonError = (errorText: string): { type: string; message: string; line?: number } => {
    // Match: "SyntaxError: invalid syntax (<string>, line 5)"
    const syntaxMatch = errorText.match(/SyntaxError: (.*) \(<string>, line (\d+)\)/);
    if (syntaxMatch) {
      return { type: 'SyntaxError', message: syntaxMatch[1], line: parseInt(syntaxMatch[2]) };
    }

    // Match: "NameError: name 'x' is not defined"
    const nameMatch = errorText.match(/NameError: (.*)/);
    if (nameMatch) {
      return { type: 'NameError', message: nameMatch[1] };
    }

    // Match: "IndentationError: expected an indented block"
    const indentMatch = errorText.match(/IndentationError: (.*)/);
    if (indentMatch) {
      return { type: 'IndentationError', message: indentMatch[1] };
    }

    // Match: "TypeError: ..."
    const typeMatch = errorText.match(/TypeError: (.*)/);
    if (typeMatch) {
      return { type: 'TypeError', message: typeMatch[1] };
    }

    // Match: "RuntimeError: ..."
    const runtimeMatch = errorText.match(/RuntimeError: (.*)/);
    if (runtimeMatch) {
      return { type: 'RuntimeError', message: runtimeMatch[1] };
    }

    // Match: "AttributeError: ..."
    const attrMatch = errorText.match(/AttributeError: (.*)/);
    if (attrMatch) {
      return { type: 'AttributeError', message: attrMatch[1] };
    }

    // Match: "KeyError: ..."
    const keyMatch = errorText.match(/KeyError: (.*)/);
    if (keyMatch) {
      return { type: 'KeyError', message: keyMatch[1] };
    }

    // Default: extract first line
    const firstLine = errorText.split('\n')[0];
    return { type: 'Error', message: firstLine };
  };


  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setRunComplete(false);
    setTestResults([]);
    setAllPassed(false);
    setAttempts(a => a + 1);
    setRunPhase('compiling');
    playFeedback('run');

    try {
      const startTime = performance.now();
      const runResponse = await runPythonTests(code, exercise.testCases);
      const executionTimeMs = Math.round(performance.now() - startTime);

      setRunPhase('testing');

      if (!runResponse.success) {
        setRunComplete(true);
        setIsRunning(false);
        setRunPhase('done');

        const errorMessage = runResponse.error || "Unknown Error";
        const friendlyMessage = "Python execution failed. Please review your code and try again.";
        
        setTestResults(exercise.testCases.map(tc => ({
          ...tc,
          passed: false,
          actual: `Error: ${friendlyMessage}\n\n${errorMessage}`
        })));

        if (user?.id) {
          recordAttempt({
            user_id: user.id,
            exercise_id: exercise.id || courseId || 'unknown',
            lesson_id: exercise.lessonId || '',
            course_id: courseId || '',
            passed: false,
            score: null,
            attempts_count: attempts + 1,
            stdout: null,
            error_message: errorMessage,
            submitted_code: code,
            passed_tests: 0,
            total_tests: exercise.testCases.length,
            execution_time: executionTimeMs,
            status: 'error',
            execution_timestamp: new Date().toISOString(),
          }).catch(err => console.error('[Exercise Tracking] Failed to persist failed attempt:', err));
        }
        return;
      }

      const results = runResponse.testResults || [];
      // Evaluate results with grading service
      const gradingResult = gradingService.evaluateResults(results);

      // Simulate progressive UI feedback using ONLY visible results
      const visibleResults = gradingResult.visibleResults || [];
      let idx = 0;
      const interval = setInterval(() => {
        if (idx < visibleResults.length) {
          if (visibleResults[idx]) {
            setTestResults(prev => [...prev, visibleResults[idx]]);
          }
          idx++;
        } else {
          clearInterval(interval);
          setAllPassed(gradingResult.passed);
          setRunComplete(true);
          setIsRunning(false);
          setRunPhase('done');

          // Persist attempt to database (non-blocking)
          if (user?.id) {
            // Only join visible test results for stdout
            const stdout = visibleResults.map(r => r.actual || '').join('\n');
            recordAttempt({
              user_id: user.id,
              exercise_id: exercise.id || courseId || 'unknown',
              lesson_id: exercise.lessonId || '',
              course_id: courseId || '',
              passed: gradingResult.passed,
              score: gradingResult.score,
              attempts_count: attempts + 1,
              stdout: stdout || null,
              error_message: null,
              submitted_code: code,
              passed_tests: gradingResult.passedTests,
              total_tests: gradingResult.totalTests,
              execution_time: executionTimeMs,
              status: gradingResult.passed ? 'passed' : 'failed',
              execution_timestamp: new Date().toISOString(),
            }).catch(err => console.error('[Exercise Tracking] Failed to persist attempt:', err));
          }

          if (gradingResult.passed && xpEarned === 0) {
            setXpEarned(exercise.xpReward);
            setShowXpPopup(true);
            setShowConfetti(true);
            playFeedback('complete');
            recordActivity(); // Record daily streak

            if (courseId) {
              import('../api/certificates').then(({ certificateApi }) => {
                certificateApi.checkAndIssueCourseCertificate(user.id, courseId).then(cert => {
                  if (cert) console.log(`[Certificate] Auto-issued certificate:`, cert.certificate_number);
                });
              });
            }

            // Achievement badges
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

            setTimeout(() => setShowXpPopup(false), 2000);
            setTimeout(() => setShowConfetti(false), 1500);
          }
        }
      }, 500); // 500ms delay between showing each test result for UI effect

    } catch (error: any) {
      // Timeout or critical Pyodide failure
      setRunComplete(true);
      setIsRunning(false);
      setRunPhase('done');

      const errorMessage = error.message || String(error);
      setTestResults(exercise.testCases.map(tc => ({
        ...tc,
        passed: false,
        actual: `Error: ${errorMessage}`
      })));

      // Persist failed attempt to database (non-blocking)
      if (user?.id) {
        recordAttempt({
          user_id: user.id,
          exercise_id: exercise.id || courseId || 'unknown',
          lesson_id: exercise.lessonId || '',
          course_id: courseId || '',
          passed: false,
          score: null,
          attempts_count: attempts + 1,
          stdout: null,
          error_message: errorMessage,
          submitted_code: code,
          passed_tests: 0,
          total_tests: exercise.testCases.length,
          execution_time: null,
          status: errorMessage.includes('Timeout') ? 'timeout' : 'error',
          execution_timestamp: new Date().toISOString(),
        }).catch(err => console.error('[Exercise Tracking] Failed to persist failed attempt:', err));
      }
    }
  }, [code, exercise, xpEarned, attempts, runPythonTests, recordActivity, user?.id, courseId, recordAttempt]);

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
      const tokens: string[] = [];
      let tokenIndex = 0;

      // Extract strings
      let highlighted = line.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, (match) => {
        tokens.push(`<span class="code-string">${match}</span>`);
        return `__TOKEN_${tokenIndex++}__`;
      });

      // Extract comments
      highlighted = highlighted.replace(/(#.*$)/g, (match) => {
        tokens.push(`<span class="code-comment">${match}</span>`);
        return `__TOKEN_${tokenIndex++}__`;
      });

      // Highlight keywords
      highlighted = highlighted.replace(/\b(def|return|pass|if|elif|else|for|in|while|import|from|class|print|True|False|None)\b/g, '<span class="code-keyword">$1</span>');
      
      // Highlight functions
      highlighted = highlighted.replace(/\b(\w+)\s*\(/g, '<span class="code-function">$1</span>(');

      // Restore tokens
      tokens.forEach((tokenHtml, idx) => {
        highlighted = highlighted.replace(`__TOKEN_${idx}__`, tokenHtml);
      });
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      // Insert 4 spaces for Python
      const spaces = '    ';
      const newCode = code.substring(0, start) + spaces + code.substring(end);
      
      setCode(newCode);
      
      // Move cursor forward
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + spaces.length;
        }
      }, 0);
    }
  };

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
                disabled={isRunning || isInitializing}
                title={isInitializing ? 'Initializing Python runtime...' : ''}
                className={`w-full font-semibold transition-all duration-300 ${
                  isRunning || isInitializing
                    ? 'bg-emerald-400 cursor-wait'
                    : 'bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-200 exercise-run-btn'
                }`}
              >
                {isRunning || isInitializing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {isInitializing ? 'Initializing...' : (runPhase === 'compiling' ? 'กำลังคอมไพล์...' : 'กำลังทดสอบ...')}
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
          <ExerciseErrorBoundary>
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
                <div className="leading-relaxed">
                  {highlightCode(code)}
                </div>
                {/* Transparent textarea for editing with visible caret */}
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="absolute inset-0 w-full h-full resize-none cursor-text bg-transparent text-transparent caret-white outline-none"
                  style={{
                    paddingTop: '1rem',
                    paddingLeft: '3.75rem',
                    lineHeight: '1.625'
                  }}
                  spellCheck={false}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setCursorBlink(false)}
                  onBlur={() => setCursorBlink(true)}
                />
                {cursorBlink && (
                  <div className="absolute bottom-4 right-4 text-xs text-slate-600 pointer-events-none">
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
              <div 
                ref={terminalRef}
                className="p-4 font-mono text-xs space-y-1 min-h-[120px] max-h-[200px] overflow-y-auto overscroll-contain scroll-smooth"
              >
                {!isRunning && !isInitializing && testResults.length === 0 && (
                  <div className="text-slate-600 flex items-center gap-2">
                    <span className="text-slate-700">$</span> กดปุ่ม "รันโค้ด" เพื่อทดสอบ...
                  </div>
                )}
                {isInitializing && testResults.length === 0 && (
                  <TerminalLine text="⏳ Initializing Python runtime (Pyodide)..." type="info" delay={0} />
                )}
                {isRunning && testResults.length === 0 && !isInitializing && (
                  <TerminalLine text="python main.py" type="info" delay={0} />
                )}
                {testResults.filter(Boolean).map((tc, i) => (
                  <div key={i} className="terminal-line-enter" style={{ animationDelay: `${i * 100}ms` }}>
                    <TerminalLine
                      text={`Test ${i + 1}: ${tc?.input ?? ''}`}
                      type="info"
                      delay={0}
                    />
                    {tc?.passed ? (
                      <TerminalLine
                        text={`${tc?.expected ?? ''} ✓`}
                        type="success"
                        delay={100}
                      />
                    ) : (
                      <>
                        {tc?.actual?.includes('Error:') ? (
                          (() => {
                            const error = parsePythonError(tc.actual);
                            const isTimeout = tc.actual.includes('Timeout');
                            return (
                              <>
                                {tc.actual.includes('Python execution failed.') && (
                                  <TerminalLine
                                    text="Python execution failed. Please review your code and try again."
                                    type="error"
                                    delay={50}
                                  />
                                )}
                                <TerminalLine
                                  text={isTimeout ? '⏱️ ' + error.type : error.type}
                                  type="error"
                                  delay={100}
                                />
                                <TerminalLine
                                  text={error.message}
                                  type="error"
                                  delay={150}
                                />
                                {error.line && (
                                  <TerminalLine
                                    text={`at line ${error.line}`}
                                    type="error"
                                    delay={200}
                                  />
                                )}
                              </>
                            );
                          })()
                        ) : (
                          <TerminalLine
                            text={`Expected "${tc?.expected ?? ''}" but got: ${tc?.actual ?? 'error'}`}
                            type="error"
                            delay={100}
                          />
                        )}
                      </>
                    )}
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
                        {testResults.some(t => t?.actual?.includes('Timeout')) ? (
                          <>
                            <div>⏱️ Code execution timed out</div>
                            <div className="text-amber-400 font-normal text-xs pt-1">
                              This usually means your code has an infinite loop. Check your while loops and recursion.
                            </div>
                          </>
                        ) : (
                          <>
                            {testResults.filter(t => t && !t.passed).length > 0 ? (
                              <div>❌ {testResults.filter(t => t && !t.passed).length} test(s) failed.</div>
                            ) : (
                              <div>❌ Your code did not meet all requirements. Please check for edge cases.</div>
                            )}
                            <div className="text-amber-400 font-normal flex items-center gap-1.5 pt-1">
                              {getRandomItem(RETRY_ENCOURAGEMENTS)}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </ExerciseErrorBoundary>
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
