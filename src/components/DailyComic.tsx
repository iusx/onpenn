'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { getDailyComic, getDateString, addDays } from '@/lib/getDailyComic'
import type { Messages, Locale } from '@/lib/i18n'

interface Props {
  locale: Locale
  messages: Messages
}

export function DailyComic({ locale, messages }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [currentDate, setCurrentDate] = useState<Date | null>(null)

  useEffect(() => {
    const dateParam = searchParams.get('date')
    if (dateParam) {
      const parsed = new Date(dateParam + 'T00:00:00')
      setCurrentDate(isNaN(parsed.getTime()) ? new Date() : parsed)
    } else {
      setCurrentDate(new Date())
    }
  }, [searchParams])

  if (!currentDate) return <p>{messages.loading}</p>

  const comic = getDailyComic(currentDate)
  const translation =
    comic.translations[locale] ??
    comic.translations['en'] ??
    (Object.values(comic.translations)[0] as (typeof comic.translations)['en'])

  function navigate(days: number) {
    const newDate = addDays(currentDate!, days)
    const params = new URLSearchParams(searchParams.toString())
    params.set('date', getDateString(newDate))
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <img
          src={comic.image}
          alt={translation?.title ?? ''}
          style={{ display: 'block', maxWidth: '100%', maxHeight: '85vh' }}
        />
        {translation?.bubbles.map(b =>
          b.x !== undefined && b.y !== undefined ? (
            <div
              key={b.id}
              style={{
                position: 'absolute',
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: `${b.w ?? 28}%`,
                height: b.h ? `${b.h}%` : undefined,
                transform: 'translate(-50%, -50%)',
                background: b.bg,
                borderRadius: b.shape === 'ellipse' ? '50%' : undefined,
                textAlign: 'center',
                fontSize: `max(${(b.fontSize ?? 1.5) * 10}px, ${b.fontSize ?? 1.5}vw)`,
                fontWeight: 'bold',
                fontFamily: b.fontFamily,
                lineHeight: 1.3,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflow: b.h ? 'hidden' : undefined,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {b.text}
            </div>
          ) : null
        )}
      </div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <button onClick={() => navigate(-1)}>← {messages.prevDay}</button>
        <button onClick={() => navigate(1)}>{messages.nextDay} →</button>
      </div>
    </>
  )
}
