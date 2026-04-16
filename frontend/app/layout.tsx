import type { Metadata } from 'next'
import { Noto_Serif_JP, Noto_Sans_JP } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSerifJP = Noto_Serif_JP({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif"
})

const notoSansJP = Noto_Sans_JP({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans"
})

export const metadata: Metadata = {
  title: 'MedBrief - 医療・防災ニュース AIキュレーター',
  description: '歯科医師向け医療・防災ニュースのAIブリーフィングサービス',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${notoSerifJP.variable} ${notoSansJP.variable}`}>
      <body className="font-sans antialiased bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
