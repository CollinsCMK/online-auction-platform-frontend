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

    const getAllBids = async() => {
      return await $axios.get("/api/bids/get");
    }

    const getActiveBids = async() => {
      return await $axios.get("/api/bids/active");
    }

    const getAllListingsBids = async(id: number) => {
      return await $axios.get(`/api/bids/listings/get/${id}`);
    }

    const getActiveListingsBids = async(id: number) => {
      return await $axios.get(`/api/bids/listings/active/${id}`);
    }

    return {
      createBid,
      getAllUserBids,
      getAllBids,
      getActiveBids,
      getAllListingsBids,
      getActiveListingsBids
    }
  },
  {
    persist: true,
  },
)
