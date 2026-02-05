/**
 * EDL (Edit Decision List) utilities
 */

import type { EDL, Clip, Track } from '@auteur/types';

/**
 * Validate EDL structure
 */
export function validateEDL(edl: unknown): edl is EDL {
  if (!edl || typeof edl !== 'object') return false;

  const e = edl as Partial<EDL>;

  if (!e.projectId || typeof e.projectId !== 'string') return false;
  if (typeof e.version !== 'number') return false;
  if (!e.settings || typeof e.settings !== 'object') return false;
  if (!Array.isArray(e.tracks)) return false;

  return true;
}

/**
 * Calculate total timeline duration from clips
 */
export function calculateTotalDuration(tracks: Track[]): number {
  let maxEndTime = 0;

  for (const track of tracks) {
    for (const clip of track.clips) {
      if (!clip.deleted) {
        const clipEnd = clip.startMs + clip.durationMs;
        if (clipEnd > maxEndTime) {
          maxEndTime = clipEnd;
        }
      }
    }
  }

  return maxEndTime;
}

/**
 * Find clip at specific timestamp on a track
 */
export function findClipAt(track: Track, timestamp_ms: number): Clip | null {
  for (const clip of track.clips) {
    if (clip.deleted) continue;

    const clipStart = clip.startMs;
    const clipEnd = clip.startMs + clip.durationMs;

    if (timestamp_ms >= clipStart && timestamp_ms < clipEnd) {
      return clip;
    }
  }

  return null;
}

/**
 * Get all clips at a specific timestamp across all tracks
 */
export function findClipsAt(
  tracks: Track[],
  timestamp_ms: number
): Array<{ track: Track; clip: Clip }> {
  const results: Array<{ track: Track; clip: Clip }> = [];

  for (const track of tracks) {
    const clip = findClipAt(track, timestamp_ms);
    if (clip) {
      results.push({ track, clip });
    }
  }

  return results;
}

/**
 * Parse EDL from JSON string
 */
export function parseEDL(json: string): EDL {
  const parsed = JSON.parse(json);

  if (!validateEDL(parsed)) {
    throw new Error('Invalid EDL structure');
  }

  return parsed;
}
