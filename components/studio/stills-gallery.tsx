"use client"

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react"
import { stills } from "@/lib/studio"

/*
  Stills: a fixed grid, nothing to drag or scroll sideways. Rows alternate a
  wide and a narrow frame (7 + 5, then 5 + 7 columns); phones get one column.
  Selecting a frame opens it full screen in a lightbox (native <dialog>):
  arrow buttons, arrow keys and a swipe step through the set, Esc or the
  backdrop closes it, and focus returns to the frame that opened it.
*/

// Visual order, chosen so the wide panorama lands in a wide slot.
const ORDER = [0, 2, 3, 1]
const items = ORDER.map((i) => stills[i]).filter(Boolean)
const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"]

export function StillsGallery() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openerRef = useRef<HTMLButtonElement | null>(null)
  const swipe = useRef<{ x: number; y: number } | null>(null)
  const [index, setIndex] = useState<number | null>(null)

  const open = (i: number, opener: HTMLButtonElement) => {
    openerRef.current = opener
    setIndex(i)
  }
  const close = () => dialogRef.current?.close()
  const step = useCallback((dir: 1 | -1) => setIndex((cur) => (cur === null ? cur : (cur + dir + items.length) % items.length)), [])

  // Open the dialog once an index is set; lock the page scroll while it is open.
  useEffect(() => {
    const d = dialogRef.current
    if (!d || index === null || d.open) return
    d.showModal()
    document.documentElement.style.overflow = "hidden"
  }, [index])

  const onClose = () => {
    document.documentElement.style.overflow = ""
    setIndex(null)
    openerRef.current?.focus()
  }

  useEffect(() => () => void (document.documentElement.style.overflow = ""), [])

  const onKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      step(1)
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      step(-1)
    }
  }

  // A short horizontal swipe on touch screens steps once; there is no dragging or gliding.
  // (touch-action: pan-y on the container leaves horizontal gestures to us.)
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") return
    swipe.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const s = swipe.current
    swipe.current = null
    if (!s) return
    const dx = e.clientX - s.x
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - s.y)) step(dx < 0 ? 1 : -1)
  }

  const current = index === null ? null : items[index]

  return (
    <section id="stills" aria-labelledby="stills-title" className="scroll-mt-4 pt-24 md:pt-40">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <h2 id="stills-title" data-sr className="s-h2">
            Stills
          </h2>
          <p data-sr className="s-label pb-2">
            Select a frame to view it full screen
          </p>
        </div>
        <div data-sr className="s-rule mt-6 md:mt-8" aria-hidden="true" />

        <ul className="mt-8 grid grid-cols-1 gap-3 md:mt-12 md:auto-rows-[clamp(220px,27vw,430px)] md:grid-cols-12 md:gap-4">
          {items.map((s, i) => (
            <li key={s.src} data-sr style={{ ["--d" as string]: (i % 2) * 90 }} className={`${spans[i]} aspect-[16/10] md:aspect-auto`}>
              <button type="button" onClick={(e) => open(i, e.currentTarget)} className="s-shot" style={{ position: "relative", overflow: "hidden" }} aria-label={`View full screen: ${s.alt}`}>
                <picture>
                  <source media="(max-width: 767px)" srcSet={s.srcSmall} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.src}
                    alt=""
                    width={s.width}
                    height={s.height}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: s.position }}
                  />
                </picture>
                <span className="s-shot-cap" aria-hidden="true">
                  <span className="s-label text-foreground/85">{s.game}</span>
                  <span className="s-label s-shot-zoom">View ↗</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        className="s-lightbox"
        aria-label={current ? `${current.game}, ${current.kind.toLowerCase()}. ${index! + 1} of ${items.length}` : "Still"}
        onClose={onClose}
        onKeyDown={onKeyDown}
        // Clicks on the backdrop or any empty area close it; the image, buttons and text do not.
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        {current && (
          <div
            className="flex h-full w-full flex-col"
            style={{ touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (swipe.current = null)}
            onClick={(e) => !(e.target as HTMLElement).closest("img, button, p") && close()}
          >
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <p className="s-label">
                <span className="text-foreground">{String(index! + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
              </p>
              <button type="button" onClick={close} className="s-lb-btn" aria-label="Close">
                ✕
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                className="s-lb-img max-h-full max-w-full rounded-lg object-contain"
              />
              {/* Side arrows from tablet width up; phones use the pair under the caption. The wrapper owns the
                  visibility because .s-lb-btn sets its own display. */}
              <div className="hidden sm:contents">
                <button type="button" onClick={() => step(-1)} className="s-lb-btn absolute left-4 top-1/2 -translate-y-1/2" aria-label="Previous still">
                  ←
                </button>
                <button type="button" onClick={() => step(1)} className="s-lb-btn absolute right-4 top-1/2 -translate-y-1/2" aria-label="Next still">
                  →
                </button>
              </div>
            </div>

            <div className="flex items-end justify-between gap-4 px-4 pb-5 pt-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-[15px] font-medium">{current.game}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
                  {current.kind} · {current.alt}
                </p>
              </div>
              <div className="flex shrink-0 gap-2 sm:hidden">
                <button type="button" onClick={() => step(-1)} className="s-lb-btn" aria-label="Previous still">
                  ←
                </button>
                <button type="button" onClick={() => step(1)} className="s-lb-btn" aria-label="Next still">
                  →
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
