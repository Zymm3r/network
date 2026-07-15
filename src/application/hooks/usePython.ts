import { useState, useRef, useCallback, useEffect } from 'react';
import { TestCase } from '../../app/data/courseQuizData';

export interface PythonTestResult extends TestCase {
  actual?: string;
}

export interface PythonExecutionResult {
  success: boolean;
  error?: string;
  testResults: PythonTestResult[];
}

export function usePython() {
  const [isInitializing, setIsInitializing] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  const initWorker = useCallback(() => {
    if (!workerRef.current) {
      setIsInitializing(true);
      workerRef.current = new Worker(new URL('../../infrastructure/workers/pythonWorker.ts', import.meta.url), { type: 'module' });
      workerRef.current.onerror = () => {
        setIsInitializing(false);
      };
    }
  }, []);

  // Terminate on unmount
  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const runPythonTests = useCallback(
    (code: string, testCases: TestCase[]): Promise<PythonExecutionResult> => {
      return new Promise((resolve) => {
        if (!workerRef.current) {
          initWorker();
        }

        const runId = Math.random().toString(36).substring(7);

        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        const handleMessage = (e: MessageEvent) => {
          if (e.data.id === runId) {
            if (e.data.type === 'start') {
              // Safety timeout (e.g., infinite loop prevention) after Pyodide is ready
              timeoutId = setTimeout(() => {
                cleanup();
                // Terminate the rogue worker
                if (workerRef.current) {
                  workerRef.current.terminate();
                  workerRef.current = null;
                  // Re-create the worker for future runs
                  initWorker();
                }
                resolve({
                  success: false,
                  error: 'Timeout: โค้ดใช้เวลาทำงานนานเกินไป (อาจเกิดจาก Infinite Loop)',
                  testResults: []
                });
              }, 5000); // 5 seconds max
              return;
            }

            cleanup();
            if (e.data.success) {
              resolve({ success: true, testResults: e.data.results || [] });
            } else {
              resolve({ success: false, error: e.data.error, testResults: [] });
            }
          }
        };

        const cleanup = () => {
          if (workerRef.current) {
            workerRef.current.removeEventListener('message', handleMessage);
          }
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        };

        // Add listener
        if (workerRef.current) {
          workerRef.current.addEventListener('message', handleMessage);
        }

        // Post message
        if (workerRef.current) {
          workerRef.current.postMessage({
            id: runId,
            code,
            testCases,
          });
        }
      });
    },
    [initWorker]
  );

  // Set isInitializing to false once worker is ready
  useEffect(() => {
    if (!workerRef.current) return;
    const handleReady = () => setIsInitializing(false);
    workerRef.current.addEventListener('message', handleReady, { once: true });
    return () => {
      if (workerRef.current) {
        workerRef.current.removeEventListener('message', handleReady);
      }
    };
  }, [workerRef.current]);

  return { runPythonTests, isInitializing, initWorker };
}
