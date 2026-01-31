import type { Answer } from '../../forum/enterprise/entities/answer.js'
import type { AnswersRepository } from '../answers-repository.js'

export class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = []

  async create(answer: Answer) {
    this.answers.push(answer)

    return
  }

  async get(answerId: string) {
    const answer = this.answers.find((answer) => answer.id === answerId)

    if (!answer) return null

    return answer
  }

  // async update(answerId: string, content: string) {
  // }
}
