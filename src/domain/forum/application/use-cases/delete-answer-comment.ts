import { left, right, type Either } from '@/core/either.js'
import type { IAnswerCommentRepository } from '../repositories/answer-comment-repository.js'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<Error, object>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: IAnswerCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentRepository.findById(answerCommentId)

    if (!answerComment) {
      return left(new Error('Answer comment not found.'))
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new Error('Unauthorized'))
    }

    await this.answerCommentRepository.delete(answerComment)

    return right({})
  }
}
