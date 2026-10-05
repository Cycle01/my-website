import Link from "next/link"

export function StudioIntro() {
  return (
    <section id="studio" aria-labelledby="studio-heading" className="border-t border-[color:var(--border)]">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 px-4 py-16 sm:px-6 md:grid-cols-12 md:gap-10 md:px-10 md:py-24">
        <h2 id="studio-heading" className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground md:col-span-3 md:pt-2">
          Studio
        </h2>
        <div className="md:col-span-8 lg:col-span-7">
          <p className="text-[clamp(1.35rem,2.2vw,1.9rem)] leading-[1.3] tracking-[-0.02em]">
            I&rsquo;m Bogdan, known online as Cycle01. Cycle&rsquo;s Studios is where I make games independently, mostly in Unreal Engine
            5 and alongside my studies: atmospheric horror for PC and mobile, with the occasional lighter experiment. Right now, that
            means Secrets of Sundown 2.
          </p>
          <Link href="/portfolio" className="mt-6 inline-flex min-h-11 items-center text-[16px]">
            <span className="s-link">The longer story is in my personal portfolio</span>&nbsp;
            <span className="s-arrow s-arrow-r" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
