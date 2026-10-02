import React, { useState, useEffect } from 'react';
import { Heart, ExternalLink, Box, ChevronLeft, ChevronRight, Images } from 'lucide-react';
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
    return getOptimizedCardImageUrl(rawSrc, fallbackAttempt, 320);
  }, [rawSrc, fallbackAttempt]);

  const [isLoaded, setIsLoaded] = useState(() => (currentSrc ? isImageCached(currentSrc) : false));

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

  const hasPhoto = Boolean(currentSrc && !imageError);

  return (
    <article
      onClick={() => onOpenDetails(model)}
      style={{ contentVisibility: 'auto', containIntrinsicSize: '320px' }}
      className="group bg-[#151515] hover:bg-[#1c1c1c] border border-[#282828] hover:border-white rounded-xl overflow-hidden cursor-pointer transition-all duration-200 flex flex-col justify-between text-left p-3 shadow-md hover:shadow-[0_12px_32px_rgba(0,0,0,0.8)] relative will-change-transform"
    >
      {/* Visual Image Container with Square Aspect Ratio */}
      <div className="w-full aspect-square relative overflow-hidden rounded-lg bg-[#0e0e0e] flex items-center justify-center group/image select-none border border-[#222222]">
        {/* Placeholder skeleton loader while image is loading */}
        {hasPhoto && !isLoaded && (
          <div className="absolute inset-0 bg-[#161616] flex items-center justify-center z-0">
            <Box className="w-8 h-8 text-neutral-700 animate-pulse" />
          </div>
        )}

        {hasPhoto ? (
          <img
            key={`${currentSrc}-${fallbackAttempt}`}
            src={currentSrc}
            alt={model.title}
            referrerPolicy="no-referrer"
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'low'}
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
            className={`w-full h-full object-cover object-center transition-opacity duration-200 group-hover:scale-105 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-98'
            }`}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-neutral-400 p-4 text-center">
            <Box className="w-10 h-10 text-neutral-400 group-hover:text-white transition-colors" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-white font-black">MODELO 3D</span>
          </div>
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

        {/* Primary Action Button: High-Contrast Pure White with Black Text */}
        <button
          type="button"
          onClick={handleAccessFolder}
          className="w-full bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer select-none active:scale-[0.98] mt-auto"
        >
          <span>ACESSAR PASTA</span>
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
