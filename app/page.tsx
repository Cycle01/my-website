import { StudioNav } from "@/components/studio/studio-nav"
import { StudioHero } from "@/components/studio/studio-hero"
import { SundownFeature } from "@/components/studio/sundown-feature"
import { YoursTeaser } from "@/components/studio/yours-teaser"
import { GamesIndex } from "@/components/studio/games-index"
import { Direction } from "@/components/studio/direction"
import { Developer } from "@/components/studio/developer"
import { StudioFooter } from "@/components/studio/studio-footer"
import { HashRedirect } from "@/components/studio/hash-redirect"

export default function StudioPage() {
  return (
    <div className="studio-theme relative min-h-screen">
      <div className="studio-grain pointer-events-none fixed inset-0 z-[1]" aria-hidden="true" />
      <HashRedirect />
      <StudioNav />
      <main>
        <StudioHero />
        <SundownFeature />
        <YoursTeaser />
        <GamesIndex />
        <Direction />
        <Developer />
      </main>
      <StudioFooter />
    </div>
  )
}
