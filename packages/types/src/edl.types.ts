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
  ai_label: string; // Label from AI: "Speaker A", "Speaker B"
  user_label: string | null; // User-assigned name: "John", "Sarah"
  voice_clone_id: string | null; // Optional: reference to VoiceClone for overdubbing
  created_at: Date;
}

export interface Word {
  word: string;
  start_ms: number;
  end_ms: number;
  confidence: number;
}

export interface TranscriptSegment {
  id: string;
  speaker_id: string; // References Speaker.id
  start_ms: number;
  end_ms: number;
  text: string;
  words: Word[];
  deleted: boolean;
  edited_text: string | null;
}

export interface Transcript {
  generated_at: Date;
  segments: TranscriptSegment[];
}

export interface Clip {
  id: string;
  media_file_id: string; // references Postgres media_files.id
  track_id: string;
  start_ms: number; // position on timeline
  duration_ms: number; // length on timeline
  in_point_ms: number; // source start trim
  out_point_ms: number; // source end trim
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
  frame_rate: number;
  duration_ms: number;
}

export interface EDL {
  _id?: string; // MongoDB ObjectId
  project_id: string; // matches Postgres project.id
  version: number;
  created_at: Date;
  updated_at: Date;
  settings: EDLSettings;
  tracks: Track[];
  transcript: Transcript | null;
  speakers: Speaker[]; // Speaker metadata for diarization
  undo_stack: unknown[]; // TBD: command pattern types
  redo_stack: unknown[];
}
