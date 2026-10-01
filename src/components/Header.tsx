import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, CheckCircle2, User, Sparkles, Download, Heart, LogOut, Menu, X } from 'lucide-react';
import { NOTIFICATIONS } from '../data/mockData';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenSearchModal: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenDownloads: () => void;
  onOpenBonus: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenSearchModal,
  favoritesCount,
  onOpenFavorites,
  onOpenDownloads,
  onOpenBonus,
  mobileMenuOpen,
  onToggleMobileMenu,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#09090b]/95 backdrop-blur-md border-b border-[#27272a] px-4 lg:px-6 py-3 transition-colors">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-3 lg:gap-6">
        
        {/* Zone 1: Brand & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleMobileMenu}
            aria-label="Abrir Menu"
            className="lg:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors border border-zinc-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-3">
            {/* Chess / Geometric 3D Cube Icon */}
            <div className="relative w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center overflow-hidden shadow-inner shrink-0 group">
              <div className="absolute inset-0 chess-pattern-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>
              {/* Geometric 3D Cube SVG */}
              <svg className="w-6 h-6 text-white relative z-10 drop-shadow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5 leading-tight">
                Universo 3D
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase mt-0.5 whitespace-nowrap">
                O MAIOR ACERVO DE ARQUIVOS STL LUCRATIVOS
              </span>
            </div>
          </div>
        </div>

        {/* Zone 2: Search Input & Shortcut */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="relative flex items-center w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar modelos, coleções, categorias..."
              className="w-full bg-zinc-900/90 text-sm text-zinc-100 placeholder:text-zinc-500 rounded-xl pl-10 pr-24 py-2.5 border border-zinc-800 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400 transition-all shadow-inner"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                onClick={onOpenSearchModal}
                title="Abrir busca rápida (Ctrl + K)"
                className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[11px] font-mono font-medium text-zinc-400 bg-zinc-800/80 hover:bg-zinc-700/80 hover:text-zinc-200 border border-zinc-700/60 rounded-md transition-colors"
              >
                <span>Ctrl + K</span>
              </button>
            </div>
          </div>
        </div>

        {/* Zone 3: Actions (Notifications & User Profile) */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          {/* Mobile search trigger */}
          <button
            onClick={onOpenSearchModal}
            className="md:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors border border-zinc-800"
            aria-label="Buscar"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notificações"
              className="relative p-2.5 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl border border-zinc-800/90 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white ring-2 ring-[#09090b]" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">Notificações</span>
                    {unreadCount > 0 && (
                      <span className="text-[11px] font-mono px-2 py-0.5 bg-white text-black font-semibold rounded-full">
                        {unreadCount} novas
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
                    >
                      Marcar lidas
                    </button>
                  )}
                </div>

                <div className="mt-3 divide-y divide-zinc-900 max-h-72 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`py-3 px-2 rounded-lg transition-colors ${
                        notif.unread ? 'bg-zinc-900/60' : 'hover:bg-zinc-900/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-zinc-100">{notif.title}</h4>
                        <span className="text-[10px] text-zinc-500 whitespace-nowrap">{notif.time}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">{notif.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 p-1.5 pr-2.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs shadow">
                JF
              </div>
              <div className="flex flex-col text-left leading-tight hidden sm:block">
                <span className="text-xs font-semibold text-white capitalize">joão freitas</span>
                <span className="text-[10px] font-medium text-zinc-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
                  Membro VIP
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-3 border-b border-zinc-800/80 mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
                      JF
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">joão freitas</p>
                      <p className="text-[11px] text-zinc-400 truncate">joaoluizfreitas05@gmail.com</p>
                    </div>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between p-2 bg-zinc-900 border border-zinc-800 rounded-lg">
                    <span className="text-[11px] font-medium text-zinc-300">Plano Ativo</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-white text-black rounded">
                      ACESSO VITALÍCIO
                    </span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onOpenFavorites();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-zinc-400" />
                      Meus Favoritos
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 bg-zinc-800 rounded-full text-zinc-300">
                      {favoritesCount}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onOpenDownloads();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4 text-zinc-400" />
                    Meus Downloads
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onOpenBonus();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-zinc-400" />
                    Planos e Bônus
                  </button>

                  <div className="pt-1 border-t border-zinc-900 mt-1">
                    <button
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-400 hover:text-red-400 hover:bg-red-950/20 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Encerrar Sessão
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
