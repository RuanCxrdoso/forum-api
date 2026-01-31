import { beforeEach, describe, expect, it } from 'vitest'
import { Instructor } from '../entities/instructor.js'
import { Student } from '../entities/student.js'
import { Question } from '../entities/question.js'
import { AnswerQuestionUseCase } from './answer-question.js'
import { InMemoryAnswersRepository } from '../repositories/in-memory-repositories/in-memory-answers-repository.js'
import { Slug } from '../entities/value-objects/slug.js'

let answerRepository: InMemoryAnswersRepository

describe('Answer question tests', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswersRepository()
  })

  it('should be able to answer a question', async () => {
    const instructor = Instructor.create({ name: 'Ruan' })
    const student = Student.create({ name: 'Neymar' })

    const question = Question.create({
      title: 'Triceps',
      content: 'Como treinar o triceps ?',
      slug: Slug.createFromText('Triceps'),
      authorId: student.id,
    })

    const answerQuestionUseCase = new AnswerQuestionUseCase(answerRepository)

    const { answer: answerResponse } = await answerQuestionUseCase.execute({
      instructorId: instructor.id,
      questionId: question.id,
      content: 'Faça triceps pulley!',
    })

    expect(answerResponse.content).toEqual('Faça triceps pulley!')
  })
})
