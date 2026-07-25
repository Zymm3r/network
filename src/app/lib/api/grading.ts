import { TestCase } from '../../data/courseQuizData';
import { PythonTestResult } from '../../../../application/hooks/usePython';

export interface GradingResult {
  score: number; // 0-100 percentage
  passed: boolean;
  totalTests: number;
  passedTests: number;
  visibleResults: PythonTestResult[]; // Only tests that are NOT hidden
  hiddenPassed: number;
  hiddenTotal: number;
}

export const gradingService = {
  /**
   * Calculates the final score based on test results.
   * Supports weighted scoring. If no weights are provided, all tests are weighted equally (weight = 1).
   * 
   * @param results The results of the test execution
   * @returns A GradingResult object containing the final score and filtered visibility results
   */
  evaluateResults(results: PythonTestResult[]): GradingResult {
    if (!results || results.length === 0) {
      return {
        score: 0,
        passed: false,
        totalTests: 0,
        passedTests: 0,
        visibleResults: [],
        hiddenPassed: 0,
        hiddenTotal: 0,
      };
    }

    let totalWeight = 0;
    let earnedWeight = 0;
    let passedCount = 0;
    let hiddenPassed = 0;
    let hiddenTotal = 0;

    const visibleResults: PythonTestResult[] = [];

    for (const test of results) {
      const weight = test.weight !== undefined ? test.weight : 1;
      totalWeight += weight;

      if (test.passed) {
        earnedWeight += weight;
        passedCount++;
      }

      if (test.isHidden) {
        hiddenTotal++;
        if (test.passed) {
          hiddenPassed++;
        }
      } else {
        visibleResults.push(test);
      }
    }

    // Final score is a percentage of earned weight
    const score = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;
    
    // A test suite passes completely if score is 100%
    const passed = score === 100;

    return {
      score,
      passed,
      totalTests: results.length,
      passedTests: passedCount,
      visibleResults,
      hiddenPassed,
      hiddenTotal,
    };
  }
};
