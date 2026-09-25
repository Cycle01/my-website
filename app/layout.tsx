import type { Metadata, Viewport } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { asset } from '@/lib/asset'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono" });
// Brush calligraphy for the Chinese accents, subset to only the characters the
// site uses (~28 KB instead of ~740 KB). Re-run `node scripts/subset-brush-font.mjs`
// after adding new Chinese text.
const _maShanZheng = localFont({
  src: './fonts/ma-shan-zheng-subset.woff2',
  variable: '--font-ma-shan-zheng',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: "Cycle's Studios - Cycle01 Game Dev Portfolio",
  description:
    "Cycle01 is the solo indie developer behind Cycle's Studios: horror games in Unreal Engine 5, the mobile game Fling It, and vibe-coded Chrome extensions. Now building Secrets of Sundown 2.",
  generator: 'v0.app',
  icons: {
    icon: [
      { url: asset('/favicon-gold-32.png'), type: 'image/png', sizes: '32x32' },
      { url: asset('/favicon-gold-192.png'), type: 'image/png', sizes: '192x192' },
    ],
    apple: asset('/apple-touch-icon-gold.png'),
  },
}

export const viewport: Viewport = {
  themeColor: '#1f1816',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JS runs, so content never stays hidden. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className={`${_inter.variable} ${_spaceMono.variable} ${_maShanZheng.variable} font-sans antialiased`}>
        {children}
        {process.env.NEXT_PUBLIC_BASE_PATH ? null : <Analytics />}
      </body>
    </html>
  )
}
