<template>
  <div>
    <div class="relative">
        <input 
            ref="inputRef"
            class="w-[0.625rem] h-[0.625rem] rounded-[50%] border border-black transform scale-150 checked:bg-[#15803d] checked:border-none appearance-none"
            type="radio"
            v-model="inputComputed"
            :disabled="disabled"
            :readonly="readonly"
            :name="name"
            :id="id"
            :class="myClass"
            :value="value"
        />

        <slot/>
    </div>

      <span v-if="error" class="text-[#fa2702] text-[14px] font-semibold">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
  import { toRefs, onMounted, computed, defineProps, defineEmits, useTemplateRef } from 'vue';

  const emit = defineEmits(['update:input']);

  const props = defineProps<{
    input: string | number,
    value: string | number,
    autoFocus?: boolean,
    error?: string | boolean,
    disabled?: boolean,
    readonly?: boolean,
    step?: number,
    name?: string,
    id?: string,
    myClass?: string | string[]
  }>();
  const { input, autoFocus, error, readonly, name, value } = toRefs(props);

  const inputRef = useTemplateRef<HTMLInputElement | null>("inputRef");

  onMounted(() => {
      if(autoFocus.value && inputRef.value) {
          inputRef.value.focus();
      }
  });

  const inputComputed = computed({
      get: () => input.value,
      set: (val) => emit('update:input', val)
  });
</script>