import { StudioNav } from "@/components/studio/studio-nav"
import { StudioHero } from "@/components/studio/studio-hero"
import { SundownFeature } from "@/components/studio/sundown-feature"
import { GamesIndex } from "@/components/studio/games-index"
import { YoursTeaser } from "@/components/studio/yours-teaser"
import { StudioAbout } from "@/components/studio/studio-about"
import { StudioContact } from "@/components/studio/studio-contact"
import { StudioMotion } from "@/components/studio/studio-motion"
import { HashRedirect } from "@/components/studio/hash-redirect"

export default function StudioPage() {
  return (
    <div id="studio-root" className="studio-theme relative min-h-screen">
      <HashRedirect />
      <StudioMotion rootId="studio-root" />
      <a
        href="#games"
        className="sr-only z-[60] bg-foreground px-4 py-3 text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to games
      </a>
      <StudioNav />
      <main>
        <StudioHero />
        <SundownFeature />
        <GamesIndex />
        <YoursTeaser />
        <StudioAbout />
      </main>
      <StudioContact />
    </div>
  )
}
