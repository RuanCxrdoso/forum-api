import type { InMemoryQuestionRepository } from '../../../../../test/repositories/in-memory-question-repository.js'

interface UpdateQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

export class UpdateQuestionUseCase {
  constructor(private questionRepository: InMemoryQuestionRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: UpdateQuestionUseCaseRequest) {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Unauthorized.')
    }

    question.title = title
    question.content = content

    return {}
  }
}
