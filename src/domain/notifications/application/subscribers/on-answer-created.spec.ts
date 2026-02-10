import { beforeEach, describe, it } from 'vitest'
import { OnAnswerCreated } from './on-answer-created.js'
import { makeAnswer } from '../../../../../test/factories/make-answer.js'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository.js'
import { InMemoryAnswerAttachmentsRepository } from '../../../../../test/repositories/in-memory-answer-attachments-repository.js'

let answerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let answersRespository: InMemoryAnswersRepository

describe('On answer created', () => {
  beforeEach(() => {
    answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    answersRespository = new InMemoryAnswersRepository(
      answerAttachmentsRepository,
    )
  })

  it('should send a notification when an answer is created', () => {
    new OnAnswerCreated()

    const answer = makeAnswer()

    answersRespository.create(answer)
  })
})
