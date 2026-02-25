import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import useDetectedLanguage from '../../hooks/useDetectedLanguage'
import useSystemTheme from '../../hooks/useSystemTheme'
import '../../App.css'
import './quiz.css'
import { QUESTIONS, RESULTS } from './data'
import type { ContactFormData, Language } from './types'

type UiCopy = {
  title: string
  subtitle: string
  progress: string
  previous: string
  next: string
  finish: string
  contactTitle: string
  contactSubtitle: string
  calculatingLabel: string
  sendAndReveal: string
  fullName: string
  email: string
  phone: string
  company: string
  role: string
  required: string
  scoreLabel: string
  recommendations: string
  payloadTitle: string
  payloadCaption: string
  startOver: string
  nav: {
    about: string
    solutions: string
    successStories: string
    contact: string
  }
  ctaHeader: string
  themeToggle: string
  footerLinks: { label: string; href: string }[]
  footerCopyright: string
}

const uiCopy: Record<Language, UiCopy> = {
  es: {
    title: 'Quiz de Madurez Digital Inmobiliaria',
    subtitle: 'Responde estas preguntas para calcular tu nivel de madurez digital y recibir recomendaciones estratégicas.',
    progress: 'Pregunta',
    previous: 'Anterior',
    next: 'Siguiente',
    finish: 'Finalizar quiz',
    contactTitle: 'Completa tus datos para desbloquear tu reporte detallado',
    contactSubtitle: 'Te enviaremos recomendaciones accionables para tu inmobiliaria.',
    calculatingLabel: 'Estamos calculando tus resultados. Ingresa tus datos para desbloquear tu reporte.',
    sendAndReveal: 'Enviar y ver resultados',
    fullName: 'Nombre completo',
    email: 'Correo electrónico',
    phone: 'Teléfono',
    company: 'Inmobiliaria / Empresa',
    role: 'Cargo',
    required: 'Campo obligatorio',
    scoreLabel: 'Puntaje total',
    recommendations: 'Recomendaciones',
    payloadTitle: 'JSON preparado para endpoint',
    payloadCaption: 'Este payload ya incluye respuestas + datos de contacto y puede enviarse directamente a un endpoint.',
    startOver: 'Reiniciar quiz',
    nav: {
      about: 'Nosotros',
      solutions: 'Soluciones',
      successStories: 'Casos de éxito',
      contact: 'Contacto',
    },
    ctaHeader: 'Agenda tu auditoría',
    themeToggle: 'Tema',
    footerLinks: [
      { label: 'Términos', href: '#' },
      { label: 'Privacidad', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
    footerCopyright: '© 2026 Insight Lab Agency. All rights reserved.',
  },
  en: {
    title: 'Real Estate Digital Maturity Quiz',
    subtitle: 'Answer these questions to calculate your digital maturity level and receive strategic recommendations.',
    progress: 'Question',
    previous: 'Previous',
    next: 'Next',
    finish: 'Finish quiz',
    contactTitle: 'Complete your details to unlock your detailed report',
    contactSubtitle: 'We will send actionable recommendations for your real estate business.',
    calculatingLabel: 'We are calculating your results. Enter your contact details to unlock your report.',
    sendAndReveal: 'Submit and view results',
    fullName: 'Full name',
    email: 'Email',
    phone: 'Phone',
    company: 'Real Estate / Company',
    role: 'Role',
    required: 'Required field',
    scoreLabel: 'Total score',
    recommendations: 'Recommendations',
    payloadTitle: 'Endpoint-ready JSON',
    payloadCaption: 'This payload already includes answers + contact details and can be sent directly to an endpoint.',
    startOver: 'Restart quiz',
    nav: {
      about: 'About Us',
      solutions: 'Solutions',
      successStories: 'Success Stories',
      contact: 'Contact',
    },
    ctaHeader: 'Book your audit',
    themeToggle: 'Theme',
    footerLinks: [
      { label: 'Terms', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
    footerCopyright: '© 2026 Insight Lab Agency. All rights reserved.',
  },
}

const emptyContactForm: ContactFormData = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  role: '',
}

function DigitalMaturityQuizPage() {
  const [language, setLanguage] = useDetectedLanguage()
  const { theme, setTheme } = useSystemTheme()
  const [themeTransitionKey, setThemeTransitionKey] = useState(0)
  const t = uiCopy[language]

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C'>>({})
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [contactForm, setContactForm] = useState<ContactFormData>(emptyContactForm)
  const [showValidation, setShowValidation] = useState(false)
  const [submittedPayload, setSubmittedPayload] = useState<string>('')

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

  const selectedOption = answers[QUESTIONS[step]?.id]

  const score = useMemo(
    () => QUESTIONS.reduce((total, question) => total + (question.options.find((option) => option.id === answers[question.id])?.points ?? 0), 0),
    [answers],
  )

  const result = useMemo(() => RESULTS.find((item) => score >= item.minScore && score <= item.maxScore), [score])

  const isContactValid = Object.values(contactForm).every((value) => value.trim().length > 0)

  const handleOptionChange = (optionId: 'A' | 'B' | 'C') => {
    const questionId = QUESTIONS[step].id
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep((prev) => prev + 1)
      return
    }

    setQuizCompleted(true)
  }

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setShowValidation(true)

    if (!isContactValid || !result) {
      return
    }

    const payload = {
      quizType: 'digital-maturity-real-estate',
      submittedAt: new Date().toISOString(),
      language,
      score,
      result: {
        title: result.title[language],
        description: result.description[language],
        advice: result.advice[language],
        industryInsight: result.industryInsight[language],
      },
      contact: contactForm,
      answers: QUESTIONS.map((question) => {
        const selectedId = answers[question.id]
        const selected = question.options.find((option) => option.id === selectedId)

        return {
          questionId: question.id,
          category: question.category[language],
          question: question.question[language],
          selectedOptionId: selected?.id ?? null,
          selectedOptionLabel: selected?.label[language] ?? null,
          points: selected?.points ?? 0,
        }
      }),
    }

    setSubmittedPayload(JSON.stringify(payload, null, 2))
  }

  const resetQuiz = () => {
    setStep(0)
    setAnswers({})
    setQuizCompleted(false)
    setContactForm(emptyContactForm)
    setShowValidation(false)
    setSubmittedPayload('')
  }

  const question = QUESTIONS[step]

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

      <main className="page-main page-main--padded quiz-page">
        <div className="container quiz-shell">
          <section className="quiz-card">
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>

            {!quizCompleted && (
              <>
                <div className="quiz-progress">
                  <span>{`${t.progress} ${step + 1} / ${QUESTIONS.length}`}</span>
                  <div className="quiz-progress-track" role="progressbar" aria-valuemin={1} aria-valuenow={step + 1} aria-valuemax={QUESTIONS.length}>
                    <div style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} />
                  </div>
                </div>

                <article className="quiz-question-block">
                  <p className="quiz-category">{question.category[language]}</p>
                  <h2>{question.question[language]}</h2>

                  <div className="quiz-options">
                    {question.options.map((option) => (
                      <label key={option.id} className={`quiz-option ${selectedOption === option.id ? 'is-selected' : ''}`}>
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option.id}
                          checked={selectedOption === option.id}
                          onChange={() => handleOptionChange(option.id)}
                        />
                        <span>{option.label[language]}</span>
                      </label>
                    ))}
                  </div>
                </article>

                <div className="quiz-actions">
                  <button className="ghost-btn" type="button" onClick={() => setStep((prev) => Math.max(0, prev - 1))} disabled={step === 0}>
                    {t.previous}
                  </button>
                  <button className="primary-btn" type="button" onClick={handleNext} disabled={!selectedOption}>
                    {step === QUESTIONS.length - 1 ? t.finish : t.next}
                  </button>
                </div>
              </>
            )}

            {quizCompleted && (
              <div className="quiz-final-step">
                {!submittedPayload && <p className="quiz-calculating-label">{t.calculatingLabel}</p>}

                <h2>{t.contactTitle}</h2>
                <p>{t.contactSubtitle}</p>

                <form className="quiz-contact-form" onSubmit={handleContactSubmit}>
                  {(
                    [
                      ['fullName', t.fullName],
                      ['email', t.email],
                      ['phone', t.phone],
                      ['company', t.company],
                      ['role', t.role],
                    ] as const
                  ).map(([field, label]) => (
                    <label key={field} className="quiz-field">
                      <span>{label}</span>
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        value={contactForm[field]}
                        onChange={(event) => setContactForm((prev) => ({ ...prev, [field]: event.target.value }))}
                      />
                      {showValidation && !contactForm[field].trim() && <small>{t.required}</small>}
                    </label>
                  ))}

                  <button className="primary-btn" type="submit">
                    {t.sendAndReveal}
                  </button>
                </form>

                {submittedPayload && result && (
                  <div className="quiz-results">
                    <h3>{result.title[language]}</h3>
                    <p>
                      <strong>{t.scoreLabel}:</strong> {score}/100
                    </p>
                    <p>{result.description[language]}</p>
                    <p>
                      <strong>{t.recommendations}:</strong> {result.advice[language]}
                    </p>
                    <p>{result.industryInsight[language]}</p>

                    <div className="quiz-json-panel">
                      <h4>{t.payloadTitle}</h4>
                      <p>{t.payloadCaption}</p>
                      <pre>{submittedPayload}</pre>
                    </div>
                  </div>
                )}

                <button className="ghost-btn" type="button" onClick={resetQuiz}>
                  {t.startOver}
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer
        brandName="Insight"
        brandAccent="Lab"
        links={t.footerLinks}
        socialLinks={[
          { label: 'Facebook', href: '#', icon: 'facebook' },
          { label: 'Instagram', href: '#', icon: 'instagram' },
          { label: 'LinkedIn', href: '#', icon: 'linkedin' },
          { label: 'YouTube', href: '#', icon: 'youtube' },
        ]}
        copyright={t.footerCopyright}
      />
    </div>
  )
}

export default DigitalMaturityQuizPage
