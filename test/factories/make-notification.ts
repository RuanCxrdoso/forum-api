import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import {
  Notification,
  type NotificationProps,
} from '@/domain/notifications/enterprise/entities/notification.js'
import { faker } from '@faker-js/faker'

export function makeNotification(
  override: Partial<NotificationProps>,
  id?: UniqueEntityId,
) {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityId(),
      title: faker.lorem.text(),
      content: faker.lorem.paragraph(),
      ...override,
    },
    id,
  )

  return notification
}
