import { noteRepository } from '@/infra/repository/notes/note/note.repository'
import { Service } from '../../interface'

class SubscribeNoteUpdateService implements Service {
  async execute () {
    return await noteRepository.subscribeUpdate()
  }
}

export const subscribeNoteUpdateService = new SubscribeNoteUpdateService()
