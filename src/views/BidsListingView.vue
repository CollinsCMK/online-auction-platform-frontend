<template>
  <DefaultLayout>
  <div class="flex justify-center mb-6">
    <div class="inline-flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1 shadow-sm">
      <button
        class="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        :class="activeTab === 'all' ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'"
        @click="activeTab = 'all'"
      >
        All Bids
      </button>
      <button
        class="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        :class="activeTab === 'active' ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'"
        @click="activeTab = 'active'"
      >
        Active Bids
      </button>
    </div>
  </div>

    <CmkTable
      v-if="activeTab === 'all'"
      :items="allBids"
      :isCreate="false"
      :isExport="true"
      :isRefresh="true"
      :isRefreshing="isRefreshing"
      @refresh="getAllListingsBids"
      :exportableItems="[
        'rowNumber',
        'listing_title',
        'name',
        'created_at',
      ]"
      :searchableItems="[
        'rowNumber',
        'listing_title',
        'name',
        'created_at',
      ]"
    >
      <CmkColumn field="rowNumber" header="#" fixed="left"></CmkColumn>
      <CmkColumn field="name" header="Name"></CmkColumn>
      <CmkColumn field="listing_title" header="Listing Title"></CmkColumn>
      <CmkColumn header="Amount">
        <template v-slot="slotProps">
          <span>KSH {{ slotProps.item.amount }}</span>
        </template>
      </CmkColumn>
      <CmkColumn header="Created At">
        <template #default="slotProps">
          {{ new Date(slotProps.item.created_at).toLocaleString() }}
        </template>
      </CmkColumn>
    </CmkTable>

    <CmkTable
      v-if="activeTab === 'active'"
      :items="activeBids"
      :isCreate="false"
      :isExport="true"
      :isRefresh="true"
      :isRefreshing="isRefreshing"
      @refresh="getActiveListingsBids"
      :exportableItems="[
        'rowNumber',
        'listing_title',
        'name',
        'created_at',
      ]"
      :searchableItems="[
        'rowNumber',
        'listing_title',
        'name',
        'created_at',
      ]"
    >
      <CmkColumn field="rowNumber" header="#" fixed="left"></CmkColumn>
      <CmkColumn field="name" header="Name"></CmkColumn>
      <CmkColumn field="listing_title" header="Listing Title"></CmkColumn>
      <CmkColumn header="Amount">
        <template v-slot="slotProps">
          <span>KSH {{ slotProps.item.amount }}</span>
        </template>
      </CmkColumn>
      <CmkColumn header="Created At">
        <template #default="slotProps">
          {{ new Date(slotProps.item.created_at).toLocaleString() }}
        </template>
      </CmkColumn>
    </CmkTable>
  </DefaultLayout>
</template>

<script setup lang="ts">
import CmkColumn from '@/components/CmkColumn.vue'
import CmkTable from '@/components/CmkTable.vue'
import DefaultLayout from '@/components/Layouts/DefaultLayout.vue'
import { useToastStore } from '@/stores/toast'
import { onMounted, ref } from 'vue'
import { useBidStore } from '@/stores/bids'
import { useRoute } from 'vue-router'

const route = useRoute();
const activeTab = ref('all')
const allBids = ref([])
const activeBids = ref([])
const bidStore = useBidStore()
const toast = useToastStore()
const isRefreshing = ref(false)

const getAllListingsBids = async () => {
  isRefreshing.value = true

  try {
    const res = await bidStore.getAllListingsBids(parseInt(route.params.id as string))

    allBids.value = res.data.bids.map((p, i) => ({ rowNumber: i + 1, ...p }))

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
    isRefreshing.value = false
  }
}

const getActiveListingsBids = async () => {
  isRefreshing.value = true

  try {
    const res = await bidStore.getActiveListingsBids(parseInt(route.params.id as string))

    activeBids.value = res.data.bids.map((p, i) => ({ rowNumber: i + 1, ...p }))

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
    isRefreshing.value = false
  }
}

onMounted(() => {
  getAllListingsBids()
  getActiveListingsBids()
})
</script>
