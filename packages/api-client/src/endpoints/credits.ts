/**
 * Credit endpoints
 */

import type { CreditBalance, CreditTransaction } from '@auteur/types';
import type { ApiClient } from '../client';

export class CreditEndpoints {
  constructor(private client: ApiClient) {}

  /**
   * Get credit balance
   * GET /credits
   */
  async getBalance(): Promise<CreditBalance> {
    return this.client.get<CreditBalance>('/credits');
  }

  /**
   * Get credit transaction history
   * GET /credits/history
   */
  async getHistory(): Promise<CreditTransaction[]> {
    return this.client.get<CreditTransaction[]>('/credits/history');
  }
}
