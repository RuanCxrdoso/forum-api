import type { IAnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment-repository.js'
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment.js'

export class InMemoryAnswerCommentRepository implements IAnswerCommentRepository {
  public answerComments: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.answerComments.push(answerComment)

    return answerComment
  }
}
