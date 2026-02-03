import type { Answer } from '../../enterprise/entities/answer.js'
import type { IAnswersRepository } from '../repositories/answers-repository.js'

interface UpdateAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface UpdateAnswerUseCaseResponse {
  answer: Answer
}

export class UpdateAnswerUseCase {
  constructor(private answerRepository: IAnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: UpdateAnswerUseCaseRequest): Promise<UpdateAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error('Unauthorized.')
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return {
      answer,
    }
  }
}
