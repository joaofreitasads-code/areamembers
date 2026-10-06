import React, { useState, useMemo, useEffect, useRef, useDeferredValue } from 'react';
import { 
  Search, Bell, HardDrive, Heart, Download, Calculator, 
  ExternalLink, ChevronDown, Menu, X, ArrowUpDown, Box, Check, LogOut
} from 'lucide-react';
import { 
  SECTIONS, ALL_MODELS, VIP_DRIVE_MAIN_URL,
  ModelItem 
} from './data/modelsData';
import { ModelCard } from './components/ModelCard';
import { ModelDetailModal } from './components/ModelDetailModal';
import { NotificationsModal } from './components/NotificationsModal';
import { ProfitCalculator } from './components/ProfitCalculator';
import { DownloadsTab } from './components/DownloadsTab';
import { Sidebar, TabKey } from './components/Sidebar';
import { VideoAulaSection } from './components/VideoAulaSection';
import { LoginScreen } from './components/LoginScreen';
import { MemberUser, STORAGE_USER_KEY } from './types/auth';
import { preloadImageBatch, preloadPriorityImages, getOptimizedCardImageUrl } from './utils/imageOptimizer';

export default function App() {
  const [currentUser, setCurrentUser] = useState<MemberUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    try {
      localStorage.removeItem(STORAGE_USER_KEY);
    } catch (e) {
      console.error(e);
    }
    setCurrentUser(null);
    setIsUserMenuOpen(false);
  };

  const userInitials = useMemo(() => {
    if (!currentUser?.name) return 'VIP';
    const parts = currentUser.name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }, [currentUser]);

  const [activeTab, setActiveTab] = useState<TabKey>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [selectedSessionFilter, setSelectedSessionFilter] = useState<string>('all');
  const [onlyPhotosFilter, setOnlyPhotosFilter] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'margin' | 'printTime'>('recent');
  const [visibleCount, setVisibleCount] = useState<number>(36);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  // Close user profile dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('universo3d_favorites');
      return saved ? JSON.parse(saved) : ['poke-charizard', 'poke-gengar', 'funko-oferta-10'];
    } catch {
      return ['poke-charizard'];
    }
  });

  // Downloads history state
  const [downloads, setDownloads] = useState<ModelItem[]>(() => {
    try {
      const saved = localStorage.getItem('universo3d_downloads');
      if (saved) return JSON.parse(saved);
      const s1 = ALL_MODELS.find(m => m.id === 'poke-charizard');
      const s2 = ALL_MODELS.find(m => m.id === 'poke-blastoise');
      return [s1, s2].filter(Boolean) as ModelItem[];
    } catch {
      return [];
    }
  });

  // Modals state
  const [selectedModel, setSelectedModel] = useState<ModelItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);

  // Sync favorites
  useEffect(() => {
    try {
      localStorage.setItem('universo3d_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Sync downloads
  useEffect(() => {
    try {
      localStorage.setItem('universo3d_downloads', JSON.stringify(downloads));
    } catch (e) {
      console.error(e);
    }
  }, [downloads]);

  // Reset pagination on filter change
  useEffect(() => {
    setVisibleCount(36);
  }, [deferredSearchQuery, selectedSessionFilter, onlyPhotosFilter, sortBy]);

  // Global Ctrl + K / Cmd + K shortcut to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleRecordDownload = (model: ModelItem) => {
    setDownloads(prev => {
      const filtered = prev.filter(item => item.id !== model.id);
      return [model, ...filtered];
    });
  };

  const handleOpenModel = (model: ModelItem) => {
    setSelectedModel(model);
    setIsDetailModalOpen(true);
  };

  const handleDirectDownload = (model: ModelItem) => {
    handleRecordDownload(model);
  };

  const handleReDownload = (model: ModelItem) => {
    handleRecordDownload(model);
    window.open(model.driveUrl || VIP_DRIVE_MAIN_URL, '_blank', 'noopener,noreferrer');
  };

  // Horizontal filter pills (Black & White, based on actual collections)
  const categoryPills = [
    { id: 'all', label: 'Todos os Modelos' },
    { id: 'sec-estadios', label: 'Estádios de Futebol (11)' },
    { id: 'sec-canecas', label: 'Canecas de Time (17)' },
    { id: 'sec-mascotes', label: 'Mascotes Futebol (31)' },
    { id: 'sec-rpg', label: 'RPG & Miniaturas (467)' },
    { id: 'sec-veiculos', label: 'Veículos & Carros (178)' },
    { id: 'sec-natal', label: 'Especial Natal (41)' },
    { id: 'sec-series', label: 'Séries & TV (148)' },
    { id: 'sec-religiao', label: 'Arte Sacra (7)' },
    { id: 'sec-minifiguras', label: 'Minifiguras (99)' },
    { id: 'sec-bobesponja', label: 'Bob Esponja (500%)' },
    { id: 'sec-dc-comics', label: 'DC Comics (Lego 500%)' },
    { id: 'sec-dragonball', label: 'Dragon Ball 3D' },
    { id: 'sec-minecraft', label: 'Minecraft 3D' },
    { id: 'sec-fallout', label: 'Fallout 3D' },
    { id: 'sec-mistas', label: 'Coleções Mistas' },
    { id: 'sec-pokemon', label: 'Pokémon 3D' },
    { id: 'sec-monster', label: 'Monster Energy' },
    { id: 'sec-aeromodelos', label: 'Aeromodelos RC' },
    { id: 'sec-animais', label: 'Articulados & Miniaturas' },
    { id: 'sec-animes-vip', label: 'Animes 3D VIP' },
    { id: 'sec-brinquedos', label: 'Brinquedos & Puzzles' },
    { id: 'sec-bustos', label: 'Bustos HQ' },
    { id: 'sec-funkos', label: 'Funkos Exclusivos' },
  ];

  // Filtered & Sorted models
  const filteredModels = useMemo(() => {
    let list = ALL_MODELS;

    if (deferredSearchQuery.trim()) {
      const q = deferredSearchQuery.toLowerCase().trim();
      list = list.filter(m => 
        m.title.toLowerCase().includes(q) || 
        m.category.toLowerCase().includes(q) ||
        (m.description && m.description.toLowerCase().includes(q))
      );
    }

    if (selectedSessionFilter !== 'all') {
      list = list.filter(m => m.sectionId === selectedSessionFilter);
    }

    if (onlyPhotosFilter) {
      list = list.filter(m => Boolean(m.imageUrl || (m.images && m.images.length > 0)));
    }

    return [...list].sort((a, b) => {
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'margin') {
        return (b.suggestedPrice || 0) - (a.suggestedPrice || 0);
      }
      if (sortBy === 'printTime') {
        return (a.printTimeHours || 99) - (b.printTimeHours || 99);
      }
      // 'recent' by default prioritizes models with real photos
      const aHasPhoto = a.imageUrl ? 1 : 0;
      const bHasPhoto = b.imageUrl ? 1 : 0;
      return bHasPhoto - aHasPhoto;
    });
  }, [deferredSearchQuery, selectedSessionFilter, onlyPhotosFilter, sortBy]);

  const displayedModels = useMemo(() => {
    return filteredModels.slice(0, visibleCount);
  }, [filteredModels, visibleCount]);

  const favoriteModels = useMemo(() => {
    return ALL_MODELS.filter(m => favorites.includes(m.id));
  }, [favorites]);

  // Preload first batch of images in background for instant display
  useEffect(() => {
    if (displayedModels.length > 0) {
      const allUrls = displayedModels.map(m => {
        const raw = (m.images && m.images[0]) || m.imageUrl || m.thumbnailUrl;
        return getOptimizedCardImageUrl(raw, 0, 220);
      }).filter(Boolean);

      // Preload priority first 36 images immediately with high priority
      preloadPriorityImages(allUrls.slice(0, 36));
      // Preload next batch in background micro-chunks
      if (allUrls.length > 36) {
        preloadImageBatch(allUrls.slice(36, 108), 72);
      }
    }
  }, [displayedModels]);

  // Auto-scroll infinite load trigger with generous anticipation
  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount(prev => (prev < filteredModels.length ? prev + 36 : prev));
      }
    }, { rootMargin: '600px' });

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [filteredModels.length]);

  if (!currentUser) {
    return <LoginScreen onLogin={(user) => setCurrentUser(user)} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white antialiased flex font-sans selection:bg-white selection:text-black">
      {/* Desktop Fixed Left Sidebar (Preto e Branco) */}
      <div className="hidden lg:block h-screen sticky top-0 z-30">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          selectedCategoryFilter={selectedSessionFilter}
          onSelectCategoryFilter={setSelectedSessionFilter}
          favoritesCount={favorites.length}
          downloadsCount={downloads.length}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile Drawer Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/85 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-[85%] h-full bg-[#0C0C0C] z-10 shadow-2xl">
            <div className="absolute top-3 right-3 z-20">
              <button 
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg bg-[#1a1a1a] text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Sidebar
              activeTab={activeTab}
              onSelectTab={(tab) => {
                setActiveTab(tab);
                setIsMobileSidebarOpen(false);
              }}
              selectedCategoryFilter={selectedSessionFilter}
              onSelectCategoryFilter={(cat) => {
                setSelectedSessionFilter(cat);
                setIsMobileSidebarOpen(false);
              }}
              favoritesCount={favorites.length}
              downloadsCount={downloads.length}
              currentUser={currentUser}
              onLogout={handleLogout}
            />
          </div>
        </div>
      )}

      {/* Main Right Content Layout (Fundo Plano) */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0A0A0A]">
        {/* Top Header Bar (Preto e Branco / Xadrez) */}
        <header className="sticky top-0 z-20 bg-[#0C0C0C]/95 backdrop-blur-md border-b border-[#242424] px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Mobile Menu Trigger & Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-[#181818] text-neutral-300 hover:text-white border border-[#2b2b2b]"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="lg:hidden flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-white text-black flex items-center justify-center font-black">
                <Box className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xs font-black tracking-tight text-white uppercase">
                Biblioteca Central 3D
              </span>
            </div>
          </div>

          {/* Central Search Bar (Preto e Branco com Ctrl + K) */}
          <div className="flex-1 max-w-xl">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar modelos, coleções, categorias..."
                className="w-full bg-[#141414] hover:bg-[#1a1a1a] focus:bg-[#1c1c1c] text-white text-xs sm:text-sm pl-10 pr-20 py-2 rounded-lg border border-[#2c2c2c] focus:border-white outline-none transition placeholder:text-neutral-400 font-bold"
              />
              <div className="absolute right-2.5 hidden sm:flex items-center pointer-events-none">
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold text-neutral-400 bg-[#222222] border border-[#333333] rounded">
                  Ctrl + K
                </kbd>
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-12 text-neutral-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right User Profile & Notification Bar (Preto e Branco) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Notification Bell */}
            <button
              type="button"
              onClick={() => setIsNotificationsModalOpen(true)}
              className="relative p-2 rounded-lg bg-[#141414] hover:bg-[#202020] text-neutral-300 hover:text-white border border-[#2c2c2c] hover:border-white transition cursor-pointer"
              title="Notificações e Avisos"
              aria-label="Notificações"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
            </button>

            {/* User Profile Component (Área de Membros VIP com Menu) */}
            <div className="relative pl-1 border-l border-[#242424]" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-[#181818] transition cursor-pointer"
                title="Meu Perfil de Membro"
                aria-label="Perfil do Membro"
              >
                <div className="w-8 h-8 rounded-full bg-white text-black p-[1.5px] shadow-sm flex items-center justify-center font-black text-xs uppercase shrink-0">
                  {userInitials}
                </div>

                <div className="hidden sm:block text-left leading-tight">
                  <span className="text-xs font-extrabold text-white block max-w-[140px] truncate">
                    {currentUser?.name || 'Membro VIP'}
                  </span>
                  <span className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-wider bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.2 rounded">
                    Membro VIP
                  </span>
                </div>

                <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 hidden sm:block transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180 text-white' : ''}`} />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#121212] border border-[#2c2c2c] rounded-2xl shadow-2xl p-3 z-50 text-left animate-in fade-in duration-150">
                  <div className="p-2.5 border-b border-[#222222] space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-black text-xs uppercase shrink-0">
                        {userInitials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-white truncate">
                          {currentUser?.name}
                        </p>
                        <p className="text-[11px] text-neutral-400 truncate font-mono">
                          {currentUser?.email}
                        </p>
                      </div>
                    </div>
                    <div className="pt-1.5 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Área de Membros VIP • Acesso Total</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-neutral-300 hover:text-rose-400 hover:bg-[#1a1a1a] rounded-xl transition cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-neutral-400 group-hover:text-rose-400" />
                      <span>Sair / Trocar Usuário</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Viewport (Fundo Plano) */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* VIEW 1: CATALOG */}
          {activeTab === 'catalog' && (
            <div className="space-y-6 text-left">
              {/* VÍDEO AULA PASSO A PASSO (NO COMEÇO) */}
              <VideoAulaSection />

              {/* Page Title & Subtitle */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase font-sans">
                  Biblioteca por categorias
                </h1>
                <p className="text-neutral-400 text-xs sm:text-sm font-bold">
                  Centenas de modelos 3D oficiais para imprimir, fatiar e lucrar no mercado 3D.
                </p>
              </div>

              {/* Horizontal Category Filter Pills (Preto e Branco / Xadrez) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
                {categoryPills.map((pill) => {
                  const isSelected = selectedSessionFilter === pill.id;
                  return (
                    <button
                      key={pill.id}
                      type="button"
                      onClick={() => setSelectedSessionFilter(pill.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-black shrink-0 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white text-black shadow-md'
                          : 'bg-[#151515] hover:bg-[#202020] text-neutral-300 hover:text-white border border-[#282828]'
                      }`}
                    >
                      {pill.label}
                    </button>
                  );
                })}
              </div>

              {/* Sort Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-[#242424]">
                <div>
                  {selectedSessionFilter !== 'all' && (
                    <button
                      onClick={() => setSelectedSessionFilter('all')}
                      className="text-white hover:underline text-xs font-bold cursor-pointer"
                    >
                      (Ver todos)
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3 sm:ml-auto">
                  <div className="flex items-center gap-2 bg-[#151515] border border-[#282828] rounded-lg px-3 py-1.5 text-xs">
                    <ArrowUpDown className="w-3.5 h-3.5 text-white" />
                    <span className="text-neutral-400 font-bold hidden sm:inline">Ordenar:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-transparent text-white outline-none cursor-pointer font-bold text-xs"
                    >
                      <option value="recent" className="bg-[#151515] text-white">Com Foto Primeiro</option>
                      <option value="name" className="bg-[#151515] text-white">Nome (A-Z)</option>
                      <option value="margin" className="bg-[#151515] text-white">Maior Preço (R$)</option>
                      <option value="printTime" className="bg-[#151515] text-white">Menor Tempo</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Observação no Topo: Aviso para Clicar em Ver Mais Modelos */}
              <div className="bg-[#121212] border border-[#262626] hover:border-neutral-500 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3.5 transition-all shadow-md">
                <div className="flex items-center gap-3 text-left w-full sm:w-auto">
                  <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-black text-black bg-white px-2 py-0.5 rounded uppercase tracking-wider">
                        OBSERVAÇÃO
                      </span>
                      <span className="text-xs sm:text-sm font-black text-white uppercase tracking-tight">
                        Clique em "Ver Mais Modelos" ou role para ver tudo
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-neutral-400 font-bold mt-0.5">
                      Exibindo <strong className="text-white">{displayedModels.length}</strong> de <strong className="text-white">{filteredModels.length}</strong> modelos. Para carregar mais modelos na tela, clique no botão ao lado ou role a página até o fim.
                    </p>
                  </div>
                </div>

                {visibleCount < filteredModels.length ? (
                  <button
                    type="button"
                    onClick={() => setVisibleCount(prev => Math.min(filteredModels.length, prev + 36))}
                    className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-neutral-200 text-black text-xs font-mono font-black uppercase tracking-wider rounded-lg transition-all shadow-md shrink-0 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>Ver Mais Modelos ({filteredModels.length - visibleCount} restantes)</span>
                  </button>
                ) : (
                  <div className="px-3.5 py-1.5 bg-[#181818] border border-[#2e2e2e] rounded-lg text-[11px] font-mono font-bold text-neutral-300 shrink-0 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Todos os {filteredModels.length} modelos carregados</span>
                  </div>
                )}
              </div>

              {/* Card Grid (Estilo Xadrez Preto e Branco - 6 Colunas) */}
              {filteredModels.length === 0 ? (
                <div className="p-16 text-center border border-[#282828] rounded-xl bg-[#141414] space-y-4">
                  <p className="text-neutral-300 text-sm font-bold">Nenhum modelo encontrado para os filtros atuais.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedSessionFilter('all');
                      setOnlyPhotosFilter(false);
                    }}
                    className="px-4 py-2 bg-white hover:bg-neutral-200 text-black text-xs font-mono font-black uppercase rounded-lg transition"
                  >
                    Limpar Todos os Filtros
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
                    {displayedModels.map((model, index) => (
                      <ModelCard
                        key={model.id}
                        model={model}
                        priority={index < 36}
                        isFavorite={favorites.includes(model.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onOpenDetails={handleOpenModel}
                        onDirectDownload={handleDirectDownload}
                      />
                    ))}
                  </div>

                  {/* Intersection Sentinel for smooth auto-pagination */}
                  {visibleCount < filteredModels.length && (
                    <div ref={loadMoreRef} className="h-6 w-full pointer-events-none" />
                  )}

                  {/* Load More Button */}
                  {visibleCount < filteredModels.length && (
                    <div className="text-center pt-2">
                      <button
                        onClick={() => setVisibleCount(prev => prev + 36)}
                        className="px-8 py-3 bg-[#151515] hover:bg-[#202020] text-white border border-[#2c2c2c] hover:border-white text-xs font-mono font-black uppercase tracking-wider rounded-lg transition-all shadow-md cursor-pointer"
                      >
                        Carregar Mais Modelos ({filteredModels.length - visibleCount} restantes)
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* VIEW 2: FAVORITES */}
          {activeTab === 'favorites' && (
            <div className="space-y-6 text-left">
              <div className="border-b border-[#242424] pb-6 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block font-black">
                    MODELOS SALVOS
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                    MEUS FAVORITOS ({favoriteModels.length})
                  </h1>
                  <p className="text-neutral-400 text-xs sm:text-sm font-bold">
                    Modelos que você marcou para impressão posterior ou consulta rápida.
                  </p>
                </div>

                {favoriteModels.length > 0 && (
                  <button
                    onClick={() => setFavorites([])}
                    className="px-3.5 py-1.5 bg-[#151515] hover:bg-[#222222] text-neutral-300 hover:text-white border border-[#2c2c2c] text-xs font-mono font-bold uppercase rounded-lg transition-all cursor-pointer"
                  >
                    Limpar Favoritos
                  </button>
                )}
              </div>

              {favoriteModels.length === 0 ? (
                <div className="p-16 text-center border border-[#242424] rounded-xl bg-[#141414] space-y-4">
                  <Heart className="w-10 h-10 text-neutral-600 mx-auto" />
                  <p className="text-neutral-300 text-sm font-bold">Nenhum modelo foi salvo como favorito ainda.</p>
                  <button
                    onClick={() => setActiveTab('catalog')}
                    className="px-5 py-2.5 bg-white hover:bg-neutral-200 text-black text-xs font-mono font-black uppercase rounded-lg transition cursor-pointer"
                  >
                    Explorar Catálogo
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
                  {favoriteModels.map((model) => (
                    <ModelCard
                      key={model.id}
                      model={model}
                      isFavorite={true}
                      onToggleFavorite={handleToggleFavorite}
                      onOpenDetails={handleOpenModel}
                      onDirectDownload={handleDirectDownload}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* VIEW 3: DOWNLOADS */}
          {activeTab === 'downloads' && (
            <DownloadsTab
              downloadedModels={downloads}
              onClearDownloads={() => setDownloads([])}
              onOpenModel={handleOpenModel}
              onReDownload={handleReDownload}
              onBrowseCatalog={() => setActiveTab('catalog')}
            />
          )}

          {/* VIEW 4: CALCULATOR */}
          {activeTab === 'calculator' && (
            <ProfitCalculator
              onSelectProduct={(title) => {
                setSearchQuery(title);
                setActiveTab('catalog');
              }}
            />
          )}
        </main>
      </div>

      {/* Model Detail Modal */}
      <ModelDetailModal
        model={selectedModel}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        isFavorite={selectedModel ? favorites.includes(selectedModel.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onRecordDownload={handleRecordDownload}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
      />
    </div>
  );
}
