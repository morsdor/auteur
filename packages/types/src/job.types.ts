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
      project_id: string;
      media_id: string;
    }
  | {
      type: 'tts';
      text: string;
      voice_id: string;
      speed: number;
    }
  | {
      type: 'lip_sync';
      video_media_id: string;
      audio_media_id: string;
    }
  | {
      type: 'video_generation';
      prompt: string;
      duration_sec: number;
    }
  | {
      type: 'overdub';
      project_id: string;
      segment_id: string;
      new_text: string;
      voice_sample_url: string;
    }
  | {
      type: 'insert_speech';
      project_id: string;
      insert_position_ms: number;
      text: string;
      voice_id: string;
    }
  | {
      type: 'performance_cloning';
      portrait_media_id: string;
      driver_video_id: string;
      expression_intensity: number;
    }
  | {
      type: 'gaze_correction';
      video_media_id: string;
    }
  | {
      type: 'video_qa';
      video_media_id: string;
      question: string;
    }
  | {
      type: 'audio_generation';
      prompt: string;
      duration_sec: number;
    };

// Discriminated union for job results based on type
export type JobResult =
  | {
      type: 'transcription';
      transcript_url: string;
      segments: Array<{
        speaker: string;
        start_ms: number;
        end_ms: number;
        text: string;
      }>;
    }
  | {
      type: 'tts';
      audio_url: string;
      duration_ms: number;
    }
  | {
      type: 'lip_sync';
      video_url: string;
      thumbnail_url: string;
    }
  | {
      type: 'video_generation';
      video_url: string;
      thumbnail_url: string;
    }
  | {
      type: 'overdub';
      audio_url: string;
      duration_ms: number;
    }
  | {
      type: 'insert_speech';
      audio_url: string;
      duration_ms: number;
    }
  | {
      type: 'performance_cloning';
      video_url: string;
      thumbnail_url: string;
    }
  | {
      type: 'gaze_correction';
      video_url: string;
      thumbnail_url: string;
    }
  | {
      type: 'video_qa';
      answer: string;
      relevant_timestamps: number[];
    }
  | {
      type: 'audio_generation';
      audio_url: string;
      duration_ms: number;
    };

export interface Job {
  id: string;
  user_id: string;
  project_id: string | null;
  type: JobType;
  status: JobStatus;
  credits_cost: number;
  credits_refunded: boolean;
  input_params: JobParams;
  output_data: JobResult | null;
  error_message: string | null;
  modal_task_id: string | null;
  started_at: Date | null;
  completed_at: Date | null;
  created_at: Date;
}
