import { noteRepositoryImpl } from '@/infra/repository/notes/note/note-repository-impl'
import { Service } from '../../interface'

class SubscribeNoteUpdateService implements Service {
  async execute () {
    return await noteRepositoryImpl.subscribeUpdate()
  }
}

export const subscribeNoteUpdateService = new SubscribeNoteUpdateService()
