import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import SolutionsPage from './pages/SolutionsPage'
import SuccessStoriesPage from './pages/SuccessStoriesPage'
import ContactPage from './pages/ContactPage'
import DigitalMaturityQuizPage from './pages/digital-maturity/DigitalMaturityQuizPage'

function App() {
  if (typeof window !== 'undefined' && window.location.pathname === '/solutions') {
    return <SolutionsPage />
  }

  if (typeof window !== 'undefined' && window.location.pathname === '/about') {
    return <AboutPage />
  }

  if (typeof window !== 'undefined' && window.location.pathname === '/success-stories') {
    return <SuccessStoriesPage />
  }

  if (typeof window !== 'undefined' && window.location.pathname === '/contact') {
    return <ContactPage />
  }

  if (typeof window !== 'undefined' && window.location.pathname === '/quiz-madurez-digital') {
    return <DigitalMaturityQuizPage />
  }

  return <HomePage />
}

export default App
