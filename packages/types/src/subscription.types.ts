/**
 * Subscription and billing types
 * Matches Postgres schema
 */

export type Plan = 'starter' | 'pro';
export type SubscriptionStatus = 'active' | 'cancelled' | 'expired';
export type CreditTransactionType = 'subscription' | 'usage' | 'refund' | 'bonus';

export interface Subscription {
  id: string;
  user_id: string;
  plan: Plan;
  status: SubscriptionStatus;
  stripe_subscription_id: string | null;
  current_period_start: Date | null;
  current_period_end: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreditBalance {
  id: string;
  user_id: string;
  balance: number;
  updated_at: Date;
}

export interface CreditTransaction {
  id: string;
  user_id: string;
  amount: number; // positive = add, negative = deduct
  balance_after: number;
  type: CreditTransactionType;
  description: string | null;
  job_id: string | null; // reference to job if usage
  created_at: Date;
}
