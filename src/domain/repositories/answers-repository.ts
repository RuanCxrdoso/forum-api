import type { Answer } from '../entities/answer.js'

export interface AnswersRepository {
  create: (answer: Answer) => Promise<void>
  get: (answerId: string) => Promise<Answer | null>
  // update: (answerId: string, content: string) => Promise<Answer| null>
}
