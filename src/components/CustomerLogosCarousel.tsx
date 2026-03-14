import { useEffect, useMemo, useState } from 'react'

type CustomerLogosCarouselProps = {
  title: string
}

const logoPaths = [
  '/images/customers/10.svg',
  '/images/customers/3.svg',
  '/images/customers/1.svg',
  '/images/customers/6.svg',
  '/images/customers/2.svg',
  '/images/customers/8.svg',
  '/images/customers/4.svg',
  '/images/customers/5.svg',
  '/images/customers/7.svg',
  '/images/customers/9.svg',
]

const getNumericValue = (path: string) => {
  const fileName = path.split('/').pop() ?? ''
  const match = fileName.match(/\d+/)
  return match ? Number(match[0]) : Number.POSITIVE_INFINITY
}

function CustomerLogosCarousel({ title }: CustomerLogosCarouselProps) {
  const sortedLogos = useMemo(
    () => [...logoPaths].sort((a, b) => getNumericValue(a) - getNumericValue(b)),
    [],
  )

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % sortedLogos.length)
    }, 3000)

    return () => window.clearInterval(timer)
  }, [sortedLogos.length])

  return (
    <section className="customer-logos-section" aria-label={title}>
      <div className="container">
        <h2 className="customer-logos-title">{title}</h2>

        <div className="customer-logos-carousel">
          <button
            type="button"
            className="carousel-control prev"
            onClick={() =>
              setActiveIndex((current) => (current - 1 + sortedLogos.length) % sortedLogos.length)
            }
            aria-label="Logo anterior"
          >
            ‹
          </button>

          <div className="carousel-track" role="list">
            {sortedLogos.map((logo, index) => (
              <div
                key={logo}
                className={`carousel-item ${index === activeIndex ? 'is-active' : ''}`}
                role="listitem"
              >
                <img src={logo} alt={`Logo de cliente ${getNumericValue(logo)}`} loading="lazy" />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="carousel-control next"
            onClick={() => setActiveIndex((current) => (current + 1) % sortedLogos.length)}
            aria-label="Siguiente logo"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}

export default CustomerLogosCarousel
