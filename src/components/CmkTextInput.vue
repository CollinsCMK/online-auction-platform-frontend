<template>
  <div>
    <div class="relative">
      <input
        ref="inputRef"
        :placeholder="placeholder"
        class="block w-full focus:outline-hidden bg-white dark:bg-gray-900 p-2 border dark:border-gray-700 rounded-md text-black dark:text-white"
        :type="inputType"
        v-model="inputComputed"
        autocomplete="on"
        :min="min"
        :max="max"
        :disabled="disabled"
        :readonly="readonly"
        :step="step"
        :name="name"
        :id="id"
        :class="myClass"
      />

      <slot />
    </div>

    <span v-if="error" class="text-[#fa2702] text-[14px] font-semibold mt-2 block">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { toRefs, onMounted, computed, defineProps, defineEmits, useTemplateRef } from 'vue'

const emit = defineEmits(['update:input'])

const props = defineProps<{
  input: string | number
  placeholder?: string
  inputType?: string
  min?: number
  max?: number
  autoFocus?: boolean
  error?: string | boolean
  disabled?: boolean
  readonly?: boolean
  step?: number
  name?: string
  id?: string
  myClass?: string | string[]
}>()
const { input, placeholder, inputType, min, max, autoFocus, error, readonly, step, name } =
  toRefs(props)

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
