import type { IQuestionRepository } from '@/domain/forum/application/repositories/question-repository.js'
import { Question } from '@/domain/forum/enterprise/entities/question.js'

export class InMemoryQuestionRepository implements IQuestionRepository {
  public questions: Question[] = []

  async create(question: Question) {
    this.questions.push(question)

    return question
  }
}
