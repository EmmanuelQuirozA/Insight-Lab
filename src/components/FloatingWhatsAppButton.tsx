import { useRef, useState, type DragEvent, type MouseEvent } from 'react'

type Side = 'left' | 'right'

type DragState = {
  offsetY: number
}

const WHATSAPP_NUMBER_PLACEHOLDER = '3328113840'

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function FloatingWhatsAppButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const movedDuringDragRef = useRef(false)
  const [side, setSide] = useState<Side>('right')
  const [top, setTop] = useState(240)
  const [dragState, setDragState] = useState<DragState | null>(null)

  const href = `https://wa.me/${WHATSAPP_NUMBER_PLACEHOLDER}`

  const handleDragStart = (event: DragEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) {
      return
    }

    const rect = buttonRef.current.getBoundingClientRect()

    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', 'whatsapp-floating-button')

    const dragPreview = document.createElement('img')
    dragPreview.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
    event.dataTransfer.setDragImage(dragPreview, 0, 0)

    movedDuringDragRef.current = false
    setDragState({
      offsetY: event.clientY - rect.top,
    })
  }

  const handleDrag = (event: DragEvent<HTMLAnchorElement>) => {
    if (!dragState || !buttonRef.current) {
      return
    }

    if (event.clientX === 0 && event.clientY === 0) {
      return
    }

    const viewportHeight = window.innerHeight
    const buttonHeight = buttonRef.current.offsetHeight
    const nextTop = clamp(event.clientY - dragState.offsetY, 96, viewportHeight - buttonHeight - 24)

    setTop(nextTop)
    setSide(event.clientX < window.innerWidth / 2 ? 'left' : 'right')
    movedDuringDragRef.current = true
  }

  const handleDragEnd = () => {
    setDragState(null)

    window.setTimeout(() => {
      movedDuringDragRef.current = false
    }, 0)
  }

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (movedDuringDragRef.current) {
      event.preventDefault()
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
      draggable
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    >
      <i className="floating-whatsapp__icon bi bi-whatsapp" aria-hidden="true" />
      <span className="floating-whatsapp__label"></span>
    </a>
  )
}

export default FloatingWhatsAppButton
