import { useEffect, useRef, useState, type ReactNode } from 'react'

type HeaderNavItem = {
  key: string
  label: string
}

type HeaderProps = {
  logo: ReactNode
  navItems: HeaderNavItem[]
  ctaLabel: string
  themeLabel: string
  theme: 'light' | 'dark'
  themeTransitionKey: number
  language: 'es' | 'en'
  onThemeToggle: () => void
  onLanguageChange: (language: 'es' | 'en') => void
}

function Header({
  logo,
  navItems,
  ctaLabel,
  themeLabel,
  theme,
  themeTransitionKey,
  language,
  onThemeToggle,
  onLanguageChange,
}: HeaderProps) {
  const showMoon = theme === 'light'
  const toggleThemeClass = showMoon ? 'is-light' : 'is-dark'
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const languageMenuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!languageMenuRef.current?.contains(event.target as Node)) {
        setIsLanguageOpen(false)
      }
    }

    document.addEventListener('mousedown', handleDocumentClick)

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [])

  const handleLanguageSelection = (nextLanguage: 'es' | 'en') => {
    onLanguageChange(nextLanguage)
    setIsLanguageOpen(false)
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo-wrap">{logo}</div>

        <nav className="nav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.key} href={`#${item.key}`} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className={`ghost-btn theme-toggle ${toggleThemeClass}`}
            onClick={onThemeToggle}
            type="button"
            aria-label={themeLabel}
            title={themeLabel}
          >
            <span
              key={`${theme}-${themeTransitionKey}`}
              className={`theme-toggle-radial ${showMoon ? 'is-moon' : 'is-sun'}`}
              aria-hidden="true"
            />
            <span className="theme-toggle-icon" aria-hidden="true">
              <i className={`bi ${showMoon ? 'bi-moon' : 'bi-sun'}`} />
            </span>
            <span className="sr-only">{themeLabel}</span>
          </button>
          <div className="language-menu" ref={languageMenuRef}>
            <button
              className="ghost-btn language-trigger"
              onClick={() => setIsLanguageOpen((prev) => !prev)}
              type="button"
              aria-label="Seleccionar idioma"
              aria-haspopup="menu"
              aria-expanded={isLanguageOpen}
            >
              <i className="bi bi-globe2" aria-hidden="true" />
              <span>{language}</span>
            </button>

            {isLanguageOpen && (
              <div className="language-dropdown" role="menu" aria-label="Opciones de idioma">
                {(['es', 'en'] as const).map((option) => (
                  <button
                    key={option}
                    className={`language-option ${language === option ? 'is-active' : ''}`}
                    onClick={() => handleLanguageSelection(option)}
                    type="button"
                    role="menuitemradio"
                    aria-checked={language === option}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="primary-btn" type="button">
            {ctaLabel}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
