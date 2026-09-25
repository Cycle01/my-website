const items = [
  "Secrets of Sundown 2 — in development",
  "Yours — coming 2027",
  "Fling It — later this year",
  "Moonfall: Protocol — out on Steam",
  "Secrets of Sundown — on itch.io",
]

/** A slow strip of what the studio is working on. Static for reduced motion. */
export function Ticker() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="px-6 md:px-10">{item}</span>
          <span className="text-white/25" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="overflow-hidden border-y border-white/[0.08] py-4 font-mono text-[12px] uppercase tracking-[0.1em] text-muted-foreground md:py-5 md:text-[13px]">
      <div className="animate-ticker flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
