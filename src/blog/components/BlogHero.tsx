import type { Language } from '../../routing/publicRoutes'

const copy = {
  es: {
    eyebrow: 'Insights para Revenue Leaders',
    title: 'Blog de Insight Lab',
    description:
      'Estrategia, Revenue Operations, automatización y conversión para equipos que necesitan crecimiento medible, no solo tráfico.',
  },
  en: {
    eyebrow: 'Insights for Revenue Leaders',
    title: 'Insight Lab Blog',
    description:
      'Strategy, Revenue Operations, automation and conversion insights for teams that need measurable growth, not just traffic.',
  },
} as const

function BlogHero({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <section className="blog-hero">
      <span className="section-pill">{t.eyebrow}</span>
      <h1>{t.title}</h1>
      <p>{t.description}</p>
    </section>
  )
}

export default BlogHero
