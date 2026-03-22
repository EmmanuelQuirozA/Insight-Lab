import type { Language } from '../../routing/publicRoutes'

export const getBlogIndexPath = (language: Language) => (language === 'es' ? '/es/blog' : '/en/blog')

export const getBlogPostPath = (language: Language, slug: string) => `${getBlogIndexPath(language)}/${slug}`

export const getBlogSlugFromPath = (pathname: string): string | null => {
  const match = pathname.match(/^\/(en|es)\/blog\/([^/]+)$/)
  return match?.[2] ?? null
}

export const isBlogIndexPath = (pathname: string) => /^\/(en|es)\/blog$/.test(pathname)

export const isBlogPostPath = (pathname: string) => /^\/(en|es)\/blog\/[^/]+$/.test(pathname)
