import { API, graphqlOperation } from 'aws-amplify'
import { injectable } from 'tsyringe'
import { ListNotesQuery } from '@/api'
import { listNotes } from '@/graphql/queries'
import { NoteEntity, createNoteEntity } from '@/domain/notes/note/note-entity'
import { NotesRepository } from '@/domain/notes/notes-repository'

@injectable()
export class NotesRepositoryImpl implements NotesRepository {
  async list (): Promise<NoteEntity[] | undefined> {
    const result = await API.graphql(graphqlOperation(listNotes)) as { data: ListNotesQuery }
    if (result.data.listNotes == null || result.data.listNotes.length <= 0) return
    return result.data.listNotes.reduce((entities: NoteEntity[], note) => {
      if (note != null) {
        entities.push(createNoteEntity(note))
      }
      return entities
    }, [])
  }
}
