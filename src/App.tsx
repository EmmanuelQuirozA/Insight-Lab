import { useEffect, useMemo, useState } from 'react'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import SolutionsPage from './pages/SolutionsPage'
import SuccessStoriesPage from './pages/SuccessStoriesPage'
import ContactPage from './pages/ContactPage'
import DigitalMaturityQuizPage from './pages/digital-maturity/DigitalMaturityQuizPage'
import { getPreferredLanguage } from './hooks/useDetectedLanguage'
import { getLegacyRedirectPath, getPathLanguage, LOCALIZED_ROUTE_MAP, type Language } from './routing/publicRoutes'
import BlogLandingPage from './pages/blog/BlogLandingPage'
import BlogPostPage from './pages/blog/BlogPostPage'
import { getBlogSlugFromPath, isBlogIndexPath, isBlogPostPath } from './blog/utils/routes'
import { useUtmTracking } from './hooks/useUtmTracking'
import CookieConsentBanner from './components/CookieConsentBanner'
import {
  applyDefaultConsent,
  denyAnalyticsConsent,
  getStoredConsent,
  grantAnalyticsConsent,
  setStoredConsent,
} from './analytics/consentManager'

const normalizePath = (pathname: string) => {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }

  return pathname
}

function redirectTo(path: string) {
  if (typeof window === 'undefined') {
    return
  }

  window.location.replace(path)
}

function App() {
  useUtmTracking()

  const [showCookieBanner, setShowCookieBanner] = useState(false)
  const pathname = useMemo(() => (typeof window === 'undefined' ? '/en' : normalizePath(window.location.pathname)), [])
  const preferredLanguage: Language = getPreferredLanguage()

  useEffect(() => {
    // Asegura denied por defecto en primera carga, alineado con Consent Mode.
    applyDefaultConsent()

    const storedConsent = getStoredConsent()

    if (storedConsent === 'accepted') {
      grantAnalyticsConsent()
      setShowCookieBanner(false)
      return
    }

    if (storedConsent === 'rejected') {
      denyAnalyticsConsent()
      setShowCookieBanner(false)
      return
    }

    setShowCookieBanner(true)
  }, [])

  const pathLanguage = getPathLanguage(pathname)

  if (!pathLanguage) {
    const legacyPath = getLegacyRedirectPath(pathname, preferredLanguage)

    if (legacyPath) {
      redirectTo(legacyPath)
      return null
    }

    redirectTo(LOCALIZED_ROUTE_MAP.home[preferredLanguage])
    return null
  }

  const handleAcceptCookies = () => {
    setStoredConsent('accepted')
    grantAnalyticsConsent()
    setShowCookieBanner(false)
  }

  const handleRejectCookies = () => {
    setStoredConsent('rejected')
    denyAnalyticsConsent()
    setShowCookieBanner(false)
  }

  let page = <HomePage />

  if (pathname === LOCALIZED_ROUTE_MAP.solutions.en || pathname === LOCALIZED_ROUTE_MAP.solutions.es) {
    page = <SolutionsPage />
  } else if (pathname === LOCALIZED_ROUTE_MAP.about.en || pathname === LOCALIZED_ROUTE_MAP.about.es) {
    page = <AboutPage />
  } else if (pathname === LOCALIZED_ROUTE_MAP.successStories.en || pathname === LOCALIZED_ROUTE_MAP.successStories.es) {
    page = <SuccessStoriesPage />
  } else if (pathname === LOCALIZED_ROUTE_MAP.contact.en || pathname === LOCALIZED_ROUTE_MAP.contact.es) {
    page = <ContactPage />
  } else if (pathname === LOCALIZED_ROUTE_MAP.realEstateDiagnosis.en || pathname === LOCALIZED_ROUTE_MAP.realEstateDiagnosis.es) {
    page = <DigitalMaturityQuizPage />
  } else if (isBlogIndexPath(pathname)) {
    page = <BlogLandingPage />
  } else if (isBlogPostPath(pathname)) {
    const slug = getBlogSlugFromPath(pathname)

    if (slug) {
      page = <BlogPostPage slug={slug} />
    } else {
      redirectTo(LOCALIZED_ROUTE_MAP.home[pathLanguage])
      return null
    }
  } else if (pathname !== LOCALIZED_ROUTE_MAP.home.en && pathname !== LOCALIZED_ROUTE_MAP.home.es) {
    redirectTo(LOCALIZED_ROUTE_MAP.home[pathLanguage])
    return null
  }

  return (
    <>
      {page}
      {showCookieBanner ? <CookieConsentBanner onAccept={handleAcceptCookies} onReject={handleRejectCookies} /> : null}
    </>
  )
}

export default App
