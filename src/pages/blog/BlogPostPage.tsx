import type { CSSProperties } from 'react'
import SiteLayout from '../../components/SiteLayout'
import BlogCard from '../../blog/components/BlogCard'
import { getCategoryById, getPostBySlug, getRelatedPosts, formatBlogDate } from '../../blog/utils/blog'
import { getBlogIndexPath, getBlogPostPath } from '../../blog/utils/routes'
import { buildBreadcrumbStructuredData } from '../../seo/structuredData'

const copy = {
  es: {
    back: 'Volver al blog',
    related: 'Artículos relacionados',
    relatedDescription: 'Continúa explorando ideas para mejorar revenue, automatización y conversión.',
    writtenBy: 'Escrito por',
    notFoundTitle: 'Artículo no encontrado',
    notFoundBody: 'El artículo que buscas no existe o todavía no está publicado.',
  },
  en: {
    back: 'Back to blog',
    related: 'Related posts',
    relatedDescription: 'Keep exploring ideas to improve revenue, automation and conversion.',
    writtenBy: 'Written by',
    notFoundTitle: 'Post not found',
    notFoundBody: 'The post you are looking for does not exist or has not been published yet.',
  },
} as const

function BlogPostPage({ slug }: { slug: string }) {
  const currentPath = typeof window === 'undefined' ? getBlogPostPath('es', slug) : window.location.pathname

  return (
    <SiteLayout
      mainClassName="blog-page"
      seoPath={currentPath}
      seoOverride={(language) => {
        const post = getPostBySlug(slug, language)

        return post
          ? {
              title: post.seoTitle,
              description: post.seoDescription,
              ogType: 'article',
              ogImage: post.coverImage,
            }
          : undefined
      }}
      seoStructuredData={(language) => {
        const post = getPostBySlug(slug, language)
        if (!post) {
          return buildBreadcrumbStructuredData([
            { name: language === 'es' ? 'Inicio' : 'Home', path: language === 'es' ? '/es' : '/en' },
            { name: 'Blog', path: getBlogIndexPath(language) },
          ])
        }

        return [
          buildBreadcrumbStructuredData([
            { name: language === 'es' ? 'Inicio' : 'Home', path: language === 'es' ? '/es' : '/en' },
            { name: 'Blog', path: getBlogIndexPath(language) },
            { name: post.title, path: getBlogPostPath(language, post.slug) },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.seoDescription,
            image: post.coverImage,
            datePublished: post.createdAt,
            author: {
              '@type': 'Person',
              name: post.author.name,
            },
          },
        ]
      }}
    >
      {({ language }) => {
        const t = copy[language]
        const post = getPostBySlug(slug, language)

        return (
          <div className="container blog-page__container">
            {!post ? (
              <div className="blog-post-not-found">
                <h1>{t.notFoundTitle}</h1>
                <p>{t.notFoundBody}</p>
                <a href={getBlogIndexPath(language)} className="primary-btn btn">
                  {t.back}
                </a>
              </div>
            ) : (
              <>
                <article className="blog-post">
                  <a href={getBlogIndexPath(language)} className="blog-back-link">
                    ← {t.back}
                  </a>

                  <header className="blog-post__header">
                    <div className="blog-post__eyebrow">
                      {(() => {
                        const category = getCategoryById(post.category)
                        return category ? (
                          <span className="blog-category-badge" style={{ '--blog-category-color': category.color } as CSSProperties}>
                            {category.label}
                          </span>
                        ) : null
                      })()}
                      <span>{formatBlogDate(post.createdAt, language)}</span>
                      <span>{post.readingTime}</span>
                    </div>

                    <h1>{post.title}</h1>
                    <p>{post.excerpt}</p>

                    <section className="blog-post__author-section" aria-label={t.writtenBy}>
                      <p className="blog-post__author-heading">{t.writtenBy}</p>
                      <div className="blog-post__author">
                        {post.author.avatar ? (
                          <img
                            src={post.author.avatar}
                            alt={`${post.author.name} - ${post.author.role}`}
                            className="blog-post__author-avatar"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : null}
                        <div className="blog-post__author-info">
                          <strong>{post.author.name}</strong>
                          <span>{post.author.role}</span>
                        </div>
                      </div>
                    </section>
                  </header>

                  <img src={post.coverImage} alt={post.coverImageAlt} className="blog-post__cover" />

                  <div className="blog-post__content">
                    {post.content.map((block, index) => {
                      if (block.type === 'heading') {
                        return <h2 key={`${block.type}-${index}`}>{block.content}</h2>
                      }

                      if (block.type === 'list') {
                        return (
                          <ul key={`${block.type}-${index}`}>
                            {block.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        )
                      }

                      if (block.type === 'quote') {
                        return <blockquote key={`${block.type}-${index}`}>{block.content}</blockquote>
                      }

                      return <p key={`${block.type}-${index}`}>{block.content}</p>
                    })}
                  </div>

                  <footer className="blog-post__footer">
                    <div className="blog-card__tags">
                      {post.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </footer>
                </article>

                <section className="blog-related">
                  <div className="blog-section-heading">
                    <h2>{t.related}</h2>
                    <p>{t.relatedDescription}</p>
                  </div>

                  <div className="blog-grid">
                    {getRelatedPosts(post, language).map((relatedPost) => (
                      <BlogCard key={relatedPost.id} post={relatedPost} language={language} />
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>
        )
      }}
    </SiteLayout>
  )
}

export default BlogPostPage
