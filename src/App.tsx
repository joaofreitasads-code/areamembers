import React, { useState, useEffect, useMemo } from 'react';
import { Category, ModelItem, SortOption, Universe } from './types';
import { INITIAL_MODELS } from './data/mockData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HeroBanner } from './components/HeroBanner';
import { FilterBar } from './components/FilterBar';
import { CardGrid } from './components/CardGrid';
import { FolderModal } from './components/FolderModal';
import { SearchModal } from './components/SearchModal';
import { FilterModal } from './components/FilterModal';
import { DownloadsModal, BonusModal } from './components/UserDrawers';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  const [models, setModels] = useState<ModelItem[]>(INITIAL_MODELS);
  const [selectedUniverse, setSelectedUniverse] = useState<Universe>('Todos');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('recentes');

  // Advanced filters
  const [formatFilter, setFormatFilter] = useState('todos');
  const [badgeFilter, setBadgeFilter] = useState('todos');

  // Modals & Panels
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelItem | null>(null);
  const [isDownloadsModalOpen, setIsDownloadsModalOpen] = useState(false);
  const [isBonusModalOpen, setIsBonusModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // History & Toasts
  const [downloadsHistory, setDownloadsHistory] = useState<ModelItem[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Add toast helper
  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Keyboard shortcut for Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Universe counts
  const marvelCount = useMemo(() => models.filter((m) => m.universe === 'Marvel').length, [models]);
  const dcCount = useMemo(() => models.filter((m) => m.universe === 'DC').length, [models]);
  const dragonBallCount = useMemo(() => models.filter((m) => m.universe === 'Dragon Ball').length, [models]);
  const spongebobCount = useMemo(() => models.filter((m) => m.universe === 'Bob Esponja').length, [models]);
  const geekCount = useMemo(() => models.filter((m) => m.universe === 'Geek & Pop Culture').length, [models]);
  const natalCount = useMemo(() => models.filter((m) => m.universe === 'Especial de Natal').length, [models]);

  // Filter & Sort models
  const filteredModels = useMemo(() => {
    return models
      .filter((model) => {
        // Universe filter
        if (selectedUniverse !== 'Todos' && model.universe !== selectedUniverse) {
          return false;
        }

        // Category filter
        if (selectedCategory !== 'Todos' && model.category !== selectedCategory) {
          return false;
        }

        // Search text
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = model.title.toLowerCase().includes(q);
          const matchCategory = model.category.toLowerCase().includes(q);
          const matchFormat = model.format.toLowerCase().includes(q);
          if (!matchTitle && !matchCategory && !matchFormat) return false;
        }

        // Format filter
        if (formatFilter !== 'todos' && model.format !== formatFilter) {
          return false;
        }

        // Badge filter
        if (badgeFilter !== 'todos' && model.badge !== badgeFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'recentes') {
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        }
        if (sortBy === 'populares') {
          return b.downloadsCount - a.downloadsCount;
        }
        if (sortBy === 'az') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'tamanho') {
          return parseFloat(b.fileSize) - parseFloat(a.fileSize);
        }
        return 0;
      });
  }, [models, selectedCategory, searchQuery, sortBy, formatFilter, badgeFilter]);

  // Favorites count
  const favoritesCount = useMemo(() => {
    return models.filter((m) => m.isFavorite).length;
  }, [models]);

  // Handlers
  const handleToggleFavorite = (id: string) => {
    setModels((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.isFavorite;
          addToast({
            title: nextState ? 'Adicionado aos Favoritos' : 'Removido dos Favoritos',
            description: item.title,
            type: 'favorite',
          });
          return { ...item, isFavorite: nextState };
        }
        return item;
      })
    );
  };

  const handleOpenFolder = (model: ModelItem) => {
    setSelectedModel(model);
    setIsFolderModalOpen(true);
  };

  const handleQuickDownload = (model: ModelItem) => {
    // Add to downloads history
    setDownloadsHistory((prev) => {
      if (prev.find((item) => item.id === model.id)) return prev;
      return [model, ...prev];
    });

    addToast({
      title: 'Download do Drive Iniciado',
      description: `${model.title} (${model.fileSize})`,
      type: 'download',
    });
  };

  const handleDownloadAllFromModal = (model: ModelItem) => {
    setDownloadsHistory((prev) => {
      if (prev.find((item) => item.id === model.id)) return prev;
      return [model, ...prev];
    });

    addToast({
      title: 'Pacote ZIP Baixado',
      description: `Arquivos STL prontos para fatiamento`,
      type: 'download',
    });
  };

  const handleCopyLink = (link: string, title: string) => {
    navigator.clipboard?.writeText(link).catch(() => {});
    addToast({
      title: 'Link Copiado!',
      description: `Link do Google Drive copiado para transferência`,
      type: 'copy',
    });
  };

  const handleOpenFavoritesOnly = () => {
    setSelectedCategory('Todos');
    setSearchQuery('');
    // filter to favorites
    addToast({
      title: 'Exibindo Seus Favoritos',
      description: `${favoritesCount} modelos salvos na sua biblioteca`,
      type: 'favorite',
    });
  };

  const handleResetFilters = () => {
    setSelectedCategory('Todos');
    setSearchQuery('');
    setFormatFilter('todos');
    setBadgeFilter('todos');
    setSortBy('recentes');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col font-sans selection:bg-white selection:text-black">
      
      {/* Top Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenSearchModal={() => setIsSearchModalOpen(true)}
        favoritesCount={favoritesCount}
        onOpenFavorites={handleOpenFavoritesOnly}
        onOpenDownloads={() => setIsDownloadsModalOpen(true)}
        onOpenBonus={() => setIsBonusModalOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Main Layout Container (Sidebar + Content) */}
      <div className="flex-1 flex max-w-[1920px] w-full mx-auto">
        
        {/* Navigation Sidebar */}
        <Sidebar
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setMobileMenuOpen(false);
          }}
          favoritesCount={favoritesCount}
          onOpenFavorites={handleOpenFavoritesOnly}
          onOpenDownloads={() => {
            setIsDownloadsModalOpen(true);
            setMobileMenuOpen(false);
          }}
          onOpenBonus={() => {
            setIsBonusModalOpen(true);
            setMobileMenuOpen(false);
          }}
          isMobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6">
          
          {/* Banner / Hero Section */}
          <HeroBanner
            totalFilesCount="Mais de 150 mil arquivos"
            onExploreBonus={() => setIsBonusModalOpen(true)}
          />

          {/* Filter Bar with Universe Switcher, Pills and Sort */}
          <FilterBar
            selectedUniverse={selectedUniverse}
            onSelectUniverse={setSelectedUniverse}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onOpenMoreFilters={() => setIsFilterModalOpen(true)}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalFiltered={filteredModels.length}
            totalCount={models.length}
            marvelCount={marvelCount}
            dcCount={dcCount}
            dragonBallCount={dragonBallCount}
            spongebobCount={spongebobCount}
            geekCount={geekCount}
            natalCount={natalCount}
          />

          {/* 6-Column Product Card Grid */}
          <CardGrid
            models={filteredModels}
            onToggleFavorite={handleToggleFavorite}
            onOpenFolder={handleOpenFolder}
            onQuickDownload={handleQuickDownload}
            onCopyLink={handleCopyLink}
            onClearFilters={handleResetFilters}
          />

        </main>
      </div>

      {/* Interactive Modals */}
      <FolderModal
        model={selectedModel}
        onClose={() => {
          setIsFolderModalOpen(false);
          setSelectedModel(null);
        }}
        onDownloadAll={handleDownloadAllFromModal}
        onCopyLink={handleCopyLink}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        models={models}
        onSelectModel={handleOpenFolder}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        formatFilter={formatFilter}
        setFormatFilter={setFormatFilter}
        badgeFilter={badgeFilter}
        setBadgeFilter={setBadgeFilter}
        onReset={handleResetFilters}
      />

      <DownloadsModal
        isOpen={isDownloadsModalOpen}
        onClose={() => setIsDownloadsModalOpen(false)}
        downloadsList={downloadsHistory}
        onOpenFolder={handleOpenFolder}
      />

      <BonusModal
        isOpen={isBonusModalOpen}
        onClose={() => setIsBonusModalOpen(false)}
      />

      {/* Minimalist Monochrome Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

    </div>
  );
}
