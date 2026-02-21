import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'

function App() {
  if (typeof window !== 'undefined' && window.location.pathname === '/about') {
    return <AboutPage />
  }

  return <HomePage />
}

export default App
