import React, { useState } from 'react';
import { X, ExternalLink, Download, Copy, Check, Folder, FileCode, FileText, FileArchive, Layers, Sliders, ShieldCheck } from 'lucide-react';
import { ModelItem } from '../types';

interface FolderModalProps {
  model: ModelItem | null;
  onClose: () => void;
  onDownloadAll: (model: ModelItem) => void;
  onCopyLink: (link: string, title: string) => void;
}

export const FolderModal: React.FC<FolderModalProps> = ({
  model,
  onClose,
  onDownloadAll,
  onCopyLink,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!model) return null;

  const handleDownloadZip = () => {
    setDownloading(true);
    setDownloadProgress(10);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloading(false);
            setDownloadProgress(0);
            onDownloadAll(model);
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleCopy = () => {
    onCopyLink(model.driveLink, model.title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl bg-[#0e0e11] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 sm:p-6 border-b border-zinc-800 bg-zinc-950/80">
          <div className="space-y-1 pr-6">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white text-black rounded">
                PASTA NO DRIVE
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                {model.category}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
              {model.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
          
          {/* Top Banner: Chess Style Preview & Quick Specs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <div className="w-24 h-24 rounded-xl overflow-hidden relative border border-zinc-700 shrink-0 flex items-center justify-center bg-black">
              <div className="absolute inset-0 chess-pattern-contrast opacity-50" />
              {model.imageUrl ? (
                <img
                  src={model.imageUrl}
                  alt={model.title}
                  className="w-full h-full object-cover object-center relative z-10"
                />
              ) : (
                <Layers className="w-8 h-8 text-white relative z-10 drop-shadow" />
              )}
            </div>

            <div className="flex-1 grid grid-cols-2 gap-3 text-xs w-full">
              <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800/80">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Formato</span>
                <span className="font-mono font-bold text-white">{model.format} + Arquivos STL</span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800/80">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Tamanho da Pasta</span>
                <span className="font-mono font-bold text-white">{model.fileSize}</span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800/80">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Total de Downloads</span>
                <span className="font-mono font-bold text-white">{model.downloadsCount} fatiamentos</span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800/80">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Licença Comercial</span>
                <span className="font-semibold text-white flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-300" />
                  Liberada p/ Venda
                </span>
              </div>
            </div>
          </div>

          {/* Files List in Drive Folder */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Conteúdo da Pasta ({model.files.length} arquivos)
              </h4>
              <span className="text-[11px] text-zinc-500">Google Drive VIP</span>
            </div>

            <div className="border border-zinc-800 rounded-xl divide-y divide-zinc-850 overflow-hidden bg-zinc-950/60">
              {model.files.map((file, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-zinc-900/60 transition-colors">
                  <div className="flex items-center gap-2.5 min-w-0 pr-3">
                    {file.type === 'stl' && <FileCode className="w-4 h-4 text-white shrink-0" />}
                    {file.type === 'pdf' && <FileText className="w-4 h-4 text-zinc-400 shrink-0" />}
                    {file.type === 'folder' && <FileArchive className="w-4 h-4 text-zinc-300 shrink-0" />}
                    <span className="text-xs font-mono text-zinc-200 truncate">{file.name}</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500 shrink-0">{file.size}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Print Recommendations */}
          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-zinc-400" />
              Parâmetros Sugeridos para Fatiamento (Cura / Bambu / Orca)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div>
                <span className="text-zinc-500 block">Camada:</span>
                <span className="text-white font-mono">{model.printSettings.layerHeight}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Infill:</span>
                <span className="text-white font-mono">{model.printSettings.infill}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Suportes:</span>
                <span className="text-white font-medium">{model.printSettings.supports}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Filamento:</span>
                <span className="text-white font-medium">{model.printSettings.material}</span>
              </div>
            </div>
          </div>

          {/* Downloading Progress Bar */}
          {downloading && (
            <div className="space-y-1.5 p-3 rounded-xl bg-zinc-950 border border-zinc-800">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-300">Compactando arquivos STL...</span>
                <span className="text-white font-bold">{downloadProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-zinc-800 bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-xl transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Link'}</span>
            </button>

            <a
              href={model.driveLink}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-xl transition-colors"
            >
              <span>Abrir Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            onClick={handleDownloadZip}
            disabled={downloading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-black bg-white hover:bg-zinc-200 rounded-xl transition-all shadow-md uppercase tracking-wider"
          >
            <Download className="w-4 h-4" />
            <span>Baixar Pasta Completa (.ZIP)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
