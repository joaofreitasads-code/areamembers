// High-performance image URL resolver, Google Edge WebP CDN optimizer and memory cache

// Session memory cache to track already-loaded image URLs
const loadedImageUrls = new Set<string>();

// Restore loaded URLs from sessionStorage for instant zero-flash renders
try {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    const raw = sessionStorage.getItem('universo3d_cached_images');
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        arr.forEach(url => { if (typeof url === 'string') loadedImageUrls.add(url); });
      }
    }
  }
} catch {
  // Ignore storage access errors
}

let saveTimer: number | null = null;
export function markImageCached(url: string): void {
  if (!url || loadedImageUrls.has(url)) return;
  loadedImageUrls.add(url);
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      if (!saveTimer) {
        saveTimer = window.setTimeout(() => {
          saveTimer = null;
          const sample = Array.from(loadedImageUrls).slice(-250);
          sessionStorage.setItem('universo3d_cached_images', JSON.stringify(sample));
        }, 1200);
      }
    }
  } catch {
    // Ignore storage quota errors
  }
}

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
 * Uses Google's edge WebP compression (=s220-rw) which serves ~7KB-12KB WebP images
 * with 24-hour browser caching (max-age=86400) and zero redirects.
 * Also optimizes external hosts like Imgur to medium thumbnails (46KB instead of 2.2MB).
 */
export function getOptimizedCardImageUrl(
  rawUrlOrId: string | undefined | null,
  attempt: number = 0,
  targetWidth: number = 220
): string {
  if (!rawUrlOrId) return '';
  if (rawUrlOrId.startsWith('/')) return rawUrlOrId; // Local asset

  // Optimize Imgur links: replace with medium thumbnail (.png -> m.png)
  if (rawUrlOrId.includes('imgur.com')) {
    if (attempt === 0 && !/[a-zA-Z0-9]+[mstb]\.[a-zA-Z]+$/.test(rawUrlOrId)) {
      return rawUrlOrId.replace(/([a-zA-Z0-9_-]+)\.(png|jpg|jpeg|webp)/i, '$1m.$2');
    }
    return rawUrlOrId;
  }

  const id = extractDriveId(rawUrlOrId);
  if (!id) return rawUrlOrId;

  // Ultra-light 220px boundary: delivers crisp high-DPI quality at just ~8-12KB
  const size = Math.min(260, Math.max(200, targetWidth));

  // High-Speed Multi-CDN Fallback Sequence:
  switch (attempt) {
    case 0:
      // Fastest: Google Edge WebP resizer (~7KB-12KB WebP, 0 redirects, direct CDN)
      return `https://lh3.googleusercontent.com/d/${id}=s${size}-rw`;
    case 1:
      // Fallback 1: Standard compressed JPEG on Google Edge (~14KB-18KB)
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
 * Uses Google edge WebP (=s640-rw) serving crisp ~40-50KB WebP instead of 5-10MB raw.
 */
export function getOptimizedModalImageUrl(
  rawUrlOrId: string | undefined | null,
  attempt: number = 0
): string {
  if (!rawUrlOrId) return '';
  if (rawUrlOrId.startsWith('/')) return rawUrlOrId;

  // Optimize Imgur links for modal
  if (rawUrlOrId.includes('imgur.com')) {
    if (attempt === 0 && !/[a-zA-Z0-9]+[mstb]\.[a-zA-Z]+$/.test(rawUrlOrId)) {
      return rawUrlOrId.replace(/([a-zA-Z0-9_-]+)\.(png|jpg|jpeg|webp)/i, '$1l.$2');
    }
    return rawUrlOrId;
  }

  const id = extractDriveId(rawUrlOrId);
  if (!id) return rawUrlOrId;

  switch (attempt) {
    case 0:
      // Crisp 640p WebP modal preview (~40KB-55KB)
      return `https://lh3.googleusercontent.com/d/${id}=s640-rw`;
    case 1:
      // High-res JPEG fallback
      return `https://lh3.googleusercontent.com/d/${id}=s640`;
    case 2:
      // Direct raw
      return `https://lh3.googleusercontent.com/d/${id}`;
    case 3:
      return `https://drive.google.com/thumbnail?id=${id}&sz=w700`;
    default:
      return `https://lh3.googleusercontent.com/d/${id}=s640-rw`;
  }
}

/**
 * Check if an image URL was already loaded in this session
 */
export function isImageCached(url: string): boolean {
  return loadedImageUrls.has(url);
}

/**
 * Preloads the highest priority images (first visible viewport fold) immediately with high fetch priority
 */
export function preloadPriorityImages(urls: string[]): void {
  if (typeof window === 'undefined') return;
  const valid = urls.filter(u => u && !loadedImageUrls.has(u)).slice(0, 16);
  valid.forEach(url => {
    const img = new Image();
    img.referrerPolicy = 'no-referrer';
    (img as unknown as { fetchPriority?: string }).fetchPriority = 'high';
    img.decoding = 'async';
    img.onload = () => {
      markImageCached(url);
      if ('decode' in img) img.decode().catch(() => {});
    };
    img.src = url;
  });
}

/**
 * Preload an array of image URLs silently in the background using micro-batched idle execution
 */
export function preloadImageBatch(urls: string[], limit: number = 72): void {
  if (typeof window === 'undefined') return;

  const toPreload = urls.filter(u => u && !loadedImageUrls.has(u)).slice(0, limit);
  if (toPreload.length === 0) return;

  const runBatch = () => {
    let idx = 0;
    const chunk = 8;
    const nextChunk = () => {
      if (idx >= toPreload.length) return;
      const slice = toPreload.slice(idx, idx + chunk);
      idx += chunk;

      slice.forEach(url => {
        const img = new Image();
        img.referrerPolicy = 'no-referrer';
        img.decoding = 'async';
        img.onload = () => {
          loadedImageUrls.add(url);
          if ('decode' in img) img.decode().catch(() => {});
        };
        img.src = url;
      });

      if (idx < toPreload.length) {
        if ('requestIdleCallback' in window) {
          (window as unknown as { requestIdleCallback: (fn: () => void, opts: { timeout: number }) => void })
            .requestIdleCallback(nextChunk, { timeout: 200 });
        } else {
          setTimeout(nextChunk, 25);
        }
      }
    };
    nextChunk();
  };

  if ('requestIdleCallback' in window) {
    (window as unknown as { requestIdleCallback: (fn: () => void, opts: { timeout: number }) => void })
      .requestIdleCallback(runBatch, { timeout: 350 });
  } else {
    setTimeout(runBatch, 30);
  }
}
