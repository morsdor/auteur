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
  async createTranscription(data: { projectId: string; mediaId: string }): Promise<Job> {
    return this.client.post<Job>('/jobs/transcription', data);
  }

  /**
   * Start TTS generation
   * POST /jobs/tts
   */
  async createTTS(data: { text: string; voiceId: string; speed: number }): Promise<Job> {
    return this.client.post<Job>('/jobs/tts', data);
  }

  /**
   * Start lip sync job
   * POST /jobs/lip-sync
   */
  async createLipSync(data: { videoMediaId: string; audioMediaId: string }): Promise<Job> {
    return this.client.post<Job>('/jobs/lip-sync', data);
  }

  /**
   * Start video generation job (Pro only)
   * POST /jobs/video-generation
   */
  async createVideoGeneration(data: { prompt: string; durationSec: number }): Promise<Job> {
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
