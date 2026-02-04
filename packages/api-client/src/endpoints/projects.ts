/**
 * Project endpoints
 */

import type { Project } from '@auteur/types';
import type { ApiClient } from '../client';

export interface CreateProjectRequest {
  name: string;
  resolution?: string;
  frameRate?: number;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
}

export class ProjectEndpoints {
  constructor(private client: ApiClient) {}

  /**
   * List user's projects
   * GET /projects
   */
  async list(): Promise<Project[]> {
    return this.client.get<Project[]>('/projects');
  }

  /**
   * Create new project
   * POST /projects
   */
  async create(data: CreateProjectRequest): Promise<Project> {
    return this.client.post<Project>('/projects', data);
  }

  /**
   * Get project details
   * GET /projects/:id
   */
  async get(id: string): Promise<Project> {
    return this.client.get<Project>(`/projects/${id}`);
  }

  /**
   * Update project
   * PUT /projects/:id
   */
  async update(id: string, data: UpdateProjectRequest): Promise<Project> {
    return this.client.put<Project>(`/projects/${id}`, data);
  }

  /**
   * Delete project
   * DELETE /projects/:id
   */
  async delete(id: string): Promise<void> {
    return this.client.delete<void>(`/projects/${id}`);
  }
}
