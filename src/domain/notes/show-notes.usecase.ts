import { singleton, inject } from 'tsyringe'
import { OnCreateNoteSubscription, OnUpdateNoteSubscription, OnDeleteNoteSubscription } from '@/api'
import { Usecase } from '../interface'
import { notesStore } from '@/store/notes/notes-store'
import { FetchNotesService } from '@/service/notes/fetch-notes.service'
import { subscribeNoteCreationService } from '@/service/notes/note/subscribe-notes-creation.service'
import { subscribeNoteUpdateService } from '@/service/notes/note/subscribe-notes-update.service'
import { subscribeNoteDeletionService } from '@/service/notes/note/subscribe-notes-deletion.service'
import { createNoteEntity } from './note/note-entity'

type NoteCreationSubscriptionEvent = { value: { data: OnCreateNoteSubscription } }
type NoteUpdateSubscriptionEvent = { value: { data: OnUpdateNoteSubscription } }
type NoteDeletionSubscriptionEvent = { value: { data: OnDeleteNoteSubscription } }

@singleton()
export class ShowNotesUsecase implements Usecase {
  /* eslint-disable no-useless-constructor */
  constructor (@inject('FETCH_NOTES_SERVICE') private fetchNotesService: FetchNotesService) {}

  async execute () {
    const notes = await this.fetchNotesService.execute()
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
          notesStore.push(createNoteEntity(data.onCreateNote))
        }
      }
    })
  }

  async subscribeNoteUpdate () {
    const observable = await subscribeNoteUpdateService.execute()
    observable.subscribe({
      next: ({ value: { data } }: NoteUpdateSubscriptionEvent) => {
        if (data.onUpdateNote) {
          notesStore.update(createNoteEntity(data.onUpdateNote))
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
