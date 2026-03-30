import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
