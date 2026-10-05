import { DevNote } from "@/components/studio/dev-note"
import { HeroShot } from "@/components/studio/hero-shot"

export function StudioHero() {
  return (
    <section id="top" aria-labelledby="studio-title" className="mx-auto max-w-[1440px] px-4 pb-16 pt-10 sm:px-6 md:px-10 md:pb-20 md:pt-12">
      <h1
        id="studio-title"
        className="text-[clamp(4rem,19vw,7rem)] font-medium leading-[0.86] tracking-[-0.055em] md:text-[clamp(6rem,10.5vw,11rem)]"
      >
        <span className="s-line">
          <span>Cycle&rsquo;s</span>
        </span>{" "}
        <span className="s-line pl-[0.9em] md:pl-[1.55em]">
          <span style={{ animationDelay: "90ms" }}>Studios</span>
        </span>
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-12 md:mt-12 md:grid-cols-12 md:gap-10">
        <div className="flex flex-col md:col-span-5 lg:col-span-4">
          <p className="s-fade max-w-sm text-xl leading-snug tracking-[-0.01em]" style={{ animationDelay: "260ms" }}>
            Independent games by Bogdan / Cycle01.
          </p>
          <p className="s-fade mt-3 max-w-sm text-[16px] leading-relaxed text-muted-foreground" style={{ animationDelay: "320ms" }}>
            Atmospheric horror for PC and mobile, built in Unreal Engine 5, with the occasional lighter experiment.
          </p>
          <a href="#games" className="s-fade mt-6 inline-flex min-h-11 w-fit items-center text-[16px]" style={{ animationDelay: "380ms" }}>
            <span className="s-link">Explore the games</span>&nbsp;<span className="s-arrow s-arrow-d" aria-hidden="true">↓</span>
          </a>
          <div className="s-fade mt-10 md:mt-auto md:pt-10" style={{ animationDelay: "440ms" }}>
            <DevNote />
          </div>
        </div>

        <HeroShot className="md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7" />
      </div>
    </section>
  )
}
