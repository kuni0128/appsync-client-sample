import { API, graphqlOperation } from 'aws-amplify'
import Observable from 'zen-observable'
import { onDeleteNote } from '@/graphql/subscriptions'
import { Service } from '../interface'

class SubscribeNotesDeletionService implements Service {
  async execute () {
    return await API.graphql(graphqlOperation(onDeleteNote)) as Observable<object>
  }
}

export const subscribeNotesDeletionService = new SubscribeNotesDeletionService()
