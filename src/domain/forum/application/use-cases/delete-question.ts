import type { IQuestionRepository } from '../repositories/question-repository.js'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<void> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Resources not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Unauthorized.')
    }

    await this.questionRepository.delete(question)

    return
  }
}
