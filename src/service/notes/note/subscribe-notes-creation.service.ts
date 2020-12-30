import { noteRepository } from '@/infra/repository/notes/note/note.repository'
import { Service } from '../../interface'

class SubscribeNoteCreationService implements Service {
  async execute () {
    return await noteRepository.subscribeCreation()
  }
}

export const subscribeNoteCreationService = new SubscribeNoteCreationService()
