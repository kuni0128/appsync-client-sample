<template>
  <home-presentaion :notes="notes" @remove="removeNote" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import HomePresentaion from '@/components/home/home.presentation.vue'
import { API, graphqlOperation } from 'aws-amplify'
import { deleteNote } from '@/graphql/mutations'
import { NoteInput } from '@/api'
import { showNotesUsecase } from '@/domain/notes/usecase/show-notes.usecase'
import { notesQuery } from '@/domain/notes/query/notes.query'

type Note = NoteInput

export default defineComponent({
  components: {
    HomePresentaion
  },
  setup () {
    const notes = ref<Note[]>([])
    const showNotes = async () => {
      await showNotesUsecase.execute()
      notes.value = notesQuery.listNotes()
    }
    const removeNote = async (noteId: string) => {
      await API.graphql(graphqlOperation(deleteNote, { noteId }))
    }

    onMounted(() => {
      showNotes()
    })

    return { notes, showNotes, removeNote }
  }
})
</script>
