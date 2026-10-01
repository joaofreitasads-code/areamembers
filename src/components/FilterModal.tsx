import React from 'react';
import { X, Check, RotateCcw } from 'lucide-react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  formatFilter: string;
  setFormatFilter: (fmt: string) => void;
  badgeFilter: string;
  setBadgeFilter: (badge: string) => void;
  onReset: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  formatFilter,
  setFormatFilter,
  badgeFilter,
  setBadgeFilter,
  onReset,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-100"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-5 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Filtros Avançados</h3>
            <p className="text-xs text-zinc-400">Refine o acervo de arquivos STL</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter 1: Formato do Arquivo */}
        <div>
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block mb-2">
            Formato do Arquivo
          </label>
          <div className="grid grid-cols-4 gap-2">
            {['todos', 'STL', '3MF', 'OBJ'].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormatFilter(fmt)}
                className={`py-2 px-3 text-xs font-mono font-medium rounded-xl border transition-all ${
                  formatFilter === fmt
                    ? 'bg-white text-black border-white font-bold shadow'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                }`}
              >
                {fmt === 'todos' ? 'Todos' : fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Filter 2: Tipo de Destaque */}
        <div>
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block mb-2">
            Status / Selo
          </label>
          <div className="grid grid-cols-4 gap-2">
            {['todos', 'POPULAR', 'NOVO', 'DESTAQUE'].map((badge) => (
              <button
                key={badge}
                onClick={() => setBadgeFilter(badge)}
                className={`py-2 px-3 text-xs font-medium rounded-xl border transition-all ${
                  badgeFilter === badge
                    ? 'bg-white text-black border-white font-bold shadow'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                }`}
              >
                {badge === 'todos' ? 'Todos' : badge}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Resetar Filtros</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-black bg-white hover:bg-zinc-200 rounded-xl transition-colors shadow"
          >
            Aplicar Filtros
          </button>
        </div>

      </div>
    </div>
  );
};
