/**
 * Credit calculation utilities
 */

import type { JobType } from '@auteur/types';

/**
 * Credit cost per job type
 * Pricing model: 1 credit = $0.05 USD
 *
 * Cost breakdown:
 * - Transcription: $0.015/min actual → 2 credits = $0.10/min (6x markup)
 * - TTS: $0.225/min actual → 5 credits = $0.25/min (breakeven)
 * - Lip Sync: GPU intensive → 30 credits = $1.50/min
 * - Video Generation: $3/sec actual → 300 credits per 5-sec = $15 (breakeven)
 * - Performance Cloning: Very expensive → 100 credits = $5/min
 *
 * Note: Basic features (transcription, basic TTS) are bundled unlimited in subscriptions
 */
const CREDIT_COSTS: Record<JobType, number> = {
  transcription: 2, // $0.10/min - Bundled unlimited in Starter/Pro
  tts: 5, // $0.25/min - Basic TTS bundled unlimited
  lip_sync: 30, // $1.50/min - Pro feature
  video_generation: 300, // $15 per 5-sec clip - Pro feature
  overdub: 5, // $0.25/min - Bundled unlimited in Starter/Pro
  insert_speech: 5, // $0.25/min - Bundled unlimited in Starter/Pro
  performance_cloning: 100, // $5/min - Pro feature, credits required
  gaze_correction: 50, // $2.50/min - Pro feature, credits required
  video_qa: 10, // $0.50/query - Pro feature
  audio_generation: 20, // $1/min
};

/**
 * Calculate credit cost for a job
 */
export function calculateJobCost(jobType: JobType, durationMinutes?: number): number {
  const baseCost = CREDIT_COSTS[jobType];

  // Some jobs don't depend on duration
  if (jobType === 'video_qa') {
    return baseCost;
  }

  if (jobType === 'video_generation') {
    // Video generation is per 5-second clip
    return baseCost;
  }

  // Duration-based pricing
  if (durationMinutes === undefined) {
    throw new Error(`Duration required for job type: ${jobType}`);
  }

  return Math.ceil(baseCost * durationMinutes);
}

/**
 * Format credit balance for display
 */
export function formatCredits(balance: number): string {
  return balance.toLocaleString();
}

/**
 * Check if user has sufficient credits
 */
export function hasSufficientCredits(balance: number, required: number): boolean {
  return balance >= required;
}

/**
 * Calculate percentage of credits used
 */
export function calculateCreditUsagePercentage(used: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((used / total) * 100);
}
