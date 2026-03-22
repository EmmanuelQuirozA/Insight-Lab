import { blogCategories } from '../data/categories'
import { blogPosts } from '../data/posts'
import type { BlogCategory, BlogDateSort, BlogPost, BlogQuery } from '../types'
import type { Language } from '../../routing/publicRoutes'

export const BLOG_PAGE_SIZE = 6

export const getBlogCategories = (): BlogCategory[] => blogCategories

export const getAllPosts = (locale: Language = 'es'): BlogPost[] => {
  const localizedPosts = blogPosts.filter((post) => post.locale === locale)
  return localizedPosts.length > 0 ? localizedPosts : blogPosts.filter((post) => post.locale === 'es')
}

export const getFeaturedPosts = (locale: Language = 'es'): BlogPost[] => getAllPosts(locale).filter((post) => post.featured)

export const getPostBySlug = (slug: string, locale: Language = 'es'): BlogPost | undefined =>
  getAllPosts(locale).find((post) => post.slug === slug)

export const filterPostsByCategory = (posts: BlogPost[], category?: string): BlogPost[] => {
  if (!category || category === 'all') {
    return posts
  }

  return posts.filter((post) => post.category === category)
}

export const searchPosts = (posts: BlogPost[], search = ''): BlogPost[] => {
  const normalized = search.trim().toLowerCase()

  if (!normalized) {
    return posts
  }

  return posts.filter((post) => {
    const haystack = [post.title, post.excerpt, post.tags.join(' ')].join(' ').toLowerCase()
    return haystack.includes(normalized)
  })
}

export const sortPostsByDate = (posts: BlogPost[], sort: BlogDateSort = 'newest'): BlogPost[] =>
  [...posts].sort((left, right) => {
    const leftTime = new Date(left.createdAt).getTime()
    const rightTime = new Date(right.createdAt).getTime()

    return sort === 'oldest' ? leftTime - rightTime : rightTime - leftTime
  })

export const paginatePosts = (posts: BlogPost[], page = 1, pageSize = BLOG_PAGE_SIZE) => {
  const safePage = Math.max(page, 1)
  const start = (safePage - 1) * pageSize
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize))

  return {
    items: posts.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    totalItems: posts.length,
    hasNextPage: safePage < totalPages,
  }
}

export const getRelatedPosts = (post: BlogPost, locale: Language = 'es', limit = 3): BlogPost[] =>
  getAllPosts(locale)
    .filter((candidate) => candidate.id !== post.id)
    .sort((left, right) => {
      const leftScore = Number(left.category === post.category) * 2 + left.tags.filter((tag) => post.tags.includes(tag)).length
      const rightScore = Number(right.category === post.category) * 2 + right.tags.filter((tag) => post.tags.includes(tag)).length

      return rightScore - leftScore
    })
    .slice(0, limit)

export const queryPosts = (query: BlogQuery, locale: Language = 'es') => {
  const base = getAllPosts(locale)
  const filtered = searchPosts(filterPostsByCategory(base, query.category), query.search)
  const sorted = sortPostsByDate(filtered, query.sort)

  return paginatePosts(sorted, query.page, query.pageSize)
}

export const getCategoryById = (categoryId: string): BlogCategory | undefined =>
  blogCategories.find((category) => category.id === categoryId)

export const formatBlogDate = (date: string, locale: Language = 'es') =>
  new Intl.DateTimeFormat(locale === 'es' ? 'es-MX' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
