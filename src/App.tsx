import { useEffect, useState } from 'react'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import SolutionsPage from './pages/SolutionsPage'
import SuccessStoriesPage from './pages/SuccessStoriesPage'
import ContactPage from './pages/ContactPage'
import DigitalMaturityQuizPage from './pages/digital-maturity/DigitalMaturityQuizPage'
import MainLayout from './layouts/MainLayout'
import DiagnosisPage from './pages/diagnosis/DiagnosisPage'
import DiagnosisResultPage from './pages/diagnosis/DiagnosisResultPage'
import { matchDiagnosisRoute, replaceLanguageInPath } from './routes/routes'

const getCurrentPath = () => (typeof window === 'undefined' ? '/' : window.location.pathname)

function App() {
  const [pathname, setPathname] = useState(getCurrentPath)

  useEffect(() => {
    const handleLocationChange = () => setPathname(window.location.pathname)

    window.addEventListener('popstate', handleLocationChange)

    const nativePushState = window.history.pushState
    const nativeReplaceState = window.history.replaceState

    window.history.pushState = function pushState(...args) {
      nativePushState.apply(this, args)
      handleLocationChange()
    }

    window.history.replaceState = function replaceState(...args) {
      nativeReplaceState.apply(this, args)
      handleLocationChange()
    }

    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.history.pushState = nativePushState
      window.history.replaceState = nativeReplaceState
    }
  }, [])

  const diagnosisRoute = matchDiagnosisRoute(pathname)

  if (diagnosisRoute.type === 'diagnosis') {
    return (
      <MainLayout
        language={diagnosisRoute.language}
        onLanguageChange={(nextLanguage) => {
          window.history.pushState({}, '', replaceLanguageInPath(pathname, nextLanguage))
        }}
      >
        <DiagnosisPage language={diagnosisRoute.language} />
      </MainLayout>
    )
  }

  if (diagnosisRoute.type === 'result') {
    return (
      <MainLayout
        language={diagnosisRoute.language}
        onLanguageChange={(nextLanguage) => {
          window.history.pushState({}, '', replaceLanguageInPath(pathname, nextLanguage))
        }}
      >
        <DiagnosisResultPage language={diagnosisRoute.language} tier={diagnosisRoute.tier} />
      </MainLayout>
    )
  }

  if (pathname === '/solutions') {
    return <SolutionsPage />
  }

  if (pathname === '/about') {
    return <AboutPage />
  }

  if (pathname === '/success-stories') {
    return <SuccessStoriesPage />
  }

  if (pathname === '/contact') {
    return <ContactPage />
  }

  if (pathname === '/quiz-madurez-digital') {
    return <DigitalMaturityQuizPage />
  }

  return <HomePage />
}

export default App
