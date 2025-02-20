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

    const updateAuction = async (id: number, data: Data) => {
      return await $axios.put(`/api/auction/update/${id}`, data)
    }


    const deleteAuction = async (id: number) => {
      return await $axios.delete(`/api/auction/delete/${id}`)
    }

    return {
      createBid,
      updateAuction,
      deleteAuction,
    }
  },
  {
    persist: true,
  },
)
