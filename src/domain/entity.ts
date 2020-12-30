export class Entity<T> {
  entity: T

  constructor(entity: T) {
    this.entity = entity
    this.applyEntity()
  }

  applyEntity() {
    Object.assign(this, this.entity)
  }
}
