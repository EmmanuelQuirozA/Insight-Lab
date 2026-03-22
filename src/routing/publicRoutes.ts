export type Language = 'en' | 'es'

export type RouteKey = 'home' | 'solutions' | 'successStories' | 'about' | 'contact' | 'realEstateDiagnosis' | 'blog'

export const LOCALIZED_ROUTE_MAP: Record<RouteKey, Record<Language, string>> = {
  home: { en: '/en', es: '/es' },
  solutions: { en: '/en/solutions', es: '/es/soluciones' },
  successStories: { en: '/en/success-stories', es: '/es/casos-de-exito' },
  about: { en: '/en/about', es: '/es/nosotros' },
  contact: { en: '/en/contact', es: '/es/contacto' },
  realEstateDiagnosis: { en: '/en/real-estate-diagnosis', es: '/es/diagnostico-inmobiliario' },
  blog: { en: '/en/blog', es: '/es/blog' },
}

const LEGACY_ROUTE_TO_KEY: Record<string, RouteKey> = {
  '/': 'home',
  '/solutions': 'solutions',
  '/success-stories': 'successStories',
  '/about': 'about',
  '/contact': 'contact',
  '/real-estate-diagnosis': 'realEstateDiagnosis',
  '/real-state-maturity-quiz': 'realEstateDiagnosis',
  '/blog': 'blog',
}

const normalizePath = (pathname: string) => {
  if (!pathname) {
    return '/'
  }

  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }

  return pathname
}

export const getLocalizedPath = (routeKey: RouteKey, language: Language) => LOCALIZED_ROUTE_MAP[routeKey][language]

export const getRouteKeyFromPath = (pathname: string): RouteKey | null => {
  const normalizedPath = normalizePath(pathname)

  for (const [routeKey, paths] of Object.entries(LOCALIZED_ROUTE_MAP) as Array<[RouteKey, Record<Language, string>]>) {
    if (paths.en === normalizedPath || paths.es === normalizedPath) {
      return routeKey
    }
  }

  return null
}

export const getPathLanguage = (pathname: string): Language | null => {
  const normalizedPath = normalizePath(pathname)

  if (normalizedPath === '/en' || normalizedPath.startsWith('/en/')) {
    return 'en'
  }

  if (normalizedPath === '/es' || normalizedPath.startsWith('/es/')) {
    return 'es'
  }

  return null
}

export const getAlternateLanguagePath = (pathname: string, targetLanguage: Language): string | null => {
  const routeKey = getRouteKeyFromPath(pathname)

  if (!routeKey) {
    return null
  }

  return getLocalizedPath(routeKey, targetLanguage)
}

export const getLegacyRedirectPath = (pathname: string, language: Language): string | null => {
  const normalizedPath = normalizePath(pathname)
  const mappedKey = LEGACY_ROUTE_TO_KEY[normalizedPath]

  if (!mappedKey) {
    return null
  }

  return getLocalizedPath(mappedKey, language)
}

export const getAllLocalizedPaths = () =>
  (Object.values(LOCALIZED_ROUTE_MAP) as Array<Record<Language, string>>).flatMap((paths) => [paths.en, paths.es])
