import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp, ExternalLink, Laptop, Volume2, Play } from 'lucide-react';

interface VideoAulaSectionProps {
  videoId?: string;
  videoUrl?: string;
}

const DEFAULT_YOUTUBE_ID = 'ZL36Zx2pr2M';
const DEFAULT_WATCH_URL = 'https://youtu.be/ZL36Zx2pr2M';

export const VideoAulaSection: React.FC<VideoAulaSectionProps> = ({
  videoId = DEFAULT_YOUTUBE_ID,
  videoUrl = DEFAULT_WATCH_URL
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const fallbackThumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const [thumbSrc, setThumbSrc] = useState(thumbnailUrl);

  const handleStartWithSound = () => {
    setIsPlaying(true);
  };

  return (
    <section className="bg-[#101010] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl transition-all">
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
              <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded bg-red-600 text-white flex items-center gap-1">
                <span>YOUTUBE</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider">
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
              className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-mono font-black uppercase tracking-wider flex items-center gap-2 transition shadow-md shadow-red-950/50 cursor-pointer active:scale-95"
            >
              <Volume2 className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Assistir com Som</span>
            </button>
          )}

          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-[#181818] hover:bg-[#222222] text-neutral-300 hover:text-white border border-[#303030] rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition"
            title="Abrir no YouTube em nova aba"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Abrir no YouTube</span>
          </a>

          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="px-3 py-1.5 bg-[#181818] hover:bg-[#222222] text-neutral-300 hover:text-white border border-[#303030] rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
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

      {/* Video Content & Steps */}
      {!isCollapsed && (
        <div className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Player Column (16:9 responsive frame) */}
            <div className="lg:col-span-8 space-y-2">
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
                      onError={() => setThumbSrc(fallbackThumbnailUrl)}
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
                    <div className="relative z-10 mt-4 px-4 py-2 bg-black/85 backdrop-blur-md border border-white/20 rounded-full text-xs font-mono font-black text-white flex items-center gap-2 shadow-xl group-hover:border-red-500 transition-colors">
                      <Volume2 className="w-4 h-4 text-red-500 stroke-[2.5]" />
                      <span>CLIQUE PARA INICIAR COM SOM</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 px-1">
                <span>Vídeo Oficial YouTube • Guia Passo a Passo</span>
                <span className="text-red-500 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Áudio Ativo ao Clicar
                </span>
              </div>
            </div>

            {/* Steps & Guidance Column */}
            <div className="lg:col-span-4 space-y-3 text-left">
              <div className="p-4 rounded-xl bg-[#141414] border border-[#252525] space-y-3">
                <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-emerald-400" />
                  Passo a Passo Rápido
                </h3>

                <ul className="space-y-2.5 text-xs text-neutral-300">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600/20 text-emerald-400 font-mono font-black text-[11px] flex items-center justify-center shrink-0 border border-emerald-500/30">
                      1
                    </span>
                    <div>
                      <strong className="text-white block font-bold">Escolha seu modelo</strong>
                      <span className="text-[11px] text-neutral-400">Navegue pelas categorias e selecione a miniatura, caneca ou estátua desejada.</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600/20 text-emerald-400 font-mono font-black text-[11px] flex items-center justify-center shrink-0 border border-emerald-500/30">
                      2
                    </span>
                    <div>
                      <strong className="text-white block font-bold">Clique no botão verde</strong>
                      <span className="text-[11px] text-neutral-400">Use o botão <strong className="text-emerald-400">"ACESSAR PASTA"</strong> para baixar os arquivos STL ou abrir no Google Drive.</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600/20 text-emerald-400 font-mono font-black text-[11px] flex items-center justify-center shrink-0 border border-emerald-500/30">
                      3
                    </span>
                    <div>
                      <strong className="text-white block font-bold">Abra no seu Fatiador</strong>
                      <span className="text-[11px] text-neutral-400">Importe no Cura, Bambu Studio, OrcaSlicer ou PrusaSlicer com preenchimento Gyroid (12-20%).</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600/20 text-emerald-400 font-mono font-black text-[11px] flex items-center justify-center shrink-0 border border-emerald-500/30">
                      4
                    </span>
                    <div>
                      <strong className="text-white block font-bold">Imprima e lucre</strong>
                      <span className="text-[11px] text-neutral-400">Utilize as fotos de alta qualidade do acervo para divulgar e vender suas peças prontas.</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/30 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[11px] text-emerald-200 font-bold">
                  Vídeo com resolução HD e instruções práticas na tela.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
