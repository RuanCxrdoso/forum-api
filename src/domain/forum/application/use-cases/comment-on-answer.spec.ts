import { beforeEach, describe, expect, it } from 'vitest'
import { makeAnswer } from '../../../../../test/factories/make-answer.js'
import { CommentOnAnswerUseCase } from './comment-on-answer.js'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository.js'
import { InMemoryAnswerCommentRepository } from '../../../../../test/repositories/in-memory-answer-comment-repository.js'

let answerRepository: InMemoryAnswersRepository
let answerCommentsRepository: InMemoryAnswerCommentRepository
let sut: CommentOnAnswerUseCase

describe('Comment on answer tests', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswersRepository()
    answerCommentsRepository = new InMemoryAnswerCommentRepository()
    sut = new CommentOnAnswerUseCase(answerCommentsRepository, answerRepository)
  })

  it('should be able to comment on a answer', async () => {
    const newAnswer = makeAnswer()
    await answerRepository.create(newAnswer)

    const { answerComment } = await sut.execute({
      authorId: newAnswer.authorId.toString(),
      answerId: newAnswer.id.toString(),
      content: newAnswer.content,
    })

    expect(answerCommentsRepository.answerComments[0]?.content).toEqual(
      answerComment.content,
    )
  })
})
