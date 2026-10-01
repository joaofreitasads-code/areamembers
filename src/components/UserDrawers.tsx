import React from 'react';
import { X, Download, Sparkles, CheckCircle2, Folder, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import { ModelItem } from '../types';

interface DownloadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  downloadsList: ModelItem[];
  onOpenFolder: (model: ModelItem) => void;
}

export const DownloadsModal: React.FC<DownloadsModalProps> = ({
  isOpen,
  onClose,
  downloadsList,
  onOpenFolder,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-100"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-5 space-y-4 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Histórico de Downloads</h3>
              <p className="text-xs text-zinc-400">{downloadsList.length} arquivos baixados recentemente</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 py-1">
          {downloadsList.length === 0 ? (
            <div className="text-center py-8 text-xs text-zinc-500">
              Você ainda não realizou nenhum download nesta sessão.
            </div>
          ) : (
            downloadsList.map((item) => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all"
              >
                <div className="min-w-0 pr-3">
                  <p className="text-xs font-bold text-white uppercase truncate">{item.title}</p>
                  <p className="text-[11px] text-zinc-400 flex items-center gap-2 mt-0.5">
                    <span>{item.category}</span>
                    <span>·</span>
                    <span className="font-mono">{item.fileSize}</span>
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenFolder(item);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors shrink-0"
                >
                  Ver Pasta
                </button>
              </div>
            ))
          )}
        </div>

        <div className="pt-2 border-t border-zinc-800 text-[11px] text-zinc-500 text-center">
          Todos os links do Google Drive permanecem disponíveis permanentemente.
        </div>
      </div>
    </div>
  );
};

interface BonusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BonusModal: React.FC<BonusModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-100"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-zinc-950 border border-zinc-750 rounded-2xl shadow-2xl p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between pb-3 border-b border-zinc-800">
          <div className="space-y-1">
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-white text-black rounded">
              MEMBRO VIP · VITALÍCIO
            </span>
            <h3 className="text-base font-bold text-white tracking-tight">Planos, Bônus & Vantagens</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white">Mais de 150.000 Arquivos STL Atualizados</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                Acesso irrestrito a todas as categorias: Tricô/Knitted, Colecionáveis, Pokémon, Gamer e Decoração.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-white shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white">Licença Comercial Vitalícia</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                Permissão de comercialização para todas as impressões físicas produzidas a partir dos arquivos.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-3">
            <Zap className="w-5 h-5 text-white shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white">Perfis de Fatiamento Prontos</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                Arquivos pré-configurados com suportes otimizados para Bambu Lab, Creality, Anycubic e Cura.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-zinc-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs font-bold bg-white text-black rounded-xl hover:bg-zinc-200 transition-colors shadow-md"
          >
            Fechar Painel
          </button>
        </div>
      </div>
    </div>
  );
};
