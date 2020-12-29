import { reactive, readonly } from 'vue'

/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class Store<T extends Record<string, any>> {
  protected state: T

  constructor () {
    const data = this.data()
    this.setup(data)
    this.state = reactive(data) as T
  }

  protected abstract data (): T

  /* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars */
  protected setup (data: T): void {}

  public getState (): T {
    return readonly(this.state) as T
  }
}
