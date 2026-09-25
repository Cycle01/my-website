"use client"

import { useEffect, useState } from "react"

/** Bogdan's local time, the way studio sites show where the work happens. */
export function LocalTime({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Bucharest" })
    const update = () => setTime(fmt.format(new Date()))
    update()
    const id = window.setInterval(update, 15000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <span className={className}>
      Bucharest <span className="tabular-nums text-foreground">{time ?? "--:--"}</span>
    </span>
  )
}
