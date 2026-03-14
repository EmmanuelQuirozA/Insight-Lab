const logos = [
  { src: '/images/customers/1.svg', alt: 'Logo de iTech' },
  { src: '/images/customers/2.svg', alt: 'Logo de IBM' },
  { src: '/images/customers/3.svg', alt: 'Logo de Samsung' },
  { src: '/images/customers/4.svg', alt: 'Logo de Meta' },
  { src: '/images/customers/5.svg', alt: 'Logo de Uber' },
  { src: '/images/customers/6.svg', alt: 'Logo de Ingenico' },
  { src: '/images/customers/7.svg', alt: 'Logo de Accenture' },
  { src: '/images/customers/8.svg', alt: 'Logo de Adidas' },
  { src: '/images/customers/9.svg', alt: 'Logo corporativo 9' },
  { src: '/images/customers/10.svg', alt: 'Logo corporativo 10' },
]

type TrustedBrandsCarouselProps = {
  title: string
}

function TrustedBrandsCarousel({ title }: TrustedBrandsCarouselProps) {
  const displayLogos = [...logos, ...logos]

  return (
    <section className="trusted-brands" aria-label={title}>
      <div className="container trusted-brands__container">
        <h2 className="trusted-brands__title">{title}</h2>

        <div className="trusted-brands__marquee" role="list" aria-label="Empresas que confían en Insight Lab">
          <div className="trusted-brands__track">
            {displayLogos.map((logo, index) => (
              <div className="trusted-brands__item" key={`${logo.src}-${index}`} role="listitem">
                <img src={logo.src} alt={logo.alt} loading="lazy" className="trusted-brands__logo" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustedBrandsCarousel
