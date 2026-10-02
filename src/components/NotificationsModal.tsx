import React from 'react';
import { X } from 'lucide-react';
import { VIP_DRIVE_MAIN_URL } from '../data/modelsData';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const NOTICES = [
    {
      id: -1,
      tag: "POKÉMON 3D",
      title: "38 Modelos Clássicos Adicionados com Fotos e STLs",
      desc: "Ivysaur Pokébola, Charizard, Blastoise, Gengar, Gyarados, Abra, Haunter, Eeveelutions, Onix e muito mais com download direto do Drive.",
      time: "Hoje",
      isNew: true
    },
    {
      id: 0,
      tag: "EXPANSÃO DRIVE",
      title: "6 Novas Sessões & 450+ Novos Modelos Integrados",
      desc: "Aeromodelos RC, Animais Articulados, Animes VIP, Brinquedos Educativos, Bustos HQ e Funkos com fotos reais e STLs.",
      time: "Recente",
      isNew: true
    },
    {
      id: 1,
      tag: "MONSTER ENERGY",
      title: "Coleção Completa de Porta Latas e Copos Monster",
      desc: "19 subpastas com imagens oficiais de cada modelo: porta latas moletom, caixa expositora com LED, dispensador 16oz e copos multipartes.",
      time: "Recente",
      isNew: false
    },
    {
      id: 2,
      tag: "CALCULADORA",
      title: "Calculadora de Precificação 3D em Tempo Real",
      desc: "Calcule com precisão o custo de filamento, energia e margem de lucro por peça impressa.",
      time: "Recente",
      isNew: false
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-[#141414] border border-[#333333] rounded-2xl shadow-2xl text-left overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#262626] bg-[#0c0c0c]">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Notificações & Atualizações</h3>
            <span className="text-[11px] font-mono text-neutral-400">Novidades do Acervo 3D</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[#333333] bg-[#1a1a1a] text-neutral-300 hover:text-white transition-all cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <div className="p-5 space-y-3.5 max-h-[70vh] overflow-y-auto">
          {NOTICES.map((n) => (
            <div 
              key={n.id}
              className={`p-3.5 rounded-xl border transition-all text-left ${
                n.isNew 
                  ? 'border-white/40 bg-[#1c1c1c]' 
                  : 'border-[#262626] bg-[#121212]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] font-mono font-black uppercase text-black bg-white px-2 py-0.5 rounded-full">
                  {n.tag}
                </span>
                <span className="text-[10px] font-mono text-neutral-400">{n.time}</span>
              </div>
              <h4 className="text-xs font-bold text-white mb-1">{n.title}</h4>
              <p className="text-[11px] text-neutral-300 leading-relaxed font-bold">{n.desc}</p>
            </div>
          ))}
        </div>

        <div className="px-5 py-3.5 border-t border-[#262626] bg-[#0c0c0c] flex items-center justify-between">
          <span className="text-[11px] font-mono text-neutral-400">Sincronizado com Google Drive</span>
          <a
            href={VIP_DRIVE_MAIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono font-black text-black bg-white hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition"
          >
            Acessar Raiz VIP
          </a>
        </div>
      </div>
    </div>
  );
};
