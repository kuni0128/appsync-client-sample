<template>
  <div class="home">
    <h1>Note list</h1>
    <ul>
      <li v-for="note in notes" :key="note.id">
        {{ note.name }}
        <button @click="remove(note.id)">delete</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Note } from '@/domain/notes/note/note'

export default defineComponent({
  props: {
    notes: {
      type: Object as PropType<Note[]>,
      default: []
    }
  },
  emits: ['remove'],
  setup (props, context) {
    const remove = (noteId: string) => {
      context.emit('remove', noteId)
    }

    return { remove }
  }
})
</script>
