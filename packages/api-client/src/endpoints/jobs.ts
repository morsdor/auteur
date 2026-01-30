/**
 * Job endpoints
 */

import type { Job, JobParams } from '@auteur/types';
import type { ApiClient } from '../client';

export class JobEndpoints {
  constructor(private client: ApiClient) {}

  /**
   * Start transcription job
   * POST /jobs/transcription
   */
  async createTranscription(data: { project_id: string; media_id: string }): Promise<Job> {
    return this.client.post<Job>('/jobs/transcription', data);
  }

  /**
   * Start TTS generation
   * POST /jobs/tts
   */
  async createTTS(data: { text: string; voice_id: string; speed: number }): Promise<Job> {
    return this.client.post<Job>('/jobs/tts', data);
  }

  /**
   * Start lip sync job
   * POST /jobs/lip-sync
   */
  async createLipSync(data: { video_media_id: string; audio_media_id: string }): Promise<Job> {
    return this.client.post<Job>('/jobs/lip-sync', data);
  }

  /**
   * Start video generation job (Pro only)
   * POST /jobs/video-generation
   */
  async createVideoGeneration(data: { prompt: string; duration_sec: number }): Promise<Job> {
    return this.client.post<Job>('/jobs/video-generation', data);
  }

  /**
   * Get job status
   * GET /jobs/:id
   */
  async get(id: string): Promise<Job> {
    return this.client.get<Job>(`/jobs/${id}`);
  }
}
