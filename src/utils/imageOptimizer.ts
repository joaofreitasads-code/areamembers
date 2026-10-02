// High-performance image URL resolver, CDN optimizer and memory cache

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
 * Uses Google Drive's edge image resize service which serves ~25-50KB WebP/JPEG
 * with 24-hour browser caching (max-age=86400) instead of multi-megabyte raw files.
 */
export function getOptimizedCardImageUrl(
  rawUrlOrId: string | undefined | null,
  attempt: number = 0,
  targetWidth: number = 420
): string {
  if (!rawUrlOrId) return '';
  if (rawUrlOrId.startsWith('/')) return rawUrlOrId; // Local asset

  const id = extractDriveId(rawUrlOrId);
  if (!id) return rawUrlOrId;

  // Optimized fallback sequence:
  switch (attempt) {
    case 0:
      // Fastest: Google Drive edge thumbnail resizer (~30-50KB WebP/JPEG)
      return `https://drive.google.com/thumbnail?id=${id}&sz=w${targetWidth}`;
    case 1:
      // Fast fallback: LH3 usercontent CDN with query size
      return `https://lh3.googleusercontent.com/d/${id}=w${targetWidth}`;
    case 2:
      // LH3 direct
      return `https://lh3.googleusercontent.com/d/${id}`;
    case 3:
      // Direct Drive export view
      return `https://drive.google.com/uc?id=${id}&export=view`;
    default:
      return `https://drive.google.com/thumbnail?id=${id}&sz=w${targetWidth}`;
  }
}

/**
 * Returns an optimized high-resolution URL for modals and detail zooms.
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
      // High-res sharp modal thumbnail (~150-250KB instead of 5-10MB raw)
      return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
    case 1:
      return `https://lh3.googleusercontent.com/d/${id}`;
    case 2:
      return `https://drive.google.com/uc?id=${id}&export=view`;
    default:
      return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
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
 * Preload an array of image URLs silently into browser cache
 */
export function preloadImageBatch(urls: string[], limit: number = 8): void {
  if (typeof window === 'undefined') return;

  const toPreload = urls.filter(u => u && !loadedImageUrls.has(u)).slice(0, limit);
  toPreload.forEach(url => {
    const img = new Image();
    img.referrerPolicy = 'no-referrer';
    img.onload = () => loadedImageUrls.add(url);
    img.src = url;
  });
}
