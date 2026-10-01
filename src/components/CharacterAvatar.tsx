import React from 'react';

interface CharacterAvatarProps {
  charKey?: string;
  title: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({ charKey, title }) => {
  const t = title.toLowerCase();

  // Spider-Man & variants
  if (charKey?.startsWith('spider') || t.includes('aranha') || t.includes('spiderman')) {
    const isMiles = t.includes('miles');
    const isGwen = t.includes('gwen');
    const is2099 = t.includes('2099');

    return (
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-white/5 rounded-full blur-xl" />
        <svg className="w-24 h-24 text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]" viewBox="0 0 100 100" fill="none">
          {/* Head Silhouette */}
          <ellipse cx="50" cy="52" rx="36" ry="42" fill="#09090b" stroke="#ffffff" strokeWidth="2.5" />
          {/* Web Lines */}
          <path d="M50 10 L50 94" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.4" />
          <path d="M14 52 L86 52" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.4" />
          <path d="M22 24 L78 80" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
          <path d="M78 24 L22 80" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
          {/* Concentric webs */}
          <ellipse cx="50" cy="52" rx="16" ry="18" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
          <ellipse cx="50" cy="52" rx="28" ry="32" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
          {/* Large Stylized Eyes */}
          <path
            d="M26 44 C28 32, 42 36, 44 48 C44 56, 32 58, 26 44 Z"
            fill={isMiles ? '#ffffff' : '#ffffff'}
            stroke="#000000"
            strokeWidth="3"
          />
          <path
            d="M74 44 C72 32, 58 36, 56 48 C56 56, 68 58, 74 44 Z"
            fill={isMiles ? '#ffffff' : '#ffffff'}
            stroke="#000000"
            strokeWidth="3"
          />
          {/* Eye rim detail */}
          <path d="M24 44 C26 30, 43 34, 45 48 C45 58, 30 60, 24 44 Z" stroke="#ffffff" strokeWidth="1.5" />
          <path d="M76 44 C74 30, 57 34, 55 48 C55 58, 70 60, 76 44 Z" stroke="#ffffff" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  // Deadpool & Nicepool
  if (charKey === 'deadpool' || t.includes('deadpool') || t.includes('nicepool')) {
    return (
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-24 h-24 text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]" viewBox="0 0 100 100" fill="none">
          {/* Mask Base */}
          <ellipse cx="50" cy="52" rx="35" ry="40" fill="#0c0c0e" stroke="#ffffff" strokeWidth="2.5" />
          {/* Black Leather Eye Patches */}
          <ellipse cx="34" cy="50" rx="14" ry="19" fill="#18181b" stroke="#ffffff" strokeWidth="1.5" />
          <ellipse cx="66" cy="50" rx="14" ry="19" fill="#18181b" stroke="#ffffff" strokeWidth="1.5" />
          {/* Expressive Narrow Slanted Eyes */}
          <path d="M28 50 C32 44, 40 45, 42 50 C38 52, 30 52, 28 50 Z" fill="#ffffff" />
          <path d="M72 50 C68 44, 60 45, 58 50 C62 52, 70 52, 72 50 Z" fill="#ffffff" />
          {/* Center Seam */}
          <path d="M50 12 L50 92" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
        </svg>
      </div>
    );
  }

  // Iron Man
  if (charKey === 'iron-man' || t.includes('homem de ferro')) {
    return (
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-24 h-24 text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]" viewBox="0 0 100 100" fill="none">
          {/* Helmet Outline */}
          <path
            d="M26 24 C26 12, 74 12, 74 24 L82 56 L70 88 L30 88 L18 56 Z"
            fill="#09090b"
            stroke="#ffffff"
            strokeWidth="2.5"
          />
          {/* Faceplate Shape */}
          <path
            d="M32 30 L68 30 L74 54 L62 82 L38 82 L26 54 Z"
            fill="#18181b"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
          {/* Forehead Ridge */}
          <line x1="38" y1="36" x2="62" y2="36" stroke="#ffffff" strokeWidth="1.5" />
          {/* Luminous Slit Eyes */}
          <polygon points="34,48 46,50 44,54 32,52" fill="#ffffff" />
          <polygon points="66,48 54,50 56,54 68,52" fill="#ffffff" />
          {/* Mouth Grille */}
          <line x1="42" y1="72" x2="58" y2="72" stroke="#ffffff" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  // Captain America
  if (charKey === 'captain-america' || t.includes('capitão américa')) {
    return (
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-24 h-24 text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]" viewBox="0 0 100 100" fill="none">
          {/* Shield Rings */}
          <circle cx="50" cy="50" r="44" stroke="#ffffff" strokeWidth="3" fill="#09090b" />
          <circle cx="50" cy="50" r="34" stroke="#ffffff" strokeWidth="2" fill="#18181b" />
          <circle cx="50" cy="50" r="24" stroke="#ffffff" strokeWidth="2" fill="#09090b" />
          <circle cx="50" cy="50" r="14" fill="#ffffff" />
          {/* Center Star */}
          <polygon
            points="50,38 53,46 62,46 55,51 58,60 50,55 42,60 45,51 38,46 47,46"
            fill="#09090b"
          />
        </svg>
      </div>
    );
  }

  // Wolverine / Logan
  if (charKey === 'wolverine' || t.includes('wolverine') || t.includes('logan')) {
    return (
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-24 h-24 text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]" viewBox="0 0 100 100" fill="none">
          {/* Mask Cowl with signature flared ears */}
          <path
            d="M12 20 C24 35, 30 50, 32 70 L50 88 L68 70 C70 50, 76 35, 88 20 C76 36, 68 44, 50 44 C32 44, 24 36, 12 20 Z"
            fill="#121215"
            stroke="#ffffff"
            strokeWidth="2.5"
          />
          {/* Face Area */}
          <path d="M34 56 C38 48, 62 48, 66 56 L60 80 L40 80 Z" fill="#000000" stroke="#ffffff" strokeWidth="1.5" />
          {/* Intense Eyes */}
          <polygon points="38,60 46,62 40,65" fill="#ffffff" />
          <polygon points="62,60 54,62 60,65" fill="#ffffff" />
          {/* Claws hint */}
          <path d="M44 88 L44 98" stroke="#ffffff" strokeWidth="2" />
          <path d="M50 88 L50 100" stroke="#ffffff" strokeWidth="2" />
          <path d="M56 88 L56 98" stroke="#ffffff" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  // Black Panther
  if (charKey === 'black-panther' || t.includes('pantera')) {
    return (
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-24 h-24 text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]" viewBox="0 0 100 100" fill="none">
          {/* Mask Base */}
          <ellipse cx="50" cy="52" rx="35" ry="40" fill="#000000" stroke="#ffffff" strokeWidth="2.5" />
          {/* Panther Ears */}
          <polygon points="24,24 34,16 36,30" fill="#000000" stroke="#ffffff" strokeWidth="2" />
          <polygon points="76,24 66,16 64,30" fill="#000000" stroke="#ffffff" strokeWidth="2" />
          {/* Vibranium Lines */}
          <path d="M30 42 L42 46 L40 54" stroke="#ffffff" strokeWidth="1.5" fill="none" />
          <path d="M70 42 L58 46 L60 54" stroke="#ffffff" strokeWidth="1.5" fill="none" />
          {/* Panther Eyes */}
          <polygon points="34,48 44,52 38,56" fill="#ffffff" />
          <polygon points="66,48 56,52 62,56" fill="#ffffff" />
          {/* Tooth Necklace Curve */}
          <path d="M30 76 Q50 92 70 76" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      </div>
    );
  }

  // Doctor Doom
  if (charKey === 'doctor-doom' || t.includes('doutor destino')) {
    return (
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-24 h-24 text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]" viewBox="0 0 100 100" fill="none">
          {/* Hood */}
          <path
            d="M16 88 C16 30, 30 14, 50 14 C70 14, 84 30, 84 88 C70 78, 30 78, 16 88 Z"
            fill="#121215"
            stroke="#ffffff"
            strokeWidth="2.5"
          />
          {/* Mask */}
          <path
            d="M32 40 L68 40 L72 68 L50 82 L28 68 Z"
            fill="#000000"
            stroke="#ffffff"
            strokeWidth="2"
          />
          {/* Rivets */}
          <circle cx="36" cy="44" r="1.5" fill="#ffffff" />
          <circle cx="64" cy="44" r="1.5" fill="#ffffff" />
          {/* Eye Cutouts */}
          <rect x="36" y="50" width="10" height="7" rx="1" fill="#ffffff" />
          <rect x="54" y="50" width="10" height="7" rx="1" fill="#ffffff" />
          {/* Grate Mouth */}
          <line x1="42" y1="70" x2="58" y2="70" stroke="#ffffff" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  // Moon Knight / Khonshu
  if (charKey === 'moon-knight' || charKey === 'khonshu' || t.includes('lua') || t.includes('khonshu')) {
    return (
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-24 h-24 text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]" viewBox="0 0 100 100" fill="none">
          {/* Hood */}
          <path
            d="M20 90 C18 40, 32 16, 50 16 C68 16, 82 40, 80 90 C72 82, 28 82, 20 90 Z"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="3"
          />
          {/* Shadow Face */}
          <ellipse cx="50" cy="56" rx="20" ry="24" fill="#000000" />
          {/* Glowing Eyes */}
          <ellipse cx="43" cy="52" rx="3.5" ry="2" fill="#ffffff" />
          <ellipse cx="57" cy="52" rx="3.5" ry="2" fill="#ffffff" />
          {/* Crescent Moon on Forehead */}
          <path
            d="M50 26 C54 26, 56 29, 56 34 C56 39, 54 42, 50 42 C53 39, 53 29, 50 26 Z"
            fill="#000000"
          />
        </svg>
      </div>
    );
  }

  // Fantastic Four (Thing, Torch, Mr Fantastic, Invisible Woman)
  if (charKey?.includes('fantastic') || t.includes('quarteto') || t.includes('coisa') || t.includes('tocha')) {
    return (
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-24 h-24 text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]" viewBox="0 0 100 100" fill="none">
          {/* Emblem Circle */}
          <circle cx="50" cy="50" r="40" fill="#09090b" stroke="#ffffff" strokeWidth="3" />
          <circle cx="50" cy="50" r="34" fill="#18181b" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 2" />
          {/* Bold '4' Symbol */}
          <path
            d="M56 28 L40 56 L58 56 L58 72 L64 72 L64 56 L70 56 L70 50 L64 50 L64 28 Z M58 50 L48 50 L56 36 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    );
  }

  // Hulk & She-Hulk
  if (charKey?.includes('hulk') || t.includes('hulk')) {
    return (
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-24 h-24 text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]" viewBox="0 0 100 100" fill="none">
          {/* Massive Fist / Smashing Emblem */}
          <circle cx="50" cy="50" r="42" fill="#09090b" stroke="#ffffff" strokeWidth="2.5" />
          {/* Clenched Fist Fingers */}
          <path
            d="M32 46 C32 38, 42 38, 42 46 L42 66 L32 66 Z
               M42 42 C42 34, 52 34, 52 42 L52 66 L42 66 Z
               M52 44 C52 36, 62 36, 62 44 L62 66 L52 66 Z
               M62 48 C62 42, 70 42, 70 48 L70 66 L62 66 Z"
            fill="#1c1c22"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
          {/* Thumb folded over */}
          <path d="M28 58 C28 50, 48 52, 60 62 L56 72 L28 72 Z" fill="#272730" stroke="#ffffff" strokeWidth="1.5" />
          {/* Veins / Impact lines */}
          <path d="M50 20 L50 28 M30 30 L36 36 M70 30 L64 36" stroke="#ffffff" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  // Magneto
  if (charKey === 'magneto' || t.includes('magneto')) {
    return (
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-24 h-24 text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]" viewBox="0 0 100 100" fill="none">
          {/* Helmet Outline */}
          <path
            d="M24 88 C20 40, 32 16, 50 16 C68 16, 80 40, 76 88 L64 88 C66 60, 64 48, 50 48 C36 48, 34 60, 36 88 Z"
            fill="#09090b"
            stroke="#ffffff"
            strokeWidth="2.5"
          />
          {/* Distinctive Brow Crest */}
          <polygon points="50,22 42,32 58,32" fill="#ffffff" />
          <path d="M34 40 Q50 32 66 40" stroke="#ffffff" strokeWidth="2" />
          {/* Face cutout */}
          <path d="M38 48 C42 42, 58 42, 62 48 L58 76 L42 76 Z" fill="#18181b" />
          <ellipse cx="44" cy="56" rx="3" ry="1.5" fill="#ffffff" />
          <ellipse cx="56" cy="56" rx="3" ry="1.5" fill="#ffffff" />
        </svg>
      </div>
    );
  }

  // Default Marvel Hero 3D Emblem (Crisp high-detail polygonal shield)
  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <svg className="w-24 h-24 text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]" viewBox="0 0 100 100" fill="none">
        <polygon points="50,14 84,32 84,68 50,86 16,68 16,32" fill="#09090b" stroke="#ffffff" strokeWidth="2.5" />
        <polygon points="50,22 76,36 76,64 50,78 24,64 24,36" fill="#18181b" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M50 24 L50 76" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
        <path d="M26 50 L74 50" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
        {/* STL 3D Cube / Polyhedron in center */}
        <polygon points="50,34 66,42 66,60 50,68 34,60 34,42" fill="#272730" stroke="#ffffff" strokeWidth="1.5" />
        <polyline points="34,42 50,50 66,42" stroke="#ffffff" strokeWidth="1.5" />
        <line x1="50" y1="50" x2="50" y2="68" stroke="#ffffff" strokeWidth="1.5" />
      </svg>
    </div>
  );
};
