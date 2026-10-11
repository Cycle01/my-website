import { asset } from "@/lib/asset"

/**
 * The hero's one graphic: thin concentric rings turning at different speeds
 * around the studio's figure, each carrying a small light. It is plain SVG and
 * CSS (no image behind the title), decorative, and hidden from assistive tech.
 */
export function OrbitArt({ className = "" }: { className?: string }) {
  return (
    <div className={`s-orbit pointer-events-none ${className}`} style={{ position: "absolute" }} aria-hidden="true">
      <svg viewBox="-300 -300 600 600" className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id="orbit-core" r="50%">
            <stop offset="0" stopColor="#e2683c" stopOpacity="0.22" />
            <stop offset="1" stopColor="#e2683c" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle r="150" fill="url(#orbit-core)" />
        <circle r="290" fill="none" stroke="rgba(237,233,226,0.07)" />
        <g className="s-spin s-spin-rev">
          <circle r="232" fill="none" stroke="rgba(237,233,226,0.12)" strokeDasharray="2 9" />
          <circle cx="232" cy="0" r="3.5" fill="#ede9e2" />
          <circle cx="-232" cy="0" r="2" fill="rgba(237,233,226,0.5)" />
        </g>
        <g className="s-spin">
          <circle r="172" fill="none" stroke="rgba(237,233,226,0.2)" />
          <circle cx="0" cy="-172" r="5" fill="#e2683c" />
          <circle cx="0" cy="-172" r="12" fill="none" stroke="rgba(226,104,60,0.4)" />
        </g>
        <g className="s-spin s-spin-fast s-spin-rev">
          <circle r="112" fill="none" stroke="rgba(237,233,226,0.14)" strokeDasharray="60 14 6 14" />
          <circle cx="112" cy="0" r="2.5" fill="rgba(237,233,226,0.8)" />
        </g>
        <image href={asset("/images/studio/logo-figure.webp")} x="-34" y="-72" width="68" height="144" opacity="0.95" />
      </svg>
    </div>
  )
}
