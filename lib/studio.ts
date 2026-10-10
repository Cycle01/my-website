import { asset } from "@/lib/asset"
import { announcements, archiveProjects, extensions, releasedGames, type Game } from "@/lib/projects"

/*
  Studio homepage content. Titles, years, ratings and store links come from the
  portfolio's data (lib/projects.ts) so both pages stay in agreement. Every
  image here is the developer's own game art or an in-game screenshot.
*/

function game(title: string): Game {
  const g = releasedGames.find((x) => x.title === title)
  if (!g) throw new Error(`Unknown game: ${title}`)
  return g
}

export interface Artwork {
  src: string
  /** Smaller file for narrow screens. */
  srcSmall: string
  width: number
  height: number
  alt: string
  /** CSS object-position, so crops keep the title or subject in frame. */
  position?: string
}

export interface StudioProject {
  id: string
  title: string
  /** Short facts shown above the title, e.g. "PC · 2025". */
  meta: string
  status: string
  /** "live" = released, "dev" = in development, "paused" = no further updates. */
  tone: "live" | "dev" | "paused"
  summary: string
  /** Extra facts listed under the summary. */
  facts?: string[]
  /** Promo, key or store art, or screenshots. Shown in the same 16:9 frame for every game. */
  art?: Artwork
  /** A line about what has (not) been shown, listed with the facts. */
  noArt?: string
  /** Portrait phone screenshots, shown instead of landscape artwork. */
  phones?: { src: string; alt: string }[]
  notice?: { title: string; text: string }
  action?: { label: string; href: string; external: boolean }
}

const sundown = game("Secrets of Sundown")
const moonfall = game("Moonfall: Protocol")

const X_URL = "https://twitter.com/cycledadev"

export const projects: StudioProject[] = [
  {
    id: "secrets-of-sundown-2",
    title: "Secrets of Sundown 2",
    meta: "Unreal Engine 5",
    status: "In development",
    tone: "dev",
    summary:
      "The sequel to Secrets of Sundown, and the biggest project I've taken on. I'll share more when there's something real to show.",
    facts: ["Psychological horror", "Release date not announced"],
    art: {
      src: asset("/images/studio/games/sos2-promo.webp"),
      srcSmall: asset("/images/studio/games/sos2-promo-sm.webp"),
      width: 1600,
      height: 800,
      alt: "Secrets of Sundown 2 promo art: the title above a lookout tower and pines under a golden sky, a crow perched on the tower's roof",
      position: "50% 55%",
    },
    action: { label: "Follow development on X", href: X_URL, external: true },
  },
  {
    id: "secrets-of-sundown",
    title: sundown.title,
    meta: `PC · ${sundown.year}`,
    status: "Released",
    tone: "live",
    summary:
      "First-person psychological horror in a suburb that isn't quite right. Explore Sundown, make choices, and work out what the town is hiding.",
    facts: [`Rated ${sundown.rating} on itch.io`],
    art: {
      src: asset("/images/studio/games/sos-key.webp"),
      srcSmall: asset("/images/studio/games/sos-key-sm.webp"),
      width: 2400,
      height: 1200,
      alt: "Secrets of Sundown key art: the game's title beside a lookout tower and pines under a violet sky",
      position: "62% 50%",
    },
    action: { label: "Play on itch.io", href: sundown.link, external: true },
  },
  {
    id: "moonfall-protocol",
    title: moonfall.title,
    meta: `PC · ${moonfall.year}`,
    status: "No further updates planned",
    tone: "paused",
    summary:
      "Co-op survival horror for 1 to 4 players. A mission to walk on the moon leads to a hidden base, strange astronauts and a portal into somewhere worse.",
    art: {
      src: asset("/images/studio/games/moonfall-key.webp"),
      srcSmall: asset("/images/studio/games/moonfall-key-sm.webp"),
      width: 1232,
      height: 706,
      alt: "Moonfall: Protocol store art: an astronaut on the lunar surface with Earth behind, beside the game's title",
      position: "50% 50%",
    },
    notice: {
      title: "No further updates planned",
      text: "Moonfall: Protocol was released, but I didn't finish it the way I intended. When my final year of school began, I had to put my studies first, and the game wasn't the success I hoped for. It stays part of my history, and I'd rather be upfront with anyone thinking of playing it.",
    },
    action: { label: "View on Steam", href: moonfall.link, external: true },
  },
  {
    id: "fling-it",
    title: "Fling It",
    meta: "Mobile",
    status: "Coming later this year",
    tone: "dev",
    summary:
      "My first mobile game. Pull back, let go, and fling a tiny astronaut as far as your upgrades allow. A lighter game, and my start on mobile.",
    phones: [
      { src: asset("/images/fling-it/menu.webp"), alt: "Fling It main menu with the Neon planet selected" },
      { src: asset("/images/fling-it/launch.webp"), alt: "Fling It: the astronaut on the launch ramp" },
      { src: asset("/images/fling-it/flight.webp"), alt: "Fling It: the astronaut boosting through the Exosphere" },
    ],
    action: { label: "See it in my portfolio", href: "/portfolio/#fling-it", external: false },
  },
  {
    id: "yours",
    title: "Yours",
    meta: "First-person psychological horror",
    status: "Coming 2027",
    tone: "dev",
    summary:
      "A game about friendship, obsession, and the line between caring about someone and needing to possess them. You play as Maya, following her closest friend Amy on a quiet trip to the mountains, while Amy still talks to you.",
    art: {
      src: asset("/images/studio/yours-key-art.webp"),
      srcSmall: asset("/images/studio/yours-key-art-mobile.webp"),
      width: 1672,
      height: 941,
      alt: "Yours key art: a hillside town at sunset and a lone car on a dark forest road, with the title and “coming in 2027”",
      position: "40% 40%",
    },
    action: { label: "Follow updates on X", href: X_URL, external: true },
  },
]

const still = (name: string, width: number, height: number, game: string, kind: string, alt: string, position = "50% 50%") => ({
  src: asset(`/images/studio/games/${name}.webp`),
  srcSmall: asset(`/images/studio/games/${name}-sm.webp`),
  width,
  height,
  game,
  kind,
  alt,
  position,
})

/** The stills reel: real frames from the games, none repeated elsewhere on the page. */
export const stills = [
  still("sos-flashlight", 1920, 922, "Secrets of Sundown", "In-game", "A flashlight beam catches a bear at the edge of the forest at night", "45% 60%"),
  still("moonfall-crew", 2400, 775, "Moonfall: Protocol", "Store art", "Four astronauts in orange suits walk down a lit base corridor", "50% 55%"),
  still("sos-day-tower", 1642, 771, "Secrets of Sundown", "In-game", "The lookout tower rising above the pines, mountains behind it", "60% 45%"),
  still("sos-dusk", 1920, 922, "Secrets of Sundown", "In-game", "The lookout tower's cabin at dusk under pink clouds, a bright light at its side", "35% 55%"),
]

const latestNote = announcements[0]

/** The "Currently building" developer note in the hero. Existing facts only. */
export const currentBuild = {
  title: "Secrets of Sundown 2",
  facts: ["In development", "Psychological horror", "Unreal Engine 5", "Release date not announced"],
  summary:
    "The sequel to Secrets of Sundown, my psychological horror game set in the strange suburb of Sundown. It's the biggest project I've taken on.",
  quote: latestNote
    ? {
        text: "From now on, keep an eye out for regular S2S (Secrets of Sundown 2) updates. It's going to be the biggest thing I've made.",
        source: `${latestNote.title}, ${latestNote.date}`,
      }
    : undefined,
  follow: { label: "Follow progress on X", href: X_URL },
  note: { label: "Read the full note", href: "/portfolio/#news" },
}

export const studioLinks = [
  { label: "itch.io", handle: "cycle01", href: "https://cycle01.itch.io" },
  { label: "X", handle: "@cycledadev", href: X_URL },
  { label: "Steam", handle: "Moonfall: Protocol", href: moonfall.link },
]

export const studioEmail = "ciclentiu@gmail.com"

/*
  Skills. The names and groups are the portfolio's last Skills section (its
  self-rating percentages are dropped in favour of text); every note below is
  taken from the portfolio's own wording or from the project data above.
*/
export interface Skill {
  name: string
  note?: string
}

export interface SkillGroup {
  id: string
  title: string
  summary?: string
  skills: Skill[]
}

export const skillsIntro = [
  "Handling everything from concept art and level design to programming and sound design.",
  "C++ and Blueprints, from rapid prototypes to polished releases. Still early days with Godot.",
]

export const skillsFocus = "Specializing in psychological horror, atmospheric tension, and visceral medieval combat."

export const skillGroups: SkillGroup[] = [
  {
    id: "engines",
    title: "Engines",
    skills: [
      { name: "Unreal Engine 5", note: "Secrets of Sundown, Moonfall: Protocol and Secrets of Sundown 2" },
      { name: "UE5 Blueprints", note: "From rapid prototypes to polished releases" },
      { name: "Godot", note: "Still early days" },
    ],
  },
  {
    id: "languages",
    title: "Languages",
    skills: [
      { name: "C++", note: "Secrets of Sundown, IronMade and Finding the Moose Man" },
      { name: "GDScript" },
      { name: "HLSL / GLSL" },
    ],
  },
  {
    id: "design",
    title: "Design",
    summary: "Creating immersive gameplay loops, choice-driven mechanics, and player-centric horror experiences.",
    skills: [{ name: "Level Design" }, { name: "UI/UX Design" }, { name: "3D Modeling" }, { name: "VFX / Shaders" }],
  },
  {
    id: "tools",
    title: "Tools",
    skills: [
      { name: "Blender" },
      { name: "Substance Painter" },
      { name: "Character Creator", note: "Characters" },
      { name: "iClone", note: "Characters" },
      { name: "Marvelous Designer", note: "Clothing" },
      { name: "Perforce / Git" },
      { name: "JIRA / Notion" },
    ],
  },
]

export const alsoShipping: Skill[] = [
  { name: "Chrome Extensions (Manifest V3)", note: extensions.map((e) => e.name).join(", ") },
  { name: "JavaScript" },
  { name: "HTML & CSS" },
  { name: "AI-assisted coding" },
  { name: "Mobile game dev", note: "Fling It" },
]

function made(title: string) {
  const g = releasedGames.find((x) => x.title === title)
  if (g) return { title: g.title, image: g.image as string, tags: g.tags }
  const a = archiveProjects.find((x) => x.title === title)
  if (!a) throw new Error(`Unknown project: ${title}`)
  return { title: a.title, image: a.image as string, tags: a.tags }
}

/** Existing project images, shown beside the skills as proof of use. */
export const skillsInUse = ["Secrets of Sundown", "Moonfall: Protocol", "IronMade", "Safe Place", "Finding the Moose Man", "Spidey Game"].map(made)
