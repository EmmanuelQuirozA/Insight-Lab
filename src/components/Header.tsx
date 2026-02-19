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
  languageLabel: string
  onThemeToggle: () => void
  onLanguageToggle: () => void
}

function Header({
  logo,
  navItems,
  ctaLabel,
  themeLabel,
  languageLabel,
  onThemeToggle,
  onLanguageToggle,
}: HeaderProps) {
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
          <button className="ghost-btn" onClick={onThemeToggle} type="button">
            {themeLabel}
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
