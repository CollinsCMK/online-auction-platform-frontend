<template>
  <div
    ref="target"
    class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 bg-white dark:bg-gray-900 w-[95%] md:w-[80%] lg:w-1/2 xl:w-[45%] rounded-lg shadow-2xl outline-hidden max-h-[90vh] sm:max-h-[80vh] overflow-hidden transition-all duration-300 ease-in-out scale-100 hover:scale-[1.02]"
    :class="myClass"
  >
    <div
      class="bg-linear-to-r from-flex-purple to-purple-600 p-4 sm:p-5 text-white flex items-center justify-between"
    >
      <h4 class="font-bold text-lg sm:text-xl tracking-wide">{{ title }}</h4>

      <div
        @click="$emit('cancel')"
        class="flex items-center justify-center w-7 h-7 rounded-full border border-white/50 cursor-pointer hover:bg-white/20 transition-colors duration-200"
      >
        <IoIosClose class="text-2xl sm:text-3xl" />
      </div>
    </div>

    <div class="backdrop-blur-xs bg-white/90 dark:bg-gray-900/90">
      <form @submit.prevent="$emit('submitForm')" class="p-4 sm:p-6 md:p-8">
        <div class="grow overflow-auto max-h-[40vh] sm:max-h-[50vh] pb-5 prose dark:prose-invert">
          <slot />
        </div>

        <div
          class="flex flex-col sm:flex-row justify-end items-center gap-4 sm:gap-6 mt-6 border-t pt-6 dark:border-gray-700"
        >
          <CmkButton
            @click="$emit('cancel')"
            type="button"
            class="w-full sm:w-auto border-2 border-gray-300 dark:border-gray-600 hover:border-flex-purple dark:hover:border-flex-purple transition-colors duration-200 text-black dark:text-white"
          >
            Cancel
          </CmkButton>

          <CmkButtonLoader
            v-if="isLoading"
            class="w-full sm:w-auto bg-flex-purple/[.5] text-white shadow-lg"
            name="Saving"
          />
          <CmkButton
            v-else
            type="submit"
            class="w-full sm:w-auto bg-linear-to-r from-flex-purple to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            Save
          </CmkButton>
        </div>
      </form>
    </div>
  </div>

  <div
    v-if="isAnyModalOpen"
    @click="closeAllModals"
    class="fixed top-0 bottom-0 right-0 left-0 bg-black/60 backdrop-blur-xs z-99 transition-opacity duration-300"
  ></div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { computed, inject, provide, ref, toRefs, useTemplateRef } from 'vue'
import CmkButton from './CmkButton.vue'
import CmkButtonLoader from './CmkButtonLoader.vue'
import { IoIosClose } from 'vue3-icons/io'
import CmkHr from './CmkHr.vue'

const props = defineProps({
  isLoading: Boolean,
  title: String,
  myClass: String,
})

const { isLoading, title } = toRefs(props)

const target = useTemplateRef('target')
const closeCreateModal = inject<(() => void) | undefined>('closeCreateModal')
const closeEditModal = inject<(() => void) | undefined>('closeEditModal')
const isAnyModalOpen = computed(() => !!(closeCreateModal || closeEditModal))
const isClosingPrevented = ref(false)

const closeAllModals = () => {
  if (!isClosingPrevented.value) {
    if (closeCreateModal) closeCreateModal()
    if (closeEditModal) closeEditModal()
  }
}

onClickOutside(target, closeAllModals)

provide('preventModalClosing', (prevent: boolean) => {
  isClosingPrevented.value = prevent
})
</script>
