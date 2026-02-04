import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionRepository } from '../../../../../test/repositories/in-memory-question-repository.js'
import { makeQuestion } from '../../../../../test/factories/make-question.js'
import { DeleteQuestionUseCase } from './delete-question.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'

let questionRepository: InMemoryQuestionRepository
let sut: DeleteQuestionUseCase

describe('Delete question Use Case test', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionRepository()
    sut = new DeleteQuestionUseCase(questionRepository)
  })

  it('should be able to delete a question', async () => {
    const fakeQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    await questionRepository.create(fakeQuestion)

    await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
    })

    expect(questionRepository.questions).toHaveLength(0)
  })

  it('shouldnt be able to delete a question from another user', async () => {
    const fakeQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    await questionRepository.create(fakeQuestion)

    await expect(() =>
      sut.execute({
        authorId: 'author-2',
        questionId: 'question-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
