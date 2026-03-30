'use client'

import { useEffect } from 'react'

export function LocaleProvider({
  locale,
  children,
}: {
  locale: string
  children: React.ReactNode
}) {
  useEffect(() => {
    const langMap: Record<string, string> = {
      zh: 'zh-CN',
      ru: 'ru-RU',
      en: 'en',
    }
    document.documentElement.lang = langMap[locale] ?? locale
  }, [locale])

  return <>{children}</>
}
