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
  const initializingRef = useRef(false); // Synchronous ref to track init state

  const initWorker = useCallback(() => {
    if (workerRef.current) return;
    
    setIsInitializing(true);
    initializingRef.current = true;
    
    workerRef.current = new Worker(
      new URL('../../infrastructure/workers/pythonWorker.ts', import.meta.url),
      { type: 'module' }
    );
    
    workerRef.current.onerror = () => {
      setIsInitializing(false);
      initializingRef.current = false;
    };
  }, []);

  // Terminate on unmount
  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  const runPythonTests = useCallback(
    (code: string, testCases: TestCase[]): Promise<PythonExecutionResult> => {
      return new Promise((resolve) => {
        // Ensure worker exists
        if (!workerRef.current) {
          initWorker();
        }

        const runId = Math.random().toString(36).substring(7);
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        const handleMessage = (e: MessageEvent) => {
          if (e.data.id === runId) {
            if (e.data.type === 'start') {
              // Worker received the message and is executing - initialization is done
              if (initializingRef.current) {
                setIsInitializing(false);
                initializingRef.current = false;
              }

              // Safety timeout (e.g., infinite loop prevention)
              timeoutId = setTimeout(() => {
                cleanup();
                if (workerRef.current) {
                  workerRef.current.terminate();
                  workerRef.current = null;
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
            // Clear initializing state on first response
            if (initializingRef.current) {
              setIsInitializing(false);
              initializingRef.current = false;
            }
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

        // Post message to start execution
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

  return { runPythonTests, isInitializing, initWorker };
}