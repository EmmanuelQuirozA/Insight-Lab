import { SITE_URL } from './seoConfig'

const organization = {
  '@type': 'Organization',
  name: 'Insight Lab',
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo.png`,
  sameAs: ['https://www.instagram.com/insightlabmx', 'https://www.linkedin.com/company/insghtlab/'],
}

const website = {
  '@type': 'WebSite',
  name: 'Insight Lab',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export const buildHomeStructuredData = (faq: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@graph': [
    organization,
    website,
    {
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ],
})

export const buildBreadcrumbStructuredData = (items: Array<{ name: string; path: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
})

export const serviceStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Revenue Operations and Marketing Services',
  provider: organization,
  areaServed: 'North America',
  offers: {
    '@type': 'Offer',
    url: `${SITE_URL}/contact`,
  },
}
