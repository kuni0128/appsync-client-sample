import { injectable, inject } from 'tsyringe'
import { Service } from '../../service'
import { NoteRepository } from '@/domain/notes/note/note-repository'

@injectable()
export class SubscribeNoteUpdateService implements Service {
  /* eslint-disable no-useless-constructor */
  constructor (@inject('NOTE_REPOSITORY') private noteRepository: NoteRepository) {}

  async execute () {
    return await this.noteRepository.subscribeUpdate()
  }
}
