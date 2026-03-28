import { useEffect } from 'react'

export const UTM_STORAGE_KEY = 'utm_params'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const

type UtmKey = (typeof UTM_KEYS)[number]
export type UtmParams = Partial<Record<UtmKey, string>>

const isBrowser = () => typeof window !== 'undefined'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const sanitizeUtmParams = (value: unknown): UtmParams => {
  if (!isRecord(value)) {
    return {}
  }

  return UTM_KEYS.reduce<UtmParams>((acc, key) => {
    const rawValue = value[key]

    if (typeof rawValue === 'string' && rawValue.trim().length > 0) {
      acc[key] = rawValue
    }

    return acc
  }, {})
}

const hasAnyUtmParam = (params: UtmParams) => Object.keys(params).length > 0

const extractUtmParamsFromSearch = (search: string): UtmParams => {
  const searchParams = new URLSearchParams(search)

  return UTM_KEYS.reduce<UtmParams>((acc, key) => {
    const value = searchParams.get(key)

    if (typeof value === 'string' && value.trim().length > 0) {
      acc[key] = value
    }

    return acc
  }, {})
}

export const getStoredUtmParams = (): UtmParams => {
  if (!isBrowser()) {
    return {}
  }

  try {
    const stored = window.sessionStorage.getItem(UTM_STORAGE_KEY)

    if (!stored) {
      return {}
    }

    return sanitizeUtmParams(JSON.parse(stored))
  } catch (error) {
    console.error('Unable to read UTM params from sessionStorage', error)
    return {}
  }
}

export const useUtmTracking = () => {
  useEffect(() => {
    if (!isBrowser()) {
      return
    }

    try {
      const existingUtmParams = getStoredUtmParams()

      if (hasAnyUtmParam(existingUtmParams)) {
        return
      }

      const currentUtmParams = extractUtmParamsFromSearch(window.location.search)

      if (!hasAnyUtmParam(currentUtmParams)) {
        return
      }

      window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(currentUtmParams))
    } catch (error) {
      console.error('Unable to persist UTM params in sessionStorage', error)
    }
  }, [])
}

