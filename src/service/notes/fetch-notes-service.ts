import { injectable, inject } from 'tsyringe'
import { Service } from '@/service/service'
import { NotesRepository } from '@/domain/notes/notes-repository'

@injectable()
export class FetchNotesService implements Service {
  /* eslint-disable no-useless-constructor */
  constructor (@inject('NOTES_REPOSITORY') private notesRepository: NotesRepository) {}

  async execute () {
    return await this.notesRepository.list()
  }
}
