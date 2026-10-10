import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { asset } from "@/lib/asset"
import { releasedGames } from "@/lib/projects"

/*
  Three projects up front, before the biography: what each game is, what I
  built, and, where there is a true one to tell, a hard call and what it
  taught me. Fields without a real answer are left out rather than filled in.
  The three entries deliberately use different layouts.
*/

const game = (title: string) => releasedGames.find((g) => g.title === title)!

const sundown = game("Secrets of Sundown")
const moonfall = game("Moonfall: Protocol")
const ironmade = game("IronMade")

function Note({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <div className="mt-1 leading-relaxed text-muted-foreground">{children}</div>
    </div>
  )
}

function StoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 text-foreground underline decoration-border underline-offset-[6px] transition-colors hover:decoration-primary"
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  )
}

export function SelectedWork() {
  return (
    <section id="work" className="relative px-6 py-32">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="Selected work" zh="作品" title="Three games, and what making them was like" />

        {/* 1. Secrets of Sundown: a large in-game screenshot, then plain text. */}
        <article className="mb-28">
          <Reveal>
            <figure>
              <div className="relative aspect-[16/8] overflow-hidden rounded-xl border border-border">
                <Image
                  src={asset("/images/studio/games/sos-flashlight.webp")}
                  alt="Secrets of Sundown, in-game: a flashlight beam catches a bear at the edge of the forest at night"
                  fill
                  sizes="(min-width: 1152px) 1152px, 100vw"
                  className="object-cover"
                  style={{ objectPosition: "45% 60%" }}
                />
              </div>
              <figcaption className="mt-3 text-sm text-muted-foreground">Secrets of Sundown, in-game.</figcaption>
            </figure>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_1fr]">
            <Reveal>
              <h3 className="text-3xl font-bold text-foreground md:text-4xl">Secrets of Sundown</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                PC, {sundown.year}. Rated {sundown.rating} on itch.io.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                A first-person psychological horror game set in Sundown, a suburb that isn&apos;t quite right. You explore a semi-open
                neighbourhood, make choices, and work out what the town is hiding, with a VHS look over everything.
              </p>
            </Reveal>
            <Reveal delay={120} className="space-y-6 md:pt-2">
              <Note label="What I built">
                All of it, on my own, in Unreal Engine 5 with C++ and Blueprints: the design, the code, the levels, the lighting and
                the sound, including the stalker mechanics and the choice-driven decisions.
              </Note>
              <StoreLink href={sundown.link}>Play it on itch.io</StoreLink>
            </Reveal>
          </div>
        </article>

        {/* 2. Moonfall: Protocol: text on the left, a step list for the loop, art on the right. */}
        <article className="mb-28 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <Reveal>
            <h3 className="text-3xl font-bold text-foreground md:text-4xl">Moonfall: Protocol</h3>
            <p className="mt-2 text-sm text-muted-foreground">PC, {moonfall.year}. On Steam.</p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Co-op survival horror for one to four players. A mission to walk on the moon turns into a hidden base, strange
              astronauts and a portal into somewhere worse.
            </p>
            <p className="mt-8 text-sm font-semibold text-foreground">How a run works</p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 leading-relaxed text-muted-foreground marker:text-muted-foreground">
              <li>You land on the moon with up to three friends.</li>
              <li>You find the hidden base and gather evidence.</li>
              <li>You power ten control points.</li>
              <li>You get the generator running, and only then can you go home.</li>
            </ol>
            <div className="mt-8 space-y-6">
              <Note label="A hard call">
                When my final year of school began, I put my studies first and stopped working on Moonfall before it was the game I
                meant it to be. It wasn&apos;t the success I hoped for, and no further updates are planned. I&apos;d rather say that
                plainly.
              </Note>
              <Note label="What I learned">Scope tighter, and finish what I start.</Note>
              <StoreLink href={moonfall.link}>See it on Steam</StoreLink>
            </div>
          </Reveal>
          <Reveal variant="right" delay={120} className="lg:pt-16">
            <figure>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border lg:aspect-[4/5]">
                <Image
                  src={asset("/images/studio/games/moonfall-crew.webp")}
                  alt="Moonfall: Protocol art: four astronauts in orange suits walking down a lit base corridor"
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="object-cover"
                  style={{ objectPosition: "50% 55%" }}
                />
              </div>
              <figcaption className="mt-3 text-sm text-muted-foreground">Moonfall: Protocol, store art.</figcaption>
            </figure>
          </Reveal>
        </article>

        {/* 3. IronMade: a smaller note beside the image. */}
        <article className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <figure>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border">
                <Image src={ironmade.image!} alt="IronMade screenshot" fill sizes="(min-width: 768px) 520px, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 text-sm text-muted-foreground">IronMade.</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={120}>
            <h3 className="text-3xl font-bold text-foreground md:text-4xl">IronMade</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              PC, {ironmade.year}. Rated {ironmade.rating} on itch.io.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              A medieval action game. A nameless knight escapes a dungeon to find his daughter, Sara.
            </p>
            <div className="mt-8 space-y-6">
              <Note label="A hard call">
                IronMade was meant to be my first entry to the ROG Challenge, but I couldn&apos;t port it to the web in time. I
                released it on its own instead, and built a new entry, The Way Back Ball, in a single day. It placed 22nd out of
                100+ entries.
              </Note>
              <StoreLink href={ironmade.link}>Play it on itch.io</StoreLink>
            </div>
          </Reveal>
        </article>
      </div>
    </section>
  )
}
