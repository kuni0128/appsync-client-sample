import { OnCreateNoteSubscription, OnUpdateNoteSubscription, OnDeleteNoteSubscription, NoteInput } from '@/api'
import { Usecase } from '../../interface'
import { notesStore } from '@/store/notes/notes.store'
import { fetchNotesService } from '@/service/notes/fetch-notes.service'
import { subscribeNoteCreationService } from '@/service/notes/note/subscribe-notes-creation.service'
import { subscribeNoteUpdateService } from '@/service/notes/note/subscribe-notes-update.service'
import { subscribeNoteDeletionService } from '@/service/notes/note/subscribe-notes-deletion.service'

type Note = NoteInput
type NoteCreationSubscriptionEvent = { value: { data: OnCreateNoteSubscription } }
type NoteUpdateSubscriptionEvent = { value: { data: OnUpdateNoteSubscription } }
type NoteDeletionSubscriptionEvent = { value: { data: OnDeleteNoteSubscription } }

class ShowNotesUsecase implements Usecase {
  async execute () {
    const notes = await fetchNotesService.execute()
    if (notes) notesStore.set(notes)

    await this.subscribeCreation()
    await this.subscribeUpdate()
    await this.subscribeDeletion()
  }

  async subscribeCreation () {
    const result = await subscribeNoteCreationService.execute()
    result.subscribe({
      next: ({ value: { data } }: NoteCreationSubscriptionEvent) => {
        notesStore.push(data.onCreateNote as Note)
      }
    })
  }

  async subscribeUpdate () {
    const result = await subscribeNoteUpdateService.execute()
    result.subscribe({
      next: ({ value: { data } }: NoteUpdateSubscriptionEvent) => {
        const note = data.onUpdateNote as Note
        notesStore.update(note)
      }
    })
  }

  async subscribeDeletion () {
    const result = await subscribeNoteDeletionService.execute()
    result.subscribe({
      next: ({ value: { data } }: NoteDeletionSubscriptionEvent) => {
        const noteId = data.onDeleteNote as string
        notesStore.remove(noteId)
      }
    })
  }
}

export const showNotesUsecase = new ShowNotesUsecase()
