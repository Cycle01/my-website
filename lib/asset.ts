const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

/**
 * Prefixes a /public path with the deploy base path. next/image and metadata
 * icons don't add basePath on their own, so the GitHub Pages build needs this.
 */
export function asset(path: string): string {
  return `${basePath}${path}`
}
