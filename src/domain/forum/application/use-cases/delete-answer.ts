import { right, type Either } from '@/core/either.js'
import type { IAnswersRepository } from '../repositories/answers-repository.js'
import type { NotAllowedError } from './errors/not-allowed-error.js'
import type { ResourceNotFoundError } from './errors/resource-not-found-error.js'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>

export class DeleteAnswerUseCase {
  constructor(private answerRepository: IAnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Resources not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Unauthorized.')
    }

    await this.answerRepository.delete(answer)

    return right({})
  }
}
