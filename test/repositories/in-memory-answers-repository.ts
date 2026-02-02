import type { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository.js'
import type { Answer } from '../../src/domain/forum/enterprise/entities/answer.js'

export class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = []

  async create(answer: Answer) {
    this.answers.push(answer)

    return
  }

  async get(answerId: string) {
    const answer = this.answers.find(
      (answer) => answer.id.toString() === answerId,
    )

    if (!answer) return null

    return answer
  }

  // async update(answerId: string, content: string) {
  // }
}
