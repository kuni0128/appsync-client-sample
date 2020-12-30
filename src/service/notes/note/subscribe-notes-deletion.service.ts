import { noteRepository } from '@/infra/repository/notes/note/note.repository'
import { Service } from '../../interface'

class SubscribeNoteDeletionService implements Service {
  async execute () {
    return await noteRepository.subscribeDeletion()
  }
}

export const subscribeNoteDeletionService = new SubscribeNoteDeletionService()
