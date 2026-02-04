import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import type { IQuestionRepository } from '../repositories/question-repository.js'
import { QuestionComment } from '../../enterprise/entities/question-comment.js'
import type { IQuestionCommentRepository } from '../repositories/question-comment-repository.js'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionCommentRepository: IQuestionCommentRepository,
    private questionRepository: IQuestionRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.questionCommentRepository.create(questionComment)

    return { questionComment }
  }
}
