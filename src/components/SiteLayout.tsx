import { useMemo, useState, type ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import useSystemTheme from '../hooks/useSystemTheme'
import useDetectedLanguage from '../hooks/useDetectedLanguage'

type Language = 'es' | 'en'

type SiteLayoutProps = {
  children: (context: { language: Language }) => ReactNode
  mainClassName?: string
  language?: Language
  onLanguageChange?: (language: Language) => void
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

function SiteLayout({ children, mainClassName, language: controlledLanguage, onLanguageChange }: SiteLayoutProps) {
  const [detectedLanguage, setDetectedLanguage] = useDetectedLanguage()
  const language = controlledLanguage ?? detectedLanguage
  const setLanguage = onLanguageChange ?? setDetectedLanguage
  const { theme, setTheme } = useSystemTheme()
  const [themeTransitionKey, setThemeTransitionKey] = useState(0)

  const t = layoutCopy[language]

  const navItems = useMemo(
    () => [
      { key: 'about', label: t.nav.about, href: '/about' },
      { key: 'solutions', label: t.nav.solutions, href: '/solutions' },
      { key: 'success', label: t.nav.successStories, href: '/success-stories' },
      { key: 'contact', label: t.nav.contact, href: '/contact' },
    ],
    [t.nav.about, t.nav.solutions, t.nav.successStories, t.nav.contact],
  )

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    setThemeTransitionKey((prev) => prev + 1)
  }

  const classes = ['page-main', 'page-main--padded', mainClassName].filter(Boolean).join(' ')

  return (
    <div className="app-shell">
      <Header
        logo={
          <a href="/" className="brand-name" aria-label="Insight Lab home">
            <img src="/brand/logo_minimal.png" alt="Insight Lab logo" className="brand-icon" />
            <span>
              Insight<span className="accent">Lab</span>
            </span>
          </a>
        }
        navItems={navItems}
        ctaLabel={t.ctaHeader}
        themeLabel={t.themeToggle}
        theme={theme}
        themeTransitionKey={themeTransitionKey}
        language={language}
        onThemeToggle={toggleTheme}
        onLanguageChange={setLanguage}
      />

      <main className={classes}>{children({ language })}</main>

      <Footer
        brandName="Insight"
        brandAccent="Lab"
        links={t.footerLinks}
        socialLinks={[
          { label: 'Facebook', href: 'https://www.facebook.com/share/1G5GZg2MiH/?mibextid=wwXIfr', icon: 'facebook' },
          { label: 'Instagram', href: 'https://www.instagram.com/insightlabmx?igsh=MWw4MHFwa2Y1ODdsNw==', icon: 'instagram' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/company/insghtlab/', icon: 'linkedin' },
          // { label: 'YouTube', href: '#', icon: 'youtube' },
        ]}
        copyright={t.footerCopyright}
      />
    </div>
  )
}

export default SiteLayout
