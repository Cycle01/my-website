// Rebuilds app/fonts/ma-shan-zheng-subset.woff2 with exactly the Chinese
// characters used in components/, lib/ and app/. Run after editing Chinese text:
//   node scripts/subset-brush-font.mjs
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs"
import { join } from "node:path"

const ROOTS = ["components", "lib", "app"]
const CJK = /[　-〿一-鿿＀-￯]/g
const OUT = "app/fonts/ma-shan-zheng-subset.woff2"
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36"

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return name === "ui" || name === "fonts" ? [] : walk(path)
    return /\.(tsx?|css)$/.test(name) ? [path] : []
  })
}

const chars = new Set(ROOTS.flatMap(walk).flatMap((f) => readFileSync(f, "utf8").match(CJK) ?? []))
const text = [...chars].sort().join("")
if (!text) {
  console.error("No Chinese characters found; nothing to do.")
  process.exit(1)
}

const cssUrl = `https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&text=${encodeURIComponent(text)}`
const css = await (await fetch(cssUrl, { headers: { "User-Agent": UA } })).text()
const fontUrl = css.match(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/)?.[1]
if (!fontUrl) {
  console.error("Google Fonts did not return a font URL:\n" + css)
  process.exit(1)
}

const font = Buffer.from(await (await fetch(fontUrl)).arrayBuffer())
writeFileSync(OUT, font)
console.log(`Wrote ${OUT}: ${chars.size} characters, ${(font.length / 1024).toFixed(1)} KB`)
