<template>
  <div class="home">
    <h1>Note list</h1>
    <ul>
      <li v-for="note in notes" :key="note.entity.id">
        {{ note.entity.name }}
        <button @click="remove(note.entity.id)">delete</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { NoteEntity } from '@/domain/notes/note/note.entity'

export default defineComponent({
  props: {
    notes: {
      type: Object as PropType<NoteEntity[]>,
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
