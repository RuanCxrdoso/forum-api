import type { Answer } from '../../enterprise/entities/answer.js'

export interface AnswersRepository {
  create: (answer: Answer) => Promise<void>
  get: (answerId: string) => Promise<Answer | null>
}
