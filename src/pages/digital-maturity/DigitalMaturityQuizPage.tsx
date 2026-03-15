import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import SiteLayout from '../../components/SiteLayout'
import useDetectedLanguage from '../../hooks/useDetectedLanguage'
import '../../App.css'
import './quiz.css'
import { QUESTIONS, RESULTS } from './data'
import type { ContactFormData, Language } from './types'
import { API_BASE_URL } from '../../config'
import { buildBreadcrumbStructuredData } from '../../seo/structuredData'
import { getLocalizedPath } from '../../routing/publicRoutes'

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
  calculatingTitle: string
  loadingReport: string
  sendAndReveal: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  role: string
  trustNote: string
  required: string
  scoreLabel: string
  recommendations: string
  diagnosisFor: string
  analysisLabel: string
  priorityRecommendation: string
  immediateAction: string
  marketReality: string
  scoreInsight: string
  scoreToSalesQuestion: string
  ctaResult: string
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
    contactSubtitle: '¿A dónde enviamos tu reporte detallado y recomendaciones?',
    calculatingLabel: 'Tu índice se está procesando en segundos.',
    calculatingTitle: 'Estamos calculando tu Índice de Huella Digital...',
    loadingReport: 'Cargando reporte',
    sendAndReveal: 'Ver mis resultados',
    firstName: 'Nombre',
    lastName: 'Apellidos',
    email: 'Correo electrónico',
    phone: 'Teléfono',
    company: 'Inmobiliaria / Empresa',
    role: 'Cargo',
    trustNote: 'Tus datos están 100% seguros. No enviamos spam.',
    required: 'Campo obligatorio',
    scoreLabel: 'Puntaje total',
    recommendations: 'Recomendaciones',
    diagnosisFor: 'RESULTADO DEL DIAGNÓSTICO PARA',
    analysisLabel: 'Análisis',
    priorityRecommendation: 'RECOMENDACIÓN PRIORITARIA',
    immediateAction: 'Acción inmediata',
    marketReality: 'REALIDAD DEL MERCADO',
    scoreInsight: 'Tu puntuación indica que puedes mejorar tus conversiones un',
    scoreToSalesQuestion: '¿Quieres convertir este puntaje en ventas?',
    ctaResult: 'Agendar llamada de revisión (15 min)',
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
    contactSubtitle: 'Where should we send your detailed report and recommendations?',
    calculatingLabel: 'Your index is being processed in seconds.',
    calculatingTitle: 'We are calculating your Digital Footprint Index...',
    loadingReport: 'Loading report',
    sendAndReveal: 'See my results',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    phone: 'Phone',
    company: 'Real Estate / Company',
    role: 'Role',
    trustNote: 'Your data is 100% secure. We do not send spam.',
    required: 'Required field',
    scoreLabel: 'Total score',
    recommendations: 'Recommendations',
    diagnosisFor: 'DIAGNOSTIC RESULT FOR',
    analysisLabel: 'Analysis',
    priorityRecommendation: 'PRIORITY RECOMMENDATION',
    immediateAction: 'Immediate action',
    marketReality: 'MARKET REALITY',
    scoreInsight: 'Your score shows you can improve your conversion rate by',
    scoreToSalesQuestion: 'Do you want to turn this score into sales?',
    ctaResult: 'Schedule review call (15 min)',
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
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  role: '',
}

function DigitalMaturityQuizPage() {
  const [language, setLanguage] = useDetectedLanguage()
  const t = uiCopy[language]

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C'>>({})
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [contactForm, setContactForm] = useState<ContactFormData>(emptyContactForm)
  const [showValidation, setShowValidation] = useState(false)
  const [submittedPayload, setSubmittedPayload] = useState<string>('')
  const [isSubmittingReport, setIsSubmittingReport] = useState(false)

  const selectedOption = answers[QUESTIONS[step]?.id]

  const score = useMemo(
    () => QUESTIONS.reduce((total, question) => total + (question.options.find((option) => option.id === answers[question.id])?.points ?? 0), 0),
    [answers],
  )

  const result = useMemo(() => RESULTS.find((item) => score >= item.minScore && score <= item.maxScore), [score])

  const isContactValid = [contactForm.firstName, contactForm.lastName, contactForm.email, contactForm.phone].every((value) => value.trim().length > 0)

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
      firstName: contactForm.firstName.trim(),
      lastName: contactForm.lastName.trim(),
      email: contactForm.email.trim(),
      phone: contactForm.phone.trim(),
      companyName: contactForm.company.trim() || undefined,
      language,
      role: contactForm.role.trim() || undefined,
      quizType: 'real-estate-diagnosis',
      score,
      tier: score > 70 ? 'high' : score > 40 ? 'mid' : 'low',
      answers: QUESTIONS.map((question) => {
        const selectedId = answers[question.id]
        const selected = question.options.find((option) => option.id === selectedId)

        return {
          questionId: question.id,
          question: question.question[language],
          answer: selected?.label[language] ?? '',
          points: selected?.points ?? 0,
        }
      }),
    }

    setSubmittedPayload(JSON.stringify(payload, null, 2))
    setIsSubmittingReport(true)

    void (async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/diagnosis/submit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

      } catch (error) {
        console.error('Error submitting diagnosis:', error)
      } finally {
        setIsSubmittingReport(false)
      }
    })()
  }

  const resetQuiz = () => {
    setStep(0)
    setAnswers({})
    setQuizCompleted(false)
    setContactForm(emptyContactForm)
    setShowValidation(false)
    setSubmittedPayload('')
    setIsSubmittingReport(false)

  }


  const question = QUESTIONS[step]

  const getScoreColor = (s: number) => {
    if (s <= 40) return 'text-red-600'
    if (s <= 70) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getBgColor = (s: number) => {
    if (s <= 40) return 'bg-red-50 border-red-100'
    if (s <= 70) return 'bg-yellow-50 border-yellow-100'
    return 'bg-green-50 border-green-100'
  }

  return (
    <SiteLayout
      mainClassName="quiz-page"
      language={language}
      onLanguageChange={setLanguage}
      seoStructuredData={(activeLanguage) =>
        buildBreadcrumbStructuredData([
          { name: activeLanguage === 'es' ? 'Inicio' : 'Home', path: getLocalizedPath('home', activeLanguage) },
          { name: activeLanguage === 'es' ? 'Diagnóstico Real Estate' : 'Real Estate Diagnosis', path: getLocalizedPath('realEstateDiagnosis', activeLanguage) },
        ])
      }
    >
      {() => (
        <>
        <div className="container quiz-shell">
          <section className="quiz-card">
            <h1 className="quiz-title">{t.title}</h1>
            <p className="quiz-subtitle">{t.subtitle}</p>

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
                  <h2 className="quiz-question-title">{question.question[language]}</h2>

                  <div className="quiz-options row g-3">
                    {question.options.map((option) => (
                      <div key={option.id} className="col-12">
                        <label className={`quiz-option form-check d-flex align-items-center gap-3 mb-0 ${selectedOption === option.id ? 'is-selected' : ''}`}>
                          <input
                            className="form-check-input mt-0"
                            type="radio"
                            name={`question-${question.id}`}
                            value={option.id}
                            checked={selectedOption === option.id}
                            onChange={() => handleOptionChange(option.id)}
                          />
                          <span className="quiz-option-text">{option.label[language]}</span>
                        </label>
                      </div>
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
                {!submittedPayload && !isSubmittingReport && (
                  <>
                    <div className="quiz-loader" aria-hidden="true">
                      <div />
                    </div>
                    <p className="quiz-calculating-label">{t.calculatingLabel}</p>
                  </>
                )}

                {!submittedPayload && !isSubmittingReport && (
                  <>
                    <h2 className="quiz-final-title">{t.calculatingTitle}</h2>
                    <p className="quiz-final-subtitle">{t.contactSubtitle}</p>
                  </>
                )}

                {!submittedPayload && !isSubmittingReport && (
                  <div className="container contact-form-wrap contact-reveal-item bg-white text-black">
                    <form className="quiz-contact-form" onSubmit={handleContactSubmit}>
                      {(
                        [
                          ['firstName', t.firstName],
                          ['lastName', t.lastName],
                          ['email', t.email],
                          ['phone', t.phone],
                          ['company', t.company],
                          ['role', t.role],
                        ] as const
                      ).map(([field, label]) => (
                        <label key={field} className="quiz-field">
                          <span>{label}</span>
                          <input
                            className="form-control"
                            type={field === 'email' ? 'email' : 'text'}
                            value={contactForm[field]}
                            onChange={(event) => setContactForm((prev) => ({ ...prev, [field]: event.target.value }))}
                          />
                          {showValidation && ['firstName', 'lastName', 'email', 'phone'].includes(field) && !contactForm[field].trim() && <small>{t.required}</small>}
                        </label>
                      ))}

                      <button className="primary-btn" type="submit">
                        {t.sendAndReveal}
                      </button>
                    </form>
                  </div>
                )}

                {isSubmittingReport && (
                  <div className="quiz-report-loading" role="status" aria-live="polite">
                    <div className="quiz-loader" aria-hidden="true">
                      <div />
                    </div>
                    <p>{t.loadingReport}</p>
                  </div>
                )}

                {!submittedPayload && !isSubmittingReport && <p className="quiz-trust-note">🔒 {t.trustNote}</p>}

                {submittedPayload && result && (
                  <div className="quiz-results" aria-live="polite">
                    <header className="quiz-results-hero">
                      <p style={{color:"#8da1bb"}}>{`${t.diagnosisFor} ${contactForm.firstName} ${contactForm.lastName}`.trim()}</p>
                      <h3>{result.title[language]}</h3>
                      <div className="quiz-score-badge">
                        <strong className={getScoreColor(score)}>{score}</strong>
                        <span>/100</span>
                      </div>
                    </header>

                    <section className={`quiz-results-analysis ${getBgColor(score)}`}>
                      <div className='d-flex gap-1 align-items-center'>
                        <i className="bi bi-activity"/>
                        <h4>{t.analysisLabel}</h4>
                      </div>
                      <p>{result.description[language]}</p>
                    </section>

                    <p className="quiz-results-section-title px-4">{t.priorityRecommendation}</p>
                    <section className="quiz-results-block">
                      <div className='d-flex gap-1 align-items-center'>
                        <i className="bi bi-exclamation-circle"/>
                        <h4>{t.immediateAction}</h4>
                      </div>
                      <p>{result.advice[language]}</p>
                    </section>

                    <section className="quiz-results-block quiz-results-market">
                      <div className='d-flex gap-1 align-items-center'>
                        <i className="bi bi-lightbulb"/>
                        <h4>{t.marketReality}</h4>
                      </div>
                      <p>{result.industryInsight[language]}</p>
                    </section>

                    <section className="quiz-results-cta">
                      <h4>{t.scoreToSalesQuestion}</h4>
                      <p>
                        {t.scoreInsight} <strong>20%</strong> ajustando tu experiencia digital.
                      </p>
                      <a className="primary-btn" href={getLocalizedPath('contact', language)}>
                        {t.ctaResult}
                      </a>
                    </section>
                    <div className="visually-hidden" aria-hidden="true">
                      {submittedPayload}
                    </div>
                  </div>
                )}

                <button className="ghost-btn mt-4" type="button" onClick={resetQuiz}>
                  {t.startOver}
                </button>
              </div>
            )}
          </section>
        </div>
        </>
      )}
    </SiteLayout>
  )
}

export default DigitalMaturityQuizPage
