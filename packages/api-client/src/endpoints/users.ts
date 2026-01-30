/**
 * User endpoints
 */

import type { User, Subscription, CreditBalance } from '@auteur/types';
import type { ApiClient } from '../client';

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  subscription: Subscription;
  credits: CreditBalance;
}

export class UserEndpoints {
  constructor(private client: ApiClient) {}

  /**
   * Get current user profile
   * GET /users/me
   */
  async getMe(): Promise<UserProfile> {
    return this.client.get<UserProfile>('/users/me');
  }
}
