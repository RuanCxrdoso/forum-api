import { left, right, type Either } from '@/core/either.js'
import type { InMemoryQuestionRepository } from '../../../../../test/repositories/in-memory-question-repository.js'
import type { Question } from '../../enterprise/entities/question.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import { NotAllowedError } from './errors/not-allowed-error.js'

interface UpdateQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

type UpdateQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class UpdateQuestionUseCase {
  constructor(private questionRepository: InMemoryQuestionRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: UpdateQuestionUseCaseRequest): Promise<UpdateQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    question.title = title
    question.content = content

    return right({
      question,
    })
  }
}
