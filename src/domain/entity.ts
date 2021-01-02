export class Entity<T> {
  props: T

  constructor (entity: T) {
    this.props = entity
  }
}
