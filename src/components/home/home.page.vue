<template>
  <home-presentaion :notes="notes" @remove="removeNote" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import HomePresentaion from '@/components/home/home.presentation.vue'
import { API, graphqlOperation } from 'aws-amplify'
import { deleteNote } from '@/graphql/mutations'
import { NoteInput } from '@/api'
import { fetchNotesUsecase } from '@/domain/usecase/notes/fetch-notes.usecase'
import { subscribeNotesUsecase } from '@/domain/usecase/notes/subscribe-notes.usecase'
import { notesQuery } from '@/domain/query/notes/notes.query'

type Note = NoteInput

export default defineComponent({
  components: {
    HomePresentaion
  },
  setup () {
    const notes = ref<Note[]>([])
    const fetchNotes = async () => {
      await fetchNotesUsecase.execute()
      notes.value = notesQuery.listNotes()
    }
    const subscribeNotes = async () => {
      await subscribeNotesUsecase.execute()
    }
    const removeNote = async (noteId: string) => {
      await API.graphql(graphqlOperation(deleteNote, { noteId }))
    }

    onMounted(() => {
      fetchNotes()
      subscribeNotes()
    })

    return { notes, fetchNotes, subscribeNotes, removeNote }
  }
})
</script>
