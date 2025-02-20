import { defineStore } from 'pinia'
import { useAxios } from '../composables/axios'

const $axios = useAxios().axios

interface Data {
  [key: string]: string | Blob | number
}

export const useBidStore = defineStore(
  'bids',
  () => {
    const createBid = async (data: Data) => {
      return await $axios.post('/api/bid/create', data)
    }

    const getAllUserBids = async(id: number, listing_id: number) => {
      return await $axios.get(`/api/bids/user/${id}/${listing_id}`)
    }

    return {
      createBid,
      getAllUserBids,
    }
  },
  {
    persist: true,
  },
)
