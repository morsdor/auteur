/**
 * Edit Decision List (EDL) types
 * Matches MongoDB schema
 */

export type TrackType = 'video' | 'audio';

/**
 * Speaker metadata for transcript diarization
 */
export interface Speaker {
  id: string; // Stable ID: "speaker_1", "speaker_2", etc.
  aiLabel: string; // Label from AI: "Speaker A", "Speaker B"
  userLabel: string | null; // User-assigned name: "John", "Sarah"
  voiceCloneId: string | null; // Optional: reference to VoiceClone for overdubbing
  createdAt: Date;
}

export interface Word {
  word: string;
  startMs: number;
  endMs: number;
  confidence: number;
}

export interface TranscriptSegment {
  id: string;
  speakerId: string; // References Speaker.id
  startMs: number;
  endMs: number;
  text: string;
  words: Word[];
  deleted: boolean;
  editedText: string | null;
}

export interface Transcript {
  generatedAt: Date;
  segments: TranscriptSegment[];
}

export interface Clip {
  id: string;
  mediaFileId: string; // references Postgres media_files.id
  trackId: string;
  startMs: number; // position on timeline
  durationMs: number; // length on timeline
  inPointMs: number; // source start trim
  outPointMs: number; // source end trim
  effects: unknown[]; // TBD: effect types
  deleted: boolean;
}

export interface Track {
  id: string;
  type: TrackType;
  name: string;
  clips: Clip[];
}

export interface EDLSettings {
  resolution: {
    width: number;
    height: number;
  };
  frameRate: number;
  durationMs: number;
}

export interface EDL {
  _id?: string; // MongoDB ObjectId
  projectId: string; // matches Postgres project.id
  version: number;
  createdAt: Date;
  updatedAt: Date;
  settings: EDLSettings;
  tracks: Track[];
  transcript: Transcript | null;
  speakers: Speaker[]; // Speaker metadata for diarization
  undoStack: unknown[]; // TBD: command pattern types
  redoStack: unknown[];
}
