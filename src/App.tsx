import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import SolutionsPage from './pages/SolutionsPage'
import SuccessStoriesPage from './pages/SuccessStoriesPage'
import ContactPage from './pages/ContactPage'

function App() {
  if (typeof window !== 'undefined' && window.location.pathname === '/solutions') {
    return <SolutionsPage />
  }

  if (typeof window !== 'undefined' && window.location.pathname === '/about') {
    return <AboutPage />
  }

  if (typeof window !== 'undefined' && window.location.pathname === '/casos-de-exito') {
    return <SuccessStoriesPage />
  }

  if (typeof window !== 'undefined' && window.location.pathname === '/contacto') {
    return <ContactPage />
  }

  return <HomePage />
}

export default App
