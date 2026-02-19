import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

type Language = 'es' | 'en'
type Theme = 'light' | 'dark'

const copy = {
  es: {
    badge: 'Para Negocios High-Ticket & B2B',
    headlineTop: 'No generamos leads.',
    headlineMiddle: 'Construimos sistemas que',
    headlineAccent: 'convierten.',
    description:
      'Las agencias tradicionales te venden tráfico. Nosotros implementamos infraestructura de Lead Scoring, CRM y Automatización para transformar curiosos en revenue real.',
    primary: 'Solicita una Auditoría',
    secondary: 'Ver Cómo Funciona',
    nav: {
      problem: 'El Problema',
      infra: 'Infraestructura',
      sectors: 'Sectores',
      method: 'Método',
    },
    ctaHeader: 'Auditoría de Conversión',
    totalRevenue: 'Pipeline Total de Revenue',
    growth: '+32% vs mes pasado',
    alertTitle: 'Lead Scoring Alert',
    alertBody:
      'Prospecto "Dr. García" alcanzó 85 puntos. Enviado a CRM de Ventas automáticamente.',
    themeToggle: 'Tema',
    languageToggle: 'EN',
    comparisonTitle: 'El modelo de agencia tradicional está roto para High-Ticket',
    comparisonDescription:
      'Vender propiedades o tratamientos médicos no es lo mismo que vender e-commerce. Los ciclos son largos y la confianza es clave. Las agencias de “tráfico” te están fallando.',
    legacyTitle: 'Agencia Tradicional',
    legacyPoints: [
      'Te entregan hojas de cálculo con leads fríos.',
      'Solo se enfocan en Costo por Lead (CPL), no en calidad.',
      'Te culpan si tu equipo de ventas no cierra.',
      'No tienen visibilidad de lo que pasa después del click.',
    ],
    revenueTitle: 'Nuestro Revenue OS',
    revenuePoints: [
      'Infraestructura completa: Ads + CRM + Automatización.',
      'Lead Scoring para filtrar curiosos de compradores.',
      'Nutrición automática para ciclos de venta largos.',
      'Dashboard de Revenue en tiempo real',
    ],
    pillarsLabel: 'Tecnología y estrategia',
    pillarsTitle: 'Cuatro pilares para convertir tráfico en facturación',
    pillars: [
      {
        title: '1. Captación Inteligente',
        description:
          'No lanzamos anuncios a ciegas. Usamos datos intent-based para atraer a quienes ya están buscando soluciones high-ticket.',
        icon: '◎',
      },
      {
        title: '2. Calificación (Lead Scoring)',
        description:
          'Implementamos sistemas que puntúan leads automáticamente. Tu equipo comercial solo habla con prospectos calificados.',
        icon: '⎇',
      },
      {
        title: '3. Automatización',
        description:
          'Email, SMS y WhatsApp automatizados para nutrir al prospecto durante semanas o meses hasta que esté listo para comprar.',
        icon: '⚙',
      },
      {
        title: '4. Revenue Tracking',
        description:
          'Conectamos las campañas con tu CRM. Sabrás exactamente qué anuncio generó qué venta y cuál es tu ROI real.',
        icon: '▥',
      },
    ],
    specialtiesTitle: 'Especialistas en ciclos de venta complejos',
    specialties: [
      {
        title: 'Turismo Médico & Clínicas',
        description:
          'Pacientes internacionales, tratamientos de alto valor. Entendemos la necesidad de confianza, educación y seguimiento empático.',
        icon: 'activity',
      },
      {
        title: 'Real Estate & Desarrollos',
        description:
          'Venta de propiedades y preventas. Gestionamos el ciclo largo desde el lead digital hasta la visita al showroom y la firma.',
        icon: 'building',
      },
    ],
    infraTitle: 'Más que una agencia, un socio de infraestructura',
    infraDescription:
      'No vendemos paquetes de "posts en redes sociales". Trabajamos por fases para asegurar que tu inversión tenga un retorno medible.',
    infraSteps: [
      {
        id: '01',
        title: 'Diagnóstico & Auditoría',
        description: 'Analizamos tu embudo actual, fugas de conversión y estado del CRM.',
      },
      {
        id: '02',
        title: 'Implementación de Infraestructura',
        description: 'Configuramos el Lead Scoring, pipelines de ventas y automatizaciones.',
      },
      {
        id: '03',
        title: 'Growth & Optimización',
        description: 'Escalamos el tráfico basándonos en los datos de cierre, no en clicks.',
      },
    ],
    techStackTitle: 'Stack Tecnológico',
    techStackDescription:
      'Nos integramos con las herramientas líderes del mercado para centralizar tu data.',
    techStackItems: ['Salesforce / HubSpot', 'Zapier / Make', 'Google Ads / Meta', 'Looker Studio'],
    finalCtaTitle: '¿Listo para escalar tus ventas, no solo tus leads?',
    finalCtaDescription:
      'Agenda una sesión estratégica de 30 minutos. Analizaremos tu proceso actual y te mostraremos dónde estás perdiendo dinero.',
    finalCtaPrimary: 'Agendar Sesión Estratégica',
    finalCtaSecondary: 'Ver Casos de Éxito',
    finalCtaFootnote: '*Exclusivo para negocios facturando +$50k USD/mes',
    footerLinks: [
      { label: 'Términos', href: '#' },
      { label: 'Privacidad', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
    footerCopyright: '© 2026 Insight Lab Agency. All rights reserved.',
  },
  en: {
    badge: 'For High-Ticket & B2B Businesses',
    headlineTop: "We don't generate leads.",
    headlineMiddle: 'We build systems that',
    headlineAccent: 'convert.',
    description:
      'Traditional agencies sell traffic. We implement Lead Scoring, CRM and Automation infrastructure to turn curious visitors into real revenue.',
    primary: 'Request an Audit',
    secondary: 'See How It Works',
    nav: {
      problem: 'The Problem',
      infra: 'Infrastructure',
      sectors: 'Sectors',
      method: 'Method',
    },
    ctaHeader: 'Conversion Audit',
    totalRevenue: 'Total Revenue Pipeline',
    growth: '+32% vs last month',
    alertTitle: 'Lead Scoring Alert',
    alertBody:
      'Prospect "Dr. Garcia" reached 85 points. Sent to Sales CRM automatically.',
    themeToggle: 'Theme',
    languageToggle: 'ES',
    comparisonTitle: 'The traditional agency model is broken for High-Ticket',
    comparisonDescription:
      'Selling real estate or medical treatments is not the same as selling e-commerce. Sales cycles are longer and trust is critical. “Traffic-only” agencies are failing you.',
    legacyTitle: 'Traditional Agency',
    legacyPoints: [
      'They deliver spreadsheets full of cold leads.',
      'They focus only on Cost per Lead (CPL), not quality.',
      'They blame your sales team when deals do not close.',
      'They lack visibility into what happens after the click.',
    ],
    revenueTitle: 'Our Revenue OS',
    revenuePoints: [
      'Complete infrastructure: Ads + CRM + Automation.',
      'Lead Scoring to filter buyers from curious prospects.',
      'Automated nurturing for long sales cycles.',
      'Real-time revenue dashboard.',
    ],
    pillarsLabel: 'Technology and strategy',
    pillarsTitle: 'Four pillars to convert traffic into revenue',
    pillars: [
      {
        title: '1. Intelligent Acquisition',
        description:
          'We do not launch blind ads. We use intent-based data to attract people who are already searching for high-ticket solutions.',
        icon: '◎',
      },
      {
        title: '2. Qualification (Lead Scoring)',
        description:
          'We implement systems that score leads automatically. Your sales team only talks to qualified prospects.',
        icon: '⎇',
      },
      {
        title: '3. Automation',
        description:
          'Automated email, SMS and WhatsApp flows to nurture prospects for weeks or months until they are ready to buy.',
        icon: '⚙',
      },
      {
        title: '4. Revenue Tracking',
        description:
          'We connect campaigns with your CRM. You will know exactly which ad generated which sale and what your real ROI is.',
        icon: '▥',
      },
    ],
    specialtiesTitle: 'Specialists in complex sales cycles',
    specialties: [
      {
        title: 'Medical Tourism & Clinics',
        description:
          'International patients and high-value treatments. We understand the need for trust, education and empathetic follow-up.',
        icon: 'activity',
      },
      {
        title: 'Real Estate & Developments',
        description:
          'Property sales and pre-sales. We manage the long cycle from digital lead to showroom visit and final signature.',
        icon: 'building',
      },
    ],
    infraTitle: 'More than an agency, an infrastructure partner',
    infraDescription:
      'We do not sell social media post packages. We work in phases to ensure your investment produces measurable return.',
    infraSteps: [
      {
        id: '01',
        title: 'Diagnostics & Audit',
        description: 'We analyze your current funnel, conversion leaks and CRM health.',
      },
      {
        id: '02',
        title: 'Infrastructure Implementation',
        description: 'We configure Lead Scoring, sales pipelines and automations.',
      },
      {
        id: '03',
        title: 'Growth & Optimization',
        description: 'We scale traffic based on closing data, not clicks.',
      },
    ],
    techStackTitle: 'Technology Stack',
    techStackDescription:
      'We integrate with market-leading tools to centralize your data.',
    techStackItems: ['Salesforce / HubSpot', 'Zapier / Make', 'Google Ads / Meta', 'Looker Studio'],
    finalCtaTitle: 'Ready to scale your sales, not just your leads?',
    finalCtaDescription:
      'Book a 30-minute strategy session. We will analyze your current process and show you where money is being lost.',
    finalCtaPrimary: 'Book Strategy Session',
    finalCtaSecondary: 'See Success Stories',
    finalCtaFootnote: '*Exclusive to businesses billing +$50k USD/month',
    footerLinks: [
      { label: 'Terms', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
    footerCopyright: '© 2026 Insight Lab Agency. All rights reserved.',
  },
} as const

function App() {
  const [language, setLanguage] = useState<Language>('es')
  const [theme, setTheme] = useState<Theme>('light')
  const [themeTransitionKey, setThemeTransitionKey] = useState(0)
  const [pillarsVisible, setPillarsVisible] = useState(false)
  const [cardsLift, setCardsLift] = useState(false)
  const [specialtiesVisible, setSpecialtiesVisible] = useState(false)
  const [infraVisible, setInfraVisible] = useState(false)
  const [finalCtaVisible, setFinalCtaVisible] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)
  const [comparisonVisible, setComparisonVisible] = useState(false)
  const heroSectionRef = useRef<HTMLElement | null>(null)
  const comparisonSectionRef = useRef<HTMLElement | null>(null)
  const pillarsSectionRef = useRef<HTMLElement | null>(null)
  const specialtiesSectionRef = useRef<HTMLElement | null>(null)
  const infraSectionRef = useRef<HTMLElement | null>(null)
  const finalCtaRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])



  useEffect(() => {
    const node = heroSectionRef.current

    if (!node || heroVisible) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeroVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [heroVisible])

  useEffect(() => {
    const node = comparisonSectionRef.current

    if (!node || comparisonVisible) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setComparisonVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [comparisonVisible])

  useEffect(() => {
    const node = pillarsSectionRef.current

    if (!node || pillarsVisible) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPillarsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [pillarsVisible])

  useEffect(() => {
    const node = specialtiesSectionRef.current

    if (!node || specialtiesVisible) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSpecialtiesVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [specialtiesVisible])

  useEffect(() => {
    if (!pillarsVisible) {
      return
    }

    const timeout = window.setTimeout(() => {
      setCardsLift(true)
    }, 1350)

    return () => window.clearTimeout(timeout)
  }, [pillarsVisible])

  useEffect(() => {
    const node = infraSectionRef.current

    if (!node || infraVisible) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInfraVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [infraVisible])

  useEffect(() => {
    const node = finalCtaRef.current

    if (!node || finalCtaVisible) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFinalCtaVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.28 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [finalCtaVisible])

  const t = copy[language]

  const navItems = useMemo(
    () => [
      { key: 'problem', label: t.nav.problem },
      { key: 'infra', label: t.nav.infra },
      { key: 'sectors', label: t.nav.sectors },
      { key: 'method', label: t.nav.method },
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
          <a href="#" className="brand" aria-label="Insight Lab home">
            <span className="brand-icon">▥</span>
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
        languageLabel={t.languageToggle}
        onThemeToggle={toggleTheme}
        onLanguageToggle={() => setLanguage((prev) => (prev === 'es' ? 'en' : 'es'))}
      />

      <main>
        <section className="container hero" ref={heroSectionRef}>
          <div className={`hero-left ${heroVisible ? 'is-visible' : ''}`}>
            <div className="pill">
              <span className="pulse-dot" aria-hidden="true" />
              <span>{t.badge}</span>
            </div>

            <h1>
              {t.headlineTop}
              <br />
              {t.headlineMiddle}
              <br />
              <span className="accent">{t.headlineAccent}</span>
            </h1>

            <p>{t.description}</p>

            <div className="cta-group">
              <button className="primary-btn" type="button">
                {t.primary}
              </button>
              <button className="outline-btn" type="button">
                {t.secondary}
              </button>
            </div>
          </div>

          <section className={`hero-right ${heroVisible ? 'is-visible' : ''}`} aria-label="Revenue dashboard preview">
            <div className="mock-window">
              <div className="window-top">
                <span />
                <span />
                <span />
              </div>
              <div className="window-content">
                <p className="caption">{t.totalRevenue}</p>
                <div className="revenue-row">
                  <h2>$2,450,000</h2>
                  <span className="chip">⚡ {t.growth}</span>
                </div>
                <ul className="bars">
                  <li>
                    <span>Leads</span>
                    <div className="bar blue-gray" />
                  </li>
                  <li>
                    <span>MQL (Scored)</span>
                    <div className="bar light-blue" />
                  </li>
                  <li>
                    <span>SQL</span>
                    <div className="bar accent-fill" />
                  </li>
                </ul>
              </div>
            </div>

            <article className="alert-card">
              <strong>{t.alertTitle}</strong>
              <p>{t.alertBody}</p>
            </article>
          </section>
        </section>

        <section className="comparison-section" ref={comparisonSectionRef}>
          <div className="container">
            <div className={`comparison-heading ${comparisonVisible ? 'is-visible' : ''}`}>
              <h2>{t.comparisonTitle}</h2>
              <p>{t.comparisonDescription}</p>
            </div>

            <div className="comparison-grid">
              <article className={`comparison-card legacy-card ${comparisonVisible ? 'is-visible' : ''}`} style={{ '--comparison-delay': '0ms' } as CSSProperties}>
                <div className="card-header">
                  <strong>{t.legacyTitle}</strong>
                  <span className="status-icon x">✕</span>
                </div>
                <ul>
                  {t.legacyPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>

              <article className={`comparison-card revenue-card ${comparisonVisible ? 'is-visible' : ''}`} style={{ '--comparison-delay': '180ms' } as CSSProperties}>
                <div className="card-header">
                  <strong>{t.revenueTitle}</strong>
                  <span className="status-icon check">✓</span>
                </div>
                <ul>
                  {t.revenuePoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="pillars-section" ref={pillarsSectionRef}>
          <div className="container">
            <header className={`pillars-heading ${pillarsVisible ? 'is-visible' : ''}`}>
              <span>{t.pillarsLabel}</span>
              <h2>{t.pillarsTitle}</h2>
            </header>

            <div className="pillars-grid">
              {t.pillars.map((pillar, index) => (
                <article
                  key={pillar.title}
                  className={`pillar-card ${pillarsVisible ? 'is-visible' : ''} ${cardsLift ? 'is-lifted' : ''}`}
                  style={
                    {
                      '--delay': `${index * 180}ms`,
                      '--lift-delay': `${index * 180}ms`,
                    } as CSSProperties
                  }
                >
                  <div className="pillar-icon" aria-hidden="true">
                    {pillar.icon}
                  </div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="specialties-section" ref={specialtiesSectionRef}>
          <div className="container">
            <h2 className={`specialties-title ${specialtiesVisible ? 'is-visible' : ''}`}>
              {t.specialtiesTitle}
            </h2>

            <div className="specialties-grid">
              {t.specialties.map((item, index) => (
                <article
                  key={item.title}
                  className={`specialty-card ${specialtiesVisible ? 'is-visible' : ''}`}
                  style={{ '--specialty-delay': `${index * 220}ms` } as CSSProperties}
                >
                  <div className="specialty-overlay" aria-hidden="true" />
                  <div className="specialty-content">
                    <div className="specialty-icon" aria-hidden="true">
                      <i className={`bi bi-${item.icon}`} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="infra-section" ref={infraSectionRef}>
          <div className="container infra-grid">
            <div className={`infra-copy ${infraVisible ? 'is-visible' : ''}`}>
              <h2>{t.infraTitle}</h2>
              <p>{t.infraDescription}</p>

              <ul className="infra-steps">
                {t.infraSteps.map((step, index) => (
                  <li
                    key={step.id}
                    className={infraVisible ? 'is-visible' : ''}
                    style={{ '--infra-delay': `${index * 160}ms` } as CSSProperties}
                  >
                    <span className={`step-number ${step.id === '02' ? 'is-active' : ''}`}>{step.id}</span>
                    <div>
                      <strong>{step.title}</strong>
                      <p>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <article className={`tech-card ${infraVisible ? 'is-visible' : ''}`}>
              <h3>
                <i className="bi bi-stack" aria-hidden="true" />
                {t.techStackTitle}
              </h3>
              <p>{t.techStackDescription}</p>
              <div className="tech-items">
                {t.techStackItems.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="final-cta-section" ref={finalCtaRef}>
          <div className={`container final-cta ${finalCtaVisible ? 'is-visible' : ''}`}>
            <h2>{t.finalCtaTitle}</h2>
            <p>{t.finalCtaDescription}</p>

            <div className="final-cta-actions">
              <button className="primary-btn" type="button">
                {t.finalCtaPrimary}
              </button>
              <button className="outline-btn" type="button">
                {t.finalCtaSecondary}
              </button>
            </div>

            <small>{t.finalCtaFootnote}</small>
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

export default App
