import './diagnosis-iframe.css'

type DiagnosisIframeProps = {
  src: string
  title: string
}

function DiagnosisIframe({ src, title }: DiagnosisIframeProps) {
  return (
    <div className="diagnosis-frame-shell">
      <iframe className="diagnosis-frame" src={src} title={title} loading="lazy" allow="clipboard-write" />
    </div>
  )
}

export default DiagnosisIframe
