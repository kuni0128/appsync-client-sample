<template>
  <home-presentaion :notes="notes" @remove="removeNote" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import HomePresentaion from '@/components/home/home.presentation.vue'
import { NoteInput } from '@/api'
import { showNotesUsecase } from '@/domain/notes/usecase/show-notes.usecase'
import { removeNoteUsecase } from '@/domain/notes/note/usecase/remove-note.usecase'
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
      await removeNoteUsecase.execute(noteId)
    }

    onMounted(() => {
      showNotes()
    })

    return { notes, showNotes, removeNote }
  }
})
</script>
