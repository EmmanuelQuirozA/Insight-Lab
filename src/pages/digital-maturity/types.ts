export type Language = 'es' | 'en'

export type LocalizedText = {
  es: string
  en: string
}

export type QuestionOption = {
  id: 'A' | 'B' | 'C'
  label: LocalizedText
  points: number
}

export type Question = {
  id: number
  category: LocalizedText
  question: LocalizedText
  options: QuestionOption[]
}

export type ResultType = {
  title: LocalizedText
  minScore: number
  maxScore: number
  description: LocalizedText
  advice: LocalizedText
  industryInsight: LocalizedText
}

export type ContactFormData = {
  fullName: string
  email: string
  phone: string
  company: string
  role: string
}
