export type Category = 
  | 'Todos'
  | 'Terror & Cinema'
  | 'Pokémon'
  | 'Papai Noel'
  | 'Árvores & Enfeites'
  | 'Renas & Cervos'
  | 'Personagens'
  | 'Presépio & Fé'
  | 'Mortal Kombat'
  | 'Street Fighter'
  | 'Power Rangers'
  | 'Tartarugas Ninja'
  | 'ThunderCats'
  | 'Corrida Maluca'
  | 'Filmes & Séries'
  | 'Games'
  | 'Bob Esponja'
  | 'Dragon Ball'
  | 'Com AMS'
  | 'Batman & Gotham'
  | 'Superman & Metrópolis'
  | 'The Flash'
  | 'Liga da Justiça'
  | 'Invincible'
  | 'Vingadores'
  | 'X-Men'
  | 'Homem-Aranha'
  | 'Deadpool & Wolverine'
  | 'Quarteto Fantástico'
  | 'Hulk & Vingadores'
  | 'Vilões'
  | 'Knitted & Crochê'
  | 'Colecionáveis';

export type Universe = 'Todos' | 'Especial de Natal' | 'Geek & Pop Culture' | 'Bob Esponja' | 'Dragon Ball' | 'DC' | 'Marvel';

export interface ModelItem {
  id: string;
  universe?: 'Marvel' | 'DC' | 'Dragon Ball' | 'Bob Esponja' | 'Geek & Pop Culture' | 'Especial de Natal';
  title: string;
  category: Category;
  charKey?: string;
  imageUrl?: string;
  badge?: string;
  format: string;
  fileSize: string;
  downloadsCount: number;
  driveId?: string;
  driveLink: string;
  isFavorite?: boolean;
  dateAdded: string;
  files: {
    name: string;
    size: string;
    type: 'stl' | 'pdf' | 'folder' | 'img';
  }[];
  printSettings: {
    layerHeight: string;
    infill: string;
    supports: string;
    material: string;
  };
}

export type SortOption = 'recentes' | 'populares' | 'az' | 'tamanho';
