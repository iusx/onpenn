import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { isValidLocale, getMessages, locales, type Locale } from '@/lib/i18n'
import { DailyComic } from '@/components/DailyComic'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

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
  return {
    title: messages.siteTitle,
    description: messages.siteSubtitle,
  }
}

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) notFound()
  const locale = params.locale as Locale
  const messages = getMessages(locale)

  return (
    <div className="page">
      <LanguageSwitcher currentLocale={locale} />
      <Suspense fallback={<p>{messages.loading}</p>}>
        <DailyComic locale={locale} messages={messages} />
      </Suspense>
      <p><Link href={`/${locale}/editor`}>{messages.openEditor}</Link></p>
    </div>
  )
}
