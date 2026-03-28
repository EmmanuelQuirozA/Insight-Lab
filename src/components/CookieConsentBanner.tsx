type CookieConsentBannerProps = {
  title?: string
  description?: string
  acceptLabel?: string
  rejectLabel?: string
  configureLabel?: string
  onAccept: () => void
  onReject: () => void
  onConfigure?: () => void
}

const DEFAULT_TITLE = 'Usamos cookies analíticas'
const DEFAULT_DESCRIPTION =
  'Estas cookies nos ayudan a medir el rendimiento del sitio para mejorar tu experiencia. Puedes aceptar o rechazar su uso.'

function CookieConsentBanner({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  acceptLabel = 'Aceptar',
  rejectLabel = 'Rechazar',
  configureLabel = 'Configurar',
  onAccept,
  onReject,
  onConfigure,
}: CookieConsentBannerProps) {
  return (
    <aside
      className="cookie-consent-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      aria-modal="false"
    >
      <div className="cookie-consent-banner__content">
        <p className="cookie-consent-banner__title">{title}</p>
        <p className="cookie-consent-banner__description">{description}</p>
      </div>

      <div className="cookie-consent-banner__actions">
        <button type="button" className="cookie-consent-banner__button cookie-consent-banner__button--reject" onClick={onReject}>
          {rejectLabel}
        </button>

        {onConfigure ? (
          <button
            type="button"
            className="cookie-consent-banner__button cookie-consent-banner__button--configure"
            onClick={onConfigure}
          >
            {configureLabel}
          </button>
        ) : null}

        <button type="button" className="cookie-consent-banner__button cookie-consent-banner__button--accept" onClick={onAccept}>
          {acceptLabel}
        </button>
      </div>
    </aside>
  )
}

export default CookieConsentBanner
