// High-performance image URL resolver, Google Edge WebP CDN optimizer and memory cache

// Session memory cache to track already-loaded image URLs
const loadedImageUrls = new Set<string>();

/**
 * Extracts a Google Drive file ID from various URL patterns or bare IDs
 */
export function extractDriveId(urlOrId: string | undefined | null): string {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();
  if (!trimmed) return '';

  // Match /d/ID
  const matchD = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (matchD && matchD[1]) return matchD[1];

  // Match id=ID
  const matchId = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchId && matchId[1]) return matchId[1];

  // If it's already a bare ID (alphanumeric with - and _, usually 25-45 chars)
  if (/^[a-zA-Z0-9_-]{20,}$/.test(trimmed)) {
    return trimmed;
  }

  return '';
}

/**
 * Returns an ultra-fast, CDN-optimized thumbnail URL for catalog cards.
 * Uses Google's edge WebP compression (=s320-rw) which serves ~15-22KB WebP images
 * with 24-hour browser caching (max-age=86400) with zero cookie overhead or redirects,
 * loading practically instantaneously compared to raw 5MB files.
 */
export function getOptimizedCardImageUrl(
  rawUrlOrId: string | undefined | null,
  attempt: number = 0,
  targetWidth: number = 320
): string {
  if (!rawUrlOrId) return '';
  if (rawUrlOrId.startsWith('/')) return rawUrlOrId; // Local asset

  const id = extractDriveId(rawUrlOrId);
  if (!id) return rawUrlOrId;

  const size = Math.min(360, Math.max(280, targetWidth));

  // High-Speed Multi-CDN Fallback Sequence:
  switch (attempt) {
    case 0:
      // Fastest: Google Edge WebP resizer (~15KB-20KB WebP, 0 redirects, direct CDN)
      return `https://lh3.googleusercontent.com/d/${id}=s${size}-rw`;
    case 1:
      // Fallback 1: Standard compressed JPEG on Google Edge (~25KB-30KB)
      return `https://lh3.googleusercontent.com/d/${id}=s${size}`;
    case 2:
      // Fallback 2: Direct LH3 stream
      return `https://lh3.googleusercontent.com/d/${id}`;
    case 3:
      // Fallback 3: Drive thumbnail edge
      return `https://drive.google.com/thumbnail?id=${id}&sz=w${size}`;
    default:
      return `https://lh3.googleusercontent.com/d/${id}=s${size}-rw`;
  }
}

/**
 * Returns an optimized high-resolution URL for modals and detail zooms.
 * Uses Google edge WebP (=s720-rw) serving crisp ~55KB WebP instead of 5-10MB raw.
 */
export function getOptimizedModalImageUrl(
  rawUrlOrId: string | undefined | null,
  attempt: number = 0
): string {
  if (!rawUrlOrId) return '';
  if (rawUrlOrId.startsWith('/')) return rawUrlOrId;

  const id = extractDriveId(rawUrlOrId);
  if (!id) return rawUrlOrId;

  switch (attempt) {
    case 0:
      // Crisp 720p WebP modal preview (~50KB-65KB)
      return `https://lh3.googleusercontent.com/d/${id}=s720-rw`;
    case 1:
      // High-res JPEG fallback
      return `https://lh3.googleusercontent.com/d/${id}=s720`;
    case 2:
      // Direct raw
      return `https://lh3.googleusercontent.com/d/${id}`;
    case 3:
      return `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
    default:
      return `https://lh3.googleusercontent.com/d/${id}=s720-rw`;
  }
}

/**
 * Check if an image URL was already loaded in this session
 */
export function isImageCached(url: string): boolean {
  return loadedImageUrls.has(url);
}

/**
 * Mark an image URL as successfully loaded
 */
export function markImageCached(url: string): void {
  if (url) loadedImageUrls.add(url);
}

/**
 * Preload an array of image URLs silently in the background using idle time
 */
export function preloadImageBatch(urls: string[], limit: number = 16): void {
  if (typeof window === 'undefined') return;

  const toPreload = urls.filter(u => u && !loadedImageUrls.has(u)).slice(0, limit);
  if (toPreload.length === 0) return;

  const scheduleLoad = (cb: () => void) => {
    if ('requestIdleCallback' in window) {
      (window as unknown as { requestIdleCallback: (fn: () => void, opts: { timeout: number }) => void }).requestIdleCallback(cb, { timeout: 1500 });
    } else {
      setTimeout(cb, 50);
    }
  };

  scheduleLoad(() => {
    toPreload.forEach(url => {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.decoding = 'async';
      img.onload = () => loadedImageUrls.add(url);
      img.src = url;
    });
  });
}
