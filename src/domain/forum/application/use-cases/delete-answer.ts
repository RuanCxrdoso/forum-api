import type { IAnswersRepository } from '../repositories/answers-repository.js'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: IAnswersRepository) {}

  async execute({ authorId, answerId }: DeleteAnswerUseCaseRequest) {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Resources not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Unauthorized.')
    }

    await this.answerRepository.delete(answer)

    return {}
  }
}
