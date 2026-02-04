/**
 * Authentication endpoints
 */

import type { ApiClient } from '../client';

export interface VerifyTokenResponse {
  valid: boolean;
  userId: string;
}

export class AuthEndpoints {
  constructor(private client: ApiClient) {}

  /**
   * Verify Supabase JWT token
   * POST /auth/verify
   */
  async verify(): Promise<VerifyTokenResponse> {
    return this.client.post<VerifyTokenResponse>('/auth/verify');
  }
}
