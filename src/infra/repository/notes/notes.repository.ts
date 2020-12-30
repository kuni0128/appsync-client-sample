import { API, graphqlOperation } from 'aws-amplify'
import { ListNotesQuery, NoteInput } from '@/api'
import { listNotes } from '@/graphql/queries'

type Note = NoteInput

class NotesRepository {
  async list () {
    const result = await API.graphql(graphqlOperation(listNotes)) as { data: ListNotesQuery }
    if (result.data.listNotes && result.data.listNotes.length > 0) {
      return result.data.listNotes?.map((note) => note as Note)
    }
  }
}

export const notesRepository = new NotesRepository()
