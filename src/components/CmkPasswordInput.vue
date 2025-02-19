<template>
  <div>
    <div class="relative flex items-center">
      <input
        ref="inputRef"
        :placeholder="placeholder"
        class="block w-full border dark:border-gray-600 rounded-md py-2 px-3 focus:outline-hidden text-black dark:text-white bg-white dark:bg-gray-900"
        type="password"
        v-model="inputComputed"
        autocomplete="off"
        :class="myClass"
        :maxlength="max"
      />

      <div class="text-xl absolute right-2 cursor-pointer">
        <FaEye @click="changeEye" v-if="toggleEye" class="text-2xl" />
        <FaEyeSlash @click="changeEye" v-else class="text-2xl" />
      </div>
    </div>

    <span v-if="error" class="text-[#fa2702] text-[14px] font-semibold">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { FaEye } from 'vue3-icons/fa'
import { FaEyeSlash } from 'vue3-icons/fa6'
import { ref, toRefs, onMounted, computed, defineProps, defineEmits, useTemplateRef } from 'vue'

const emit = defineEmits(['update:input'])

const props = defineProps<{
  input: string | number
  placeholder?: string
  max?: number
  autoFocus?: boolean
  error?: string | boolean
  myClass?: string | string[]
}>()
const { input, placeholder, max, autoFocus, error } = toRefs(props)

const inputRef = useTemplateRef<HTMLInputElement | null>('inputRef')
const toggleEye = ref(false)

onMounted(() => {
  if (autoFocus.value && inputRef.value) {
    inputRef.value.focus()
  }
})

const inputComputed = computed({
  get: () => input.value,
  set: (val) => emit('update:input', val),
})

const changeEye = () => {
  if (inputRef.value) {
    if (inputRef.value.type === 'password') {
      inputRef.value.type = 'text'
      toggleEye.value = true
    } else {
      inputRef.value.type = 'password'
      toggleEye.value = false
    }
  }
}
</script>
