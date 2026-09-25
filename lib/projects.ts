import { asset } from "@/lib/asset"

export interface Game {
  title: string
  description: string
  /** Cover image. Without one the card renders a styled title card. */
  image?: string
  tags: string[]
  year: string
  link: string
  store: "itch.io" | "Steam"
  rating?: string
  featured?: boolean
}

export interface ArchiveProject {
  title: string
  description: string
  image?: string
  tags: string[]
  /** Post with the clip (X or Reddit). Opens in an in-page player. */
  clip: { url: string; embed: string; source: "X" | "Reddit" }
  /** Local .mp4 in /public/videos. Autoplays on hover once the file exists; ignored if missing. */
  video?: string
  note?: string
}

export interface Announcement {
  date: string
  title: string
  body: string[]
  signoff: string
}

export interface Screenshot {
  src: string
  alt: string
  caption: string
}

export interface Extension {
  slug: "adblock-pro" | "ai-tab-grouper-pro" | "indie-radar"
  name: string
  tagline: string
  description: string
  highlights: string[]
  link: string
  icon?: string
  /** Real screenshots. When empty, the section renders a UI recreation instead. */
  screenshots: Screenshot[]
}

export const releasedGames: Game[] = [
  {
    title: "Secrets of Sundown",
    description:
      "A first-person psychological horror game set in the strange suburb of Sundown. Explore a semi-open world, make choice-driven decisions, and uncover sinister secrets. Features VHS-style graphics, stalker mechanics, and dynamic environments.",
    image: asset("/images/secrets-of-sundown.jpg"),
    tags: ["Unreal Engine 5", "C++", "Blueprints", "Horror"],
    year: "2025",
    link: "https://cycle01.itch.io/secrets-of-sundown",
    store: "itch.io",
    rating: "4.5/5",
    featured: true,
  },
  {
    title: "Moonfall: Protocol",
    description:
      "A co-op survival horror for 1 to 4 players. A dream mission to walk on the moon turns into a nightmare: a hidden base, strange astronauts, and a portal into a twisted dimension. Work together to gather evidence, power ten control points and get the generator running to go home.",
    image: asset("/images/moonfall-protocol.jpg"),
    tags: ["Unreal Engine 5", "Co-op", "Survival Horror", "Sci-Fi"],
    year: "2025",
    link: "https://store.steampowered.com/app/3973560/Moonfall_Protocol/",
    store: "Steam",
    featured: true,
  },
  {
    title: "IronMade",
    description:
      "An action-packed medieval adventure. Play as a nameless knight escaping a dungeon with one goal: finding his daughter Sara. Fight through twisted creatures and haunting ruins in a tale of love, survival, and redemption.",
    image: asset("/images/ironmade-screenshot.jpg"),
    tags: ["Unreal Engine 5", "C++", "Action", "Medieval"],
    year: "2024",
    link: "https://cycle01.itch.io/ironmade",
    store: "itch.io",
    rating: "5.0/5",
  },
  {
    title: "Safe Place",
    description:
      "Play as a time traveler stuck in the wrong dimension -- a gray, lifeless place crawling with patrolling robots. Solve five puzzles, avoid traps, and get your travel system back online with help from Bobbie, your AI companion.",
    image: asset("/images/safe-place.jpg"),
    tags: ["Unreal Engine 5", "Blueprints", "Puzzle", "Sci-Fi"],
    year: "2025",
    link: "https://cycle01.itch.io/safe-place",
    store: "itch.io",
  },
  {
    title: "CyborgDash",
    description:
      "2099. The Republic of Gamers rules humanity. As KAEL-7, a maintenance engineer turned rebel, sprint through the ROG Citadel with the stolen Source Code, dodging elite droids and deadly traps. Made for the ROG 20-Year Coding Challenge.",
    tags: ["Side-scroller", "Action", "Game Jam"],
    year: "2026",
    link: "https://cycle01.itch.io/cyborgdash",
    store: "itch.io",
  },
  {
    title: "The Way Back Ball",
    description:
      "A gust of wind blew a ball into the dark side of the Republic of Gamers city. Roll, bounce and ricochet it back to its owner through physics puzzles and tricky platforming. Made for the ROG Challenge 2024, playable in the browser.",
    tags: ["Unreal Engine 4", "Platformer", "Browser"],
    year: "2024",
    link: "https://cycle01.itch.io/thewaybackball",
    store: "itch.io",
  },
]

export const sundown2 = {
  title: "Secrets of Sundown 2",
  image: asset("/images/secrets-of-sundown-2-promo.jpg"),
  original: releasedGames[0],
  facts: [
    { label: "Engine", value: "Unreal Engine 5" },
    { label: "Genre", value: "Psychological horror" },
    { label: "Perspective", value: "First-person" },
    { label: "Status", value: "In development" },
  ],
}

export const archiveProjects: ArchiveProject[] = [
  {
    title: "Spidey Game",
    video: asset("/videos/spidey.mp4"),
    description:
      "One very large spider in a checkered test room. A creature experiment built to see how unsettling eight legs could look, and nothing more.",
    image: asset("/images/spidey-game.jpg"),
    tags: ["Unreal Engine 5", "Blueprints", "Creature"],
    clip: {
      url: "https://x.com/cycledadev/status/2024416945043329456",
      embed: "https://platform.twitter.com/embed/Tweet.html?id=2024416945043329456&theme=dark&dnt=true",
      source: "X",
    },
  },
  {
    title: "Finding the Moose Man",
    video: asset("/videos/moose-man.mp4"),
    description:
      "A foggy cryptid hunt through dense wilderness. Abandoned campsites, unsettling encounters, and a legend that may or may not be real.",
    image: asset("/images/finding-the-moose-man.jpg"),
    tags: ["Unreal Engine 5", "C++", "Exploration"],
    clip: {
      url: "https://x.com/cycledadev/status/2024786219792568532",
      embed: "https://platform.twitter.com/embed/Tweet.html?id=2024786219792568532&theme=dark&dnt=true",
      source: "X",
    },
  },
  {
    title: "VORE",
    video: asset("/videos/vore.mp4"),
    description:
      "A slick, retro-style zombie shooter: fast, simple, arcade-style waves of the undead.",
    image: asset("/images/vore.jpg"),
    tags: ["Unreal Engine 5", "Blueprints", "Shooter"],
    clip: {
      url: "https://x.com/cycledadev/status/2027083762991845393",
      embed: "https://platform.twitter.com/embed/Tweet.html?id=2027083762991845393&theme=dark&dnt=true",
      source: "X",
    },
    note: "I took VORE down myself because of the controversy around it. It stays here as an archive project.",
  },
  {
    title: "Undercover: Homefront",
    video: asset("/videos/undercover-homefront.mp4"),
    description:
      "Born from playing around with ideas in the engine and seeing what stuck. A small experiment that got shared with the IndieDev community.",
    tags: ["Unreal Engine 5", "Experiment"],
    clip: {
      url: "https://www.reddit.com/r/IndieDev/comments/1o5jl4e/i_was_playing_around_with_things_and_made_this/",
      embed: "https://embed.reddit.com/r/IndieDev/comments/1o5jl4e/i_was_playing_around_with_things_and_made_this/?embed=true&theme=dark",
      source: "Reddit",
    },
  },
]

export const flingIt = {
  title: "Fling It",
  tagline: "Small ship. Big distances.",
  screenshots: [
    { src: asset("/images/fling-it/menu.webp"), alt: "Fling It main menu with the Neon planet selected", caption: "Pick a planet, hit play" },
    { src: asset("/images/fling-it/launch.webp"), alt: "Astronaut standing on the launch ramp on the Dunes", caption: "Pull back and let go" },
    { src: asset("/images/fling-it/flight.webp"), alt: "Astronaut boosting through the Exosphere", caption: "Boost through the Exosphere" },
    { src: asset("/images/fling-it/results.webp"), alt: "Flight complete screen showing a 21.8 km run", caption: "Cash out every run" },
    { src: asset("/images/fling-it/upgrades.webp"), alt: "Upgrades screen with eight upgrade tracks and Rebirth", caption: "Upgrade, rebirth, go further" },
  ] satisfies Screenshot[],
  upgrades: [
    "Launch Power",
    "Bounce",
    "Aerodynamics",
    "Boost Fuel",
    "Boost Power",
    "Coin Magnet",
    "Money Multiplier",
    "Timing Assist",
  ],
  /** Store links render as buttons once added, e.g. { label: "Google Play", href: "https://..." }. */
  storeLinks: [] as { label: string; href: string }[],
}

export const extensions: Extension[] = [
  {
    slug: "adblock-pro",
    name: "AdBlock Pro",
    tagline: "Ads, trackers and YouTube ads. Gone.",
    description:
      "A Manifest V3 ad blocker for Chrome. One shield protects the site you're on, live counters show ads, trackers and YouTube ads blocked, and quick filters handle pop-ups, tracking redirects and anti-adblock walls.",
    highlights: [
      "YouTube pre-roll and mid-roll blocking",
      "Smart, Aggressive and No Scripts modes",
      "Live log of every blocked request",
      "Custom filter rules, whitelist and settings backup",
    ],
    link: "https://chromewebstore.google.com/detail/adblock-pro-%E2%80%94-advanced-ad/klpcajkjnlgfnjkhndbcjiahoceehhff",
    icon: asset("/images/extensions/adblock-pro-icon.png"),
    screenshots: [],
  },
  {
    slug: "ai-tab-grouper-pro",
    name: "AI Tab Grouper Pro",
    tagline: "One click from tab chaos to clean groups.",
    description:
      "Sorts every open tab into named, colour-coded Chrome tab groups: work, study, entertainment, social, shopping. Pro adds on-device AI grouping with Gemini Nano, focus tools and tab analytics.",
    highlights: [
      "One-click grouping by category",
      "AI Group with on-device Gemini Nano",
      "Duplicate finder and stale-tab cleanup",
      "Focus Mode, daily focus goals and distraction block",
      "Time tracker, weekly report and heatmap",
    ],
    link: "https://chromewebstore.google.com/detail/ai-tab-grouper-pro/ggodahlklmpabghiadjdfoaieidpklhg",
    icon: asset("/images/extensions/tab-grouper-icon.png"),
    screenshots: [
      {
        src: asset("/images/extensions/tab-grouper-groups.webp"),
        alt: "AI Tab Grouper Pro popup after grouping 12 tabs into 5 groups",
        caption: "12 tabs, 5 groups, one click",
      },
      {
        src: asset("/images/extensions/tab-grouper-pro-tools.webp"),
        alt: "AI Tab Grouper Pro tools: AI Group, Smart Group, Auto-Group, Focus Mode and analytics",
        caption: "Pro tools",
      },
    ],
  },
  {
    slug: "indie-radar",
    name: "Indie Radar",
    tagline: "Market research for indie devs, right on Steam.",
    description:
      "A Steam companion for indie developers and players. It scans the page you're on and your wishlist for the best live deals, and its competition dashboard maps an entire genre (prices, reviews, release timing) in seconds, so you can study the market before you release.",
    highlights: [
      "Real-time radar of live offers on the page",
      "Best deals across your wishlist, indie titles flagged",
      "Competition dashboard for any Steam tag",
      "Median price, review velocity and release timing, with CSV export",
    ],
    link: "https://chromewebstore.google.com/detail/indie-radar/lajdnbaikpkfogoiingibfmkmajbneml",
    screenshots: [],
  },
]

export const studioStats = [
  { value: releasedGames.length + 1, label: "Games released", sub: `${releasedGames.length} PC · 1 mobile` },
  { value: extensions.length, label: "Chrome extensions" },
  { value: archiveProjects.length, label: "Archived for fun" },
  { value: 1, label: "Sequel in the works" },
]

export const announcements: Announcement[] = [
  {
    date: "September 2026",
    title: "The comeback starts here",
    body: [
      "This year has been a hard one. Between my finals and a few personal challenges, games had to take a step back more often than I wanted. I'm also starting my university major now, so life is changing fast.",
      "But my focus on games isn't going anywhere. I promised you a big comeback, and I meant every word. The Chrome extensions and Fling It are only the beginning.",
      "Thank you for sticking around through the quiet months. It means more than you know. From now on, keep an eye out for regular S2S (Secrets of Sundown 2) updates. It's going to be the biggest thing I've made.",
    ],
    signoff: "Cycle01",
  },
]
