import { ArtImage } from "@/components/studio/art-image"
import { yours } from "@/lib/studio"

/** The Yours announcement, deliberately quieter than Secrets of Sundown 2. */
export function YoursTeaser() {
  const [first, ...rest] = yours.body
  return (
    <section id="yours" className="scroll-mt-16 pt-20 md:pt-32" aria-labelledby="yours-title">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 border-t border-[color:var(--border)] px-4 pt-12 sm:px-6 md:grid-cols-12 md:gap-10 md:px-10 md:pt-16">
        <figure className="s-reveal md:col-span-5">
          <div className="aspect-[16/9] overflow-hidden bg-[#13110f]">
            <ArtImage art={yours.keyArt} />
          </div>
          <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">Yours · Key art</figcaption>
        </figure>

        <div className="s-reveal md:col-span-7 md:pl-4" style={{ transitionDelay: "80ms" }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
            Also announced · <span className="text-foreground/80">{yours.status}</span>
          </p>
          <h2 id="yours-title" className="mt-3 text-3xl font-medium tracking-[-0.035em] text-foreground md:text-4xl">
            {yours.title}
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-foreground/85">{yours.lead}</p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{first}</p>
          <details className="group mt-5 max-w-2xl border-y border-[color:var(--border)]">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-[15px] text-foreground transition-colors duration-150 hover:text-[#c9a46a] [&::-webkit-details-marker]:hidden">
              Read the premise
              <span aria-hidden="true" className="text-muted-foreground transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="space-y-3 pb-4 text-[15px] leading-relaxed text-foreground/75">
              {rest.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </details>
        </div>
      </div>
    </section>
  )
}
