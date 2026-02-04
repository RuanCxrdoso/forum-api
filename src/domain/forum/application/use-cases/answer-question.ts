import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { Answer } from '../../enterprise/entities/answer.js'
import type { IAnswersRepository } from '../repositories/answers-repository.js'

interface AnswerQuestionUseCaseRequest {
  instructorId: UniqueEntityId
  questionId: UniqueEntityId
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: instructorId,
      questionId: questionId,
    })

    await this.answersRepository.create(answer)

    return { answer }
  }
}
