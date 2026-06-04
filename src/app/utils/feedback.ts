/**
 * Feedback utility — Sound/Haptic-ready architecture
 * 
 * Currently a lightweight placeholder that:
 * - Logs feedback events in development
 * - Provides typed feedback categories
 * 
 * Future integration points:
 * - Web Audio API for sound effects
 * - Navigator.vibrate() for haptic feedback
 * - User preferences for enabling/disabling feedback
 */

export type FeedbackType =
  | 'correct'      // Answer correct
  | 'incorrect'    // Answer wrong
  | 'streak'       // Streak milestone (3+)
  | 'complete'     // Quiz/exercise completed
  | 'perfect'      // Perfect score
  | 'select'       // Answer/option selected
  | 'run'          // Code run initiated
  | 'achievement'; // Achievement unlocked

const DEBUG = import.meta.env.DEV;

const FEEDBACK_LABELS: Record<FeedbackType, string> = {
  correct: '✅ Correct',
  incorrect: '❌ Incorrect',
  streak: '🔥 Streak',
  complete: '🎉 Complete',
  perfect: '🏆 Perfect',
  select: '👆 Select',
  run: '▶️ Run',
  achievement: '🏅 Achievement',
};

/**
 * Play feedback for a given event type.
 * Currently a no-op placeholder ready for Web Audio API or vibration API.
 */
export function playFeedback(type: FeedbackType): void {
  if (DEBUG) {
    console.log(
      `%c[Feedback] ${FEEDBACK_LABELS[type]}`,
      'color: #a78bfa; font-weight: bold'
    );
  }

  // Future: Web Audio API
  // const audioCtx = new AudioContext();
  // const oscillator = audioCtx.createOscillator();
  // ...

  // Future: Haptic feedback (mobile)
  // if ('vibrate' in navigator) {
  //   const patterns: Record<FeedbackType, number[]> = {
  //     correct: [50],
  //     incorrect: [30, 50, 30],
  //     streak: [50, 30, 50],
  //     complete: [100],
  //     perfect: [50, 30, 50, 30, 100],
  //     select: [20],
  //     run: [30],
  //     achievement: [50, 50, 100],
  //   };
  //   navigator.vibrate(patterns[type]);
  // }
}
