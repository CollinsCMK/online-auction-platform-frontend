<template>
  <TopLayout>
    <CmkPagination
      :items="auctions"
      :itemsPerPage="3"
      myClass="flex items-center justify-center gap-4 w-full"
    >
      <template #default="{ item }">
        <div
          class="w-full max-w-md shadow-2xl rounded-md p-2 hover:shadow-3xl transition-all duration-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:scale-105"
        >
          <div class="flex items-center justify-between mb-4">
            <h1 class="font-bold text-xl text-purple-600">{{ item.title }}</h1>
            <p class="rounded-full bg-green-600/[.2] text-green-600 px-3 py-1 font-semibold">
              {{ item.status }}
            </p>
          </div>

          <p class="mb-4 text-gray-600 dark:text-gray-300">{{ item.description }}</p>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p class="text-sm text-gray-500 mb-1">Base Price</p>
              <p class="font-bold text-purple-600">KSH {{ item.base_price }}</p>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p class="text-sm text-gray-500 mb-1">Highest Bid</p>
              <p class="font-bold text-green-600">KSH {{ item.highest_anyone_bid }}</p>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p class="text-sm text-gray-500 mb-1">Your Highest Bid</p>
              <p class="font-bold text-blue-600">KSH {{ item.highest_user_bid }}</p>
              <RouterLink :to="`/bids/${route.params.id}/${item.listing_id}`" class="text-sm text-purple-600 hover:text-purple-800 underline font-medium">View all your bids</RouterLink>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p class="text-sm text-gray-500 mb-1">Total Bids</p>
              <p class="font-bold">{{ item.total_bids }}</p>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-4">
            <p class="text-sm text-gray-500 mb-1">Available Volume</p>
            <p class="font-bold">{{ item.available_volume }}</p>
          </div>

          <p class="mb-4 text-sm text-gray-500">Ends: {{ new Date(item.end_time).toLocaleString() }}</p>

          <CmkButton
            v-if="item.status == 'Not Started'"
            class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl"
          >
            Not available
          </CmkButton>
          <CmkButton
            v-else
            @click="openBidModal(item)"
            class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl"
          >
            Place Bid
          </CmkButton>
        </div>
      </template>
    </CmkPagination>
  </TopLayout>

  <CmkModalScrollable
    v-if="isBid"
    title="Make a bid"
    :isLoading="isLoading"
    myClass=""
    @cancel="closeBidModal"
    @submitForm="createBid"
  >
  <div class="relative">
    <label for="amount" class="block mb-2">Amount</label>

    <CmkTextInput
      v-model:input="amount"
      inputType="number"
      placeholder="Enter amount"
      class="w-full"
      id="amount"
      :error="amount ? (Number(amount) <= selectedItem.highest_anyone_bid ? 'Bid amount must be higher than current highest bid' : '') : ''"
    />
  </div>
  </CmkModalScrollable>
</template>

<script setup lang="ts">
import CmkButton from '@/components/CmkButton.vue'
import CmkModalScrollable from '@/components/CmkModalScrollable.vue'
import CmkPagination from '@/components/CmkPagination.vue'
import CmkTextInput from '@/components/CmkTextInput.vue'
import TopLayout from '@/components/Layouts/TopLayout.vue'
import { useAuctionStore } from '@/stores/auction'
import { useBidStore } from '@/stores/bids'
import { useToastStore } from '@/stores/toast'
import { onMounted, provide, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute();
const toast = useToastStore();
const auctionStore = useAuctionStore();
const bidStore = useBidStore();
const auctions = ref([])
const isLoading = ref(false)
const isBid = ref(false)
const amount = ref('');
const listingId = ref('');
const selectedItem = ref({});

const openBidModal = (item) => {
  isBid.value = true
  listingId.value = item.listing_id
  selectedItem.value = item
}

const closeBidModal = () => {
  isBid.value = false
  listingId.value = ''
  selectedItem.value = {}
}

const createBid = async() => {
  isLoading.value = true;

  try {
    const res = await bidStore.createBid({
      listing_id: parseInt(listingId.value),
      user_id: parseInt(route.params.id as string),
      amount: amount.value ? amount.value : 0,
    });
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
  } finally {
    isLoading.value = false;
    getAllUserAuctions();
    closeBidModal();
  }
}

const getAllUserAuctions = async() => {
  try {
    const res = await auctionStore.getAllUserAuctions(parseInt(route.params.id as string));

    auctions.value = res.data.auctions;

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
  getAllUserAuctions();
})

provide('closeCreateModal', closeBidModal)
</script>
