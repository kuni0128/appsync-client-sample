import { container } from 'tsyringe'
import { NotesRepositoryImpl } from '@/infra/repository/notes/notes-repository-impl'
import { FetchNotesService } from '@/service/notes/fetch-notes-service'

// Repository
container.register('NOTES_REPOSITORY', { useClass: NotesRepositoryImpl })

// Service
container.register('FETCH_NOTES_SERVICE', { useClass: FetchNotesService })

export { container }
