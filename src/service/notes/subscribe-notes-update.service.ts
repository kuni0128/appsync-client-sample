import { API, graphqlOperation } from 'aws-amplify'
import Observable from 'zen-observable'
import { onUpdateNote } from '@/graphql/subscriptions'
import { Service } from '../interface'

class SubscribeNotesUpdateService implements Service {
  async execute () {
    return await API.graphql(graphqlOperation(onUpdateNote)) as Observable<object>
  }
}

export const subscribeNotesUpdateService = new SubscribeNotesUpdateService()
