import type { Question } from '../../enterprise/entities/question.js'
import type { IQuestionRepository } from '../repositories/question-repository.js'

interface GetQuestionBySlugRequest {
  slug: string
}

interface GetQuestionBySlugResponse {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Resources not found.')
    }

    return { question }
  }
}
