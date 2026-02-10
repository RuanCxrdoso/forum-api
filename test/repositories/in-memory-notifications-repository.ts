import type { INotificationsRepository } from '@/domain/notifications/application/repositories/notifications-repository.js'
import type { Notification } from '@/domain/notifications/enterprise/entities/notification.js'

export class InMemoryNotificationsRepository implements INotificationsRepository {
  public items: Notification[] = []

  async create(notification: Notification) {
    this.items.push(notification)

    return notification
  }
}
