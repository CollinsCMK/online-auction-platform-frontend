<template>
  <TopLayout>
    <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-stretch">
      <div class="flex-1 shadow-xl rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-gray-800">
        <h1 class="font-bold text-4xl mb-6 text-purple-800 dark:text-purple-400">Bidder Access</h1>

        <p class="mb-6 text-gray-600 dark:text-gray-300 text-lg">Place bids on available items and track your auction activity</p>

        <RouterLink to="/user">
          <CmkButton class="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 transform hover:scale-105 transition-all duration-300 text-lg py-3 text-white">
            Enter as Bidder
          </CmkButton>
        </RouterLink>
      </div>

      <div class="flex-1 shadow-xl rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-gray-800">
        <h1 class="font-bold text-4xl mb-6 text-purple-800 dark:text-purple-400">Administrator Access</h1>

        <p class="mb-6 text-gray-600 dark:text-gray-300 text-lg">Manage auctions, listings, and monitor bidding activity</p>

        <RouterLink to="/admin">
          <CmkButton class="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 transform hover:scale-105 transition-all duration-300 text-lg py-3 text-white">
            Enter as Admin
          </CmkButton>
        </RouterLink>
      </div>
    </div>
  </TopLayout>
</template>

<script setup lang="ts">
import CmkButton from '@/components/CmkButton.vue';
import TopLayout from '@/components/Layouts/TopLayout.vue'
</script>
