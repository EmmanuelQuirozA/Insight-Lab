import { useRef, useState, type PointerEvent } from 'react'

type Side = 'left' | 'right'

type DragState = {
  pointerId: number
  offsetY: number
}

const WHATSAPP_NUMBER_PLACEHOLDER = 'AQUI_TU_NUMERO'

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function FloatingWhatsAppButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const [side, setSide] = useState<Side>('right')
  const [top, setTop] = useState(240)
  const [dragState, setDragState] = useState<DragState | null>(null)

  const href = `https://wa.me/${WHATSAPP_NUMBER_PLACEHOLDER}`

  const handlePointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) {
      return
    }

    const rect = buttonRef.current.getBoundingClientRect()
    buttonRef.current.setPointerCapture(event.pointerId)
    setDragState({
      pointerId: event.pointerId,
      offsetY: event.clientY - rect.top,
    })
  }

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (!dragState || event.pointerId !== dragState.pointerId || !buttonRef.current) {
      return
    }

    const viewportHeight = window.innerHeight
    const buttonHeight = buttonRef.current.offsetHeight
    const nextTop = clamp(event.clientY - dragState.offsetY, 96, viewportHeight - buttonHeight - 24)

    setTop(nextTop)
    setSide(event.clientX < window.innerWidth / 2 ? 'left' : 'right')
  }

  const handlePointerUp = (event: PointerEvent<HTMLAnchorElement>) => {
    if (dragState && event.pointerId === dragState.pointerId && buttonRef.current?.hasPointerCapture(event.pointerId)) {
      buttonRef.current.releasePointerCapture(event.pointerId)
      setDragState(null)
    }
  }

  return (
    <a
      ref={buttonRef}
      className={`floating-whatsapp floating-whatsapp--${side}`}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Enviar mensaje por WhatsApp"
      style={{ top: `${top}px` }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <span className="floating-whatsapp__icon" aria-hidden="true">
        💬
      </span>
      <span className="floating-whatsapp__label">WhatsApp</span>
    </a>
  )
}

export default FloatingWhatsAppButton
