<template>
  <TopLayout>
    <div class="container mx-auto px-4 py-8">
      <CmkPagination
        :items="bids"
        :itemsPerPage="3"
        myClass="flex items-center justify-center gap-4 w-full"
      >
        <template #default="{ item }">
          <div class="w-full max-w-md shadow-2xl rounded-md p-2 hover:shadow-3xl transition-all duration-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:scale-105">
            <div class="flex items-center justify-between mb-4">
              <h1 class="font-bold text-xl text-purple-600">{{ item.listing_title }}</h1>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-4">
              <p class="text-sm text-gray-500 mb-1">Description</p>
              <p class="font-bold">{{ item.description }}</p>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-4">
              <p class="text-sm text-gray-500 mb-1">Bid Amount</p>
              <p class="font-bold text-green-600">KSH {{ item.amount }}</p>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p class="text-sm text-gray-500 mb-1">Bid Date</p>
              <p class="font-bold">{{ new Date(item.created_at).toLocaleString() }}</p>
            </div>
          </div>
        </template>
      </CmkPagination>
    </div>
  </TopLayout>
</template>

<script setup lang="ts">
import CmkPagination from '@/components/CmkPagination.vue';
import TopLayout from '@/components/Layouts/TopLayout.vue';
import { useBidStore } from '@/stores/bids';
import { useToastStore } from '@/stores/toast';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const toast = useToastStore();
const bidStore = useBidStore();
const bids = ref([]);

const getAllUserBids = async() => {
  try {
    const res = await bidStore.getAllUserBids(parseInt(route.params.id as string), parseInt(route.params.listing_id as string));

    bids.value = res.data.bids;

    toast.add({
      severity: 'success',
      summary: 'Success Message',
      detail: (res as { data?: { message?: string } }).data?.message ?? 'Unknown response',
      life: 3000,
    })
  } catch (e) {
    toast.add({
      severity: 'error',
      summary: 'Error Message',
      detail:
        (e as { response?: { data?: { error?: string; errors?: string } } }).response?.data
          ?.error ??
        (e as { response?: { data?: { errors?: string } } }).response?.data?.errors ??
        'Unknown error',
      life: 3000,
    })
  }
}

onMounted(() => {
  getAllUserBids();
})
</script>
