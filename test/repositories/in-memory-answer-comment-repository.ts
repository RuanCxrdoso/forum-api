import type { IAnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment-repository.js'
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment.js'

export class InMemoryAnswerCommentRepository implements IAnswerCommentRepository {
  public answerComments: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.answerComments.push(answerComment)

    return answerComment
  }

  async delete(answerComment: AnswerComment) {
    const answerCommentIndex = this.answerComments.findIndex(
      (item) => item.id.toString() === answerComment.id.toString(),
    )

    this.answerComments.splice(answerCommentIndex, 1)

    return
  }

  async findById(answerCommentId: string) {
    const answerComment = this.answerComments.find(
      (item) => item.id.toString() === answerCommentId,
    )

    if (!answerComment) return null

    return answerComment
  }
}
