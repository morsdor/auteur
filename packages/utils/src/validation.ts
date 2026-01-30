/**
 * Validation helper functions
 */

/**
 * Validate email address format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Supported media MIME types
 */
const SUPPORTED_VIDEO_TYPES = [
  'video/mp4',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-matroska',
  'video/webm',
];

const SUPPORTED_AUDIO_TYPES = [
  'audio/mpeg',
  'audio/wav',
  'audio/x-wav',
  'audio/aac',
  'audio/ogg',
  'audio/webm',
];

const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
];

/**
 * Check if media type is supported
 */
export function isValidMediaType(mimeType: string): boolean {
  return (
    SUPPORTED_VIDEO_TYPES.includes(mimeType) ||
    SUPPORTED_AUDIO_TYPES.includes(mimeType) ||
    SUPPORTED_IMAGE_TYPES.includes(mimeType)
  );
}

/**
 * Get media category from MIME type
 */
export function getMediaCategory(mimeType: string): 'video' | 'audio' | 'image' | null {
  if (SUPPORTED_VIDEO_TYPES.includes(mimeType)) return 'video';
  if (SUPPORTED_AUDIO_TYPES.includes(mimeType)) return 'audio';
  if (SUPPORTED_IMAGE_TYPES.includes(mimeType)) return 'image';
  return null;
}

/**
 * Sanitize user input to prevent XSS
 * Basic sanitization - for serious use, consider using a library like DOMPurify
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validate project name
 */
export function isValidProjectName(name: string): boolean {
  return name.length > 0 && name.length <= 255;
}

/**
 * Validate file size (max 5GB)
 */
export function isValidFileSize(sizeBytes: number): boolean {
  const MAX_SIZE = 5 * 1024 * 1024 * 1024; // 5GB
  return sizeBytes > 0 && sizeBytes <= MAX_SIZE;
}
