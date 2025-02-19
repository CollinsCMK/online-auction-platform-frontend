<template>
  <TopLayout>
    <CmkPagination
      :items="auctions"
      :itemsPerPage="3"
      myClass="flex items-center justify-center gap-4"
    >
      <template #default="{ item }">
        <div
          class="w-full max-w-md shadow-2xl rounded-2xl p-8 hover:shadow-3xl transition-all duration-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:scale-105"
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
              <p class="font-bold text-purple-600">${{ item.base_price }}</p>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p class="text-sm text-gray-500 mb-1">Highest Bid</p>
              <p class="font-bold text-green-600">${{ item.highest_bid }}</p>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p class="text-sm text-gray-500 mb-1">Your Bid</p>
              <p class="font-bold text-blue-600">${{ item.your_bid }}</p>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p class="text-sm text-gray-500 mb-1">Total Bids</p>
              <p class="font-bold">{{ item.total_bids }}</p>
            </div>
          </div>

          <p class="mb-4 text-sm text-gray-500">Ends: {{ item.end_time }}</p>

          <CmkButton
            v-if="!isBiddingAvailable(item.end_time)"
            class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl"
          >
            Not available
          </CmkButton>
          <CmkButton
            v-else
            @click="openBidModal"
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
    @submitForm=""
  >
    <form @submit.prevent="">
      <div class="relative">
        <label for="amount">Amount</label>

        <CmkTextInput
          v-model:input="form.amount"
          inputType="number"
          placeholder="Enter amount"
          class="w-full"
          id="amount"
        />
      </div>
    </form>
  </CmkModalScrollable>
</template>

<script setup lang="ts">
import CmkButton from '@/components/CmkButton.vue'
import CmkModalScrollable from '@/components/CmkModalScrollable.vue'
import CmkPagination from '@/components/CmkPagination.vue'
import CmkTextInput from '@/components/CmkTextInput.vue'
import TopLayout from '@/components/Layouts/TopLayout.vue'
import { provide, ref } from 'vue'

const auctions = ref([
  {
    title: '2018 Honda Civic',
    status: 'Active',
    description: 'Well-maintained sedan with low mileage. Single owner, regularly serviced.',
    base_price: '15,000.00',
    highest_bid: '16,200.00',
    your_bid: '15,800.00',
    total_bids: 8,
    end_time: '2/20/2024, 6:00:00 PM',
  },
  {
    title: 'Luxury Mountain Cabin',
    status: 'Active',
    description: '3-bedroom cabin with stunning mountain views and modern amenities.',
    base_price: '450,000.00',
    highest_bid: '475,000.00',
    your_bid: '460,000.00',
    total_bids: 12,
    end_time: '2/25/2024, 3:00:00 PM',
  },
  {
    title: 'Vintage Rolex Submariner',
    status: 'Active',
    description: '1960s Rolex Submariner in excellent condition with original box and papers.',
    base_price: '25,000.00',
    highest_bid: '28,500.00',
    your_bid: '27,000.00',
    total_bids: 15,
    end_time: '2/18/2024, 8:00:00 PM',
  },
  {
    title: 'Rare Comic Collection',
    status: 'Active',
    description: 'Complete first edition Marvel Silver Age collection in mint condition.',
    base_price: '75,000.00',
    highest_bid: '82,000.00',
    your_bid: '80,000.00',
    total_bids: 6,
    end_time: '2/22/2024, 12:00:00 PM',
  },
  {
    title: 'Electric Guitar Signed by Clapton',
    status: 'Active',
    description:
      'Fender Stratocaster personally signed by Eric Clapton with certificate of authenticity.',
    base_price: '35,000.00',
    highest_bid: '38,500.00',
    your_bid: '37,000.00',
    total_bids: 10,
    end_time: '2/21/2025, 9:00:00 PM',
  },
])
const isLoading = ref(false)
const isBid = ref(false)
const form = ref({
  amount: '',
})

const isBiddingAvailable = (endTime: string) => {
  const endDateTime = new Date(endTime)
  const now = new Date()
  return now < endDateTime
}

const openBidModal = () => {
  isBid.value = true
}

const closeBidModal = () => {
  isBid.value = false
}

provide('closeCreateModal', closeBidModal)
</script>
