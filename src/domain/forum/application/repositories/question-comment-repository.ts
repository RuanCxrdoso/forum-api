import type { QuestionComment } from '../../enterprise/entities/question-comment.js'

export interface IQuestionCommentRepository {
  create: (questionComment: QuestionComment) => Promise<QuestionComment>
}
