import { defineStore } from 'pinia'
import { useAxios } from '../composables/axios'

const $axios = useAxios().axios

interface Data {
  [key: string]: string | Blob | number
}

export const useAuctionResultStore = defineStore(
  'auction_result',
  () => {
    const getAllAuctionResults = async () => {
      return await $axios.get('/api/auction_results/get')
    }

    return {
      getAllAuctionResults,
    }
  },
  {
    persist: true,
  },
)
