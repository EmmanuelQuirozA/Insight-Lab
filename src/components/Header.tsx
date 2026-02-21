import { useEffect, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react'

type HeaderNavItem = {
  key: string
  label: string
  href: string
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
  const [themePulseOrigin, setThemePulseOrigin] = useState({ x: '50%', y: '50%' })
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

  const handleThemeToggle = (event: ReactMouseEvent<HTMLButtonElement>) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    const x = `${event.clientX - left}px`
    const y = `${event.clientY - top}px`

    setThemePulseOrigin({
      x: Number.isFinite(event.clientX) ? x : `${width / 2}px`,
      y: Number.isFinite(event.clientY) ? y : `${height / 2}px`,
    })

    onThemeToggle()
  }

  const radialStyle = {
    '--radial-origin-x': themePulseOrigin.x,
    '--radial-origin-y': themePulseOrigin.y,
  } as CSSProperties

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo-wrap">{logo}</div>

        <nav className="nav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.key} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className={`ghost-btn theme-toggle ${toggleThemeClass}`}
            onClick={handleThemeToggle}
            type="button"
            aria-label={themeLabel}
            title={themeLabel}
          >
            <span
              key={`${theme}-${themeTransitionKey}`}
              className={`theme-toggle-radial ${showMoon ? 'is-moon' : 'is-sun'}`}
              style={radialStyle}
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
