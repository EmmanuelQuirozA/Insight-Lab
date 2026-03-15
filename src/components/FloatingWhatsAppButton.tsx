const WHATSAPP_NUMBER_PLACEHOLDER = '3328113840'

function FloatingWhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER_PLACEHOLDER}`

  return (
    <a
      className="floating-whatsapp"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Enviar mensaje por WhatsApp"
    >
      <i className="floating-whatsapp__icon bi bi-whatsapp" aria-hidden="true" />
    </a>
  )
}

export default FloatingWhatsAppButton
