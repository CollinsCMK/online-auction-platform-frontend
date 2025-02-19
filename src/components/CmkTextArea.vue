<template>
  <div>
    <div class="relative">
      <textarea
        ref="inputRef"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        v-model="inputComputed"
        class="w-full outline-hidden bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-md p-2"
        :class="myClass"
        :readonly="readonly"
      ></textarea>

      <slot />
    </div>

    <span v-if="error" class="text-[#fa2702] text-[14px] font-semibold">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { toRefs, onMounted, computed, defineProps, defineEmits, useTemplateRef } from 'vue'

const emit = defineEmits(['update:input'])

const props = defineProps<{
  input: string | number
  placeholder?: string
  autoFocus?: boolean
  error?: string | boolean
  disabled?: boolean
  readonly?: boolean
  name?: string
  id?: string
  myClass?: string | string[]
}>()
const { input, placeholder, autoFocus, error, readonly, name } = toRefs(props)

const inputRef = useTemplateRef<HTMLInputElement | null>('inputRef')

onMounted(() => {
  if (autoFocus.value && inputRef.value) {
    inputRef.value.focus()
  }
})

const inputComputed = computed({
  get: () => input.value,
  set: (val) => emit('update:input', val),
})
</script>
