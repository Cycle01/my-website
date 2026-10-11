import Link from "next/link"
import { ScrollWords } from "@/components/studio/scroll-words"

export function StudioIntro() {
  return (
    <section id="studio" aria-labelledby="studio-heading" className="scroll-mt-4 pt-24 md:pt-40">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <h2 id="studio-heading" data-sr className="s-h2">
          Studio
        </h2>
        <div data-sr className="s-rule mt-6 md:mt-8" aria-hidden="true" />

        <div className="mt-10 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-10 lg:col-span-9">
            <ScrollWords
              className="text-[clamp(1.6rem,3.3vw,3.1rem)] font-medium leading-[1.16] tracking-[-0.03em]"
              parts={[
                {
                  text: "I’m Bogdan, known online as Cycle01. Cycle’s Studios is where I make games independently, mostly in Unreal Engine 5 and alongside my studies: atmospheric horror for PC and mobile, with the occasional lighter experiment.",
                },
                { text: "Right now, that means Secrets of Sundown 2.", className: "text-[color:var(--accent)]" },
              ]}
            />
            <div data-sr className="mt-8">
              <Link href="/portfolio" className="inline-flex min-h-11 items-center text-[16px]">
                <span className="s-link">The longer story is in my personal portfolio</span>&nbsp;
                <span className="s-arrow s-arrow-r" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
