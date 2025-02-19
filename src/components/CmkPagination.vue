<template>
  <div class="w-full">
    <div class="flex-1" :class="myClass">
      <div v-for="(item, index) in paginatedItems" :key="index">
        <slot :item="item" />
      </div>
    </div>

    <div class="flex items-center justify-center gap-4" v-if="totalPages > 0">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="p-3 rounded-md text-white"
        :class="
          currentPage === 1 ? 'cursor-not-allowed bg-gray-800/[.1]' : 'cursor-pointer bg-gray-800'
        "
      >
        <FaAngleLeft />
      </button>

      <span>Page {{ currentPage }} of {{ totalPages }}</span>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="p-3 rounded-md text-white"
        :class="
          currentPage === totalPages
            ? 'cursor-not-allowed bg-gray-800/[.1]'
            : 'cursor-pointer bg-gray-800'
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

interface PaginationProps {
  items: Array<string | number>
  myClass?: string | string[]
  itemsPerPage?: number
}

const props = withDefaults(defineProps<PaginationProps>(), {
  itemsPerPage: 3,
})

const { items, itemsPerPage } = toRefs(props)

const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.ceil(items.value.length / itemsPerPage.value)
})

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return items.value.slice(start, end)
})

watch(items, () => {
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
