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
}

export const notesStore = new NotesStore()
