/**
 * @auteur/types
 * Shared TypeScript type definitions for Auteur AI
 */

// User types
export type { User, Profile, AccountSettings } from './user.types';

// Project types
export type { Project, ProjectSettings, MediaFile, MediaType, VoiceClone } from './project.types';

// Subscription types
export type {
  Subscription,
  Plan,
  SubscriptionStatus,
  CreditBalance,
  CreditTransaction,
  CreditTransactionType,
} from './subscription.types';

// EDL types
export type {
  EDL,
  EDLSettings,
  Track,
  TrackType,
  Clip,
  Transcript,
  TranscriptSegment,
  Speaker,
  Word,
} from './edl.types';

// Job types
export type { Job, JobType, JobStatus, JobParams, JobResult } from './job.types';

// API types
export type { ApiResponse, ApiError, PaginatedResponse } from './api.types';
export { isApiError } from './api.types';
