import type { Question, ResultType } from './types'

export const QUESTIONS: Question[] = [
  {
    id: 1,
    category: {
      es: 'Velocidad y Móvil (Infraestructura)',
      en: 'Speed and Mobile (Infrastructure)',
    },
    question: {
      es: 'Abre tu sitio web en tu celular ahora mismo con 4G (sin WiFi). ¿Cuánto tarda en mostrar la primera imagen clara?',
      en: 'Open your website on your phone right now using 4G (no WiFi). How long until the first clear image appears?',
    },
    options: [
      { id: 'A', label: { es: 'Instantáneo (menos de 2 seg).', en: 'Instant (under 2 sec).' }, points: 20 },
      { id: 'B', label: { es: 'Un poco lento (3-5 seg).', en: 'A bit slow (3-5 sec).' }, points: 10 },
      { id: 'C', label: { es: 'Se queda cargando o se ve roto (+6 seg).', en: 'It keeps loading or looks broken (+6 sec).' }, points: 0 },
    ],
  },
  {
    id: 2,
    category: {
      es: 'Experiencia Visual (Contenido)',
      en: 'Visual Experience (Content)',
    },
    question: {
      es: '¿Cómo muestras tus propiedades destacadas?',
      en: 'How do you showcase your featured properties?',
    },
    options: [
      { id: 'A', label: { es: 'Solo fotos estáticas.', en: 'Only static photos.' }, points: 0 },
      { id: 'B', label: { es: 'Fotos + Video recorrido básico.', en: 'Photos + a basic video tour.' }, points: 10 },
      { id: 'C', label: { es: 'Experiencia inmersiva (Tour 360°, Dron o Renders navegables).', en: 'Immersive experience (360° tour, drone footage, or navigable renders).' }, points: 20 },
    ],
  },
  {
    id: 3,
    category: {
      es: 'Captación (Conversión)',
      en: 'Lead Capture (Conversion)',
    },
    question: {
      es: 'Si un cliente quiere información un domingo a las 9 PM, ¿qué sucede en tu web?',
      en: 'If a client wants information on Sunday at 9 PM, what happens on your website?',
    },
    options: [
      { id: 'A', label: { es: "Solo hay un formulario de 'Contacto' genérico.", en: "There is only a generic 'Contact' form." }, points: 0 },
      { id: 'B', label: { es: 'Hay un botón de WhatsApp, pero nadie contesta hasta el lunes.', en: 'There is a WhatsApp button, but nobody replies until Monday.' }, points: 10 },
      { id: 'C', label: { es: 'Hay un Chatbot o CRM que captura los datos y agenda una cita automáticamente.', en: 'A chatbot or CRM captures data and automatically schedules an appointment.' }, points: 20 },
    ],
  },
  {
    id: 4,
    category: {
      es: 'Huella de Autoridad (Reputación)',
      en: 'Authority Footprint (Reputation)',
    },
    question: {
      es: 'Si busco el nombre de tu inmobiliaria en Google, ¿qué aparece en los primeros 3 resultados?',
      en: 'If I search your real estate brand name on Google, what appears in the first 3 results?',
    },
    options: [
      { id: 'A', label: { es: 'Solo mi web.', en: 'Only my website.' }, points: 0 },
      { id: 'B', label: { es: 'Mi web y perfiles sociales desactualizados.', en: 'My website and outdated social profiles.' }, points: 10 },
      { id: 'C', label: { es: 'Mi web, reseñas positivas en Google Maps y artículos/videos de autoridad.', en: 'My website, positive Google Maps reviews, and authority articles/videos.' }, points: 20 },
    ],
  },
  {
    id: 5,
    category: {
      es: 'Seguimiento (El Cierre)',
      en: 'Tracking (The Close)',
    },
    question: {
      es: '¿Sabes exactamente qué canal digital te trajo tu última venta cerrada (no solo el lead)?',
      en: 'Do you know exactly which digital channel drove your last closed deal (not just the lead)?',
    },
    options: [
      { id: 'A', label: { es: 'No, no tengo idea.', en: 'No, I have no idea.' }, points: 0 },
      { id: 'B', label: { es: "Tengo una idea vaga ('creo que vino de Instagram').", en: "I have a vague idea ('I think it came from Instagram')." }, points: 10 },
      { id: 'C', label: { es: 'Sí, tengo trazabilidad completa desde el clic hasta la firma.', en: 'Yes, I have full traceability from click to signed contract.' }, points: 20 },
    ],
  },
]

export const RESULTS: ResultType[] = [
  {
    title: { es: 'El Fantasma Digital', en: 'The Digital Ghost' },
    minScore: 0,
    maxScore: 40,
    description: {
      es: 'Tienes un gran producto, pero tu huella digital es invisible. Estás perdiendo clientes frente a competidores con peores propiedades pero mejor tecnología.',
      en: 'You have a great product, but your digital footprint is invisible. You are losing clients to competitors with worse properties but better technology.',
    },
    advice: {
      es: 'Necesitas optimizar la velocidad móvil urgentemente.',
      en: 'You need to optimize mobile speed urgently.',
    },
    industryInsight: {
      es: 'El 82% de los compradores inician su búsqueda en móviles. Si tu web tarda más de 3 segundos en cargar, pierdes al 53% de los visitantes antes de que vean tu primera propiedad.',
      en: '82% of buyers start their search on mobile. If your website takes more than 3 seconds to load, you lose 53% of visitors before they see your first listing.',
    },
  },
  {
    title: { es: 'La Vitrina Estática', en: 'The Static Showcase' },
    minScore: 41,
    maxScore: 70,
    description: {
      es: 'Tu presencia es correcta, pero pasiva. Tienes una web bonita, pero no es una máquina de ventas. Te falta automatización y experiencia de usuario.',
      en: 'Your presence is acceptable, but passive. You have a nice website, but it is not a sales machine. You are missing automation and user experience.',
    },
    advice: {
      es: 'Implementa recorridos virtuales y automatiza la captura de leads.',
      en: 'Implement virtual tours and automate lead capture.',
    },
    industryInsight: {
      es: 'El 73% de los propietarios prefieren listar sus inmuebles con agentes que utilizan video y herramientas 3D. Una web estática hoy en día es invisible para el algoritmo y aburrida para el usuario.',
      en: '73% of owners prefer listing with agents that use video and 3D tools. A static website today is invisible to algorithms and boring for users.',
    },
  },
  {
    title: { es: 'El Líder Inmobiliario', en: 'The Real Estate Leader' },
    minScore: 71,
    maxScore: 100,
    description: {
      es: 'Tienes una base sólida. Es hora de escalar con estrategias agresivas de tráfico y optimización de tasa de conversión (CRO).',
      en: 'You have a solid foundation. It is time to scale with aggressive traffic and conversion-rate optimization (CRO) strategies.',
    },
    advice: {
      es: 'Contacta para escalar tus campañas de Paid Media.',
      en: 'Get in touch to scale your paid media campaigns.',
    },
    industryInsight: {
      es: 'Las inmobiliarias digitalizadas reducen su Costo por Lead (CPL) en un 40% mediante automatización. Tu competencia no es la otra inmobiliaria, es la inmediatez que ofrecen portales tecnológicos.',
      en: 'Digitized real estate firms cut Cost per Lead (CPL) by 40% through automation. Your competition is not another agency, it is the immediacy offered by tech platforms.',
    },
  },
]
