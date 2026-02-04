import type { IAnswerCommentRepository } from '../repositories/answer-comment-repository.js'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: IAnswerCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest) {
    const answerComment =
      await this.answerCommentRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Answer comment not found.')
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Unauthorized.')
    }

    await this.answerCommentRepository.delete(answerComment)

    return {}
  }
}
