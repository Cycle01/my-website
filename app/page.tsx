import { StudioNav } from "@/components/studio/studio-nav"
import { StudioHero } from "@/components/studio/studio-hero"
import { GamesIndex } from "@/components/studio/games-index"
import { StudioIntro } from "@/components/studio/studio-intro"
import { StudioContact } from "@/components/studio/studio-contact"
import { HashRedirect } from "@/components/studio/hash-redirect"

export default function StudioPage() {
  return (
    <div className="studio-theme relative min-h-screen">
      <HashRedirect />
      <a href="#games" className="sr-only z-[60] bg-foreground px-4 py-3 text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to games
      </a>
      <StudioNav />
      <main>
        <StudioHero />
        <GamesIndex />
        <StudioIntro />
      </main>
      <StudioContact />
    </div>
  )
}
