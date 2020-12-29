<template>
  <div class="home">
    <h1>Note list</h1>
    <ul>
      <li v-for="note in notes" :key="note.id">
        {{ note.name }}
        <button v-on:click="deleteNote(note.id)">delete</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { API, graphqlOperation } from 'aws-amplify'
import Observable from 'zen-observable'
import { listNotes } from '../graphql/queries'
import { onCreateNote, onDeleteNote, onUpdateNote } from '../graphql/subscriptions'
import { deleteNote as deleteNoteMutation } from '../graphql/mutations'
import { ListNotesQuery, NoteInput, OnCreateNoteSubscription, OnDeleteNoteSubscription, OnUpdateNoteSubscription } from '../api'

type Note = NoteInput
type NoteSubscriptionEvent = { value: { data: OnCreateNoteSubscription } }
type NoteUpdateSubscriptionEvent = { value: { data: OnUpdateNoteSubscription } }
type NoteDeleteSubscriptionEvent = { value: { data: OnDeleteNoteSubscription } }

export default defineComponent({
  setup () {
    const notes = ref<Note[]>([])
    const getNotes = async () => {
      const result = await API.graphql(graphqlOperation(listNotes)) as { data: ListNotesQuery }
      // TODO: Refactoring
      if (result.data.listNotes && result.data.listNotes.length > 0) {
        notes.value = result.data.listNotes?.map((note) => note as Note)
      }
    }
    const subscribeNote = async () => {
      const result = await API.graphql(graphqlOperation(onCreateNote)) as Observable<object>
      // TODO: Refactoring
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

    const deleteNote = async (noteId: string) => {
      await API.graphql(graphqlOperation(deleteNoteMutation, { noteId }))
    }

    onMounted(() => {
      getNotes()
      subscribeNote()
      subscribeUpdateNote()
      subscribeDeleteNote()
    })

    return { notes, getNotes, subscribeNote, subscribeUpdateNote, deleteNote, subscribeDeleteNote }
  }
})
</script>
