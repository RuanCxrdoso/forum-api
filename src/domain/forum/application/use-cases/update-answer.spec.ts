import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository.js'
import { UpdateAnswerUseCase } from './update-answer.js'
import { makeAnswer } from '../../../../../test/factories/make-answer.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'

let answerRepository: InMemoryAnswersRepository
let updateAnswerUseCase: UpdateAnswerUseCase

describe('Update answer use case tests', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswersRepository()
    updateAnswerUseCase = new UpdateAnswerUseCase(answerRepository)
  })

  it('should be able to update a answer', async () => {
    const answer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )

    await answerRepository.create(answer)

    await updateAnswerUseCase.execute({
      authorId: 'author-1',
      answerId: 'answer-1',
      content: 'Novo content.',
    })

    expect(answerRepository.answers[0]).toMatchObject({
      content: 'Novo content.',
    })
  })

  it('shouldnt be able to update a answer from another author', async () => {
    const answer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )

    await answerRepository.create(answer)

    await expect(() =>
      updateAnswerUseCase.execute({
        authorId: 'author-2',
        answerId: 'answer-1',
        content: 'Novo content.',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
