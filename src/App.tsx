import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import SolutionsPage from './pages/SolutionsPage'

function App() {
  if (typeof window !== 'undefined' && window.location.pathname === '/solutions') {
    return <SolutionsPage />
  }

  if (typeof window !== 'undefined' && window.location.pathname === '/about') {
    return <AboutPage />
  }

  return <HomePage />
}

export default App
