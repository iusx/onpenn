'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, localeNames, type Locale } from '@/lib/i18n'

interface Props {
  currentLocale: Locale
}

export function LanguageSwitcher({ currentLocale }: Props) {
  const pathname = usePathname()

  function getLocalePath(locale: Locale): string {
    // Replace the first path segment (the locale) with the new one
    const segments = pathname.split('/').filter(Boolean)
    segments[0] = locale
    return '/' + segments.join('/')
  }

  return (
    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
      {locales.map((locale) => (
        <Link
          key={locale}
          href={getLocalePath(locale)}
          style={{ fontWeight: locale === currentLocale ? 'bold' : 'normal' }}
        >
          {localeNames[locale]}
        </Link>
      ))}
    </div>
  )
}
