import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionRepository } from '../../../../../test/repositories/in-memory-question-repository.js'
import { makeQuestion } from '../../../../../test/factories/make-question.js'
import { UpdateQuestionUseCase } from './update-question.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { NotAllowedError } from './errors/not-allowed-error.js'

let questionRepository: InMemoryQuestionRepository
let sut: UpdateQuestionUseCase

describe('Update question Use Case test', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionRepository()
    sut = new UpdateQuestionUseCase(questionRepository)
  })

  it('should be able to update a question', async () => {
    const fakeQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    await questionRepository.create(fakeQuestion)

    await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
      title: 'titulo de teste',
      content: 'conteudo de teste',
    })

    expect(questionRepository.questions[0]).toEqual(
      expect.objectContaining({
        title: 'titulo de teste',
        content: 'conteudo de teste',
      }),
    )
  })

  it('shouldnt be able to update a question from another user', async () => {
    const fakeQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    await questionRepository.create(fakeQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      questionId: 'question-1',
      title: 'titulo de teste',
      content: 'conteudo de teste',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
