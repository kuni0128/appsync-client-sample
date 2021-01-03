import { singleton, inject } from 'tsyringe'
import { OnCreateNoteSubscription, OnUpdateNoteSubscription, OnDeleteNoteSubscription } from '@/api'
import { Usecase } from '../usecase'
import { notesStore } from '@/store/notes/notes-store'
import { FetchNotesService } from '@/service/notes/fetch-notes-service'
import { SubscribeNoteCreationService } from '@/service/notes/note/subscribe-notes-creation-service'
import { createNoteEntity } from './note/note-entity'
import { SubscribeNoteDeletionService } from '@/service/notes/note/subscribe-notes-deletion-service'
import { SubscribeNoteUpdateService } from '@/service/notes/note/subscribe-notes-update-service'

type NoteCreationSubscriptionEvent = { value: { data: OnCreateNoteSubscription } }
type NoteUpdateSubscriptionEvent = { value: { data: OnUpdateNoteSubscription } }
type NoteDeletionSubscriptionEvent = { value: { data: OnDeleteNoteSubscription } }

@singleton()
export class ShowNotesUsecase implements Usecase {
  /* eslint-disable no-useless-constructor */
  constructor (
    @inject('FETCH_NOTES_SERVICE') private fetchNotesService: FetchNotesService,
    @inject('SUBSCRIBE_NOTE_CREATION_SERVICE') private subscribeNoteCreationService: SubscribeNoteCreationService,
    @inject('SUBSCRIBE_NOTE_DELETION_SERVICE') private subscribeNoteDeletionService: SubscribeNoteDeletionService,
    @inject('SUBSCRIBE_NOTE_UPDATE_SERVICE') private subscribeNoteUpdateService: SubscribeNoteUpdateService
  ) {}

  async execute () {
    const notes = await this.fetchNotesService.execute()
    if (notes) notesStore.set(notes)

    await this.subscribeNoteCreation()
    await this.subscribeNoteUpdate()
    await this.subscribeNoteDeletion()
  }

  async subscribeNoteCreation () {
    const observable = await this.subscribeNoteCreationService.execute()
    observable.subscribe({
      next: ({ value: { data } }: NoteCreationSubscriptionEvent) => {
        if (data.onCreateNote) {
          notesStore.push(createNoteEntity(data.onCreateNote))
        }
      }
    })
  }

  async subscribeNoteUpdate () {
    const observable = await this.subscribeNoteUpdateService.execute()
    observable.subscribe({
      next: ({ value: { data } }: NoteUpdateSubscriptionEvent) => {
        if (data.onUpdateNote) {
          notesStore.update(createNoteEntity(data.onUpdateNote))
        }
      }
    })
  }

  async subscribeNoteDeletion () {
    const observable = await this.subscribeNoteDeletionService.execute()
    observable.subscribe({
      next: ({ value: { data } }: NoteDeletionSubscriptionEvent) => {
        const noteId = data.onDeleteNote as string
        notesStore.remove(noteId)
      }
    })
  }
}
