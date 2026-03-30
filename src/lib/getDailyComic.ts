import { comics } from '@/data/comics'
import type { Comic } from '@/data/comics'

export function getDailyComic(date: Date = new Date()): Comic {
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  // Simple deterministic hash: same date always returns the same comic
  const seed = y * 10000 + m * 100 + d
  const idx = seed % comics.length
  return comics[idx]
}

export function getDateString(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function formatDate(date: Date, locale: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const intlLocale =
    locale === 'zh' ? 'zh-CN' : locale === 'ru' ? 'ru-RU' : 'en-US'
  return date.toLocaleDateString(intlLocale, options)
}
