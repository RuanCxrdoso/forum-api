import { UniqueEntityId } from './unique-entity-id.js'

export class Entities<Props> {
  private _id: UniqueEntityId
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntityId) {
    this._id = id ?? new UniqueEntityId(id)
    this.props = props
  }
}
