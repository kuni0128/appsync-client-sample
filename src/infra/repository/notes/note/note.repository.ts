import { onCreateNote, onDeleteNote, onUpdateNote } from '@/graphql/subscriptions'
import { API, graphqlOperation } from 'aws-amplify'
import Observable from 'zen-observable'

class NoteRepository {
  async subscribeCreation () {
    return await API.graphql(graphqlOperation(onCreateNote)) as Observable<object>
  }

  async subscribeUpdate () {
    return await API.graphql(graphqlOperation(onUpdateNote)) as Observable<object>
  }

  async subscribeDeletion () {
    return await API.graphql(graphqlOperation(onDeleteNote)) as Observable<object>
  }
}

export const noteRepository = new NoteRepository()
