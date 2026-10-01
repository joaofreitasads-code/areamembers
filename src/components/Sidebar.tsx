import React from 'react';
import { 
  Home, 
  Heart, 
  Download, 
  Sparkles, 
  Layers, 
  Flame, 
  Gamepad2, 
  Sparkle, 
  Palette, 
  Ghost, 
  Tv, 
  Dog, 
  Baby, 
  BookOpen, 
  Compass,
  X,
  Shield,
  Sword,
  Box,
  Zap,
  Smile,
  Gift,
  TreePine
} from 'lucide-react';
import { Category } from '../types';
import { CATEGORIES } from '../data/mockData';

interface SidebarProps {
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenDownloads: () => void;
  onOpenBonus: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

// Icon mapping for categories to give domain authenticity
const getCategoryIcon = (cat: Category) => {
  switch (cat) {
    case 'Todos':
      return <Compass className="w-4 h-4" />;
    case 'Terror & Cinema':
      return <Ghost className="w-4 h-4 text-purple-400" />;
    case 'Pokémon':
      return <Zap className="w-4 h-4 text-yellow-400" />;
    case 'Papai Noel':
      return <Gift className="w-4 h-4 text-red-500" />;
    case 'Árvores & Enfeites':
      return <TreePine className="w-4 h-4 text-emerald-400" />;
    case 'Renas & Cervos':
      return <Sparkles className="w-4 h-4 text-amber-300" />;
    case 'Personagens':
      return <Smile className="w-4 h-4 text-pink-400" />;
    case 'Presépio & Fé':
      return <Heart className="w-4 h-4 text-yellow-300" />;
    case 'Mortal Kombat':
      return <Sword className="w-4 h-4 text-red-500" />;
    case 'Street Fighter':
      return <Flame className="w-4 h-4 text-red-500" />;
    case 'Power Rangers':
      return <Zap className="w-4 h-4 text-amber-400" />;
    case 'Tartarugas Ninja':
      return <Shield className="w-4 h-4 text-emerald-400" />;
    case 'ThunderCats':
      return <Sword className="w-4 h-4 text-orange-400" />;
    case 'Corrida Maluca':
      return <Gamepad2 className="w-4 h-4 text-purple-400" />;
    case 'Filmes & Séries':
      return <Tv className="w-4 h-4 text-cyan-400" />;
    case 'Games':
      return <Gamepad2 className="w-4 h-4 text-indigo-400" />;
    case 'Bob Esponja':
      return <Smile className="w-4 h-4 text-yellow-400" />;
    case 'Dragon Ball':
      return <Flame className="w-4 h-4 text-orange-400" />;
    case 'Com AMS':
      return <Sparkles className="w-4 h-4" />;
    case 'Batman & Gotham':
      return <Shield className="w-4 h-4" />;
    case 'Superman & Metrópolis':
      return <Zap className="w-4 h-4" />;
    case 'The Flash':
      return <Flame className="w-4 h-4" />;
    case 'Liga da Justiça':
      return <Shield className="w-4 h-4" />;
    case 'Invincible':
      return <Sword className="w-4 h-4" />;
    case 'Vingadores':
      return <Shield className="w-4 h-4" />;
    case 'X-Men':
      return <Flame className="w-4 h-4" />;
    case 'Homem-Aranha':
      return <Sparkle className="w-4 h-4" />;
    case 'Deadpool & Wolverine':
      return <Sword className="w-4 h-4" />;
    case 'Quarteto Fantástico':
      return <Box className="w-4 h-4" />;
    case 'Hulk & Vingadores':
      return <Zap className="w-4 h-4" />;
    case 'Vilões':
      return <Ghost className="w-4 h-4" />;
    case 'Colecionáveis':
      return <Flame className="w-4 h-4" />;
    default:
      return <Layers className="w-4 h-4" />;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  favoritesCount,
  onOpenFavorites,
  onOpenDownloads,
  onOpenBonus,
  isMobileOpen,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile} 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 lg:top-[65px] left-0 h-screen lg:h-[calc(100vh-65px)] w-64 bg-[#09090b] border-r border-[#27272a] z-50 lg:z-30 flex flex-col justify-between py-4 px-3 overflow-y-auto transition-transform duration-200 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Mobile Header Close */}
          <div className="flex lg:hidden items-center justify-between pb-3 border-b border-zinc-800">
            <span className="text-sm font-bold text-white tracking-wide uppercase">Menu de Navegação</span>
            <button 
              onClick={onCloseMobile}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Home Section */}
          <div className="space-y-1">
            <button
              onClick={() => {
                onSelectCategory('Todos');
                onCloseMobile?.();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                selectedCategory === 'Todos'
                  ? 'bg-white text-black shadow-md font-bold'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-900/90'
              }`}
            >
              <Home className={`w-4 h-4 ${selectedCategory === 'Todos' ? 'text-black' : 'text-zinc-400'}`} />
              <span>Início</span>
            </button>
          </div>

          {/* Categories Section */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Categorias
            </div>
            <div className="space-y-0.5">
              {CATEGORIES.filter(c => c !== 'Todos').map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      onSelectCategory(cat);
                      onCloseMobile?.();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                      isSelected
                        ? 'bg-zinc-100 text-black font-bold shadow'
                        : 'text-zinc-300 hover:text-white hover:bg-zinc-900/80 font-medium'
                    }`}
                  >
                    <span className="flex items-center gap-3 truncate">
                      <span className={isSelected ? 'text-black' : 'text-zinc-400'}>
                        {getCategoryIcon(cat)}
                      </span>
                      <span className="truncate">{cat}</span>
                    </span>
                    {cat === 'Com AMS' && (
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                        isSelected ? 'bg-black text-white' : 'bg-white text-black'
                      }`}>
                        AMS
                      </span>
                    )}
                    {cat === 'Vingadores' && (
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-black text-white' : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        14
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Thin Divider */}
          <div className="h-px bg-zinc-800/80 mx-1" />

          {/* User Section */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Painel do Usuário
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onOpenFavorites();
                  onCloseMobile?.();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-zinc-400" />
                  <span>Meus Favoritos</span>
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700/60 font-semibold">
                  {favoritesCount}
                </span>
              </button>

              <button
                onClick={() => {
                  onOpenDownloads();
                  onCloseMobile?.();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
              >
                <Download className="w-4 h-4 text-zinc-400" />
                <span>Meus Downloads</span>
              </button>

              <button
                onClick={() => {
                  onOpenBonus();
                  onCloseMobile?.();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-zinc-400" />
                <span>Planos e Bônus</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer / Chess Badge in Sidebar */}
        <div className="pt-4 border-t border-zinc-800/80">
          <div className="p-3 bg-zinc-900/90 border border-zinc-800 rounded-xl relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-16 h-16 chess-pattern-sm opacity-20 rounded-full" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <p className="text-[11px] font-bold text-white uppercase tracking-wider">Acervo 100% Liberado</p>
            </div>
            <p className="text-[10px] text-zinc-400 mt-1">Downloads ilimitados de arquivos STL em alta resolução.</p>
          </div>
        </div>

      </aside>
    </>
  );
};
