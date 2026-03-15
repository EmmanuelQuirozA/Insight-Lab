import { useMemo } from 'react'
import useSystemTheme from '../hooks/useSystemTheme'

type CustomerLogosCarouselProps = {
  title: string
}

const logos = [
  '10.png', 
  '20.png', 
  '30.png', 
  '40.png', 
  '50.png', 
  '60.png', 
  '70.png', 
  '80.png', 
  '90.png', 
  '100.png'
]

function CustomerLogosCarousel({ title }: CustomerLogosCarouselProps) {
  const { theme } = useSystemTheme()
  const isDark = theme === 'dark'

  const sortedLogos = useMemo(
    () => [...logos].sort((a, b) => Number(a.replace(/\D/g, '')) - Number(b.replace(/\D/g, ''))),
    [],
  )

  const displayLogos = useMemo(() => [...sortedLogos, ...sortedLogos], [sortedLogos])

  return (
    <section className="customer-logos-section" aria-label={title}>
      <div className="container">
        <h2 className="customer-logos-title">{title}</h2>

        <div
          className={`py-10 relative overflow-hidden w-full rounded-3xl border ${
            isDark ? 'bg-[#0B1C2D]/80 border-[#1F6FFF]/20' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          {/* Gradientes laterales para difuminar los bordes (Efecto fade) */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r ${
              isDark ? 'from-[#0B1C2D] to-transparent' : 'from-white to-transparent'
            }`}
          ></div>
          <div
            className={`absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l ${
              isDark ? 'from-[#0B1C2D] to-transparent' : 'from-white to-transparent'
            }`}
          ></div>

          <div className="logo-track flex overflow-hidden" role="list" aria-label="Logos de clientes">
            <div className="animate-scroll flex gap-16 items-center px-8">
              {displayLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-32 h-16 relative flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100"
                  role="listitem"
                >
                  <img
                    src={`/images/customers/${logo}`}
                    alt="Customer logo"
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback visual de ayuda en caso de que la imagen no exista aún
                      const image = e.currentTarget
                      image.style.display = 'none'
                      const numMatch = logo.match(/\d+/)
                      const num = numMatch ? numMatch[0] : ''
                      const fallbackColor = isDark ? '#475569' : '#cbd5e1'

                      if (image.parentElement) {
                        image.parentElement.innerHTML = `<span style="font-size: 12px; font-weight: 700; color: ${fallbackColor};">LOGO ${num}</span>`
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerLogosCarousel
