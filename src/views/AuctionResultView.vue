<template>
  <DefaultLayout>
    <CmkTable
      :items="auctionResults"
      :isCreate="false"
      :isExport="true"
      :isRefresh="true"
      :isRefreshing="isRefreshing"
      @refresh="getAllAuctionResults"
      :exportableItems="[
        'rowNumber',
        'title',
        'name',
        'created_at',
      ]"
      :searchableItems="[
        'rowNumber',
        'title',
        'name',
        'created_at',
      ]"
    >
      <CmkColumn field="rowNumber" header="#" fixed="left"></CmkColumn>
      <CmkColumn field="name" header="Name"></CmkColumn>
      <CmkColumn field="title" header="Listing Title"></CmkColumn>
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
      <CmkColumn header="Action" fixed="right">
        <template #default="slotProps">
          <div class="flex items-center gap-3">
            <RouterLink
              :to="`/admin/bids/${slotProps.item.bid_id}`"
              class="rounded-full border-2 border-green-500/30 text-green-500 hover:bg-green-500/10 transition-colors cursor-pointer px-4 py-2 font-medium"
            >
              Bids
            </RouterLink>
          </div>
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
import { useAuctionResultStore } from '@/stores/auction_result'

const auctionResults = ref([])
const auctionResultStore = useAuctionResultStore()
const toast = useToastStore()
const isRefreshing = ref(false)

const getAllAuctionResults = async () => {
  isRefreshing.value = true

  try {
    const res = await auctionResultStore.getAllAuctionResults()

    auctionResults.value = res.data.auction_results.map((p, i) => ({ rowNumber: i + 1, ...p }))

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
  getAllAuctionResults()
})
</script>
