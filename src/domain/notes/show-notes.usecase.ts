import { OnCreateNoteSubscription, OnUpdateNoteSubscription, OnDeleteNoteSubscription } from '@/api'
import { Usecase } from '../interface'
import { notesStore } from '@/store/notes/notes.store'
import { fetchNotesService } from '@/service/notes/fetch-notes.service'
import { subscribeNoteCreationService } from '@/service/notes/note/subscribe-notes-creation.service'
import { subscribeNoteUpdateService } from '@/service/notes/note/subscribe-notes-update.service'
import { subscribeNoteDeletionService } from '@/service/notes/note/subscribe-notes-deletion.service'
import { NoteEntity } from './note/note.entity'

type NoteCreationSubscriptionEvent = { value: { data: OnCreateNoteSubscription } }
type NoteUpdateSubscriptionEvent = { value: { data: OnUpdateNoteSubscription } }
type NoteDeletionSubscriptionEvent = { value: { data: OnDeleteNoteSubscription } }

class ShowNotesUsecase implements Usecase {
  async execute () {
    const notes = await fetchNotesService.execute()
    if (notes) notesStore.set(notes)

    await this.subscribeNoteCreation()
    await this.subscribeNoteUpdate()
    await this.subscribeNoteDeletion()
  }

  async subscribeNoteCreation () {
    const observable = await subscribeNoteCreationService.execute()
    observable.subscribe({
      next: ({ value: { data } }: NoteCreationSubscriptionEvent) => {
        if (data.onCreateNote) {
          notesStore.push(new NoteEntity({
            id: data.onCreateNote.id,
            name: data.onCreateNote.name,
            completed: data.onCreateNote.completed
          }))
        }
      }
    })
  }

  async subscribeNoteUpdate () {
    const observable = await subscribeNoteUpdateService.execute()
    observable.subscribe({
      next: ({ value: { data } }: NoteUpdateSubscriptionEvent) => {
        if (data.onUpdateNote) {
          notesStore.update(new NoteEntity({
            id: data.onUpdateNote.id,
            name: data.onUpdateNote.name,
            completed: data.onUpdateNote.completed
          }))
        }
      }
    })
  }

  async subscribeNoteDeletion () {
    const observable = await subscribeNoteDeletionService.execute()
    observable.subscribe({
      next: ({ value: { data } }: NoteDeletionSubscriptionEvent) => {
        const noteId = data.onDeleteNote as string
        notesStore.remove(noteId)
      }
    })
  }
}

export const showNotesUsecase = new ShowNotesUsecase()
