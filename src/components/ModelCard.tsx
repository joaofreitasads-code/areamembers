import React, { useState, useEffect } from 'react';
import { Heart, ExternalLink, Box, ChevronLeft, ChevronRight, Images, Lock } from 'lucide-react';
import { ModelItem, VIP_DRIVE_MAIN_URL } from '../data/modelsData';
import { getOptimizedCardImageUrl, isImageCached, markImageCached } from '../utils/imageOptimizer';

interface ModelCardProps {
  model: ModelItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenDetails: (model: ModelItem) => void;
  onDirectDownload?: (model: ModelItem) => void;
  priority?: boolean;
}

const ModelCardComponent: React.FC<ModelCardProps> = ({
  model,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
  onDirectDownload,
  priority = false
}) => {
  // Deduplicate all images strictly without repetition
  const allImages = React.useMemo(() => {
    return Array.from(
      new Set(
        model.images && model.images.length > 0
          ? model.images
          : ([model.imageUrl, model.thumbnailUrl].filter(Boolean) as string[])
      )
    );
  }, [model]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [fallbackAttempt, setFallbackAttempt] = useState(0);

  const rawSrc = allImages.length > 0 ? allImages[currentImageIndex] : (model.imageUrl || model.thumbnailUrl);
  const currentSrc = React.useMemo(() => {
    return getOptimizedCardImageUrl(rawSrc, fallbackAttempt, 220);
  }, [rawSrc, fallbackAttempt]);

  const isCached = React.useMemo(() => (currentSrc ? isImageCached(currentSrc) : false), [currentSrc]);
  const [isLoaded, setIsLoaded] = useState(() => (currentSrc ? isImageCached(currentSrc) : false));

  // Instant detection callback when browser already has image in cache
  const imgRef = React.useCallback((node: HTMLImageElement | null) => {
    if (node && (node.complete && node.naturalWidth > 0)) {
      markImageCached(currentSrc);
      setIsLoaded(true);
    }
  }, [currentSrc]);

  // Reset loaded state when src changes unless already in session cache
  useEffect(() => {
    if (currentSrc && isImageCached(currentSrc)) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
    setImageError(false);
  }, [currentSrc]);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageError(false);
    setFallbackAttempt(0);
    setCurrentImageIndex(prev => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageError(false);
    setFallbackAttempt(0);
    setCurrentImageIndex(prev => (prev + 1) % allImages.length);
  };

  const handleAccessFolder = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDirectDownload) onDirectDownload(model);
    window.open(model.driveUrl || VIP_DRIVE_MAIN_URL, '_blank', 'noopener,noreferrer');
  };

  const isVipCheckout = model.id === 'produto-vip-vitalicio-cadeado';
  const hasPhoto = Boolean(currentSrc && !imageError);

  return (
    <article
      onClick={() => {
        if (isVipCheckout) {
          window.open(model.driveUrl || 'https://checkout.wiven.com.br/checkout/cmupyvej300i601pll6oi9cj1?offer=BX0N8TV', '_blank', 'noopener,noreferrer');
        } else {
          onOpenDetails(model);
        }
      }}
      style={{ contentVisibility: 'auto', containIntrinsicSize: '320px' }}
      className={`group bg-[#151515] hover:bg-[#1c1c1c] border rounded-xl overflow-hidden cursor-pointer transition-all duration-200 flex flex-col justify-between text-left p-3 shadow-md hover:shadow-[0_12px_32px_rgba(0,0,0,0.8)] relative will-change-transform ${
        isVipCheckout ? 'border-amber-400/80 hover:border-amber-300' : 'border-[#282828] hover:border-white'
      }`}
    >
      {/* Visual Image Container with Square Aspect Ratio */}
      <div className="w-full aspect-square relative overflow-hidden rounded-lg bg-[#0e0e0e] flex items-center justify-center group/image select-none border border-[#222222]">
        {/* Placeholder skeleton loader while image is loading */}
        {hasPhoto && !isLoaded && !priority && !isCached && (
          <div className="absolute inset-0 bg-[#141414] flex items-center justify-center z-0">
            <Box className="w-8 h-8 text-neutral-700 animate-pulse" />
          </div>
        )}

        {hasPhoto ? (
          <img
            ref={imgRef}
            key={`${currentSrc}-${fallbackAttempt}`}
            src={currentSrc}
            alt={model.title}
            referrerPolicy="no-referrer"
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={() => {
              markImageCached(currentSrc);
              setIsLoaded(true);
            }}
            onError={() => {
              if (fallbackAttempt < 3) {
                setFallbackAttempt(prev => prev + 1);
              } else {
                setImageError(true);
              }
            }}
            className={`w-full h-full object-cover object-center transition-opacity duration-150 group-hover:scale-105 ${
              (isLoaded || priority || isCached) ? 'opacity-100 scale-100' : 'opacity-0 scale-98'
            }`}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-neutral-400 p-4 text-center">
            <Box className="w-10 h-10 text-neutral-400 group-hover:text-white transition-colors" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-white font-black">MODELO 3D</span>
          </div>
        )}

        {/* Transparent Lock Centered in the middle (No meio) for VIP checkout */}
        {isVipCheckout ? (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <span className="p-3.5 sm:p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform">
              <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] stroke-[1.8]" />
            </span>
          </div>
        ) : (
          model.badge && (
            <div className="absolute top-2.5 left-2.5 z-20">
              <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded shadow-md tracking-wider flex items-center gap-1 bg-black/85 text-white border border-white/20">
                {model.badge}
              </span>
            </div>
          )
        )}

        {/* Top-Right: Circular Favorite Heart Button (Black & White) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(model.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all z-20 border ${
            isFavorite
              ? 'bg-white text-black border-white shadow-md'
              : 'bg-black/75 hover:bg-white text-white hover:text-black border-white/20 hover:border-white shadow-sm'
          }`}
          title={isFavorite ? "Remover dos favoritos" : "Salvar nos favoritos"}
          aria-label={isFavorite ? "Remover dos favoritos" : "Salvar nos favoritos"}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-black stroke-black' : 'stroke-current'}`} />
        </button>

        {/* Multi-Image Controls if available */}
        {allImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/80 hover:bg-white text-white hover:text-black border border-white/20 opacity-0 group-hover/image:opacity-100 transition-all z-20 cursor-pointer"
              title="Foto anterior"
            >
              <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/80 hover:bg-white text-white hover:text-black border border-white/20 opacity-0 group-hover/image:opacity-100 transition-all z-20 cursor-pointer"
              title="Próxima foto"
            >
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
            <div className="absolute bottom-2 right-2 z-20 bg-black/85 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border border-white/20 flex items-center gap-1 pointer-events-none">
              <Images className="w-3 h-3 text-white" />
              <span>{currentImageIndex + 1}/{allImages.length}</span>
            </div>
          </>
        )}
      </div>

      {/* Model Info Block - Clean, Title and Button Only */}
      <div className="pt-3 pb-1 flex flex-col justify-between flex-1 gap-2.5">
        <div>
          {/* Title: Bold, Uppercase, 2 lines clamp */}
          <h3
            className="text-xs sm:text-sm font-extrabold text-white group-hover:text-neutral-100 transition-colors line-clamp-2 uppercase leading-snug tracking-tight"
            title={model.title}
          >
            {model.title}
          </h3>
        </div>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={handleAccessFolder}
          className={`w-full font-black text-xs uppercase tracking-wider py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer select-none active:scale-[0.98] mt-auto ${
            isVipCheckout
              ? 'bg-amber-400 hover:bg-amber-300 text-black'
              : 'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-emerald-950/40'
          }`}
        >
          {isVipCheckout && <Lock className="w-3.5 h-3.5 stroke-[2.5]" />}
          <span>{isVipCheckout ? 'ACESSAR PRODUTO' : 'ACESSAR PASTA'}</span>
          <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </article>
  );
};

export const ModelCard = React.memo(ModelCardComponent, (prev, next) => {
  return (
    prev.model.id === next.model.id &&
    prev.isFavorite === next.isFavorite &&
    prev.priority === next.priority
  );
});
