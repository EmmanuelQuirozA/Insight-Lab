import { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../App.css'

type Language = 'es' | 'en'
type Theme = 'light' | 'dark'

const copy = {
  es: {
    navAbout: 'Nosotros',
    navSolutions: 'Soluciones',
    ctaHeader: 'Agenda tu auditoría',
    themeToggle: 'Tema',
    topTitleStart: 'No hablamos de likes.',
    topTitleAccent: 'Hablamos de crecimiento real.',
    heroLead: 'En Insight Lab creemos que el marketing no es improvisación.',
    heroAccent: 'Es arquitectura. Es ingeniería. Es precisión.',
    intro:
      'Un insight es ese momento donde todo encaja. Nosotros lo buscamos, lo aislamos y lo convertimos en sistema.',
    bullets: [
      'Analizamos patrones de comportamiento.',
      'Mapeamos fricciones invisibles.',
      'Diseñamos estructuras que funcionan incluso cuando tú no estás mirando.',
    ],
    combines: 'COMBINAMOS:',
    combineItems: ['Estrategia', 'Psicología del consumidor', 'Datos', 'Automatización', 'Inteligencia Artificial'],
    combineFoot: 'Aquí la creatividad no se deja al azar. Se prueba. Se optimiza. Se escala.',
    philosophyTitle: 'Nuestra filosofía',
    philosophyBody:
      'Las marcas no crecen por volumen. Crecen por precisión. No creemos en “publicar más”. Creemos en diseñar sistemas que generen crecimiento sostenible.',
    philosophyStrong:
      'La diferencia entre una marca que sobrevive y una que escala está en la estructura invisible que la sostiene. Nosotros construimos esa estructura.',
    visionTag: 'NUESTRA VISIÓN',
    vision:
      '“Convertirnos en un referente internacional en ingeniería de crecimiento digital, integrando inteligencia artificial, automatización avanzada y creatividad estratégica en un solo ecosistema.”',
    footerLinks: [
      { label: 'Términos', href: '#' },
      { label: 'Privacidad', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
    footerCopyright: '© 2026 Insight Lab Agency. All rights reserved.',
  },
  en: {
    navAbout: 'About Us',
    navSolutions: 'Solutions',
    ctaHeader: 'Book your audit',
    themeToggle: 'Theme',
    topTitleStart: 'We do not talk about likes.',
    topTitleAccent: 'We talk about real growth.',
    heroLead: 'At Insight Lab, we believe marketing is not improvisation.',
    heroAccent: 'It is architecture. It is engineering. It is precision.',
    intro:
      'An insight is that moment when everything clicks. We look for it, isolate it, and turn it into a repeatable system.',
    bullets: [
      'We analyze behavior patterns.',
      'We map invisible friction points.',
      'We design structures that keep working even when you are not watching.',
    ],
    combines: 'WE COMBINE:',
    combineItems: ['Strategy', 'Consumer psychology', 'Data', 'Automation', 'Artificial Intelligence'],
    combineFoot: 'Creativity is never left to chance. It is tested. Optimized. Scaled.',
    philosophyTitle: 'Our philosophy',
    philosophyBody:
      'Brands do not grow by volume. They grow through precision. We do not believe in “posting more.” We believe in designing systems that deliver sustainable growth.',
    philosophyStrong:
      'The difference between a brand that survives and one that scales is the invisible structure supporting it. We build that structure.',
    visionTag: 'OUR VISION',
    vision:
      '“To become an international benchmark in digital growth engineering by integrating artificial intelligence, advanced automation, and strategic creativity into one ecosystem.”',
    footerLinks: [
      { label: 'Terms', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
    footerCopyright: '© 2026 Insight Lab Agency. All rights reserved.',
  },
} as const

const combineIconClasses = ['bi-bullseye', 'bi-lightbulb', 'bi-database', 'bi-gear', 'bi-cpu'] as const

function AboutPage() {
  const [language, setLanguage] = useState<Language>('es')
  const [theme, setTheme] = useState<Theme>('light')
  const [themeTransitionKey, setThemeTransitionKey] = useState(0)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const t = copy[language]

  const navItems = useMemo(
    () => [
      { key: 'about', label: t.navAbout, href: '/about' },
      { key: 'solutions', label: t.navSolutions, href: '/solutions' },
    ],
    [t.navAbout, t.navSolutions],
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

      <main>
        <section className="container about-page">
          <header className="about-page-title" aria-label="about page heading">
            <h1>{t.topTitleStart}</h1>
            <p>{t.topTitleAccent}</p>
          </header>

          <article className="about-hero-card">
            <p>{t.heroLead}</p>
            <strong>{t.heroAccent}</strong>
          </article>

          <p className="about-intro">{t.intro}</p>

          <ul className="about-bullets">
            {t.bullets.map((item) => (
              <li key={item}>
                <i className="bi bi-check-circle about-bullet-icon" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <article className="about-combine-card">
            <h3>{t.combines}</h3>
            <div className="about-combine-grid">
              {t.combineItems.map((item, index) => (
                <div key={item} className="about-combine-item">
                  <i
                    className={`bi ${combineIconClasses[index] ?? 'bi-stars'} ${index === 4 ? 'about-combine-icon-ai' : ''}`}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p>{t.combineFoot}</p>
          </article>

          <section className="about-philosophy">
            <h2>{t.philosophyTitle}</h2>
            <p>{t.philosophyBody}</p>
            <strong>{t.philosophyStrong}</strong>
          </section>

          <article className="about-vision-card">
            <span>{t.visionTag}</span>
            <p>{t.vision}</p>
          </article>
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

export default AboutPage
