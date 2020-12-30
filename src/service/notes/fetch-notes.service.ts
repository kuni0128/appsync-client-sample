import { API, graphqlOperation } from 'aws-amplify'
import { Service } from '@/service/interface'
import { listNotes } from '@/graphql/queries'
import { ListNotesQuery, NoteInput } from '@/api'

type Note = NoteInput

class FetchNotesService implements Service {
  async execute () {
    const result = await API.graphql(graphqlOperation(listNotes)) as { data: ListNotesQuery }
    if (result.data.listNotes && result.data.listNotes.length > 0) {
      return result.data.listNotes?.map((note) => note as Note)
    }
  }
}

export const fetchNotesService = new FetchNotesService()
