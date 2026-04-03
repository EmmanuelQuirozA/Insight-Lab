import { useEffect } from 'react'
import SiteLayout from '../components/SiteLayout'
import '../App.css'
import { buildBreadcrumbStructuredData } from '../seo/structuredData'

const copy = {
  es: {
    title: 'Agenda tu sesión estratégica',
    description: 'Selecciona el horario que mejor te funcione y confirma tu llamada directamente en Calendly.',
  },
  en: {
    title: 'Book your strategy session',
    description: 'Pick the time that works best for you and confirm your call directly in Calendly.',
  },
} as const

function BookSessionPage() {
  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')

    if (existingScript) {
      return
    }

    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <SiteLayout
      mainClassName="contact-page"
      seoStructuredData={(language) =>
        buildBreadcrumbStructuredData([
          { name: language === 'es' ? 'Inicio' : 'Home', path: '/' },
          { name: language === 'es' ? 'Agenda' : 'Book Session', path: '/book-session' },
        ])
      }
    >
      {({ language }) => {
        const t = copy[language]

        return (
          <>
            <section className="container page-hero contact-reveal-item">
              <h1>{t.title}</h1>
              <p>{t.description}</p>
            </section>

            <section className="container contact-form-wrap contact-reveal-item bg-white">
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/insightlabconsultoria/consultoria-estrategica"
                style={{ minWidth: '320px', height: '700px' }}
              />
            </section>
          </>
        )
      }}
    </SiteLayout>
  )
}

export default BookSessionPage
