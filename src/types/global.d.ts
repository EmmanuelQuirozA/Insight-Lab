export {}

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (
      command: 'consent',
      action: 'default' | 'update',
      payload: { analytics_storage: 'granted' | 'denied' },
    ) => void
  }
}
