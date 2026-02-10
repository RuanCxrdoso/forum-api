import { DomainEvents } from '@/core/events/domain-events.js'
import type { EventHandler } from '@/core/events/event-handler.js'
import { AnswerCreatedEvent } from '@/domain/forum/enterprise/events/answer-created-event.js'

export class OnAnswerCreated implements EventHandler {
  constructor() {
    this.setupSubscriptions()
  }

  setupSubscriptions() {
    DomainEvents.register(
      this.sendCreatedNewAnswerEventNotification.bind(this),
      AnswerCreatedEvent.name,
    )
  }

  private async sendCreatedNewAnswerEventNotification({
    answer,
  }: AnswerCreatedEvent) {
    console.log('🚀 ~ sendCreatedNewAnswerEventNotification:', answer)
  }
}
