import Observable from 'zen-observable';

export interface NoteRepository {
  subscribeCreation (): Promise<Observable<object>>
  subscribeUpdate (): Promise<Observable<object>>
  subscribeDeletion (): Promise<Observable<object>>
}
