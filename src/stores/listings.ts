import { defineStore } from 'pinia'
import { useAxios } from '../composables/axios'

const $axios = useAxios().axios

interface Data {
  [key: string]: string | Blob | number
}

export const useListingStore = defineStore(
  'listing',
  () => {
    const createListing = async (data: Data) => {
      return await $axios.post('/api/listing/create', data)
    }

    const updateListing = async (id: number, data: Data) => {
      return await $axios.put(`/api/listing/update/${id}`, data)
    }

    const getAllListings = async (id: number) => {
      return await $axios.get(`/api/listings/get/${id}`)
    }

    const deleteListing = async (id: number) => {
      return await $axios.delete(`/api/listing/delete/${id}`)
    }

    return {
      createListing,
      updateListing,
      getAllListings,
      deleteListing,
    }
  },
  {
    persist: true,
  },
)
