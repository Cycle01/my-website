"use client"

import { useEffect } from "react"
import { asset } from "@/lib/asset"

/**
 * The portfolio used to live at the site root. Old links such as /#archive or
 * /#fling-it now point at the studio page, so forward any anchor the studio
 * page doesn't have to the same anchor on the portfolio.
 */
export function HashRedirect() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id || document.getElementById(id)) return
    window.location.replace(`${asset("/portfolio/")}#${encodeURIComponent(id)}`)
  }, [])
  return null
}
