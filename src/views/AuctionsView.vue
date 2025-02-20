<template>
  <DefaultLayout>
    <CmkTable
      :items="auctions"
      :isCreate="true"
      :isExport="true"
      :isRefresh="true"
      :isRefreshing="isRefreshing"
      @create="openCreateModal"
      @refresh="getAllAuctions"
      :exportableItems="['rowNumber', 'name', 'start_time', 'end_time', 'updated_at']"
      :searchableItems="['rowNumber', 'name', 'start_time', 'end_time', 'updated_at']"
    >
      <CmkColumn field="rowNumber" header="#" fixed="left"></CmkColumn>
      <CmkColumn field="name" header="Name"></CmkColumn>
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
          <div class="flex">
            <button
              @click="openEditModal(slotProps.item)"
              class="mr-2 rounded-full h-8 w-8 border border-green-500 flex items-center justify-center cursor-pointer text-black dark:text-white text-2xl p-2"
            >
              <FaEdit />
            </button>

            <button
              @click="openDeleteModal(slotProps.item.id)"
              class="mr-2 rounded-full h-8 w-8 border border-red-500 flex items-center justify-center cursor-pointer text-black dark:text-white text-2xl p-2"
            >
              <RiDeleteBin6Fill title="delete" />
            </button>
          </div>
        </template>
      </CmkColumn>
    </CmkTable>
  </DefaultLayout>

  <CmkModalScrollable
    v-if="isCreate"
    title="Create an auction"
    :isLoading="isCreating"
    myClass=""
    @cancel="closeCreateModal"
    @submitForm="createAuction"
  >
    <div class="relative mb-4">
      <label for="name" class="block mb-2">Auction Name</label>

      <CmkTextInput
        v-model:input="form.name"
        placeholder="Enter auction name"
        inputType="text"
        class="w-full"
        id="name"
      />
    </div>

    <div class="relative mb-4">
      <label for="start_time" class="mb-2 block">Start Time:</label>

      <VueDatePicker
        v-model="form.start_time"
        placeholder="Start time"
        :dark="theme.isDark as boolean"
      ></VueDatePicker>
    </div>

    <div class="relative mb-4">
      <label for="end_time" class="mb-2 block">End Time:</label>

      <VueDatePicker
        v-model="form.end_time"
        placeholder="End time"
        :dark="theme.isDark as boolean"
      ></VueDatePicker>
    </div>
  </CmkModalScrollable>

  <CmkModalScrollable
    v-if="isEdit"
    title="Edit an existing auction"
    :isLoading="isEditing"
    myClass=""
    @cancel="closeEditModal"
    @submitForm="updateAuction"
  >
    <div class="relative mb-4">
      <label for="name" class="block mb-2">Auction Name</label>

      <CmkTextInput
        v-model:input="form.name"
        placeholder="Enter auction name"
        inputType="text"
        class="w-full"
        id="name"
      />
    </div>

    <div class="relative mb-4">
      <label for="start_time" class="mb-2 block">Start Time:</label>

      <VueDatePicker
        v-model="form.start_time"
        placeholder="Start time"
        :dark="theme.isDark as boolean"
      ></VueDatePicker>
    </div>

    <div class="relative mb-4">
      <label for="end_time" class="mb-2 block">End Time:</label>

      <VueDatePicker
        v-model="form.end_time"
        placeholder="End time"
        :dark="theme.isDark as boolean"
      ></VueDatePicker>
    </div>
  </CmkModalScrollable>

  <CmkModal
    v-if="isDelete"
    myClass="w-1/2 max-h-5/6 p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 overflow-y-auto"
  >
    <h6 class="font-bold text-xl text-gray-800 dark:text-gray-200">Confirm Deletion</h6>

    <hr class="my-4 border-gray-300 dark:border-gray-600" />

    <p class="text-gray-600 dark:text-gray-300">
      The selected auction will be deleted
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
        @click="deleteAuction(auctionId)"
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
import { useAuctionStore } from '@/stores/auction'
import { useToastStore } from '@/stores/toast'
import { onMounted, provide, ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useThemeStore } from '@/stores/theme'
import CmkTextInput from '@/components/CmkTextInput.vue'
import CmkModal from '@/components/CmkModal.vue'
import CmkButton from '@/components/CmkButton.vue'
import CmkButtonLoader from '@/components/CmkButtonLoader.vue'
import { FaEdit } from 'vue3-icons/fa'
import { RiDeleteBin6Fill } from 'vue3-icons/ri'

const auctions = ref([])
const theme = useThemeStore()
const auctionStore = useAuctionStore()
const toast = useToastStore()
const isRefreshing = ref(false)
const isCreate = ref(false)
const isCreating = ref(false)
const isEdit = ref(false)
const isEditing = ref(false)
const isDelete = ref(false)
const isDeleting = ref(false)
const form = ref({
  name: '',
  start_time: new Date(),
  end_time: new Date(),
})
const auctionId = ref<null | number>(null)

const openCreateModal = () => {
  isCreate.value = true
}

const closeCreateModal = () => {
  isCreate.value = false
  form.value.name = ''
  form.value.start_time = new Date()
  form.value.end_time = new Date()
}

const formatDateForBackend = (isoString: string): string => {
  return isoString.replace('Z', '') // Remove the 'Z' for Rust's NaiveDateTime
}

const openEditModal = (data) => {
  form.value.name = data.name
  form.value.start_time = new Date(data.start_time)
  form.value.end_time = new Date(data.end_time)
  auctionId.value = data.id
  isEdit.value = true
}

const closeEditModal = () => {
  form.value.name = ''
  form.value.start_time = new Date()
  form.value.end_time = new Date()
  auctionId.value = null
  isEdit.value = false
}

const openDeleteModal = (id: number) => {
  auctionId.value = id
  isDelete.value = true
}

const closeDeleteModal = () => {
  auctionId.value = null
  isDelete.value = false
}

const createAuction = async () => {
  isCreating.value = true

  try {
    const res = await auctionStore.createAuction({
      name: form.value.name,
      start_time: formatDateForBackend(new Date(form.value.start_time).toISOString()),
      end_time: formatDateForBackend(new Date(form.value.end_time).toISOString()),
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
    getAllAuctions()
  }
}

const updateAuction = async () => {
  isEditing.value = true

  try {
    const res = await auctionStore.updateAuction(auctionId.value as number, {
      name: form.value.name,
      start_time: formatDateForBackend(new Date(form.value.start_time).toISOString()),
      end_time: formatDateForBackend(new Date(form.value.end_time).toISOString()),
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
    getAllAuctions()
  }
}

const deleteAuction = async () => {
  isDeleting.value = true

  try {
    const res = await auctionStore.deleteAuction(auctionId.value as number)

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
    getAllAuctions()
  }
}

const getAllAuctions = async () => {
  isRefreshing.value = true

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
  } finally {
    isRefreshing.value = false
  }
}

onMounted(() => {
  getAllAuctions()
})

provide('closeCreateModal', closeCreateModal)
provide('closeEditModal', closeEditModal)
provide('closeDeleteModal', closeDeleteModal)
</script>
