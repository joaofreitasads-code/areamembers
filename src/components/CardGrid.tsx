import React from 'react';
import { ModelItem } from '../types';
import { ModelCard } from './ModelCard';
import { Sparkles, Frown } from 'lucide-react';

interface CardGridProps {
  models: ModelItem[];
  onToggleFavorite: (id: string) => void;
  onOpenFolder: (model: ModelItem) => void;
  onQuickDownload: (model: ModelItem) => void;
  onCopyLink: (link: string, title: string) => void;
  onClearFilters?: () => void;
}

export const CardGrid: React.FC<CardGridProps> = ({
  models,
  onToggleFavorite,
  onOpenFolder,
  onQuickDownload,
  onCopyLink,
  onClearFilters,
}) => {
  if (models.length === 0) {
    return (
      <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-zinc-900/40 border border-dashed border-zinc-800 rounded-2xl my-6">
        <div className="w-12 h-12 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center mb-3">
          <Frown className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-white mb-1">Nenhum modelo encontrado</h3>
        <p className="text-xs text-zinc-400 max-w-sm mb-4">
          Tente ajustar sua busca ou selecionar outra categoria para ver os arquivos STL disponíveis.
        </p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="px-4 py-2 text-xs font-semibold text-black bg-white rounded-xl hover:bg-zinc-200 transition-colors shadow"
          >
            Limpar Filtros e Ver Todos
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3.5 pb-12">
      {models.map((model) => (
        <ModelCard
          key={model.id}
          model={model}
          onToggleFavorite={onToggleFavorite}
          onOpenFolder={onOpenFolder}
          onQuickDownload={onQuickDownload}
          onCopyLink={onCopyLink}
        />
      ))}
    </div>
  );
};
