import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import SolutionsPage from './pages/SolutionsPage'
import SuccessStoriesPage from './pages/SuccessStoriesPage'
import ContactPage from './pages/ContactPage'
import DigitalMaturityQuizPage from './pages/digital-maturity/DigitalMaturityQuizPage'
import RealStateDigitalMaturityQuizPage from './pages/digital-maturity/RealStateDigitalMaturityQuizPage'

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

  if (typeof window !== 'undefined' && window.location.pathname === '/real-estate-diagnosis') {
    return <DigitalMaturityQuizPage />
  }

  if (typeof window !== 'undefined' && window.location.pathname === '/real-state-maturity-quiz') {
    return <RealStateDigitalMaturityQuizPage />
  }

  return <HomePage />
}

export default App
