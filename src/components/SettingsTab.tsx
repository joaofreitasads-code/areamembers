import React, { useState } from 'react';
import { User, ShieldCheck, Download, Sliders, CheckCircle2, HardDrive, Printer, Sparkles, RefreshCw, Key } from 'lucide-react';
import { VIP_DRIVE_MAIN_URL } from '../data/modelsData';

interface SettingsTabProps {
  favoriteCount: number;
  onClearFavorites: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ favoriteCount, onClearFavorites }) => {
  const [clearedNotice, setClearedNotice] = useState(false);

  const handleClear = () => {
    if (window.confirm("Deseja realmente limpar sua lista de favoritos?")) {
      onClearFavorites();
      setClearedNotice(true);
      setTimeout(() => setClearedNotice(false), 2500);
    }
  };

  return (
    <div className="space-y-8 text-left max-w-4xl">
      {/* Profile Header */}
      <section className="bg-gradient-to-r from-[#131418] via-[#1a1b22] to-[#131418] border border-yellow-400/30 p-6 sm:p-8 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center font-black text-black text-2xl shadow-xl shrink-0">
              U3D
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black uppercase text-white font-sans">
                  MEMBRO VIP PREMIUM
                </h1>
                <span className="bg-yellow-400/20 text-yellow-400 border border-yellow-400/40 text-[9px] font-mono font-black px-2 py-0.5 rounded">
                  ATIVO ✅
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Licença Comercial Autorizada • Acesso Vitalício Irrestrito
              </p>
            </div>
          </div>

          <a
            href={VIP_DRIVE_MAIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-black text-xs font-mono uppercase tracking-wider rounded-xl flex items-center gap-2 transition cursor-pointer shadow-md shadow-emerald-950/40"
          >
            <HardDrive className="w-4 h-4" />
            <span>ACESSAR PASTA OFICIAL DRIVE</span>
          </a>
        </div>
      </section>

      {/* Slicer Settings Guides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#131418] border border-[#1F2127] rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-black uppercase text-white font-mono flex items-center gap-2">
            <Printer className="w-4 h-4 text-yellow-400" />
            Configurações Recomendadas de Slicer
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Parâmetros ideais testados para obter o melhor acabamento sem linha de emenda visível em estátuas e articulações.
          </p>

          <div className="space-y-2.5 text-xs font-mono">
            <div className="p-3 rounded-xl bg-[#181A20] border border-[#272A33] flex justify-between items-center">
              <span className="text-zinc-400">Figuras Articuladas 500%:</span>
              <span className="text-yellow-400 font-bold">0.20mm • 3 Paredes • Gyroid 15%</span>
            </div>
            <div className="p-3 rounded-xl bg-[#181A20] border border-[#272A33] flex justify-between items-center">
              <span className="text-zinc-400">Funkos e Chibis (10-12cm):</span>
              <span className="text-yellow-400 font-bold">0.16mm • 3 Paredes • Gyroid 12%</span>
            </div>
            <div className="p-3 rounded-xl bg-[#181A20] border border-[#272A33] flex justify-between items-center">
              <span className="text-zinc-400">Suporte Recomendado:</span>
              <span className="text-emerald-400 font-bold">Tree Slim (Árvore Estrita 25º)</span>
            </div>
            <div className="p-3 rounded-xl bg-[#181A20] border border-[#272A33] flex justify-between items-center">
              <span className="text-zinc-400">Velocidade Externa de Parede:</span>
              <span className="text-white font-bold">60 - 80 mm/s (para acabamento liso)</span>
            </div>
          </div>
        </div>

        <div className="bg-[#131418] border border-[#1F2127] rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-black uppercase text-white font-mono flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-yellow-400" />
            Termos de Uso e Licenciamento
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Informações sobre o que você pode e não pode fazer com os arquivos do acervo Universo 3D:
          </p>

          <div className="space-y-2 text-xs text-zinc-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Permitido:</strong> Imprimir e vender peças físicas ilimitadamente em lojas, feiras e marketplaces.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Permitido:</strong> Pintar, customizar e modificar a escala dos modelos conforme o seu projeto.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Permitido:</strong> Utilizar as fotos de divulgação incluídas nas pastas para anunciar suas vendas.</span>
            </div>
            <div className="flex items-start gap-2 text-rose-300">
              <span className="font-bold">❌ Proibido:</span>
              <span>Revender ou redistribuir os arquivos digitais .STL ou o link de acesso ao Google Drive VIP.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Storage and Favorites Management */}
      <div className="bg-[#131418] border border-[#1F2127] rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-black uppercase text-white font-mono flex items-center gap-2">
          <Sliders className="w-4 h-4 text-yellow-400" />
          Gerenciamento da Conta & Dados Locais
        </h3>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-[#1F2127]">
          <div>
            <span className="text-xs font-bold text-white block">Lista de Modelos Favoritados</span>
            <span className="text-xs text-zinc-400">Atualmente você tem {favoriteCount} modelo(s) salvos na sua biblioteca rápida.</span>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="py-2 px-3.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-mono font-bold rounded-xl transition cursor-pointer"
          >
            {clearedNotice ? "Favoritos Limpos!" : "Limpar Lista de Favoritos"}
          </button>
        </div>
      </div>
    </div>
  );
};
