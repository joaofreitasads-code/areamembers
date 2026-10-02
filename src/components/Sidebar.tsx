import React from 'react';
import { 
  Home, Zap, Coffee, Plane, Shield, Flame, 
  Puzzle, Trophy, Smile, Heart, Download, 
  Folder, Calculator, Box, Lock, Key
} from 'lucide-react';
import { VIP_DRIVE_MAIN_URL, SECTIONS } from '../data/modelsData';

const CHECKOUT_VIP_URL = 'https://checkout.wiven.com.br/checkout/cmupyvej300i601pll6oi9cj1?offer=BX0N8TV';

export type TabKey = 'catalog' | 'favorites' | 'downloads' | 'calculator';

interface SidebarProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  selectedCategoryFilter: string;
  onSelectCategoryFilter: (catId: string) => void;
  favoritesCount: number;
  downloadsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  selectedCategoryFilter,
  onSelectCategoryFilter,
  favoritesCount,
  downloadsCount
}) => {
  // Navigation categories automatically synchronized with SECTIONS from modelsData
  const getSectionIcon = (iconType: string) => {
    switch (iconType) {
      case 'sparkles': return Flame;
      case 'zap': return Zap;
      case 'shield': return Shield;
      case 'gamepad': return Puzzle;
      case 'sword':
      case 'trophy': return Trophy;
      case 'key': return Key;
      default: return Folder;
    }
  };

  const navCategories = SECTIONS.map(sec => ({
    id: sec.id,
    label: sec.shortTitle,
    icon: getSectionIcon(sec.iconType),
    count: sec.count
  }));

  const handleSelectHome = () => {
    onSelectTab('catalog');
    onSelectCategoryFilter('all');
  };

  const handleSelectCategory = (catId: string) => {
    onSelectTab('catalog');
    onSelectCategoryFilter(catId);
  };

  return (
    <aside className="w-64 shrink-0 bg-[#0C0C0C] border-r border-[#242424] flex flex-col h-full select-none text-left">
      {/* Brand / Logo Header (Preto e Branco / Xadrez) */}
      <div className="p-4 border-b border-[#242424] flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-white text-black flex items-center justify-center shrink-0 shadow-md">
          <Box className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div>
          <h2 className="text-sm font-black text-white tracking-tight leading-tight">
            Biblioteca Central 3D
          </h2>
          <span className="text-[9px] font-mono font-black text-white/90 tracking-wider uppercase block">
            O MAIOR ACERVO STL
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-none">
        {/* Início (Home) */}
        <button
          type="button"
          onClick={handleSelectHome}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-black transition-all text-left cursor-pointer ${
            activeTab === 'catalog' && selectedCategoryFilter === 'all'
              ? 'bg-white text-black shadow-md'
              : 'text-neutral-400 hover:text-white hover:bg-[#181818]'
          }`}
        >
          <Home className={`w-4 h-4 ${activeTab === 'catalog' && selectedCategoryFilter === 'all' ? 'text-black stroke-[2.5]' : 'text-neutral-400'}`} />
          <span>Início / Catálogo Geral</span>
        </button>

        {/* Categories Section Header */}
        <div className="pt-3 pb-1 px-3">
          <span className="text-[10px] font-mono font-black uppercase tracking-wider text-neutral-400">
            Coleções Oficiais
          </span>
        </div>

        {/* Real Categories from modelsData */}
        {navCategories.map((item) => {
          const Icon = item.icon;
          const isSelected = activeTab === 'catalog' && selectedCategoryFilter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectCategory(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all text-left cursor-pointer ${
                isSelected
                  ? 'bg-white text-black font-black shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-[#181818]'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-black stroke-[2.5]' : 'text-neutral-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                isSelected ? 'bg-black/10 text-black' : 'bg-[#181818] text-neutral-400 border border-[#2a2a2a]'
              }`}>
                {item.count}
              </span>
            </button>
          );
        })}

        {/* Divider */}
        <div className="pt-4 pb-2 border-t border-[#242424] my-2" />

        {/* User Library Shortcuts */}
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onSelectTab('favorites')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all text-left cursor-pointer ${
              activeTab === 'favorites'
                ? 'bg-white text-black font-black shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-[#181818]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Heart className={`w-4 h-4 ${activeTab === 'favorites' ? 'text-black fill-black' : 'text-neutral-400'}`} />
              <span>Meus Favoritos</span>
            </div>
            {favoritesCount > 0 && (
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-black ${
                activeTab === 'favorites' ? 'bg-black text-white' : 'bg-white text-black'
              }`}>
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('downloads')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all text-left cursor-pointer ${
              activeTab === 'downloads'
                ? 'bg-white text-black font-black shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-[#181818]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Download className={`w-4 h-4 ${activeTab === 'downloads' ? 'text-black stroke-[2.5]' : 'text-neutral-400'}`} />
              <span>Meus Downloads</span>
            </div>
            {downloadsCount > 0 && (
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-black ${
                activeTab === 'downloads' ? 'bg-black text-white' : 'bg-white text-black'
              }`}>
                {downloadsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('calculator')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all text-left cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-white text-black font-black shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-[#181818]'
            }`}
          >
            <Calculator className={`w-4 h-4 ${activeTab === 'calculator' ? 'text-black stroke-[2.5]' : 'text-neutral-400'}`} />
            <span>Calculadora 3D</span>
          </button>

          {/* Planos e Bônus (Direct Drive / Checkout) */}
          <a
            href={CHECKOUT_VIP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-neutral-400 hover:text-white hover:bg-[#181818] transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-white" />
              <span>Planos e Bônus</span>
            </div>
            <span className="text-[9px] font-mono text-white font-black px-1.5 py-0.5 rounded bg-[#202020] border border-white/20">
              VIP
            </span>
          </a>
        </div>
      </div>

      {/* Footer Info in Sidebar (Área de Membros) */}
      <div className="p-3 border-t border-[#242424] bg-[#080808] text-[11px] font-mono text-center">
        <a 
          href={CHECKOUT_VIP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 mb-0.5 text-white hover:text-amber-400 transition"
        >
          <Lock className="w-3 h-3 text-neutral-400" />
          <p className="font-black text-white hover:text-amber-400">Área de Membros VIP</p>
        </a>
        <p className="text-[10px] text-neutral-400 font-bold">Acesso aos Arquivos STL</p>
      </div>
    </aside>
  );
};
