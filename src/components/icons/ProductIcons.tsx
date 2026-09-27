import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  strokeWidth?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. DESK LAMPS (MINIMAL VECTOR LINE-ART)
// ─────────────────────────────────────────────────────────────────────────────

/** Modern Shoji Lamp: Japanese lattice framework & translucent washi panels */
export function ModernShojiIcon({ className = '', size = 48, strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Outer frame */}
      <rect x="16" y="8" width="32" height="48" rx="2" strokeDasharray="none" />
      {/* Top cap */}
      <line x1="12" y1="8" x2="52" y2="8" strokeWidth={strokeWidth * 1.3} />
      {/* Base footers */}
      <line x1="12" y1="56" x2="52" y2="56" strokeWidth={strokeWidth * 1.3} />
      <line x1="18" y1="56" x2="18" y2="60" strokeWidth={strokeWidth * 1.5} />
      <line x1="46" y1="56" x2="46" y2="60" strokeWidth={strokeWidth * 1.5} />
      {/* Shoji Lattice Grids */}
      <line x1="32" y1="8" x2="32" y2="56" />
      <line x1="16" y1="20" x2="48" y2="20" />
      <line x1="16" y1="32" x2="48" y2="32" />
      <line x1="16" y1="44" x2="48" y2="44" />
      {/* Inner ambient glow beacon */}
      <circle cx="32" cy="32" r="5" className="fill-[#d4ff00]/40 stroke-[#d4ff00]" strokeWidth="1" />
      <circle cx="32" cy="32" r="1.5" className="fill-ink" />
    </svg>
  );
}

/** BOOFA Table Lamp: Fluted architectural mushroom dome with flared pedestal */
export function BoofaLampIcon({ className = '', size = 48, strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Mushroom dome contour */}
      <path d="M12 30 C12 16, 52 16, 52 30 C52 32, 12 32, 12 30 Z" />
      {/* Vertical fluted dome ribbing */}
      <path d="M19 28 C21 21, 25 17, 32 16" strokeDasharray="1 3" />
      <path d="M26 30 C27 23, 29 18, 32 17" />
      <path d="M38 30 C37 23, 35 18, 32 17" />
      <path d="M45 28 C43 21, 39 17, 32 16" strokeDasharray="1 3" />
      {/* Stem flare */}
      <path d="M28 32 C28 40, 23 48, 20 54 L44 54 C41 48, 36 40, 36 32" />
      {/* Weighted base plinth */}
      <rect x="18" y="54" width="28" height="4" rx="2" />
      {/* Concentric light ray indicator */}
      <circle cx="32" cy="32" r="3" className="fill-[#d4ff00]/40 stroke-[#d4ff00]" strokeWidth="1" />
    </svg>
  );
}

/** Cute Hot Air Balloon Lamp: 18cm ribbed sphere with hanging gondola basket */
export function HotAirBalloonIcon({ className = '', size = 48, strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Balloon envelope */}
      <path d="M32 8 C44 8, 50 18, 48 30 C46 38, 38 44, 34 47 L30 47 C26 44, 18 38, 16 30 C14 18, 20 8, 32 8 Z" />
      {/* Longitudinal ribs */}
      <path d="M32 8 C38 18, 38 36, 32 47" />
      <path d="M32 8 C26 18, 26 36, 32 47" />
      <path d="M23 15 C20 24, 20 34, 26 44" strokeDasharray="2 2" />
      <path d="M41 15 C44 24, 44 34, 38 44" strokeDasharray="2 2" />
      {/* Suspension cords */}
      <line x1="28" y1="47" x2="27" y2="52" />
      <line x1="36" y1="47" x2="37" y2="52" />
      {/* Hanging Gondola Basket */}
      <rect x="25" y="52" width="14" height="8" rx="1.5" />
      <line x1="25" y1="56" x2="39" y2="56" strokeDasharray="1.5 1.5" />
      {/* Core light halo */}
      <circle cx="32" cy="27" r="4" className="fill-[#d4ff00]/30 stroke-[#d4ff00]" strokeWidth="1" />
    </svg>
  );
}

/** Road Lamp V1: Curved minimalist suspended bell shade with hanging cord */
export function RoadLampIcon({ className = '', size = 48, strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Suspension cord drop */}
      <line x1="32" y1="4" x2="32" y2="20" strokeWidth={strokeWidth * 1.2} />
      <rect x="29" y="16" width="6" height="5" rx="1" />
      {/* Flared bell shade contour */}
      <path d="M29 21 C29 28, 12 36, 12 46 L52 46 C52 36, 35 28, 35 21 Z" />
      {/* Shade aperture ellipse */}
      <ellipse cx="32" cy="46" rx="20" ry="4" />
      {/* Micro woven horizontal lines */}
      <path d="M18 38 Q32 34 46 38" strokeDasharray="2 2" />
      <path d="M22 32 Q32 29 42 32" strokeDasharray="2 2" />
      {/* Warm downlight beacon */}
      <circle cx="32" cy="46" r="3" className="fill-[#d4ff00]/40 stroke-[#d4ff00]" strokeWidth="1" />
    </svg>
  );
}

/** David Sliced Lamp: 17 deconstructed horizontal architectural strata slices */
export function DavidSlicedIcon({ className = '', size = 48, strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Classical bust contour rendered as horizontal stacked slices */}
      <line x1="26" y1="12" x2="38" y2="12" />
      <line x1="23" y1="16" x2="41" y2="16" />
      <line x1="21" y1="20" x2="43" y2="20" />
      <line x1="22" y1="24" x2="42" y2="24" />
      <line x1="24" y1="28" x2="40" y2="28" />
      <line x1="25" y1="32" x2="41" y2="32" />
      <line x1="26" y1="36" x2="42" y2="36" />
      <line x1="27" y1="40" x2="41" y2="40" />
      <line x1="25" y1="44" x2="43" y2="44" />
      <line x1="22" y1="48" x2="46" y2="48" />
      <line x1="18" y1="52" x2="50" y2="52" strokeWidth={strokeWidth * 1.2} />
      {/* Solid plinth */}
      <rect x="16" y="55" width="36" height="5" rx="1.5" strokeWidth={strokeWidth * 1.3} />
      {/* Internal amber dispersion core indicator */}
      <circle cx="33" cy="28" r="4" className="fill-[#d4ff00]/30 stroke-[#d4ff00]" strokeWidth="1" />
    </svg>
  );
}

/** Crystal Summit Desk Lamp: Crystalline angular mountain ridge vertices */
export function CrystalSummitIcon({ className = '', size = 48, strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Alpine mountain ridge facets */}
      <polygon points="32,12 18,48 46,48" strokeWidth={strokeWidth} />
      <line x1="32" y1="12" x2="30" y2="48" />
      <line x1="32" y1="12" x2="38" y2="34" />
      {/* Secondary jagged peaks */}
      <polyline points="14,48 22,28 32,38" />
      <polyline points="32,38 42,24 50,48" />
      {/* Plinth Base */}
      <rect x="10" y="50" width="44" height="6" rx="2" />
      {/* Crystalline summit light glow */}
      <circle cx="32" cy="12" r="2.5" className="fill-[#d4ff00] stroke-none" />
    </svg>
  );
}

/** Aura Lamp Collection: Fluted column base with undulating wave optics */
export function AuraLampIcon({ className = '', size = 48, strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Undulating optic glass-look shade */}
      <path d="M22 12 Q14 22 24 30 Q32 34 40 30 Q50 22 42 12 Q32 10 22 12 Z" />
      <ellipse cx="32" cy="12" rx="10" ry="2.5" />
      {/* Fluted column base */}
      <rect x="25" y="32" width="14" height="20" rx="1" />
      <line x1="28" y1="32" x2="28" y2="52" strokeDasharray="1 2" />
      <line x1="32" y1="32" x2="32" y2="52" />
      <line x1="36" y1="32" x2="36" y2="52" strokeDasharray="1 2" />
      {/* Step plinth */}
      <rect x="21" y="52" width="22" height="4" rx="1.5" />
      {/* Glow bulb */}
      <circle cx="32" cy="22" r="3.5" className="fill-[#d4ff00]/40 stroke-[#d4ff00]" strokeWidth="1" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. CEMENTWARE OBJECTS (BRUTALIST MINIMAL VECTOR)
// ─────────────────────────────────────────────────────────────────────────────

/** Cement Incense Holder: Minimal raw cement trough with longitudinal groove */
export function CementIncenseIcon({ className = '', size = 48, strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Isometric/orthogonal block */}
      <polygon points="8,38 48,22 56,26 16,42" />
      <polygon points="8,38 16,42 16,50 8,46" />
      <polygon points="16,42 56,26 56,34 16,50" />
      {/* Central catch groove */}
      <line x1="16" y1="36" x2="48" y2="24" strokeWidth={strokeWidth * 1.5} />
      {/* Incense stick aperture */}
      <circle cx="48" cy="24" r="1.5" className="fill-ink" />
      {/* Angled incense stick line */}
      <line x1="48" y1="24" x2="32" y2="8" strokeWidth="1" strokeDasharray="none" />
      <circle cx="32" cy="8" r="1" className="fill-[#d4ff00]" />
    </svg>
  );
}

/** Cement Candle Holder: Solid cylindrical cement pedestal with candle cup */
export function CementCandleIcon({ className = '', size = 48, strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Top rim */}
      <ellipse cx="32" cy="24" rx="18" ry="6" />
      {/* Recessed candle aperture */}
      <ellipse cx="32" cy="24" rx="8" ry="3" />
      {/* Cylinder body */}
      <path d="M14 24 L14 46 C14 52, 50 52, 50 46 L50 24" />
      {/* Bottom base curve */}
      <path d="M14 46 C14 52, 50 52, 50 46" />
      {/* Candle flame indicator */}
      <path d="M32 21 C30 18, 30 14, 32 10 C34 14, 34 18, 32 21 Z" className="fill-[#d4ff00] stroke-[#d4ff00]" strokeWidth="0.5" />
    </svg>
  );
}

/** Cement Catchall Tray: Organic rounded dish with raised perimeter lip */
export function CementCatchallIcon({ className = '', size = 48, strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Outer lip rim */}
      <ellipse cx="32" cy="30" rx="24" ry="12" />
      {/* Inner basin depression */}
      <ellipse cx="32" cy="31" rx="18" ry="8" strokeDasharray="2 2" />
      {/* Depth sides */}
      <path d="M8 30 L8 38 C8 48, 56 48, 56 38 L56 30" />
      <path d="M8 38 C8 48, 56 48, 56 38" />
    </svg>
  );
}

/** Cement Desk Plinth: Geometric brutalist plinth with micro-chamfers */
export function CementPlinthIcon({ className = '', size = 48, strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Orthogonal top face */}
      <polygon points="32,16 52,26 32,36 12,26" />
      {/* Chamfer front left */}
      <polygon points="12,26 32,36 32,48 12,38" />
      {/* Chamfer front right */}
      <polygon points="32,36 52,26 52,38 32,48" />
      {/* Technical coordinate marker */}
      <circle cx="32" cy="26" r="2" className="fill-[#d4ff00] stroke-none" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. CENTRAL HERO ORB GLYPH (DEEPGRAM-STYLE RADIAL EMITTER)
// ─────────────────────────────────────────────────────────────────────────────

export function HeroRadialOrb({ className = '', size = 280 }: { className?: string; size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      {/* Outer ambient blur aura */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(212,255,0,0.65)_0%,rgba(212,255,0,0.22)_45%,transparent_75%)] blur-2xl animate-pulse" />
      
      {/* Central vibrant orb body */}
      <div className="relative flex h-full w-full items-center justify-center rounded-full border border-ink/20 bg-[radial-gradient(circle_at_40%_35%,#f5ff80_0%,#d4ff00_50%,#b8e600_85%,#99c200_100%)] shadow-[inset_0_2px_12px_rgba(255,255,255,0.8),0_12px_40px_rgba(212,255,0,0.4)]">
        {/* Concentric hairline orbit rings */}
        <div className="absolute h-[85%] w-[85%] rounded-full border border-ink/15 border-dashed" />
        <div className="absolute h-[68%] w-[68%] rounded-full border border-ink/10" />
        <div className="absolute h-[50%] w-[50%] rounded-full border border-ink/20" />

        {/* Technical radial ticks around circumference */}
        <svg className="absolute inset-0 h-full w-full animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 7" className="text-ink/30" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 9" className="text-ink/25" />
        </svg>

        {/* Black audio/light core dial */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-ink/40 bg-ink shadow-2xl">
          {/* Studio nozzle / light wave icon */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-[#d4ff00]">
            {/* Center print beacon */}
            <circle cx="18" cy="18" r="4" fill="currentColor" />
            <path d="M18 6 L18 10 M18 26 L18 30 M6 18 L10 18 M26 18 L30 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* Concentric signal arcs */}
            <path d="M11 11 C7 15, 7 21, 11 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1.5 2.5" />
            <path d="M25 11 C29 15, 29 21, 25 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1.5 2.5" />
          </svg>
        </div>

        {/* Floating waveform indicators left & right */}
        <div className="absolute left-6 flex items-center gap-1 opacity-70">
          <span className="h-2 w-0.5 bg-ink rounded-full" />
          <span className="h-4 w-0.5 bg-ink rounded-full" />
          <span className="h-6 w-0.5 bg-ink rounded-full" />
          <span className="h-3 w-0.5 bg-ink rounded-full" />
        </div>
        <div className="absolute right-6 flex items-center gap-1 opacity-70">
          <span className="h-3 w-0.5 bg-ink rounded-full" />
          <span className="h-6 w-0.5 bg-ink rounded-full" />
          <span className="h-4 w-0.5 bg-ink rounded-full" />
          <span className="h-2 w-0.5 bg-ink rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. ICON DISPATCHER
// ─────────────────────────────────────────────────────────────────────────────

export function getProductIcon(slug: string, props: IconProps = {}) {
  switch (slug) {
    case 'modern-shoji-lamp':
      return <ModernShojiIcon {...props} />;
    case 'boofa-table-lamp':
      return <BoofaLampIcon {...props} />;
    case 'hot-air-balloon-lamp':
      return <HotAirBalloonIcon {...props} />;
    case 'road-lamp-v1':
      return <RoadLampIcon {...props} />;
    case 'david-sliced-lamp':
      return <DavidSlicedIcon {...props} />;
    case 'crystal-summit-desk-lamp':
      return <CrystalSummitIcon {...props} />;
    case 'aura-lamp-collection':
      return <AuraLampIcon {...props} />;
    case 'cement-incense-holder':
      return <CementIncenseIcon {...props} />;
    case 'cement-candle-holder':
      return <CementCandleIcon {...props} />;
    case 'cement-catchall-tray':
      return <CementCatchallIcon {...props} />;
    case 'cement-desk-plinth':
      return <CementPlinthIcon {...props} />;
    default:
      return <ModernShojiIcon {...props} />;
  }
}
