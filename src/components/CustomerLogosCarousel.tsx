import { useMemo } from 'react'

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

const logoBasePath = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`

const getLogoSrc = (path: string) => `${logoBasePath}${path.replace(/^\//, '')}`

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

  const trackLogos = useMemo(() => [...sortedLogos, ...sortedLogos], [sortedLogos])

  return (
    <section className="customer-logos-section" aria-label={title}>
      <div className="container">
        <h2 className="customer-logos-title">{title}</h2>

        <div className="customer-logos-carousel" role="list" aria-label="Logos de clientes">
          <div className="carousel-track">
            {trackLogos.map((logo, index) => (
              <div className="carousel-item" key={`${logo}-${index}`} role="listitem">
                <img src={getLogoSrc(logo)} alt={`Logo de cliente ${getNumericValue(logo)}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerLogosCarousel
