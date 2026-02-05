/**
 * Subscription and billing types
 * Matches Postgres schema
 */

export type Plan = 'starter' | 'pro';
export type SubscriptionStatus = 'active' | 'cancelled' | 'expired';
export type CreditTransactionType = 'subscription' | 'usage' | 'refund' | 'bonus';

export interface Subscription {
  id: string;
  userId: string;
  plan: Plan;
  status: SubscriptionStatus;
  stripeSubscriptionId: string | null;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreditBalance {
  id: string;
  userId: string;
  balance: number;
  updatedAt: Date;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number; // positive = add, negative = deduct
  balanceAfter: number;
  type: CreditTransactionType;
  description: string | null;
  jobId: string | null; // reference to job if usage
  createdAt: Date;
}
