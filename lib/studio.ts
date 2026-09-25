import { asset } from "@/lib/asset"
import { releasedGames, type Game } from "@/lib/projects"

/*
  Studio homepage content. Released games are looked up from the portfolio's
  data (lib/projects.ts) so titles, links and art stay identical on both pages.
*/

function game(title: string): Game {
  const g = releasedGames.find((x) => x.title === title)
  if (!g) throw new Error(`Unknown game: ${title}`)
  return g
}

export interface StudioGame {
  title: string
  year: string
  platform: string
  summary: string
  image: string
  /** "portrait" art (phone screenshots) is shown contained instead of cropped. */
  shape?: "landscape" | "portrait"
  link?: { label: string; href: string }
  note?: { label: string; text: string }
  meta?: string
}

const sundown = game("Secrets of Sundown")
const moonfall = game("Moonfall: Protocol")
const ironmade = game("IronMade")

export const studioGames: StudioGame[] = [
  {
    title: sundown.title,
    year: sundown.year,
    platform: "PC",
    summary:
      "First-person psychological horror in a suburb that isn't quite right. Explore Sundown, make choices, and work out what the town is hiding. My best-received game so far.",
    image: sundown.image!,
    meta: `Rated ${sundown.rating} on itch.io`,
    link: { label: "Play on itch.io", href: sundown.link },
  },
  {
    title: moonfall.title,
    year: moonfall.year,
    platform: "PC",
    summary:
      "Co-op survival horror for 1 to 4 players. A mission to walk on the moon leads to a hidden base, strange astronauts and a portal into somewhere worse.",
    image: moonfall.image!,
    link: { label: "View on Steam", href: moonfall.link },
    note: {
      label: "No further updates planned",
      text: "Moonfall: Protocol was released, but I didn't finish it the way I intended. When my final year of school began, I had to put my studies first, and the game wasn't the success I hoped for. I'm not currently planning further updates. It stays part of my history, and I'd rather be upfront with anyone thinking of playing it.",
    },
  },
  {
    title: ironmade.title,
    year: ironmade.year,
    platform: "PC",
    summary:
      "A nameless knight escapes a dungeon to find his daughter, Sara. Built for a Romanian game jam; I couldn't port it to the web in time, so I released it on its own.",
    image: ironmade.image!,
    meta: `Rated ${ironmade.rating} on itch.io`,
    link: { label: "Play on itch.io", href: ironmade.link },
  },
  {
    title: "Fling It",
    year: "",
    platform: "Mobile",
    summary:
      "My first mobile game. Pull back, let go, and fling a tiny astronaut as far as your upgrades allow. A lighter game, and my start on mobile.",
    image: asset("/images/fling-it/menu.webp"),
    shape: "portrait",
    link: { label: "See it in my portfolio", href: "/portfolio/#fling-it" },
  },
]

export const sundown2 = {
  title: "Secrets of Sundown 2",
  image: asset("/images/secrets-of-sundown-2-promo.webp"),
  facts: [
    { label: "Genre", value: "Psychological horror" },
    { label: "Engine", value: "Unreal Engine 5" },
    { label: "Status", value: "In development" },
    { label: "Release date", value: "Not announced" },
  ],
}

export const audience = {
  downloads: 2200,
  views: 12000,
}

export const direction = [
  {
    title: "Better games",
    text: "Tighter scope, more polish, and finishing what I start. Moonfall taught me that one the hard way.",
  },
  {
    title: "Development in the open",
    text: "Regular devlogs and progress updates, so you can see how the games are made while they're being made.",
  },
  {
    title: "A YouTube channel",
    text: "I want to start one for devlogs and behind-the-scenes work. It doesn't exist yet.",
  },
  {
    title: "Working with other people",
    text: "Reaching out to YouTubers and creators, and collaborating with other developers and artists.",
  },
  {
    title: "Where players are",
    text: "A stronger presence on Steam, YouTube, X and Reddit. itch.io has been good to me; Steam is where I want to grow.",
  },
  {
    title: "PC and mobile",
    text: "Both stay the focus. Mac is something I'd like to look at later.",
  },
]

export const studioLinks = [
  { label: "itch.io", handle: "cycle01", href: "https://cycle01.itch.io" },
  { label: "X / Twitter", handle: "@cycledadev", href: "https://twitter.com/cycledadev" },
  { label: "Steam", handle: "Moonfall: Protocol", href: moonfall.link },
  { label: "Email", handle: "ciclentiu@gmail.com", href: "mailto:ciclentiu@gmail.com" },
]
