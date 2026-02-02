import type { Question } from '../../enterprise/entities/question.js'

export interface IQuestionRepository {
  create: (question: Question) => Promise<Question>
  delete: (question: Question) => Promise<void>
  findBySlug: (slug: string) => Promise<Question | null>
  findById: (id: string) => Promise<Question | null>
}
