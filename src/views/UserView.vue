<template>
  <TopLayout>
    <div
      class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8 items-center justify-center"
    >
      <div
        class="w-full max-w-md shadow-2xl rounded-2xl p-8 hover:shadow-3xl transition-all duration-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
      >
        <h1
          class="font-bold text-3xl sm:text-4xl mb-8 text-purple-800 dark:text-purple-400 text-center"
        >
          Bidder Registration
        </h1>

        <form @submit.prevent="createUser" class="space-y-6">
          <div class="relative">
            <label
              for="phone_number"
              class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >Whatsapp Number</label
            >

            <CmkPhoneNumber
              v-model:input="form.phone_number"
              @update:fullNumber="fullPhoneNumber = $event"
              inputType="text"
              placeholder="Enter your phone number e.g 07XXXXXXXX"
              class="w-full transition-all duration-200 focus:ring-2 focus:ring-purple-500"
              myClass=""
              :autoFocus="true"
              id="phone_number"
            />
          </div>

          <div v-if="dbPhoneNumber" class="relative">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >Your Name</label
            >

            <CmkTextInput
              v-model:input="form.name"
              placeholder="Enter your name"
              inputType="text"
              class="w-full transition-all duration-200 focus:ring-2 focus:ring-purple-500"
              myClass=""
              id="name"
            />
          </div>

          <CmkButtonLoader
            v-if="isSubmitting"
            name="Submittng"
            class="w-full bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-200"
          />
          <CmkButton
            v-else
            class="w-full bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-200"
            type="submit"
            >Submit</CmkButton
          >
        </form>
      </div>
    </div>
  </TopLayout>
</template>

<script setup lang="ts">
import CmkButton from '@/components/CmkButton.vue'
import CmkButtonLoader from '@/components/CmkButtonLoader.vue'
import CmkPhoneNumber from '@/components/CmkPhoneNumber.vue'
import CmkTextInput from '@/components/CmkTextInput.vue'
import TopLayout from '@/components/Layouts/TopLayout.vue'
import { useToastStore } from '@/stores/toast'
import { userUserStore } from '@/stores/users'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();
const toast = useToastStore();
const userStore = userUserStore();
const form = ref({
  name: '',
  phone_number: '',
})
const fullPhoneNumber = ref('')
const isSubmitting = ref(false)
const dbPhoneNumber = ref(false);

watch(
  () => fullPhoneNumber.value,
  (newValue) => {
    if (!newValue) {
      fullPhoneNumber.value = ''
    } else if (newValue.length === 13 && newValue.startsWith('+2547')) {
      getUserPhoneNumber()
      dbPhoneNumber.value = true;
    }
  },
)

const createUser = async () => {
  isSubmitting.value = true

  try {
    const res = await userStore.createUser({
      name: form.value.name,
      phone_number: fullPhoneNumber.value,
    });

    router.push({ name: "auction", params: { id: res.data.user_id } });
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
    isSubmitting.value = false
  }
}

const getUserPhoneNumber = async() => {
  try {
    const res = await userStore.getUserPhoneNumber(fullPhoneNumber.value);

    form.value.name = res.data.name;
    form.value.phone_number = res.data.phone_number.replace("+254", "0");

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
</script>
