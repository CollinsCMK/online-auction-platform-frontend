<template>
  <DefaultLayout>
    <CmkTable
      :items="users"
      :isCreate="false"
      :isExport="true"
      :isRefresh="true"
      :isRefreshing="isRefreshing"
      @refresh="getAllUsers"
      :exportableItems="[
        'rowNumber',
        'name',
        'phone_number',
        'updated_at',
      ]"
      :searchableItems="[
        'rowNumber',
        'name',
        'phone_number',
        'updated_at',
      ]"
    >
      <CmkColumn field="rowNumber" header="#" fixed="left"></CmkColumn>
      <CmkColumn field="name" header="Name"></CmkColumn>
      <CmkColumn field="phone_number" header="Phone Number"></CmkColumn>
      <CmkColumn header="Updated At">
        <template #default="slotProps">
          {{ new Date(slotProps.item.updated_at).toLocaleString() }}
        </template>
      </CmkColumn>
      <CmkColumn header="Action" fixed="right">
        <template #default="slotProps">
          <button
            @click="openDeleteModal(slotProps.item.id)"
            class="rounded-full h-9 w-9 border-2 border-red-500 hover:bg-red-500/10 transition-colors flex items-center justify-center cursor-pointer text-red-600 dark:text-red-400"
          >
            <RiDeleteBin6Fill class="text-lg" title="delete" />
          </button>
        </template>
      </CmkColumn>
    </CmkTable>
  </DefaultLayout>

  <CmkModal
    v-if="isDelete"
    myClass="w-1/2 max-h-5/6 p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 overflow-y-auto"
  >
    <h6 class="font-bold text-xl text-gray-800 dark:text-gray-200">Confirm Deletion</h6>

    <hr class="my-4 border-gray-300 dark:border-gray-600" />

    <p class="text-gray-600 dark:text-gray-300">
      The selected user will be deleted
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
        @click="deleteUser"
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
import CmkTable from '@/components/CmkTable.vue'
import DefaultLayout from '@/components/Layouts/DefaultLayout.vue'
import { useToastStore } from '@/stores/toast'
import { onMounted, provide, ref } from 'vue'
import CmkModal from '@/components/CmkModal.vue'
import CmkButton from '@/components/CmkButton.vue'
import CmkButtonLoader from '@/components/CmkButtonLoader.vue'
import { RiDeleteBin6Fill } from 'vue3-icons/ri'
import { useRoute } from 'vue-router'
import { userUserStore } from '@/stores/users'

const users = ref([])
const userStore = userUserStore()
const toast = useToastStore()
const isRefreshing = ref(false)
const isDelete = ref(false)
const isDeleting = ref(false)
const userId = ref<null | number>(null)

const openDeleteModal = (id: number) => {
  userId.value = id
  isDelete.value = true
}

const closeDeleteModal = () => {
  userId.value = null
  isDelete.value = false
}

const deleteUser = async () => {
  isDeleting.value = true

  try {
    const res = await userStore.deleteUser(userId.value as number)

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
    getAllUsers()
  }
}

const getAllUsers = async () => {
  isRefreshing.value = true

  try {
    const res = await userStore.getAllUsers()

    users.value = res.data.users.map((p, i) => ({ rowNumber: i + 1, ...p }))

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
  getAllUsers()
})

provide('closeDeleteModal', closeDeleteModal)
</script>
