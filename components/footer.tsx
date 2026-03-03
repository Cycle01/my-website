import Image from "next/image"

export function Footer() {
  return (
    <footer className="relative border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2.5 text-muted-foreground">
          <Image
            src="/images/studio-logo.png"
            alt="Cycle's Studios"
            width={20}
            height={20}
            className="rounded-sm"
          />
          <span className="font-mono text-xs uppercase tracking-[0.15em]">
            Cycle<span className="text-primary">01</span>{" / Cycle's Studios"}
          </span>
        </div>
        <p className="font-mono text-[11px] text-muted-foreground/60 tracking-wide">
          {"Built with passion. All rights reserved."}
        </p>
      </div>
    </footer>
  )
}
