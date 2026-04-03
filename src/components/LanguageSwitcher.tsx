'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { locales, localeNames, type Locale } from '@/lib/i18n'

const localeShort: Record<Locale, string> = {
  zh: '中',
  en: 'EN',
  ru: 'RU',
}

interface Props {
  currentLocale: Locale
}

function LanguageSwitcherInner({ currentLocale }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function getLocalePath(locale: Locale): string {
    const segments = pathname.split('/').filter(Boolean)
    segments[0] = locale
    const nextPath = '/' + segments.join('/')
    const query = searchParams.toString()
    return query ? `${nextPath}?${query}` : nextPath
  }

  return (
    <>
      {locales.map((locale) => (
        <Link
          key={locale}
          href={getLocalePath(locale)}
          style={{ fontWeight: locale === currentLocale ? 'bold' : 'normal' }}
        >
          <span className="lang-full">{localeNames[locale]}</span>
          <span className="lang-short">{localeShort[locale]}</span>
        </Link>
      ))}
    </>
  )
}

export function LanguageSwitcher({ currentLocale }: Props) {
  return (
    <div className="nav-bar">
      <Suspense>
        <LanguageSwitcherInner currentLocale={currentLocale} />
      </Suspense>
    </div>
  )
}
