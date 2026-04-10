import { useState } from 'react'
import SiteLayout from '../../components/SiteLayout'
import BlogCard from '../../blog/components/BlogCard'
import BlogFilters from '../../blog/components/BlogFilters'
import BlogHero from '../../blog/components/BlogHero'
import BlogPagination from '../../blog/components/BlogPagination'
import FeaturedPosts from '../../blog/components/FeaturedPosts'
import { BLOG_PAGE_SIZE, getBlogCategories, getFeaturedPosts, queryPosts } from '../../blog/utils/blog'
import { buildBreadcrumbStructuredData } from '../../seo/structuredData'
import { getBlogIndexPath } from '../../blog/utils/routes'
import type { BlogDateSort } from '../../blog/types'

const copy = {
  es: {
    latestTitle: 'Últimos artículos',
    latestDescription: 'Ideas accionables para optimizar acquisition, CRM, automatización y revenue.',
    empty: 'No encontramos artículos con esos filtros.',
  },
  en: {
    latestTitle: 'Latest articles',
    latestDescription: 'Actionable ideas to optimize acquisition, CRM, automation and revenue.',
    empty: 'No posts matched these filters.',
  },
} as const

function BlogLandingPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSort, setSelectedSort] = useState<BlogDateSort>('newest')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  return (
    <SiteLayout
      mainClassName="blog-page"
      seoPath={typeof window === 'undefined' ? '/es/blog' : window.location.pathname}
      seoOverride={(language) => ({
        title: language === 'es' ? 'Blog de Insight Lab | Revenue Operations, CRM y Conversión' : 'Insight Lab Blog | Revenue Operations, CRM & Growth Insights',
        description:
          language === 'es'
            ? 'Contenido sobre Revenue Operations, automatización, CRM y estrategia digital para negocios high-ticket y B2B.'
            : 'Explore Revenue Operations, automation, CRM and demand generation insights for high-ticket and B2B growth teams.',
        ogType: 'website',
      })}
      seoStructuredData={(language) =>
        buildBreadcrumbStructuredData([
          { name: language === 'es' ? 'Inicio' : 'Home', path: language === 'es' ? '/es' : '/en' },
          { name: 'Blog', path: getBlogIndexPath(language) },
        ])
      }
    >
      {({ language }) => {
        const t = copy[language]
        const categories = getBlogCategories(language)
        const featuredPosts = getFeaturedPosts(language)
        const result = queryPosts({ category: selectedCategory, sort: selectedSort, search, page, pageSize: BLOG_PAGE_SIZE }, language)

        return (
          <div className="container blog-page__container">
            <BlogHero language={language} />
            <FeaturedPosts posts={featuredPosts} language={language} />
            <BlogFilters
              language={language}
              categories={categories}
              selectedCategory={selectedCategory}
              selectedSort={selectedSort}
              search={search}
              onCategoryChange={(value) => {
                setSelectedCategory(value)
                setPage(1)
              }}
              onSortChange={(value) => {
                setSelectedSort(value)
                setPage(1)
              }}
              onSearchChange={(value) => {
                setSearch(value)
                setPage(1)
              }}
            />

            <section className="blog-list-section">
              <div className="blog-section-heading">
                <h2>{t.latestTitle}</h2>
                <p>{t.latestDescription}</p>
              </div>

              {result.items.length > 0 ? (
                <div className="blog-grid">
                  {result.items.map((post) => (
                    <BlogCard key={post.id} post={post} language={language} />
                  ))}
                </div>
              ) : (
                <div className="blog-empty-state">{t.empty}</div>
              )}

              <BlogPagination language={language} page={result.page} totalPages={result.totalPages} onPageChange={setPage} />
            </section>
          </div>
        )
      }}
    </SiteLayout>
  )
}

export default BlogLandingPage
