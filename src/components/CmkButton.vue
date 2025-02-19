<template>
  <button
    :type="type"
    :disabled="disabled"
    class="py-2 px-6 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  disabled: false,
})
</script>
