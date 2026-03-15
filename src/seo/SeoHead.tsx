import { useEffect } from 'react'
import { getAlternateUrls, getRouteSeo, SITE_URL } from './seoConfig'

type SeoHeadProps = {
  path: string
  language: 'es' | 'en'
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>
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
  let element = document.head.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`) as HTMLLinkElement | null

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'alternate')
    element.setAttribute('hreflang', hreflang)
    document.head.appendChild(element)
  }

  return element
}

function SeoHead({ path, language, structuredData }: SeoHeadProps) {
  useEffect(() => {
    const normalizedPath = path === '' ? '/en' : path
    const seo = getRouteSeo(normalizedPath, language)
    const alternateUrls = getAlternateUrls(normalizedPath, language)

    document.title = seo.title
    document.documentElement.lang = language

    ensureMetaTag('name', 'description').setAttribute('content', seo.description)
    ensureMetaTag('property', 'og:title').setAttribute('content', seo.title)
    ensureMetaTag('property', 'og:description').setAttribute('content', seo.description)
    ensureMetaTag('property', 'og:type').setAttribute('content', seo.ogType ?? 'website')
    ensureMetaTag('property', 'og:url').setAttribute('content', alternateUrls.canonical)
    ensureMetaTag('property', 'og:image').setAttribute('content', DEFAULT_OG_IMAGE)
    ensureMetaTag('name', 'twitter:card').setAttribute('content', 'summary_large_image')

    ensureCanonicalTag().setAttribute('href', alternateUrls.canonical)
    ensureAlternateLinkTag(alternateUrls.currentLanguage).setAttribute('href', alternateUrls.canonical)

    if (alternateUrls.alternate) {
      ensureAlternateLinkTag(alternateUrls.alternateLanguage).setAttribute('href', alternateUrls.alternate)
    }

    ensureAlternateLinkTag('x-default').setAttribute('href', alternateUrls.xDefault)

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
  }, [path, language, structuredData])

  return null
}

export default SeoHead
