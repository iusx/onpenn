import Link from 'next/link'
import { LanguageSwitcher } from './LanguageSwitcher'
import type { Messages, Locale } from '@/lib/i18n'

interface Props {
  locale: Locale
  messages: Messages
}

export function Header({ locale, messages }: Props) {
  return (
    <header className="bg-white border-b border-amber-100 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 max-w-4xl flex items-center justify-between gap-4">
        <Link href={`/${locale}`} className="group shrink-0">
          <h1 className="text-xl font-extrabold text-gray-900 group-hover:text-amber-600 transition-colors leading-tight">
            <span className="text-amber-400 mr-1">📰</span>
            {messages.siteTitle}
          </h1>
          <p className="text-xs text-gray-400 hidden sm:block">{messages.siteSubtitle}</p>
        </Link>
        <LanguageSwitcher currentLocale={locale} />
      </div>
    </header>
  )
}
