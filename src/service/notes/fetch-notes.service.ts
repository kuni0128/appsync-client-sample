import { Service } from '@/service/interface'
import { notesRepositoryImpl } from '@/infra/repository/notes/notes-repository-impl'

class FetchNotesService implements Service {
  async execute () {
    return await notesRepositoryImpl.list()
  }
}

export const fetchNotesService = new FetchNotesService()
