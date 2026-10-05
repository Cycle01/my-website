import type { ReactNode } from "react"

/** An external link that opens in a new tab and says so to screen readers. */
export function ExtLink({ href, className = "", children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
