import { useEffect } from 'react'
import { getAlternateUrls, getRouteSeo, SITE_URL } from './seoConfig'

type SeoOverride = {
  title: string
  description: string
  ogType?: 'website' | 'article'
  ogImage?: string
  canonicalPath?: string
  alternatePath?: string
  xDefaultPath?: string
  robots?: string
}

type SeoHeadProps = {
  path: string
  language: 'es' | 'en'
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>
  override?: SeoOverride
}

const DEFAULT_OG_IMAGE = `${SITE_URL}/brand/logo.png`

const ensureMetaTag = (attribute: 'name' | 'property', value: string) => {
  let element = document.head.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement | null

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, value)
    document.head.appendChild(element)
  }

  return element
}

const ensureCanonicalTag = () => {
  let element = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }

  return element
}

const ensureAlternateLinkTag = (hreflang: string) => {
  let element = document.head.querySelector(`link[rel="alternate"][hreflang="${hreflang}"][data-seo-managed="true"]`) as HTMLLinkElement | null

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'alternate')
    element.setAttribute('hreflang', hreflang)
    element.setAttribute('data-seo-managed', 'true')
    document.head.appendChild(element)
  }

  return element
}

function SeoHead({ path, language, structuredData, override }: SeoHeadProps) {
  useEffect(() => {
    const normalizedPath = path === '' ? '/en' : path
    const seo = override ?? getRouteSeo(normalizedPath, language)
    const alternateUrls = getAlternateUrls(normalizedPath, language)
    const canonicalUrl = `${SITE_URL}${override?.canonicalPath ?? normalizedPath}`
    const alternateUrl = override?.alternatePath ? `${SITE_URL}${override.alternatePath}` : alternateUrls.alternate
    const xDefaultUrl = `${SITE_URL}${override?.xDefaultPath ?? '/en'}`

    document.title = seo.title
    document.documentElement.lang = language

    ensureMetaTag('name', 'description').setAttribute('content', seo.description)
    ensureMetaTag('name', 'robots').setAttribute('content', override?.robots ?? 'index,follow')
    ensureMetaTag('property', 'og:title').setAttribute('content', seo.title)
    ensureMetaTag('property', 'og:description').setAttribute('content', seo.description)
    ensureMetaTag('property', 'og:type').setAttribute('content', seo.ogType ?? 'website')
    ensureMetaTag('property', 'og:url').setAttribute('content', canonicalUrl)
    ensureMetaTag('property', 'og:image').setAttribute('content', override?.ogImage ?? DEFAULT_OG_IMAGE)
    ensureMetaTag('property', 'og:site_name').setAttribute('content', 'Insight Lab')
    ensureMetaTag('name', 'twitter:title').setAttribute('content', seo.title)
    ensureMetaTag('name', 'twitter:description').setAttribute('content', seo.description)
    ensureMetaTag('name', 'twitter:image').setAttribute('content', override?.ogImage ?? DEFAULT_OG_IMAGE)
    ensureMetaTag('name', 'twitter:card').setAttribute('content', 'summary_large_image')

    ensureCanonicalTag().setAttribute('href', canonicalUrl)

    document.head.querySelectorAll('link[rel="alternate"][data-seo-managed="true"]').forEach((node) => node.remove())
    ensureAlternateLinkTag(alternateUrls.currentLanguage).setAttribute('href', canonicalUrl)

    if (alternateUrl) {
      ensureAlternateLinkTag(alternateUrls.alternateLanguage).setAttribute('href', alternateUrl)
    }

    ensureAlternateLinkTag('x-default').setAttribute('href', xDefaultUrl)

    const oldStructuredData = document.getElementById('route-structured-data')
    if (oldStructuredData) {
      oldStructuredData.remove()
    }

    if (structuredData) {
      const script = document.createElement('script')
      script.id = 'route-structured-data'
      script.type = 'application/ld+json'
      script.text = JSON.stringify(structuredData)
      document.head.appendChild(script)
    }
  }, [path, language, structuredData, override])

  return null
}

export default SeoHead
