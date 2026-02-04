import type { Answer } from '../../enterprise/entities/answer.js'
import type { IAnswersRepository } from '../repositories/answers-repository.js'

interface FetchQuestionAnswersUseCaseRequest {
  page: number
  questionId: string
}

interface FetchQuestionAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionAnswersUseCase {
  constructor(private answerRepository: IAnswersRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answerRepository.findManyByQuestionId({
      page,
      id: questionId,
    })

    return {
      answers,
    }
  }
}
