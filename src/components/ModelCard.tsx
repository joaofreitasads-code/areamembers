import React from 'react';
import { ExternalLink } from 'lucide-react';
import { ModelItem } from '../types';
import { CharacterAvatar } from './CharacterAvatar';

interface ModelCardProps {
  model: ModelItem;
  onToggleFavorite?: (id: string) => void;
  onOpenFolder?: (model: ModelItem) => void;
  onQuickDownload?: (model: ModelItem) => void;
  onCopyLink?: (link: string, title: string) => void;
}

export const ModelCard: React.FC<ModelCardProps> = ({
  model,
}) => {
  return (
    <div className="group relative flex flex-col justify-between bg-zinc-900/70 hover:bg-zinc-900 border border-zinc-800/90 hover:border-zinc-500 rounded-2xl p-3 transition-all duration-200 shadow-md hover:shadow-2xl">
      
      {/* 1. Media Preview Area (Checkerboard Chess Style) */}
      <a 
        href={model.driveLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 border border-zinc-800 bg-[#0c0c0f] flex items-center justify-center group-hover:border-zinc-400 transition-colors cursor-pointer block"
      >
        {/* Chess Checkerboard background */}
        <div className="absolute inset-0 chess-pattern-contrast opacity-50 pointer-events-none" />

        {/* Real Model Photo from Google Drive */}
        {model.imageUrl ? (
          <img
            src={model.imageUrl}
            alt={model.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="relative z-10 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Hide broken image so fallback avatar displays
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          /* Centered Character STL Model Avatar */
          <div className="relative z-10 flex flex-col items-center justify-center p-2 group-hover:scale-105 transition-transform duration-200">
            <CharacterAvatar charKey={model.charKey} title={model.title} />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-15" />
      </a>

      {/* 2. Text Content: Title */}
      <div className="mb-3 px-0.5">
        <a 
          href={model.driveLink}
          target="_blank"
          rel="noopener noreferrer"
          title={model.title}
          className="text-xs font-bold text-white uppercase tracking-tight line-clamp-2 leading-tight hover:text-zinc-300 transition-colors cursor-pointer block min-h-[32px]"
        >
          {model.title}
        </a>
      </div>

      {/* 3. Primary Action Button: ACESSAR PASTA ↗ */}
      <a
        href={model.driveLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold uppercase tracking-wider text-[11px] transition-all duration-150 shadow-md active:scale-[0.98] cursor-pointer mt-auto text-center"
      >
        <span>ACESSAR PASTA</span>
        <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
      </a>

    </div>
  );
};
