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

          <div class="relative">
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
import { ref, watch } from 'vue'

const form = ref({
  name: '',
  phone_number: '',
})
const fullPhoneNumber = ref('')
const isSubmitting = ref(false)

watch(
  () => form.value.phone_number,
  (newValue) => {
    if (!newValue) {
      fullPhoneNumber.value = ''
    }
  },
)

const createUser = async () => {
  isSubmitting.value = true
  try {
  } catch (error) {
    console.log(error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
