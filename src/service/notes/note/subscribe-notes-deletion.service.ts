import { noteRepositoryImpl } from '@/infra/repository/notes/note/note-repository-impl'
import { Service } from '../../interface'

class SubscribeNoteDeletionService implements Service {
  async execute () {
    return await noteRepositoryImpl.subscribeDeletion()
  }
}

export const subscribeNoteDeletionService = new SubscribeNoteDeletionService()
