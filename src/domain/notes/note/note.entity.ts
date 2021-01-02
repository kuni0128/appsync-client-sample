import { Entity } from '@/domain/entity'
import { Note } from './note'

export class NoteEntity extends Entity<Note> {}

export function createNoteEntity (entity: Note): NoteEntity {
  return new NoteEntity(entity)
}
