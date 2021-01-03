import { container } from 'tsyringe'
import { NotesRepositoryImpl } from '@/infra/repository/notes/notes-repository-impl'
import { NoteRepositoryImpl } from '@/infra/repository/notes/note/note-repository-impl'
import { FetchNotesService } from '@/service/notes/fetch-notes-service'
import { SubscribeNoteCreationService } from './service/notes/note/subscribe-notes-creation-service'
import { SubscribeNoteDeletionService } from './service/notes/note/subscribe-notes-deletion-service'
import { SubscribeNoteUpdateService } from './service/notes/note/subscribe-notes-update-service'

// Repository
container.register('NOTES_REPOSITORY', { useClass: NotesRepositoryImpl })
container.register('NOTE_REPOSITORY', { useClass: NoteRepositoryImpl })

// Service
container.register('FETCH_NOTES_SERVICE', { useClass: FetchNotesService })
container.register('SUBSCRIBE_NOTE_CREATION_SERVICE', { useClass: SubscribeNoteCreationService })
container.register('SUBSCRIBE_NOTE_DELETION_SERVICE', { useClass: SubscribeNoteDeletionService })
container.register('SUBSCRIBE_NOTE_UPDATE_SERVICE', { useClass: SubscribeNoteUpdateService })

export { container }
