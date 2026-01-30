/**
 * @auteur/utils
 * Shared utility functions for Auteur AI
 */

// EDL utilities
export { validateEDL, calculateTotalDuration, findClipAt, findClipsAt, parseEDL } from './edl';

// Credit utilities
export {
  calculateJobCost,
  formatCredits,
  hasSufficientCredits,
  calculateCreditUsagePercentage,
} from './credits';

// Time utilities
export {
  formatTimecode,
  parseTimecode,
  formatDuration,
  formatTimestamp,
  secondsToMs,
  msToSeconds,
} from './time';

// Validation utilities
export {
  isValidEmail,
  isValidMediaType,
  getMediaCategory,
  sanitizeInput,
  isValidProjectName,
  isValidFileSize,
} from './validation';
