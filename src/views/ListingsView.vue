<template>
  <DefaultLayout>
    <CmkTable
      :items="listings"
      :isCreate="true"
      :isExport="true"
      :isRefresh="true"
      :isRefreshing="isRefreshing"
      @create="openCreateModal"
      @refresh="getAllListings"
      :exportableItems="[
        'rowNumber',
        'title',
        'description',
        'base_price',
        'available_volume',
        'auction_name',
        'start_time',
        'end_time',
        'updated_at',
      ]"
      :searchableItems="[
        'rowNumber',
        'title',
        'description',
        'base_price',
        'available_volume',
        'auction_name',
        'start_time',
        'end_time',
        'updated_at',
      ]"
    >
      <CmkColumn field="rowNumber" header="#" fixed="left"></CmkColumn>
      <CmkColumn field="title" header="Title"></CmkColumn>
      <CmkColumn field="description" header="Description"></CmkColumn>
      <CmkColumn field="base_price" header="Base Price"></CmkColumn>
      <CmkColumn field="available_volume" header="Available Volume"></CmkColumn>
      <CmkColumn field="auction_name" header="Auction Name"></CmkColumn>
      <CmkColumn header="Start Time">
        <template #default="slotProps">
          {{ new Date(slotProps.item.start_time).toLocaleString() }}
        </template>
      </CmkColumn>
      <CmkColumn header="End Time">
        <template #default="slotProps">
          {{ new Date(slotProps.item.end_time).toLocaleString() }}
        </template>
      </CmkColumn>
      <CmkColumn header="Updated At">
        <template #default="slotProps">
          {{ new Date(slotProps.item.updated_at).toLocaleString() }}
        </template>
      </CmkColumn>
      <CmkColumn header="Action" fixed="right">
        <template #default="slotProps">
          <div class="flex items-center gap-3">
            <RouterLink
              :to="`/admin/bids/${slotProps.item.id}`"
              class="rounded-full border-2 border-green-500/30 text-green-500 hover:bg-green-500/10 transition-colors cursor-pointer px-4 py-2 font-medium"
            >
              Bids
            </RouterLink>

            <button
              @click="openEditModal(slotProps.item)"
              class="rounded-full h-9 w-9 border-2 border-green-500 hover:bg-green-500/10 transition-colors flex items-center justify-center cursor-pointer text-green-600 dark:text-green-400"
            >
              <FaEdit class="text-lg" />
            </button>

            <button
              @click="openDeleteModal(slotProps.item.id)"
              class="rounded-full h-9 w-9 border-2 border-red-500 hover:bg-red-500/10 transition-colors flex items-center justify-center cursor-pointer text-red-600 dark:text-red-400"
            >
              <RiDeleteBin6Fill class="text-lg" title="delete" />
            </button>
          </div>
        </template>
      </CmkColumn>
    </CmkTable>
  </DefaultLayout>

  <CmkModalScrollable
    v-if="isCreate"
    title="Create a listing"
    :isLoading="isCreating"
    myClass=""
    @cancel="closeCreateModal"
    @submitForm="createListing"
  >
    <div class="relative mb-4">
      <label for="title" class="block mb-2">Title</label>

      <CmkTextInput
        v-model:input="form.title"
        placeholder="Enter listing title"
        inputType="text"
        class="w-full"
        id="title"
      />
    </div>

    <div class="relative mb-4">
      <label for="description" class="block mb-2">Description</label>

      <CmkTextArea
        v-model:input="form.description"
        placeholder="Enter listing description"
        inputType="text"
        class="w-full"
        id="description"
      />
    </div>

    <div class="relative mb-4">
      <label for="base_price" class="block mb-2">Base Price</label>

      <CmkTextInput
        v-model:input="form.base_price"
        placeholder="Enter listing base price"
        inputType="number"
        class="w-full"
        id="base_price"
      />
    </div>

    <div class="relative mb-4">
      <label for="available_volume" class="block mb-2">Available Volume</label>

      <CmkTextInput
        v-model:input="form.available_volume"
        placeholder="Enter listing available volume"
        inputType="number"
        class="w-full"
        id="available_volume"
      />
    </div>

    <div class="relative w-full">
      <label for="auction" class="mb-2 block">Select Auction</label>

      <CmkSelector
        v-model:input="form.auction_name"
        placeholder="Select auction"
        searchPlaceholder="Search auction..."
        inputType="text"
        :max="50"
        :autoFocus="true"
        :disabled="true"
        error=""
        :items="auctions"
        @selectedItem="handleSelectAuction"
        displayKey="name"
        id="auction"
      />
    </div>
  </CmkModalScrollable>

  <CmkModalScrollable
    v-if="isEdit"
    title="Edit an existing listing"
    :isLoading="isEditing"
    myClass=""
    @cancel="closeEditModal"
    @submitForm="updateListing"
  >
    <div class="relative mb-4">
      <label for="title" class="block mb-2">Title</label>

      <CmkTextInput
        v-model:input="form.title"
        placeholder="Enter listing title"
        inputType="text"
        class="w-full"
        id="title"
      />
    </div>

    <div class="relative mb-4">
      <label for="description" class="block mb-2">Description</label>

      <CmkTextArea
        v-model:input="form.description"
        placeholder="Enter listing description"
        inputType="text"
        class="w-full"
        id="description"
      />
    </div>

    <div class="relative mb-4">
      <label for="base_price" class="block mb-2">Base Price</label>

      <CmkTextInput
        v-model:input="form.base_price"
        placeholder="Enter listing base price"
        inputType="number"
        class="w-full"
        id="base_price"
      />
    </div>

    <div class="relative mb-4">
      <label for="available_volume" class="block mb-2">Available Volume</label>

      <CmkTextInput
        v-model:input="form.available_volume"
        placeholder="Enter listing available volume"
        inputType="number"
        class="w-full"
        id="available_volume"
      />
    </div>

    <div class="relative w-full">
      <label for="auction" class="mb-2 block">Select Auction</label>

      <CmkSelector
        v-model:input="form.auction_name"
        placeholder="Select auction"
        searchPlaceholder="Search auction..."
        inputType="text"
        :max="50"
        :autoFocus="true"
        :disabled="true"
        error=""
        :items="auctions"
        @selectedItem="handleSelectAuction"
        displayKey="name"
        id="auction"
      />
    </div>
  </CmkModalScrollable>

  <CmkModal
    v-if="isDelete"
    myClass="w-1/2 max-h-5/6 p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 overflow-y-auto"
  >
    <h6 class="font-bold text-xl text-gray-800 dark:text-gray-200">Confirm Deletion</h6>

    <hr class="my-4 border-gray-300 dark:border-gray-600" />

    <p class="text-gray-600 dark:text-gray-300">
      The selected listing will be deleted
      <span class="font-semibold text-red-600 dark:text-red-500">permanently</span>.
    </p>

    <div class="flex justify-end gap-3 mt-6">
      <CmkButton
        type="button"
        @click="closeDeleteModal"
        class="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        Cancel
      </CmkButton>

      <CmkButtonLoader
        v-if="isDeleting"
        name="Deleting"
        class="text-red-800/[.2] relative bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded-lg"
      />

      <CmkButton
        v-else
        @click="deleteListing(listingId)"
        type="submit"
        class="bg-red-800 text-white dark:bg-red-700 px-4 py-2 rounded-lg hover:bg-red-900 dark:hover:bg-red-800 transition"
      >
        Delete
      </CmkButton>
    </div>
  </CmkModal>
</template>

<script setup lang="ts">
import CmkColumn from '@/components/CmkColumn.vue'
import CmkModalScrollable from '@/components/CmkModalScrollable.vue'
import CmkTable from '@/components/CmkTable.vue'
import DefaultLayout from '@/components/Layouts/DefaultLayout.vue'
import { useToastStore } from '@/stores/toast'
import { onMounted, provide, ref } from 'vue'
import { useThemeStore } from '@/stores/theme'
import CmkTextInput from '@/components/CmkTextInput.vue'
import CmkTextArea from '@/components/CmkTextArea.vue'
import CmkSelector from '@/components/CmkSelector.vue'
import CmkModal from '@/components/CmkModal.vue'
import CmkButton from '@/components/CmkButton.vue'
import CmkButtonLoader from '@/components/CmkButtonLoader.vue'
import { FaEdit } from 'vue3-icons/fa'
import { RiDeleteBin6Fill } from 'vue3-icons/ri'
import { useListingStore } from '@/stores/listings'
import { useRoute } from 'vue-router'
import { useAuctionStore } from '@/stores/auction'

interface FormData {
  [key: string]: string | number
}
const route = useRoute()
const auctions = ref([])
const listings = ref([])
const theme = useThemeStore()
const auctionStore = useAuctionStore()
const listingStore = useListingStore()
const toast = useToastStore()
const isRefreshing = ref(false)
const isCreate = ref(false)
const isCreating = ref(false)
const isEdit = ref(false)
const isEditing = ref(false)
const isDelete = ref(false)
const isDeleting = ref(false)
const form = ref({
  title: '',
  description: '',
  base_price: '',
  available_volume: '',
  auction_id: '',
  auction_name: '',
})
const listingId = ref<null | number>(null)

const openCreateModal = () => {
  isCreate.value = true
}

const closeCreateModal = () => {
  isCreate.value = false
  form.value.title = ''
  form.value.description = ''
  form.value.base_price = ''
  form.value.available_volume = ''
  form.value.auction_id = ''
}

const openEditModal = (data) => {
  form.value.title = data.title
  form.value.description = data.description
  form.value.base_price = data.base_price
  form.value.available_volume = data.available_volume
  form.value.auction_id = data.auction_id
  listingId.value = data.id
  isEdit.value = true
}

const closeEditModal = () => {
  form.value.title = ''
  form.value.description = ''
  form.value.base_price = ''
  form.value.available_volume = ''
  form.value.auction_id = ''
  isEdit.value = false
}

const openDeleteModal = (id: number) => {
  listingId.value = id
  isDelete.value = true
}

const closeDeleteModal = () => {
  listingId.value = null
  isDelete.value = false
}

const handleSelectAuction = (item: FormData) => {
  form.value.auction_id = item.id as string
  form.value.auction_name = item.name as string
}

const createListing = async () => {
  isCreating.value = true

  try {
    const res = await listingStore.createListing({
      title: form.value.title,
      description: form.value.description,
      base_price: form.value.base_price,
      available_volume: form.value.available_volume,
      auction_id: form.value.auction_id,
    })

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
    isCreating.value = false
    closeCreateModal()
    getAllListings()
  }
}

const updateListing = async () => {
  isEditing.value = true

  try {
    const res = await listingStore.updateListing(listingId.value as number, {
      title: form.value.title,
      description: form.value.description,
      base_price: form.value.base_price,
      available_volume: form.value.available_volume,
      auction_id: form.value.auction_id,
    })

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
    isEditing.value = false
    closeEditModal()
    getAllListings()
  }
}

const deleteListing = async () => {
  isDeleting.value = true

  try {
    const res = await listingStore.deleteListing(listingId.value as number)

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
    isDeleting.value = false
    closeDeleteModal()
    getAllListings()
  }
}

const getAllListings = async () => {
  isRefreshing.value = true

  try {
    const res = await listingStore.getAllListings(route.params.id)

    listings.value = res.data.listings.map((p, i) => ({ rowNumber: i + 1, ...p }))

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

const getAllAuctions = async () => {
  try {
    const res = await auctionStore.getAllAuctions()

    auctions.value = res.data.auctions.map((p, i) => ({ rowNumber: i + 1, ...p }))

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
  getAllListings()
  getAllAuctions()
})

provide('closeCreateModal', closeCreateModal)
provide('closeEditModal', closeEditModal)
provide('closeDeleteModal', closeDeleteModal)
</script>
