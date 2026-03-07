import { useEffect, useState } from 'react'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import SolutionsPage from './pages/SolutionsPage'
import SuccessStoriesPage from './pages/SuccessStoriesPage'
import ContactPage from './pages/ContactPage'
import DigitalMaturityQuizPage from './pages/digital-maturity/DigitalMaturityQuizPage'
import DiagnosisPage from './pages/diagnosis/DiagnosisPage'
import DiagnosisResultPage from './pages/diagnosis/DiagnosisResultPage'
import { matchDiagnosisRoute } from './routes/routes'

function App() {
  const pathname = typeof window === 'undefined' ? '/' : window.location.pathname
  const diagnosisRoute = matchDiagnosisRoute(pathname)

  if (diagnosisRoute.type === 'diagnosis') {
    return <DiagnosisPage language={diagnosisRoute.language} />
  }

  if (diagnosisRoute.type === 'result') {
    return <DiagnosisResultPage language={diagnosisRoute.language} tier={diagnosisRoute.tier} />
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
