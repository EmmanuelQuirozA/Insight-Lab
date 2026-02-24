import { useMemo, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../App.css'
import useSystemTheme from '../hooks/useSystemTheme'
import useDetectedLanguage from '../hooks/useDetectedLanguage'


type MethodStep = {
  id: string
  title: string
  content: string
}

const copy = {
  es: {
    nav: {
      about: 'Nosotros',
      solutions: 'Soluciones',
      successStories: 'Casos de éxito',
      contact: 'Contacto',
    },
    ctaHeader: 'Agenda tu auditoría',
    themeToggle: 'Tema',
    titleTop: 'No hablamos de likes.',
    titleAccent: 'Hablamos de crecimiento real.',
    industriesLead: 'Hemos trabajado con marcas en industrias como:',
    industries: [
      'Restaurantes',
      'Clínicas dentales',
      'Nutriólogos',
      'Barberías',
      'Psicólogos',
      'Emprendedores',
      'Fotógrafos',
      'Tatuadores',
    ],
    industriesHighlight: 'Cada industria tiene su propio lenguaje. Nosotros lo traducimos en conversión.',
    methodologyTitle: 'Metodología aplicada',
    methodology: [
      {
        id: '01',
        title: 'Diagnóstico',
        content:
          'Auditamos tu embudo actual, identificamos fricciones y detectamos los puntos de fuga que están frenando tu crecimiento.',
      },
      {
        id: '02',
        title: 'Arquitectura',
        content:
          'Diseñamos una estructura de captación, nutrición y cierre adaptada a tu industria para transformar interés en oportunidad.',
      },
      {
        id: '03',
        title: 'Implementación',
        content:
          'Activamos campañas, automatizaciones y activos de contenido con una ejecución precisa para iniciar resultados desde el día uno.',
      },
      {
        id: '04',
        title: 'Optimización',
        content:
          'Medimos señales clave, iteramos mensajes y afinamos la experiencia para mejorar conversiones de manera continua.',
      },
      {
        id: '05',
        title: 'Escalamiento',
        content:
          'Escalamos lo que sí funciona con una base de datos confiable y decisiones guiadas por performance real.',
      },
    ] as MethodStep[],
    valuePills: ['✓ Resultados medibles.', '✓ Procesos replicables.', '✓ Sistemas sostenibles.'],
    footerLinks: [
      { label: 'Términos', href: '#' },
      { label: 'Privacidad', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
    footerCopyright: '© 2026 Insight Lab Agency. All rights reserved.',
  },
  en: {
    nav: {
      about: 'About Us',
      solutions: 'Solutions',
      successStories: 'Success Stories',
      contact: 'Contact',
    },
    ctaHeader: 'Book your audit',
    themeToggle: 'Theme',
    titleTop: "We don't talk about likes.",
    titleAccent: 'We talk about real growth.',
    industriesLead: 'We have worked with brands in industries such as:',
    industries: ['Restaurants', 'Dental clinics', 'Nutritionists', 'Barbershops', 'Psychologists', 'Entrepreneurs', 'Photographers', 'Tattoo artists'],
    industriesHighlight: 'Each industry has its own language. We translate it into conversion.',
    methodologyTitle: 'Applied methodology',
    methodology: [
      {
        id: '01',
        title: 'Diagnosis',
        content:
          'We audit your current funnel, identify friction and find the leak points that are slowing your growth.',
      },
      {
        id: '02',
        title: 'Architecture',
        content:
          'We design a lead capture, nurturing and closing structure tailored to your industry.',
      },
      {
        id: '03',
        title: 'Implementation',
        content:
          'We launch campaigns, automations and content assets with precise execution to start generating outcomes fast.',
      },
      {
        id: '04',
        title: 'Optimization',
        content:
          'We measure key signals, iterate messaging and continuously refine experiences to improve conversions.',
      },
      {
        id: '05',
        title: 'Scaling',
        content:
          'We scale what is proven to work using reliable data and performance-driven decisions.',
      },
    ] as MethodStep[],
    valuePills: ['✓ Measurable results.', '✓ Replicable processes.', '✓ Sustainable systems.'],
    footerLinks: [
      { label: 'Terms', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
    footerCopyright: '© 2026 Insight Lab Agency. All rights reserved.',
  },
} as const

function SuccessStoriesPage() {
  const [language, setLanguage] = useDetectedLanguage()
  const { theme, setTheme } = useSystemTheme()
  const [themeTransitionKey, setThemeTransitionKey] = useState(0)
  const [openStepId, setOpenStepId] = useState<string>('05')


  const t = copy[language]

  const navItems = useMemo(
    () => [
      { key: 'about', label: t.nav.about, href: '/about' },
      { key: 'solutions', label: t.nav.solutions, href: '/solutions' },
      { key: 'success', label: t.nav.successStories, href: '/success-stories' },
      { key: 'contact', label: t.nav.contact, href: '/contact' },
    ],
    [t.nav],
  )

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    setThemeTransitionKey((prev) => prev + 1)
  }

  return (
    <div className="app-shell">
      <Header
        logo={
          <a href="#" className="brand-name" aria-label="Insight Lab home">
            <img src="/brand/logo_minimal.png" alt="Insight Lab logo" className="brand-icon" />
            <span>
              Insight<span className="accent">Lab</span>
            </span>
          </a>
        }
        navItems={navItems}
        ctaLabel={t.ctaHeader}
        themeLabel={t.themeToggle}
        theme={theme}
        themeTransitionKey={themeTransitionKey}
        language={language}
        onThemeToggle={toggleTheme}
        onLanguageChange={setLanguage}
      />

      <main className="success-page">
        <section className="container success-title">
          <h1>{t.titleTop}</h1>
          <p>{t.titleAccent}</p>
        </section>

        <section className="container success-industries-card">
          <p>{t.industriesLead}</p>
          <div className="success-industries-grid">
            {t.industries.map((item) => (
              <span key={item} className="success-industry-pill">
                {item}
              </span>
            ))}
          </div>
          <article className="success-industries-highlight">
            <strong>{t.industriesHighlight}</strong>
          </article>
        </section>

        <section className="container success-methodology">
          <h2>{t.methodologyTitle}</h2>
          <div className="success-methodology-list">
            {t.methodology.map((step) => {
              const isOpen = step.id === openStepId

              return (
                <article
                  key={step.id}
                  className={`success-step-card ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    className="success-step-trigger"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`step-content-${step.id}`}
                    onClick={() => setOpenStepId((prev) => (prev === step.id ? '' : step.id))}
                  >
                    <span className={`success-step-number ${isOpen ? 'is-active' : ''}`}>{step.id}</span>
                    <span className="success-step-title">{step.title}</span>
                    <i className={`bi bi-chevron-down success-step-chevron ${isOpen ? 'is-open' : ''}`} aria-hidden="true" />
                  </button>
                  <div
                    id={`step-content-${step.id}`}
                    className={`success-step-dropdown ${isOpen ? 'is-open' : ''}`}
                  >
                    <p>{step.content}</p>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="success-value-pills">
            {t.valuePills.map((pill) => (
              <span key={pill}>{pill}</span>
            ))}
          </div>
        </section>
      </main>

      <Footer
        brandName="Insight"
        brandAccent="Lab"
        links={t.footerLinks}
        socialLinks={[
          { label: 'Facebook', href: '#', icon: 'facebook' },
          { label: 'Instagram', href: '#', icon: 'instagram' },
          { label: 'LinkedIn', href: '#', icon: 'linkedin' },
          { label: 'YouTube', href: '#', icon: 'youtube' },
        ]}
        copyright={t.footerCopyright}
      />
    </div>
  )
}

export default SuccessStoriesPage
