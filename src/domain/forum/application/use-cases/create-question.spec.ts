import { InMemoryQuestionRepository } from '../../../../../test/repositories/in-memory-question-repository.js'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateQuestionUseCase } from './create-question.js'

let questionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('Create question test', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(questionRepository)
  })

  it('should be able do crate a question', async () => {
    const fakeQuestion = {
      authorId: 'author-1',
      title: 'Como resolver integrais',
      content: 'Precio saber como resolver integrais.',
    }

    const { question } = await sut.execute(fakeQuestion)

    expect(question.id).toBeTruthy()
    expect(question).toEqual(
      expect.objectContaining({
        title: 'Como resolver integrais',
        content: 'Precio saber como resolver integrais.',
      }),
    )
  })
})
