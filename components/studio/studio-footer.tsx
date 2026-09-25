import Link from "next/link"

export function StudioFooter() {
  return (
    <footer className="border-t border-white/5 px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          © {new Date().getFullYear()} Cycle Studios · A one-person studio
        </p>
        <Link href="/portfolio" className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent underline-offset-4 hover:underline">
          Personal Portfolio
        </Link>
      </div>
    </footer>
  )
}
