const items: { text: string; zh?: boolean }[] = [
  { text: "Secrets of Sundown 2" },
  { text: "游戏", zh: true },
  { text: "Fling It" },
  { text: "AdBlock Pro" },
  { text: "梦想", zh: true },
  { text: "AI Tab Grouper Pro" },
  { text: "Indie Radar" },
  { text: "创造", zh: true },
  { text: "IronMade" },
  { text: "Unreal Engine 5" },
  { text: "平安", zh: true },
  { text: "Godot" },
  { text: "Vibe Coding" },
]

export function Marquee() {
  // Rendered twice so the -50% translate loops seamlessly.
  const loop = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-border bg-card/40 py-5 marquee-mask" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            {item.zh ? (
              <span lang="zh-Hans" className="font-brush text-2xl text-primary/80">
                {item.text}
              </span>
            ) : (
              <span className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground">{item.text}</span>
            )}
            <span className="h-1.5 w-1.5 rotate-45 bg-accent/60" />
          </span>
        ))}
      </div>
    </div>
  )
}
