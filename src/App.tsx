import { useMemo } from 'react'
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
  const pathname = useMemo(() => (typeof window === 'undefined' ? '/en' : normalizePath(window.location.pathname)), [])
  const preferredLanguage: Language = getPreferredLanguage()

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

  if (pathname === LOCALIZED_ROUTE_MAP.home.en || pathname === LOCALIZED_ROUTE_MAP.home.es) {
    return <HomePage />
  }

  if (pathname === LOCALIZED_ROUTE_MAP.solutions.en || pathname === LOCALIZED_ROUTE_MAP.solutions.es) {
    return <SolutionsPage />
  }

  if (pathname === LOCALIZED_ROUTE_MAP.about.en || pathname === LOCALIZED_ROUTE_MAP.about.es) {
    return <AboutPage />
  }

  if (pathname === LOCALIZED_ROUTE_MAP.successStories.en || pathname === LOCALIZED_ROUTE_MAP.successStories.es) {
    return <SuccessStoriesPage />
  }

  if (pathname === LOCALIZED_ROUTE_MAP.contact.en || pathname === LOCALIZED_ROUTE_MAP.contact.es) {
    return <ContactPage />
  }

  if (pathname === LOCALIZED_ROUTE_MAP.realEstateDiagnosis.en || pathname === LOCALIZED_ROUTE_MAP.realEstateDiagnosis.es) {
    return <DigitalMaturityQuizPage />
  }

  if (isBlogIndexPath(pathname)) {
    return <BlogLandingPage />
  }

  if (isBlogPostPath(pathname)) {
    const slug = getBlogSlugFromPath(pathname)

    if (slug) {
      return <BlogPostPage slug={slug} />
    }
  }

  redirectTo(LOCALIZED_ROUTE_MAP.home[pathLanguage])
  return null
}

export default App
