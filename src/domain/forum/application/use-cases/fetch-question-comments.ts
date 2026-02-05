import type { QuestionComment } from '../../enterprise/entities/question-comment.js'
import type { IQuestionCommentRepository } from '../repositories/question-comment-repository.js'

interface FetchQuestionCommentsUseCaseRequest {
  page: number
  questionId: string
}

interface FetchQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentRepository: IQuestionCommentRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentRepository.findManyByQuestionId(questionId, {
        page,
      })

    return {
      questionComments,
    }
  }
}
