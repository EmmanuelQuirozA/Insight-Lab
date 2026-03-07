import ResultIframe from '../../components/diagnosis/ResultIframe'
import { diagnosisIframes, type ResultTier, type SupportedLanguage } from '../../config/diagnosisIframes'
import '../../components/diagnosis/diagnosis-iframe.css'

type DiagnosisResultPageProps = {
  language: SupportedLanguage
  tier: ResultTier | null
}

const resultTitles = {
  es: {
    high: 'Resultado Alto',
    medium: 'Resultado Medio',
    low: 'Resultado Bajo',
    notFound: 'Resultado no encontrado.',
  },
  en: {
    high: 'High Score Result',
    medium: 'Medium Score Result',
    low: 'Low Score Result',
    notFound: 'Result not found.',
  },
}

function DiagnosisResultPage({ language, tier }: DiagnosisResultPageProps) {
  if (!tier) {
    return (
      <section className="diagnosis-content">
        <div className="diagnosis-fallback">{resultTitles[language].notFound}</div>
      </section>
    )
  }

  const iframeUrl = diagnosisIframes[language].results[tier]

  return (
    <section className="diagnosis-content">
      <h1 className="diagnosis-title">{resultTitles[language][tier]}</h1>
      <ResultIframe src={iframeUrl} title={resultTitles[language][tier]} />
    </section>
  )
}

export default DiagnosisResultPage
