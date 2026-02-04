import type { InMemoryQuestionRepository } from '../../../../../test/repositories/in-memory-question-repository.js'
import type { Question } from '../../enterprise/entities/question.js'

interface UpdateQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

interface UpdateQuestionUseCaseResponse {
  question: Question
}

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
      throw new Error('Question not found.')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Unauthorized.')
    }

    question.title = title
    question.content = content

    return {
      question,
    }
  }
}
