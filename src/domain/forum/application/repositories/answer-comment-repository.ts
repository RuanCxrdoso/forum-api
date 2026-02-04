import type { AnswerComment } from '../../enterprise/entities/answer-comment.js'

export interface IAnswerCommentRepository {
  create: (answerComment: AnswerComment) => Promise<AnswerComment>
  delete: (answerComment: AnswerComment) => Promise<void>
  findById: (answerCommentId: string) => Promise<AnswerComment | null>
}
