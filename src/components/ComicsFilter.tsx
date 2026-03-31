'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Comic } from '@/data/comics'
import type { Messages, Locale } from '@/lib/i18n'

interface Props {
  comics: Comic[]
  locale: Locale
  messages: Messages
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values))
}

const btnBase: React.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  font: 'inherit',
}

function TagGroup({
  label,
  tags,
  selected,
  allLabel,
  onSelect,
}: {
  label: string
  tags: string[]
  selected: string | null
  allLabel: string
  onSelect: (value: string | null) => void
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem 0.5rem', alignItems: 'baseline' }}>
      <b>{label}:</b>
      <button
        onClick={() => onSelect(null)}
        style={{ ...btnBase, fontWeight: selected === null ? 'bold' : undefined, textDecoration: selected === null ? 'underline' : undefined }}
      >
        {allLabel}
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelect(selected === tag ? null : tag)}
          style={{ ...btnBase, fontWeight: selected === tag ? 'bold' : undefined, textDecoration: selected === tag ? 'underline' : undefined }}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}

export function ComicsFilter({ comics, locale, messages }: Props) {
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null)
  const [selectedSource, setSelectedSource] = useState<string | null>(null)

  const authors = unique(comics.map((c) => c.author))
  const sources = unique(comics.map((c) => c.source))

  const filtered = comics.filter(
    (c) =>
      (!selectedAuthor || c.author === selectedAuthor) &&
      (!selectedSource || c.source === selectedSource)
  )

  return (
    <div>
      <TagGroup
        label={messages.by}
        tags={authors}
        selected={selectedAuthor}
        allLabel={messages.filterAll}
        onSelect={setSelectedAuthor}
      />
      <TagGroup
        label={messages.source}
        tags={sources}
        selected={selectedSource}
        allLabel={messages.filterAll}
        onSelect={setSelectedSource}
      />
      <ul style={{ marginTop: '0.5rem' }}>
        {filtered.length === 0 ? (
          <li><small>{messages.comicNotFound}</small></li>
        ) : (
          filtered.map((comic) => {
            const translation =
              comic.translations[locale] ??
              comic.translations['en'] ??
              (Object.values(comic.translations)[0] as (typeof comic.translations)['en'])
            return (
              <li key={comic.id}>
                <Link href={`/${locale}/?name=${comic.id}`}>
                  {translation?.title ?? comic.id}
                </Link>
                {comic.date && <> — <small>{comic.date}</small></>}
              </li>
            )
          })
        )}
      </ul>
    </div>
  )
}
