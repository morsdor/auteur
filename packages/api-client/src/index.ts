/**
 * @auteur/api-client
 * Type-safe REST API client for Auteur AI Spring Boot backend
 */

import { ApiClient, type ClientConfig, ApiClientError } from './client';
import { AuthEndpoints } from './endpoints/auth';
import { UserEndpoints } from './endpoints/users';
import { ProjectEndpoints } from './endpoints/projects';
import { MediaEndpoints } from './endpoints/media';
import { JobEndpoints } from './endpoints/jobs';
import { CreditEndpoints } from './endpoints/credits';

export class AuteurApiClient {
  private client: ApiClient;

  public auth: AuthEndpoints;
  public users: UserEndpoints;
  public projects: ProjectEndpoints;
  public media: MediaEndpoints;
  public jobs: JobEndpoints;
  public credits: CreditEndpoints;

  constructor(config: ClientConfig) {
    this.client = new ApiClient(config);

    // Initialize endpoint groups
    this.auth = new AuthEndpoints(this.client);
    this.users = new UserEndpoints(this.client);
    this.projects = new ProjectEndpoints(this.client);
    this.media = new MediaEndpoints(this.client);
    this.jobs = new JobEndpoints(this.client);
    this.credits = new CreditEndpoints(this.client);
  }

  /**
   * Set authentication token
   */
  setAuthToken(token: string): void {
    this.client.setAuthToken(token);
  }

  /**
   * Clear authentication token
   */
  clearAuthToken(): void {
    this.client.clearAuthToken();
  }
}

// Re-export types and error class
export { ApiClientError, type ClientConfig };
export type { VerifyTokenResponse } from './endpoints/auth';
export type { UserProfile } from './endpoints/users';
export type { CreateProjectRequest, UpdateProjectRequest } from './endpoints/projects';
export type { UploadUrlRequest, UploadUrlResponse } from './endpoints/media';
