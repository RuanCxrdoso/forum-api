import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionRepository } from '../../../../../test/repositories/in-memory-question-repository.js'
import { GetQuestionBySlugUseCase } from './find-question-by-slug.js'
import { makeQuestion } from '../../../../../test/factories/make-question.js'

let questionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('Find Question By Slug Use Case test', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(questionRepository)
  })

  it('should be able to find a question by slug', async () => {
    const fakeQuestion = makeQuestion()

    await questionRepository.create(fakeQuestion)

    const { question } = await sut.execute({ slug: fakeQuestion.slug.value })

    expect(question.id).toBeTruthy()
    expect(question).toEqual(
      expect.objectContaining({
        title: fakeQuestion.title,
        content: fakeQuestion.content,
      }),
    )
  })
})
