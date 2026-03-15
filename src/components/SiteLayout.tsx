import { useMemo, useState, type ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import FloatingWhatsAppButton from './FloatingWhatsAppButton'
import useSystemTheme from '../hooks/useSystemTheme'
import useDetectedLanguage from '../hooks/useDetectedLanguage'
import SeoHead from '../seo/SeoHead'
import {
  getAlternateLanguagePath,
  getLocalizedPath,
  getPathLanguage,
  getRouteKeyFromPath,
  type Language,
} from '../routing/publicRoutes'

type SiteLayoutProps = {
  children: (context: { language: Language }) => ReactNode
  mainClassName?: string
  language?: Language
  onLanguageChange?: (language: Language) => void
  seoPath?: string
  seoStructuredData?: (language: Language) => Record<string, unknown> | Array<Record<string, unknown>>
}

const layoutCopy = {
  es: {
    nav: {
      about: 'Nosotros',
      solutions: 'Soluciones',
      successStories: 'Casos de éxito',
      contact: 'Contacto',
    },
    ctaHeader: 'Agenda tu auditoría',
    themeToggle: 'Tema',
    footerLinks: [
      { label: 'Términos', href: '/terms-of-service' },
      { label: 'Privacidad', href: '/privacy' },
    ],
    footerCopyright: '© 2026 Insight Lab Agency. All rights reserved.',
  },
  en: {
    nav: {
      about: 'About Us',
      solutions: 'Solutions',
      successStories: 'Success Stories',
      contact: 'Contact',
    },
    ctaHeader: 'Request an Audit',
    themeToggle: 'Theme',
    footerLinks: [
      { label: 'Terms', href: '/terms-of-service' },
      { label: 'Privacy', href: '/privacy' },
    ],
    footerCopyright: '© 2026 Insight Lab Agency. All rights reserved.',
  },
} as const

function SiteLayout({ children, mainClassName, language: controlledLanguage, onLanguageChange, seoPath, seoStructuredData }: SiteLayoutProps) {
  const pathname = typeof window === 'undefined' ? '/en' : window.location.pathname
  const [detectedLanguage, setDetectedLanguage] = useDetectedLanguage()
  const pathLanguage = getPathLanguage(pathname)
  const language = controlledLanguage ?? pathLanguage ?? detectedLanguage
  const setLanguagePreference = onLanguageChange ?? setDetectedLanguage
  const { theme, setTheme } = useSystemTheme()
  const [themeTransitionKey, setThemeTransitionKey] = useState(0)

  const t = layoutCopy[language]

  const navItems = useMemo(
    () => [
      { key: 'about', label: t.nav.about, href: getLocalizedPath('about', language) },
      { key: 'solutions', label: t.nav.solutions, href: getLocalizedPath('solutions', language) },
      { key: 'success', label: t.nav.successStories, href: getLocalizedPath('successStories', language) },
      { key: 'contact', label: t.nav.contact, href: getLocalizedPath('contact', language) },
    ],
    [language, t.nav.about, t.nav.solutions, t.nav.successStories, t.nav.contact],
  )

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    setThemeTransitionKey((prev) => prev + 1)
  }

  const handleLanguageChange = (nextLanguage: Language) => {
    setLanguagePreference(nextLanguage)

    if (typeof window === 'undefined') {
      return
    }

    const alternatePath = getAlternateLanguagePath(pathname, nextLanguage)

    if (alternatePath && alternatePath !== pathname) {
      window.location.assign(alternatePath)
      return
    }

    const currentRouteKey = getRouteKeyFromPath(pathname)

    if (currentRouteKey) {
      window.location.assign(getLocalizedPath(currentRouteKey, nextLanguage))
      return
    }

    window.location.assign(getLocalizedPath('home', nextLanguage))
  }

  const classes = ['page-main', 'page-main--padded', mainClassName].filter(Boolean).join(' ')

  return (
    <div className="app-shell">
      <SeoHead path={seoPath ?? pathname} language={language} structuredData={seoStructuredData?.(language)} />

      <Header
        logo={
          <a href={getLocalizedPath('home', language)} className="brand-name" aria-label="Insight Lab home">
            <img src="/brand/logo_minimal.png" alt="Insight Lab logo" className="brand-icon" />
            <span>
              Insight<span className="accent">Lab</span>
            </span>
          </a>
        }
        navItems={navItems}
        ctaLabel={t.ctaHeader}
        ctaHref={getLocalizedPath('contact', language)}
        themeLabel={t.themeToggle}
        theme={theme}
        themeTransitionKey={themeTransitionKey}
        language={language}
        onThemeToggle={toggleTheme}
        onLanguageChange={handleLanguageChange}
      />

      <main className={classes}>{children({ language })}</main>

      <FloatingWhatsAppButton />

      <Footer
        brandName="Insight"
        brandAccent="Lab"
        homeHref={getLocalizedPath('home', language)}
        links={t.footerLinks}
        socialLinks={[
          { label: 'Facebook', href: 'https://www.facebook.com/share/1G5GZg2MiH/?mibextid=wwXIfr', icon: 'facebook' },
          { label: 'Instagram', href: 'https://www.instagram.com/insightlabmx?igsh=MWw4MHFwa2Y1ODdsNw==', icon: 'instagram' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/company/insghtlab/', icon: 'linkedin' },
        ]}
        copyright={t.footerCopyright}
      />
    </div>
  )
}

export default SiteLayout
