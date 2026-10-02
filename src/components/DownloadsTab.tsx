import React from 'react';
import { Download, ExternalLink, HardDrive, Trash2, Box } from 'lucide-react';
import { ModelItem, VIP_DRIVE_MAIN_URL } from '../data/modelsData';

interface DownloadsTabProps {
  downloadedModels: ModelItem[];
  onClearDownloads: () => void;
  onOpenModel: (model: ModelItem) => void;
  onReDownload: (model: ModelItem) => void;
  onBrowseCatalog: () => void;
}

export const DownloadsTab: React.FC<DownloadsTabProps> = ({
  downloadedModels,
  onClearDownloads,
  onOpenModel,
  onReDownload,
  onBrowseCatalog
}) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto text-left">
      {/* Header (Black & White) */}
      <div className="border-b border-[#262626] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block font-black">
            HISTÓRICO LOCAL
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
            MEUS DOWNLOADS ({downloadedModels.length})
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm font-bold">
            Arquivos STL e 3MF acessados recentemente para reenviar ao fatiador ou baixar novamente.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {downloadedModels.length > 0 && (
            <button
              onClick={onClearDownloads}
              className="px-3.5 py-2 rounded-lg bg-[#181818] hover:bg-[#252525] text-neutral-300 hover:text-white border border-[#303030] text-xs font-mono font-bold transition-all flex items-center gap-1.5 uppercase cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Limpar Histórico</span>
            </button>
          )}

          <a
            href={VIP_DRIVE_MAIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-white hover:bg-neutral-200 text-black text-xs font-mono font-black uppercase transition flex items-center gap-2 shadow-md cursor-pointer"
          >
            <HardDrive className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Google Drive Raiz</span>
          </a>
        </div>
      </div>

      {/* Downloads List or Empty State */}
      {downloadedModels.length === 0 ? (
        <div className="p-16 text-center border border-[#262626] rounded-xl bg-[#141414] space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#0c0c0c] text-white flex items-center justify-center mx-auto border border-white/20">
            <Download className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-white">Nenhum download registrado nesta sessão</h3>
            <p className="text-neutral-400 text-xs max-w-md mx-auto">
              Ao acessar as pastas no Google Drive ou baixar os arquivos STL, eles ficarão registrados aqui para facilitar seu fluxo de trabalho.
            </p>
          </div>
          <button
            onClick={onBrowseCatalog}
            className="px-5 py-2.5 bg-white hover:bg-neutral-200 text-black text-xs font-mono font-black uppercase rounded-lg transition shadow-md cursor-pointer"
          >
            Explorar Catálogo 3D
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {downloadedModels.map((model) => (
            <div
              key={model.id}
              className="p-3.5 rounded-xl border border-[#282828] hover:border-white bg-[#151515] hover:bg-[#1c1c1c] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div 
                className="flex items-center gap-3.5 cursor-pointer flex-1"
                onClick={() => onOpenModel(model)}
              >
                <div className="w-14 h-14 rounded-lg bg-[#0e0e0e] border border-[#2a2a2a] shrink-0 overflow-hidden flex items-center justify-center">
                  {model.imageUrl ? (
                    <img 
                      src={model.imageUrl} 
                      alt="" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <Box className="w-6 h-6 text-white" />
                  )}
                </div>

                <div className="space-y-1 text-left min-w-0">
                  <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-neutral-400 uppercase">
                    <span>{model.category}</span>
                    {model.fileSize && <span>• {model.fileSize}</span>}
                  </div>
                  <h4 className="text-sm font-extrabold text-white truncate hover:underline transition">
                    {model.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
                    {model.printTimeHours && <span>{model.printTimeHours}h de impressão</span>}
                    {model.suggestedPrice && <span className="text-white font-black">R$ {model.suggestedPrice.toFixed(2)}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onReDownload(model)}
                  className="px-3 py-2 bg-white hover:bg-neutral-200 text-black font-mono font-black text-xs uppercase rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Baixar Novamente</span>
                </button>

                <a
                  href={model.driveUrl || VIP_DRIVE_MAIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#1e1e1e] hover:bg-[#282828] text-neutral-300 hover:text-white border border-[#353535] rounded-lg transition"
                  title="Abrir pasta no Drive"
                >
                  <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
