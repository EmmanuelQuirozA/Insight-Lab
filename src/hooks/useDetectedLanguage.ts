import { useState } from 'react'

export type Language = 'es' | 'en'

const detectBrowserLanguage = (): Language => {
  if (typeof navigator === 'undefined') {
    return 'en'
  }

  const preferredLanguage = navigator.languages?.[0] ?? navigator.language

  return preferredLanguage.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export default function useDetectedLanguage() {
  return useState<Language>(detectBrowserLanguage)
}
