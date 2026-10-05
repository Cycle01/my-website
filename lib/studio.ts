import { asset } from "@/lib/asset"
import { releasedGames, type Game } from "@/lib/projects"

/*
  Studio homepage content. Titles, years, ratings and store links come from the
  portfolio's data (lib/projects.ts) so both pages stay in agreement. Artwork
  here is the developer's own key art, store art and in-game screenshots.
*/

function game(title: string): Game {
  const g = releasedGames.find((x) => x.title === title)
  if (!g) throw new Error(`Unknown game: ${title}`)
  return g
}

export interface Artwork {
  /** Large source (desktop). */
  src: string
  /** Smaller source served to narrow screens. */
  srcSmall: string
  width: number
  height: number
  alt: string
  /** CSS object-position, so crops keep the title or subject in frame. */
  position?: string
}

const art = (name: string, width: number, height: number, alt: string, position?: string): Artwork => ({
  src: asset(`/images/studio/games/${name}.webp`),
  srcSmall: asset(`/images/studio/games/${name}-sm.webp`),
  width,
  height,
  alt,
  position,
})

const sundown = game("Secrets of Sundown")
const moonfall = game("Moonfall: Protocol")

export const sundownGame = {
  title: sundown.title,
  year: sundown.year,
  platform: "PC",
  status: "Released",
  rating: sundown.rating,
  summary:
    "First-person psychological horror in a suburb that isn't quite right. Explore Sundown, make choices, and work out what the town is hiding.",
  link: { label: "Play Secrets of Sundown on itch.io", short: "Play on itch.io", href: sundown.link },
  keyArt: art("sos-key", 1600, 800, "Secrets of Sundown key art: the game's title over a lookout tower and pines at dusk", "60% 50%"),
  screenshots: [
    art("sos-moon-tower", 1600, 892, "Secrets of Sundown screenshot: the lookout tower at night, a single bright light shining from its cabin", "50% 40%"),
    art("sos-flashlight", 1200, 576, "Secrets of Sundown screenshot: a flashlight beam catches a bear at the edge of the forest at night", "40% 60%"),
    art("sos-day-tower", 1200, 565, "Secrets of Sundown screenshot: the lookout tower rising above the pines, mountains behind it", "60% 45%"),
  ],
}

export const moonfallGame = {
  title: moonfall.title,
  year: moonfall.year,
  platform: "PC",
  players: "Co-op, 1–4 players",
  status: "No further updates planned",
  summary:
    "Co-op survival horror. A mission to walk on the moon leads to a hidden base, strange astronauts and a portal into somewhere worse.",
  note: "Moonfall: Protocol was released, but I didn't finish it the way I intended. When my final year of school began, I had to put my studies first, and the game wasn't the success I hoped for. I'm not currently planning further updates. It stays part of my history, and I'd rather be upfront with anyone thinking of playing it.",
  link: { label: "View Moonfall: Protocol on Steam", short: "View on Steam", href: moonfall.link },
  keyArt: art("moonfall-key", 1232, 706, "Moonfall: Protocol store art: an astronaut on the lunar surface with Earth behind, beside the game's title", "50% 50%"),
  crewArt: art("moonfall-crew", 1920, 620, "Moonfall: Protocol art: four astronauts in orange suits walking down a lit base corridor", "50% 55%"),
}

export const flingItGame = {
  title: "Fling It",
  platform: "Mobile",
  status: "Coming later this year",
  summary:
    "My first mobile game. Pull back, let go, and fling a tiny astronaut as far as your upgrades allow. A lighter game, and my start on mobile.",
  link: { label: "See Fling It in my portfolio", short: "See it in my portfolio", href: "/portfolio/#fling-it" },
  screenshots: [
    { src: asset("/images/fling-it/menu.webp"), alt: "Fling It main menu with the Neon planet selected" },
    { src: asset("/images/fling-it/launch.webp"), alt: "Fling It: the astronaut on the launch ramp" },
    { src: asset("/images/fling-it/flight.webp"), alt: "Fling It: the astronaut boosting through the Exosphere" },
  ],
}

export const sundown2 = {
  title: "Secrets of Sundown 2",
  summary:
    "The sequel to Secrets of Sundown, my psychological horror game set in the strange suburb of Sundown. It's the biggest project I've taken on. I'll share more when there's something real to show.",
  facts: [
    { label: "Status", value: "In development" },
    { label: "Release date", value: "Not announced" },
    { label: "Genre", value: "Psychological horror" },
    { label: "Engine", value: "Unreal Engine 5" },
  ],
  follow: { label: "Follow development on X", href: "https://twitter.com/cycledadev" },
}

export const yours = {
  title: "Yours",
  status: "Coming 2027",
  lead: "A first-person psychological horror game about friendship, obsession, and the unsettling line between caring about someone and needing to possess them.",
  body: [
    "You play as Maya, a young woman whose closest friend, Amy, leaves for a quiet trip in the mountains. But Maya isn't ready to be apart.",
    "Follow Amy from a distance. Watch where she goes. Learn her routine. Follow her into restaurants, linger outside her hotel, and find ways into places you were never invited to. All the while, Amy still talks to you.",
    "Through messages and conversations, you'll experience two versions of the same friendship: the one Amy believes she has, and the one you're secretly creating around her. The further you go, the harder it becomes to justify your actions.",
  ],
  keyArt: {
    src: asset("/images/studio/yours-key-art.webp"),
    srcSmall: asset("/images/studio/yours-key-art-mobile.webp"),
    width: 1672,
    height: 941,
    alt: "Yours key art: a hillside town at sunset and a lone car on a dark forest road, with the title and “coming in 2027”",
    position: "40% 40%",
  } satisfies Artwork,
}

/** Approximate itch.io totals across all games, as given by the developer. */
export const audience = {
  downloads: "about 2,200",
  views: "about 12,000",
}

export const studioLinks = [
  { label: "itch.io", handle: "cycle01", href: "https://cycle01.itch.io" },
  { label: "X", handle: "@cycledadev", href: "https://twitter.com/cycledadev" },
  { label: "Steam", handle: "Moonfall: Protocol", href: moonfall.link },
]

export const studioEmail = "ciclentiu@gmail.com"
