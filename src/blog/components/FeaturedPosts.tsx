import BlogCard from './BlogCard'
import type { BlogPost } from '../types'
import type { Language } from '../../routing/publicRoutes'

const copy = {
  es: {
    title: 'Artículos destacados',
    description: 'Contenido prioritario para equipos que buscan claridad operativa y crecimiento sostenible.',
  },
  en: {
    title: 'Featured posts',
    description: 'Priority reading for teams seeking operational clarity and sustainable growth.',
  },
} as const

function FeaturedPosts({ posts, language }: { posts: BlogPost[]; language: Language }) {
  if (posts.length === 0) {
    return null
  }

  const t = copy[language]

  return (
    <section className="blog-featured">
      <div className="blog-section-heading">
        <h2>{t.title}</h2>
        <p>{t.description}</p>
      </div>

      <div className="blog-grid blog-grid--featured">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} language={language} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedPosts
