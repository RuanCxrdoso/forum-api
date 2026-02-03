import type { Answer } from '../../enterprise/entities/answer.js'

export interface IAnswersRepository {
  create: (answer: Answer) => Promise<void>
  save: (answer: Answer) => Promise<void>
  delete: (answer: Answer) => Promise<void>
  findById: (answerId: string) => Promise<Answer | null>
}
