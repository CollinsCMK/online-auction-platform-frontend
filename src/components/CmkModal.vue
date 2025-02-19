<template>
  <div
    ref="target"
    class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black dark:bg-gray-900 dark:text-white z-100 rounded-md"
    :class="myClass"
  >
    <slot />
  </div>

  <div
    v-if="isAnyModalOpen"
    @click="closeAllModals"
    class="fixed top-0 bottom-0 right-0 left-0 bg-black/[.5] z-99"
  ></div>
</template>

<script setup lang="ts">
import { inject, defineProps, computed, useTemplateRef } from 'vue'
import { onClickOutside } from '@vueuse/core'

defineProps<{ myClass?: string }>()

const target = useTemplateRef('target')

const closeDeleteModal = inject<(() => void) | undefined>('closeDeleteModal')
const closeImageModal = inject<(() => void) | undefined>('closeImageModal')
const closeDescription = inject<(() => void) | undefined>('closeDescription')
const closeSoftDeleteModal = inject<(() => void) | undefined>('closeSoftDeleteModal')
const closeRestoreModal = inject<(() => void) | undefined>('closeRestoreModal')

const isAnyModalOpen = computed(
  () =>
    !!(
      closeDeleteModal ||
      closeImageModal ||
      closeDescription ||
      closeSoftDeleteModal ||
      closeRestoreModal
    ),
)

const closeAllModals = () => {
  if (closeDeleteModal) closeDeleteModal()
  if (closeImageModal) closeImageModal()
  if (closeDescription) closeDescription()
  if (closeSoftDeleteModal) closeSoftDeleteModal()
  if (closeRestoreModal) closeRestoreModal()
}

onClickOutside(target, closeAllModals)
</script>
