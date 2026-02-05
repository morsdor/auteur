/**
 * Job processing types
 * Matches Postgres jobs table and Kafka messages
 */

export type JobType =
  | 'transcription'
  | 'tts'
  | 'lip_sync'
  | 'video_generation'
  | 'overdub'
  | 'insert_speech'
  | 'performance_cloning' // Clone facial expressions/movements from a "driver" video
  | 'gaze_correction'
  | 'video_qa' // Ask questions about video content
  | 'audio_generation';

export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed';

// Discriminated union for job parameters based on type
export type JobParams =
  | {
      type: 'transcription';
      projectId: string;
      mediaId: string;
    }
  | {
      type: 'tts';
      text: string;
      voiceId: string;
      speed: number;
    }
  | {
      type: 'lip_sync';
      videoMediaId: string;
      audioMediaId: string;
    }
  | {
      type: 'video_generation';
      prompt: string;
      durationSec: number;
    }
  | {
      type: 'overdub';
      projectId: string;
      segmentId: string;
      newText: string;
      voiceSampleUrl: string;
    }
  | {
      type: 'insert_speech';
      projectId: string;
      insertPositionMs: number;
      text: string;
      voiceId: string;
    }
  | {
      type: 'performance_cloning';
      portraitMediaId: string;
      driverVideoId: string;
      expressionIntensity: number;
    }
  | {
      type: 'gaze_correction';
      videoMediaId: string;
    }
  | {
      type: 'video_qa';
      videoMediaId: string;
      question: string;
    }
  | {
      type: 'audio_generation';
      prompt: string;
      durationSec: number;
    };

// Discriminated union for job results based on type
export type JobResult =
  | {
      type: 'transcription';
      transcriptUrl: string;
      segments: Array<{
        speaker: string;
        startMs: number;
        endMs: number;
        text: string;
      }>;
    }
  | {
      type: 'tts';
      audioUrl: string;
      durationMs: number;
    }
  | {
      type: 'lip_sync';
      videoUrl: string;
      thumbnailUrl: string;
    }
  | {
      type: 'video_generation';
      videoUrl: string;
      thumbnailUrl: string;
    }
  | {
      type: 'overdub';
      audioUrl: string;
      durationMs: number;
    }
  | {
      type: 'insert_speech';
      audioUrl: string;
      durationMs: number;
    }
  | {
      type: 'performance_cloning';
      videoUrl: string;
      thumbnailUrl: string;
    }
  | {
      type: 'gaze_correction';
      videoUrl: string;
      thumbnailUrl: string;
    }
  | {
      type: 'video_qa';
      answer: string;
      relevantTimestamps: number[];
    }
  | {
      type: 'audio_generation';
      audioUrl: string;
      durationMs: number;
    };

export interface Job {
  id: string;
  userId: string;
  projectId: string | null;
  type: JobType;
  status: JobStatus;
  creditsCost: number;
  creditsRefunded: boolean;
  inputParams: JobParams;
  outputData: JobResult | null;
  errorMessage: string | null;
  modalTaskId: string | null;
  startedAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
}
