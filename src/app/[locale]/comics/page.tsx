import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { isValidLocale, getMessages, locales, type Locale } from '@/lib/i18n'
import { comics } from '@/data/comics'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { ComicsFilter } from '@/components/ComicsFilter'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  if (!isValidLocale(params.locale)) return {}
  const messages = getMessages(params.locale as Locale)
  return { title: messages.allComics }
}

export default function ComicsListPage({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) notFound()
  const locale = params.locale as Locale
  const messages = getMessages(locale)

  return (
    <div className="page" style={{ alignItems: 'flex-start', maxWidth: 640, margin: '0 auto' }}>
      <div className="nav-bar">
        <Link href={`/${locale}`}>← {messages.editorBackHome}</Link>
        <b>{messages.allComics}</b>
        <LanguageSwitcher currentLocale={locale} />
      </div>
      <ComicsFilter comics={comics} locale={locale} messages={messages} />
    </div>
  )
}
