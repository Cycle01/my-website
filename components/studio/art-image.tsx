import type { Artwork } from "@/lib/studio"

/**
 * Game artwork with a smaller file for narrow screens. The intrinsic size is
 * set so the browser reserves space before the image loads, and the crop
 * keeps the title or subject in frame via `art.position`.
 */
export function ArtImage({ art, className = "", priority = false }: { art: Artwork; className?: string; priority?: boolean }) {
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={art.srcSmall} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={art.src}
        alt={art.alt}
        width={art.width}
        height={art.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
        style={{ objectPosition: art.position ?? "50% 50%" }}
      />
    </picture>
  )
}
