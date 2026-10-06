import { Instrument_Serif } from "next/font/google"
import { StudioNav } from "@/components/studio/studio-nav"
import { StudioHero } from "@/components/studio/studio-hero"
import { GamesIndex } from "@/components/studio/games-index"
import { StillsReel } from "@/components/studio/stills-reel"
import { StudioIntro } from "@/components/studio/studio-intro"
import { StudioContact } from "@/components/studio/studio-contact"
import { MaskReveal } from "@/components/studio/mask-reveal"
import { HashRedirect } from "@/components/studio/hash-redirect"

// Loaded here rather than in the root layout, so only the studio page pays for it.
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["italic"], variable: "--font-instrument-serif", display: "swap" })

export default function StudioPage() {
  return (
    <div id="studio-root" className={`studio-theme relative min-h-screen ${serif.variable}`}>
      <HashRedirect />
      <MaskReveal />
      <a href="#games" className="sr-only z-[80] bg-foreground px-4 py-3 text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to games
      </a>
      <StudioNav />
      <main>
        <StudioHero />
        <GamesIndex />
        <StillsReel />
        <StudioIntro />
      </main>
      <StudioContact />
    </div>
  )
}
