'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const LOCALES = ['zh', 'en', 'ru'] as const

function detectLocale(): string {
  if (typeof navigator === 'undefined') return 'zh'
  const lang = navigator.language.toLowerCase()
  if (lang.startsWith('zh')) return 'zh'
  if (lang.startsWith('ru')) return 'ru'
  if (lang.startsWith('en')) return 'en'
  return 'zh'
}

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace(`/${detectLocale()}`)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-amber-500 font-semibold text-lg">…</div>
    </div>
  )
}
