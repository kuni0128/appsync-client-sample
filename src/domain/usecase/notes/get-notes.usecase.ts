import { API, graphqlOperation } from 'aws-amplify';
import { ListNotesQuery, NoteInput } from '@/api';
import { listNotes } from '@/graphql/queries';
import { Usecase } from '../interface';

type Note = NoteInput

export class GetNotesUsecase implements Usecase {
  async execute(params: any) {
    // TODO: application service → infra層から取得する
    const result = await API.graphql(graphqlOperation(listNotes)) as { data: ListNotesQuery }
    if (result.data.listNotes && result.data.listNotes.length > 0) {
      const notes = result.data.listNotes?.map((note) => note as Note)
      // TODO: storeに突っ込む
    }
  }
}