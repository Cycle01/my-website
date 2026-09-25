import type { CSSProperties } from "react"

/* Decorative Chinese motifs: red lanterns, plum blossoms, a seal stamp and a
   回纹 (fret) border. All purely visual, so everything is aria-hidden. */

interface LanternProps {
  /** Character painted on the lantern. */
  glyph?: string
  size?: number
  /** Length of the hanging string in px. */
  string?: number
  delay?: number
  duration?: number
  className?: string
}

export function Lantern({ glyph = "福", size = 64, string = 60, delay = 0, duration = 5, className = "" }: LanternProps) {
  const id = `lantern-${glyph.charCodeAt(0)}-${size}`
  return (
    <div
      className={`pointer-events-none animate-lantern ${className}`}
      style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
      aria-hidden="true"
    >
      <div className="mx-auto w-px bg-gradient-to-b from-transparent to-accent/70" style={{ height: string }} />
      <div className="relative" style={{ width: size, height: size * 2.05 }}>
        <div
          className="absolute left-1/2 top-[20%] -translate-x-1/2 rounded-full bg-primary/50 blur-2xl animate-lantern-glow"
          style={{ width: size * 1.6, height: size * 1.4, animationDelay: `${delay}s` }}
        />
        <svg viewBox="0 0 60 123" width={size} height={size * 2.05} className="relative">
          <defs>
            <radialGradient id={`${id}-body`} cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor="#ff6a3d" />
              <stop offset="55%" stopColor="#d9261c" />
              <stop offset="100%" stopColor="#7a0f0f" />
            </radialGradient>
            <linearGradient id={`${id}-tassel`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f2c14e" />
              <stop offset="100%" stopColor="#f2c14e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="19" y="2" width="22" height="7" rx="2" fill="#e8b04a" />
          <ellipse cx="30" cy="40" rx="28" ry="31" fill={`url(#${id}-body)`} />
          <ellipse cx="30" cy="40" rx="18" ry="31" fill="none" stroke="#5c0a0a" strokeOpacity="0.45" strokeWidth="1.2" />
          <ellipse cx="30" cy="40" rx="7" ry="31" fill="none" stroke="#5c0a0a" strokeOpacity="0.45" strokeWidth="1.2" />
          <text
            x="30"
            y="49"
            textAnchor="middle"
            fontSize="24"
            fill="#f7d36b"
            style={{ fontFamily: "var(--font-brush)" }}
          >
            {glyph}
          </text>
          <rect x="19" y="70" width="22" height="7" rx="2" fill="#e8b04a" />
          <line x1="30" y1="77" x2="30" y2="84" stroke="#e8b04a" strokeWidth="1.5" />
          <circle cx="30" cy="85.5" r="2.5" fill="#e8b04a" />
          <rect x="25" y="88" width="10" height="34" rx="2" fill={`url(#${id}-tassel)`} />
        </svg>
      </div>
    </div>
  )
}

/* Deterministic petal layout (no Math.random) so server and client render the same markup. */
const PETALS = [
  { left: 4, size: 10, duration: 14, delay: 0 },
  { left: 12, size: 7, duration: 18, delay: 4 },
  { left: 21, size: 12, duration: 16, delay: 9 },
  { left: 30, size: 8, duration: 20, delay: 2 },
  { left: 39, size: 9, duration: 15, delay: 11 },
  { left: 47, size: 6, duration: 19, delay: 6 },
  { left: 55, size: 11, duration: 17, delay: 13 },
  { left: 63, size: 7, duration: 21, delay: 1 },
  { left: 71, size: 10, duration: 16, delay: 8 },
  { left: 79, size: 8, duration: 18, delay: 15 },
  { left: 87, size: 12, duration: 14, delay: 5 },
  { left: 94, size: 7, duration: 20, delay: 10 },
]

export function FallingPetals({ count = PETALS.length, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {PETALS.slice(0, count).map((p, i) => (
        <span
          key={i}
          className="absolute top-0 animate-petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.8,
            animationDuration: `${p.duration}s`,
            animationDelay: `-${p.delay}s`,
            borderRadius: "80% 0 80% 0",
            background: i % 3 === 0 ? "oklch(0.8 0.12 20 / 0.75)" : "oklch(0.7 0.18 22 / 0.6)",
          }}
        />
      ))}
    </div>
  )
}

function Blossom({ x, y, r, rotate = 0 }: { x: number; y: number; r: number; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      {[0, 72, 144, 216, 288].map((a) => {
        const rad = (a * Math.PI) / 180
        return <circle key={a} cx={Math.cos(rad) * r * 0.62} cy={Math.sin(rad) * r * 0.62} r={r * 0.55} fill="#e8475a" fillOpacity="0.85" />
      })}
      <circle r={r * 0.32} fill="#f7d36b" />
    </g>
  )
}

/** A plum blossom (梅花) branch, the flower of resilience through winter. */
export function PlumBranch({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 320 200" className={`pointer-events-none ${className}`} style={style} aria-hidden="true">
      <g stroke="#6b3328" strokeLinecap="round" fill="none">
        <path d="M0 30 C 60 42, 110 64, 160 104 S 250 168, 320 178" strokeWidth="6" />
        <path d="M92 58 C 112 38, 132 26, 156 22" strokeWidth="3.5" />
        <path d="M170 112 C 190 94, 204 76, 212 52" strokeWidth="3.5" />
        <path d="M232 148 C 244 132, 262 124, 282 122" strokeWidth="2.5" />
        <path d="M40 38 C 50 24, 58 16, 70 10" strokeWidth="2.5" />
      </g>
      <Blossom x={156} y={22} r={11} rotate={10} />
      <Blossom x={212} y={52} r={12} rotate={-12} />
      <Blossom x={122} y={72} r={9} rotate={30} />
      <Blossom x={282} y={122} r={10} rotate={5} />
      <Blossom x={70} y={10} r={8} rotate={-20} />
      <Blossom x={192} y={126} r={8} rotate={40} />
      <Blossom x={262} y={172} r={11} rotate={-5} />
      <circle cx={100} cy={46} r={3.5} fill="#e8475a" />
      <circle cx={236} cy={140} r={3} fill="#e8475a" />
      <circle cx={180} cy={84} r={3} fill="#e8475a" />
    </svg>
  )
}

/** Red seal stamp (印章) with characters stacked vertically. */
export function Seal({ text, size = 56, className = "", style }: { text: string; size?: number; className?: string; style?: CSSProperties }) {
  return (
    <div
      lang="zh-Hans"
      aria-hidden="true"
      className={`inline-flex items-center justify-center rounded-md border-2 border-[#f3b8a8]/40 bg-[#c8241b] font-brush text-[#fdebd3] shadow-[0_0_24px_rgba(200,36,27,0.45),inset_0_0_8px_rgba(0,0,0,0.35)] ${className}`}
      style={{ width: size, minHeight: size, fontSize: size * 0.4, lineHeight: 1.05, padding: size * 0.1, ...style }}
    >
      <span className="vertical-text">{text}</span>
    </div>
  )
}

/** Horizontal 回纹 (Chinese fret) border strip. */
export function FretBorder({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg className={`pointer-events-none h-4 w-full ${className}`} aria-hidden="true">
      <defs>
        <pattern id={id} width="24" height="16" patternUnits="userSpaceOnUse">
          <path d="M1 15 V1 H19 V11 H7 V5 H14 V8" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M19 15 H24" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M0 15 H1" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
