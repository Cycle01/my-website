// GITHUB_PAGES=true builds a static export served from https://cycle01.github.io/my-website/.
// Every other build (local dev, Vercel) is unchanged and served from the domain root.
const isGithubPages = process.env.GITHUB_PAGES === 'true'
const basePath = isGithubPages ? '/my-website' : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isGithubPages && {
    output: 'export',
    basePath,
    trailingSlash: true,
  }),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
