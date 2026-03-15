import {
  LOCALIZED_ROUTE_MAP,
  getAlternateLanguagePath,
  getPathLanguage,
  getRouteKeyFromPath,
  type Language,
  type RouteKey,
} from '../routing/publicRoutes'

export const SITE_URL = 'https://www.insightlab.com.mx'

type SeoRoute = {
  title: string
  description: string
  path: string
  ogType?: 'website' | 'article'
}

export const PUBLIC_ROUTE_SEO: Record<RouteKey, Record<Language, SeoRoute>> = {
  home: {
    en: {
      title: 'Revenue Operations & Marketing Services for High-Ticket Growth | Insight Lab',
      description:
        'Insight Lab builds Revenue Operations and digital marketing systems for high-ticket services, real estate and medical tourism brands.',
      path: LOCALIZED_ROUTE_MAP.home.en,
      ogType: 'website',
    },
    es: {
      title: 'Servicios de Revenue Operations y Marketing para crecimiento High-Ticket | Insight Lab',
      description:
        'Insight Lab diseña sistemas de Revenue Operations y marketing digital para servicios high-ticket, real estate y turismo médico.',
      path: LOCALIZED_ROUTE_MAP.home.es,
      ogType: 'website',
    },
  },
  solutions: {
    en: {
      title: 'Revenue Operations Solutions: CRM, Lead Scoring & Automation | Insight Lab',
      description:
        'Explore Insight Lab solutions: CRM implementation, lead scoring, conversion architecture, automation, and performance growth systems.',
      path: LOCALIZED_ROUTE_MAP.solutions.en,
    },
    es: {
      title: 'Soluciones de Revenue Operations: CRM, Lead Scoring y Automatización | Insight Lab',
      description:
        'Conoce las soluciones de Insight Lab: implementación de CRM, lead scoring, arquitectura de conversión y automatización para crecer.',
      path: LOCALIZED_ROUTE_MAP.solutions.es,
    },
  },
  successStories: {
    en: {
      title: 'Marketing & RevOps Success Stories | Insight Lab',
      description:
        'See how Insight Lab helps high-ticket businesses improve qualified pipeline, close rates, and measurable revenue growth.',
      path: LOCALIZED_ROUTE_MAP.successStories.en,
    },
    es: {
      title: 'Casos de éxito en Marketing y RevOps | Insight Lab',
      description:
        'Descubre cómo Insight Lab ayuda a empresas high-ticket a mejorar pipeline calificado, cierre comercial y crecimiento en ingresos.',
      path: LOCALIZED_ROUTE_MAP.successStories.es,
    },
  },
  about: {
    en: {
      title: 'About Insight Lab | Revenue Operations & Growth Engineering Team',
      description:
        'Meet Insight Lab, a growth engineering team combining strategic marketing, data, and automation to drive predictable revenue.',
      path: LOCALIZED_ROUTE_MAP.about.en,
    },
    es: {
      title: 'Nosotros en Insight Lab | Equipo de Revenue Operations y Growth Engineering',
      description:
        'Conoce a Insight Lab, un equipo de growth engineering que combina marketing estratégico, datos y automatización para ingresos predecibles.',
      path: LOCALIZED_ROUTE_MAP.about.es,
    },
  },
  contact: {
    en: {
      title: 'Contact Insight Lab | Request a Revenue Growth Audit',
      description:
        'Book a strategy session with Insight Lab to identify conversion leaks, improve pipeline quality, and scale revenue operations.',
      path: LOCALIZED_ROUTE_MAP.contact.en,
    },
    es: {
      title: 'Contacto Insight Lab | Solicita una auditoría de crecimiento',
      description:
        'Agenda una sesión estratégica con Insight Lab para detectar fugas de conversión, mejorar tu pipeline y escalar revenue operations.',
      path: LOCALIZED_ROUTE_MAP.contact.es,
    },
  },
  realEstateDiagnosis: {
    en: {
      title: 'Real Estate Digital Maturity Quiz | Insight Lab',
      description:
        'Take the digital maturity quiz for real estate developers and identify key RevOps and marketing gaps affecting your sales cycle.',
      path: LOCALIZED_ROUTE_MAP.realEstateDiagnosis.en,
    },
    es: {
      title: 'Diagnóstico de Madurez Digital Inmobiliaria | Insight Lab',
      description:
        'Completa el diagnóstico de madurez digital para desarrollos inmobiliarios e identifica brechas de RevOps y marketing en tu ciclo comercial.',
      path: LOCALIZED_ROUTE_MAP.realEstateDiagnosis.es,
    },
  },
}

export const getRouteSeo = (pathname: string, language: Language): SeoRoute => {
  const routeKey = getRouteKeyFromPath(pathname) ?? 'home'
  return PUBLIC_ROUTE_SEO[routeKey][language]
}

export const getAlternateUrls = (pathname: string, language: Language) => {
  const current = getRouteSeo(pathname, language)
  const routeLanguage = getPathLanguage(pathname) ?? language
  const alternateLanguage: Language = routeLanguage === 'en' ? 'es' : 'en'
  const alternatePath = getAlternateLanguagePath(pathname, alternateLanguage)

  return {
    canonical: `${SITE_URL}${current.path}`,
    currentLanguage: routeLanguage,
    alternateLanguage,
    alternate: alternatePath ? `${SITE_URL}${alternatePath}` : null,
    xDefault: `${SITE_URL}${LOCALIZED_ROUTE_MAP.home.en}`,
  }
}

export const PRERENDER_ROUTES = Object.values(LOCALIZED_ROUTE_MAP).flatMap((paths) => [paths.en, paths.es])

export const RECOMMENDED_URL_MIGRATIONS: Array<{ current: string; recommended: string }> = [
  { current: '/', recommended: LOCALIZED_ROUTE_MAP.home.en },
  { current: '/solutions', recommended: LOCALIZED_ROUTE_MAP.solutions.en },
  { current: '/success-stories', recommended: LOCALIZED_ROUTE_MAP.successStories.en },
  { current: '/about', recommended: LOCALIZED_ROUTE_MAP.about.en },
  { current: '/contact', recommended: LOCALIZED_ROUTE_MAP.contact.en },
  { current: '/real-estate-diagnosis', recommended: LOCALIZED_ROUTE_MAP.realEstateDiagnosis.en },
  { current: '/real-state-maturity-quiz', recommended: LOCALIZED_ROUTE_MAP.realEstateDiagnosis.en },
]
