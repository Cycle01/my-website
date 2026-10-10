import Image from "next/image"
import { asset } from "@/lib/asset"

export function Footer() {
  return (
    <footer className="relative border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2.5 text-muted-foreground">
          <Image
            src={asset("/images/studio-logo.png")}
            alt="Cycle's Studio"
            width={20}
            height={20}
            className="rounded-sm"
          />
          <span className="font-mono text-xs uppercase tracking-[0.15em]">
            Cycle<span className="text-primary">01</span>{" / Cycle's Studio"}
          </span>
        </div>
        <a href="#for-mom" className="group flex items-center gap-2 text-muted-foreground/70 transition-colors hover:text-primary">
          <span lang="zh-Hans" className="font-brush text-lg leading-none text-primary/80 group-hover:text-primary">
            妈妈，一路平安
          </span>
        </a>
        <p className="font-mono text-[11px] text-muted-foreground/60 tracking-wide">
          {`© ${new Date().getFullYear()} · Built with passion. All rights reserved.`}
        </p>
      </div>
    </footer>
  )
}
