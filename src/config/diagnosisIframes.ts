export const SUPPORTED_LANGUAGES = ['es', 'en'] as const
export const RESULT_TIERS = ['high', 'medium', 'low'] as const

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]
export type ResultTier = (typeof RESULT_TIERS)[number]

type DiagnosisIframeConfig = {
  quiz: string
  results: Record<ResultTier, string>
}

export const diagnosisIframes: Record<SupportedLanguage, DiagnosisIframeConfig> = {
  es: {
    // TODO: pega aquí la URL del iframe del quiz en español.
    quiz: 'PASTE_ES_REAL_ESTATE_QUIZ_IFRAME_URL_HERE',
    results: {
      // TODO: pega aquí la URL del resultado HIGH en español.
      high: 'PASTE_ES_REAL_ESTATE_RESULT_HIGH_IFRAME_URL_HERE',
      // TODO: pega aquí la URL del resultado MEDIUM en español.
      medium: 'PASTE_ES_REAL_ESTATE_RESULT_MEDIUM_IFRAME_URL_HERE',
      // TODO: pega aquí la URL del resultado LOW en español.
      low: 'PASTE_ES_REAL_ESTATE_RESULT_LOW_IFRAME_URL_HERE',
    },
  },
  en: {
    // TODO: pega aquí la URL del iframe del quiz en inglés.
    quiz: 'PASTE_EN_REAL_ESTATE_QUIZ_IFRAME_URL_HERE',
    results: {
      // TODO: pega aquí la URL del resultado HIGH en inglés.
      high: 'PASTE_EN_REAL_ESTATE_RESULT_HIGH_IFRAME_URL_HERE',
      // TODO: pega aquí la URL del resultado MEDIUM en inglés.
      medium: 'PASTE_EN_REAL_ESTATE_RESULT_MEDIUM_IFRAME_URL_HERE',
      // TODO: pega aquí la URL del resultado LOW en inglés.
      low: 'PASTE_EN_REAL_ESTATE_RESULT_LOW_IFRAME_URL_HERE',
    },
  },
}

export const isSupportedLanguage = (value: string | undefined): value is SupportedLanguage =>
  Boolean(value && SUPPORTED_LANGUAGES.includes(value as SupportedLanguage))

export const isResultTier = (value: string | undefined): value is ResultTier =>
  Boolean(value && RESULT_TIERS.includes(value as ResultTier))
