<template>
  <DefaultLayout>
    <div class="flex items-center justify-center min-h-[400px] text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">
      <div class="text-center">
        <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No Data Available</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">There's currently no data to display in this section.</p>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/components/Layouts/DefaultLayout.vue'
</script>
