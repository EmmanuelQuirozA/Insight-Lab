import type { BlogPost } from '../types'

export const blogPosts: BlogPost[] = [
  {
    id: 'revops-pipeline-clarity',
    locale: 'es',
    title: 'Revenue Operations para dejar de perseguir leads y empezar a construir pipeline real',
    slug: 'revenue-operations-pipeline-real',
    excerpt:
      'Cómo diseñar una operación comercial donde marketing, ventas y CRM comparten una misma definición de oportunidad y una sola fuente de verdad.',
    coverImage: '/images/real_state_development_marketing.png',
    coverImageAlt: 'Equipo analizando pipeline de ventas, CRM y revenue operations.',
    category: 'revops',
    tags: ['Revenue Operations', 'CRM', 'Pipeline', 'B2B'],
    author: {
      name: 'Equipo Insight Lab',
      role: 'Revenue Growth Strategists',
    },
    createdAt: '2026-03-12',
    readingTime: '7 min',
    seoTitle: 'Revenue Operations para construir pipeline real | Insight Lab',
    seoDescription:
      'Aprende cómo alinear marketing, ventas y CRM para generar pipeline predecible en negocios high-ticket y B2B.',
    featured: true,
    content: [
      {
        type: 'paragraph',
        content:
          'Muchas empresas invierten en campañas, contenido y seguimiento comercial sin una definición compartida de qué significa un lead calificado. El resultado es ruido operativo, reportes contradictorios y decisiones lentas.',
      },
      {
        type: 'heading',
        content: 'Qué corrige Revenue Operations en una operación de crecimiento',
      },
      {
        type: 'paragraph',
        content:
          'Revenue Operations no es un dashboard bonito. Es la disciplina que conecta adquisición, calificación, seguimiento y cierre bajo procesos comunes. Cuando la data vive en un sistema unificado, el equipo deja de optimizar métricas aisladas y empieza a optimizar revenue.',
      },
      {
        type: 'list',
        items: [
          'Define criterios de MQL, SQL y oportunidad con impacto comercial real.',
          'Conecta campañas con etapas del pipeline y no solo con formularios enviados.',
          'Reduce fricción entre marketing, SDRs y ventas consultivas.',
        ],
      },
      {
        type: 'quote',
        content: 'Si marketing genera volumen pero ventas no encuentra intención, no hay crecimiento: hay desperdicio.',
      },
      {
        type: 'paragraph',
        content:
          'Para Insight Lab, una base sólida empieza por trazabilidad. Cada lead debe poder rastrearse desde la fuente original hasta la conversación comercial y el revenue atribuido. Esa visibilidad permite decidir con claridad dónde invertir, qué automatizar y qué proceso rediseñar.',
      },
    ],
  },
  {
    id: 'automation-nurturing-high-ticket',
    locale: 'es',
    title: 'Automatización para negocios high-ticket: menos seguimiento manual, más avance comercial',
    slug: 'automatizacion-negocios-high-ticket',
    excerpt:
      'Una arquitectura de automatización bien diseñada acelera el ciclo comercial sin sacrificar personalización ni confianza en ventas consultivas.',
    coverImage: '/images/medical_tourism_clinics_marketing.png',
    coverImageAlt: 'Panel de automatización, CRM y secuencias de nurturing para ventas high-ticket.',
    category: 'automation',
    tags: ['Automatización', 'Lead Nurturing', 'High-Ticket', 'Ventas'],
    author: {
      name: 'Equipo Insight Lab',
      role: 'Automation & CRM Architects',
    },
    createdAt: '2026-03-18',
    readingTime: '6 min',
    seoTitle: 'Automatización para negocios high-ticket y B2B | Insight Lab',
    seoDescription:
      'Descubre cómo implementar automatización comercial para nutrir leads, mejorar velocidad de respuesta y aumentar conversión.',
    featured: true,
    content: [
      {
        type: 'paragraph',
        content:
          'En negocios high-ticket, el lead rara vez compra en el primer contacto. Necesita contexto, confianza, seguimiento y timing. Ahí es donde la automatización deja de ser un lujo y se convierte en infraestructura comercial.',
      },
      {
        type: 'heading',
        content: 'Automatizar no es despersonalizar',
      },
      {
        type: 'paragraph',
        content:
          'La mejor automatización combina señales de intención con mensajes relevantes. No se trata de disparar correos genéricos, sino de activar secuencias según comportamiento, origen del lead, interés y etapa del pipeline.',
      },
      {
        type: 'list',
        items: [
          'Respuestas inmediatas cuando entra un lead de alta intención.',
          'Secuencias de nutrición para leads aún no listos para compra.',
          'Alertas al equipo comercial cuando el prospecto muestra intención clara.',
        ],
      },
      {
        type: 'paragraph',
        content:
          'Cuando estas reglas viven conectadas a tu CRM, el seguimiento deja de depender de memoria o disciplina individual. El resultado es una operación más rápida, más consistente y mucho más medible.',
      },
    ],
  },
  {
    id: 'demand-gen-b2b-trust',
    locale: 'es',
    title: 'Generación de demanda B2B: cómo construir confianza antes de pedir la llamada',
    slug: 'generacion-demanda-b2b-confianza',
    excerpt:
      'La demanda de calidad no se construye solo con pauta: requiere contenido, contexto y una narrativa alineada con el proceso comercial.',
    coverImage: '/images/real_state_development_marketing.png',
    coverImageAlt: 'Estrategia digital B2B con contenido, demanda y optimización de conversión.',
    category: 'growth',
    tags: ['Demand Generation', 'B2B', 'Conversión', 'Contenido'],
    author: {
      name: 'Equipo Insight Lab',
      role: 'Demand Generation Strategists',
    },
    createdAt: '2026-03-21',
    readingTime: '8 min',
    seoTitle: 'Generación de demanda B2B y conversión | Insight Lab',
    seoDescription:
      'Un enfoque práctico para construir demanda B2B, elevar confianza y mejorar la calidad del pipeline desde marketing.',
    featured: false,
    content: [
      {
        type: 'paragraph',
        content:
          'Cuando el producto es complejo o la venta es consultiva, pedir una llamada demasiado pronto suele reducir conversión. La confianza se construye antes del formulario, con activos que respondan objeciones reales y eleven la percepción de valor.',
      },
      {
        type: 'heading',
        content: 'Qué necesita una estrategia de demanda orientada a revenue',
      },
      {
        type: 'list',
        items: [
          'Mensajes alineados al problema de negocio, no a features aislados.',
          'Contenido que ayude a comparar escenarios, riesgos y oportunidades.',
          'Rutas de conversión progresivas para captar intención sin fricción innecesaria.',
        ],
      },
      {
        type: 'paragraph',
        content:
          'El objetivo no es solo generar tráfico. Es mover prospectos desde curiosidad hasta conversación comercial con evidencia, claridad y timing. Un blog bien integrado ayuda precisamente a eso: educa, segmenta intención y refuerza posicionamiento.',
      },
      {
        type: 'quote',
        content: 'La mejor estrategia de demanda no empuja al lead: le reduce incertidumbre.',
      },
    ],
  },
]
