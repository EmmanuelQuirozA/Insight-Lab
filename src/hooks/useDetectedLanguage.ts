import { useEffect, useState } from 'react'

export type Language = 'es' | 'en'

const LANGUAGE_STORAGE_KEY = 'insight-lab-language'

const isLanguage = (value: string | null): value is Language => value === 'es' || value === 'en'

const getStoredLanguage = (): Language | null => {
  if (typeof window === 'undefined') {
    return null
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  return isLanguage(storedLanguage) ? storedLanguage : null
}

const detectBrowserLanguage = (): Language => {
  if (typeof navigator === 'undefined') {
    return 'en'
  }

  const preferredLanguage = navigator.languages?.[0] ?? navigator.language

  return preferredLanguage.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export default function useDetectedLanguage() {
  const [language, setLanguage] = useState<Language>(() => getStoredLanguage() ?? detectBrowserLanguage())

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    }
  }, [language])

  return [language, setLanguage] as const
}
