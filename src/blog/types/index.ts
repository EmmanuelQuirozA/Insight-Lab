import type { Language } from '../../routing/publicRoutes'

export type BlogLocale = Language
export type BlogDateSort = 'newest' | 'oldest'

export type BlogCategory = {
  id: string
  slug: string
  label: string
  description: string
  color: string
}

export type BlogAuthor = {
  name: string
  role: string
  avatar?: string
}

export type BlogContentBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; content: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; content: string }

export type BlogPost = {
  id: string
  translationGroup: string
  locale: BlogLocale
  title: string
  slug: string
  excerpt: string
  content: BlogContentBlock[]
  coverImage: string
  coverImageAlt: string
  category: string
  tags: string[]
  author: BlogAuthor
  createdAt: string
  readingTime: string
  seoTitle: string
  seoDescription: string
  featured: boolean
}

export type BlogQuery = {
  category?: string
  search?: string
  sort?: BlogDateSort
  page?: number
  pageSize?: number
}
