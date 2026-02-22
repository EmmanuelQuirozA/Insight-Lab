import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../App.css'

type Language = 'es' | 'en'
type Theme = 'light' | 'dark'

type SolutionCard = {
  id: string
  title: string
  points: string[]
  quote: string
  icon: string
  highlighted?: boolean
}

const copy = {
  es: {
    nav: {
      about: 'Nosotros',
      solutions: 'Soluciones',
      successStories: 'Casos de éxito',
    },
    ctaHeader: 'Agenda tu auditoría',
    themeToggle: 'Tema',
    pageTitleTop: 'No vendemos servicios aislados.',
    pageTitleAccent: 'Diseñamos sistemas de crecimiento.',
    pageLead: 'Diseñamos sistemas de crecimiento medibles y escalables para negocios de alto valor.',
    cards: [
      {
        id: '01',
        title: 'Ingeniería Estratégica',
        points: [
          'Diagnóstico profundo del negocio',
          'Buyer persona basado en datos reales',
          'Mapeo de comportamiento digital',
          'Diseño de funnel estructural',
        ],
        quote: 'Sin arquitectura, no hay escalabilidad.',
        icon: 'bi-crosshair2',
      },
      {
        id: '02',
        title: 'Producción de Activos Digitales',
        points: [
          'Shoots estratégicos',
          'Reels optimizados para conversión',
          'Visuales diseñados para performance ads',
          'Creatividad con intención de retorno',
        ],
        quote: 'No creamos contenido. Creamos activos digitales.',
        icon: 'bi-camera',
      },
      {
        id: '03',
        title: 'Copy & Arquitectura de Conversión',
        points: [
          'Hooks magnéticos',
          'Guiones estratégicos',
          'Mensajes de venta para WhatsApp',
          'Estructuras persuasivas basadas en datos',
        ],
        quote: 'Cada palabra es una variable optimizable.',
        icon: 'bi-magic',
      },
      {
        id: '04',
        title: 'Automatización Inteligente',
        points: [
          'ManyChat',
          'WhatsApp Flows',
          'Lead nurturing automatizado',
          'Embudos conversacionales',
        ],
        quote: 'Tu negocio no debería depender de respuestas manuales.',
        icon: 'bi-briefcase',
      },
      {
        id: '05',
        title: 'Performance & Escalamiento',
        points: [
          'Campañas Meta / Google Ads',
          'Testing acelerado',
          'Optimización continua',
          'Escalamiento basado en datos',
        ],
        quote: 'No buscamos tráfico. Buscamos resultados medibles.',
        icon: 'bi-graph-up-arrow',
      },
      {
        id: '06',
        title: 'Inteligencia Artificial Aplicada',
        points: [
          'Análisis predictivo de audiencia',
          'Modelado de comportamiento',
          'Optimización automática de anuncios',
          'Testing masivo de creativos',
          'Automatización avanzada',
          'Procesamiento de datos en tiempo real',
        ],
        quote: 'La estrategia humana dirige. La IA acelera.',
        icon: 'bi-stars',
        highlighted: true,
      },
    ] as SolutionCard[],
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
    },
    ctaHeader: 'Book your audit',
    themeToggle: 'Theme',
    pageTitleTop: "We don't sell isolated services.",
    pageTitleAccent: 'We design growth systems.',
    pageLead: 'We design measurable and scalable growth systems for high-value businesses.',
    cards: [
      {
        id: '01',
        title: 'Strategic Engineering',
        points: [
          'In-depth business diagnosis',
          'Data-driven buyer persona',
          'Digital behavior mapping',
          'Structured funnel design',
        ],
        quote: 'Without architecture, there is no scalability.',
        icon: 'bi-crosshair2',
      },
      {
        id: '02',
        title: 'Digital Asset Production',
        points: [
          'Strategic shoots',
          'Conversion-optimized reels',
          'Visuals designed for performance ads',
          'Creativity with return intent',
        ],
        quote: 'We do not create content. We create digital assets.',
        icon: 'bi-camera',
      },
      {
        id: '03',
        title: 'Copy & Conversion Architecture',
        points: [
          'Magnetic hooks',
          'Strategic scripts',
          'Sales messaging for WhatsApp',
          'Data-based persuasive structures',
        ],
        quote: 'Every word is an optimizable variable.',
        icon: 'bi-magic',
      },
      {
        id: '04',
        title: 'Intelligent Automation',
        points: [
          'ManyChat',
          'WhatsApp Flows',
          'Automated lead nurturing',
          'Conversational funnels',
        ],
        quote: 'Your business should not depend on manual replies.',
        icon: 'bi-briefcase',
      },
      {
        id: '05',
        title: 'Performance & Scaling',
        points: [
          'Meta / Google Ads campaigns',
          'Accelerated testing',
          'Continuous optimization',
          'Data-driven scaling',
        ],
        quote: 'We do not seek traffic. We seek measurable results.',
        icon: 'bi-graph-up-arrow',
      },
      {
        id: '06',
        title: 'Applied Artificial Intelligence',
        points: [
          'Predictive audience analysis',
          'Behavior modeling',
          'Automatic ad optimization',
          'Massive creative testing',
          'Advanced automation',
          'Real-time data processing',
        ],
        quote: 'Human strategy leads. AI accelerates.',
        icon: 'bi-stars',
        highlighted: true,
      },
    ] as SolutionCard[],
    footerLinks: [
      { label: 'Terms', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
    footerCopyright: '© 2026 Insight Lab Agency. All rights reserved.',
  },
} as const

function SolutionsPage() {
  const [language, setLanguage] = useState<Language>('es')
  const [theme, setTheme] = useState<Theme>('light')
  const [themeTransitionKey, setThemeTransitionKey] = useState(0)
  const [pageVisible, setPageVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)
  const [cardsLifted, setCardsLifted] = useState(false)
  const cardsRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setPageVisible(true))

    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const node = cardsRef.current

    if (!node || cardsVisible) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.22 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [cardsVisible])

  useEffect(() => {
    if (!cardsVisible) {
      return
    }

    const timeout = window.setTimeout(() => {
      setCardsLifted(true)
    }, 1700)

    return () => window.clearTimeout(timeout)
  }, [cardsVisible])

  const t = copy[language]

  const navItems = useMemo(
    () => [
      { key: 'about', label: t.nav.about, href: '/about' },
      { key: 'solutions', label: t.nav.solutions, href: '/solutions' },
      { key: 'success', label: t.nav.successStories, href: '/casos-de-exito' },
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
          <a href="/" className="brand" aria-label="Insight Lab home">
            <img src="/brand/logo_minimal.png" alt="Insight Lab logo" className="brand-icon" />
            <span className="brand-text">
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

      <main className={`solutions-page ${pageVisible ? 'is-visible' : ''}`}>
        <section className="container solutions-hero">
          <h1>
            {t.pageTitleTop}
            <br />
            <span className="accent">{t.pageTitleAccent}</span>
          </h1>
          <p>{t.pageLead}</p>
        </section>

        <section className="container solutions-grid" ref={cardsRef}>
          {t.cards.map((card, index) => {
            const style = {
              '--card-order': index,
            } as CSSProperties

            return (
              <article
                key={card.id}
                className={`solutions-card h-100 ${card.highlighted ? 'is-highlighted' : ''} ${cardsVisible ? 'is-visible' : ''} ${cardsLifted ? 'is-lifted' : ''}`}
                style={style}
              >
                <div className="solutions-icon">
                  <i className={`bi ${card.icon}`} aria-hidden="true" />
                </div>
                <h2>
                  {card.id}. {card.title}
                </h2>

                <ul>
                  {card.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <footer>{card.quote}</footer>
              </article>
            )
          })}
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

export default SolutionsPage
