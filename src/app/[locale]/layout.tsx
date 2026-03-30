import { notFound } from 'next/navigation'
import { isValidLocale, locales } from '@/lib/i18n'
import { LocaleProvider } from '@/components/LocaleProvider'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!isValidLocale(params.locale)) notFound()

  return (
    <LocaleProvider locale={params.locale}>
      {children}
    </LocaleProvider>
  )
}
