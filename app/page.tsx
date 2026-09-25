import { StudioNav } from "@/components/studio/studio-nav"
import { StudioHero } from "@/components/studio/studio-hero"
import { SundownFeature } from "@/components/studio/sundown-feature"
import { YoursTeaser } from "@/components/studio/yours-teaser"
import { GamesIndex } from "@/components/studio/games-index"
import { StudioAbout } from "@/components/studio/studio-about"
import { StudioContact } from "@/components/studio/studio-contact"
import { HashRedirect } from "@/components/studio/hash-redirect"

export default function StudioPage() {
  return (
    <div className="studio-theme relative min-h-screen">
      <HashRedirect />
      <StudioNav />
      <main>
        <StudioHero />
        <SundownFeature />
        <YoursTeaser />
        <GamesIndex />
        <StudioAbout />
      </main>
      <StudioContact />
    </div>
  )
}
