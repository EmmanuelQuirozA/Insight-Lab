const logos = [
  { src: '/images/customers/10.png', alt: 'La canasta basica' },
  { src: '/images/customers/20.png', alt: 'Chocho tattoo' },
  { src: '/images/customers/30.png', alt: 'Madera Verde' },
  { src: '/images/customers/40.png', alt: 'Tercer piso' },
  { src: '/images/customers/50.png', alt: 'One solver' },
  { src: '/images/customers/60.png', alt: 'The barber spa' },
  { src: '/images/customers/70.png', alt: 'Don chairo & su pandilla' },
  // { src: '/images/customers/80.png', alt: 'El tiburón pescadería' },
  { src: '/images/customers/90.png', alt: 'Decor' },
  { src: '/images/customers/100.png', alt: 'Ovnigiris' },
  { src: '/images/customers/110.png', alt: 'Divas boutique' },
  { src: '/images/customers/120.png', alt: 'Supernutri' },
  { src: '/images/customers/130.png', alt: 'Clu Studio' },
  { src: '/images/customers/140.png', alt: 'Alyeri Print Shop' },
  { src: '/images/customers/150.png', alt: 'Psicología en Femenino' },
  { src: '/images/customers/160.png', alt: 'Lorbec Mantenimiento' },
  { src: '/images/customers/170.png', alt: 'Dege construction' },
  { src: '/images/customers/180.png', alt: 'Lidia' },
  { src: '/images/customers/190.png', alt: 'Karime Urban Kitchen' },
  { src: '/images/customers/200.png', alt: 'Chula Vida' },
  { src: '/images/customers/210.png', alt: 'Regma' },
  { src: '/images/customers/220.png', alt: 'Lunch Shot' },
  { src: '/images/customers/230.png', alt: 'Bea Trena Ochenta y Nueve' },
  { src: '/images/customers/240.png', alt: 'PSI consulta' },
  { src: '/images/customers/250.png', alt: 'Nova Piel' },
  { src: '/images/customers/260.png', alt: 'Desarrolladora Inmobilaria' },
  { src: '/images/customers/270.png', alt: 'Testosteronne' },
  { src: '/images/customers/280.png', alt: 'Anti Covid' },
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
