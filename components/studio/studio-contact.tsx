import Link from "next/link"
import { ExtLink } from "@/components/studio/ext-link"
import { studioEmail, studioLinks } from "@/lib/studio"

export function StudioContact() {
  return (
    <footer id="contact" className="scroll-mt-16 pt-28 md:pt-44" aria-labelledby="contact-title">
      <div className="mx-auto max-w-[1440px] px-4 pb-10 sm:px-6 md:px-10">
        <div className="s-reveal border-t border-[color:var(--border)] pt-10 md:pt-14">
          <h2 id="contact-title" className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
            Contact
          </h2>
          <a
            href={`mailto:${studioEmail}`}
            className="s-link mt-4 inline-block break-all text-3xl font-medium tracking-[-0.035em] text-foreground sm:text-5xl md:text-6xl"
          >
            {studioEmail}
          </a>
          <p className="mt-4 max-w-md text-[15px] text-muted-foreground">For questions about the games, press, or working together.</p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-[color:var(--border)] pt-6 sm:grid-cols-4">
          {studioLinks.map((l) => (
            <li key={l.label}>
              <ExtLink href={l.href} className="group flex min-h-14 flex-col justify-center">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{l.label}</span>
                <span className="s-link mt-1 text-[15px] text-foreground">
                  {l.handle}&nbsp;<span className="s-arrow" aria-hidden="true">↗</span>
                </span>
              </ExtLink>
            </li>
          ))}
          <li>
            <Link href="/portfolio" className="group flex min-h-14 flex-col justify-center">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">Personal</span>
              <span className="s-link mt-1 text-[15px] text-foreground">
                Personal portfolio&nbsp;<span className="s-arrow s-arrow-r" aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        </ul>

        <p className="mt-12 flex flex-wrap justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
          <span>© {new Date().getFullYear()} Cycle&apos;s Studios</span>
          <span>Made by Bogdan / Cycle01</span>
        </p>
      </div>
    </footer>
  )
}
