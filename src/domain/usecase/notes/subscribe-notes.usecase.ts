import { API, graphqlOperation } from 'aws-amplify'
import Observable from 'zen-observable'
import { onCreateNote } from '@/graphql/subscriptions'
import { OnCreateNoteSubscription, NoteInput } from '@/api'
import { Usecase } from '../interface'
import { notesStore } from '@/store/notes/notes.store'

type Note = NoteInput
type NoteSubscriptionEvent = { value: { data: OnCreateNoteSubscription } }

class SubscribeNotesUsecase implements Usecase {
  async execute () {
    const result = await API.graphql(graphqlOperation(onCreateNote)) as Observable<object>
    result.subscribe({
      next: ({ value: { data } }: NoteSubscriptionEvent) => {
        notesStore.push(data.onCreateNote as Note)
      }
    })
  }
}

export const subscribeNotesUsecase = new SubscribeNotesUsecase()
