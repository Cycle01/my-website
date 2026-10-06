import Link from "next/link"
import { ExtLink } from "@/components/studio/ext-link"
import { studioEmail, studioLinks } from "@/lib/studio"

export function StudioContact() {
  return (
    <footer id="contact" aria-labelledby="contact-heading" className="relative z-10 mt-24 border-t border-[color:var(--border)] md:mt-40">
      <div className="mx-auto max-w-[1440px] px-4 pt-16 sm:px-6 md:px-10 md:pt-24">
        <h2 id="contact-heading" data-sr className="s-serif s-h2">
          Contact
        </h2>
        <div data-sr className="s-rule mt-6 md:mt-8" aria-hidden="true" />

        <div className="mt-10 md:mt-14">
          <p data-sr className="max-w-md text-[16px] leading-relaxed text-muted-foreground">
            Get in touch about the games, press, or working together.
          </p>
          <div data-sr>
            <a
              href={`mailto:${studioEmail}`}
              className="group mt-3 inline-flex items-center gap-4 break-all py-2 text-[clamp(1.7rem,6.4vw,5.25rem)] font-medium leading-[1.05] tracking-[-0.045em]"
            >
              <span className="s-link [text-decoration-thickness:2px] [text-underline-offset:10px]">{studioEmail}</span>
              <span className="s-arrow hidden text-[0.6em] text-[color:var(--accent)] sm:inline" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>

          <ul data-sr className="mt-12 flex flex-wrap gap-x-12 gap-y-4">
            {studioLinks.map((l) => (
              <li key={l.label}>
                <ExtLink href={l.href} className="flex min-h-11 flex-col justify-center">
                  <span className="s-label">{l.label}</span>
                  <span className="text-[17px]">
                    <span className="s-link">{l.handle}</span>&nbsp;
                    <span className="s-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </span>
                </ExtLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex flex-col gap-1 border-t border-[color:var(--border)] py-5 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:mt-24">
          <p>© {new Date().getFullYear()} Cycle&rsquo;s Studios · Bogdan / Cycle01</p>
          <div className="flex gap-6">
            <Link href="/portfolio" className="inline-flex min-h-11 items-center hover:text-foreground">
              <span className="s-link">Personal portfolio</span>&nbsp;<span className="s-arrow s-arrow-r" aria-hidden="true">→</span>
            </Link>
            <a href="#top" className="inline-flex min-h-11 items-center hover:text-foreground">
              <span className="s-link">Back to top</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
