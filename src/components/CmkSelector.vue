<template>
  <div ref="target" class="relative">
    <div class="relative cursor-pointer" @click="showSelector">
      <div>
        <input
          ref="inputRef"
          :placeholder="placeholder"
          class="block w-full focus:outline-hidden bg-white dark:bg-gray-900 text-black dark:text-white p-2 border dark:border-gray-700 rounded-md"
          :type="inputType"
          v-model="inputComputed"
          autocomplete="off"
          :maxlength="max"
          :disabled="disabled"
          :readonly="readonly"
        />
        
        <span v-if="error" class="text-[#fa2702] text-[14px] font-semibold">{{ error }}</span>
      </div>
      
      <FaAngleDown class="absolute top-1/2 transform -translate-y-1/2 right-1 text-lg text-gray-500"/>
    </div>
    
    <Teleport to="body">
      <div
        v-show="isSelector"
        class="fixed z-1000 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white p-2 max-h-60 overflow-y-auto shadow-lg"
        :style="{
          top: `${dropdownTop}px`,
          left: `${dropdownLeft}px`,
          width: `${dropdownWidth}px`,
          maxWidth: '100vw'
        }"
        @click="handleSelectorClick"
      >
        <div class="relative mb-4">
          <input
            ref="searchInputRef"
            type="text"
            v-model="searchInput"
            class="focus:outline-hidden w-full p-1 border-2 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white"
            :placeholder="searchPlaceholder"
          />
          
          <CiSearch class="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-500"/>
        </div>
        
        <p class="border dark:border-gray-700 rounded-md p-1 mb-2 cursor-pointer flex justify-between items-center"
          v-for="item in handleSearch(items)"
          :key="item.id"
          @click="selectItem(item)">
          {{ item[displayKey] }}
          <div v-if="multiple && selected.some(it => it.id === item.id)" class="w-4 h-4 rounded-full bg-green-600 text-white flex items-center justify-center">
            <FaCheck class="text-[12px]"/>
          </div>

          <div v-else-if="selected.id === item.id" class="w-4 h-4 rounded-full bg-green-600 text-white flex items-center justify-center">
            <FaCheck class="text-[12px]"/>
          </div>
        </p>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, toRefs, inject, onUnmounted, nextTick } from 'vue';
import { FaAngleDown, FaCheck } from "vue3-icons/fa";
import { CiSearch } from "vue3-icons/ci";
import { onClickOutside } from '@vueuse/core';

const emit = defineEmits(['update:input', 'selectedItem']);

const props = defineProps({
  input: {},
  placeholder: String,
  inputType: { type: String, default: 'text' },
  max: Number,
  autoFocus: Boolean,
  error: String,
  disabled: Boolean,
  items: { type: Array, required: true },
  displayKey: { type: String, required: true },
  searchPlaceholder: String,
  readonly: Boolean,
  multiple: {
    default: false,
    type: Boolean
  },
});

const { input, placeholder, inputType, max, autoFocus, error, items, displayKey, searchPlaceholder, multiple } = toRefs(props);

const inputRef = ref(null);
const searchInputRef = ref(null);
const target = ref(null);

const preventModalClosing = inject('preventModalClosing', null);

const inputComputed = computed({
  get: () => input.value,
  set: (val) => emit('update:input', val)
});

const selected = ref([]);
const searchInput = ref('');
const isSelector = ref(false);
const dropdownTop = ref(0);
const dropdownLeft = ref(0);
const dropdownWidth = ref(0);

const updatePosition = async () => {
  await nextTick();
  const rect = target.value.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const dropdownHeight = 200; // Approximate dropdown height

  dropdownWidth.value = rect.width;
  dropdownLeft.value = rect.left;

  // Check if there's enough space below
  if (rect.bottom + dropdownHeight > windowHeight) {
    // Position above the input
    dropdownTop.value = rect.top; // - dropdownHeight;
  } else {
    // Position below the input
    dropdownTop.value = rect.bottom;
  }
};

const showSelector = async () => {
  isSelector.value = !isSelector.value;
  
  if (isSelector.value) {
    await updatePosition();
  }

  if (preventModalClosing) {
    preventModalClosing(isSelector.value);
  }
};

const selectItem = (item) => {
  if (multiple.value) {
    if (!Array.isArray(selected.value)) {
      selected.value = [];
    }

    const itemIndex = selected.value.findIndex(
      (selectedItem) => selectedItem === item
    );

    if (itemIndex !== -1) {
      selected.value.splice(itemIndex, 1);
    } else {
      selected.value.push(item);
    }

    emit('update:input', selected.value.map((i) => i[displayKey.value]).join(', '));
    emit('selectedItem', selected.value);
  } else {
    if (selected.value === item) {
      selected.value = '';
      emit('update:input', '');
      emit('selectedItem', '');
    } else {
      selected.value = item;
      emit('update:input', item[displayKey.value]);
      emit('selectedItem', item);
    }
  }

  isSelector.value = false;

  if (preventModalClosing) {
    preventModalClosing(false);
  }
};

const handleSelectorClick = (event) => {
  if (event.target === searchInputRef.value) {
    event.stopPropagation();
  }
};

const handleSearch = (items) => {
  return items.filter(item =>
    item[displayKey.value].toString().toLowerCase().includes(searchInput.value.toString().toLowerCase())
  );
};

// Update position on scroll or resize
const handleWindowChange = () => {
  if (isSelector.value) {
    updatePosition();
  }
};

onMounted(() => {
  if (autoFocus.value) {
    inputRef.value.focus();
  }
  
  window.addEventListener('scroll', handleWindowChange, true);
  window.addEventListener('resize', handleWindowChange);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleWindowChange, true);
  window.removeEventListener('resize', handleWindowChange);
});

onClickOutside(target, (event) => {
  if (event.target !== searchInputRef.value) {
    isSelector.value = false;
    if (preventModalClosing) {
      preventModalClosing(false);
    }
  }
});
</script>