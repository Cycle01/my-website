import Image from "next/image"
import type { ReactNode } from "react"
import { Settings, ShieldCheck, Youtube, Layers, Link2, EyeOff } from "lucide-react"
import { CountUp } from "@/components/count-up"
import type { Extension } from "@/lib/projects"

/* Browser-window frame shared by every preview. */
function BrowserFrame({ url, children, tone = "dark", label }: { url: string; children: ReactNode; tone?: "dark" | "steam"; label?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-[#0d0d12] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-3 border-b border-white/5 bg-[#16161d] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="min-w-0 flex-1 truncate rounded-md bg-black/40 px-3 py-1 font-mono text-[10px] text-white/50">{url}</div>
        {label && (
          <span className="shrink-0 rounded-md border border-white/10 bg-black/40 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
            {label}
          </span>
        )}
      </div>
      <div className={`relative ${tone === "steam" ? "bg-[#1b2838]" : "bg-[#0f0f14]"}`}>{children}</div>
    </div>
  )
}

function Toggle() {
  return (
    <span className="relative inline-flex h-4 w-7 shrink-0 items-center rounded-full bg-[#8b5cf6]">
      <span className="absolute right-0.5 h-3 w-3 rounded-full bg-white" />
    </span>
  )
}

export function AdBlockPreview() {
  const filters = [
    { icon: Youtube, title: "YouTube Ads", sub: "Block pre-roll & mid-roll ads", color: "text-red-400" },
    { icon: Layers, title: "Popups & Overlays", sub: "Block popup windows & overlays", color: "text-sky-400" },
    { icon: Link2, title: "Redirect Links", sub: "Skip tracking redirects", color: "text-amber-400" },
    { icon: EyeOff, title: "Anti-Adblock Bypass", sub: "Hide adblock walls & detection", color: "text-emerald-400" },
  ]
  return (
    <BrowserFrame url="https://www.youtube.com/watch" label="UI recreation">
      <div className="flex gap-4 p-4">
        {/* Page skeleton */}
        <div className="hidden min-w-0 flex-1 sm:block">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-[#3a0d0d] to-[#140606]">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="rounded-full border border-[#8b5cf6]/50 bg-[#8b5cf6]/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#c4b5fd]">
                Ad blocked
              </span>
            </div>
          </div>
          <div className="mt-3 h-2.5 w-1/2 rounded bg-white/10" />
          <div className="mt-2 h-2.5 w-1/3 rounded bg-white/5" />
          <div className="mt-6 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-video rounded-md bg-white/5" />
            ))}
          </div>
        </div>

        {/* Popup */}
        <div className="w-full shrink-0 rounded-xl border border-white/10 bg-[#14111f] p-3 shadow-2xl sm:w-[250px]">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] text-white">
              <ShieldCheck className="h-3.5 w-3.5 text-[#a78bfa]" />
              AdBlock <span className="font-bold">Pro</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] text-white/40">
              v2.2.0 <Settings className="h-3 w-3" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative mb-2 flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#8b5cf6]/30 blur-xl animate-pulse-glow" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-b from-[#a78bfa] to-[#7c3aed]">
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" /> Protected
            </div>
            <div className="text-[8px] text-white/40">Click the shield to pause on this site</div>
          </div>
          <div className="mt-3 grid grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-2 text-center">
            {[
              { n: 25, l: "Ads" },
              { n: 0, l: "Trackers" },
              { n: 18, l: "YT Ads" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-sm font-bold text-white">
                  <CountUp value={s.n} duration={1000} />
                </div>
                <div className="text-[8px] uppercase tracking-wider text-white/40">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-[8px] uppercase tracking-[0.2em] text-white/40">Quick filters</div>
          <div className="mt-1.5 space-y-1.5">
            {filters.map((f) => (
              <div key={f.title} className="flex items-center gap-2 rounded-md bg-white/[0.03] px-2 py-1.5">
                <f.icon className={`h-3 w-3 shrink-0 ${f.color}`} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[9px] text-white">{f.title}</div>
                  <div className="truncate text-[7px] text-white/40">{f.sub}</div>
                </div>
                <Toggle />
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1 text-center text-[8px]">
            <span className="rounded border border-[#8b5cf6]/60 bg-[#8b5cf6]/20 py-1 text-white">Smart</span>
            <span className="rounded border border-white/10 py-1 text-white/50">Aggressive</span>
            <span className="rounded border border-white/10 py-1 text-white/50">No Scripts</span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2 text-[9px] text-white/40">
            All-time blocked
            <span className="font-bold text-white">
              <CountUp value={187} duration={1600} />
            </span>
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}

const wishlist = [
  { name: "Heat or Die", was: "$2.99", now: "$1.58", save: "$1.41", indie: true },
  { name: "Thief Simulator 2", was: "$19.99", now: "$4.39", save: "$15.60", indie: true },
  { name: "Mouthwashing", was: "$12.99", now: "$7.79", save: "$5.20", indie: true },
  { name: "Still Wakes the Deep", was: "$34.99", now: "$8.74", save: "$26.25", indie: true, highlight: true },
]

const blips = [
  { top: "22%", left: "58%", color: "bg-teal-300", delay: "0s" },
  { top: "38%", left: "30%", color: "bg-orange-400", delay: "0.6s" },
  { top: "62%", left: "66%", color: "bg-teal-300", delay: "1.1s" },
  { top: "70%", left: "40%", color: "bg-slate-300", delay: "1.7s" },
  { top: "46%", left: "76%", color: "bg-orange-400", delay: "0.3s" },
  { top: "30%", left: "44%", color: "bg-red-400", delay: "1.4s" },
]

export function IndieRadarPreview() {
  return (
    <BrowserFrame url="https://store.steampowered.com" tone="steam" label="UI recreation">
      <div className="flex gap-4 p-4">
        {/* Steam-like page skeleton */}
        <div className="hidden min-w-0 flex-1 space-y-3 sm:block">
          <div className="h-3 w-24 rounded bg-white/15" />
          <div className="aspect-[16/9] rounded-md bg-gradient-to-br from-[#2a475e] to-[#0e1a26]" />
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-[4/3] rounded bg-[#2a475e]/60" />
            ))}
          </div>
          <div className="h-2.5 w-2/3 rounded bg-white/10" />
        </div>

        {/* Popup */}
        <div className="w-full shrink-0 rounded-md border border-[#1f2a24] bg-[#0b100e] p-2.5 font-mono shadow-2xl sm:w-[260px]">
          <div className="mb-2 flex items-center justify-between text-[9px]">
            <span className="flex items-center gap-1.5 font-bold tracking-[0.15em] text-orange-400">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" /> INDIE RADAR
            </span>
            <span className="tracking-[0.15em] text-white/40">TRACKING</span>
          </div>
          <div className="mb-2 grid grid-cols-3 text-center text-[8px] tracking-[0.15em]">
            <span className="border-b border-orange-400 pb-1 text-orange-300">RADAR</span>
            <span className="border-b border-white/10 pb-1 text-white/40">COMPETITION</span>
            <span className="border-b border-white/10 pb-1 text-white/40">SETUP</span>
          </div>

          <div className="relative mx-auto aspect-square w-[62%]">
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-[16%] rounded-full border border-white/10" />
            <div className="absolute inset-[33%] rounded-full border border-white/10" />
            <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
            <div className="absolute left-0 top-1/2 h-px w-full bg-white/10" />
            <div
              className="absolute inset-0 rounded-full animate-radar"
              style={{ background: "conic-gradient(from 0deg, rgba(251,146,60,0.55), rgba(251,146,60,0) 70deg, transparent 360deg)" }}
            />
            {blips.map((b, i) => (
              <span
                key={i}
                className={`absolute h-1.5 w-1.5 rounded-full ${b.color} animate-blip`}
                style={{ top: b.top, left: b.left, animationDelay: b.delay }}
              />
            ))}
          </div>

          <div className="mt-2 grid grid-cols-3 gap-1 text-center">
            {[
              { v: <CountUp value={120} duration={1200} />, l: "SHOWING" },
              { v: <CountUp value={41} duration={1200} />, l: "ON SALE" },
              { v: "-90%", l: "BEST CUT" },
            ].map((s) => (
              <div key={s.l} className="rounded border border-white/10 py-1">
                <div className="text-[11px] font-bold text-orange-400">{s.v}</div>
                <div className="text-[7px] tracking-[0.15em] text-white/40">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-2 text-[8px] tracking-[0.15em] text-white/40">WISHLIST · BEST DEALS</div>
          <div className="mt-1 space-y-1">
            {wishlist.map((g) => (
              <div
                key={g.name}
                className={`rounded border px-1.5 py-1 ${g.highlight ? "border-orange-400/60 bg-orange-400/5" : "border-white/5"}`}
              >
                <div className="flex items-center justify-between text-[8.5px]">
                  <span className="truncate text-white/85">{g.name}</span>
                  <span className="shrink-0">
                    <span className="mr-1 text-white/30 line-through">{g.was}</span>
                    <span className="font-bold text-orange-300">{g.now}</span>
                  </span>
                </div>
                <div className="mt-0.5 flex items-center justify-between text-[7px]">
                  <span className="text-emerald-400">save {g.save}</span>
                  <span className="flex gap-1">
                    {g.indie && <span className="rounded border border-white/15 px-1 text-white/50">INDIE</span>}
                    <span className="rounded border border-emerald-400/40 px-1 text-emerald-300">GOOD</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}

const tabGroups = [
  { label: "Work & Productivity", color: "bg-blue-500", count: 4 },
  { label: "Entertainment", color: "bg-red-500", count: 3 },
  { label: "Social Media", color: "bg-yellow-400", count: 2 },
  { label: "Study & Learning", color: "bg-green-500", count: 2 },
  { label: "Shopping", color: "bg-orange-500", count: 1 },
]

export function TabGrouperPreview({ screenshots }: { screenshots: Extension["screenshots"] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-[#0d0d12] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
      {/* Tab strip with the groups the extension created */}
      <div className="flex items-center gap-2 overflow-hidden border-b border-white/5 bg-[#16161d] px-3 py-2.5">
        <div className="mr-1 flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex min-w-0 gap-1.5">
          {tabGroups.map((g) => (
            <span
              key={g.label}
              className={`${g.color} shrink-0 whitespace-nowrap rounded-md px-2 py-0.5 text-[9px] font-semibold text-black/80`}
            >
              {g.label} · {g.count}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 bg-[#0f0f14] p-3 sm:gap-4 sm:p-4">
        {screenshots.map((shot, i) => (
          <figure key={shot.src} className={i === 1 ? "translate-y-6" : ""}>
            <div className="relative aspect-[39/64] overflow-hidden rounded-xl border border-white/10 shadow-xl">
              <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 1024px) 280px, 45vw" className="object-cover object-top" />
            </div>
            <figcaption className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="h-6 bg-[#0f0f14]" />
    </div>
  )
}

/* Generic real-screenshot gallery for extensions that ship real screenshots
   (used once AdBlock Pro / Indie Radar screenshots are added to lib/projects.ts). */
export function ScreenshotGallery({ screenshots }: { screenshots: Extension["screenshots"] }) {
  const [main, ...rest] = screenshots
  return (
    <div className="space-y-3">
      <figure className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
        <Image src={main.src} alt={main.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
      </figure>
      {rest.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {rest.slice(0, 3).map((shot) => (
            <figure key={shot.src} className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border">
              <Image src={shot.src} alt={shot.alt} fill sizes="180px" className="object-cover" />
            </figure>
          ))}
        </div>
      )}
    </div>
  )
}
