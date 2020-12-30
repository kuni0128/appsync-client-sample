import { API, graphqlOperation } from 'aws-amplify'
import { ListNotesQuery } from '@/api'
import { listNotes } from '@/graphql/queries'
import { Note } from '@/domain/notes/note/note'

class NotesRepository {
  async list (): Promise<Note[] | undefined> {
    const result = await API.graphql(graphqlOperation(listNotes)) as { data: ListNotesQuery }
    if (result.data.listNotes && result.data.listNotes.length > 0) {
      return result.data.listNotes?.map((note) => note as Note)
    }
  }
}

export const notesRepository = new NotesRepository()
