import type { ReactNode } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import useSystemTheme from '../hooks/useSystemTheme'
import type { SupportedLanguage } from '../config/diagnosisIframes'
import './main-layout.css'

type MainLayoutProps = {
  language: SupportedLanguage
  onLanguageChange: (nextLanguage: SupportedLanguage) => void
  children: ReactNode
}

const layoutCopy = {
  es: {
    navItems: [
      { key: 'home', label: 'Inicio', href: '/' },
      { key: 'diagnosis', label: 'Diagnóstico', href: '/es/real-estate-diagnosis' },
      { key: 'contact', label: 'Contacto', href: '/contact' },
    ],
    cta: 'Solicita auditoría',
    themeLabel: 'Cambiar tema',
    footerLinks: [
      { label: 'Inicio', href: '/' },
      { label: 'Diagnóstico', href: '/es/real-estate-diagnosis' },
      { label: 'Contacto', href: '/contact' },
    ],
    copyright: '© 2026 Insight Lab. Todos los derechos reservados.',
  },
  en: {
    navItems: [
      { key: 'home', label: 'Home', href: '/' },
      { key: 'diagnosis', label: 'Diagnosis', href: '/en/real-estate-diagnosis' },
      { key: 'contact', label: 'Contact', href: '/contact' },
    ],
    cta: 'Request audit',
    themeLabel: 'Toggle theme',
    footerLinks: [
      { label: 'Home', href: '/' },
      { label: 'Diagnosis', href: '/en/real-estate-diagnosis' },
      { label: 'Contact', href: '/contact' },
    ],
    copyright: '© 2026 Insight Lab. All rights reserved.',
  },
} as const

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
]

const logo = (
  <a href="/" className="brand-name" aria-label="Insight Lab home">
    <img src="/brand/logo_minimal.png" alt="Insight Lab logo" className="brand-icon" />
    <span>
      Insight <span className="accent">Lab</span>
    </span>
  </a>
)

function MainLayout({ language, onLanguageChange, children }: MainLayoutProps) {
  const { theme, setTheme } = useSystemTheme()
  const copy = layoutCopy[language]

  return (
    <div className="main-layout">
      <Header
        logo={logo}
        navItems={[...copy.navItems]}
        ctaLabel={copy.cta}
        themeLabel={copy.themeLabel}
        theme={theme}
        themeTransitionKey={0}
        language={language}
        onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        onLanguageChange={onLanguageChange}
      />

      <main className="main-layout-content">{children}</main>

      <Footer
        brandName="Insight"
        brandAccent="Lab"
        links={copy.footerLinks}
        socialLinks={socialLinks}
        copyright={copy.copyright}
      />
    </div>
  )
}

export default MainLayout
