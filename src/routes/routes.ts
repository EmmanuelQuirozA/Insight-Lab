import { isResultTier, isSupportedLanguage, type ResultTier, type SupportedLanguage } from '../config/diagnosisIframes'

export type DiagnosisRouteMatch =
  | { type: 'diagnosis'; language: SupportedLanguage }
  | { type: 'result'; language: SupportedLanguage; tier: ResultTier | null }
  | { type: 'none' }

const diagnosisRoutePattern = /^\/(es|en)\/real-estate-diagnosis\/?$/
const resultRoutePattern = /^\/(es|en)\/real-estate-diagnosis\/results\/([^/]+)\/?$/

export const matchDiagnosisRoute = (pathname: string): DiagnosisRouteMatch => {
  const diagnosisMatch = pathname.match(diagnosisRoutePattern)

  if (diagnosisMatch && isSupportedLanguage(diagnosisMatch[1])) {
    return {
      type: 'diagnosis',
      language: diagnosisMatch[1],
    }
  }

  const resultMatch = pathname.match(resultRoutePattern)

  if (resultMatch && isSupportedLanguage(resultMatch[1])) {
    return {
      type: 'result',
      language: resultMatch[1],
      tier: isResultTier(resultMatch[2]) ? resultMatch[2] : null,
    }
  }

  return { type: 'none' }
}

export const replaceLanguageInPath = (pathname: string, nextLanguage: SupportedLanguage) => {
  const segments = pathname.split('/').filter(Boolean)

  if (segments[0] === 'es' || segments[0] === 'en') {
    segments[0] = nextLanguage
    return `/${segments.join('/')}`
  }

  return `/${nextLanguage}/${segments.join('/')}`.replace(/\/$/, '')
}
