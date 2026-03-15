export const SITE_URL = 'https://www.insightlab.com.mx'

type SeoRoute = {
  title: string
  description: string
  path: string
  ogType?: 'website' | 'article'
}

export const PUBLIC_ROUTE_SEO: Record<string, SeoRoute> = {
  '/': {
    title: 'Revenue Operations & Marketing Services for High-Ticket Growth | Insight Lab',
    description:
      'Insight Lab builds Revenue Operations and digital marketing systems for high-ticket services, real estate and medical tourism brands.',
    path: '/',
    ogType: 'website',
  },
  '/solutions': {
    title: 'Revenue Operations Solutions: CRM, Lead Scoring & Automation | Insight Lab',
    description:
      'Explore Insight Lab solutions: CRM implementation, lead scoring, conversion architecture, automation, and performance growth systems.',
    path: '/solutions',
  },
  '/success-stories': {
    title: 'Marketing & RevOps Success Stories | Insight Lab',
    description:
      'See how Insight Lab helps high-ticket businesses improve qualified pipeline, close rates, and measurable revenue growth.',
    path: '/success-stories',
  },
  '/about': {
    title: 'About Insight Lab | Revenue Operations & Growth Engineering Team',
    description:
      'Meet Insight Lab, a growth engineering team combining strategic marketing, data, and automation to drive predictable revenue.',
    path: '/about',
  },
  '/contact': {
    title: 'Contact Insight Lab | Request a Revenue Growth Audit',
    description:
      'Book a strategy session with Insight Lab to identify conversion leaks, improve pipeline quality, and scale revenue operations.',
    path: '/contact',
  },
  '/real-estate-diagnosis': {
    title: 'Real Estate Digital Maturity Quiz | Insight Lab',
    description:
      'Take the digital maturity quiz for real estate developers and identify key RevOps and marketing gaps affecting your sales cycle.',
    path: '/real-estate-diagnosis',
  },
  '/real-state-maturity-quiz': {
    title: 'Real Estate Maturity Quiz (Legacy URL) | Insight Lab',
    description:
      'Legacy route for Insight Lab real estate maturity quiz. Evaluate your funnel and CRM readiness for long sales cycles.',
    path: '/real-state-maturity-quiz',
  },
}

export const PRERENDER_ROUTES = ['/', '/solutions', '/success-stories', '/about', '/contact', '/real-estate-diagnosis']

export const RECOMMENDED_URL_MIGRATIONS: Array<{ current: string; recommended: string }> = [
  { current: '/real-state-maturity-quiz', recommended: '/real-estate-diagnosis' },
]
