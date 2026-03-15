import SiteLayout from '../components/SiteLayout'
import '../App.css'
import { buildBreadcrumbStructuredData } from '../seo/structuredData'

const copy = {
  es: {
    nav: {
      about: 'Nosotros',
      solutions: 'Soluciones',
      successStories: 'Casos de éxito',
      contact: 'Contacto',
    },
    ctaHeader: 'Agenda tu auditoría',
    themeToggle: 'Tema',
    pageTitleTop: 'Toda marca tiene una pieza faltante.',
    pageTitleAccent: 'La pregunta es: ¿ya sabes cuál es la tuya?',
    pageLead: 'Agenda una sesión estratégica y descubre qué variable está frenando tu crecimiento digital.',
    formTitle: 'Formulario de contacto',
    nameLabel: 'Nombre completo',
    emailLabel: 'Correo electrónico',
    companyLabel: 'Empresa',
    messageLabel: 'Cuéntanos tu objetivo',
    submitLabel: 'Agendar sesión estratégica',
    footerLinks: [
      { label: 'Términos', href: '#' },
      { label: 'Privacidad', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
    footerCopyright: '© 2026 Insight Lab Agency. All rights reserved.',
  },
  en: {
    nav: {
      about: 'About Us',
      solutions: 'Solutions',
      successStories: 'Success Stories',
      contact: 'Contact',
    },
    ctaHeader: 'Book your audit',
    themeToggle: 'Theme',
    pageTitleTop: 'Every brand has a missing piece.',
    pageTitleAccent: 'The question is: do you already know yours?',
    pageLead: 'Book a strategy session and discover which variable is slowing your digital growth.',
    formTitle: 'Contact form',
    nameLabel: 'Full name',
    emailLabel: 'Email',
    companyLabel: 'Company',
    messageLabel: 'Tell us your objective',
    submitLabel: 'Agendar sesión estratégica',
    footerLinks: [
      { label: 'Terms', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
    footerCopyright: '© 2026 Insight Lab Agency. All rights reserved.',
  },
} as const

function ContactPage() {
  return (
    <SiteLayout
      mainClassName="contact-page"
      seoPath="/contact"
      seoStructuredData={(language) =>
        buildBreadcrumbStructuredData([
          { name: language === 'es' ? 'Inicio' : 'Home', path: '/' },
          { name: language === 'es' ? 'Contacto' : 'Contact', path: '/contact' },
        ])
      }
    >
      {({ language }) => {
        const t = copy[language]

        return (
          <>
            <section className="container page-hero contact-reveal-item">
          <h1>
            {t.pageTitleTop}
            <br />
            <span className="accent">{t.pageTitleAccent}</span>
          </h1>
          <p>{t.pageLead}</p>
        </section>

        <section className="container contact-form-wrap contact-reveal-item bg-white">
          <h2 className='text-black'>{t.formTitle}</h2>
          {language === 'es' ? (
            <div className="contact-iframe-placeholder contact-iframe-placeholder--es" role="status" aria-live="polite">
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/aOupcgB0Jj9XPJl2tRpm"
                style={{width:"100%",height:"860px"}}
                id="inline-aOupcgB0Jj9XPJl2tRpm" 
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Strategic_Contact_Form_es"
                data-height="871"
                data-layout-iframe-id="inline-aOupcgB0Jj9XPJl2tRpm"
                data-form-id="aOupcgB0Jj9XPJl2tRpm"
                title="Strategic_Contact_Form_es"
              >
              </iframe>
              <script src="https://link.msgsndr.com/js/form_embed.js"></script>
            </div>
          ) : (
            <div className="contact-iframe-placeholder contact-iframe-placeholder--en" role="status" aria-live="polite">
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/JwUVX1H2uuHcqt3Pwd6I"
                style={{width:"100%",height:"860px"}}
                id="inline-JwUVX1H2uuHcqt3Pwd6I" 
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Strategic_Contact_Form_en"
                data-height="718"
                data-layout-iframe-id="inline-JwUVX1H2uuHcqt3Pwd6I"
                data-form-id="JwUVX1H2uuHcqt3Pwd6I"
                title="Strategic_Contact_Form_en"
                    >
            </iframe>
            <script src="https://link.msgsndr.com/js/form_embed.js"></script>
            </div>
          )}
        </section>
          </>
        )
      }}
    </SiteLayout>
  )
}

export default ContactPage
