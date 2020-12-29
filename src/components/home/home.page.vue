<template>
  <home-presentaion :notes="notes" @remove="removeNote" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import HomePresentaion from '@/components/home/home.presentation.vue'
import { API, graphqlOperation } from 'aws-amplify'
import Observable from 'zen-observable'
import { onCreateNote, onDeleteNote, onUpdateNote } from '@/graphql/subscriptions'
import { deleteNote } from '@/graphql/mutations'
import { NoteInput, OnCreateNoteSubscription, OnDeleteNoteSubscription, OnUpdateNoteSubscription } from '@/api'
import { getNotesUsecase } from '@/domain/usecase/notes/get-notes.usecase'
import { notesQuery } from '@/domain/query/notes/notes.query'

type Note = NoteInput
type NoteSubscriptionEvent = { value: { data: OnCreateNoteSubscription } }
type NoteUpdateSubscriptionEvent = { value: { data: OnUpdateNoteSubscription } }
type NoteDeleteSubscriptionEvent = { value: { data: OnDeleteNoteSubscription } }

export default defineComponent({
  components: {
    HomePresentaion
  },
  setup () {
    const notes = ref<Note[]>([])
    const getNotes = async () => {
      await getNotesUsecase.execute()
      notes.value = notesQuery.listNotes()
    }
    const subscribeNote = async () => {
      const result = await API.graphql(graphqlOperation(onCreateNote)) as Observable<object>
      result.subscribe({
        next: ({ value: { data } }: NoteSubscriptionEvent) => {
          notes.value.push(data.onCreateNote as Note)
        }
      })
    }
    const subscribeUpdateNote = async () => {
      const result = await API.graphql(graphqlOperation(onUpdateNote)) as Observable<object>
      result.subscribe({
        next: ({ value: { data } }: NoteUpdateSubscriptionEvent) => {
          const note = data.onUpdateNote as Note
          notes.value[notes.value.findIndex(n => n.id === note.id)] = note
        }
      })
    }
    const subscribeDeleteNote = async () => {
      const result = await API.graphql(graphqlOperation(onDeleteNote)) as Observable<object>
      result.subscribe({
        next: ({ value: { data } }: NoteDeleteSubscriptionEvent) => {
          const noteId = data.onDeleteNote as string
          notes.value = notes.value.filter(n => n.id !== noteId)
        }
      })
    }

    const removeNote = async (noteId: string) => {
      await API.graphql(graphqlOperation(deleteNote, { noteId }))
    }

    onMounted(() => {
      getNotes()
      subscribeNote()
      subscribeUpdateNote()
      subscribeDeleteNote()
    })

    return { notes, getNotes, subscribeNote, subscribeUpdateNote, removeNote, subscribeDeleteNote }
  }
})
</script>
