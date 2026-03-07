import DiagnosisIframe from '../../components/diagnosis/DiagnosisIframe'
import { diagnosisIframes, type SupportedLanguage } from '../../config/diagnosisIframes'
import '../../components/diagnosis/diagnosis-iframe.css'

type DiagnosisPageProps = {
  language: SupportedLanguage
}

const diagnosisTitles = {
  es: 'Diagnóstico de Real Estate',
  en: 'Real Estate Diagnosis',
}

function DiagnosisPage({ language }: DiagnosisPageProps) {
  const iframeUrl = diagnosisIframes[language].quiz

  return (
    <section className="diagnosis-content">
      <h1 className="diagnosis-title">{diagnosisTitles[language]}</h1>
      <DiagnosisIframe src={iframeUrl} title={diagnosisTitles[language]} />
    </section>
  )
}

export default DiagnosisPage
