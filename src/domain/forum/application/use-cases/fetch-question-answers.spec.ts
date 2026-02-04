import { beforeEach, describe, expect, it } from 'vitest'
import { makeAnswer } from '../../../../../test/factories/make-answer.js'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository.js'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers.js'
import { makeQuestion } from '../../../../../test/factories/make-question.js'

let answerRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch question answers use-case test', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(answerRepository)
  })

  it('should be able to fetch question answers', async () => {
    const fakeQuestion = makeQuestion()

    const fakeAnswer1 = makeAnswer({
      questionId: fakeQuestion.id,
    })

    const fakeAnswer2 = makeAnswer({
      questionId: fakeQuestion.id,
    })

    const fakeAnswer3 = makeAnswer({
      questionId: fakeQuestion.id,
    })

    await answerRepository.create(fakeAnswer1)
    await answerRepository.create(fakeAnswer2)
    await answerRepository.create(fakeAnswer3)

    const { answers } = await sut.execute({
      questionId: fakeQuestion.id.toString(),
      page: 1,
    })

    expect(answers).toHaveLength(3)
    expect(answers).toEqual([
      expect.objectContaining({ questionId: fakeQuestion.id }),
      expect.objectContaining({ questionId: fakeQuestion.id }),
      expect.objectContaining({ questionId: fakeQuestion.id }),
    ])
  })

  it('should be able to paginate fetch recents answers', async () => {
    const fakeQuestion = makeQuestion()

    for (let i = 1; i <= 22; i++) {
      const fakeAnswer = makeAnswer({ questionId: fakeQuestion.id })

      await answerRepository.create(fakeAnswer)
    }

    const { answers: firstAnswersPage } = await sut.execute({
      questionId: fakeQuestion.id.toString(),
      page: 1,
    })
    const { answers: secondAnswersPage } = await sut.execute({
      questionId: fakeQuestion.id.toString(),
      page: 2,
    })

    expect(firstAnswersPage).toHaveLength(20)
    expect(secondAnswersPage).toHaveLength(2)
  })
})
