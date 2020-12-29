<template>
  <div class="home">
    <home-presentaion />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomePresentaion from '@/components/home/home.presentation.vue'

export default defineComponent({
  components: {
    HomePresentaion
  }
})
</script>
