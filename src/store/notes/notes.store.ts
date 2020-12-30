import { Store } from '@/store/store'
import { NoteInput } from '@/api'

type Note = NoteInput

interface Notes extends Object {
  notes: Note[];
}

class NotesStore extends Store<Notes> {
  protected data (): Notes {
    return {
      notes: []
    }
  }

  set (notes: Note[]) {
    this.state.notes = notes
  }

  push (note: Note) {
    this.state.notes.push(note)
  }

  update (note: Note) {
    const index = this.state.notes.findIndex(n => n.id === note.id)
    this.state.notes.splice(index, 1, note)
  }

  remove (noteId: string) {
    const index = this.state.notes.findIndex(n => n.id === noteId)
    this.state.notes.splice(index, 1)
  }
}

export const notesStore = new NotesStore()
