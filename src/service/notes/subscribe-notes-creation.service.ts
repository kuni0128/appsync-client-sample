import { API, graphqlOperation } from 'aws-amplify'
import Observable from 'zen-observable'
import { onCreateNote } from '@/graphql/subscriptions'
import { Service } from '../interface'

class SubscribeNotesCreationService implements Service {
  async execute () {
    return await API.graphql(graphqlOperation(onCreateNote)) as Observable<object>
  }
}

export const subscribeNotesCreationService = new SubscribeNotesCreationService()
