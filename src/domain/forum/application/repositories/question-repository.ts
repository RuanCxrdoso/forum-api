import type { Question } from '../../enterprise/entities/question.js'

export interface IQuestionRepository {
  create: (question: Question) => Promise<Question>
}
