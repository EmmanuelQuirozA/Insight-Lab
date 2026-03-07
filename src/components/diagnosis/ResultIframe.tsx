import './diagnosis-iframe.css'

type ResultIframeProps = {
  src: string
  title: string
}

function ResultIframe({ src, title }: ResultIframeProps) {
  return (
    <div className="diagnosis-frame-shell">
      <iframe className="diagnosis-frame" src={src} title={title} loading="lazy" allow="clipboard-write" />
    </div>
  )
}

export default ResultIframe
