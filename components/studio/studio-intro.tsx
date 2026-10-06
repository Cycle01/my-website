import Link from "next/link"

export function StudioIntro() {
  return (
    <section id="studio" aria-labelledby="studio-heading" className="pt-24 md:pt-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-12 md:gap-10 md:px-10">
        <h2 id="studio-heading" className="flex items-baseline gap-4 md:col-span-4">
          <span aria-hidden="true" className="font-mono text-[12px] text-[color:var(--accent)]">03</span>
          <span className="s-serif text-[clamp(3rem,7vw,6rem)] leading-[0.9]">Studio</span>
        </h2>
        <div className="md:col-span-8 md:pt-4 lg:col-span-7">
          <p className="text-[clamp(1.35rem,2.2vw,1.95rem)] leading-[1.3] tracking-[-0.02em]">
            I&rsquo;m Bogdan, known online as Cycle01. Cycle&rsquo;s Studios is where I make games independently, mostly in Unreal Engine
            5 and alongside my studies: atmospheric horror for PC and mobile, with the occasional lighter experiment.{" "}
            <span className="text-muted-foreground">Right now, that means Secrets of Sundown 2.</span>
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
