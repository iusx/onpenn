'use client'

import { useState } from 'react'
import type { Comic } from '@/data/comics'
import type { Messages, Locale } from '@/lib/i18n'

interface Props {
  comic: Comic
  locale: Locale
  messages: Messages
  formattedDate: string
}

export function ComicCard({ comic, locale, messages, formattedDate }: Props) {
  const [imgError, setImgError] = useState(false)

  const translation =
    comic.translations[locale] ??
    comic.translations['en'] ??
    (Object.values(comic.translations)[0] as typeof comic.translations['en'])

  if (!translation) return null

  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-100/60">
      {/* Main grid: image | translation */}
      <div className="md:grid md:grid-cols-2">
        {/* ── Image ── */}
        <div className="flex flex-col">
          <div className="aspect-[4/3] bg-amber-50 flex items-center justify-center overflow-hidden">
            {imgError ? (
              <div className="flex flex-col items-center gap-3 text-amber-400 p-8 text-center">
                <span className="text-7xl select-none">🎭</span>
                <p className="text-sm font-medium text-amber-600">
                  将漫画图片放入
                  <br />
                  <code className="bg-amber-100 px-1 rounded text-xs">
                    /public/comics/{comic.id}.jpg
                  </code>
                </p>
              </div>
            ) : (
              <img
                src={comic.image}
                alt={translation.title}
                className="w-full h-full object-contain"
                onError={() => setImgError(true)}
              />
            )}
          </div>

          {/* Attribution bar */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 flex-wrap">
            <span>
              ✏️ {messages.by}:{' '}
              <span className="font-semibold text-gray-700">{comic.author}</span>
            </span>
            <span className="text-gray-300">·</span>
            <span>
              🗞️ {comic.source}
            </span>
          </div>
        </div>

        {/* ── Translation panel ── */}
        <div className="p-6 flex flex-col justify-center bg-gradient-to-br from-amber-50/60 to-orange-50/30 border-t md:border-t-0 md:border-l border-amber-100">
          <div className="mb-5 pb-3 border-b border-amber-200">
            <h2 className="font-bold text-gray-800 text-base leading-snug">
              {translation.title}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">{formattedDate}</p>
          </div>

          {/* Speech bubbles */}
          <div className="space-y-3">
            {translation.bubbles.map((bubble) => {
              const isRight = bubble.position === 'right'
              return (
                <div
                  key={bubble.id}
                  className={`flex items-end gap-2 ${isRight ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar dot */}
                  <div
                    className={[
                      'w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold',
                      isRight
                        ? 'bg-amber-400 text-white'
                        : 'bg-sky-400 text-white',
                    ].join(' ')}
                  >
                    {bubble.speaker
                      ? bubble.speaker[0].toUpperCase()
                      : isRight
                      ? 'B'
                      : 'A'}
                  </div>

                  {/* Bubble */}
                  <div
                    className={[
                      'px-4 py-2.5 rounded-2xl max-w-[78%] text-sm font-medium leading-relaxed',
                      isRight
                        ? 'bg-amber-400 text-white rounded-br-none shadow-sm'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm',
                    ].join(' ')}
                  >
                    {bubble.speaker && (
                      <p
                        className={`text-[10px] font-bold mb-0.5 ${
                          isRight ? 'text-amber-100' : 'text-gray-400'
                        }`}
                      >
                        {bubble.speaker}
                      </p>
                    )}
                    {bubble.text}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Translator note */}
          {translation.translatorNote && (
            <p className="mt-5 text-xs text-gray-400 italic border-t border-amber-100 pt-3">
              💡 {messages.translatorNote}: {translation.translatorNote}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
