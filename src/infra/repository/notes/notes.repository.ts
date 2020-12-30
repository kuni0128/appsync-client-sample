import { API, graphqlOperation } from 'aws-amplify'
import { ListNotesQuery } from '@/api'
import { listNotes } from '@/graphql/queries'
import { NoteEntity } from '@/domain/notes/note/note.entity'

class NotesRepository {
  async list (): Promise<NoteEntity[] | undefined> {
    const result = await API.graphql(graphqlOperation(listNotes)) as { data: ListNotesQuery }
    if (result.data.listNotes == null || result.data.listNotes.length <= 0) return
    return result.data.listNotes.reduce((entities: NoteEntity[], note) => {
      if (note != null) {
        entities.push(new NoteEntity({
          id: note.id,
          name: note.name,
          completed: note.completed
        }))
      }
      return entities
    }, [])
  }
}

export const notesRepository = new NotesRepository()
