<template>
  <CmkButton :disabled="true" type="submit" class="text-white relative cursor-not-allowed">
    {{ name }}
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <FaSpinner class="animate-spin text-2xl" />
    </div>
  </CmkButton>
</template>

<script setup lang="ts">
import { FaSpinner } from 'vue3-icons/fa6'
import CmkButton from './CmkButton.vue'

defineProps<{
  name: String
}>()
</script>
