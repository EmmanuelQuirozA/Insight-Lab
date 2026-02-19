import type { ReactNode } from 'react'

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
  languageLabel: string
  onThemeToggle: () => void
  onLanguageToggle: () => void
}

function Header({
  logo,
  navItems,
  ctaLabel,
  themeLabel,
  theme,
  themeTransitionKey,
  languageLabel,
  onThemeToggle,
  onLanguageToggle,
}: HeaderProps) {
  const showMoon = theme === 'light'
  const toggleThemeClass = showMoon ? 'is-light' : 'is-dark'

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
          <button className="ghost-btn" onClick={onLanguageToggle} type="button">
            {languageLabel}
          </button>
          <button className="primary-btn" type="button">
            {ctaLabel}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
