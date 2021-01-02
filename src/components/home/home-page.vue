<template>
  <home-presentaion :notes="notes" @remove="removeNote" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import HomePresentaion from '@/components/home/home-presentation.vue'
import { showNotesUsecase } from '@/domain/notes/show-notes.usecase'
import { removeNoteUsecase } from '@/domain/notes/note/remove-note-usecase'
import { notesQuery } from '@/domain/notes/notes-query'
import { NoteEntity } from '@/domain/notes/note/note-entity'

export default defineComponent({
  components: {
    HomePresentaion
  },
  setup () {
    const notes = ref<NoteEntity[]>([])
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
