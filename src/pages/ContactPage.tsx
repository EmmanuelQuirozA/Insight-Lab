import { useMemo, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../App.css'
import useSystemTheme from '../hooks/useSystemTheme'
import useDetectedLanguage from '../hooks/useDetectedLanguage'


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
  const [language, setLanguage] = useDetectedLanguage()
  const { theme, setTheme } = useSystemTheme()
  const [themeTransitionKey, setThemeTransitionKey] = useState(0)


  const t = copy[language]

  const navItems = useMemo(
    () => [
      { key: 'about', label: t.nav.about, href: '/about' },
      { key: 'solutions', label: t.nav.solutions, href: '/solutions' },
      { key: 'success', label: t.nav.successStories, href: '/success-stories' },
      { key: 'contact', label: t.nav.contact, href: '/contact' },
    ],
    [t.nav],
  )

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    setThemeTransitionKey((prev) => prev + 1)
  }

  return (
    <div className="app-shell">
      <Header
        logo={
          <a href="/" className="brand-name" aria-label="Insight Lab home">
            <img src="/brand/logo_minimal.png" alt="Insight Lab logo" className="brand-icon" />
            <span>
              Insight<span className="accent">Lab</span>
            </span>
          </a>
        }
        navItems={navItems}
        ctaLabel={t.ctaHeader}
        themeLabel={t.themeToggle}
        theme={theme}
        themeTransitionKey={themeTransitionKey}
        language={language}
        onThemeToggle={toggleTheme}
        onLanguageChange={setLanguage}
      />

      <main className="page-main page-main--padded contact-page">
        <section className="container page-hero contact-reveal-item">
          <h1>
            {t.pageTitleTop}
            <br />
            <span className="accent">{t.pageTitleAccent}</span>
          </h1>
          <p>{t.pageLead}</p>
        </section>

        <section className="container contact-form-wrap contact-reveal-item bg-white">
          <h3 className='text-black'>{t.formTitle}</h3>
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
      </main>

      <Footer
        brandName="Insight"
        brandAccent="Lab"
        links={t.footerLinks}
        socialLinks={[
          { label: 'Instagram', href: '#', icon: 'instagram' },
          { label: 'LinkedIn', href: '#', icon: 'linkedin' },
          { label: 'YouTube', href: '#', icon: 'youtube' },
        ]}
        copyright={t.footerCopyright}
      />
    </div>
  )
}

export default ContactPage
