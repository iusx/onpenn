import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: '每日漫画 · Daily Comics',
  description: '每天一张，笑口常开 — A new comic every day',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={nunito.variable}>
      <body className="font-[var(--font-nunito)] antialiased min-h-screen bg-[#fdf8f0]">
        {children}
      </body>
    </html>
  )
}
