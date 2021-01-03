import { NoteRepository } from '@/domain/notes/note/note-repository'
import { API, graphqlOperation } from 'aws-amplify'
import { injectable } from 'tsyringe'
import Observable from 'zen-observable'
import { onCreateNote, onDeleteNote, onUpdateNote } from '@/graphql/subscriptions'

@injectable()
export class NoteRepositoryImpl implements NoteRepository {
  async subscribeCreation (): Promise<Observable<object>> {
    return await API.graphql(graphqlOperation(onCreateNote)) as Observable<object>
  }

  async subscribeUpdate (): Promise<Observable<object>> {
    return await API.graphql(graphqlOperation(onUpdateNote)) as Observable<object>
  }

  async subscribeDeletion (): Promise<Observable<object>> {
    return await API.graphql(graphqlOperation(onDeleteNote)) as Observable<object>
  }
}
