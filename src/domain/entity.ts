export class Entity<T> {
  entity: T

  constructor (entity: T) {
    this.entity = entity
    this.applyEntity(entity)
  }

  private applyEntity (entity: T) {
    Object.assign(this, entity)
  }
}
