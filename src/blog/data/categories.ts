import type { BlogCategory } from '../types'

export const blogCategories: BlogCategory[] = [
  {
    id: 'revops',
    slug: 'revenue-operations',
    label: 'Revenue Operations',
    description: 'Sistemas, visibilidad y procesos para alinear marketing, ventas y revenue.',
    color: '#1f6fff',
  },
  {
    id: 'automation',
    slug: 'automatizacion',
    label: 'Automatización',
    description: 'Playbooks operativos para nutrir, calificar y convertir con menos fricción.',
    color: '#6a4dff',
  },
  {
    id: 'growth',
    slug: 'growth-high-ticket',
    label: 'Growth High-Ticket',
    description: 'Estrategias de demanda y conversión para negocios B2B y high-ticket.',
    color: '#00a7b5',
  },
]
