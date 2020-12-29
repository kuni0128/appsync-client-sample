import { API, graphqlOperation } from 'aws-amplify'
import Observable from 'zen-observable'
import { onCreateNote, onUpdateNote, onDeleteNote } from '@/graphql/subscriptions'
import { OnCreateNoteSubscription, OnUpdateNoteSubscription, OnDeleteNoteSubscription, NoteInput, ListNotesQuery } from '@/api'
import { Usecase } from '../../interface'
import { notesStore } from '@/store/notes/notes.store'
import { listNotes } from '@/graphql/queries'

type Note = NoteInput
type NoteSubscriptionEvent = { value: { data: OnCreateNoteSubscription } }
type NoteUpdateSubscriptionEvent = { value: { data: OnUpdateNoteSubscription } }
type NoteDeleteSubscriptionEvent = { value: { data: OnDeleteNoteSubscription } }

class ShowNotesUsecase implements Usecase {
  async execute () {
    await this.fetch()
    await this.subscribeCreate()
    await this.subscribeUpdate()
    await this.subscribeDelete()
  }

  async fetch () {
    // TODO: Application service? or/and Domain service?
    const result = await API.graphql(graphqlOperation(listNotes)) as { data: ListNotesQuery }
    if (result.data.listNotes && result.data.listNotes.length > 0) {
      const notes = result.data.listNotes?.map((note) => note as Note)
      notesStore.set(notes)
    }
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

export const showNotesUsecase = new ShowNotesUsecase()
