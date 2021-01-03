import { noteRepositoryImpl } from '@/infra/repository/notes/note/note-repository-impl'
import { Service } from '../../service'

class SubscribeNoteCreationService implements Service {
  async execute () {
    return await noteRepositoryImpl.subscribeCreation()
  }
}

export const subscribeNoteCreationService = new SubscribeNoteCreationService()
