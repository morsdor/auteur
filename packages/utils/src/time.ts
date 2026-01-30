/**
 * Time formatting utilities
 */

/**
 * Convert milliseconds to timecode format (HH:MM:SS:FF)
 * @param ms - Milliseconds
 * @param frameRate - Frame rate for frame calculation (default: 30)
 */
export function formatTimecode(ms: number, frameRate: number = 30): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const frames = Math.floor(((ms % 1000) / 1000) * frameRate);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
}

/**
 * Parse timecode to milliseconds
 * @param timecode - Timecode string in format HH:MM:SS:FF
 * @param frameRate - Frame rate for frame calculation (default: 30)
 */
export function parseTimecode(timecode: string, frameRate: number = 30): number {
  const parts = timecode.split(':');
  if (parts.length !== 4) {
    throw new Error('Invalid timecode format. Expected HH:MM:SS:FF');
  }

  const [hoursStr, minutesStr, secondsStr, framesStr] = parts;
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);
  const seconds = Number(secondsStr);
  const frames = Number(framesStr);

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) || isNaN(frames)) {
    throw new Error('Invalid timecode format. All parts must be numbers');
  }

  const totalMs =
    hours * 3600 * 1000 + minutes * 60 * 1000 + seconds * 1000 + (frames / frameRate) * 1000;

  return Math.floor(totalMs);
}

/**
 * Format duration in human-readable format (e.g., "2h 15m", "45s")
 */
export function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);

  if (totalSeconds < 60) {
    return `${totalSeconds}s`;
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes < 60) {
    return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Format timestamp for display (MM:SS)
 */
export function formatTimestamp(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${pad(minutes)}:${pad(seconds)}`;
}

/**
 * Convert seconds to milliseconds
 */
export function secondsToMs(seconds: number): number {
  return seconds * 1000;
}

/**
 * Convert milliseconds to seconds
 */
export function msToSeconds(ms: number): number {
  return ms / 1000;
}

/**
 * Pad number with leading zero
 */
function pad(num: number): string {
  return num.toString().padStart(2, '0');
}
