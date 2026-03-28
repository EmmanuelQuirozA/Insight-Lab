export type StoredConsentDecision = 'accepted' | 'rejected'

const CONSENT_STORAGE_KEY = 'cookie_consent_decision'
const DEFAULT_CONSENT_STATE = { analytics_storage: 'denied' as const }

type ConsentPayload = {
  analytics_storage: 'granted' | 'denied'
}

type GtagConsentAction = 'default' | 'update'
type GtagFunction = (command: 'consent', action: GtagConsentAction, payload: ConsentPayload) => void

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

function getSafeLocalStorage(): Storage | null {
  if (!isBrowser()) {
    return null
  }

  try {
    return window.localStorage
  } catch {
    return null
  }
}

function getGtagFunction(): GtagFunction | null {
  if (!isBrowser()) {
    return null
  }

  window.dataLayer = window.dataLayer || []

  if (typeof window.gtag === 'function') {
    return window.gtag
  }

  return (command, action, payload) => {
    window.dataLayer.push([command, action, payload])
  }
}

function sendConsentEvent(action: GtagConsentAction, payload: ConsentPayload): void {
  const gtag = getGtagFunction()

  if (!gtag) {
    return
  }

  gtag('consent', action, payload)
}

export function getStoredConsent(): StoredConsentDecision | null {
  const storage = getSafeLocalStorage()

  if (!storage) {
    return null
  }

  const value = storage.getItem(CONSENT_STORAGE_KEY)

  if (value === 'accepted' || value === 'rejected') {
    return value
  }

  return null
}

export function setStoredConsent(value: StoredConsentDecision): void {
  const storage = getSafeLocalStorage()

  if (!storage) {
    return
  }

  storage.setItem(CONSENT_STORAGE_KEY, value)
}

/**
 * Se debe invocar al inicio para garantizar denied por defecto
 * hasta que el usuario haga una elección explícita.
 */
export function applyDefaultConsent(): void {
  sendConsentEvent('default', DEFAULT_CONSENT_STATE)
}

export function grantAnalyticsConsent(): void {
  sendConsentEvent('update', { analytics_storage: 'granted' })
}

export function denyAnalyticsConsent(): void {
  sendConsentEvent('update', { analytics_storage: 'denied' })
}
