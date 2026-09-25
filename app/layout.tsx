import type { Metadata, Viewport } from 'next'
import { Inter, Space_Mono, Ma_Shan_Zheng } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { asset } from '@/lib/asset'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono" });
// Brush calligraphy for the Chinese accents. The CJK glyphs ship as unicode-range
// slices, so browsers only download the handful of characters the page uses.
const _maShanZheng = Ma_Shan_Zheng({ weight: "400", subsets: ["latin"], variable: "--font-ma-shan-zheng", preload: false });

export const metadata: Metadata = {
  title: "Cycle's Studios - Cycle01 Game Dev Portfolio",
  description:
    "Cycle01 is the solo indie developer behind Cycle's Studios: horror games in Unreal Engine 5 and Godot, the mobile game Fling It, and vibe-coded Chrome extensions. Now building Secrets of Sundown 2.",
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: asset('/icon-light-32x32.png'),
        media: '(prefers-color-scheme: light)',
      },
      {
        url: asset('/icon-dark-32x32.png'),
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: asset('/icon.png'),
        type: 'image/png',
        sizes: '512x512',
      },
    ],
    apple: asset('/apple-icon.png'),
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
