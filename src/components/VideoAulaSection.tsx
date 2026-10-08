import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, ChevronDown, ChevronUp, ExternalLink, Laptop, Volume2, Play, 
  Download, FolderOpen, Eye, Key, Sparkles, ArrowRight, Lock, Zap, ShieldCheck, Crown
} from 'lucide-react';
import { ALL_MODELS, SECTIONS, ModelItem, VIP_DRIVE_MAIN_URL, VIP_CHECKOUT_MODEL } from '../data/modelsData';
import { getOptimizedCardImageUrl } from '../utils/imageOptimizer';

interface VideoAulaSectionProps {
  videoId?: string;
  videoUrl?: string;
  onOpenModel?: (model: ModelItem) => void;
  onDirectDownload?: (model: ModelItem) => void;
  onSelectCategoryFilter?: (sectionId: string) => void;
}

const DEFAULT_YOUTUBE_ID = 'ZL36Zx2pr2M';
const DEFAULT_WATCH_URL = 'https://youtu.be/ZL36Zx2pr2M';
const CHECKOUT_VIP_URL = 'https://checkout.wiven.com.br/checkout/cmupyvej300i601pll6oi9cj1?offer=BX0N8TV';

export const VideoAulaSection: React.FC<VideoAulaSectionProps> = ({
  videoId = DEFAULT_YOUTUBE_ID,
  videoUrl = DEFAULT_WATCH_URL,
  onOpenModel,
  onDirectDownload,
  onSelectCategoryFilter
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  // Default to the exact card/session selected by the user: 'vip' (QUER ACELERAR SEUS RESULTADOS?)
  const [activeSideTab, setActiveSideTab] = useState<'vip' | 'sec-chaveiros' | 'steps'>('vip');

  const localThumbnailUrl = '/youtube_video_aula_thumb.webp';
  const remoteThumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const fallbackThumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const [thumbSrc, setThumbSrc] = useState(localThumbnailUrl);

  const handleThumbError = () => {
    if (thumbSrc === localThumbnailUrl) {
      setThumbSrc(remoteThumbnailUrl);
    } else if (thumbSrc === remoteThumbnailUrl) {
      setThumbSrc(fallbackThumbnailUrl);
    }
  };

  const handleStartWithSound = () => {
    setIsPlaying(true);
  };

  // Pre-filter models for the side session (Chaveiros & Keychains)
  const chaveirosModels = useMemo(() => {
    return ALL_MODELS.filter(m => m.sectionId === 'sec-chaveiros' && m.id !== 'produto-vip-vitalicio-cadeado');
  }, []);

  const chaveirosSectionData = useMemo(() => {
    return SECTIONS.find(s => s.id === 'sec-chaveiros');
  }, []);

  const handleOpenVipCheckout = () => {
    window.open(CHECKOUT_VIP_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="bg-[#101010] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl transition-all font-sans">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 border-b border-[#202020] bg-gradient-to-r from-[#141414] via-[#111111] to-[#141414] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          {/* YouTube Iconic Red Icon */}
          <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center shrink-0 shadow-lg shadow-red-950/50">
            <svg className="w-6 h-4.5" viewBox="0 0 68 48">
              <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#FF0000"/>
              <path d="M 45,24 27,14 27,34" fill="#FFFFFF"/>
            </svg>
          </div>
          <div className="space-y-0.5 text-left">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-red-600 text-white flex items-center gap-1">
                <span>YOUTUBE</span>
              </span>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                VÍDEO AULA PASSO A PASSO
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-black text-white tracking-tight">
              Como Baixar, Acessar os Arquivos e Imprimir em 3D
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          {!isPlaying && (
            <button
              type="button"
              onClick={handleStartWithSound}
              className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition shadow-md shadow-red-950/50 cursor-pointer active:scale-95"
            >
              <Volume2 className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Assistir com Som</span>
            </button>
          )}

          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-[#181818] hover:bg-[#222222] text-neutral-300 hover:text-white border border-[#303030] rounded-lg text-xs font-bold flex items-center gap-1.5 transition"
            title="Abrir no YouTube em nova aba"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Abrir no YouTube</span>
          </a>

          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="px-3 py-1.5 bg-[#181818] hover:bg-[#222222] text-neutral-300 hover:text-white border border-[#303030] rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            {isCollapsed ? (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Expandir</span>
              </>
            ) : (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Minimizar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Video Content & Side Section */}
      {!isCollapsed && (
        <div className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Player Column (16:9 responsive frame) */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-2 flex flex-col justify-between">
              <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden border border-[#2a2a2a] shadow-2xl group">
                {isPlaying ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&modestbranding=1&enablejsapi=1`}
                    title="Vídeo Aula Passo a Passo - Impressão 3D e Arquivos STL"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0 bg-black"
                  />
                ) : (
                  /* Big YouTube Play Overlay over Video Thumbnail */
                  <div
                    onClick={handleStartWithSound}
                    className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer overflow-hidden group select-none"
                  >
                    {/* YouTube Video High-Res Thumbnail */}
                    <img
                      src={thumbSrc}
                      onError={handleThumbError}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      alt="Miniatura do Vídeo Passo a Passo"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.85] group-hover:brightness-95"
                    />

                    {/* Gradient Scrim */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-300" />

                    {/* YouTube Iconic Play Button */}
                    <div className="relative transform group-hover:scale-110 active:scale-95 transition-all duration-300 drop-shadow-2xl z-10">
                      <div className="w-20 h-14 sm:w-24 sm:h-16 bg-[#FF0000] rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-[0_0_35px_rgba(255,0,0,0.7)] group-hover:bg-[#CC0000] transition-colors">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10 ml-1" viewBox="0 0 24 24" fill="white">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>

                    {/* Sound Notification Badge */}
                    <div className="relative z-10 mt-4 px-4 py-2 bg-black/85 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-white flex items-center gap-2 shadow-xl group-hover:border-red-500 transition-colors">
                      <Volume2 className="w-4 h-4 text-red-500 stroke-[2.5]" />
                      <span>CLIQUE PARA INICIAR COM SOM</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold text-neutral-400 px-1 pt-1">
                <span>Vídeo Oficial YouTube • Guia Passo a Passo</span>
                <span className="text-red-500 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Áudio Ativo ao Clicar
                </span>
              </div>
            </div>

            {/* SESSÃO AO LADO DO VÍDEO (QUER ACELERAR SEUS RESULTADOS? / CHAVEIROS 3D) */}
            <div className="lg:col-span-5 xl:col-span-5 text-left flex flex-col bg-[#131313] border border-[#2c2c2c] hover:border-amber-400/50 rounded-xl overflow-hidden shadow-2xl transition-all">
              {/* Header da Sessão ao lado do vídeo */}
              <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#171717] to-[#121212] border-b border-[#242424] space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-400 text-black shadow-sm flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-black stroke-black" />
                      <span>SESSÃO EXCLUSIVA VIP</span>
                    </span>
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  </div>

                  {chaveirosSectionData?.driveFolderUrl && activeSideTab === 'sec-chaveiros' && (
                    <a
                      href={chaveirosSectionData.driveFolderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition"
                      title="Abrir pasta de chaveiros no Google Drive"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>Pasta no Drive</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-white tracking-tight uppercase">
                    {activeSideTab === 'vip' && 'Quer Acelerar Seus Resultados?'}
                    {activeSideTab === 'sec-chaveiros' && 'Sessão Chaveiros & Keychains 3D'}
                    {activeSideTab === 'steps' && 'Passo a Passo Rápido'}
                  </h3>
                  {activeSideTab === 'sec-chaveiros' && (
                    <span className="text-[11px] font-bold text-neutral-400">
                      {chaveirosModels.length} modelos
                    </span>
                  )}
                  {activeSideTab === 'vip' && (
                    <span className="text-[11px] font-bold text-amber-400">
                      Acesso Vitalício
                    </span>
                  )}
                </div>

                {/* Abas Rápidas de Navegação */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-0.5">
                  <button
                    type="button"
                    onClick={() => setActiveSideTab('vip')}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-black shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeSideTab === 'vip'
                        ? 'bg-amber-400 text-black shadow-md'
                        : 'bg-[#1e1e1e] hover:bg-[#282828] text-neutral-300 hover:text-white border border-[#2e2e2e]'
                    }`}
                  >
                    <Crown className={`w-3.5 h-3.5 ${activeSideTab === 'vip' ? 'text-black' : 'text-amber-400'}`} />
                    <span>Acelerar Resultados</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSideTab('sec-chaveiros')}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-black shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeSideTab === 'sec-chaveiros'
                        ? 'bg-white text-black shadow-md'
                        : 'bg-[#1e1e1e] hover:bg-[#282828] text-neutral-300 hover:text-white border border-[#2e2e2e]'
                    }`}
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>Chaveiros 3D ({chaveirosModels.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSideTab('steps')}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-black shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeSideTab === 'steps'
                        ? 'bg-white text-black shadow-md'
                        : 'bg-[#1e1e1e] hover:bg-[#282828] text-neutral-300 hover:text-white border border-[#2e2e2e]'
                    }`}
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    <span>Guia</span>
                  </button>
                </div>
              </div>

              {/* CONTEÚDO 1: CARD VIP SELECIONADO ("QUER ACELERAR SEUS RESULTADOS?") */}
              {activeSideTab === 'vip' && (
                <div className="flex-1 p-3.5 sm:p-4 flex flex-col justify-between space-y-3.5 bg-gradient-to-b from-[#141414] to-[#0f0f0f]">
                  <div className="flex flex-col sm:flex-row gap-3.5 items-start">
                    {/* Imagem do Card Selecionado com Cadeado Centralizado */}
                    <div 
                      onClick={handleOpenVipCheckout}
                      className="relative w-full sm:w-36 aspect-square shrink-0 rounded-xl overflow-hidden bg-[#0a0a0a] border border-amber-400/60 shadow-lg cursor-pointer group/card select-none"
                    >
                      <img
                        src={VIP_CHECKOUT_MODEL.imageUrl}
                        alt="Quer Acelerar Seus Resultados?"
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                      />
                      {/* Cadeado Centralizado Translúcido */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 bg-black/25 backdrop-blur-[2px]">
                        <span className="p-2.5 rounded-xl bg-black/60 border border-white/25 flex items-center justify-center shadow-lg group-hover/card:scale-110 transition-transform">
                          <Lock className="w-6 h-6 text-white stroke-[2.2]" />
                        </span>
                      </div>
                    </div>

                    {/* Textos explicativos em Montserrat */}
                    <div className="space-y-1.5 flex-1 text-left">
                      <div className="inline-block px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[10px] font-black uppercase tracking-wider">
                        ACESSO VITALÍCIO COMPLETO
                      </div>
                      <h4 
                        onClick={handleOpenVipCheckout}
                        className="text-sm sm:text-base font-black text-white uppercase tracking-tight leading-tight hover:text-amber-300 transition-colors cursor-pointer"
                      >
                        QUER ACELERAR SEUS RESULTADOS?
                      </h4>
                      <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed font-medium">
                        Mais de <strong className="text-white font-bold">150.000 modelos 3D STL</strong> testados e aprovados, pastas no Google Drive com fotos reais e atualizações perpétuas sem mensalidades.
                      </p>
                    </div>
                  </div>

                  {/* Benefícios Rápidos */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#222222] text-[11px] text-neutral-200 font-bold">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>+150.000 Modelos STL</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Pastas Google Drive</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Fotos Prontas de Venda</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Taxa Única Sem Mensalidade</span>
                    </div>
                  </div>

                  {/* Botão de Ação CTA de Alta Conversão */}
                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      onClick={handleOpenVipCheckout}
                      className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 active:scale-[0.99] text-black text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer select-none"
                    >
                      <Lock className="w-4 h-4 stroke-[2.5]" />
                      <span>GARANTIR ACESSO VITALÍCIO (R$ 97)</span>
                      <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                    </button>

                    <div className="flex items-center justify-between text-[10px] text-neutral-400 font-bold px-1">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        Compra 100% Segura
                      </span>
                      <span>Liberação Imediata</span>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTEÚDO 2: LISTA DE MODELOS DA SESSÃO CHAVEIROS & KEYCHAINS 3D */}
              {activeSideTab === 'sec-chaveiros' && (
                <div className="flex-1 p-3 flex flex-col justify-between">
                  {/* Grid scrollável com os cards de chaveiros da sessão */}
                  <div className="grid grid-cols-2 gap-2.5 max-h-[340px] sm:max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
                    {chaveirosModels.map((model, index) => {
                      const optImg = model.imageUrl
                        ? getOptimizedCardImageUrl(model.imageUrl, index, 180)
                        : '';

                      return (
                        <div
                          key={model.id}
                          className="bg-[#171717] hover:bg-[#1c1c1c] border border-[#262626] hover:border-amber-400/60 rounded-lg p-2 flex flex-col justify-between transition-all group shadow-sm text-left"
                        >
                          {/* Imagem Limpa */}
                          <div
                            onClick={() => onOpenModel?.(model)}
                            className="relative aspect-square w-full rounded-md overflow-hidden bg-[#0d0d0d] mb-1.5 cursor-pointer"
                          >
                            {optImg ? (
                              <img
                                src={optImg}
                                alt={model.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-neutral-600">
                                <Key className="w-6 h-6" />
                              </div>
                            )}
                          </div>

                          {/* Título do modelo */}
                          <h4 
                            onClick={() => onOpenModel?.(model)}
                            className="text-[11px] font-bold text-white group-hover:text-amber-300 line-clamp-2 leading-tight cursor-pointer min-h-[28px]"
                            title={model.title}
                          >
                            {model.title}
                          </h4>

                          {/* Botões de Ação */}
                          <div className="mt-2 pt-1.5 border-t border-[#232323] flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => onOpenModel?.(model)}
                              className="flex-1 py-1 px-1.5 bg-[#222222] hover:bg-[#2c2c2c] text-white text-[10px] font-bold rounded flex items-center justify-center gap-1 transition cursor-pointer"
                            >
                              <Eye className="w-3 h-3 text-neutral-300" />
                              <span>Ver</span>
                            </button>

                            <a
                              href={model.driveUrl || VIP_DRIVE_MAIN_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => onDirectDownload?.(model)}
                              className="flex-1 py-1 px-1.5 bg-amber-400 hover:bg-amber-300 text-black text-[10px] font-black rounded flex items-center justify-center gap-1 transition"
                            >
                              <Download className="w-3 h-3" />
                              <span>STL</span>
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Botão de Rodapé para abrir no catálogo */}
                  {onSelectCategoryFilter && (
                    <button
                      type="button"
                      onClick={() => onSelectCategoryFilter('sec-chaveiros')}
                      className="mt-2.5 pt-2 border-t border-[#222222] text-xs font-bold text-neutral-300 hover:text-white flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <span>Ver todos os {chaveirosModels.length} no catálogo principal</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </button>
                  )}
                </div>
              )}

              {/* CONTEÚDO 3: GUIA PASSO A PASSO */}
              {activeSideTab === 'steps' && (
                <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[380px]">
                  <ul className="space-y-2.5 text-xs text-neutral-300">
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-bold text-[11px] flex items-center justify-center shrink-0 border border-amber-400/30">
                        1
                      </span>
                      <div>
                        <strong className="text-white block font-bold">Escolha seu modelo</strong>
                        <span className="text-[11px] text-neutral-400">Navegue pelas categorias e selecione a miniatura, caneca ou chaveiro desejado.</span>
                      </div>
                    </li>

                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-bold text-[11px] flex items-center justify-center shrink-0 border border-amber-400/30">
                        2
                      </span>
                      <div>
                        <strong className="text-white block font-bold">Clique no botão verde</strong>
                        <span className="text-[11px] text-neutral-400">Use o botão <strong className="text-emerald-400">"ACESSAR PASTA"</strong> para baixar os arquivos STL ou abrir no Google Drive.</span>
                      </div>
                    </li>

                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-bold text-[11px] flex items-center justify-center shrink-0 border border-amber-400/30">
                        3
                      </span>
                      <div>
                        <strong className="text-white block font-bold">Abra no seu Fatiador</strong>
                        <span className="text-[11px] text-neutral-400">Importe no Cura, Bambu Studio, OrcaSlicer ou PrusaSlicer com preenchimento Gyroid (12-20%).</span>
                      </div>
                    </li>

                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-bold text-[11px] flex items-center justify-center shrink-0 border border-amber-400/30">
                        4
                      </span>
                      <div>
                        <strong className="text-white block font-bold">Imprima e lucre</strong>
                        <span className="text-[11px] text-neutral-400">Utilize as fotos de alta qualidade do acervo para divulgar e vender suas peças prontas.</span>
                      </div>
                    </li>
                  </ul>

                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/30 flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-[11px] text-amber-200 font-bold">
                      Vídeo com resolução HD e instruções práticas na tela.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

