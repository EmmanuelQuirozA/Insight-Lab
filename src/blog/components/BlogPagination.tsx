import type { Language } from '../../routing/publicRoutes'

const copy = {
  es: { previous: 'Anterior', next: 'Siguiente', page: 'Página' },
  en: { previous: 'Previous', next: 'Next', page: 'Page' },
} as const

function BlogPagination({
  language,
  page,
  totalPages,
  onPageChange,
}: {
  language: Language
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  if (totalPages <= 1) {
    return null
  }

  const t = copy[language]

  return (
    <nav className="blog-pagination" aria-label="Blog pagination">
      <button type="button" className="ghost-btn" onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        {t.previous}
      </button>
      <span>
        {t.page} {page} / {totalPages}
      </span>
      <button type="button" className="ghost-btn" onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
        {t.next}
      </button>
    </nav>
  )
}

export default BlogPagination
