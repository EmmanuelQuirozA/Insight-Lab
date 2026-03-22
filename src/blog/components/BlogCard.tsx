import type { CSSProperties } from 'react'
import { getCategoryById, formatBlogDate } from '../utils/blog'
import { getBlogPostPath } from '../utils/routes'
import type { BlogPost } from '../types'
import type { Language } from '../../routing/publicRoutes'

function BlogCard({ post, language }: { post: BlogPost; language: Language }) {
  const category = getCategoryById(post.category)

  return (
    <article className="blog-card">
      <a href={getBlogPostPath(language, post.slug)} className="blog-card__image-link" aria-label={post.title}>
        <img src={post.coverImage} alt={post.coverImageAlt} className="blog-card__image" />
      </a>

      <div className="blog-card__body">
        <div className="blog-card__meta">
          {category && (
            <span className="blog-category-badge" style={{ '--blog-category-color': category.color } as CSSProperties}>
              {category.label}
            </span>
          )}
          <span>{formatBlogDate(post.createdAt, language)}</span>
          <span>{post.readingTime}</span>
        </div>

        <a href={getBlogPostPath(language, post.slug)} className="blog-card__title-link">
          <h3>{post.title}</h3>
        </a>
        <p>{post.excerpt}</p>

        <div className="blog-card__footer">
          <span>
            {post.author.name} · {post.author.role}
          </span>
          <div className="blog-card__tags">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export default BlogCard
