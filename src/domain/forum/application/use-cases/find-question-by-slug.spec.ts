import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionRepository } from '../../../../../test/repositories/in-memory-question-repository.js'
import { GetQuestionBySlugUseCase } from './find-question-by-slug.js'
import { Question } from '../../enterprise/entities/question.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'

let questionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('Find Question By Slug Use Case test', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(questionRepository)
  })

  it('should be able to find a question by slug', async () => {
    const fakeQuestion = Question.create({
      authorId: new UniqueEntityId(),
      title: 'Como resolver integrais',
      content: 'Precio saber como resolver integrais.',
    })

    await questionRepository.create(fakeQuestion)

    const { question } = await sut.execute({ slug: 'como-resolver-integrais' })

    expect(question.id).toBeTruthy()
    expect(question).toEqual(
      expect.objectContaining({
        title: 'Como resolver integrais',
        content: 'Precio saber como resolver integrais.',
      }),
    )
  })
})
