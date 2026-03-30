'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getComicById, getRandomId } from '@/lib/getDailyComic'
import type { Messages, Locale } from '@/lib/i18n'

interface Props {
  locale: Locale
  messages: Messages
}

export function DailyComic({ locale, messages }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [currentId, setCurrentId] = useState<string | null>(null)

  useEffect(() => {
    const idParam = searchParams.get('name')
    if (idParam && getComicById(idParam)) {
      setCurrentId(idParam)
    } else {
      setCurrentId(getRandomId())
    }
  }, [searchParams])

  if (currentId === null) return <p>{messages.loading}</p>

  const comic = getComicById(currentId)!
  const translation =
    comic.translations[locale] ??
    comic.translations['en'] ??
    (Object.values(comic.translations)[0] as (typeof comic.translations)['en'])
  // Don't render overlays when viewing in the source language (text is already in the image)
  const showOverlays = comic.sourceLanguage !== locale

  function goRandom() {
    const newId = getRandomId(currentId!)
    const params = new URLSearchParams(searchParams.toString())
    params.set('name', newId)
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
        {showOverlays && translation?.bubbles.map(b =>
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
                fontFamily: b.fontFamily ?? translation?.fontFamily,
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
      <div className="nav-bar">
        <button onClick={goRandom}>🎲 {messages.nextDay}</button>
        <Link href={`/${locale}/comics`} style={{ textDecoration: 'none' }}>
          <button>☰ {messages.allComics}</button>
        </Link>
      </div>
    </>
  )
}
