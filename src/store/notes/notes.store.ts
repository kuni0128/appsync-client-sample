import { Store } from '@/store/store'
import { NoteEntity } from '@/domain/notes/note/note.entity'

interface Notes extends Object {
  notes: NoteEntity[];
}

class NotesStore extends Store<Notes> {
  protected data (): Notes {
    return {
      notes: []
    }
  }

  set (notes: NoteEntity[]) {
    this.state.notes = notes
  }

  push (note: NoteEntity) {
    this.state.notes.push(note)
  }

  update (note: NoteEntity) {
    const index = this.state.notes.findIndex(n => n.props.id === note.props.id)
    this.state.notes.splice(index, 1, note)
  }

  remove (noteId: string) {
    const index = this.state.notes.findIndex(n => n.props.id === noteId)
    this.state.notes.splice(index, 1)
  }
}

export const notesStore = new NotesStore()
