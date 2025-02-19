<template>
  <div class="w-full">
    <div class="mb-4 flex items-center justify-center">
      <CmkTextInput
        inputType="text"
        v-model:input="searchQuery"
        placeholder="Search..."
        class="w-full md:w-1/3"
        myClass="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
      />
    </div>

    <div class="flex-1" :class="myClass">
      <div v-for="(item, index) in filteredPaginatedItems" :key="index">
        <slot :item="item" />
      </div>
    </div>

    <div class="flex items-center justify-center gap-4 mt-4" v-if="totalPages > 0">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="p-3 rounded-md text-white transition-colors duration-200"
        :class="
          currentPage === 1
            ? 'cursor-not-allowed bg-gray-800/[.1]'
            : 'cursor-pointer bg-gray-800 hover:bg-gray-700'
        "
      >
        <FaAngleLeft />
      </button>

      <span class="text-gray-700">Page {{ currentPage }} of {{ totalPages }}</span>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="p-3 rounded-md text-white transition-colors duration-200"
        :class="
          currentPage === totalPages
            ? 'cursor-not-allowed bg-gray-800/[.1]'
            : 'cursor-pointer bg-gray-800 hover:bg-gray-700'
        "
      >
        <FaAngleRight />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toRefs, watch } from 'vue'
import { FaAngleLeft, FaAngleRight } from 'vue3-icons/fa6'
import CmkTextInput from './CmkTextInput.vue'

interface PaginationProps {
  items: Array<any>
  myClass?: string | string[]
  itemsPerPage?: number
}

const props = withDefaults(defineProps<PaginationProps>(), {
  itemsPerPage: 3,
})

const { items, itemsPerPage } = toRefs(props)

const currentPage = ref(1)
const searchQuery = ref('')

const filteredItems = computed(() => {
  if (!searchQuery.value) return items.value
  return items.value.filter((item) => {
    const searchStr = searchQuery.value.toLowerCase().trim()
    return Object.values(item).some((val) => String(val).toLowerCase().includes(searchStr))
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredItems.value.length / itemsPerPage.value)
})

const filteredPaginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredItems.value.slice(start, end)
})

watch([items, searchQuery], () => {
  currentPage.value = 1
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }
}
</script>
