import React, { useState, useEffect } from 'react';
import { Lock, Unlock, ArrowUpRight, CheckCircle2, Eye, Sparkles, X } from 'lucide-react';

interface HeroBannerProps {
  totalFilesCount?: string;
  onExploreBonus?: () => void;
}

const CHECKOUT_URL = 'https://checkout.wiven.com.br/checkout/cmunhum9o0avk01pskwmrd371?offer=9Q7H0QK';
const PRODUCT_IMAGE_URL = '/banners/pack_exclusive.png';
const PRODUCT_IMAGE_FALLBACK = 'https://i.imgur.com/ylr36YR.png';

export const HeroBanner: React.FC<HeroBannerProps> = ({
  totalFilesCount = 'Mais de 150 mil arquivos',
  onExploreBonus,
}) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('pack_exclusive_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [showUnlockModal, setShowUnlockModal] = useState<boolean>(false);
  const [unlockCode, setUnlockCode] = useState<string>('');
  const [unlockError, setUnlockError] = useState<string>('');

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (
        params.get('unlocked') === 'true' ||
        params.get('paid') === 'true' ||
        params.get('status') === 'approved' ||
        params.get('wiven_status') === 'paid'
      ) {
        setIsUnlocked(true);
        localStorage.setItem('pack_exclusive_unlocked', 'true');
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleCardClick = () => {
    if (isUnlocked) {
      if (onExploreBonus) {
        onExploreBonus();
      } else {
        window.open('https://drive.google.com/drive/u/0/my-drive', '_blank');
      }
    } else {
      window.open(CHECKOUT_URL, '_blank', 'noopener,noreferrer');
    }
  };

  const handleConfirmUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (unlockCode.trim().length > 0) {
      setIsUnlocked(true);
      try {
        localStorage.setItem('pack_exclusive_unlocked', 'true');
      } catch (err) {
        console.error(err);
      }
      setShowUnlockModal(false);
      setUnlockError('');
    } else {
      setUnlockError('Digite seu e-mail ou código de confirmação da compra.');
    }
  };

  return (
    <section className="relative w-full rounded-2xl bg-[#121215] border border-[#27272a] p-6 lg:p-8 overflow-hidden mb-6">
      {/* Ambient subtle chess texture on background edge */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 chess-pattern-subtle opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#121215] via-[#121215]/95 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left Column: Headlines */}
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-700/60 text-[11px] font-semibold tracking-wider text-zinc-300 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            ÁREA DE MEMBROS VIP EXCLUSIVA
          </div>

          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white text-balance leading-tight">
            Biblioteca por categorias
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed text-balance">
            Centenas de modelos 3D para imprimir, fatiar e lucrar no mercado 3D.
          </p>
        </div>

        {/* Right Column: Locked Product Offer Card */}
        <div className="shrink-0 flex items-center">
          <div 
            onClick={handleCardClick}
            className={`w-full sm:w-[380px] group relative flex items-center gap-3.5 p-3 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer shadow-xl overflow-hidden ${
              isUnlocked 
                ? 'bg-gradient-to-br from-emerald-950/40 via-zinc-900/90 to-zinc-950 border-emerald-500/50 hover:border-emerald-400' 
                : 'bg-gradient-to-br from-amber-950/30 via-zinc-900/95 to-zinc-950 border-amber-500/40 hover:border-amber-400/80 hover:shadow-amber-500/10'
            }`}
          >
            {/* Background glowing ambient light */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-2xl pointer-events-none transition-opacity ${
              isUnlocked ? 'bg-emerald-500/15' : 'bg-amber-500/15 group-hover:opacity-100'
            }`} />

            {/* Product Thumbnail with Image Preview Button */}
            <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-zinc-700/80 bg-black shadow-inner">
              <img 
                src={PRODUCT_IMAGE_URL} 
                alt="Pack Exclusivo 3D" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PRODUCT_IMAGE_FALLBACK;
                }}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
              />
              
              {/* Overlay lock / unlock icon indicator on top of image */}
              <div className={`absolute top-1.5 left-1.5 p-1 rounded-md backdrop-blur-md shadow-md ${
                isUnlocked ? 'bg-emerald-500 text-black' : 'bg-black/80 text-amber-400 border border-amber-500/30'
              }`}>
                {isUnlocked ? (
                  <Unlock className="w-3 h-3 stroke-[2.5]" />
                ) : (
                  <Lock className="w-3 h-3 stroke-[2.5]" />
                )}
              </div>

              {/* Zoom image preview trigger */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowImageModal(true);
                }}
                title="Ampliar imagem do produto"
                className="absolute bottom-1.5 right-1.5 p-1 rounded-md bg-black/80 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors backdrop-blur-sm"
              >
                <Eye className="w-3 h-3" />
              </button>
            </div>

            {/* Card Content & Details */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              {/* Lock Status Pill */}
              <div className="flex items-center gap-1.5 mb-1">
                {isUnlocked ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 uppercase">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Acesso Liberado
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide bg-amber-500/20 border border-amber-500/40 text-amber-300 uppercase animate-pulse">
                    <Lock className="w-2.5 h-2.5" /> Bloqueado
                  </span>
                )}
                
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Pack Especial
                </span>
              </div>

              {/* Title & Price */}
              <h2 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug line-clamp-1 group-hover:text-amber-300 transition-colors">
                Coleção Exclusiva VIP
              </h2>

              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-[11px] text-zinc-400 line-through">R$ 97,00</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400 tracking-tight">
                  R$ 24,90
                </span>
                <span className="text-[10px] text-zinc-400">à vista</span>
              </div>

              {/* Action Button */}
              <div className="mt-2 flex items-center justify-between">
                <span className={`inline-flex items-center gap-1 text-[11px] font-bold transition-all ${
                  isUnlocked 
                    ? 'text-emerald-400 group-hover:underline' 
                    : 'text-amber-400 group-hover:text-amber-300 group-hover:translate-x-0.5'
                }`}>
                  {isUnlocked ? 'Acessar Arquivos' : 'Desbloquear Acesso'}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>

                {!isUnlocked && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUnlockModal(true);
                    }}
                    className="text-[10px] text-zinc-500 hover:text-zinc-300 underline underline-offset-2 transition-colors ml-auto"
                  >
                    Já comprou?
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Enlarged Image Preview Modal */}
      {showImageModal && (
        <div 
          onClick={() => setShowImageModal(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xl w-full bg-[#18181b] border border-zinc-700 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/60">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-white">Visualização do Pack Exclusivo</span>
              </div>
              <button 
                onClick={() => setShowImageModal(false)}
                className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-black/60 flex items-center justify-center max-h-[70vh] overflow-hidden">
              <img 
                src={PRODUCT_IMAGE_URL} 
                alt="Pack Exclusivo 3D Ampliado" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PRODUCT_IMAGE_FALLBACK;
                }}
                className="w-full h-auto max-h-[65vh] object-contain rounded-lg"
              />
            </div>

            <div className="p-4 bg-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-800">
              <div>
                <span className="text-xs text-zinc-400">Preço Promocional Exclusivo:</span>
                <p className="text-base font-extrabold text-emerald-400">R$ 24,90</p>
              </div>

              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowImageModal(false)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm tracking-wide uppercase shadow-lg transition-all"
              >
                Ir para o Checkout Seguro (R$ 24,90) ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Manual Unlock / Already Bought Modal */}
      {showUnlockModal && (
        <div 
          onClick={() => setShowUnlockModal(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full bg-[#18181b] border border-zinc-700 rounded-2xl p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Unlock className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">Liberar Acesso do Pack</h3>
              </div>
              <button 
                onClick={() => setShowUnlockModal(false)}
                className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Se você já realizou a compra de <strong className="text-white">R$ 24,90</strong> na plataforma Wiven, confirme seu e-mail de compra para liberar o acesso instantaneamente.
            </p>

            <form onSubmit={handleConfirmUnlock} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  E-mail de compra ou Código do pedido:
                </label>
                <input 
                  type="text" 
                  value={unlockCode}
                  onChange={(e) => {
                    setUnlockCode(e.target.value);
                    setUnlockError('');
                  }}
                  placeholder="ex: seuemail@exemplo.com"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
                {unlockError && (
                  <p className="text-xs text-red-400 mt-1">{unlockError}</p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUnlockModal(false)}
                  className="flex-1 py-2 rounded-xl border border-zinc-700 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wide transition-all shadow-md"
                >
                  Liberar Acesso Agora
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

