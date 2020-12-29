import { API, graphqlOperation } from 'aws-amplify'
import { ListNotesQuery, NoteInput } from '@/api'
import { listNotes } from '@/graphql/queries'
import { Usecase } from '../interface'
import { notesStore } from '@/store/notes/notes.store'

type Note = NoteInput

class FetchNotesUsecase implements Usecase {
  async execute () {
    // TODO: application service → infra層から取得する
    const result = await API.graphql(graphqlOperation(listNotes)) as { data: ListNotesQuery }
    if (result.data.listNotes && result.data.listNotes.length > 0) {
      const notes = result.data.listNotes?.map((note) => note as Note)
      notesStore.set(notes)
    }
  }
}

export const fetchNotesUsecase = new FetchNotesUsecase()
