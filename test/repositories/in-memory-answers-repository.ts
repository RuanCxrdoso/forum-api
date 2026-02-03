import type { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository.js'
import type { Answer } from '../../src/domain/forum/enterprise/entities/answer.js'

export class InMemoryAnswersRepository implements IAnswersRepository {
  public answers: Answer[] = []

  async create(answer: Answer) {
    this.answers.push(answer)

    return
  }

  async findById(answerId: string) {
    const answer = this.answers.find(
      (answer) => answer.id.toString() === answerId,
    )

    if (!answer) return null

    return answer
  }

  async delete(answer: Answer) {
    const answerIndex = this.answers.findIndex((item) => item.id === answer.id)

    this.answers.splice(answerIndex, 1)
  }
}
