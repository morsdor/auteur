/**
 * Media endpoints
 */

import type { MediaFile } from '@auteur/types';
import type { ApiClient } from '../client';

export interface UploadUrlRequest {
  filename: string;
  contentType: string;
}

export interface UploadUrlResponse {
  uploadUrl: string;
  mediaId: string;
}

export class MediaEndpoints {
  constructor(private client: ApiClient) {}

  /**
   * Get presigned upload URL for R2
   * POST /projects/:id/media/upload-url
   */
  async getUploadUrl(projectId: string, data: UploadUrlRequest): Promise<UploadUrlResponse> {
    return this.client.post<UploadUrlResponse>(`/projects/${projectId}/media/upload-url`, data);
  }

  /**
   * Confirm upload complete
   * POST /projects/:id/media/:media_id/confirm
   */
  async confirmUpload(projectId: string, mediaId: string): Promise<MediaFile> {
    return this.client.post<MediaFile>(`/projects/${projectId}/media/${mediaId}/confirm`);
  }

  /**
   * Delete media file
   * DELETE /projects/:id/media/:media_id
   */
  async delete(projectId: string, mediaId: string): Promise<void> {
    return this.client.delete<void>(`/projects/${projectId}/media/${mediaId}`);
  }
}
