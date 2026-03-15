import {
  LOCALIZED_ROUTE_MAP,
  getAlternateLanguagePath,
  getPathLanguage,
  getRouteKeyFromPath,
  type Language,
} from '../routing/publicRoutes'

export const SITE_URL = 'https://www.insightlab.com.mx'

export type SeoLang = 'en' | 'es'

export interface SeoRoute {
  title: string
  description: string
  path: string
  ogType?: 'website' | 'article'
}

export const PUBLIC_ROUTE_SEO: Record<SeoLang, Record<string, SeoRoute>> = {
  en: {
    home: {
      title: 'Revenue Operations & Marketing Systems for Real Estate and Medical Tourism | Insight Lab',
      description:
        'Insight Lab builds Revenue Operations systems, CRM infrastructure and marketing automation for real estate developers and medical tourism clinics to increase qualified leads and revenue.',
      path: '/en',
      ogType: 'website',
    },

    solutions: {
      title: 'Revenue Operations Consulting, CRM & Automation for High-Ticket Businesses',
      description:
        'Discover Insight Lab solutions: CRM implementation, lead scoring, pipeline automation and conversion systems for real estate and medical tourism companies.',
      path: '/en/solutions',
    },

    successStories: {
      title: 'Real Estate & Medical Marketing Case Studies | Revenue Growth Results',
      description:
        'See how Insight Lab improves qualified pipeline, conversion rates and revenue growth for real estate developers and medical tourism clinics.',
      path: '/en/success-stories',
    },

    about: {
      title: 'Insight Lab | Revenue Operations & Growth Engineering Team',
      description:
        'Insight Lab is a Revenue Operations consulting team helping high-ticket businesses build scalable marketing and sales systems.',
      path: '/en/about',
    },

    contact: {
      title: 'Book a Revenue Growth Audit | Insight Lab',
      description:
        'Request a strategy session to identify funnel leaks, improve pipeline quality and implement Revenue Operations systems.',
      path: '/en/contact',
    },

    realEstateDiagnosis: {
      title: 'Real Estate Marketing & Sales Funnel Audit | Digital Maturity Quiz',
      description:
        'Evaluate your real estate marketing funnel, CRM implementation and lead generation strategy with this digital maturity assessment.',
      path: '/en/real-estate-diagnosis',
    },
  },

  es: {
    home: {
      title: 'Revenue Operations y Marketing para Desarrolladoras Inmobiliarias y Clínicas | Insight Lab',
      description:
        'Insight Lab implementa sistemas de Revenue Operations, CRM y automatización para desarrolladoras inmobiliarias y clínicas de turismo médico que buscan generar más revenue.',
      path: '/es',
      ogType: 'website',
    },

    solutions: {
      title: 'Consultoría en Revenue Operations, CRM y Automatización de Ventas',
      description:
        'Implementamos sistemas de CRM, lead scoring, automatización y arquitectura de conversión para negocios high-ticket.',
      path: '/es/soluciones',
    },

    successStories: {
      title: 'Casos de Éxito en Marketing y Revenue Operations | Insight Lab',
      description:
        'Descubre cómo Insight Lab ayuda a empresas inmobiliarias y clínicas a mejorar su pipeline de ventas y aumentar conversiones.',
      path: '/es/casos-de-exito',
    },

    about: {
      title: 'Sobre Insight Lab | Especialistas en Revenue Operations',
      description:
        'Insight Lab es un equipo de growth engineering enfocado en diseñar sistemas de marketing y ventas para negocios high-ticket.',
      path: '/es/nosotros',
    },

    contact: {
      title: 'Solicita una Auditoría de Revenue | Insight Lab',
      description:
        'Agenda una sesión estratégica para analizar tu funnel de marketing, detectar fugas de conversión y escalar revenue.',
      path: '/es/contacto',
    },

    realEstateDiagnosis: {
      title: 'Diagnóstico de Marketing Inmobiliario | Evaluación de Madurez Digital',
      description:
        'Evalúa el nivel de madurez digital de tu desarrolladora inmobiliaria y detecta oportunidades para mejorar tu funnel de ventas.',
      path: '/es/diagnostico-inmobiliario',
    },
  },
}

export const getRouteSeo = (pathname: string, language: Language): SeoRoute => {
  const routeKey = getRouteKeyFromPath(pathname) ?? 'home'
  return PUBLIC_ROUTE_SEO[language][routeKey] ?? PUBLIC_ROUTE_SEO[language].home
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
