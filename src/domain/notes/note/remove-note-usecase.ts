import { API, graphqlOperation } from 'aws-amplify'
import { Usecase } from '@/domain/interface'
import { deleteNote } from '@/graphql/mutations'

class RemoveNoteUsecase implements Usecase {
  async execute (noteId: string) {
    await API.graphql(graphqlOperation(deleteNote, { noteId }))
  }
}

export const removeNoteUsecase = new RemoveNoteUsecase()
