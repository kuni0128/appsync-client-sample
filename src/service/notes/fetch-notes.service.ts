import { Service } from '@/service/interface'
import { notesRepository } from '@/infra/repository/notes/notes.repository'

class FetchNotesService implements Service {
  async execute () {
    return await notesRepository.list()
  }
}

export const fetchNotesService = new FetchNotesService()
