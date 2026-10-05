import Link from "next/link"
import { asset } from "@/lib/asset"

const links = [
  { href: "#games", label: "Games" },
  { href: "#studio", label: "Studio" },
  { href: "#contact", label: "Contact" },
]

/** Compact bar. Every item fits at 360px wide, so phones get the same direct links. */
export function StudioNav() {
  return (
    <header className="border-b border-[color:var(--border)]">
      <nav className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 md:h-16 md:px-10" aria-label="Studio">
        <a href="#top" className="s-fade flex min-h-11 items-center gap-2.5 text-[15px] font-semibold tracking-[-0.01em]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/images/studio/logo-figure.webp")} alt="" width={133} height={281} className="h-6 w-auto" />
          <span className="hidden sm:inline">Cycle&rsquo;s Studios</span>
          <span className="sr-only sm:hidden">Cycle&rsquo;s Studios</span>
        </a>

        <ul className="flex items-center text-[14px]">
          {links.map((l, i) => (
            <li key={l.href} className="s-fade" style={{ animationDelay: `${60 + i * 50}ms` }}>
              <a href={l.href} className="flex min-h-11 items-center px-2 text-muted-foreground transition-colors duration-150 hover:text-foreground sm:px-3">
                {l.label}
              </a>
            </li>
          ))}
          <li className="s-fade ml-1 border-l border-[color:var(--border)] pl-1 sm:ml-2 sm:pl-2" style={{ animationDelay: "220ms" }}>
            <Link href="/portfolio" className="flex min-h-11 items-center px-2 text-foreground transition-colors duration-150 hover:text-[color:var(--accent)] sm:px-3">
              <span className="sm:hidden">Portfolio</span>
              <span className="hidden sm:inline">Personal portfolio</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
