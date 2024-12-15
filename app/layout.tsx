import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { LanguageSwitch } from '@/components/language-switch'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '日期图片生成器',
  description: '一个简单的日期图片生成器，支持多种格式和样式',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  }
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang?: string }
}) {
  // 根据路径判断当前语言
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  const lang = pathname.startsWith('/en') ? 'en' : 'zh'

  return (
    <html lang={lang} className={inter.className}>
      <body className="min-h-screen bg-white">
        <div className="fixed top-4 right-4 z-[100]">
          <LanguageSwitch />
        </div>
        {children}
      </body>
    </html>
  )
} 