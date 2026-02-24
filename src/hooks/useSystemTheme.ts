import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'insight-lab-theme'

const isTheme = (value: string | null): value is Theme => value === 'light' || value === 'dark'

const getStoredTheme = (): Theme | null => {
  if (typeof window === 'undefined') {
    return null
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  return isTheme(storedTheme) ? storedTheme : null
}

const prefersDarkTheme = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default function useSystemTheme() {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme() ?? (prefersDarkTheme() ? 'dark' : 'light'))

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    }
  }, [theme])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function' || getStoredTheme()) {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleThemeChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange)
    }
  }, [])

  return { theme, setTheme }
}
