import { beforeEach, describe, expect, it } from 'vitest'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer.js'
import { InMemoryQuestionRepository } from '../../../../../test/repositories/in-memory-question-repository.js'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository.js'
import { makeQuestion } from '../../../../../test/factories/make-question.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { makeAnswer } from '../../../../../test/factories/make-answer.js'

let questionRepository: InMemoryQuestionRepository
let answerRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose question best answer tests', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionRepository()
    answerRepository = new InMemoryAnswersRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      answerRepository,
      questionRepository,
    )
  })

  it('should be able to set question best answer', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )
    await questionRepository.create(newQuestion)

    const answer = makeAnswer(
      { questionId: newQuestion.id },
      new UniqueEntityId('answer-1'),
    )

    await answerRepository.create(answer)

    const { question } = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-1',
    })

    expect(question.bestAnswerId).toBeTruthy()
    expect(question.bestAnswerId?.toString()).toEqual('answer-1')
  })

  it('shouldnt be able to set a question best answer from a question from another user', async () => {
    const newQuestion = makeQuestion()

    await questionRepository.create(newQuestion)

    const answer = makeAnswer({ questionId: newQuestion.id })

    await answerRepository.create(answer)

    await expect(
      sut.execute({
        answerId: answer.id.toString(),
        authorId: 'author-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
