import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Category, SortOption, Universe } from '../types';

interface FilterBarProps {
  selectedUniverse: Universe;
  onSelectUniverse?: (universe: Universe) => void;
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  onOpenMoreFilters: () => void;
  sortBy?: SortOption;
  onSortChange?: (sort: SortOption) => void;
  totalFiltered?: number;
  totalCount?: number;
  marvelCount?: number;
  dcCount?: number;
  dragonBallCount?: number;
  spongebobCount?: number;
  geekCount?: number;
  natalCount?: number;
}

const NATAL_FILTER_TABS: Category[] = [
  'Todos',
  'Papai Noel',
  'Árvores & Enfeites',
  'Renas & Cervos',
  'Personagens',
  'Presépio & Fé',
];

const GEEK_FILTER_TABS: Category[] = [
  'Todos',
  'Terror & Cinema',
  'Pokémon',
  'Mortal Kombat',
  'Street Fighter',
  'Power Rangers',
  'Tartarugas Ninja',
  'ThunderCats',
  'Corrida Maluca',
  'Filmes & Séries',
  'Games',
  'Knitted & Crochê',
  'Colecionáveis',
];

const BOB_ESPONJA_FILTER_TABS: Category[] = [
  'Todos',
  'Bob Esponja',
  'Com AMS',
];

const DRAGON_BALL_FILTER_TABS: Category[] = [
  'Todos',
  'Dragon Ball',
  'Com AMS',
];

const DC_FILTER_TABS: Category[] = [
  'Todos',
  'Batman & Gotham',
  'Superman & Metrópolis',
  'The Flash',
  'Liga da Justiça',
  'Invincible',
  'Com AMS',
];

const MARVEL_FILTER_TABS: Category[] = [
  'Todos',
  'Vingadores',
  'Homem-Aranha',
  'X-Men',
  'Deadpool & Wolverine',
  'Quarteto Fantástico',
  'Hulk & Vingadores',
  'Vilões',
  'Com AMS',
];

const ALL_FILTER_TABS: Category[] = [
  'Todos',
  'Bob Esponja',
  'Dragon Ball',
  'Batman & Gotham',
  'Superman & Metrópolis',
  'The Flash',
  'Homem-Aranha',
  'Vingadores',
  'X-Men',
  'Deadpool & Wolverine',
  'Quarteto Fantástico',
  'Knitted & Crochê',
  'Com AMS',
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedUniverse,
  selectedCategory,
  onSelectCategory,
  onOpenMoreFilters,
}) => {
  const activeTabs = 
    selectedUniverse === 'Especial de Natal'
      ? NATAL_FILTER_TABS
      : selectedUniverse === 'Geek & Pop Culture'
      ? GEEK_FILTER_TABS
      : selectedUniverse === 'Bob Esponja'
      ? BOB_ESPONJA_FILTER_TABS
      : selectedUniverse === 'Dragon Ball'
      ? DRAGON_BALL_FILTER_TABS
      : selectedUniverse === 'DC' 
      ? DC_FILTER_TABS 
      : selectedUniverse === 'Marvel' 
      ? MARVEL_FILTER_TABS 
      : ALL_FILTER_TABS;

  return (
    <div className="space-y-3 mb-6">
      {/* Category Pills Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
        {activeTabs.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-white text-black shadow-md border border-white font-bold'
                  : 'bg-zinc-900/90 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          );
        })}

        {/* Mais filtros button */}
        <button
          onClick={onOpenMoreFilters}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 shrink-0 transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Mais filtros</span>
        </button>
      </div>
    </div>
  );
};
