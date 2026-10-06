import Link from "next/link"
import { ExtLink } from "@/components/studio/ext-link"
import { studioEmail, studioLinks } from "@/lib/studio"

export function StudioContact() {
  return (
    <footer id="contact" aria-labelledby="contact-heading" className="mt-24 border-t border-[color:var(--border)] md:mt-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 px-4 pt-16 sm:px-6 md:grid-cols-12 md:gap-10 md:px-10 md:pt-24">
        <h2 id="contact-heading" className="flex items-baseline gap-4 md:col-span-4">
          <span aria-hidden="true" className="font-mono text-[12px] text-[color:var(--accent)]">04</span>
          <span className="s-serif text-[clamp(3rem,7vw,6rem)] leading-[0.9]">Contact</span>
        </h2>
        <div className="md:col-span-8 md:pt-4">
          <p className="max-w-md text-[16px] leading-relaxed text-muted-foreground">
            Get in touch about the games, press, or working together.
          </p>
          <a
            href={`mailto:${studioEmail}`}
            className="mt-2 inline-block break-all py-2 text-[clamp(1.9rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.045em]"
          >
            <span className="s-link [text-decoration-thickness:2px] [text-underline-offset:10px]">{studioEmail}</span>
          </a>

          <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-2">
            {studioLinks.map((l) => (
              <li key={l.label}>
                <ExtLink href={l.href} className="flex min-h-11 flex-col justify-center">
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{l.label}</span>
                  <span className="text-[16px]">
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
      </div>

      <div className="mx-auto mt-16 max-w-[1440px] px-4 sm:px-6 md:mt-24 md:px-10">
        <div className="flex flex-col gap-1 border-t border-[color:var(--border)] py-5 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
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
