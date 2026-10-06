import { projects } from "@/lib/studio"

/** A slow band of the game titles between the hero and the games. Decorative: the real list follows. */
export function GameMarquee() {
  const titles = projects.map((p) => p.title)
  return (
    <div className="s-marquee-mask relative overflow-hidden border-y border-[color:var(--border)] py-5 md:py-7" aria-hidden="true">
      <ul className="s-marquee">
        {[0, 1].map((copy) =>
          titles.map((t) => (
            <li key={`${copy}-${t}`} className="flex shrink-0 items-center">
              <span className="s-outline px-6 text-[clamp(2.25rem,6vw,5rem)] font-medium leading-none tracking-[-0.04em] md:px-10">{t}</span>
              <span className="h-2 w-2 rounded-full border border-[color:var(--accent)]" />
            </li>
          )),
        )}
      </ul>
    </div>
  )
}
