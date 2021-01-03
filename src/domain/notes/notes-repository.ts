import { NoteEntity } from './note/note-entity'

export interface NotesRepository {
  list (): Promise<NoteEntity[] | undefined>;
}
