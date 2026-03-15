import SiteLayout from '../components/SiteLayout'
import '../App.css'
import { buildBreadcrumbStructuredData } from '../seo/structuredData'


const copy = {
  es: {
    navAbout: 'Nosotros',
    navSolutions: 'Soluciones',
    navSuccessStories: 'Casos de éxito',
    navContact: 'Contacto',
    ctaHeader: 'Agenda tu auditoría',
    themeToggle: 'Tema',
    pageTitleTop: 'No somos solo una agencia.',
    pageTitleAccent: 'Somos un laboratorio de crecimiento digital.',
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
    navSuccessStories: 'Success Stories',
    navContact: 'Contact',
    ctaHeader: 'Book your audit',
    themeToggle: 'Theme',
    pageTitleTop: 'We do not talk about likes.',
    pageTitleAccent: 'We talk about real growth.',
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
  return (
    <SiteLayout
      seoStructuredData={(language) =>
        buildBreadcrumbStructuredData([
          { name: language === 'es' ? 'Inicio' : 'Home', path: '/' },
          { name: language === 'es' ? 'Nosotros' : 'About', path: '/about' },
        ])
      }
    >
      {({ language }) => {
        const t = copy[language]

        return (
          <>
            <section className="container page-hero about-page">
          <h1>
            {t.pageTitleTop}
            <br />
            <span className="accent">{t.pageTitleAccent}</span>
          </h1>

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
          </>
        )
      }}
    </SiteLayout>
  )
}

export default AboutPage
