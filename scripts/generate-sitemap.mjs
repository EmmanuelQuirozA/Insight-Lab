import { readFileSync, writeFileSync } from 'node:fs'

const SITE_URL = 'https://www.insightlab.com.mx'
const POSTS_FILE = new URL('../src/blog/data/posts.ts', import.meta.url)
const SITEMAP_FILE = new URL('../public/sitemap.xml', import.meta.url)

const STATIC_ROUTES = [
  { key: 'home', en: '/en', es: '/es', changefreq: 'weekly', priority: '1.0' },
  { key: 'solutions', en: '/en/solutions', es: '/es/soluciones', changefreq: 'weekly', priority: '0.9' },
  { key: 'successStories', en: '/en/success-stories', es: '/es/casos-de-exito', changefreq: 'weekly', priority: '0.8' },
  { key: 'about', en: '/en/about', es: '/es/nosotros', changefreq: 'monthly', priority: '0.7' },
  { key: 'contact', en: '/en/contact', es: '/es/contacto', changefreq: 'weekly', priority: '0.9' },
  { key: 'realEstateDiagnosis', en: '/en/real-estate-diagnosis', es: '/es/diagnostico-inmobiliario', changefreq: 'weekly', priority: '0.8' },
  { key: 'blog', en: '/en/blog', es: '/es/blog', changefreq: 'weekly', priority: '0.8' },
  { key: 'bookSession', en: '/en/book-session', es: '/es/agendar-sesion', changefreq: 'monthly', priority: '0.7' },
]

const toXmlDate = (date) => date.toISOString().slice(0, 10)
const normalizeDate = (value) => {
  const parsed = new Date(`${value}T00:00:00Z`)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

const extractPostRecords = () => {
  const content = readFileSync(POSTS_FILE, 'utf8')
  const objectMatches = content.match(/\{[\s\S]*?\n  \},?/g) ?? []

  return objectMatches
    .map((block) => {
      const locale = block.match(/locale:\s*'(en|es)'/)?.[1]
      const slug = block.match(/slug:\s*'([^']+)'/)?.[1]
      const createdAt = block.match(/createdAt:\s*'([0-9]{4}-[0-9]{2}-[0-9]{2})'/)?.[1]
      const translationGroup = block.match(/translationGroup:\s*'([^']+)'/)?.[1]

      if (!locale || !slug || !createdAt || !translationGroup) {
        return null
      }

      return { locale, slug, createdAt, translationGroup }
    })
    .filter(Boolean)
}

const buildBlogRouteGroups = () => {
  const now = new Date()
  const posts = extractPostRecords().filter((post) => {
    const publishDate = normalizeDate(post.createdAt)
    return publishDate ? publishDate.getTime() <= now.getTime() : false
  })

  const grouped = new Map()

  for (const post of posts) {
    const current = grouped.get(post.translationGroup) ?? { en: null, es: null, lastmod: post.createdAt }
    current[post.locale] = post
    if (post.createdAt > current.lastmod) {
      current.lastmod = post.createdAt
    }
    grouped.set(post.translationGroup, current)
  }

  return Array.from(grouped.values())
}

const xmlEscape = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')

const routeEntry = ({ path, alternates, changefreq, priority, lastmod }) => {
  const links = alternates
    .map(({ lang, href }) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${xmlEscape(`${SITE_URL}${href}`)}" />`)
    .join('\n')

  return [
    '  <url>',
    `    <loc>${xmlEscape(`${SITE_URL}${path}`)}</loc>`,
    links,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n')
}

const today = toXmlDate(new Date())

const staticEntries = STATIC_ROUTES.flatMap((route) => [
  routeEntry({
    path: route.en,
    alternates: [
      { lang: 'en', href: route.en },
      { lang: 'es', href: route.es },
      { lang: 'x-default', href: route.en },
    ],
    changefreq: route.changefreq,
    priority: route.priority,
    lastmod: today,
  }),
  routeEntry({
    path: route.es,
    alternates: [
      { lang: 'en', href: route.en },
      { lang: 'es', href: route.es },
      { lang: 'x-default', href: route.en },
    ],
    changefreq: route.changefreq,
    priority: route.priority,
    lastmod: today,
  }),
])

const blogEntries = buildBlogRouteGroups().flatMap((group) => {
  if (!group.en || !group.es) {
    return []
  }

  const enPath = `/en/blog/${group.en.slug}`
  const esPath = `/es/blog/${group.es.slug}`

  return [
    routeEntry({
      path: enPath,
      alternates: [
        { lang: 'en', href: enPath },
        { lang: 'es', href: esPath },
        { lang: 'x-default', href: enPath },
      ],
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: group.lastmod,
    }),
    routeEntry({
      path: esPath,
      alternates: [
        { lang: 'en', href: enPath },
        { lang: 'es', href: esPath },
        { lang: 'x-default', href: enPath },
      ],
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: group.lastmod,
    }),
  ]
})

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...staticEntries,
  ...blogEntries,
  '</urlset>',
  '',
].join('\n')

writeFileSync(SITEMAP_FILE, sitemap)
console.log(`Generated sitemap with ${staticEntries.length + blogEntries.length} URLs.`)
