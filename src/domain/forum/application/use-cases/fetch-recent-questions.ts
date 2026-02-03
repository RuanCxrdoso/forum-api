import type { Question } from '../../enterprise/entities/question.js'
import type { IQuestionRepository } from '../repositories/question-repository.js'

interface FetchRecentQuestionsRequest {
  page: number
}

interface FetchRecentQuestionsResponse {
  questions: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsRequest): Promise<FetchRecentQuestionsResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })

    return { questions }
  }
}
