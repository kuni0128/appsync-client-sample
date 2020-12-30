import { notesStore } from '@/store/notes/notes.store'

class NotesQuery {
  listNotes = () => {
    return notesStore.getState().notes
  }
}

export const notesQuery = new NotesQuery()
