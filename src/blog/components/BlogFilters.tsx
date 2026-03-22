import type { ChangeEvent } from 'react'
import type { BlogCategory, BlogDateSort } from '../types'
import type { Language } from '../../routing/publicRoutes'

type BlogFiltersProps = {
  language: Language
  categories: BlogCategory[]
  selectedCategory: string
  selectedSort: BlogDateSort
  search: string
  onCategoryChange: (value: string) => void
  onSortChange: (value: BlogDateSort) => void
  onSearchChange: (value: string) => void
}

const copy = {
  es: {
    search: 'Buscar por título, extracto o tags',
    category: 'Categoría',
    allCategories: 'Todas',
    sort: 'Ordenar por fecha',
    newest: 'Más recientes',
    oldest: 'Más antiguos',
  },
  en: {
    search: 'Search by title, excerpt or tags',
    category: 'Category',
    allCategories: 'All',
    sort: 'Sort by date',
    newest: 'Newest first',
    oldest: 'Oldest first',
  },
} as const

function BlogFilters({
  language,
  categories,
  selectedCategory,
  selectedSort,
  search,
  onCategoryChange,
  onSortChange,
  onSearchChange,
}: BlogFiltersProps) {
  const t = copy[language]

  return (
    <section className="blog-filters" aria-label="Blog filters">
      <label className="blog-filter-control blog-filter-control--search">
        <span>{t.search}</span>
        <input value={search} onChange={(event: ChangeEvent<HTMLInputElement>) => onSearchChange(event.target.value)} placeholder={t.search} />
      </label>

      <label className="blog-filter-control">
        <span>{t.category}</span>
        <select value={selectedCategory} onChange={(event: ChangeEvent<HTMLSelectElement>) => onCategoryChange(event.target.value)}>
          <option value="all">{t.allCategories}</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </label>

      <label className="blog-filter-control">
        <span>{t.sort}</span>
        <select value={selectedSort} onChange={(event: ChangeEvent<HTMLSelectElement>) => onSortChange(event.target.value as BlogDateSort)}>
          <option value="newest">{t.newest}</option>
          <option value="oldest">{t.oldest}</option>
        </select>
      </label>
    </section>
  )
}

export default BlogFilters
