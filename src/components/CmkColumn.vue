<template>
  <slot />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  field: {
    type: String,
    default: '',
  },
  header: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: 'auto',
  },
})
</script>
