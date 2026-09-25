import { KineticWordmark } from "@/components/studio/kinetic-wordmark"

const facts = [
  { label: "Founded by", value: "Bogdan (Cycle01)" },
  { label: "Focus", value: "Atmospheric horror" },
  { label: "Platforms", value: "PC & mobile" },
  { label: "Released", value: "6 games" },
]

export function StudioHero() {
  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-end px-5 pb-10 pt-28 md:px-10 md:pb-14" aria-label="Cycle Studios">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="mb-10 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground md:mb-14">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7dd97d] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7dd97d]" />
          </span>
          Now building Secrets of Sundown 2
        </div>

        <KineticWordmark lines={["Cycle", "Studios"]} />

        <div className="mt-12 grid grid-cols-1 gap-10 border-t border-white/[0.08] pt-8 md:mt-16 md:grid-cols-[1.2fr_2fr] md:gap-16">
          <p className="max-w-md text-lg leading-snug text-foreground md:text-xl">
            An independent game studio of one. I make atmospheric horror games for PC and mobile.
          </p>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{f.label}</dt>
                <dd className="mt-2 text-[15px] text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
