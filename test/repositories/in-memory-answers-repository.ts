import type {
  FindManyByQuestionIdProps,
  IAnswersRepository,
} from '@/domain/forum/application/repositories/answers-repository.js'
import type { Answer } from '../../src/domain/forum/enterprise/entities/answer.js'

export class InMemoryAnswersRepository implements IAnswersRepository {
  public answers: Answer[] = []

  async create(answer: Answer) {
    this.answers.push(answer)

    return
  }

  async save(answer: Answer) {
    const findIndex = this.answers.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
    )

    this.answers[findIndex] = answer

    return
  }

  async delete(answer: Answer) {
    const answerIndex = this.answers.findIndex((item) => item.id === answer.id)

    this.answers.splice(answerIndex, 1)

    return
  }

  async findById(answerId: string) {
    const answer = this.answers.find(
      (answer) => answer.id.toString() === answerId,
    )

    if (!answer) return null

    return answer
  }

  async findManyByQuestionId({ id, page }: FindManyByQuestionIdProps) {
    const answers = this.answers
      .filter((answer) => answer.questionId.toString() === id)
      .slice((page - 1) * 20, page * 20)

    return answers
  }
}
