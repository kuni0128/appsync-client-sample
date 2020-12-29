import { API, graphqlOperation } from 'aws-amplify'
import Observable from 'zen-observable'
import { onCreateNote, onUpdateNote, onDeleteNote } from '@/graphql/subscriptions'
import { OnCreateNoteSubscription, OnUpdateNoteSubscription, OnDeleteNoteSubscription, NoteInput } from '@/api'
import { Usecase } from '../interface'
import { notesStore } from '@/store/notes/notes.store'

type Note = NoteInput
type NoteSubscriptionEvent = { value: { data: OnCreateNoteSubscription } }
type NoteUpdateSubscriptionEvent = { value: { data: OnUpdateNoteSubscription } }
type NoteDeleteSubscriptionEvent = { value: { data: OnDeleteNoteSubscription } }

class SubscribeNotesUsecase implements Usecase {
  async execute () {
    this.subscribeCreate()
    this.subscribeUpdate()
    this.subscribeDelete()
  }

  async subscribeCreate () {
    const result = await API.graphql(graphqlOperation(onCreateNote)) as Observable<object>
    result.subscribe({
      next: ({ value: { data } }: NoteSubscriptionEvent) => {
        notesStore.create(data.onCreateNote as Note)
      }
    })
  }

  async subscribeUpdate () {
    const result = await API.graphql(graphqlOperation(onUpdateNote)) as Observable<object>
    result.subscribe({
      next: ({ value: { data } }: NoteUpdateSubscriptionEvent) => {
        const note = data.onUpdateNote as Note
        notesStore.update(note)
      }
    })
  }

  async subscribeDelete () {
    const result = await API.graphql(graphqlOperation(onDeleteNote)) as Observable<object>
    result.subscribe({
      next: ({ value: { data } }: NoteDeleteSubscriptionEvent) => {
        const noteId = data.onDeleteNote as string
        notesStore.delete(noteId)
      }
    })
  }
}

export const subscribeNotesUsecase = new SubscribeNotesUsecase()
