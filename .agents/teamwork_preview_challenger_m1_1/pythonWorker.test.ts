import { describe, it, expect, vi, beforeAll } from 'vitest';

// Mock self for the worker
const mockSelf = {
  onmessage: null as any,
  postMessage: vi.fn(),
};

// @ts-ignore
global.self = mockSelf;

describe('Python Worker', () => {
  beforeAll(async () => {
    await import('../../src/lib/pythonWorker');
  });

  it('should raise RuntimeError on infinite loop hitting output limit', async () => {
    return new Promise<void>((resolve) => {
      mockSelf.postMessage.mockImplementationOnce((msg) => {
        try {
          expect(msg.id).toBe(1);
          expect(msg.success).toBe(true);
          const results = msg.results;
          expect(results).toBeDefined();
          
          expect(results[0].passed).toBe(false);
          expect(results[0].actual).toContain('Output limit exceeded');
          resolve();
        } catch (e) {
          resolve(Promise.reject(e));
        }
      });

      if (mockSelf.onmessage) {
        mockSelf.onmessage({
          data: {
            id: 1,
            code: `while True:\n    print("spam")`,
            testCases: [
              { input: '1', expected: '1' }
            ]
          }
        } as any);
      }
    });
  }, 15000);

  it('should return evaluated value without print', async () => {
    return new Promise<void>((resolve) => {
      mockSelf.postMessage.mockImplementationOnce((msg) => {
        try {
          expect(msg.success).toBe(true);
          const results = msg.results;
          expect(results[0].passed).toBe(true);
          expect(results[0].actual).toBe('42');
          resolve();
        } catch (e) {
          resolve(Promise.reject(e));
        }
      });

      if (mockSelf.onmessage) {
        mockSelf.onmessage({
          data: {
            id: 2,
            code: `def get_answer():\n    return 42`,
            testCases: [
              { input: 'get_answer()', expected: '42' }
            ]
          }
        } as any);
      }
    });
  });

  it('stress test: evaluate large loops safely', async () => {
    return new Promise<void>((resolve) => {
      mockSelf.postMessage.mockImplementationOnce((msg) => {
        try {
          expect(msg.success).toBe(true);
          resolve();
        } catch (e) {
          resolve(Promise.reject(e));
        }
      });

      if (mockSelf.onmessage) {
        mockSelf.onmessage({
          data: {
            id: 3,
            code: `
x = 0
for i in range(1000000):
    x += 1
`,
            testCases: [
              { input: 'x', expected: '1000000' }
            ]
          }
        } as any);
      }
    });
  }, 30000);
});
